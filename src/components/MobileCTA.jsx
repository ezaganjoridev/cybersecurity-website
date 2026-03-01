import React, { useState, useEffect, memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * A sticky bottom CTA bar visible only on mobile after the user scrolls
 * past the hero. Dismissible, and auto-hides when the contact section
 * is in view.
 */
const MobileCTA = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handleScroll = () => {
      const heroEnd = window.innerHeight * 0.9;
      const contactEl = document.getElementById('contact');
      const contactTop = contactEl
        ? contactEl.getBoundingClientRect().top
        : Infinity;

      // Show after scrolling past hero, hide when contact is near
      setVisible(window.scrollY > heroEnd && contactTop > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl border border-primary-500/20 bg-dark-900/95 backdrop-blur-lg px-4 py-3 shadow-2xl shadow-black/40">
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
