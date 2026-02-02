import React from 'react';
import { Shield, ArrowRight, CheckCircle, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-500 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-700 rounded-full blur-3xl animate-float-slow"></div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-up">
            <div className="chip mb-8 justify-center lg:justify-start">
              <Shield className="w-4 h-4" />
              <span>Cybersecurity Consulting</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Cybersecurity consulting that
              <span className="block bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                reduces risk and keeps you operational
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Cloud Secure Canada delivers incident response, penetration testing, and SIEM/SOC engineering with a
              practical, no-nonsense approach. As a Toronto-based cyber security consultant, we deliver engagements
              remotely across Canada, the United States, and other countries such as the United Kingdom, Ireland,
              Australia, New Zealand, and Singapore. On-site support is available when needed.
            </p>

            <div className="space-y-3 text-gray-300 text-sm md:text-base">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400" />
                <span>Incident response & post-breach recovery</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400" />
                <span>Penetration testing (network, web, cloud)</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400" />
                <span>SIEM/SOC engineering (Splunk, Sentinel)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-10">
              <Link to="/#contact" className="btn-primary flex items-center space-x-2">
                <span>Book a Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services" className="btn-secondary">
                View Services
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary-500/30 bg-dark-900/90 p-6 text-left animate-fade-up-slow shadow-[0_0_32px_rgba(14,165,233,0.18)]">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary-200/80 mb-5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="ml-2">secure terminal</span>
            </div>

            <div className="space-y-4 font-mono text-sm text-gray-200">
              <div>
                <p className="text-primary-100/80">
                  <span className="text-emerald-300">admin@cloudsecurecanada</span>
                  <span className="text-primary-300">:~$</span> cat engagement-options
                </p>
                <p className="mt-2 text-gray-300">
                  Flexible support for fast-moving security needs, from targeted assessments to long-term programs.
                </p>
              </div>

              <div className="space-y-2 text-gray-200">
                <p>
                  <span className="text-emerald-300">[01]</span> Rapid incident response and recovery support
                </p>
                <p>
                  <span className="text-emerald-300">[02]</span> Security assessments and penetration testing
                </p>
                <p>
                  <span className="text-emerald-300">[03]</span> SIEM/SOC architecture, tuning, and automation
                </p>
              </div>

              <div className="pt-2 text-primary-100/70">
                <span className="text-emerald-300">admin@cloudsecurecanada</span>
                <span className="text-primary-300">:~$</span> location --site "Toronto, ON • Remote available"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
