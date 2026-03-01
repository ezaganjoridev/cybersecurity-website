import React from 'react';
import { Shield, Award, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const highlights = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'SANS GIAC Certified',
      description: 'GCED, GCIH, GDSA, GPEN, and GCPN certified with deep technical coverage.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Enterprise Experience',
      description: '10+ years supporting higher education, financial services, and technology teams.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Hands-on Delivery',
      description: 'Direct implementation, clear reporting, and practical remediation guidance.'
    }
  ];

  const certifications = [
    'GIAC Certified Enterprise Defender (GCED)',
    'GIAC Certified Incident Handler (GCIH)',
    'GIAC Defensible Security Architect (GDSA)',
    'GIAC Penetration Tester (GPEN)',
    'GIAC Cloud Penetration Tester (GCPN)'
  ];

  const skills = [
    'Incident response & digital forensics [Velociraptor, KAPE, Volatility]',
    'Penetration testing (network, web, cloud) [Nmap, Burp Suite, Metasploit]',
    'Zero Trust architecture design [Entra ID, Okta, Zscaler]',
    'SIEM engineering [Splunk, Microsoft Sentinel, QRadar, LogRhythm]',
    'Security assessments & risk reviews [NIST CSF, CIS Controls, ISO 27001, SOC 2]',
    'Security automation & detection tuning [Splunk SOAR, Cortex XSOAR, Sentinel Logic Apps]'
  ];

  return (
    <section id="about" className="py-20 bg-dark-900 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary-700/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip justify-center mb-6"
          >
            <Shield className="w-4 h-4" />
            <span>About</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Results-Driven
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A senior consultant leads every engagement, balancing technical depth with practical outcomes.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-gray-400 leading-relaxed"
          >
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 relative overflow-hidden group hover:border-primary-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-2 text-primary-400 mb-3 relative">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold">Our Story</span>
              </div>
              <p className="relative">
                Cloud Secure Canada is built on a mix of cybersecurity and hands‑on IT experience. After years of helping
                organizations run safer, more reliable systems, the mission became clear: deliver security and IT support
                that feels personal, practical, and easy to trust.
              </p>
              <p className="mt-4 relative">
                We care about outcomes and long-term relationships, not upsells. Engagements are priced to be accessible,
                and the goal is to help your team become more self-sufficient through clear documentation and training.
              </p>
            </div>
            <p>
              Engagements are focused, transparent, and built around your risk profile. You get a clear plan, realistic
              recommendations, and the option for hands-on implementation support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="card"
              >
                <div className="text-primary-500 mb-3">{highlight.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{highlight.title}</h4>
                <p className="text-gray-400 text-sm">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-dark-800 rounded-2xl p-5 sm:p-8 border border-dark-700 hover:border-primary-500/30 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Award className="w-24 h-24 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white relative">Certifications</h3>
            <ul className="space-y-2 text-gray-300 relative">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-dark-800 rounded-2xl p-5 sm:p-8 border border-dark-700 hover:border-primary-500/30 transition-colors relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 hidden sm:block">
              <Shield className="w-24 h-24 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white relative">Core Skills</h3>
            <ul className="space-y-2 text-gray-300 relative">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
