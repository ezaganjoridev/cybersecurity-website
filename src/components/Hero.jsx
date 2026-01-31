import React from 'react';
import { Shield, ArrowRight, CheckCircle, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-700 rounded-full blur-3xl"></div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 text-sm font-medium">Cybersecurity Consulting</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Cybersecurity consulting that
              <span className="block bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-transparent">
                reduces risk and keeps you operational
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Cloud Secure Canada delivers incident response, penetration testing, and SIEM/SOC engineering with a
              practical, no-nonsense approach. We’re based in Toronto, Ontario, Canada, and deliver engagements
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

          <div className="card text-left">
            <h3 className="text-2xl font-bold mb-4 text-white">Engagement Options</h3>
            <p className="text-gray-400 mb-6">
              Flexible support for fast-moving security needs, from targeted assessments to long-term programs.
            </p>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5" />
                <span>Rapid incident response and recovery support</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5" />
                <span>Security assessments and penetration testing</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-400 mt-0.5" />
                <span>SIEM/SOC architecture, tuning, and automation</span>
              </div>
            </div>

            <div className="mt-8 space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Toronto, ON • Remote available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
