import React, { memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Wraps page content to provide smooth enter/exit animations on route change.
 * Uses a simple fade + upward slide for performance.
 */
const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const PageTransition = ({ children, locationKey }) => {
  // Respect the OS setting. Without this the route fade runs regardless, which
  // is both an accessibility miss and the reason page content renders blank in
  // automated captures.
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div key={locationKey}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={locationKey}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(PageTransition);
