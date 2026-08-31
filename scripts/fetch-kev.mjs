/**
 * Builds the vulnerability ticker feed: the most recently DISCLOSED
 * vulnerabilities that are known to be exploited in the wild.
 *
 * Two sources, because neither alone answers the question:
 *   - CISA KEV  — authority on *whether* a flaw is being exploited. Has
 *                 `dateAdded` (when CISA catalogued it) but no disclosure date.
 *   - NVD 2.0   — authority on *when* a CVE was published. Its `hasKev` filter
 *                 narrows to exactly the KEV set, so one request per 120-day
 *                 window returns everything needed.
 *
 * Sorting by KEV `dateAdded` is the obvious mistake here: CISA regularly adds
 * years-old CVEs once exploitation is confirmed, so that ordering surfaces
 * 2023 disclosures ahead of last week's.
 *
 * CISA sends no CORS header and the catalog is ~1.5 MB, so this runs in CI
 * (.github/workflows/update-kev.yml) and writes a small same-origin file.
 *
 * Outputs:
 *   public/kev.json            — served at /kev.json
 *   src/data/kev-fallback.json — bundled, so the ticker is never empty
 *
 * Optional: set NVD_API_KEY to lift NVD's 5-requests-per-30s anonymous limit.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const KEV_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
const NVD_URL = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const UA = 'cloudsecurecanada.com KEV ticker';
const LIMIT = 10;
const WINDOW_DAYS = 119;   // NVD caps a pubStart/pubEnd range at 120 days
const MAX_WINDOWS = 3;     // look back ~1 year if recent windows are thin

const iso = (d, endOfDay = false) =>
  `${d.toISOString().slice(0, 10)}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}`;

const nvdHeaders = () => {
  const h = { 'User-Agent': UA };
  if (process.env.NVD_API_KEY) h.apiKey = process.env.NVD_API_KEY;
  return h;
};

/** NVD returns 429 readily without a key; back off and retry. */
const nvdFetch = async (url, attempts = 5) => {
  for (let i = 0; i < attempts; i++) {
    const res = await fetch(url, { headers: nvdHeaders(), signal: AbortSignal.timeout(60_000) });
    if (res.ok) return res.json();
    if (res.status !== 429 && res.status !== 503) {
      throw new Error(`NVD returned ${res.status}`);
    }
    await new Promise((r) => setTimeout(r, 8000 * (i + 1)));
  }
  throw new Error('NVD rate limit not cleared after retries');
};

/** Publication dates for KEV CVEs, walking back in 119-day windows. */
const fetchDisclosureDates = async () => {
  const published = new Map();
  let end = new Date();

  for (let w = 0; w < MAX_WINDOWS; w++) {
    const start = new Date(end.getTime() - WINDOW_DAYS * 86400000);
    const url = `${NVD_URL}?hasKev&pubStartDate=${iso(start)}&pubEndDate=${iso(end, true)}&resultsPerPage=2000`;
    const data = await nvdFetch(url);

    for (const { cve } of data.vulnerabilities || []) {
      let score = null;
      let severity = null;
      for (const k of ['cvssMetricV40', 'cvssMetricV31', 'cvssMetricV30']) {
        const m = cve.metrics?.[k];
        if (m?.length) { score = m[0].cvssData.baseScore; severity = m[0].cvssData.baseSeverity; break; }
      }
      published.set(cve.id, { published: cve.published.slice(0, 10), score, severity });
    }

    console.log(`  window ${iso(start).slice(0, 10)}..${iso(end).slice(0, 10)}: ${data.totalResults} KEV CVEs`);
    if (published.size >= LIMIT * 3) break;
    end = new Date(start.getTime() - 86400000);
  }

  return published;
};

const main = async () => {
  const kevRes = await fetch(KEV_URL, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(60_000) });
  if (!kevRes.ok) throw new Error(`CISA returned ${kevRes.status}`);
  const kev = await kevRes.json();
  if (!Array.isArray(kev.vulnerabilities)) throw new Error('unexpected KEV shape');
  console.log(`CISA KEV ${kev.catalogVersion}: ${kev.count} entries`);

  let disclosure = new Map();
  let ordering = 'disclosure';
  try {
    disclosure = await fetchDisclosureDates();
  } catch (err) {
    // Degrade rather than fail: an ordering by KEV date is still useful, and
    // the payload records which one shipped so the UI can label it honestly.
    console.warn(`NVD lookup failed (${err.message}) — falling back to KEV dateAdded ordering`);
    ordering = 'kev-added';
  }

  const shape = (v) => {
    const d = disclosure.get(v.cveID);
    return {
      id: v.cveID,
      // CISA's fields carry stray trailing whitespace often enough to matter
      // once they are rendered inline in a ticker.
      vendor: v.vendorProject.trim(),
      product: v.product.trim(),
      name: v.vulnerabilityName.trim(),
      published: d?.published || null,
      added: v.dateAdded,
      due: v.dueDate,
      score: d?.score ?? null,
      severity: d?.severity ?? null,
      ransomware: v.knownRansomwareCampaignUse === 'Known',
    };
  };

  const items =
    ordering === 'disclosure'
      ? kev.vulnerabilities
          .filter((v) => disclosure.has(v.cveID))
          .map(shape)
          .sort((a, b) => (a.published === b.published ? b.id.localeCompare(a.id) : b.published.localeCompare(a.published)))
          .slice(0, LIMIT)
      : [...kev.vulnerabilities]
          .sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
          .map(shape)
          .slice(0, LIMIT);

  if (!items.length) throw new Error('no items produced');

  const payload = {
    source: 'CISA Known Exploited Vulnerabilities Catalog, dated via NVD',
    sourceUrl: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog',
    ordering,                       // 'disclosure' | 'kev-added'
    catalogVersion: kev.catalogVersion,
    dateReleased: kev.dateReleased,
    totalInCatalog: kev.count,
    fetchedAt: new Date().toISOString(),
    items,
  };

  const json = `${JSON.stringify(payload, null, 2)}\n`;
  for (const p of ['public/kev.json', 'src/data/kev-fallback.json']) {
    await mkdir(dirname(p), { recursive: true });
    await writeFile(p, json, 'utf8');
  }

  console.log(`\nordering: ${ordering} | wrote ${items.length} items | ${Buffer.byteLength(json)} bytes`);
  for (const i of items) {
    console.log(`  ${i.published || i.added}  ${i.id.padEnd(16)} ${i.score ?? '—'}  ${i.vendor} ${i.product}`);
  }
};

main().catch((err) => {
  console.error(`fetch-kev failed: ${err.message}`);
  process.exit(1);
});
