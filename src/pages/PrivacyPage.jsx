import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import { getConsent, resetConsent } from '../lib/consent';

/**
 * PrivacyPage
 * Privacy notice and site terms. The contact form collects personal
 * information (name, email, phone, employer) and hands it to a US processor,
 * which under PIPEDA requires a stated purpose, notice of the cross-border
 * transfer, and a route to access or withdraw. Nothing on the site disclosed
 * any of that before this page existed.
 *
 * LAST REVIEWED constant drives the visible date. Update it whenever the
 * substance below changes — a stale date on a privacy notice is its own
 * problem. Have counsel review before relying on this in a regulated deal.
 */
const LAST_REVIEWED = '30 August 2026';

/**
 * Lets a visitor revisit the cookie choice without clearing site data by hand.
 * Reads on mount only — the banner re-appears immediately on reset because
 * CookieConsent listens for the same event resetConsent dispatches.
 */
const ConsentReset = () => {
  const [choice, setChoice] = React.useState(() => getConsent()?.choice ?? null);

  React.useEffect(() => {
    const sync = () => setChoice(getConsent()?.choice ?? null);
    window.addEventListener('csc:consent', sync);
    return () => window.removeEventListener('csc:consent', sync);
  }, []);

  const label = choice === 'all'
    ? 'all cookies allowed'
    : choice === 'essential'
      ? 'essential only'
      : 'no choice recorded yet';

  return (
    <div className="mt-1 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={resetConsent}
        disabled={!choice}
        className="h-9 border border-dark-600 px-3.5 text-sm text-gray-300 transition-colors hover:border-dark-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
      >
        Change cookie choice
      </button>
      <span className="font-mono text-xs text-gray-500">Current: {label}</span>
    </div>
  );
};

const Section = ({ id, title, children }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    className="mb-10"
    aria-labelledby={`${id}-heading`}
  >
    <h2 id={`${id}-heading`} className="text-xl sm:text-2xl font-bold text-white mb-3">
      {title}
    </h2>
    <div className="space-y-3 text-gray-400 text-sm sm:text-[0.95rem] leading-relaxed">
      {children}
    </div>
  </motion.section>
);

