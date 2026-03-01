import React from 'react';
import { 
  ShieldCheck, AlertTriangle, Target, Layers, Lock, 
  Search, Laptop, Boxes, PackageCheck, Radar, 
  Activity, ClipboardCheck, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Services = () => {
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

  const cyberServices = [
    {
      icon: <AlertTriangle className="w-7 h-7" />,
      title: 'Incident Response & Recovery',
      description: 'Contain threats quickly, preserve evidence, and restore operations with clear remediation guidance.'
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: 'Penetration Testing',
      description: 'Manual testing for network, web, and cloud environments with actionable remediation steps.'
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: 'Security Assessments',
      description: 'Evaluate defensive posture, detection gaps, and readiness against real-world attack paths.'
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: 'SIEM & SOC Engineering',
      description: 'Design, deploy, and optimize SIEM platforms including Splunk, Microsoft Sentinel, QRadar, LogRhythm, ArcSight, and Sumo Logic.'
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: 'EDR/XDR Strategy & Deployment',
      description: 'Selection, rollout, and tuning for Microsoft Defender for Endpoint, CrowdStrike Falcon, SentinelOne, Palo Alto Cortex XDR, and other XDR agents.'
    },
    {
      icon: <Activity className="w-7 h-7" />,
      title: 'Threat Hunting & Detection Coverage',
      description: 'Proactive threat hunts, ATT&CK coverage reviews, and detection gap analysis to improve visibility.'
    },
    {
      icon: <AlertTriangle className="w-7 h-7" />,
      title: 'Ransomware Readiness & Tabletop Exercises',
      description: 'Playbooks, tabletop simulations, and response workflows to reduce downtime during high-impact events.'
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: 'Cloud & Identity Security',
      description: 'Identity-first architecture guidance for least privilege, conditional access, and secure cloud adoption.'
    },
    {
      icon: <Search className="w-7 h-7" />,
      title: 'Vulnerability Management',
      description: 'Vulnerability management with Nessus, Tenable Vulnerability Management (Tenable.io), Tenable.sc, Rapid7 InsightVM, and Qualys VMDR—tuned for risk-based prioritization and reporting.'
    }
  ];

  const itServices = [
    {
      icon: <Boxes className="w-7 h-7" />,
      title: 'Asset Management & Tracking',
      description: 'Create accurate inventories, tag assets, and maintain lifecycle visibility across environments.'
    },
    {
      icon: <Laptop className="w-7 h-7" />,
      title: 'Device Deployment & Lifecycle',
      description: 'Standardized builds, secure provisioning, and end‑of‑life workflows for laptops and servers.'
    },
    {
      icon: <PackageCheck className="w-7 h-7" />,
      title: 'Endpoint Hardening',
      description: 'Baseline configurations, patching processes, and policy enforcement to reduce exposure.'
    },
    {
      icon: <Radar className="w-7 h-7" />,
      title: 'Operational Readiness',
      description: 'Documentation, runbooks, and system checks that keep IT services reliable and secure.'
    }
  ];

  const securityTooling = [
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: 'Network Security Tooling',
      description: 'Deploy and tune visibility tools including Zeek, Corelight, Argus, and Suricata for deeper network insight.'
    }
  ];

  const engagementModels = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Rapid Incident Response',
      description: 'Priority support when outages or breaches occur, with containment and recovery guidance.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Fixed-Scope Assessments',
      description: 'Pen tests, security reviews, or cloud assessments with clear deliverables and timelines.'
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: 'Ongoing Security Retainers',
      description: 'Recurring advisory, detection tuning, and hands-on implementation support each month.'
    }
  ];

  const deliverables = [
    'Executive summary with risk context',
    'Technical findings with evidence',
    'Prioritized remediation backlog',
    'Detection and monitoring recommendations',
    'Retest or validation support'
  ];

  const platforms = [
    'Splunk, Microsoft Sentinel, QRadar, LogRhythm',
    'Microsoft 365, Azure, AWS, Google Cloud',
    'Defender for Endpoint, CrowdStrike, SentinelOne',
    'Nessus, Tenable, Rapid7, Qualys',
    'Okta, Entra ID, Conditional Access'
  ];

  return (
    <section id="services" className="py-20 bg-dark-900 surface-grid relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <div className="w-64 h-64 border border-primary-500/30 rounded-full animate-spin-slow dashed-circle"></div>
        </div>
        
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip justify-center mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Services</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Cybersecurity First. <br/>
            <span className="text-primary-400">IT Support That Reinforces It.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Cybersecurity is the core focus, with complementary IT services that strengthen visibility, control, and readiness.
          </motion.p>
        </div>

        {/* Cyber Services */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-dark-700 pb-2">
            <ShieldCheck className="text-primary-500 w-6 h-6" />
            <h3 className="text-2xl font-bold text-white">Cybersecurity Services</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {cyberServices.map((service, index) => (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="card group hover:bg-dark-800/80 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-dark-800 rounded-lg group-hover:bg-primary-900/20 text-primary-500 transition-colors">
                        {service.icon}
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
                            {service.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* IT Services */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-dark-700 pb-2">
            <Laptop className="text-primary-500 w-6 h-6" />
            <h3 className="text-2xl font-bold text-white">IT & Operational Services</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {itServices.map((service, index) => (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="card group hover:bg-dark-800/80 transition-all duration-300"
              >
               <div className="flex items-start gap-4">
                    <div className="p-3 bg-dark-800 rounded-lg group-hover:bg-primary-900/20 text-primary-500 transition-colors">
                        {service.icon}
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
                            {service.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Tooling */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-dark-700 pb-2">
            <Layers className="text-primary-500 w-6 h-6" />
            <h3 className="text-2xl font-bold text-white">Security Tooling</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityTooling.map((service, index) => (
              <motion.div 
                key={index}
                variants={item}
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.4)' }} 
                className="card group hover:bg-dark-800/80 transition-all duration-300"
              >
               <div className="flex items-start gap-4">
                    <div className="p-3 bg-dark-800 rounded-lg group-hover:bg-primary-900/20 text-primary-500 transition-colors">
                        {service.icon}
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
                            {service.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Engagement Models */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6 border-b border-dark-700 pb-2">
            <Target className="text-primary-500 w-6 h-6" />
            <h3 className="text-2xl font-bold text-white">Engagement Models</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementModels.map((model, idx) => (
              <motion.div 
                key={model.title} 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.4)' }}
                className="card group text-center hover:bg-dark-800/80"
              >
                <div className="inline-flex p-4 bg-dark-800 rounded-full mb-4 group-hover:bg-primary-900/20 text-primary-500 transition-all duration-300 group-hover:scale-110">
                    {model.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-primary-400 transition-colors">
                    {model.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">{model.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deliverables & Platforms */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card bg-dark-800/50 border-primary-900/50"
          >
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <ClipboardCheck className="text-primary-500"/> What You Receive
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {deliverables.map((item, i) => (
                <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-2 rounded hover:bg-dark-700/50 transition-colors"
                >
                  <span className="text-primary-400 mt-0.5">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="card bg-dark-800/50 border-primary-900/50"
          >
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                <Boxes className="text-primary-500"/> Platforms Supported
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              {platforms.map((item, i) => (
                <motion.li 
                    key={item} 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-2 rounded hover:bg-dark-700/50 transition-colors"
                >
                  <span className="text-primary-400 mt-0.5">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/90 border border-dark-600 rounded-2xl p-10 text-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-primary-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="relative z-10">
            <div className="inline-flex p-3 bg-dark-800 rounded-full mb-6 border border-dark-600">
                <Radar className="w-8 h-8 text-primary-400 animate-pulse" />
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-white">Global Remote Delivery</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Based in Toronto, ON, Canada with secure remote delivery across the United States, Canada, and globally.
            </p>
            <Link 
                to="/#contact" 
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-500 transition-all duration-300 shadow-lg shadow-primary-900/50 active:scale-95 sm:group-hover:scale-105 text-sm sm:text-base"
            >
                Request a Scope <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
