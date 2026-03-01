import React from 'react';
import About from '../components/About';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="pt-20 md:pt-24">
      <SEO 
        title="About Cloud Secure Canada — SANS-Certified Cybersecurity Consultant"
        description="Meet the SANS GIAC-certified cybersecurity consultant behind Cloud Secure Canada. 10+ years of incident response, penetration testing, SIEM/SOC engineering, and security architecture experience. Based in Toronto, delivering globally."
        canonical="https://cloudsecurecanada.com/about"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'About', url: 'https://cloudsecurecanada.com/about' }
        ]}
      />
      <About />
    </div>
  );
};

export default AboutPage;
