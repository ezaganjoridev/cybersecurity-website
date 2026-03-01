import React, { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A thin progress bar at the top of the viewport that fills as the user scrolls.
 * Renders as a fixed element with a glowing accent.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-400 via-primary-500 to-teal-400 z-[60]"
    >
      {/* glow */}
      <div className="absolute inset-0 h-[3px] blur-sm bg-primary-400/60" />
    </motion.div>
  );
};

export default memo(ScrollProgress);
