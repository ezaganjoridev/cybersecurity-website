import React from 'react';
import { Compass, ClipboardCheck, Target, Sparkles, GraduationCap } from 'lucide-react';

const EngagementProcess = () => {
  const steps = [
    {
      icon: <Compass className="w-5 h-5" />,
      title: 'Discovery & Scoping',
      description: 'Align on your goals, environment, and success criteria. We define rules of engagement and timelines.'
    },
    {
      icon: <ClipboardCheck className="w-5 h-5" />,
      title: 'Assessment & Evidence',
      description: 'Hands-on testing, validation, and evidence collection across infrastructure, cloud, and identity.'
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Findings & Prioritization',
      description: 'Clear, ranked findings with impact, likelihood, and concrete remediation guidance.'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'Remediation & Validation',
      description: 'Implementation support, detection tuning, and retesting to confirm risk reduction.'
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'Handoff & Enablement',
      description: 'Runbooks, documentation, and team training so improvements stick long after the engagement.'
    }
  ];

  return (
    <section className="py-20 bg-dark-900 surface-grid">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="chip-accent justify-center mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Engagement Flow</span>
          </div>
          <h2 className="section-title leading-[1.1] pb-1">How a typical engagement runs</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A repeatable, transparent process built to move quickly without sacrificing quality or documentation.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-dark-700" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative pl-14 animate-fade-up-slow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-dark-800 border border-primary-500/40 text-primary-300 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementProcess;
