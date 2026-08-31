import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LogoMark from './LogoMark';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu if viewport grows past mobile breakpoint (e.g. Chrome resize)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e) => { if (e.matches) setIsOpen(false); };

    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }

    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      // Restore scroll position
      if (top) window.scrollTo(0, parseInt(top || '0', 10) * -1);
    }
    return () => {
      const top = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      if (top) window.scrollTo(0, parseInt(top || '0', 10) * -1);
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Field Notes', href: '/blog' },
    { name: 'Services', href: '/services' },
    { name: 'Experience', href: '/experience' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
  ];

  // Smooth tween animations: no springs, GPU friendly
  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const panelVariants = {
    closed: { opacity: 0, x: '100%' },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
    },
  };

  const menuVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
    exit: { opacity: 0, transition: { duration: 0.08 } },
  };

  return (
    <nav className="nav-solid fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <LogoMark className="h-7 w-7 transition-transform duration-200 group-hover:scale-105 md:h-8 md:w-8" />
            <span className="brand-wordmark text-lg font-bold md:text-2xl">
              Cloud Secure Canada
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium relative group transition-colors ${
                  location.pathname === link.href
                    ? 'text-primary-400'
                    : 'text-gray-300 hover:text-primary-400'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-colors ${
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary-500/30 bg-primary-500/5 text-primary-400 transition-colors hover:border-primary-500/60 hover:bg-primary-500/10 hover:text-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
              aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
              title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
            >
              {isLight ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
            </button>
            <Link
              to="/#contact"
              className="btn-cta text-sm group/cta"
              data-cta="navbar-book-a-call"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Book a Call</span>
              <ArrowRight
                className="w-4 h-4 -ml-0.5 transition-transform duration-200 group-hover/cta:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Mobile menu button: fixed position when open so it stays above the overlay */}
          <button
            onClick={toggleMenu}
            className={`p-2 active:scale-90 transition-transform duration-100 lg:hidden ${
              isOpen
                ? 'fixed top-4 right-4 z-[60] text-white hover:text-primary-400'
                : 'relative z-[60] text-gray-300 hover:text-primary-400'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dim backdrop: lightweight, no blur during animation */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed inset-0 z-[54] bg-black/60 lg:hidden"
              onClick={closeMenu}
            />

            {/* Panel: transform-based animation is smoother on mobile Safari */}
            <motion.div
              variants={panelVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="fixed inset-0 z-[55] overflow-y-auto overscroll-contain bg-dark-900 will-change-transform lg:hidden"
            >
              {/* Decorative grid */}
              <div className="nav-mobile-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="exit"
                className="relative flex flex-col justify-center min-h-full px-8 py-24"
              >
              {navLinks.map((link, i) => (
                <motion.div key={link.name} variants={itemVariants} className="w-full">
                  <Link
                    to={link.href}
                    onClick={closeMenu}
                    className={`block py-4 text-3xl font-bold transition-colors border-b border-dark-700/30 ${
                      location.pathname === link.href
                        ? 'text-primary-400'
                        : 'text-gray-200 active:text-primary-400'
                    }`}
                  >
                    <span className="text-primary-500/40 text-sm font-mono mr-3">
                      0{i + 1}
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="mt-8 w-full">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="mb-3 flex h-12 w-full items-center justify-center gap-3 border border-primary-500/30 bg-primary-500/5 font-semibold text-primary-300 transition-colors hover:bg-primary-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
                  aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
                >
                  {isLight ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
                  <span>Use {isLight ? 'dark' : 'light'} theme</span>
                </button>
                <Link
                  to="/#contact"
                  onClick={closeMenu}
                  className="btn-cta w-full justify-center text-lg py-4"
                  data-cta="mobile-menu-book-a-call"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  <span>Book a Call</span>
                </Link>
              </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
