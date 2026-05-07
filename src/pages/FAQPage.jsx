import React from 'react';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

const FAQPage = () => {
  return (
    <>
      <SEO
        title="Cybersecurity Consulting FAQ | Engagements, SOC, Pen Testing, Compliance"
        description="Answers to common questions about cybersecurity consulting from Cloud Secure Canada: engagement models, remote delivery, pricing, SOC and SIEM support (Splunk, Microsoft Sentinel), penetration testing, compliance readiness (NIST CSF, SOC 2, ISO 27001, PCI DSS), and team training."
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
