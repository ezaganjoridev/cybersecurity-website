import React from 'react';
import { 
  Shield, 
  Search, 
  Eye, 
  Building2, 
  Layers, 
  AlertTriangle,
  FileCheck,
  Network,
  Lock,
  Activity,
  Database,
  Terminal,
  ShieldCheck,
  Bug,
  Radar,
  Server,
  Zap,
  Target
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <FileCheck className="w-8 h-8" />,
      bgIcon: <ShieldCheck className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'Enterprise Security Assessments (GCED Certified)',
      description: 'SANS GCED certified enterprise defense assessments evaluating your security posture, detection capabilities, and defensive architecture.',
      features: [
        'Enterprise defense capability assessment',
        'Security policy and procedure reviews',
        'Compliance gap analysis (ISO 27001, NIST, SOC 2)',
        'Detection and response capability evaluation',
        'Risk assessment and remediation planning'
      ]
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      bgIcon: <Bug className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'Penetration Testing (GPEN/GCPN Certified)',
      description: 'SANS GPEN and GCPN certified penetration testing services across network, web, and cloud environments using advanced offensive techniques.',
      features: [
        'External and internal network penetration testing',
        'Web application and API security testing (OWASP)',
        'Cloud penetration testing (AWS, Azure, GCP)',
        'Advanced exploitation and post-exploitation',
        'Social engineering and phishing simulations',
        'Comprehensive remediation roadmaps'
      ]
    },
    {
      icon: <Eye className="w-8 h-8" />,
      bgIcon: <Radar className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'SOC Review & Optimization',
      description: 'Evaluate and enhance your Security Operations Center effectiveness, processes, and detection capabilities.',
      features: [
        'SOC maturity assessment',
        'Incident response process review',
        'Threat detection optimization',
        'Playbook development and enhancement'
      ]
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      bgIcon: <Server className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'SOC Build-Up & Business Continuity',
      description: 'Design and implement robust Security Operations Centers with integrated business continuity planning and emergency recovery strategies tailored to your organization.',
      features: [
        'SOC architecture and design',
        'Tool selection and implementation',
        'Business continuity planning and testing',
        'Emergency recovery planning and procedures',
        'Team structure and hiring guidance',
        'Operational runbook development'
      ]
    },
    {
      icon: <Layers className="w-8 h-8" />,
      bgIcon: <Database className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'SIEM Integration & Deployment',
      description: 'Expert SIEM integration services with Splunk deployment and configuration, Microsoft Sentinel automation, and comprehensive security monitoring solutions.',
      features: [
        'Splunk Enterprise deployment and configuration',
        'Microsoft Sentinel implementation and automation',
        'QRadar and other SIEM platform integration',
        'Log source integration and custom parsing',
        'Advanced use case and alert development',
        'Dashboard and reporting configuration'
      ]
    },
    {
      icon: <AlertTriangle className="w-8 h-8" />,
      bgIcon: <Target className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'Vulnerability Management',
      description: 'Establish or enhance vulnerability management programs with risk-based prioritization and automation.',
      features: [
        'Vulnerability scanning program setup',
        'Risk-based prioritization frameworks',
        'Patch management optimization',
        'Threat intelligence integration'
      ]
    },
    {
      icon: <Activity className="w-8 h-8" />,
      bgIcon: <Zap className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'Incident Response (GCIH Certified)',
      description: 'SANS GCIH certified incident handling services leveraging proven methodologies for detection, containment, eradication, and recovery from security incidents.',
      features: [
        'Incident response planning and readiness',
        'Breach investigation and rapid containment',
        'Malware analysis and threat identification',
        'Digital forensics and evidence collection',
        'Post breach recovery and remediation',
        'Lessons learned and defense hardening'
      ]
    },
    {
      icon: <Network className="w-8 h-8" />,
      bgIcon: <Search className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'Threat Intelligence Integration',
      description: 'Integrate threat intelligence feeds into your security stack for proactive threat hunting and detection.',
      features: [
        'Threat intelligence platform selection',
        'MISP, Recorded Future, and custom feed integration',
        'IOC automation and enrichment',
        'Threat hunting program development'
      ]
    },
    {
      icon: <Lock className="w-8 h-8" />,
      bgIcon: <Shield className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'Zero Trust Architecture (GDSA Certified)',
      description: 'SANS GDSA certified defensible security architecture design built on Zero Trust principles—never trust, always verify, assume breach.',
      features: [
        'Zero Trust architecture design and implementation',
        'Micro-segmentation and network isolation',
        'Identity-centric security controls',
        'Cloud security architecture (AWS, Azure, GCP)',
        'Continuous verification and monitoring',
        'Least-privilege access enforcement'
      ]
    },
    {
      icon: <Database className="w-8 h-8" />,
      bgIcon: <Terminal className="w-32 h-32 opacity-5 absolute top-4 right-4" />,
      title: 'Security Automation & Orchestration',
      description: 'Advanced security automation with SOAR platforms, custom scripting, and workflow optimization for efficient cyber security operations.',
      features: [
        'Security automation playbook development',
        'SOAR platform implementation and configuration',
        'Splunk SOAR and Sentinel automation workflows',
        'API integration and workflow automation',
        'Custom tooling and script development',
        'Automated threat response orchestration'
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Services</span>
          </div>
          <h2 className="section-title">Comprehensive Cyber Security Solutions</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional cyber security consulting services including incident response, post breach recovery, 
            business continuity planning, SIEM integration, Splunk and Sentinel deployment, and security automation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card group hover:-translate-y-2 relative overflow-hidden"
            >
              {service.bgIcon}
              <div className="relative z-10">
                <div className="text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-gray-500 text-sm">
                      <span className="text-primary-500 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold mb-4 text-white">Ready to Secure Your Infrastructure?</h3>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Let's discuss your security needs and create a customized solution that protects your organization
            </p>
            <a href="#contact" className="inline-block px-8 py-4 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
