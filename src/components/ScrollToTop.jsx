import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  const scrollAttemptRef = useRef(0);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const attemptId = scrollAttemptRef.current + 1;
      scrollAttemptRef.current = attemptId;
      let frame = null;
      let timeout = null;
      let observer = null;
      const startedAt = performance.now();

      const scrollToId = () => {
        if (scrollAttemptRef.current !== attemptId) return true;

        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      const retry = () => {
        if (scrollToId()) return;
        if (performance.now() - startedAt > 2500) return;
        timeout = window.setTimeout(() => {
          frame = window.requestAnimationFrame(retry);
        }, 100);
      };

      observer = new MutationObserver(scrollToId);
      observer.observe(document.body, { childList: true, subtree: true });
      retry();

      return () => {
        if (frame !== null) window.cancelAnimationFrame(frame);
        if (timeout !== null) window.clearTimeout(timeout);
        observer?.disconnect();
      };
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash, key]);

  return null;
};

export default ScrollToTop;