const PrivacyPage = () => (
  <>
    <SEO
      title="Privacy &amp; Terms"
      description="How Cloud Secure Canada collects, uses, and stores personal information submitted through this website, plus the terms that govern use of its content."
      canonical="https://cloudsecurecanada.com/privacy"
      breadcrumbs={[
        { name: 'Home', url: 'https://cloudsecurecanada.com/' },
        { name: 'Privacy Notice & Terms', url: 'https://cloudsecurecanada.com/privacy' },
      ]}
    />
    <div className="page-top bg-dark-900 surface-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="chip mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy &amp; Terms</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Privacy notice and site terms
        </h1>
        <p className="text-gray-400 mb-10 text-sm">
          Last reviewed: {LAST_REVIEWED}
        </p>

        <Section id="collection" title="What this site collects">
          <p>
            This website does not use advertising pixels or third-party tracking, and
            browsing it does not build a profile of you. The only storage used by
            default is what the site needs to function — see{' '}
            <a href="#cookies" className="text-primary-300 transition-colors hover:text-primary-200">
              cookies and similar technologies
            </a>{' '}
            below.
          </p>
          <p>
            The only personal information collected is what you type into the contact
            form and submit voluntarily: your name and email address, and — if you
            choose to provide them — your phone number and organization, along with the
            services you select and the message you write.
          </p>
        </Section>

        <Section id="use" title="Why it is collected and how it is used">
          <p>
            Contact form submissions are used for one purpose: to respond to your
            enquiry and, if you choose to proceed, to scope an engagement. Submissions
            are not sold, rented, or shared with third parties for marketing, and you
            will not be added to a mailing list by submitting the form.
          </p>
        </Section>

        <Section id="cookies" title="Cookies and similar technologies">
          <p>
            On your first visit you are asked to choose between essential storage only
            and allowing all cookies. Nothing optional is loaded before you choose, and
            declining is treated the same as not having answered.
          </p>
          <p>
            <strong className="text-gray-300">Essential</strong> covers what the site
            needs to work, including remembering the choice you make on that banner. It
            cannot be switched off, and it is not used to track you between sites.
          </p>
          <p>
            <strong className="text-gray-300">Optional</strong> covers analytics that
            measure which pages are read so the site can be improved. These load only if
            you select &ldquo;Allow all cookies&rdquo;. At the date shown above, no
            analytics are in use on this site at all &mdash; the choice is recorded so
            that it is honoured if that changes.
          </p>
          <p>
            You can change your answer at any time:
          </p>
          <ConsentReset />
        </Section>

        <Section id="processors" title="Where your information is processed">
          <p>
            Enquiries sent through the contact form are handled with the help of
            third-party service providers, and may be processed and stored outside
            Canada. Where that happens, the information is subject to the laws of the
            jurisdiction it is held in, which can include lawful access by foreign
            courts and government authorities.
          </p>
          <p>
            If you would prefer your details not be processed outside Canada, contact us
            directly by email or phone instead of using the form.
          </p>
        </Section>

        <Section id="retention" title="Retention, access, and withdrawal">
          <p>
            Enquiries are retained only as long as needed to respond and to maintain
            ordinary business records, and are deleted once they no longer serve that
            purpose.
          </p>
          <p>
            Under Canada&rsquo;s Personal Information Protection and Electronic Documents
            Act (PIPEDA) you may request access to the personal information held about
            you, ask that it be corrected, or withdraw your consent and ask that it be
            deleted. Email{' '}
            <a
              href="mailto:info@cloudsecurecanada.com"
              className="text-primary-300 hover:text-primary-200 transition-colors"
            >
              info@cloudsecurecanada.com
            </a>{' '}
            and the request will be actioned.
          </p>
        </Section>

        <Section id="confidentiality" title="Engagement confidentiality">
          <p>
            Client identities, findings, and engagement artefacts are treated as
            confidential and are not published on this site. Nothing here names a
            client, and no case study, statistic, or quotation on this site is drawn
            from a live engagement.
          </p>
        </Section>

        <Section id="disclaimer" title="Content disclaimer">
          <p>
            Blog posts, service descriptions, and other material on this site are
            general information about security practice. They are not legal, regulatory,
            audit, or professional advice, they are current only as of their publication
            date, and they should not be relied on as a substitute for advice about your
            own circumstances.
          </p>
          <p>
            Commentary on named incidents, vendors, and legislation reflects publicly
            reported information available at the time of writing. Claims made by threat
            actors are reported as claims and should be treated as unverified.
          </p>
          <p>
            Reading this site, or contacting us through it, does not by itself create a
            consulting relationship. Services are delivered only under a signed
            agreement with an agreed scope, and security testing is performed only with
            documented, authorized rules of engagement.
          </p>
        </Section>

        <Section id="vulnerability-feed" title="Vulnerability feed">
          <p>
            The vulnerability ticker republishes entries from the CISA Known Exploited
            Vulnerabilities catalog, a public US government dataset. It is provided for
            awareness, is refreshed periodically rather than continuously, and is not a
            monitoring service for your environment.
          </p>
        </Section>

        <Section id="changes" title="Changes to this notice">
          <p>
            This notice may be updated as the site or its processors change. The date at
            the top reflects the last substantive review.
          </p>
        </Section>

        <div className="border-t border-dark-700 pt-8 mt-12">
          <h2 className="text-lg font-semibold text-white mb-3">Privacy questions</h2>
          <p className="text-gray-400 text-sm mb-4">
            Cloud Secure Canada &mdash; Toronto, Ontario, Canada
          </p>
          <a
            href="mailto:info@cloudsecurecanada.com"
            className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 transition-colors text-sm"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            info@cloudsecurecanada.com
          </a>
          <div className="mt-8">
            <Link
              to="/"
              className="text-sm text-gray-500 hover:text-primary-400 transition-colors"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default PrivacyPage;
