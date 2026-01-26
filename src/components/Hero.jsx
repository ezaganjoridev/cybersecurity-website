import React, { useState } from 'react';
import { Shield, ArrowRight, Lock, Activity, Send, CheckCircle } from 'lucide-react';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const FORMSPREE_ENDPOINT = 'xdagobnn';
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          company: formData.company || 'Not provided',
          message: formData.message,
          source: 'Quick Quote Form'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again or email directly at cloudsecurecanada@gmail.com');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please email directly at cloudsecurecanada@gmail.com');
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-700 rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <Lock className="w-4 h-4 text-primary-400" />
              <span className="text-primary-400 text-sm font-medium">Enterprise Security Solutions</span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Protecting Your Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Infrastructure
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-400 mb-8">
              Expert cyber security consultant specializing in incident response, post breach recovery, 
              business continuity planning, SIEM integration, Splunk and Sentinel deployment, and comprehensive security operations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">10+</div>
                <div className="text-gray-400 text-xs md:text-sm">Years Experience</div>
              </div>
              <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">500+</div>
                <div className="text-gray-400 text-xs md:text-sm">Incidents Handled</div>
              </div>
              <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">50+</div>
                <div className="text-gray-400 text-xs md:text-sm">SIEM Deployments</div>
              </div>
              <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-400 mb-1">&lt;4hr</div>
                <div className="text-gray-400 text-xs md:text-sm">Avg Response Time</div>
              </div>
            </div>
            
            {/* Additional metrics row */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 rounded-lg p-3 text-center">
                <div className="text-lg md:text-xl font-bold text-white mb-0.5">$50M+</div>
                <div className="text-gray-400 text-xs">Assets Protected</div>
              </div>
              <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 rounded-lg p-3 text-center">
                <div className="text-lg md:text-xl font-bold text-white mb-0.5">99.9%</div>
                <div className="text-gray-400 text-xs">Uptime Maintained</div>
              </div>
              <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 rounded-lg p-3 text-center">
                <div className="text-lg md:text-xl font-bold text-white mb-0.5">0</div>
                <div className="text-gray-400 text-xs">Repeat Breaches</div>
              </div>
            </div>
          </div>

          {/* Right side - Quick Quote Form */}
          <div className="bg-dark-800/80 backdrop-blur-sm border border-dark-700 rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">Get in contact for a quick quote</h3>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">Message sent successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="hero-name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="hero-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="hero-email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="hero-email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="hero-phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="hero-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="hero-company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="hero-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label htmlFor="hero-message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="hero-message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Tell me about your security needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
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
