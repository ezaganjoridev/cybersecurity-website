import React from 'react';
import Experience from '../components/Experience';
import SEO from '../components/SEO';

const ExperiencePage = () => {
  return (
    <>
      <SEO
        title="Experience"
        description="A decade of security consulting: incident response, penetration testing, SIEM and SOC engineering, and compliance across regulated industries."
        canonical="https://cloudsecurecanada.com/experience"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'Experience', url: 'https://cloudsecurecanada.com/experience' }
        ]}
      />
      <div className="page-top bg-dark-900 surface-grid">
        <Experience />
      </div>
    </>
  );
};

export default ExperiencePage;
