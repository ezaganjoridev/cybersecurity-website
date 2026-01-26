import React, { useState, useEffect } from 'react';
import { Briefcase, Award, Shield, Target, ChevronLeft, ChevronRight } from 'lucide-react';

const Experience = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const highlights = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Incident Response & Digital Forensics',
      description: 'Led comprehensive DFIR operations, threat hunting initiatives, ransomware recovery, and breach remediation. Expert in forensic analysis, evidence preservation, chain of custody, and coordinating with law enforcement and legal teams during critical security events',
      stats: '10+ Years'
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'SIEM, SOAR & XDR Solutions',
      description: 'Architected and deployed Splunk, Microsoft Sentinel, and XDR platforms with SOAR automation. Expertise in threat detection engineering, custom detection rules, MITRE ATT&CK mapping, log analytics, and building automated playbooks for rapid incident triage',
      stats: '500+ Incidents'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Zero Trust & Cloud Security',
      description: 'Designed Zero Trust Architecture (ZTA) frameworks, implemented IAM/PAM solutions, and secured multi-cloud environments (AWS, Azure, GCP). Proficient in CSPM, CASB, container security, and infrastructure-as-code security assessments',
      stats: 'Industry Speaker'
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: 'GRC & Security Program Leadership',
      description: 'Built and led security teams while driving compliance initiatives across NIST CSF, ISO 27001, SOC 2, PCI-DSS, and HIPAA. Expert in risk assessments, security awareness training, vendor risk management, and executive-level security reporting',
      stats: '15+ Mentored'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-dark-800 to-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
            <Briefcase className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Expertise</span>
          </div>
          <h2 className="section-title">Core Competencies</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Proven expertise in enterprise security operations and strategic leadership
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {highlights.map((highlight, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="card mx-4 min-h-[300px] flex flex-col items-center justify-center text-center p-12">
                    <div className="text-primary-500 mb-6">
                      {highlight.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-white">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-2xl">
                      {highlight.description}
                    </p>
                    <div className="inline-block bg-primary-500/10 border border-primary-500/30 rounded-full px-6 py-2">
                      <span className="text-primary-400 font-semibold">{highlight.stats}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-dark-800 border border-primary-500 hover:bg-primary-500/20 text-primary-400 p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-dark-800 border border-primary-500 hover:bg-primary-500/20 text-primary-400 p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-primary-500 w-8' : 'bg-dark-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all">
            <div className="text-3xl font-bold text-primary-400 mb-2">10+</div>
            <div className="text-gray-400 text-sm">Years Experience</div>
          </div>
          <div className="text-center bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all">
            <div className="text-3xl font-bold text-primary-400 mb-2">500+</div>
            <div className="text-gray-400 text-sm">Incidents Handled</div>
          </div>
          <div className="text-center bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all">
            <div className="text-3xl font-bold text-primary-400 mb-2">15+</div>
            <div className="text-gray-400 text-sm">Team Members Mentored</div>
          </div>
          <div className="text-center bg-dark-800 rounded-lg p-6 border border-dark-700 hover:border-primary-500 transition-all">
            <div className="text-3xl font-bold text-primary-400 mb-2">100%</div>
            <div className="text-gray-400 text-sm">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
