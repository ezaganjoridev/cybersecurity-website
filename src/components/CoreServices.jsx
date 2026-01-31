import React from 'react';
import { AlertTriangle, ShieldCheck, Radar, Cloud, Lock, Search, CheckCircle } from 'lucide-react';

const CoreServices = () => {
  const services = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Incident Response & DFIR',
      description: 'Containment, investigation, and recovery planning when security incidents disrupt operations.',
      bullets: ['Triage and containment plans', 'Evidence preservation and timelines', 'Post-incident hardening roadmap']
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Penetration Testing',
      description: 'Manual testing across network, web, and cloud environments with clear remediation steps.',
      bullets: ['Rules of engagement and scoping', 'Proof-of-concept validation', 'Retest support when fixes land']
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Security Assessments',
      description: 'Gap analysis against real-world attack paths with prioritized risk reduction.',
      bullets: ['Control effectiveness review', 'Risk-based remediation plan', 'Executive-ready reporting']
    },
    {
      icon: <Radar className="w-6 h-6" />,
      title: 'SIEM & Detection Engineering',
      description: 'SIEM architecture, use-case development, and co-managed detection coverage.',
      bullets: ['MITRE-aligned detection logic', 'Alert tuning and automation', 'SOC runbooks and handoff']
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'EDR/XDR Strategy',
      description: 'Selection, rollout, and policy tuning for enterprise and mid-market endpoints.',
      bullets: ['Coverage design and rollout plan', 'Policy and response tuning', 'Integration with SIEM/MDR']
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: 'Cloud & Identity Hardening',
      description: 'Identity-first security baselines for Microsoft 365, Azure, AWS, and Google Cloud.',
      bullets: ['Conditional access review', 'Least-privilege enforcement', 'Logging and monitoring setup']
    }
  ];

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 surface-glow opacity-60" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="chip justify-center mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Core Services</span>
          </div>
          <h2 className="section-title leading-[1.1] pb-1">Cybersecurity consulting built for fast-moving teams</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Cloud Secure Canada is a Toronto-based cyber security consultant delivering hands-on execution and clear
            remediation guidance across North America and other first-world countries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="card animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="flex items-start gap-3 mb-4 text-primary-400">
                <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/30">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{service.description}</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
