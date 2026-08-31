import React from 'react';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

const FAQPage = () => {
  return (
    <>
      <SEO
        title="FAQ"
        description="Answers on engagement models, pricing, remote delivery, pen testing scope, SOC and SIEM support, and compliance readiness for SOC 2 and ISO 27001."
        canonical="https://cloudsecurecanada.com/faq"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'FAQ', url: 'https://cloudsecurecanada.com/faq' }
        ]}
      />
      <div className="page-top bg-dark-900 surface-grid">
        <FAQ />
      </div>
    </>
  );
};

export default FAQPage;
