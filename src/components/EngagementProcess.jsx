import React from 'react';
import { Compass, ClipboardCheck, Target, Sparkles, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-20 bg-dark-900 surface-grid relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="chip-accent justify-center mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Engagement Flow</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title leading-[1.1] pb-1"
          >
            How a typical engagement runs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            A repeatable, transparent process built to move quickly without sacrificing quality or documentation.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[18px] sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-primary-500/20 to-transparent"
          />
          
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15 }}
                className="relative pl-12 sm:pl-14 group"
              >
                <div className="absolute left-0 top-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-dark-800 border border-primary-500/40 text-primary-300 flex items-center justify-center group-hover:bg-primary-500/20 group-hover:text-primary-200 transition-all duration-300 z-10">
                  {step.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-primary-100 transition-colors">{step.title}</h3>
                <p className="text-gray-400 text-sm mt-1.5 sm:mt-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementProcess;
