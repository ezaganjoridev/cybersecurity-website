import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

/**
 * SEO
 * Page-level Helmet wrapper. Supports optional JSON-LD payloads via
 * `jsonLd` (single object or array) so individual pages can ship Service,
 * Article, ItemList, or Review schemas without duplicating the org graph
 * already shipped in index.html.
 */
const SEO = ({
  title,
  rawTitle,
  description,
  canonical,
  type = 'website',
  name = 'Cloud Secure Canada',
  image = 'https://cloudsecurecanada.com/shield.svg',
  imageAlt = 'Cloud Secure Canada shield logo',
  imageWidth = null,
  imageHeight = null,
  imageType = null,
  breadcrumbs = null,
  jsonLd = null,
  noindex = false,
}) => {
  const { pathname } = useLocation();

  // Titles follow one shape across the site: the distinctive part first, the
  // brand last, separated by a middle dot. Leading with the distinctive word
  // matters because a browser tab shows only the first ~20 characters — when
  // every page began "Cybersecurity ...", every tab looked the same.
  const siteTitle = `Toronto Cybersecurity Consulting · ${name}`;
  // `rawTitle` ships the string verbatim. Use it only when a title already
  // carries the brand or would exceed the ~60-char SERP truncation point once
  // the ` · ${name}` suffix (+22 chars) is added.
  const fullTitle = rawTitle || (title ? `${title} · ${name}` : siteTitle);
  const defaultDescription = 'Boutique Toronto cybersecurity consultants. SANS GIAC certified penetration testing, SOC 2 readiness, SIEM engineering and incident response.';
  const metaDescription = description || defaultDescription;
  const siteUrl = 'https://cloudsecurecanada.com';
  // Self-referencing by default. Derived from the live route so a page that
  // forgets to pass one can never silently inherit the homepage URL.
  const canonicalUrl = canonical || `${siteUrl}${pathname === '/' ? '/' : pathname}`;

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
      <meta property="og:image:alt" content={imageAlt} />
      {imageWidth && <meta property="og:image:width" content={String(imageWidth)} />}
      {imageHeight && <meta property="og:image:height" content={String(imageHeight)} />}
      {imageType && <meta property="og:image:type" content={imageType} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content="en_CA" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Robots */}
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

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
