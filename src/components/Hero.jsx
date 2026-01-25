import React from 'react';
import { Shield, ArrowRight, Lock, Activity } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-700 rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Lock className="w-4 h-4 text-primary-400" />
          <span className="text-primary-400 text-sm font-medium">Enterprise Security Solutions</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Protecting Your Digital
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Infrastructure
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Expert cyber security consultant specializing in incident response, post breach recovery, 
          business continuity planning, SIEM integration, Splunk and Sentinel deployment, and comprehensive security operations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#services" className="btn-primary flex items-center space-x-2">
            <span>Explore Services</span>
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#about" className="btn-secondary flex items-center space-x-2">
            <span>Learn More</span>
            <Activity className="w-5 h-5" />
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
          <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg p-6">
            <div className="text-4xl font-bold text-primary-400 mb-2">10+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg p-6">
            <div className="text-4xl font-bold text-primary-400 mb-2">500+</div>
            <div className="text-gray-400">Security Incidents Handled</div>
          </div>
          <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg p-6">
            <div className="text-4xl font-bold text-primary-400 mb-2">100%</div>
            <div className="text-gray-400">Client Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
