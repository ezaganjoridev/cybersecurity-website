import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  { type: 'prompt', text: 'cat engagement-options' },
  { type: 'output', text: 'Flexible support for fast-moving security needs.' },
  { type: 'blank' },
  { type: 'list', prefix: '[01]', text: 'Incident response & recovery', status: 'Ready' },
  { type: 'list', prefix: '[02]', text: 'Security assessments', status: 'Ready' },
  { type: 'list', prefix: '[03]', text: 'SIEM/SOC engineering', status: 'Ready' },
  { type: 'blank' },
  { type: 'prompt', text: 'location --site "Toronto • Remote"' },
];

const TerminalLine = memo(({ line, index }) => {
  if (line.type === 'blank') return <div className="h-2" />;

  if (line.type === 'prompt') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.18 }}
      >
        <p className="text-xs sm:text-sm">
          <span className="text-emerald-400">admin@csc</span>
          <span className="text-primary-300">:~$</span>{' '}
          <span className="text-gray-200">{line.text}</span>
        </p>
      </motion.div>
    );
  }

  if (line.type === 'output') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: index * 0.18 + 0.1 }}
        className="pl-3 border-l border-primary-500/20"
      >
        <p className="text-xs text-gray-400">{line.text}</p>
      </motion.div>
    );
  }

  if (line.type === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.18 }}
        className="pl-3"
      >
        <p className="text-xs sm:text-sm">
          <span className="text-emerald-400">{line.prefix}</span>{' '}
          <span className="text-gray-200">{line.text}</span>{' '}
          <span className="text-gray-600">...{line.status}</span>
        </p>
      </motion.div>
    );
  }

  return null;
});

TerminalLine.displayName = 'TerminalLine';

const MobileTerminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    // Stagger line reveal
    if (visibleLines < LINES.length) {
      timerRef.current = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, 400);
    }
    return () => clearTimeout(timerRef.current);
  }, [visibleLines]);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="lg:hidden mt-8 mx-auto max-w-sm"
    >
      <div className="relative rounded-xl border border-primary-500/25 bg-dark-900/95 backdrop-blur-md shadow-2xl shadow-primary-500/5 overflow-hidden">
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="animate-scanline" />
        </div>

        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-dark-800/60">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <span className="ml-auto font-mono text-[10px] text-primary-400/70 tracking-wider">
            secure_term
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-3 sm:p-4 font-mono space-y-1.5 min-h-[140px]">
          {LINES.slice(0, visibleLines).map((line, i) => (
            <TerminalLine key={i} line={line} index={i} />
          ))}

          {/* Blinking cursor */}
          {visibleLines >= LINES.length && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-emerald-400 text-xs">admin@csc</span>
              <span className="text-primary-300 text-xs">:~$</span>
              <span
                className={`inline-block w-1.5 h-3 bg-primary-400 transition-opacity duration-100 ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(MobileTerminal);
