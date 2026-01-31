import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

const Navbar = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Experience', href: '/experience' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="w-8 h-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Cloud Secure Canada
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-300 hover:text-primary-400 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/#contact" className="btn-primary">
              Book a Call
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-primary-400"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-dark-800 border-t border-dark-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-gray-300 hover:text-primary-400 hover:bg-dark-700 rounded-md transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/#contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-center btn-primary mt-4">
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
