import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  canonical, 
  type = 'website',
  name = 'Cloud Secure Canada',
  image = 'https://cloudsecurecanada.com/shield.svg'
}) => {
  const siteTitle = 'Cloud Secure Canada | Cyber Security Consultant in Toronto';
  const fullTitle = title ? `${title} | ${name}` : siteTitle;
  const defaultDescription = 'SANS-certified cyber security consultant in Toronto, ON delivering incident response, penetration testing, SIEM/SOC engineering, and security assessments across Canada, the United States, and other major first-world countries.';
  const metaDescription = description || defaultDescription;
  const siteUrl = 'https://cloudsecurecanada.com';
  const canonicalUrl = canonical || siteUrl;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
