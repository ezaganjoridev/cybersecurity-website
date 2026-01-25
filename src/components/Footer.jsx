import React from 'react';
import { Shield, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Security Reviews', href: '#services' },
      { name: 'Penetration Testing', href: '#services' },
      { name: 'SOC Services', href: '#services' },
      { name: 'SIEM Integration', href: '#services' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Experience', href: '#experience' },
      { name: 'Contact', href: '#contact' }
    ]
  };

  return (
    <footer className="bg-dark-800 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-primary-500" />
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Cloud Secure Canada
              </span>
            </a>
            <p className="text-gray-400 mb-4 max-w-md">
              Expert cybersecurity consulting services for enterprise security operations, 
              incident response, and strategic security planning.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:cloudsecurecanada@gmail.com"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Cloud Secure Canada. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            Built with <Heart className="w-4 h-4 text-red-500 mx-1" /> for secure digital infrastructure
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
