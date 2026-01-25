import React from 'react';
import { Shield, Award, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Proven Expertise',
      description: '10+ years delivering enterprise security operations, incident response, and comprehensive cyber security solutions'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Cross-Industry Experience',
      description: 'Expertise across Higher Education, Financial Services, and Technology sectors with diverse security challenges'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Strategic & Tactical',
      description: 'Combines executive-level strategy development with hands-on technical implementation and operations'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Full Spectrum Capabilities',
      description: 'Comprehensive expertise from incident response and SIEM integration to security automation and forensics'
    }
  ];

  const certifications = [
    'Incident Response & Post Breach Recovery',
    'Business Continuity & Emergency Recovery Planning',
    'SIEM Integration (Splunk, Sentinel, QRadar)',
    'Splunk Enterprise Deployment & Configuration',
    'Microsoft Sentinel Automation & Orchestration',
    'Vulnerability Management & Threat Intelligence',
    'Security Automation & SOAR Implementation',
    'Cloud Security Architecture (AWS, Azure, GCP)'
  ];

  return (
    <section id="about" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">About</span>
          </div>
          <h2 className="section-title">Expert-Led Cyber Security Consulting</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white">
              Your Trusted Cyber Security Consultant
            </h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                With over a decade of hands-on experience in enterprise security operations, Cloud Secure Canada 
                brings deep expertise in incident response, post breach recovery, business continuity planning, 
                SIEM integration, Splunk deployment and configuration, Microsoft Sentinel automation, and comprehensive 
                cyber security solutions across diverse industries.
              </p>
              <p>
                Experience spans directing comprehensive Information Security Programs at major Higher Education 
                institutions, implementing enterprise-wide security solutions at Large Scale Financial Institutions, 
                and leading post-breach security rebuilds at prominent Technology companies. This includes overseeing 
                incident response operations, emergency recovery planning, vulnerability management, and compliance 
                assessments while coordinating with law enforcement and external partners during critical security incidents.
              </p>
              <p>
                The approach combines strategic vision with tactical execution—from leading complex incident response 
                operations and executing post breach recovery plans, to implementing Splunk Enterprise deployments, 
                configuring Microsoft Sentinel automation, developing business continuity strategies, and integrating 
                comprehensive SIEM solutions. Proven track record of partnering with CISOs, executive leadership, and 
                cross-functional teams to shape long-term cyber security strategies and drive measurable results.
              </p>
              <p>
                Capabilities span the full spectrum of cyber security operations: from vulnerability management and 
                penetration testing to security automation and orchestration, from threat intelligence integration to 
                digital forensics, from SOC build-up to enterprise security architecture. This breadth of experience 
                ensures comprehensive, tailored solutions for any cybersecurity challenge.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="card">
                <div className="text-primary-500 mb-3">
                  {highlight.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">
                  {highlight.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Areas of Expertise */}
        <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">
            Areas of Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-dark-900/50 rounded-lg p-4 border border-dark-700 hover:border-primary-500 transition-all"
              >
                <div className="text-primary-500 mt-1">✓</div>
                <span className="text-gray-300">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conference & Recognition */}
        <div className="mt-12 bg-gradient-to-r from-primary-600/10 to-primary-800/10 border border-primary-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-white">
            Industry Recognition
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Presented on Security Automation and Asset Tracking at <span className="text-primary-400 font-semibold">CANHEIT 2023</span>, 
            showcasing advanced Splunk implementations and log management strategies
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
