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
    'SANS SEC501 - GCED (Advanced Security Essentials)',
    'SANS SEC504 - GCIH (Incident Handler)',
    'SANS SEC530 - GDSA (Defensible Security Architecture)',
    'SANS SEC560 - GPEN (Penetration Tester)',
    'SANS SEC588 - GCPN (Cloud Penetration Tester)'
  ];

  const expertise = [
    'Zero Trust Architecture Design & Implementation',
    'Advanced Penetration Testing (Network, Web, Cloud)',
    'Incident Response & Digital Forensics',
    'Defensible Security Architecture',
    'Cloud Security (AWS, Azure, GCP)',
    'SIEM Integration (Splunk, Sentinel, QRadar)',
    'Enterprise Defense & Threat Detection',
    'Security Automation & Orchestration'
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
                With over a decade of hands-on experience in enterprise security operations and multiple SANS GIAC certifications 
                (GCED, GCIH, GDSA, GPEN, GCPN), Cloud Secure Canada delivers elite-level cybersecurity consulting backed by 
                industry-recognized credentials in penetration testing, incident handling, defensible security architecture, 
                and cloud security.
              </p>
              <p>
                <span className="text-primary-400 font-semibold">Zero Trust is at the core of my methodology.</span> Every engagement 
                begins with the principle of "never trust, always verify." I architect security solutions that assume breach, 
                verify explicitly, and enforce least-privilege access. This includes micro-segmentation strategies, identity-centric 
                security controls, continuous validation, and comprehensive monitoring—ensuring your organization is protected 
                against both external threats and insider risks.
              </p>
              <p>
                Experience spans directing comprehensive Information Security Programs at major Higher Education institutions, 
                implementing enterprise-wide security solutions at Financial Institutions, and leading post-breach security 
                rebuilds at prominent Technology companies. This includes advanced penetration testing (network, web, API, 
                and cloud environments), incident response operations, digital forensics, and designing defensible architectures 
                that withstand sophisticated attacks.
              </p>
              <p>
                My SANS training in enterprise defense (SEC501), incident handling (SEC504), defensible security architecture 
                (SEC530), penetration testing (SEC560), and cloud penetration testing (SEC588) provides the technical depth 
                to identify vulnerabilities attackers exploit, build resilient defenses, and respond effectively when incidents occur.
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

        {/* SANS Certifications */}
        <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">
            SANS GIAC Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-gradient-to-r from-primary-600/10 to-primary-800/10 rounded-lg p-4 border border-primary-500/30 hover:border-primary-500 transition-all"
              >
                <div className="text-primary-400 mt-1"><Award className="w-5 h-5" /></div>
                <span className="text-gray-200 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas of Expertise */}
        <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">
            Areas of Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {expertise.map((skill, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-dark-900/50 rounded-lg p-4 border border-dark-700 hover:border-primary-500 transition-all"
              >
                <div className="text-primary-500 mt-1">✓</div>
                <span className="text-gray-300">{skill}</span>
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
