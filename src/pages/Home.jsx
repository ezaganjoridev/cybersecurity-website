import React, { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Globe, Award } from 'lucide-react';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

const HomeSections = lazy(() => import('../components/HomeSections'));

// Every figure here must be independently substantiable on request. Volume
// claims ("200+ engagements", "6 countries served") were removed: they were
// unverifiable, and the engagement count contradicted itself across pages.
const stats = [
  { icon: Award, value: '6', label: 'SANS GIAC certifications' },
  { icon: Clock, value: '10+', label: 'Years in the field' },
  { icon: MapPin, value: 'Toronto', label: 'Based in Ontario, Canada' },
  { icon: Globe, value: 'Remote', label: 'Delivery across Canada, US & UK' },
];

const Home = () => {
  return (
    <>
      <SEO />
      <Hero />

      {/* Credentials bar */}
      <section className="bg-dark-800 border-y border-dark-700 py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <HomeSections />
      </Suspense>
    </>
  );
};

export default Home;
