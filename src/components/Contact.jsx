import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, Shield, Search, AlertTriangle, Lock, Server, FileCheck, Users, Zap, Globe, ChevronDown } from 'lucide-react';

// Phone formatting utilities
const formatPhoneNumber = (value, countryCode) => {
  // Remove all non-digit characters
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
    
    case '+61': // Australia
      if (digits.length <= 4) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
    
    case '+49': // Germany
      if (digits.length <= 4) return digits;
      if (digits.length <= 8) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
      return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`;
    
    case '+33': // France
      if (digits.length <= 1) return digits;
      if (digits.length <= 3) return `${digits.slice(0, 1)} ${digits.slice(1)}`;
      if (digits.length <= 5) return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3)}`;
      if (digits.length <= 7) return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
      return `${digits.slice(0, 1)} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
    
    case '+91': // India
      if (digits.length <= 5) return digits;
      return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
    
    default: // Generic international format
      if (digits.length <= 4) return digits;
      if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 14)}`;
  }
};

const countryCodes = [
  // North America (Default)
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  // Europe
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+48', country: 'Poland', flag: '🇵🇱' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪' },
  { code: '+354', country: 'Iceland', flag: '🇮🇸' },
  { code: '+358', country: 'Finland', flag: '🇫🇮' },
  { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
  { code: '+36', country: 'Hungary', flag: '🇭🇺' },
  { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
  { code: '+371', country: 'Latvia', flag: '🇱🇻' },
  { code: '+372', country: 'Estonia', flag: '🇪🇪' },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
  { code: '+385', country: 'Croatia', flag: '🇭🇷' },
  { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
  { code: '+40', country: 'Romania', flag: '🇷🇴' },
  { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
  { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
  { code: '+30', country: 'Greece', flag: '🇬🇷' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  // Asia Pacific
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '+853', country: 'Macau', flag: '🇲🇴' },
  { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
  { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
  { code: '+856', country: 'Laos', flag: '🇱🇦' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+977', country: 'Nepal', flag: '🇳🇵' },
  // Middle East
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+972', country: 'Israel', flag: '🇮🇱' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+962', country: 'Jordan', flag: '🇯🇴' },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
  { code: '+98', country: 'Iran', flag: '🇮🇷' },
  { code: '+964', country: 'Iraq', flag: '🇮🇶' },
  // Africa
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦' },
  { code: '+213', country: 'Algeria', flag: '🇩🇿' },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
  { code: '+218', country: 'Libya', flag: '🇱🇾' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '+256', country: 'Uganda', flag: '🇺🇬' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
  { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
  // Latin America & Caribbean
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+51', country: 'Peru', flag: '🇵🇪' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '+507', country: 'Panama', flag: '🇵🇦' },
  { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
  { code: '+509', country: 'Haiti', flag: '🇭🇹' },
  { code: '+1-809', country: 'Dominican Rep.', flag: '🇩🇴' },
  { code: '+1-787', country: 'Puerto Rico', flag: '🇵🇷' },
  { code: '+1-876', country: 'Jamaica', flag: '🇯🇲' },
  { code: '+1-868', country: 'Trinidad', flag: '🇹🇹' },
  { code: '+1-246', country: 'Barbados', flag: '🇧🇧' },
  { code: '+1-242', country: 'Bahamas', flag: '🇧🇸' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneCountryCode: '+1',
    company: '',
    services: [],
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(['assessment']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Format phone number based on selected country
      const formattedPhone = formatPhoneNumber(value, formData.phoneCountryCode);
      setFormData(prev => ({ ...prev, phone: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCountryCodeChange = (code) => {
    // Re-format phone when country changes
    const digits = formData.phone.replace(/\D/g, '');
    const formattedPhone = formatPhoneNumber(digits, code);
    setFormData(prev => ({ ...prev, phoneCountryCode: code, phone: formattedPhone }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate that at least one service is selected
    if (formData.services.length === 0) {
      alert('Please select at least one service you are interested in.');
      return;
    }
    
    const FORMSPREE_ENDPOINT = 'xdagobnn';
    
    // Format phone with country code for submission
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
          services: formData.services.join(', '),
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', phoneCountryCode: '+1', company: '', services: [], message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again or email directly at cloudsecurecanada@gmail.com');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please email directly at cloudsecurecanada@gmail.com');
    }
  };

  // Organized service categories with icons
  const serviceCategories = [
    {
      id: 'assessment',
      name: 'Security Assessment',
      icon: Search,
      services: [
        'Vulnerability Assessment',
        'Penetration Testing',
        'Red Team Engagement',
        'Application Security Testing',
        'Cloud Security Assessment',
        'Network Security Audit',
        'Wireless Security Assessment',
      ]
    },
    {
      id: 'compliance',
      name: 'Compliance & Governance',
      icon: FileCheck,
      services: [
        'SOC 2 Readiness',
        'ISO 27001 Implementation',
        'PCI DSS Compliance',
        'HIPAA Compliance',
        'GDPR Compliance',
        'Security Policy Development',
        'Risk Assessment & Management',
      ]
    },
    {
      id: 'operations',
      name: 'Security Operations',
      icon: Shield,
      services: [
        'SOC Build-Up & Optimization',
        'SIEM Implementation',
        'Security Monitoring (MDR/XDR)',
        'Threat Intelligence',
        'Log Management & Analysis',
        '24/7 Security Operations',
      ]
    },
    {
      id: 'incident',
      name: 'Incident & Crisis',
      icon: AlertTriangle,
      services: [
        'Incident Response Planning',
        'Breach Investigation',
        'Digital Forensics',
        'Ransomware Recovery',
        'Crisis Management',
        'Tabletop Exercises',
      ]
    },
    {
      id: 'identity',
      name: 'Identity & Access',
      icon: Lock,
      services: [
        'Identity & Access Management (IAM)',
        'Privileged Access Management (PAM)',
        'Zero Trust Architecture',
        'Single Sign-On (SSO)',
        'Multi-Factor Authentication',
        'Active Directory Security',
      ]
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure Security',
      icon: Server,
      services: [
        'Firewall Configuration & Review',
        'Endpoint Detection & Response (EDR)',
        'Email Security (Anti-Phishing)',
        'Web Application Firewall (WAF)',
        'DDoS Protection',
        'Data Loss Prevention (DLP)',
      ]
    },
    {
      id: 'training',
      name: 'Training & Awareness',
      icon: Users,
      services: [
        'Security Awareness Training',
        'Phishing Simulations',
        'Executive Security Briefings',
        'Developer Security Training',
        'Social Engineering Assessment',
      ]
    },
    {
      id: 'consulting',
      name: 'Strategic Consulting',
      icon: Globe,
      services: [
        'Virtual CISO Services',
        'Security Program Development',
        'Vendor Risk Assessment',
        'M&A Security Due Diligence',
        'Security Architecture Review',
        'Cloud Migration Security',
        'Other (Please describe in message)',
      ]
    },
  ];

  return (
    <section id="contact" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/30 rounded-full px-4 py-2 mb-6">
            <Mail className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">Contact</span>
          </div>
          <h2 className="section-title">Let's Discuss Your Security Needs</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to enhance your cybersecurity posture? Reach out for a consultation
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="card">
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">Message sent successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={formData.phoneCountryCode}
                      onChange={(e) => handleCountryCodeChange(e.target.value)}
                      className="appearance-none w-24 px-3 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors cursor-pointer"
                    >
                      {countryCodes.map(({ code, country, flag }) => (
                        <option key={code} value={code}>
                          {flag} {code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder={formData.phoneCountryCode === '+1' ? '(416) 345-6789' : 'Phone number'}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Services Interested In * <span className="text-gray-500 font-normal">(Select all that apply)</span>
                </label>
                
                {/* Selected services summary */}
                {formData.services.length > 0 && (
                  <div className="mb-4 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary-400 font-medium">
                        {formData.services.length} service{formData.services.length > 1 ? 's' : ''} selected
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, services: [] }))}
                        className="text-xs text-gray-400 hover:text-white transition-colors"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-primary-500/20 rounded text-xs text-primary-300"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => handleServiceToggle(service)}
                            className="hover:text-white"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service categories */}
                <div className="space-y-2">
                  {serviceCategories.map((category) => {
                    const IconComponent = category.icon;
                    const isExpanded = expandedCategories.includes(category.id);
                    const selectedInCategory = category.services.filter(s => formData.services.includes(s)).length;
                    
                    return (
                      <div key={category.id} className="border border-dark-600 rounded-lg overflow-hidden">
                        {/* Category header */}
                        <button
                          type="button"
                          onClick={() => toggleCategory(category.id)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-dark-700 hover:bg-dark-600 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-primary-400" />
                            <span className="text-white font-medium">{category.name}</span>
                            {selectedInCategory > 0 && (
                              <span className="px-2 py-0.5 bg-primary-500 rounded-full text-xs text-white">
                                {selectedInCategory}
                              </span>
                            )}
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        
                        {/* Category services */}
                        {isExpanded && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 p-2 bg-dark-800">
                            {category.services.map((service, index) => {
                              const isSelected = formData.services.includes(service);
                              return (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => handleServiceToggle(service)}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all duration-150 ${
                                    isSelected 
                                      ? 'bg-primary-500/20 border border-primary-500/50 text-primary-300' 
                                      : 'bg-dark-700 border border-transparent hover:border-dark-500 text-gray-300 hover:text-white'
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                                    isSelected 
                                      ? 'bg-primary-500 border-primary-500' 
                                      : 'border-dark-500'
                                  }`}>
                                    {isSelected && (
                                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                  <span className="truncate">{service}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
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
        
        {/* Contact info below form */}
        <div className="max-w-2xl mx-auto mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-center">
          <a href="mailto:cloudsecurecanada@gmail.com" className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors">
            <Mail className="w-5 h-5" />
            <span>cloudsecurecanada@gmail.com</span>
          </a>
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="w-5 h-5" />
            <span>Toronto, ON • Remote Available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
