import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

/**
 * NotFoundPage
 * Catch-all for unmatched routes. It exists mainly so retired URLs — the
 * removed /testimonials among them — land on real copy instead of an empty
 * app shell while they age out of search indexes. Always noindex.
 */
const suggestions = [
  { name: 'Cybersecurity services', href: '/services' },
  { name: 'About the practice', href: '/about' },
  { name: 'Engagement experience', href: '/experience' },
  { name: 'Blog', href: '/blog' },
  { name: 'FAQ', href: '/faq' },
];

const NotFoundPage = () => (
  <>
    <SEO
      title="Page Not Found"
      description="The page you requested is not available. Browse cybersecurity services, engagement experience, or get in touch with Cloud Secure Canada."
      noindex
    />
    <div className="page-top bg-dark-900 surface-grid min-h-[70vh] flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="chip justify-center mb-6">
            <Compass className="w-4 h-4" />
            <span>404</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            This page isn&rsquo;t here anymore
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            The address may be out of date, or the page may have been retired. Everything
            current is one of the links below.
          </p>

          <nav aria-label="Suggested pages" className="flex flex-wrap justify-center gap-3 mb-10">
            {suggestions.map((s) => (
              <Link
                key={s.href}
                to={s.href}
                className="px-4 py-2 text-sm text-gray-300 bg-dark-800/60 border border-dark-700 hover:border-primary-500/40 hover:text-white transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </nav>

          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-onPrimary font-semibold hover:bg-primary-500 transition-colors duration-200 active:scale-95 text-sm sm:text-base"
          >
            Get in touch
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </div>
  </>
);

export default NotFoundPage;
