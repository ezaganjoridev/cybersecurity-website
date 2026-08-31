import React, { useId, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe2, Plane, Search, X } from 'lucide-react';

/**
 * LocationsServed
 * Region-tabbed city selector with a live filter, replacing the previous
 * wall of 40+ plain-text cities.
 *
 * SEO NOTE: every city stays mounted in the DOM at all times. Inactive
 * regions and non-matching cities are hidden with `hidden` (display:none)
 * rather than unmounted, so crawlers still see the full geographic keyword
 * set that the LocalBusiness/areaServed schema is built around. Do not
 * refactor this to conditional rendering.
 */

const REGIONS = [
  {
    id: 'gta',
    label: 'Greater Toronto Area',
    icon: MapPin,
    blurb: 'On-site capable across the GTA, with same-week response for incident-driven engagements.',
    cities: [
      'Toronto', 'Mississauga', 'Brampton', 'Markham', 'Vaughan',
      'Oakville', 'Burlington', 'Hamilton', 'Richmond Hill',
      'Pickering', 'Ajax', 'Whitby', 'Oshawa', 'Etobicoke',
      'North York', 'Scarborough',
    ],
  },
  {
    id: 'canada',
    label: 'Across Canada',
    icon: Globe2,
    blurb: 'Remote delivery coast to coast, including PIPEDA-aligned compliance work for regulated Canadian industries.',
    cities: [
      'Ottawa', 'Montreal', 'Calgary', 'Edmonton', 'Vancouver',
      'Winnipeg', 'Halifax', 'Quebec City', 'Kitchener-Waterloo', 'London (ON)',
    ],
  },
  {
    id: 'international',
    label: 'United States & International',
    icon: Plane,
    blurb: 'Remote delivery available across the US and UK, with English-language engagements supported further afield on request.',
    cities: [
      'New York', 'Boston', 'Washington DC', 'Chicago', 'Los Angeles',
      'San Francisco', 'Dallas', 'Houston', 'Atlanta', 'Seattle', 'Miami', 'Denver',
      'London', 'Manchester', 'Edinburgh', 'Dublin',
    ],
  },
];

const normalize = (s) => s.toLowerCase().trim();

const LocationsServed = () => {
  const [activeRegion, setActiveRegion] = useState('gta');
  const [query, setQuery] = useState('');
  const baseId = useId();

  const isSearching = query.trim().length > 0;

  // Which cities match, per region. Computed once per keystroke.
  const matches = useMemo(() => {
    const q = normalize(query);
    const byRegion = {};
    let total = 0;

    for (const region of REGIONS) {
      const hits = q ? region.cities.filter((c) => normalize(c).includes(q)) : region.cities;
      byRegion[region.id] = new Set(hits);
      total += hits.length;
    }

    return { byRegion, total };
  }, [query]);

  // In search mode every region with a hit opens; otherwise only the active tab.
  const isRegionVisible = (regionId) =>
    isSearching ? matches.byRegion[regionId].size > 0 : regionId === activeRegion;

  return (
    <section
      id="locations"
      className="py-16 md:py-20 bg-dark-900 border-y border-dark-800 relative overflow-hidden"
      aria-labelledby="locations-heading"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10">
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
            className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Headquartered in Toronto, Ontario, with the same senior consultant leading every
            engagement end to end. Check your city below.
          </motion.p>
        </div>

        {/* ─── Filter ─── */}
        <div className="max-w-md mx-auto mb-6">
          <label htmlFor={`${baseId}-search`} className="sr-only">
            Search for your city
          </label>
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id={`${baseId}-search`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your city, e.g. Markham"
              autoComplete="off"
              className="w-full bg-dark-800/80 border border-dark-700 rounded-none py-3 pl-10 pr-10 text-sm text-gray-100 placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
            />
            {isSearching && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-primary-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="sr-only" role="status" aria-live="polite">
            {isSearching
              ? `${matches.total} matching ${matches.total === 1 ? 'location' : 'locations'}`
              : ''}
          </p>
        </div>

        {/* ─── Region tabs ─── */}
        <div
          role="tablist"
          aria-label="Delivery regions"
          className={`flex flex-wrap justify-center gap-2 mb-8 transition-opacity ${
            isSearching ? 'opacity-40 pointer-events-none' : 'opacity-100'
          }`}
        >
          {REGIONS.map((region) => {
            const Icon = region.icon;
            const selected = !isSearching && region.id === activeRegion;

            return (
              <button
                key={region.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${region.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${region.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveRegion(region.id)}
                className={`tab-pill ${selected ? 'tab-pill-active' : 'tab-pill-idle'}`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{region.label}</span>
                <span className="text-xs opacity-60">{region.cities.length}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Panels: always mounted, hidden when inactive (see SEO note) ─── */}
        <div className="min-h-[260px]">
          {REGIONS.map((region) => {
            const Icon = region.icon;
            const visible = isRegionVisible(region.id);
            const regionMatches = matches.byRegion[region.id];

            return (
              <div
                key={region.id}
                role="tabpanel"
                id={`${baseId}-panel-${region.id}`}
                aria-labelledby={`${baseId}-tab-${region.id}`}
                hidden={!visible}
                className="card bg-dark-800/60 border-primary-900/40 mb-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-none bg-primary-500/10 text-primary-400">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{region.label}</h3>
                  {isSearching && (
                    <span className="ml-auto text-xs text-primary-400">
                      {regionMatches.size} match{regionMatches.size === 1 ? '' : 'es'}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-5 leading-relaxed">{region.blurb}</p>

                <ul className="flex flex-wrap gap-2">
                  {region.cities.map((city) => (
                    <li
                      key={city}
                      hidden={!regionMatches.has(city)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-300 bg-dark-900/60 border border-dark-700 hover:border-primary-500/50 hover:text-primary-200 transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary-400 shrink-0" aria-hidden="true" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Empty state doubles as a lead capture prompt */}
          {isSearching && matches.total === 0 && (
            <div className="card bg-dark-800/60 border-primary-900/40 text-center py-10">
              <p className="text-gray-300 mb-2">
                No match for <span className="text-primary-400 font-semibold">"{query.trim()}"</span> in the list.
              </p>
              <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
                That usually is not a problem. Most engagements are delivered remotely with secure tooling.
              </p>
              <a href="/#contact" className="btn-cta text-sm" data-cta="locations-empty-state">
                Ask about coverage in your region
              </a>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
          Don't see your city? Most cybersecurity engagements are delivered remotely with secure
          tooling.{' '}
          <a
            href="/#contact"
            className="text-primary-400 hover:text-primary-300 underline underline-offset-2"
          >
            Reach out
          </a>{' '}
          and we'll confirm coverage for your region.
        </p>
      </div>
    </section>
  );
};

export default LocationsServed;
