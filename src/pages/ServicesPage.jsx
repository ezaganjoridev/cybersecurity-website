import React from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';

const ServicesPage = () => {
  return (
    <div className="pt-24">
      <SEO 
        title="Cyber Security Services" 
        description="Comprehensive cyber security services including incident response, penetration testing, SIEM engineering, and vulnerability management."
      />
      <Services />
    </div>
  );
};

export default ServicesPage;
