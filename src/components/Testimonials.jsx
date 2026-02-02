import React from 'react';
import { Quote } from 'lucide-react';
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
    <section id="testimonials" className="py-20 bg-dark-900 surface-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="chip justify-center mb-6">
            <Quote className="w-4 h-4" />
            <span>Testimonials</span>
          </div>
          <h2 className="section-title leading-[1.1] pb-1">What clients say about our work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={`${testimonial.name}-${testimonial.role}`} className="card">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={`Portrait of ${testimonial.name}`}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                />
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-gray-400 text-xs">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">"{testimonial.quote}"</p>
              <div className="mt-5">
                <div className="text-gray-400 text-xs">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
