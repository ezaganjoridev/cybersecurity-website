/**
 * Cookie / storage consent.
 *
 * The banner is only worth having if something actually reads it, so this is
 * the single gate: anything non-essential (analytics, embeds, any future
 * third-party script) must call `hasConsent('analytics')` before it loads.
 * Nothing in the app currently does, which is why the site genuinely sets no
 * analytics storage today — wire new scripts through here rather than around.
 *
 * The choice itself lives in localStorage, not a cookie: it never needs to
 * reach a server, and storing it locally keeps it out of every request.
 */

const STORAGE_KEY = 'csc.consent';

/**
 * Bump when the categories change meaningfully. A stored decision from an
 * older version is treated as absent, so visitors are asked again rather than
 * silently held to a choice they made about different terms.
 */
const VERSION = 1;

export const CHOICE = {
  ESSENTIAL: 'essential',
  ALL: 'all',
};

/** Categories that are on regardless of choice — the site cannot work without them. */
const ALWAYS_ON = new Set(['essential']);

/**
 * Storage access throws outright in some privacy modes and embedded browsers,
 * so every read and write is guarded. A failure is treated as "no decision",
 * which fails closed: optional categories stay off.
 */
const safeRead = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== VERSION) return null;
    if (parsed?.choice !== CHOICE.ESSENTIAL && parsed?.choice !== CHOICE.ALL) return null;
    return parsed;
  } catch {
    return null;
  }
};

/** The stored decision, or null if the visitor has not chosen yet. */
export const getConsent = () => safeRead();

/** True once the visitor has made any choice — drives whether the banner shows. */
export const hasDecided = () => safeRead() !== null;

/**
 * Record a choice. Returns the stored record so a caller can react immediately
 * without a second read. Also fires a DOM event so anything already mounted
 * can respond without polling.
 */
export const setConsent = (choice) => {
  const record = { version: VERSION, choice, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Persisting failed (storage disabled or full). The choice still applies
    // for this page view; the visitor will simply be asked again next time.
  }
  try {
    window.dispatchEvent(new CustomEvent('csc:consent', { detail: record }));
  } catch {
    // CustomEvent is unavailable in very old engines; nothing depends on it.
  }
  return record;
};

/**
 * The gate. Essential is always true. Everything else requires an explicit
 * "allow all" — an undecided visitor gets the same answer as one who declined.
 */
export const hasConsent = (category) => {
  if (ALWAYS_ON.has(category)) return true;
  return safeRead()?.choice === CHOICE.ALL;
};

/** Clears the decision so the banner reappears. Used by the privacy page. */
export const resetConsent = () => {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to do — if we cannot clear it, the banner stays hidden.
  }
  try {
    window.dispatchEvent(new CustomEvent('csc:consent', { detail: null }));
  } catch {
    // Non-fatal, as above.
  }
};
