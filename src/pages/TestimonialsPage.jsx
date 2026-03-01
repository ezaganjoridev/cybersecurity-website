import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, MapPin, Award, Users, Globe } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

const trustSignals = [
  { icon: <Award className="w-5 h-5" />, label: '5 SANS GIAC Certifications', detail: 'GPEN, GCIH, GDSA, GCED, GCPN' },
  { icon: <Users className="w-5 h-5" />, label: '50+ Engagements Delivered', detail: 'Incident response, pen tests, SOC builds' },
  { icon: <Globe className="w-5 h-5" />, label: '6 Countries Served', detail: 'Canada, US, UK, Australia & more' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Based in Toronto, ON', detail: 'Remote delivery across North America' },
];

const TestimonialsPage = () => {
  return (
    <>
      <SEO 
        title="Client Testimonials — Cybersecurity Consulting Reviews"
        description="Read what CISOs, VPs of Engineering, and security leaders say about Cloud Secure Canada's cybersecurity consulting — incident response, penetration testing, SOC build-out, SIEM engineering, and GRC compliance."
        canonical="https://cloudsecurecanada.com/testimonials"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'Testimonials', url: 'https://cloudsecurecanada.com/testimonials' }
        ]}
      />
      <div className="pt-20 md:pt-24 bg-dark-900 surface-grid">
        <Testimonials />

        {/* Trust Signals */}
        <section className="py-12 sm:py-16 bg-dark-900 border-t border-dark-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Why Organizations Trust Cloud Secure Canada</h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                Our clients include CISOs, VPs of Engineering, and IT leaders at financial services, healthcare, SaaS, 
                higher education, and manufacturing organizations across North America.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {trustSignals.map((signal, i) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="text-center p-4 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-primary-500/30 transition-colors"
                >
                  <div className="inline-flex p-2 rounded-lg bg-primary-500/10 text-primary-400 mb-3">
                    {signal.icon}
                  </div>
                  <div className="text-white text-sm font-semibold mb-1">{signal.label}</div>
                  <div className="text-gray-500 text-xs">{signal.detail}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-500 transition-all duration-300 shadow-lg shadow-primary-900/50 active:scale-95 text-sm sm:text-base"
              >
                <ShieldCheck className="w-5 h-5" />
                Start Your Engagement
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-gray-500 text-xs mt-3">No commitment needed — we'll scope your requirements on a short call.</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TestimonialsPage;
