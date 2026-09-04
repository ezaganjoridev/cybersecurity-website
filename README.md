# Cloud Secure Canada

This is my website for cybersecurity consultation services.

## Contact

For immediate inquiries, please use the contact form on the site.

## Website

Visit: [cloudsecurecanada.com](https://cloudsecurecanada.com)

## Production security headers

The site is published through GitHub Pages, which does not apply
repository-defined response headers. Two controls therefore ship in the build
itself rather than as headers:

- the CSP `<meta>` element in `index.html` and `public/404.html`, which browsers
  enforce in full except for `frame-ancestors` (ignored in a meta element);
- the frame guard at the top of `public/site-bootstrap.js`, which covers the
  clickjacking case that the ignored `frame-ancestors` directive leaves open.

`public/_headers` carries the same policy in Cloudflare Pages / Netlify format.
GitHub Pages ignores it; on a host that reads it the headers below apply on the
first deploy, and the CSP there must be kept identical to the meta element.

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; connect-src 'self' https://formspree.io; font-src 'self'; form-action 'self' https://formspree.io; frame-ancestors 'none'; frame-src 'none'; img-src 'self' data:; manifest-src 'self'; media-src 'self'; object-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' 'unsafe-inline'; worker-src 'self'; upgrade-insecure-requests
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), geolocation=(), microphone=()
```

`Strict-Transport-Security` is deliberately left without `includeSubDomains` and
`preload`: both are hard to walk back and need every subdomain served over HTTPS
first. Add them once that is confirmed.

The edge should also drop the upstream `Access-Control-Allow-Origin: *` header
from HTML responses and suppress or generalize the `Server` header. Neither is
reachable from this repository while the site is on GitHub Pages.

## Known scanner false positive

DAST tools flag "Private IP Disclosure" against the RFC 1918 addresses in
`src/data/guides.js`. Those are published detection content — `10.10.5.0/24` as
a placeholder jump-host range, and `10.0.0.0/8`, `172.16.0.0/12`,
`192.168.0.0/16` as the internal ranges the example rules exclude. No address in
the repository refers to infrastructure that actually exists, and the rules stop
being correct if the ranges are rewritten.
