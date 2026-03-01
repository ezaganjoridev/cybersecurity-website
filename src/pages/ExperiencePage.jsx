import React from 'react';
import Experience from '../components/Experience';
import SEO from '../components/SEO';

const ExperiencePage = () => {
  return (
    <>
      <SEO 
        title="Experience | ZedGar Solutions"
        description="Our expertise covers Incident Response, Penetration Testing, SIEM Engineering, and Security Architecture. See our core competencies."
        keywords="cybersecurity experience, incident response, penetration testing, security architecture, blue team, red team"
      />
      <div className="pt-20 md:pt-24 min-h-screen bg-dark-900 surface-grid">
        <Experience />
      </div>
    </>
  );
};

export default ExperiencePage;
