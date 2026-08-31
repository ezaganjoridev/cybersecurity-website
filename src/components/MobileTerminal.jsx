import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Mirrors the desktop terminal: the same pinned guides, the same [SEC-0x]
 * labels. `pinned` is passed down from Hero rather than imported here, because
 * Hero already loads the post data lazily — importing it again in this file
 * would pull the whole post corpus back into the initial bundle.
 *
 * Before the pinned data arrives the listing is simply absent; the staggered
 * reveal picks the extra lines up when it does.
 */
const buildLines = (pinned) => [
  { type: 'prompt', text: 'ls ./field-notes/pinned' },
  { type: 'output', text: 'Reference guides, kept current.' },
  { type: 'blank' },
  ...pinned.map((post, i) => ({
    type: 'link',
    prefix: `[SEC-${String(i + 1).padStart(2, '0')}]`,
    text: post.title,
    to: `/blog/${post.slug}`,
  })),
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
          <span className="terminal-accent">admin@csc</span>
          <span className="terminal-muted">:~$</span>{' '}
          <span className="terminal-ink">{line.text}</span>
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
        className="pl-3 border-l border-[rgb(var(--color-term-accent))]/25"
      >
        <p className="text-xs terminal-muted">{line.text}</p>
      </motion.div>
    );
  }

  if (line.type === 'link') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.18 }}
        className="pl-3"
      >
        <p className="text-xs leading-relaxed sm:text-sm">
          <span className="font-semibold text-red-400">{line.prefix}</span>{' '}
          <Link
            to={line.to}
            className="terminal-link"
          >
            {line.text}
          </Link>
        </p>
      </motion.div>
    );
  }

  return null;
});

TerminalLine.displayName = 'TerminalLine';

const MobileTerminal = ({ pinned = [] }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const timerRef = useRef(null);
  const lines = useMemo(() => buildLines(pinned), [pinned]);

  useEffect(() => {
    // Stagger line reveal. `lines.length` is a dependency because the pinned
    // guides load asynchronously — without it the reveal would stop at the
    // pre-load line count and never show the listing.
    if (visibleLines < lines.length) {
      timerRef.current = setTimeout(() => {
        setVisibleLines((v) => v + 1);
      }, 400);
    }
    return () => clearTimeout(timerRef.current);
  }, [visibleLines, lines.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="lg:hidden mt-8 mx-auto max-w-sm"
    >
      <div className="terminal-surface relative rounded-none shadow-2xl overflow-hidden">
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="animate-scanline" />
        </div>

        {/* Title bar */}
        <div className="terminal-bar flex items-center gap-1.5 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-[rgb(var(--color-term-accent))]/70" />
          <span className="ml-auto font-mono text-[10px] terminal-accent opacity-70 tracking-wider">
            secure_term
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-3 sm:p-4 font-mono space-y-1.5 min-h-[140px]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <TerminalLine key={i} line={line} index={i} />
          ))}

          {/* Blinking cursor */}
          {visibleLines >= lines.length && (
            <div className="flex items-center gap-1 mt-1">
              <span className="terminal-accent text-xs">admin@csc</span>
              <span className="terminal-muted text-xs">:~$</span>
              <span className="inline-block w-1.5 h-3 bg-[rgb(var(--color-term-accent))] animate-terminal-cursor" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(MobileTerminal);
