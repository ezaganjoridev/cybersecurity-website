import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO
 * Page-level Helmet wrapper. Supports optional JSON-LD payloads via
 * `jsonLd` (single object or array) so individual pages can ship Service,
 * Article, ItemList, or Review schemas without duplicating the org graph
 * already shipped in index.html.
 */
const SEO = ({
  title,
  description,
  canonical,
  type = 'website',
  name = 'Cloud Secure Canada',
  image = 'https://cloudsecurecanada.com/shield.svg',
  breadcrumbs = null,
  jsonLd = null,
}) => {
  const siteTitle = 'Cybersecurity Consultant in Toronto | Cloud Secure Canada | SOC, Pen Testing, GRC';
  const fullTitle = title ? `${title} | ${name}` : siteTitle;
  const defaultDescription = 'Boutique cybersecurity consulting in Toronto and the GTA. SANS GIAC certified senior consultant for SOC build out and SIEM engineering (Splunk, Microsoft Sentinel, QRadar), penetration testing, GRC and compliance readiness (NIST CSF, SOC 2, ISO 27001, PCI DSS), security automation and SOAR, alert tuning, and incident response. Remote delivery across Canada, the United States, the United Kingdom, and globally.';
  const metaDescription = description || defaultDescription;
  const siteUrl = 'https://cloudsecurecanada.com';
  const canonicalUrl = canonical || siteUrl;

  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  // Normalize jsonLd to array
  const extraJsonLd = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    : [];

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
      <meta property="og:image:alt" content="Cloud Secure Canada shield logo" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Cloud Secure Canada shield logo" />

      {/* Robots */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

      {/* BreadcrumbList Structured Data */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Per-page custom JSON-LD (Service, Article, ItemList, Review, etc.) */}
      {extraJsonLd.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
