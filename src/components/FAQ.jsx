import React from 'react';
import { HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: 'What types of organizations do you work with?',
      answer: 'Engagements span higher education, financial services, and technology organizations, from small teams to enterprise environments. Every scope is right-sized so you get senior expertise without oversized overhead.'
    },
    {
      question: 'Do you provide managed SOC or 24/7 MDR services?',
      answer: 'We do not run a 24/7 managed SOC. We build and tune detections, design SIEM/SOC architecture, and coordinate with your in-house team or MDR provider so coverage improves without vendor lock-in.'
    },
    {
      question: 'Do you offer remote and on-site engagements?',
      answer: 'Yes. We’re based in Toronto, Ontario, Canada, and we deliver engagements remotely across Canada, the United States, and other countries such as the United Kingdom, Ireland, Australia, New Zealand, and Singapore. On-site support is available when needed. Contact us for more information regarding if we can provide services to you/your area.'
    },
    {
      question: 'What cities have you supported?',
      answer: 'Recent delivery locations include: New York (NY, US), Los Angeles (CA, US), London (England, UK), Chicago (IL, US), Washington–Baltimore (DC/MD/VA, US), Boston–Providence (MA/RI, US), Dallas–Fort Worth (TX, US), Houston (TX, US), Toronto (ON, CA), and San Francisco (CA, US).'
    },
    {
      question: 'Do you only offer cybersecurity services?',
      answer: 'Cybersecurity is the core focus, and we also deliver IT services like asset tracking, device deployment, and endpoint hardening. These services reduce blind spots and make your security program more effective.'
    },
    {
      question: 'What does a penetration test include?',
      answer: 'A scoped rules-of-engagement, manual testing, evidence-backed findings, and prioritized remediation guidance. Retesting is available to confirm fixes.'
    },
    {
      question: 'How quickly can you start?',
      answer: 'We move quickly. After a short discovery call, you receive a clear scope, timeline, and the earliest available start date. Urgent incidents are prioritized whenever possible.'
    },
    {
      question: 'Can you support Splunk or Microsoft Sentinel?',
      answer: 'Yes. We design and optimize SIEM programs for Splunk and Microsoft Sentinel, including deployment, tuning, use-case development, and automation to improve detection coverage.'
    },
    {
      question: 'Do you help with compliance readiness?',
      answer: 'Yes. We map gaps and controls to frameworks such as NIST CSF, SOC 2, ISO 27001, PCI DSS, and CIS Controls, and help organize evidence for audits.'
    },
    {
      question: 'How is pricing structured?',
      answer: 'Pricing is transparent and built to be accessible. You receive a clear scope and options that match your budget, with no pressure to buy services you do not need.'
    },
    {
      question: 'Do you offer ongoing support or retainers?',
      answer: 'Yes. Retainers cover advisory, detection tuning, incident response readiness, and hands-on implementation support each month.'
    },
    {
      question: 'What does a typical engagement include?',
      answer: 'You receive a clear scope, milestones, and deliverables. Expect practical findings, prioritized fixes, and direct guidance to help your team move quickly.'
    },
    {
      question: 'Will you train our team?',
      answer: 'Yes. Training and documentation are included so your team becomes more self-sufficient and can sustain improvements long after the engagement.'
    },
    {
      question: 'What deliverables should we expect?',
      answer: 'You will get prioritized findings, executive summaries, and remediation guidance. Implementation support is available if you want hands-on help.'
    },
    {
      question: 'How do you handle confidentiality?',
      answer: 'All engagements are handled with strict confidentiality. NDAs are supported, and sensitive data is handled using secure workflows.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="chip justify-center mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          <h2 className="section-title">Common Questions</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Short answers to help you decide if we’re a fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-400 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
