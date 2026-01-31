import React from 'react';
import { Shield, Award, Users, Heart } from 'lucide-react';

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
    'GCED • Enterprise Defense',
    'GCIH • Incident Handler',
    'GDSA • Defensible Security Architecture',
    'GPEN • Penetration Tester',
    'GCPN • Cloud Penetration Tester'
  ];

  const skills = [
    'Incident response & digital forensics',
    'Penetration testing (network, web, cloud)',
    'Zero Trust architecture design',
    'SIEM engineering (Splunk, Sentinel)',
    'Security assessments & risk reviews',
    'Security automation & detection tuning'
  ];

  return (
    <section id="about" className="py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">About</span>
          </div>
          <h2 className="section-title">Results-Driven</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A senior consultant leads every engagement, balancing technical depth with practical outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5 text-gray-400 leading-relaxed">
            <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-primary-400 mb-3">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-semibold">Our Story</span>
              </div>
              <p>
                Cloud Secure Canada is built on a mix of cybersecurity and hands‑on IT experience. After years of helping
                organizations run safer, more reliable systems, the mission became clear: deliver security and IT support
                that feels personal, practical, and easy to trust.
              </p>
              <p className="mt-4">
                We care about outcomes and long-term relationships, not upsells. Engagements are priced to be accessible,
                and the goal is to help your team become more self-sufficient through clear documentation and training.
              </p>
            </div>
            <p>
              Engagements are focused, transparent, and built around your risk profile. You get a clear plan, realistic
              recommendations, and the option for hands-on implementation support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="card">
                <div className="text-primary-500 mb-3">{highlight.icon}</div>
                <h4 className="text-lg font-semibold mb-2 text-white">{highlight.title}</h4>
                <p className="text-gray-400 text-sm">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700">
            <h3 className="text-xl font-bold mb-4 text-white">Certifications</h3>
            <ul className="space-y-2 text-gray-300">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-dark-800 rounded-2xl p-8 border border-dark-700">
            <h3 className="text-xl font-bold mb-4 text-white">Core Skills</h3>
            <ul className="space-y-2 text-gray-300">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
