import React from 'react';
import { Briefcase, Shield, Target, Layers, Settings, Server } from 'lucide-react';

const Experience = () => {
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
    <section id="experience" className="py-20 bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="chip justify-center mb-6">
            <Briefcase className="w-4 h-4" />
            <span>Experience</span>
          </div>
          <h2 className="section-title">Expanded Skill Coverage</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A broad mix of cybersecurity depth and practical IT operations experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {competencies.map((item, index) => (
            <div key={index} className="card">
              <div className="text-primary-500 mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Additional Strengths</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
            {expandedSkills.map((skill, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-primary-400">•</span>
                <span className="text-sm">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
