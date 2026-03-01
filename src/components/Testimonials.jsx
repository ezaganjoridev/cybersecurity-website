import React, { useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import avatar1 from '../assets/avatar-1.svg';
import avatar2 from '../assets/avatar-2.svg';
import avatar3 from '../assets/avatar-3.svg';
import avatar4 from '../assets/avatar-4.svg';
import avatar5 from '../assets/avatar-5.svg';
import avatar6 from '../assets/avatar-6.svg';
import avatar7 from '../assets/avatar-7.svg';
import avatar8 from '../assets/avatar-8.svg';
import avatar9 from '../assets/avatar-9.svg';

const Testimonials = () => {
    const scrollRef = useRef(null);

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

  const testimonials = [
    {
      avatar: avatar1,
      name: 'A. Morrison',
      role: 'CISO, Financial Services',
      location: 'Toronto, ON',
      quote:
        'Cloud Secure Canada scoped the engagement in a single call and delivered exactly what we needed. The incident response plan and detection tuning reduced alert noise within days, and the follow-up notes were clear enough for our team to operationalize without guesswork. It felt like working with a senior partner who understands real-world constraints.'
    },
    {
      avatar: avatar2,
      name: 'R. Patel',
      role: 'CEO, SaaS Platform',
      location: 'New York, NY',
      quote:
        'Cloud Secure Canada ran a thorough penetration test and delivered findings that were prioritized in a way our engineers could immediately act on. The team stayed involved during remediation, validating fixes and explaining trade-offs in business terms. The work felt practical, not just theoretical.'
    },
    {
      avatar: avatar3,
      name: 'L. Chen',
      role: 'VP of Engineering, FinTech',
      location: 'San Francisco, CA',
      quote:
        'Cloud Secure Canada helped us build a risk-based roadmap we could actually execute. The report was executive-friendly but also detailed enough for engineering to start fixing items the same week. The structure and prioritization made it easy to align security work with product roadmaps.'
    },
    {
      avatar: avatar4,
      name: 'K. Okafor',
      role: 'CIO, Healthcare',
      location: 'Chicago, IL',
      quote:
        'Our internal audit missed several cloud identity gaps that Cloud Secure Canada surfaced quickly. The remediation support was hands-on and pragmatic, and the documentation helped us close the loop with compliance stakeholders. We left with a clear path forward, not a pile of open questions.'
    },
    {
      avatar: avatar5,
      name: 'M. Alvarez',
      role: 'COO, Manufacturing',
      location: 'Dallas, TX',
      quote:
        'Cloud Secure Canada facilitated a ransomware tabletop that our leadership team still references. The session stayed realistic and focused on decision points, which exposed gaps we did not know we had. The follow-up action plan helped us prioritize investments without overcorrecting.'
    },
    {
      avatar: avatar6,
      name: 'J. Nguyen',
      role: 'Security Architect, Higher Education',
      location: 'Boston, MA',
      quote:
        'Cloud Secure Canada made our SIEM usable again. Tuning, use-case development, and documentation were delivered with enough detail that our analysts could sustain it after the engagement. It felt collaborative, not transactional.'
    },
    {
      avatar: avatar7,
      name: 'S. Wright',
      role: 'Director of IT, Logistics',
      location: 'Los Angeles, CA',
      quote:
        'Cloud Secure Canada gave us a clear, measurable plan and helped implement the first phase quickly. The team translated technical gaps into operational impact, which made it easy to secure leadership buy-in. We saw improvements in response time and asset visibility within the first month.'
    },
    {
      avatar: avatar8,
      name: 'T. Fischer',
      role: 'Security Engineer, Technology',
      location: 'Seattle, WA',
      quote:
        'The detection coverage review from Cloud Secure Canada gave us concrete action items and a clean mapping to MITRE ATT&CK. The tuning suggestions were practical and avoided unnecessary tool sprawl. We shipped improvements quickly with minimal disruption.'
    },
    {
      avatar: avatar9,
      name: 'P. Singh',
      role: 'VP of Operations, Professional Services',
      location: 'Toronto, ON',
      quote:
        'We appreciated the transparency from Cloud Secure Canada. The team put together a budget-aligned plan with no upsell pressure, and the deliverables were exactly what we needed for stakeholders. The engagement felt like a trusted extension of our team.'
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-900 surface-grid -z-10"></div>
        
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="text-center mb-12 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="chip justify-center mb-6"
          >
            <Quote className="w-4 h-4" />
            <span>Client Testimonials</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title leading-[1.1] pb-1"
          >
            What Clients Say About Our{' '}
            <span className="text-primary-400">Cybersecurity Consulting</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mt-4"
          >
            Feedback from CISOs, security architects, and engineering leaders who have engaged Cloud Secure Canada 
            for incident response, penetration testing, SOC engineering, and risk assessments.
          </motion.p>
        </header>

        {/* Mobile: horizontal scroll | Desktop: grid */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={`mobile-${testimonial.name}-${testimonial.role}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="card group snap-center flex-shrink-0 w-[85vw] max-w-sm flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={`Portrait of ${testimonial.name}`}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-dark-700"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-primary-900 rounded-full p-0.5 border border-dark-900">
                      <Quote className="w-2.5 h-2.5 text-primary-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{testimonial.name}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="pt-3 mt-3 border-t border-dark-700/50 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-500/50" />
                  <div className="text-gray-400 text-xs font-mono">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Scroll hint */}
          <div className="flex justify-center gap-1 mt-2">
            <span className="text-xs text-gray-500">← swipe →</span>
          </div>
        </div>

        {/* Desktop: original grid */}
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div 
                key={`${testimonial.name}-${testimonial.role}`} 
                variants={item}
                whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.4)', transition: { duration: 0.25, ease: 'easeOut' } }}
                className="card group hover:bg-dark-800/80 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                    <img
                    src={testimonial.avatar}
                    alt={`Portrait of ${testimonial.name}`}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-dark-700 ml-1"
                    loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-primary-900 rounded-full p-1 border border-dark-900">
                        <Quote className="w-3 h-3 text-primary-400" />
                    </div>
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-wide group-hover:text-primary-400 transition-colors">
                      {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs uppercase font-medium tracking-wider">
                      {testimonial.role}
                  </div>
                </div>
              </div>
              
              <div className="relative mb-6 flex-grow">
                 <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
                    "{testimonial.quote}"
                 </p>
              </div>
              
              <div className="pt-4 border-t border-dark-700/50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500/50"></div>
                <div className="text-gray-400 text-xs font-mono">{testimonial.location}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
