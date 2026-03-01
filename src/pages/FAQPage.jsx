import React from 'react';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

const FAQPage = () => {
  return (
    <>
      <SEO 
        title="FAQ — Cybersecurity Consulting Questions Answered"
        description="Answers to common questions about Cloud Secure Canada's cybersecurity consulting: engagement models, remote delivery, pricing, SOC support, Splunk & Sentinel, compliance readiness, and team training."
        canonical="https://cloudsecurecanada.com/faq"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'FAQ', url: 'https://cloudsecurecanada.com/faq' }
        ]}
      />
      <div className="pt-20 md:pt-24 bg-dark-900 surface-grid">
        <FAQ />
      </div>
    </>
  );
};

export default FAQPage;
