import React, { useState } from 'react';
import { Shield, ArrowRight, Lock, Activity, Send, CheckCircle, ChevronDown, TrendingUp, TrendingDown, Clock, ShieldCheck, DollarSign, AlertTriangle } from 'lucide-react';

// Phone formatting utilities
const formatPhoneNumber = (value, countryCode) => {
  const digits = value.replace(/\D/g, '');
  
  switch (countryCode) {
    case '+1': // US/Canada
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    case '+44': // UK
      if (digits.length <= 4) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
    default:
      if (digits.length <= 4) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 14)}`;
  }
};

const countryCodes = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+358', country: 'Finland', flag: '🇫🇮' },
  { code: '+48', country: 'Poland', flag: '🇵🇱' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+30', country: 'Greece', flag: '🇬🇷' },
  { code: '+420', country: 'Czech Rep.', flag: '🇨🇿' },
  { code: '+36', country: 'Hungary', flag: '🇭🇺' },
  { code: '+40', country: 'Romania', flag: '🇷🇴' },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+355', country: 'Albania', flag: '🇦🇱' },
  { code: '+385', country: 'Croatia', flag: '🇭🇷' },
  { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
  { code: '+381', country: 'Serbia', flag: '🇷🇸' },
  { code: '+387', country: 'Bosnia', flag: '🇧🇦' },
  { code: '+389', country: 'N. Macedonia', flag: '🇲🇰' },
  { code: '+383', country: 'Kosovo', flag: '🇽🇰' },
  { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+972', country: 'Israel', flag: '🇮🇱' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+51', country: 'Peru', flag: '🇵🇪' },
];

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneCountryCode: '+1',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value, formData.phoneCountryCode);
      setFormData(prev => ({ ...prev, phone: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryCodeChange = (code) => {
    const digits = formData.phone.replace(/\D/g, '');
    const formattedPhone = formatPhoneNumber(digits, code);
    setFormData(prev => ({ ...prev, phoneCountryCode: code, phone: formattedPhone }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const FORMSPREE_ENDPOINT = 'xdagobnn';
    const fullPhone = formData.phone ? `${formData.phoneCountryCode} ${formData.phone}` : 'Not provided';
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhone,
          company: formData.company || 'Not provided',
          message: formData.message,
          source: 'Quick Quote Form'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', phoneCountryCode: '+1', company: '', message: '' });
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

            {/* Stats - Customer-focused metrics */}
            <div className="grid grid-cols-2 gap-3 mt-12">
              {/* Threat Reduction - Green (positive) */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">REDUCED</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">85%</div>
                <div className="text-gray-400 text-xs md:text-sm">Avg. Threat Reduction</div>
              </div>
              
              {/* Cost Savings - Green (positive) */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">SAVED</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">$2.4M</div>
                <div className="text-gray-400 text-xs md:text-sm">Avg. Breach Cost Avoided</div>
              </div>
              
              {/* Response Time - Fast is good (green) */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">RESPONSE</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">&lt;2hr</div>
                <div className="text-gray-400 text-xs md:text-sm">Incident Response Time</div>
              </div>
              
              {/* Compliance Rate - Green (positive) */}
              <div className="bg-dark-800/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden group hover:border-emerald-500/50 transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">ACHIEVED</span>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-1">100%</div>
                <div className="text-gray-400 text-xs md:text-sm">Compliance Success Rate</div>
              </div>
            </div>
            
            {/* Risk indicators row */}
            <div className="grid grid-cols-3 gap-3 mt-3">
              <div className="bg-dark-800/60 backdrop-blur-sm border border-red-500/30 rounded-xl p-3 text-center hover:border-red-500/50 transition-all">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-red-400 mb-0.5">0</div>
                <div className="text-gray-400 text-xs">Data Breaches</div>
              </div>
              <div className="bg-dark-800/60 backdrop-blur-sm border border-red-500/30 rounded-xl p-3 text-center hover:border-red-500/50 transition-all">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingDown className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-red-400 mb-0.5">-94%</div>
                <div className="text-gray-400 text-xs">Attack Surface</div>
              </div>
              <div className="bg-dark-800/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-3 text-center hover:border-emerald-500/50 transition-all">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-emerald-400 mb-0.5">99.9%</div>
                <div className="text-gray-400 text-xs">Uptime</div>
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
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={formData.phoneCountryCode}
                      onChange={(e) => handleCountryCodeChange(e.target.value)}
                      className="appearance-none w-[90px] px-2 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
                    >
                      {countryCodes.map(({ code, country, flag }) => (
                        <option key={code} value={code}>
                          {flag} {code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    id="hero-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder={formData.phoneCountryCode === '+1' ? '(416) 345-6789' : 'Phone number'}
                  />
                </div>
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
