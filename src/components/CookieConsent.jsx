import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { CHOICE, hasDecided, setConsent } from '../lib/consent';

/**
 * CookieConsent
 * First-visit banner offering essential-only or all storage.
 *
 * Deliberately not a modal: it does not trap focus or block the page. A
 * consent notice that holds the content hostage is worse for the visitor and
 * buys nothing legally, since the optional categories stay off until chosen
 * either way (see lib/consent.js — undecided is treated as declined).
 *
 * On mobile it sits above MobileCTA, which is also pinned to the bottom. It
 * outranks the CTA on z-index for the one interaction it takes to dismiss.
 */
const CookieConsent = () => {
  // Read synchronously on first render so the banner never flashes for a
  // visitor who already chose. Undecided visitors see it after mount.
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !hasDecided();
  });

  // Another tab may record a choice; mirror it rather than showing two banners.
  useEffect(() => {
    const sync = () => setVisible(!hasDecided());
    window.addEventListener('csc:consent', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('csc:consent', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const choose = useCallback((choice) => {
    setConsent(choice);
    setVisible(false);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Cookie notice"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24, transition: { duration: 0.2 } }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-primary-500/25 bg-dark-900/97 shadow-2xl shadow-black/50 backdrop-blur-lg"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 lg:flex-row lg:items-center lg:gap-6 lg:py-5">
            <div className="flex flex-1 gap-3">
              <Cookie className="mt-0.5 hidden h-5 w-5 shrink-0 text-primary-400 sm:block" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-gray-400">
                <span className="font-semibold text-gray-200">We keep this simple.</span>{' '}
                Essential storage keeps the site working and remembers this choice. Optional
                analytics help us see which pages are useful — nothing optional loads unless
                you allow it. Details in the{' '}
                <Link
                  to="/privacy"
                  className="text-primary-400 underline underline-offset-2 transition-colors hover:text-primary-300"
                >
                  privacy notice
                </Link>
                .
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:gap-3">
              <button
                type="button"
                onClick={() => choose(CHOICE.ESSENTIAL)}
                className="h-10 whitespace-nowrap border border-dark-600 px-4 text-sm font-medium text-gray-300 transition-colors hover:border-dark-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
              >
                Accept essential only
              </button>
              <button
                type="button"
                onClick={() => choose(CHOICE.ALL)}
                className="h-10 whitespace-nowrap bg-primary-600 px-4 text-sm font-semibold text-onPrimary transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 active:scale-[0.98]"
              >
                Allow all cookies
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
