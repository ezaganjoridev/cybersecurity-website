import React from 'react';
import { FileText, Shield, MapPin, Boxes } from 'lucide-react';

const Outcomes = () => {
  const deliverables = [
    'Executive summary and technical findings',
    'Prioritized remediation roadmap',
    'Evidence packets and proof-of-concepts',
    'Detection recommendations and tuning notes',
    'Retest validation and closure guidance'
  ];

  const frameworks = [
    'NIST CSF, CIS Controls, and MITRE ATT&CK',
    'SOC 2, ISO 27001, and PCI DSS readiness',
    'PIPEDA and regional privacy alignment',
    'OWASP Top 10 and secure SDLC guidance'
  ];

  const industries = [
    'Higher education, SaaS, and fintech',
    'Healthcare, manufacturing, and logistics',
    'Public sector and professional services',
    'Startups to enterprise security teams'
  ];

  const serviceAreas = [
    'Toronto & Greater Toronto Area',
    'Canada and United States delivery',
    'UK, Ireland, and APAC remote support',
    'On-site engagements when required'
  ];

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 surface-glow opacity-50" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="chip justify-center mb-6">
            <Shield className="w-4 h-4" />
            <span>What You Receive</span>
          </div>
          <h2 className="section-title leading-[1.1] pb-1">Clear outcomes, not vague recommendations</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Each engagement produces practical deliverables mapped to the frameworks your stakeholders care about.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-3 text-primary-400 mb-4">
              <FileText className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Deliverables</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 text-primary-400 mb-4">
              <Shield className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Framework Alignment</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              {frameworks.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 text-primary-400 mb-4">
              <Boxes className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Industries & Environments</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              {industries.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 text-primary-400 mb-4">
              <MapPin className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Service Areas</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              {serviceAreas.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-primary-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
