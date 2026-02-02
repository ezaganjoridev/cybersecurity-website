import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: [],
    message: '',
    otherService: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    'Incident response & recovery',
    'Penetration testing',
    'Security assessments',
    'SIEM/SOC engineering',
    'Zero Trust & cloud security',
    'Vulnerability management',
    'Asset management & tracking',
    'Device deployment & lifecycle',
    'Endpoint hardening',
    'Operational readiness',
    'Other'
  ];

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)})-${digits.slice(3)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 3)})-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    const country = digits.slice(0, digits.length - 10);
    const area = digits.slice(-10, -7);
    const mid = digits.slice(-7, -4);
    const last = digits.slice(-4);
    return `+${country} (${area})-${mid}-${last}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValue = name === 'phone' ? formatPhone(value) : value;
    setFormData(prev => ({ ...prev, [name]: nextValue }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const isSelected = prev.services.includes(service);
      return {
        ...prev,
        services: isSelected ? prev.services.filter(s => s !== service) : [...prev.services, service],
        otherService: isSelected && service === 'Other' ? '' : prev.otherService
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.services.length === 0) {
      alert('Please select at least one service you are interested in.');
      return;
    }

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
          services: formData.services.join(', '),
          otherService: formData.otherService || 'Not provided',
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', services: [], message: '', otherService: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="chip mb-6">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </div>
            <h2 className="section-title leading-[1.1] pb-1">Let’s plan your next security step</h2>
            <p className="text-lg text-gray-400 mb-8">
              Share your goals, timeline, and environment. You’ll get a clear scope and a straightforward plan.
            </p>

            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>Located in North America (Toronto, ON) with remote delivery Globally</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-2xl font-bold mb-6 text-white">Request a consultation</h3>

            {submitted && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">Message sent successfully!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="(416)-555-0123"
                />
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
                  Services Interested In *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceOptions.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`group relative overflow-hidden rounded-lg border px-3 py-3 text-left text-sm transition-all duration-200 ${
                          isSelected
                            ? 'border-primary-500 text-primary-200'
                            : 'border-dark-600 text-gray-300 hover:border-primary-500/50'
                        }`}
                      >
                        <span
                          className={`absolute inset-0 transition-all duration-300 ${
                            isSelected
                              ? 'bg-primary-500/15 opacity-100'
                              : 'bg-primary-500/10 opacity-0 group-hover:opacity-100'
                          }`}
                        />
                        <span className="relative flex items-center">
                          <span className="leading-snug">{service}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                {formData.services.includes('Other') && (
                  <div className="mt-4">
                    <label htmlFor="otherService" className="block text-sm font-medium text-gray-300 mb-2">
                      Other (please describe)
                    </label>
                    <textarea
                      id="otherService"
                      name="otherService"
                      value={formData.otherService}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      placeholder="Describe the service you need..."
                    ></textarea>
                  </div>
                )}
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
      </div>
    </section>
  );
};

export default Contact;
