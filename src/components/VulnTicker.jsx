import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import fallback from '../data/kev-fallback.json';

/**
 * VulnTicker
 * Rolling banner of the most recently added CISA Known Exploited
 * Vulnerabilities — i.e. flaws confirmed to be exploited in the wild.
 *
 * Data path: CISA sends no CORS header and the full catalog is ~1.5 MB, so the
 * browser cannot read it directly. `scripts/fetch-kev.mjs` runs daily in CI and
 * writes a ~4 KB slice to /kev.json, which this fetches from its own origin.
 * A bundled snapshot ships as `kev-fallback.json` so the banner is never empty
 * if that request fails.
 */

/**
 * Severity → class, written out in full.
 *
 * Do not rebuild these with a template literal. Tailwind tree-shakes
 * `@layer components` against the class names it can find by scanning source,
 * so a dynamically assembled name like `vuln-item__score--${sev}` gets its rule
 * purged from the stylesheet and the chip silently renders unstyled.
 */
const SCORE_CLASS = {
  CRITICAL: 'vuln-item__score--critical',
  HIGH: 'vuln-item__score--high',
  MEDIUM: 'vuln-item__score--medium',
  LOW: 'vuln-item__score--low',
};

const FEED_URL = '/kev.json';
const CACHE_KEY = 'csc.kev.v1';
const REFRESH_MS = 60 * 60 * 1000;   // hourly; CISA publishes ~weekly
const STALE_MS = 30 * 60 * 1000;     // re-check on tab focus after 30 min

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw);
    if (!c?.at || !Array.isArray(c.data?.items) || !c.data.items.length) return null;
    return c;
  } catch {
    return null;   // private mode, quota, disabled storage
  }
};

const writeCache = (data) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch { /* non-fatal */ }
};

const VulnTicker = () => {
  const cached = typeof window !== 'undefined' ? readCache() : null;
  const [feed, setFeed] = useState(cached?.data || fallback);
  const lastFetch = useRef(cached?.at || 0);

  const load = useCallback(async () => {
    try {
      // Cache-bust so a CDN copy never pins the banner to a stale catalog.
      const res = await fetch(`${FEED_URL}?v=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (!Array.isArray(data?.items) || data.items.length === 0) return;
      setFeed(data);
      writeCache(data);
      lastFetch.current = Date.now();
    } catch {
      // Offline or blocked: keep showing whatever is already on screen.
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, REFRESH_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetch.current > STALE_MS) load();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [load]);

  const items = feed?.items || [];
  if (!items.length) return null;

  // CISA publishes roughly weekly. Past ~21 days the daily refresh workflow has
  // most likely stopped running, so the stamp shifts to amber as a quiet signal.
  const released = feed?.dateReleased ? new Date(feed.dateReleased) : null;
  const ageDays = released ? Math.floor((Date.now() - released.getTime()) / 86400000) : null;
  const stale = ageDays !== null && ageDays > 21;
  const stamp = released
    ? released.toLocaleDateString('en-CA', { day: 'numeric', month: 'short', timeZone: 'UTC' })
    : feed?.catalogVersion;

  // Duration scales with content so speed stays constant regardless of count.
  const duration = Math.max(45, items.length * 7);

  const Item = ({ v }) => (
    <a
      className="vuln-item"
      href={`https://nvd.nist.gov/vuln/detail/${v.id}`}
      target="_blank"
      rel="noopener noreferrer"
      title={[
        v.name,
        v.published ? `disclosed ${v.published}` : null,
        `added to CISA KEV ${v.added}`,
        v.score ? `CVSS ${v.score}` : null,
      ].filter(Boolean).join(' — ')}
    >
      <span className="vuln-item__id">{v.id}</span>
      {v.score != null && (
        <span className={`vuln-item__score ${SCORE_CLASS[v.severity] || 'vuln-item__score--none'}`}>
          {v.score.toFixed(1)}
        </span>
      )}
      <span className="vuln-item__sep">/</span>
      <span>{v.vendor} {v.product}</span>
      {v.ransomware && <span className="vuln-item__flag">Ransomware</span>}
      <ExternalLink className="w-3 h-3 opacity-45" aria-hidden="true" />
    </a>
  );

  // The list is rendered twice so the -50% translate loops seamlessly. Only the
  // first copy is exposed to assistive tech.
  const track = (
    <>
      {items.map((v) => <Item key={v.id} v={v} />)}
    </>
  );

  return (
    <aside
      className="vuln-ticker"
      aria-label="Most recently disclosed vulnerabilities confirmed to be exploited in the wild, from the CISA Known Exploited Vulnerabilities catalog"
    >
      <span className="vuln-ticker__label">
        <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
        {feed?.ordering === 'kev-added' ? 'Actively Exploited' : 'Newly Disclosed · Exploited'}
      </span>

      <div className="vuln-ticker__viewport">
        <div className="vuln-ticker__track" style={{ '--marquee-duration': `${duration}s` }}>
          {track}
          <span aria-hidden="true" style={{ display: 'inline-flex' }}>{track}</span>
        </div>
      </div>

      <a
        className={`vuln-ticker__stamp${stale ? ' vuln-ticker__stamp--stale' : ''}`}
        href={feed?.sourceUrl || 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog'}
        target="_blank"
        rel="noopener noreferrer"
        title={`CISA KEV catalog ${feed?.catalogVersion || ''}${
          ageDays !== null ? ` — published ${ageDays} day${ageDays === 1 ? '' : 's'} ago` : ''
        }`}
      >
        <span>CISA KEV · {stamp}</span>
        <ExternalLink className="w-3 h-3 opacity-45" aria-hidden="true" />
      </a>
    </aside>
  );
};

export default VulnTicker;
