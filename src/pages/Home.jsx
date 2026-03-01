import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Globe, Award } from 'lucide-react';
import Hero from '../components/Hero';
import HomeHighlights from '../components/HomeHighlights';
import CoreServices from '../components/CoreServices';
import EngagementProcess from '../components/EngagementProcess';
import Outcomes from '../components/Outcomes';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const stats = [
  { icon: Shield, value: '200+', label: 'Engagements delivered' },
  { icon: Clock, value: '10+', label: 'Years experience' },
  { icon: Globe, value: '6', label: 'Countries served' },
  { icon: Award, value: '5', label: 'SANS GIAC certs' },
];

const Home = () => {
  return (
    <>
      <SEO />
      <Hero />

      {/* Social proof stats bar */}
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

      <HomeHighlights />
      <CoreServices />
      <EngagementProcess />
      <Outcomes />
      <Contact />
    </>
  );
};

export default Home;
