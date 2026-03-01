import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQ', href: '/faq' },
  ];

  // Simple tween-based animations (no springs — much smoother on mobile GPUs)
  const menuVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 12 },
    open: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="w-7 h-7 md:w-8 md:h-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Cloud Secure Canada
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 transition-all ${
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link to="/#contact" className="btn-primary text-sm">
              Book a Call
            </Link>
          </div>

          {/* Mobile menu button — plain button, no nested AnimatePresence */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative z-50 text-gray-300 hover:text-primary-400 p-2 active:scale-90 transition-transform duration-100"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation — Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 z-40 bg-dark-900 will-change-[opacity]"
            style={{ contain: 'strict' }}
          >
            {/* Lightweight decorative grid (no blur) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:40px_40px]" />

            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="exit"
              className="relative flex flex-col justify-center items-start h-full px-8 pb-20"
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
              <motion.div variants={itemVariants} className="w-full mt-8">
                <Link
                  to="/#contact"
                  onClick={closeMenu}
                  className="btn-primary block text-center text-lg py-4"
                >
                  Book a Call
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
