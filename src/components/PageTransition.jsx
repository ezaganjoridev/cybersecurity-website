import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

const PageTransition = ({ children, locationKey }) => (
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

export default memo(PageTransition);
