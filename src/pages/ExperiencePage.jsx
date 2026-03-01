import React from 'react';
import Experience from '../components/Experience';
import SEO from '../components/SEO';

const ExperiencePage = () => {
  return (
    <>
      <SEO 
        title="Cybersecurity Experience — Incident Response, SIEM, Penetration Testing"
        description="10+ years of cybersecurity consulting experience: incident response, penetration testing, SIEM/SOC engineering, security architecture, GRC alignment, and IT operations. SANS GIAC certified (GPEN, GCIH, GDSA, GCED, GCPN)."
        canonical="https://cloudsecurecanada.com/experience"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'Experience', url: 'https://cloudsecurecanada.com/experience' }
        ]}
      />
      <div className="pt-20 md:pt-24 bg-dark-900 surface-grid">
        <Experience />
      </div>
    </>
  );
};

export default ExperiencePage;
