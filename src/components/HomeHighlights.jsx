import React from 'react';
import { ShieldCheck, Globe, Sparkles, Target, Lock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

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
      title: 'Remote Delivery',
      description: 'Based in Toronto, ON, Canada with remote delivery across the United States of America, Canada, and other countries globally.'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Hands-On Execution',
      description: 'We can implement, document, and train your team for long‑term independence.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <section className="py-16 bg-dark-900 border-b border-dark-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip-accent justify-center mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Why Teams Choose Us</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            Serious Security. Practical Delivery.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            A focused practice that blends cybersecurity depth with real IT operations experience.
          </motion.p>
        </div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {highlights.map((highlight, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 30px -10px rgba(14, 165, 233, 0.2)",
                borderColor: "rgba(14, 165, 233, 0.5)",
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              className="card bg-dark-800/50 hover:bg-dark-800 transition-all duration-300"
            >
              <div className="p-3 bg-primary-500/10 rounded-lg w-fit mb-4 text-primary-400 group-hover:text-primary-300">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">{highlight.title}</h3>
              <p className="text-gray-400 text-sm">{highlight.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHighlights;
