import React from 'react';
import { ShieldCheck, AlertTriangle, Target, Layers, Lock, Search, Laptop, Boxes, PackageCheck, Radar, Activity, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
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
    <section id="services" className="py-20 bg-dark-900 surface-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="chip justify-center mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Services</span>
          </div>
          <h2 className="section-title">Cybersecurity First. IT Support That Reinforces It.</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Cybersecurity is the core focus, with complementary IT services that strengthen visibility, control, and readiness.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold text-white mb-4">Cybersecurity Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cyberServices.map((service, index) => (
              <div key={index} className="card">
                <div className="text-primary-500 mb-4">{service.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-white">{service.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">IT & Operational Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itServices.map((service, index) => (
              <div key={index} className="card">
                <div className="text-primary-500 mb-4">{service.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-white">{service.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Security Tooling</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityTooling.map((service, index) => (
              <div key={index} className="card">
                <div className="text-primary-500 mb-4">{service.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-white">{service.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Engagement Models</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementModels.map((model) => (
              <div key={model.title} className="card">
                <div className="text-primary-500 mb-4">{model.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{model.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-white">What You Receive</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-white">Platforms Supported</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              {platforms.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-dark-900/70 border border-dark-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3 text-white">Global Remote Delivery</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Based in Toronto, ON, Canada with remote delivery across the United States of America, Canada, and other major first-world countries.
          </p>
          <Link to="/#contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300">
            Request a Scope
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
