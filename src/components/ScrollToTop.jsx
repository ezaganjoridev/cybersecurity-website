import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();
  const prevKey = useRef(key);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');

      // Attempt to scroll immediately, then retry after a short delay
      // to handle lazy-loaded pages where the target isn't mounted yet
      const scrollToId = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      if (!scrollToId()) {
        // Retry after page has had time to render
        const timer = setTimeout(scrollToId, 150);
        const timer2 = setTimeout(scrollToId, 400);
        return () => { clearTimeout(timer); clearTimeout(timer2); };
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    prevKey.current = key;
  }, [pathname, hash, key]);  // `key` changes on every navigation, even same-route

  return null;
};

export default ScrollToTop;
