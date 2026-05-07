import React from 'react';
import About from '../components/About';
import SEO from '../components/SEO';

// Page-scoped Person schema. Resolves into the same #founder entity declared
// in index.html via the shared @id, so Google merges signals across pages.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://cloudsecurecanada.com/about#aboutpage",
  "url": "https://cloudsecurecanada.com/about",
  "name": "About Cloud Secure Canada",
  "description": "Senior SANS GIAC certified cybersecurity consultant based in Toronto, Ontario. 10+ years of incident response, penetration testing, SIEM and SOC engineering, security architecture, and GRC consulting.",
  "mainEntity": {
    "@type": "Person",
    "@id": "https://cloudsecurecanada.com/#founder",
    "name": "Senior Consultant, Cloud Secure Canada",
    "jobTitle": "Senior Cybersecurity Consultant",
    "description": "SANS GIAC certified cybersecurity consultant based in Toronto, Ontario. 10+ years leading incident response, penetration testing, SIEM and SOC engineering, security architecture, and GRC engagements for higher education, financial services, and technology organizations.",
    "worksFor": { "@id": "https://cloudsecurecanada.com/#organization" },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "addressCountry": "CA"
    },
    "hasCredential": [
      { "@type": "EducationalOccupationalCredential", "name": "GIAC Penetration Tester (GPEN)", "credentialCategory": "Professional Certification" },
      { "@type": "EducationalOccupationalCredential", "name": "GIAC Certified Incident Handler (GCIH)", "credentialCategory": "Professional Certification" },
      { "@type": "EducationalOccupationalCredential", "name": "GIAC Defensible Security Architect (GDSA)", "credentialCategory": "Professional Certification" },
      { "@type": "EducationalOccupationalCredential", "name": "GIAC Certified Enterprise Defender (GCED)", "credentialCategory": "Professional Certification" },
      { "@type": "EducationalOccupationalCredential", "name": "GIAC Cloud Penetration Tester (GCPN)", "credentialCategory": "Professional Certification" }
    ]
  }
};

const AboutPage = () => {
  return (
    <div className="pt-20 md:pt-24">
      <SEO
        title="About | SANS Certified Cybersecurity Consultant in Toronto"
        description="SANS GIAC certified cybersecurity consultant with 10+ years of incident response, penetration testing, SIEM and SOC engineering, security architecture, and GRC experience. Based in Toronto, ON with remote delivery across Canada, the US, the UK, and globally."
        canonical="https://cloudsecurecanada.com/about"
        type="profile"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'About', url: 'https://cloudsecurecanada.com/about' }
        ]}
        jsonLd={personJsonLd}
      />
      <About />
    </div>
  );
};

export default AboutPage;
