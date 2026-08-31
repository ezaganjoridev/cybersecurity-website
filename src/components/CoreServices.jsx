import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Target, Terminal, Lock, Cpu, ClipboardCheck,
  ShieldCheck, CheckCircle, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * CoreServices
 * 3x2 responsive card grid. Each card is a scannable unit: icon, title,
 * one-line positioning statement, three concrete deliverables, and a single
 * exit link. Deep links point at anchors on /services so the CTA works today
 * and keeps working if dedicated service pages get built later.
 */
const CoreServices = () => {
  const services = [
    {
      icon: Shield,
      title: 'Incident Response & DFIR',
      description: 'Containment, investigation, and recovery when an incident is actively disrupting operations.',
      bullets: ['Triage and containment plans', 'Evidence preservation and timelines', 'Post-incident hardening roadmap'],
      href: '/services#incident-response',
    },
    {
      icon: Target,
      title: 'Penetration Testing',
      description: 'Manual testing across network, web, and cloud environments with clear remediation steps.',
      bullets: ['Rules of engagement and scoping', 'Proof-of-concept validation', 'Retest support when fixes land'],
      href: '/services#penetration-testing',
    },
    {
      icon: Terminal,
      title: 'SIEM & Detection Engineering',
      description: 'SIEM architecture, use-case development, and co-managed detection coverage.',
      bullets: ['MITRE-aligned detection logic', 'Alert tuning and automation', 'SOC runbooks and handoff'],
      href: '/services#siem-soc-engineering',
    },
    {
      icon: Lock,
      title: 'Cloud & Identity Hardening',
      description: 'Identity-first security baselines for Microsoft 365, Azure, AWS, and Google Cloud.',
      bullets: ['Conditional access review', 'Least-privilege enforcement', 'Logging and monitoring setup'],
      href: '/services#cloud-security',
    },
    {
      icon: Cpu,
      title: 'EDR/XDR Strategy',
      description: 'Selection, rollout, and policy tuning for enterprise and mid-market endpoints.',
      bullets: ['Coverage design and rollout plan', 'Policy and response tuning', 'Integration with SIEM/MDR'],
      href: '/services#edr-xdr',
    },
    {
      icon: ClipboardCheck,
      title: 'Risk & Security Assessments',
      description: 'Gap analysis against real-world attack paths with prioritized risk reduction.',
      bullets: ['Control effectiveness review', 'Risk-based remediation plan', 'Executive-ready reporting'],
      href: '/services#risk-assessments',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section id="core-services" className="py-20 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 surface-glow opacity-60" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="chip justify-center mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Core Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title leading-[1.1] pb-1"
          >
            Cybersecurity consulting built for fast-moving teams
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Six senior-led capabilities. Located in Toronto, ON with remote delivery globally.
          </motion.p>
        </div>

        {/* 3x2 on desktop, 2 up on tablet, stacked on mobile */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={item}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-glow group flex flex-col p-5 sm:p-6"
              >
                <div className="flex items-center justify-center w-11 h-11 mb-4 bg-primary-500/10 border border-primary-500/30 text-primary-400 transition-colors duration-200 group-hover:bg-primary-500/20 group-hover:border-primary-500/60 group-hover:text-primary-300">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 transition-colors group-hover:text-primary-100">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2 text-sm text-gray-300 mb-6">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* mt-auto keeps every CTA on the same baseline across the row */}
                <Link
                  to={service.href}
                  data-cta="core-service-card"
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-400 hover:text-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300 transition-colors"
                >
                  <span>View Capability &amp; Deliverables</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> for {service.title}</span>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreServices;
