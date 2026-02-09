import React from 'react';
import About from '../components/About';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <div className="pt-24">
      <SEO 
        title="About Us"
        description="SANS-certified experts delivering personalized cyber security consulting, incident response, and penetration testing in Toronto and globally."
      />
      <About />
    </div>
  );
};

export default AboutPage;
