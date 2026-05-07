import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2, Banknote, GraduationCap, HeartPulse,
  Cloud, Briefcase
} from 'lucide-react';

/**
 * IndustriesServed
 * Vertical-focused content block. Each industry card targets a long-tail
 * intent like "SOC 2 readiness consultant SaaS" or "PCI DSS consultant
 * fintech Toronto". Industry pages and named verticals consistently rank
 * better than generic "we serve everyone" copy.
 */
const IndustriesServed = () => {
  const industries = [
    {
      icon: Banknote,
      name: 'Financial Services & FinTech',
      blurb: 'PCI DSS readiness, SOC 2 controls, fraud detection tuning, secure cloud migrations, and incident response for banks, credit unions, payment processors, and fintech startups across Toronto and North America.'
    },
    {
      icon: Cloud,
      name: 'SaaS & Technology',
      blurb: 'SOC 2 Type I/II readiness, ISO 27001 alignment, cloud security architecture (AWS, Azure, GCP), Kubernetes hardening, and product-side penetration testing for SaaS companies preparing for enterprise sales cycles.'
    },
    {
      icon: GraduationCap,
      name: 'Higher Education',
      blurb: 'Identity-first Zero Trust for distributed campus environments, SIEM tuning for research network noise, ransomware tabletop exercises, and CIS Critical Controls alignment for colleges and universities.'
    },
    {
      icon: HeartPulse,
      name: 'Healthcare & Life Sciences',
      blurb: 'PHIPA, HIPAA, and HITRUST-aligned controls, EMR access reviews, medical device segmentation strategy, and incident response retainers for clinics, hospitals, and digital health platforms.'
    },
    {
      icon: Briefcase,
      name: 'Professional Services',
      blurb: 'Client-confidentiality-first security programs for law firms, accounting practices, and consultancies. Email defense, M365 hardening, endpoint detection, and partner-data protection.'
    },
    {
      icon: Building2,
      name: 'Manufacturing & Critical Infrastructure',
      blurb: 'OT/IT segmentation, ICS/SCADA visibility, NERC CIP and CIS IG2 alignment, vendor risk reviews, and ransomware readiness for production environments where downtime is operationally catastrophic.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <section
      id="industries"
      className="py-16 md:py-20 bg-dark-900 relative overflow-hidden"
      aria-labelledby="industries-heading"
    >
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-accent-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip-accent justify-center mb-6"
          >
            <Building2 className="w-4 h-4" />
            <span>Industries Served</span>
          </motion.div>

          <motion.h2
            id="industries-heading"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Industry-Specific Cybersecurity Consulting
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Every vertical has its own attacker patterns, regulators, and risk tolerances.
            Engagements are scoped against the frameworks and threat models that actually matter
            for your industry, not a generic checklist.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {industries.map((ind) => (
            <motion.article
              key={ind.name}
              variants={item}
              whileHover={{ y: -4, borderColor: 'rgba(168, 85, 247, 0.4)', transition: { duration: 0.25 } }}
              className="card bg-dark-800/60 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-none bg-accent-500/10 text-accent-400 group-hover:bg-accent-500/20 transition-colors">
                  <ind.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{ind.name}</h3>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{ind.blurb}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesServed;
