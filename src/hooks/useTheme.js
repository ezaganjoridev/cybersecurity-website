import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'csc.theme';
const DARK = 'dark';
const LIGHT = 'light';

const systemTheme = () => (
  window.matchMedia?.('(prefers-color-scheme: light)').matches ? LIGHT : DARK
);

const storedTheme = () => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === LIGHT || value === DARK ? value : null;
  } catch {
    return null;
  }
};

const initialTheme = () => {
  if (typeof document === 'undefined') return DARK;
  const applied = document.documentElement.dataset.theme;
  return applied === LIGHT || applied === DARK ? applied : storedTheme() || systemTheme();
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  root.dataset.theme = theme;
  // Drives native form controls, scrollbars and the UA's default canvas.
  // This was pinned to 'dark', which is what made light mode render dark
  // scrollbars and inputs over a light page.
  root.style.colorScheme = theme;

  const light = theme === LIGHT;
  const favicon = document.querySelector('#site-favicon');
  const maskIcon = document.querySelector('#site-mask-icon');
  const themeColor = document.querySelector('#site-theme-color');

  if (favicon) favicon.setAttribute('href', light ? '/shield-light.svg?v=2' : '/shield.svg?v=3');
  if (maskIcon) {
    maskIcon.setAttribute('href', light ? '/shield-light.svg?v=2' : '/shield.svg?v=3');
    maskIcon.setAttribute('color', light ? '#2563eb' : '#60a5fa');
  }
  if (themeColor) themeColor.setAttribute('content', light ? '#f4f7fb' : '#0b101b');

  window.dispatchEvent(new CustomEvent('csc:themechange', { detail: { theme } }));
};

export const useTheme = () => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const followSystem = (event) => {
      if (!storedTheme()) setTheme(event.matches ? LIGHT : DARK);
    };
    const syncTabs = (event) => {
      if (event.key !== STORAGE_KEY) return;
      const next = event.newValue === LIGHT || event.newValue === DARK
        ? event.newValue
        : systemTheme();
      setTheme(next);
    };

    if (media.addEventListener) media.addEventListener('change', followSystem);
    else media.addListener?.(followSystem);
    window.addEventListener('storage', syncTabs);
    return () => {
      if (media.removeEventListener) media.removeEventListener('change', followSystem);
      else media.removeListener?.(followSystem);
      window.removeEventListener('storage', syncTabs);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === DARK ? LIGHT : DARK;
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage can be unavailable in private browsing; the current tab still updates.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
};
