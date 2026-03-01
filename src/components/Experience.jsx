import React from 'react';
import { Briefcase, Shield, Target, Layers, Settings, Server, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const competencies = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Incident Response & DFIR',
      description: 'Investigation, containment, recovery, and evidence handling during high‑impact events.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Penetration Testing',
      description: 'Network, web, and cloud testing with remediation guidance and risk prioritization.'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'SIEM & Detection Engineering',
      description: 'Use-case coverage, alert tuning, and MITRE-aligned detection across Splunk, Sentinel, QRadar, LogRhythm, ArcSight, and Sumo Logic.'
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: 'Security Architecture',
      description: 'Zero Trust design, identity-first controls, and cloud security baselines.'
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'IT Operations & Asset Management',
      description: 'Asset inventory, device deployment workflows, and endpoint hardening.'
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'GRC Alignment',
      description: 'Programs aligned with NIST, ISO 27001, SOC 2, PCI, and internal governance.'
    }
  ];

  const expandedSkills = [
    'Security program strategy and roadmapping',
    'SOC build‑out, tuning, and operational readiness',
    'Cloud security reviews (AWS, Azure, GCP)',
    'Threat hunting and detection coverage analysis',
    'EDR/XDR selection, deployment, and tuning (Defender for Endpoint, CrowdStrike, SentinelOne, Cortex XDR)',
    'Vulnerability management programs (Nessus, Tenable.io, Tenable.sc, Rapid7, Qualys)',
    'Network security tooling (Zeek, Corelight, Argus, Suricata)',
    'Security automation and response workflows',
    'Vendor and third‑party risk assessment'
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-900 surface-grid -z-10"></div>
        {/* Background Decorative Elements */}
        <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none">
            <div className="w-96 h-96 bg-primary-500 rounded-full blur-[150px]"></div>
        </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="chip justify-center mb-6"
          >
            <Briefcase className="w-4 h-4" />
            <span>Experience</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Cybersecurity Experience &amp; Skill Coverage
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A broad mix of cybersecurity depth and practical IT operations experience.
          </motion.p>
        </div>

        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {competencies.map((item, index) => (
            <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -8, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                className="card group hover:bg-dark-800/80 transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary-500"
            >
              <div className="inline-flex p-3 bg-dark-800 rounded-lg group-hover:bg-primary-900/20 text-primary-500 mb-4 transition-colors">
                  {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                  {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card bg-dark-800/40 border-primary-500/20 relative overflow-hidden"
        >
            <div className="absolute inset-0 scanline opacity-5 pointer-events-none"></div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Layers className="text-primary-500"/> Additional Strengths
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {expandedSkills.map((skill, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 p-2 rounded hover:bg-white/5 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary-500 mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
