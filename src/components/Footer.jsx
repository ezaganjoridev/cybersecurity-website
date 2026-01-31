import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Cybersecurity Services', href: '/services' },
      { name: 'IT Operations Support', href: '/services' },
      { name: 'Penetration Testing', href: '/services' },
      { name: 'SIEM/SOC Engineering', href: '/services' }
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Experience', href: '/experience' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/#contact' }
    ]
  };

  return (
    <footer className="bg-dark-800 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-primary-500" />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Cloud Secure Canada
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Cybersecurity consulting for incident response, penetration testing, and SOC engineering.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 pt-8 flex justify-center">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} Cloud Secure Canada. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
