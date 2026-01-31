import React from 'react';
import { ShieldCheck, Globe, Sparkles, Target, Lock, Activity } from 'lucide-react';

const HomeHighlights = () => {
  const highlights = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Cybersecurity-Led',
      description: 'Incident response, penetration testing, and SOC engineering remain the core focus.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Outcome-Focused',
      description: 'Clear scopes, practical fixes, and measurable improvements you can act on.'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Trusted, Not Transactional',
      description: 'Boutique delivery with direct access to a senior consultant — no upsell pressure.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'IT Support That Reinforces Security',
      description: 'Asset tracking, deployment, and hardening to reduce operational blind spots.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Remote Delivery',
      description: 'Based in Toronto, ON, Canada with remote delivery across the United States of America, Canada, and other major first-world countries.'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Hands-On Execution',
      description: 'We can implement, document, and train your team for long‑term independence.'
    }
  ];

  return (
    <section className="py-16 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Serious Security. Practical Delivery.</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A focused practice that blends cybersecurity depth with real IT operations experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <div key={index} className="card">
              <div className="text-primary-500 mb-3">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeHighlights;
