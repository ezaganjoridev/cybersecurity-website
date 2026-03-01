import React from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';

const ServicesPage = () => {
  return (
    <div className="pt-20 md:pt-24">
      <SEO 
        title="Cybersecurity Services — SOC Build, Penetration Testing, GRC & Security Automation" 
        description="Expert cybersecurity consulting: SOC build-out & SIEM engineering (Splunk, Sentinel), penetration testing, GRC compliance readiness, security automation & SOAR, alert tuning, and incident response. Toronto-based, remote delivery across North America."
        canonical="https://cloudsecurecanada.com/services"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'Cybersecurity Services', url: 'https://cloudsecurecanada.com/services' }
        ]}
      />
      <Services />
    </div>
  );
};

export default ServicesPage;
