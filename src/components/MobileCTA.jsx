import React, { useState, useEffect, useRef, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * A sticky bottom CTA bar visible only on mobile after the user scrolls
 * past the hero. Dismissible, and auto-hides when the contact section
 * is in view.
 */
const MobileCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const visibleRef = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (dismissed) return;

    const updateVisibility = () => {
      const heroEnd = window.innerHeight * 0.9;
      const contactEl = document.getElementById('contact');
      const contactTop = contactEl
        ? contactEl.getBoundingClientRect().top
        : Infinity;

      // Show after scrolling past hero, hide when contact is near
      const nextVisible = window.scrollY > heroEnd && contactTop > window.innerHeight * 0.5;
      if (nextVisible !== visibleRef.current) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }
    };

    const handleScroll = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={prefersReducedMotion ? false : { y: '100%' }}
          animate={{ y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { y: '100%' }}
          transition={{
            duration: prefersReducedMotion ? 0.12 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-x-0 bottom-0 z-50 md:hidden transform-gpu will-change-transform bg-dark-900/95 border-t border-primary-500/20 shadow-2xl shadow-black/45 backdrop-blur-lg"
        >
          <div className="flex items-center gap-3 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <Link
              to="/#contact"
              className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-2.5"
              onClick={() => setDismissed(true)}
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-500 hover:text-gray-300 text-xs px-2 py-1"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(MobileCTA);
