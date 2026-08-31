import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, Target, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileTerminal from './MobileTerminal';
import CyberGrid from './CyberGrid';
import LogoMark from './LogoMark';

/**
 * The terminal lists whatever is currently pinned on the blog — pin order and
 * titles come straight from the post data, so re-pinning or retitling a guide
 * updates the hero with no change here. Capped at three to fit the panel.
 */
const PINNED_LIMIT = 3;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

const Hero = () => {
  // The post data is imported dynamically rather than at the top of the file:
  // Hero is part of the eagerly-loaded app shell, and a static import pulls the
  // entire post corpus (bodies, detection rules and all) into the initial
  // bundle — measured at roughly +37 kB gzipped for three titles. Fetching it
  // after mount keeps first paint cheap and doubles as a prefetch of the chunk
  // the blog routes need anyway. The list animates in at ~1.8s, so the load is
  // not perceptible; if it fails, the block simply does not render.
  const [pinned, setPinned] = useState([]);

  useEffect(() => {
    let active = true;
    import('../data/posts')
      .then(({ pinnedPosts }) => {
        if (active) setPinned(pinnedPosts().slice(0, PINNED_LIMIT));
      })
      .catch(() => {
        // Chunk failed to load; the terminal renders without the listing.
      });
    return () => {
      active = false;
    };
  }, []);


  return (
    <section id="home" className="relative min-h-screen min-h-[100svh] flex items-center overflow-hidden bg-dark-900 border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <CyberGrid />
        <div className="absolute inset-0 opacity-20 hidden md:block">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="ambient-orb absolute top-1/4 left-1/4 w-80 h-80 bg-primary-500/40 rounded-full blur-[100px] will-change-transform"
          />
          <motion.div 
             animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="ambient-orb absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/30 rounded-full blur-[100px] will-change-transform"
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center lg:text-left z-10"
          >
            <motion.div variants={itemVariants} className="chip mb-8 justify-center lg:justify-start ring-1 ring-primary-500/40 shadow-lg shadow-primary-500/10 bg-primary-900/30">
              <LogoMark className="h-4 w-4" />
              <span className="brand-wordmark font-semibold tracking-wide">CLOUD SECURE CANADA</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-[1.15] text-white">
              Adversaries move fast. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-accent-400 bg-clip-text text-transparent">
                We move faster.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-primary-300/90 font-semibold mb-6 tracking-wide"
            >
              Boutique cybersecurity consulting in Toronto. SANS GIAC certified. Remote across Canada, the US, and the UK.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We engineer resilient environments and lead high-stakes incident responses. No theoretical fluff. Just
              battle-tested security execution trusted by financial services, fintech, and SaaS leaders globally.
            </motion.p>

            <motion.div variants={containerVariants} className="space-y-4 mb-10">
              {[
                { icon: Zap, text: 'Zero-Day Incident Response & Recovery' },
                { icon: Target, text: 'Adversarial Penetration Testing' },
                { icon: Lock, text: 'SIEM & SOC Engineering (Splunk, Sentinel)' },
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4 group">
                  <div className="w-10 h-10 rounded-none bg-dark-700/50 flex items-center justify-center border border-white/5 group-hover:bg-primary-500/10 group-hover:border-primary-500/30 transition-colors duration-200">
                    <item.icon className="w-5 h-5 text-primary-400 group-hover:text-primary-300" />
                  </div>
                  <span className="font-semibold text-gray-200 tracking-wide text-sm md:text-base">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link to="/#contact" className="btn-primary flex items-center space-x-2 group w-full sm:w-auto justify-center shadow-lg shadow-primary-500/25">
                <span>Secure Your Infrastructure</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/services" className="btn-secondary w-full sm:w-auto justify-center backdrop-blur-sm">
                View Capabilities
              </Link>
            </motion.div>

            <MobileTerminal pinned={pinned} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 50 }}
            className="relative hidden lg:block z-10"
          >
             <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-none blur opacity-25 animate-pulse"></div>
              <div className="terminal-surface relative overflow-hidden rounded-none p-6 text-left shadow-2xl">
                <div className="terminal-muted flex items-center gap-2 text-xs uppercase tracking-[0.2em] mb-5 border-b border-[rgb(var(--color-term-border))] pb-4">
                  <div className="flex gap-2 mr-auto">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[rgb(var(--color-term-accent))]/80" />
                  </div>
                  <span className="ml-2 font-mono terminal-accent opacity-80">root@csc-core:~#</span>
                </div>
                
                <div className="space-y-4 font-mono text-sm terminal-ink">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                    <p className="terminal-muted">
                      <span className="terminal-accent">root@csc-core</span>
                      <span className="terminal-muted">:~#</span> ./engage --mode active
                    </p>
                    <p className="mt-3 terminal-ink pl-4 border-l-2 border-[rgb(var(--color-term-accent))]/40 font-medium">
                      [INITIATING] High-velocity security protocols. No downtime.
                    </p>
                  </motion.div>

                  {pinned.length > 0 && (
                    <motion.div className="space-y-3 terminal-ink mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                      <p className="terminal-muted">
                        <span className="terminal-accent">root@csc-core</span>
                        <span className="terminal-muted">:~#</span> ls ./field-notes/pinned
                      </p>

                      <div className="space-y-3 pl-4">
                        {pinned.map((post, i) => (
                          <motion.p
                            key={post.slug}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.0 + i * 0.2 }}
                            className="leading-relaxed"
                          >
                            {/* red-400 rather than red-500: 6.8:1 on the panel
                                background against 5.0:1, so the label reads as
                                an accent instead of a dim smudge. */}
                            <span className="font-semibold text-red-400">
                              [SEC-{String(i + 1).padStart(2, '0')}]
                            </span>{' '}
                            <Link
                              to={`/blog/${post.slug}`}
                              className="terminal-link"
                            >
                              {post.title}
                            </Link>
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <motion.div className="pt-4 terminal-muted mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }}>
                    <span className="terminal-accent">root@csc-core</span>
                    <span className="terminal-muted">:~#</span> <span className="animate-pulse">_</span>
                  </motion.div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
