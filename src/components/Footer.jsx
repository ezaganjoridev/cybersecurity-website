import React from 'react';
import { Link } from 'react-router-dom';
import LogoMark from './LogoMark';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Cybersecurity Services', href: '/services#penetration-testing' },
      { name: 'IT Operations Support', href: '/services#it-asset-management' },
      { name: 'Penetration Testing', href: '/services#penetration-testing' },
      { name: 'SIEM/SOC Engineering', href: '/services#siem-soc-engineering' }
    ],
    company: [
      { name: 'Experience', href: '/experience' },
      { name: 'About', href: '/about' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/#contact' },
      { name: 'Privacy & Terms', href: '/privacy' }
    ]
  };

  return (
    <footer className="bg-dark-800 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <LogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="brand-wordmark text-lg font-bold sm:text-xl md:text-2xl">
                Cloud Secure Canada
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Toronto-based cyber security consultant delivering incident response, penetration testing, and SOC engineering.
            </p>
            <a
              href="mailto:info@cloudsecurecanada.com"
              className="text-primary-300 hover:text-primary-200 transition-colors text-sm"
            >
              info@cloudsecurecanada.com
            </a>
            <div className="mt-3 text-sm text-gray-400">
              <a
                href="tel:+16476958277"
                className="text-primary-300 hover:text-primary-200 transition-colors"
              >
                +1 (647)-695-8277
              </a>
            </div>
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
