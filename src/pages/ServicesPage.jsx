import React from 'react';
import Services from '../components/Services';
import LocationsServed from '../components/LocationsServed';
import SEO from '../components/SEO';

// Per-service Service schema. Each block helps the individual service
// rank for its own intent (e.g. "Splunk consultant Toronto") while still
// linking back to the org graph in index.html.
const servicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://cloudsecurecanada.com/services#incident-response",
    "name": "Incident Response & Digital Forensics (DFIR)",
    "serviceType": "Incident Response",
    "description": "Rapid breach containment, forensic investigation, root cause analysis, and recovery planning. Evidence preservation, attacker TTP mapping to MITRE ATT&CK, and post-incident hardening roadmaps. Available on-call for organizations across the GTA, Canada, the US, and the UK.",
    "provider": { "@id": "https://cloudsecurecanada.com/#organization" },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Greater Toronto Area" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "United States of America" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "audience": { "@type": "BusinessAudience", "audienceType": "Mid-market and enterprise organizations" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://cloudsecurecanada.com/services#penetration-testing",
    "name": "Penetration Testing Services in Toronto",
    "serviceType": "Penetration Testing",
    "description": "GIAC GPEN/GCPN certified penetration testing across external/internal networks, web applications (OWASP Top 10), cloud environments (AWS, Azure, GCP), and APIs. Evidence-backed findings with retest verification. Delivered remotely or on-site across the Greater Toronto Area.",
    "provider": { "@id": "https://cloudsecurecanada.com/#organization" },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Greater Toronto Area" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "United States of America" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://cloudsecurecanada.com/services#soc-build",
    "name": "SOC Build & SIEM Engineering",
    "serviceType": "Security Operations Center Architecture",
    "description": "End-to-end SOC architecture and SIEM engineering: platform deployment (Splunk, Microsoft Sentinel, IBM QRadar, LogRhythm), MITRE ATT&CK detection rules, alert tuning, SOAR automation playbooks, and SOC operating model design.",
    "provider": { "@id": "https://cloudsecurecanada.com/#organization" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://cloudsecurecanada.com/services#grc",
    "name": "GRC & Compliance Readiness Consulting",
    "serviceType": "Governance, Risk, and Compliance",
    "description": "Compliance readiness for SOC 2 Type I/II, ISO 27001, PCI DSS, NIST CSF, HIPAA, PHIPA, and PIPEDA. Policy development, audit readiness, evidence preparation, risk register management, and gap analysis with prioritized remediation roadmaps.",
    "provider": { "@id": "https://cloudsecurecanada.com/#organization" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://cloudsecurecanada.com/services#cloud-identity",
    "name": "Cloud Security & Identity Hardening",
    "serviceType": "Cloud Security Consulting",
    "description": "Identity-first Zero Trust architecture for Microsoft 365, Azure, AWS, and GCP. Conditional access, MFA configuration, CIS Benchmark cloud baselines, and least-privilege access enforcement across hybrid environments.",
    "provider": { "@id": "https://cloudsecurecanada.com/#organization" }
  }
];

const ServicesPage = () => {
  return (
    <div className="pt-20 md:pt-24">
      <SEO
        title="Cybersecurity Services in Toronto | SOC, Pen Testing, GRC, SOAR"
        description="Boutique cybersecurity consulting services in Toronto and the GTA. SOC build out and SIEM engineering (Splunk, Microsoft Sentinel, QRadar), penetration testing (GPEN/GCPN), GRC and compliance readiness (SOC 2, ISO 27001, PCI DSS, NIST CSF), security automation and SOAR, alert tuning, threat hunting, and incident response. Remote delivery across Canada, the US, the UK, and globally."
        canonical="https://cloudsecurecanada.com/services"
        breadcrumbs={[
          { name: 'Home', url: 'https://cloudsecurecanada.com/' },
          { name: 'Cybersecurity Services', url: 'https://cloudsecurecanada.com/services' }
        ]}
        jsonLd={servicesJsonLd}
      />
      <Services />
      <LocationsServed />
    </div>
  );
};

export default ServicesPage;
