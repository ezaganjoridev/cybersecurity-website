import React from 'react';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

const FAQPage = () => {
  return (
    <>
      <SEO 
        title="FAQ | ZedGar Solutions"
        description="Find answers about our engagement models, cybersecurity services, remote delivery capabilities, and pricing."
      />
      <div className="pt-24 min-h-screen bg-dark-900 surface-grid">
        <FAQ />
      </div>
    </>
  );
};

export default FAQPage;
