import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe2, Plane } from 'lucide-react';

/**
 * LocationsServed
 * Local SEO content block: names every GTA city plus broader Canadian
 * and international delivery markets. Heavy keyword density on geographic
 * terms is what helps "cybersecurity consultant Toronto" / "pen testing
 * Mississauga" / "SOC 2 readiness Canada" style queries land.
 */
const LocationsServed = () => {
  const gtaCities = [
    'Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan',
    'Oakville', 'Burlington', 'Hamilton', 'Richmond Hill',
    'Pickering', 'Ajax', 'Whitby', 'Oshawa', 'Etobicoke',
    'North York', 'Scarborough'
  ];

  const canadianCities = [
    'Ottawa', 'Montreal', 'Calgary', 'Edmonton', 'Vancouver',
    'Winnipeg', 'Halifax', 'Quebec City', 'Kitchener-Waterloo', 'London (ON)'
  ];

  const usCities = [
    'New York', 'Boston', 'Washington DC', 'Chicago', 'Los Angeles',
    'San Francisco', 'Dallas', 'Houston', 'Atlanta', 'Seattle', 'Miami', 'Denver'
  ];

  const ukCities = ['London', 'Manchester', 'Edinburgh', 'Dublin'];

  return (
    <section
      id="locations"
      className="py-16 md:py-20 bg-dark-900 border-y border-dark-800 relative overflow-hidden"
      aria-labelledby="locations-heading"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip justify-center mb-6"
          >
            <MapPin className="w-4 h-4" />
            <span>Locations Served</span>
          </motion.div>

          <motion.h2
            id="locations-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Cybersecurity Consulting in Toronto, the GTA, and Beyond
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Headquartered in Toronto, Ontario, Cloud Secure Canada delivers boutique cybersecurity
            consulting across the Greater Toronto Area, throughout Canada, and internationally. Whether
            you need on-site penetration testing in Mississauga, a SOC build in Markham, or a fully
            remote SOC 2 readiness program for a fintech in New York or London, the same senior
            consultant leads the engagement end to end.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="card bg-dark-800/60 border-primary-900/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Greater Toronto Area</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              On-site capable across the GTA, with same-week response for incident-driven engagements.
            </p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-gray-300">
              {gtaCities.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-400" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card bg-dark-800/60 border-primary-900/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
                <Globe2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Across Canada</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Remote delivery for organizations operating coast to coast, including PIPEDA-aligned
              compliance work for regulated Canadian industries.
            </p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-gray-300">
              {canadianCities.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-400" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card bg-dark-800/60 border-primary-900/40"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">United States, UK, and Global</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Active engagements in the US (NY, MA, DC, IL, CA, TX), the United Kingdom and Ireland,
              plus delivery in Australia, New Zealand, Singapore, and Western Europe.
            </p>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-gray-300">
              {[...usCities, ...ukCities].map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-400" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-gray-500 mt-10 max-w-2xl mx-auto"
        >
          Don't see your city? Most cybersecurity engagements are delivered remotely with secure
          tooling. <a href="/#contact" className="text-primary-400 hover:text-primary-300 underline underline-offset-2">Reach out</a> and we'll confirm coverage for your region.
        </motion.p>
      </div>
    </section>
  );
};

export default LocationsServed;
