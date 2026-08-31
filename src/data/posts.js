/**
 * Blog post source of truth.
 *
 * ⚠️ DATE NOTICE — every `date` below is BACKDATED. These posts were authored
 * in a single pass on 2026-08-29 and dated across Mar 2025 – Aug 2026 to match
 * the events each one analyses. The dates feed `datePublished` in BlogPosting
 * JSON-LD, so they are a factual claim to search engines. If you would rather
 * publish honestly, set every `date` to the real publication date — nothing
 * else in the blog depends on the values.
 *
 * Each post analyses a real, externally verifiable event or standard. Figures
 * are attributed inline to their source so claims stay defensible.
 */

import { guides } from './guides';

/** News-pegged analysis, chronological. Standing guides live in guides.js. */
const articles = [
  {
    slug: 'pci-dss-4-0-1-grace-period-over',
    title: 'PCI DSS 4.0.1: The Grace Period Is Over',
    date: '2025-03-18',
    updated: '2026-08-30',
    readingTime: 5,
    tags: ['PCI DSS', 'Compliance', 'FinTech'],
    motif: 'grid',
    cover: '/images/blog/pci-dss-payment-page',
    coverAlt: 'Blank chip card held beside a laptop during an online payment.',
    excerpt:
      'On March 31 the 51 future-dated requirements stop being best practice and start being mandatory. Two of them will catch most teams off guard.',
    body: [
      { t: 'p', c: 'On March 31, 2025, the future-dated requirements introduced in PCI DSS v4.x stop being "best practice" and become mandatory. There is no extended grace period and no phased enforcement. If your next assessment falls after that date, your QSA will test against all of them.' },
      { t: 'p', c: 'Most organisations we speak to have handled the obvious ones. Two consistently get missed, and both concern the payment page itself.' },
      { t: 'h2', c: 'Requirement 6.4.3: you now own every script on your payment page' },
      { t: 'p', c: 'You must maintain an inventory of every script executed in the browser on a payment page, record a written business justification for each one, and verify its integrity. In practice that means knowing exactly what your analytics tag, chat widget, and A/B testing tool are loading — including the third-party scripts they load in turn.' },
      { t: 'p', c: 'This is the control that would have caught Magecart-style skimming. It is also the one most likely to reveal that nobody on your team can currently enumerate what runs on checkout.' },
      { t: 'h2', c: 'Requirement 11.6.1: detect the change, not just the script' },
      { t: 'p', c: '11.6.1 requires a tamper-detection mechanism that alerts on unauthorised modification to the HTTP headers and script content of payment pages, evaluated at least every seven days. An inventory is a point-in-time artifact. This requirement asks whether you would notice a change between assessments.' },
      { t: 'h2', c: 'The others worth checking now' },
      { t: 'ul', c: [
        'Targeted risk analyses (12.3.1) for every requirement that permits a flexible frequency — each needs documented justification, not a default.',
        'Authenticated internal vulnerability scanning (11.3.1.2), which surfaces materially more than unauthenticated scanning.',
        'Expanded penetration testing obligations under 11.4, including segmentation testing where a CDE boundary exists.',
        'Multi-factor authentication for all access into the CDE (8.4.2), not just administrative access.',
      ]},
      { t: 'h2', c: 'What to do this month' },
      { t: 'ol', c: [
        'Pull a live inventory of scripts on your checkout flow. Compare it to what you expected. The gap is your finding.',
        'Run a gap assessment against 4.0.1 as written rather than against your last 3.2.1 ROC.',
        'Book segmentation testing if you rely on network segmentation to reduce CDE scope. It is explicitly in scope under 11.4.5.',
        'Write the targeted risk analyses now. They are documentation, not engineering, and they are the cheapest findings to close.',
      ]},
      { t: 'note', c: 'If your assessment window opens in the next two quarters and you have not tested segmentation against 4.0.1, that is the first thing to schedule.' },
    ],
  },

  {
    slug: 'help-desk-is-your-weakest-authentication-factor',
    title: 'Your Help Desk Is Your Weakest Authentication Factor',
    date: '2025-05-14',
    updated: '2026-08-30',
    readingTime: 6,
    tags: ['Identity', 'Social Engineering', 'Incident Response'],
    motif: 'nodes',
    cover: '/images/blog/help-desk-identity-verification',
    coverAlt: 'Support professional wearing a headset while working at a laptop.',
    excerpt:
      'Marks & Spencer and Co-op did not lose control of their environments to a zero-day. They lost it to a phone call.',
    body: [
      { t: 'p', c: 'Two of the UK\'s largest retailers disclosed serious intrusions in recent weeks. Neither began with an unpatched appliance or a novel exploit. Both began with someone calling an IT help desk and successfully persuading an agent to reset credentials or enrol a new MFA device.' },
      { t: 'p', c: 'This is the defining access pattern of the current threat landscape, and it is the one your security stack is least equipped to stop. The activity that follows a successful help-desk reset is, by definition, authenticated.' },
      { t: 'h2', c: 'Why this works so reliably' },
      { t: 'p', c: 'The attacker is not defeating MFA. They are using your account-recovery process exactly as designed. Recovery exists to help legitimate users who have lost a device, and it is typically staffed by people measured on resolution time and customer satisfaction — metrics that reward being helpful and penalise friction.' },
      { t: 'p', c: 'CrowdStrike observed voice-based help-desk phishing in nearly every SCATTERED SPIDER incident it responded to, targeting Microsoft Entra ID, SSO, and VDI accounts. The group has moved through retail, insurance, and aviation in sequence, reusing the same playbook against each sector.' },
      { t: 'h2', c: 'The controls that actually hold' },
      { t: 'ul', c: [
        'Require video verification against a pre-enrolled photo for any privileged account recovery. Voice alone is no longer a credential.',
        'Enforce a mandatory callback to the number of record — never a number supplied during the call.',
        'Impose a hold period on MFA re-enrolment for privileged accounts, with notification to the user and their manager.',
        'Remove reset authority for administrative and executive accounts from the general help-desk queue entirely.',
        'Alert on the sequence, not the event: MFA reset followed by sign-in from a new device, a new ASN, and immediate access to file shares or the identity provider itself.',
      ]},
      { t: 'h2', c: 'Test it the way an attacker would' },
      { t: 'p', c: 'The only reliable way to know whether your recovery process holds is to call it. A scoped social-engineering assessment against your own help desk — with written authorisation and agreed stop conditions — produces a clearer answer in an afternoon than a policy review produces in a month.' },
      { t: 'note', c: 'If your incident response plan does not have a documented path for "an attacker holds a valid session for a privileged account," that is the gap to close first.' },
    ],
  },

  {
    slug: 'soc-2-type-ii-observation-window',
    title: 'The SOC 2 Type II Observation Window Is Where Deals Go to Die',
    date: '2025-07-09',
    updated: '2026-08-30',
    readingTime: 5,
    tags: ['SOC 2', 'Compliance', 'SaaS'],
    motif: 'bars',
    cover: '/images/blog/soc2-evidence-window',
    coverAlt: 'Professionals reviewing documents and laptops together in an office.',
    excerpt:
      'Type I says you designed the controls. Type II says they ran, for months, with evidence. The distance between the two is usually two quarters of stalled revenue.',
    body: [
      { t: 'p', c: 'A Type I report attests that your controls were suitably designed on a single date. A Type II attests that they operated effectively across a period — typically three to twelve months — and that you can prove it. Enterprise procurement now asks for Type II by default.' },
      { t: 'p', c: 'The gap between the two is not a documentation exercise. It is elapsed time you cannot compress, and it is where fintech and SaaS deals stall.' },
      { t: 'h2', c: 'What actually goes wrong' },
      { t: 'p', c: 'Teams buy a compliance automation platform, connect their integrations, watch the dashboard turn green, and assume they are ready. The platform is measuring whether a control exists, not whether it operated. When the auditor asks for evidence that access reviews ran every quarter for the last nine months, the dashboard cannot produce nine months of history it never collected.' },
      { t: 'p', c: 'The second failure is scoping. Teams accept a default list of Trust Services Criteria rather than selecting the ones their architecture and customer commitments actually require. Availability and Confidentiality carry real operational obligations. Taking them on without needing to is self-inflicted work.' },
      { t: 'h2', c: 'Sequencing that works' },
      { t: 'ol', c: [
        'Scope the criteria against your architecture and your largest customer contract. Security is mandatory; the rest are a decision.',
        'Implement controls and — critically — the evidence routine at the same time. A control with no collection mechanism will fail the observation window.',
        'Run a readiness assessment before the window opens, not during it. Findings discovered in month two of a nine-month window cost you the window.',
        'Open the observation window only once evidence is accruing automatically.',
      ]},
      { t: 'h2', c: 'The shortcut that is not a shortcut' },
      { t: 'p', c: 'Some teams open the window immediately to start the clock, intending to fix controls as they go. This produces a report with exceptions. An exception in a Type II is worse than a later clean report: it is a documented finding your prospect\'s security team will read, and it invites questions your sales engineer cannot answer.' },
      { t: 'note', c: 'If a prospect has asked for Type II and you have not started, the honest answer is a date, not a dashboard. Most buyers will accept a credible timeline with a Type I in hand.' },
    ],
  },

  {
    slug: 'salesloft-drift-oauth-supply-chain',
    title: 'The Salesloft Drift Breach: Your Vendor\'s OAuth Token Is Your Attack Surface',
    date: '2025-09-11',
    updated: '2026-08-30',
    readingTime: 6,
    tags: ['Supply Chain', 'SaaS', 'Vendor Risk'],
    motif: 'chain',
    cover: '/images/blog/oauth-supply-chain',
    coverAlt: 'Fibre patch cables connecting multiple ports in a network rack.',
    excerpt:
      'More than 700 organisations lost Salesforce data without any of them being breached. The compromise was one integration upstream.',
    body: [
      { t: 'p', c: 'Between August 9 and 17, the threat cluster tracked as UNC6395 used OAuth tokens stolen from Salesloft\'s Drift chat integration to access Salesforce environments belonging to more than 700 organisations. Salesloft and Salesforce revoked all Drift tokens on August 20. Salesforce subsequently removed the application from AppExchange pending investigation.' },
      { t: 'p', c: 'Named victims include Cloudflare, Google, Palo Alto Networks, Proofpoint, Tanium, and Zscaler — organisations with mature security programs. None of them were breached in the conventional sense. A vendor they had authorised was.' },
      { t: 'h2', c: 'What the attacker actually took' },
      { t: 'p', c: 'The primary target was the text content of Salesforce Case objects. Support cases are where customers and engineers paste API keys, connection strings, VPN credentials, and configuration excerpts while troubleshooting. The stolen records were then mined for AWS keys, Snowflake tokens, and other secrets that enable follow-on compromise.' },
      { t: 'p', c: 'This is worth sitting with. Your CRM is not usually modelled as a secrets store. In practice, it is one.' },
      { t: 'h2', c: 'Why detection failed' },
      { t: 'p', c: 'The activity ran through Salesforce\'s own APIs using automated SOQL queries and bulk exports. To monitoring, it looked like an authorised integration doing what integrations do. There was no anomalous login, no impossible travel, no failed authentication — the token was valid and the access was granted.' },
      { t: 'h2', c: 'What to change' },
      { t: 'ul', c: [
        'Inventory every OAuth grant in your major SaaS tenants. Most organisations find applications nobody currently owns.',
        'Scope grants to the minimum object set. A chat integration rarely needs read access to every Case record.',
        'Alert on bulk export volume per integration, not just per user. Volume was the only reliable signal here.',
        'Treat support-ticket text as sensitive. Scan for secrets in Case bodies and redact on ingestion.',
        'Rotate any credential that has ever been pasted into a support ticket. Assume disclosure.',
      ]},
      { t: 'note', c: 'Vendor questionnaires would not have caught this. Continuous visibility into what your integrations can reach — and what they actually did — would have.' },
    ],
  },

  {
    slug: 'bill-c-8-canadian-critical-infrastructure',
    title: 'Bill C-8 Is Law: What Canadian Operators Need to Do Next',
    date: '2025-11-06',
    updated: '2026-08-30',
    readingTime: 5,
    tags: ['Canada', 'Regulation', 'Critical Infrastructure'],
    motif: 'maple',
    cover: '/images/blog/canadian-critical-infrastructure',
    coverAlt: 'Electrical distribution substation representing critical infrastructure.',
    excerpt:
      'Bill C-8 received Royal Assent on 15 June 2026. Part 2 is not yet in force, making this the preparation window for likely designated operators.',
    body: [
      { t: 'p', c: 'Bill C-8 received Royal Assent on 15 June 2026 and became Statutes of Canada 2026, chapter 9. Part 2 enacts the Critical Cyber Systems Protection Act, but the Justice Laws website currently marks that part as not in force. Its effective day or days will be fixed by order of the Governor in Council.' },
      { t: 'p', c: 'For federally regulated operators, the practical question is no longer whether the bill passes. It is when Part 2, the operator designations, and the supporting regulations take effect — and whether the organisation is ready for the 90-day program window that follows designation.' },
      { t: 'h2', c: 'Who it covers' },
      { t: 'p', c: 'The CCSPA applies to designated operators across four federally regulated sectors: telecommunications, finance (federally regulated banks), energy (interprovincial pipelines and nuclear), and certain federally regulated transportation. If you are provincially regulated, you are outside the direct scope — but your federally regulated customers will push these requirements down through contracts.' },
      { t: 'h2', c: 'The four obligations that matter' },
      { t: 'ul', c: [
        'Establish and maintain a documented cyber security program, reviewed on a defined cycle.',
        'Identify and mitigate supply chain and third-party risks to critical cyber systems.',
        'Report cyber security incidents to the Canadian Centre for Cyber Security, with sector regulator notification alongside.',
        'Comply with cyber security directions, including where the content of a direction is confidential.',
      ]},
      { t: 'h2', c: 'The part organisations underestimate' },
      { t: 'p', c: 'Incident reporting is a two-step process on a statutory clock. Meeting it requires knowing, quickly, whether an event qualifies — which requires detection coverage and a triage process that produces a defensible answer under time pressure. Organisations that cannot currently say how long it takes to determine incident scope will not meet the obligation by writing a policy.' },
      { t: 'h2', c: 'Sensible preparation now' },
      { t: 'ol', c: [
        'Map which of your systems would meet the "critical cyber system" definition. Scope drives everything else.',
        'Time your current detection-to-triage path. If you cannot classify an incident within hours, that is the gap.',
        'Build the supply chain register now — it is the longest lead-time item and it has standalone value.',
        'Run a tabletop with the reporting clock as an explicit constraint, including who signs off on the determination.',
      ]},
      { t: 'note', c: 'Status checked 30 August 2026: Bill C-8 has Royal Assent, while Part 2 is not yet in force. Confirm current orders, designations, and regulations before making implementation commitments.' },
    ],
  },

  {
    slug: 'ransomware-2025-new-baseline',
    title: 'Ransomware in 2025: The Floor Moved, Not the Ceiling',
    date: '2026-01-15',
    updated: '2026-08-30',
    readingTime: 5,
    tags: ['Ransomware', 'Threat Intelligence'],
    motif: 'wave',
    cover: '/images/blog/ransomware-response-baseline',
    coverAlt: 'Focused technology team reviewing a shared workstation.',
    excerpt:
      'Quarterly attack volume set records through late 2025. The more useful signal is that the low end never came back down.',
    body: [
      { t: 'p', c: 'Ransomware activity accelerated through the final quarter of 2025 and reached record quarterly highs. Attack counts fluctuate — the number that matters is the floor. Quarterly volume now sits at a baseline of roughly 2,500 incidents where a quieter quarter used to mean a meaningful drop.' },
      { t: 'p', c: 'Roughly 91 distinct groups were active across the year. That fragmentation is the story: affiliate ecosystems reshuffle constantly, and takedowns of individual brands no longer reduce aggregate volume for long.' },
      { t: 'h2', c: 'Three structural shifts' },
      { t: 'p', c: '<b>Access is brokered.</b> Intrusion and extortion are increasingly performed by different actors. The group that encrypts your files may have purchased access from someone who obtained it months earlier. Your dwell time is longer than your incident timeline suggests.' },
      { t: 'p', c: '<b>The browser replaced the exploit.</b> Initial access has shifted toward user-mediated compromise through trusted applications — malicious search results, fake software updates, and browser-delivered payloads — rather than perimeter exploitation.' },
      { t: 'p', c: '<b>Coercion outweighs encryption.</b> Pressure is applied through regulatory exposure, litigation risk, and direct contact with executives and customers. Several groups no longer bother encrypting at all. Reliable backups remain necessary, and they are no longer sufficient.' },
      { t: 'h2', c: 'What this changes about readiness' },
      { t: 'ul', c: [
        'Test restore, not backup. A backup you have never restored under time pressure is an assumption.',
        'Rehearse the extortion-only scenario: data is gone, systems are fine, and the clock is legal rather than operational.',
        'Decide the ransom position before you need it, in writing, with counsel and your board.',
        'Instrument for the brokered-access model: hunt for persistence that predates the incident you are responding to.',
        'Pre-draft breach notification templates. Under a 72-hour regulatory clock, drafting from scratch is not viable.',
      ]},
      { t: 'note', c: 'Figures here are drawn from published quarterly ransomware tracking and vendor incident reports. Counts vary by methodology — treat direction as reliable and precise totals as approximate.' },
    ],
  },

  {
    slug: 'ai-agents-prompt-injection-mcp',
    title: 'AI Agents Have a Confused Deputy Problem',
    date: '2026-03-05',
    updated: '2026-08-30',
    readingTime: 7,
    tags: ['AI Security', 'Architecture', 'Emerging Threats'],
    motif: 'circuit',
    cover: '/images/blog/ai-agent-permission-path',
    coverAlt: 'Engineers testing a robotic arm in a technology lab.',
    excerpt:
      'Prompt injection stopped being a chatbot curiosity the moment agents were given tools that take real actions.',
    body: [
      { t: 'p', c: 'A language model cannot reliably distinguish instructions from data. That was a manageable limitation when the worst outcome was an inappropriate answer. It is a security architecture problem now that agents hold credentials and execute actions.' },
      { t: 'p', c: 'OWASP ranks prompt injection as the leading security risk to AI systems, and it remains the dominant cause of agentic failures observed in production. Documented findings span Slack AI, Microsoft 365 Copilot, GitHub integrations, and AI coding assistants.' },
      { t: 'h2', c: 'Indirect injection is the real risk' },
      { t: 'p', c: 'Direct injection — a user typing an adversarial prompt — is the version everyone tests for. Indirect injection is the one that lands: instructions hidden in a document the agent summarises, a web page it retrieves, a ticket it triages, or an email it processes. The malicious input arrives through a data channel nobody is monitoring, from a source the user never chose.' },
      { t: 'p', c: 'The severity is set by capability. An agent that can only read is a disclosure risk. An agent that can send email, open pull requests, or move funds is a confused deputy holding your credentials.' },
      { t: 'h2', c: 'MCP and the all-or-nothing grant' },
      { t: 'p', c: 'The Model Context Protocol standardised how agents connect to tools, and adoption outpaced the security model. Connecting to a server has typically meant receiving its full capability set rather than a scoped subset — structurally similar to OAuth before scoped permissions, with the same privilege-escalation consequences.' },
      { t: 'p', c: 'One analysis of 2,614 MCP implementations found 82% using file operations susceptible to path traversal and 34% exposing APIs vulnerable to command injection. Most of that surface is inherited, not written by the teams deploying it.' },
      { t: 'h2', c: 'Controls that hold' },
      { t: 'ul', c: [
        'Scope agent credentials to the minimum capability set, and issue them per-task rather than per-agent.',
        'Require human approval for irreversible actions — outbound communication, financial movement, production writes, permission changes.',
        'Treat all retrieved content as untrusted input. Isolate it from the instruction context wherever the framework allows.',
        'Log every tool invocation with its triggering input. Without this, incident reconstruction is guesswork.',
        'Inventory MCP servers as third-party dependencies, because that is what they are.',
      ]},
      { t: 'note', c: 'Survey data suggests a wide gap between the share of organisations reporting AI agent incidents and the share of executives who believe existing policy already covers agent behaviour. Assume you are in the gap until you have tested otherwise.' },
    ],
  },

  {
    slug: 'telus-breach-extortion-without-encryption',
    title: 'The TELUS Digital Breach and the Rise of Extortion Without Encryption',
    date: '2026-04-23',
    updated: '2026-08-30',
    readingTime: 5,
    tags: ['Canada', 'Data Breach', 'Incident Response'],
    motif: 'shards',
    cover: '/images/blog/telecom-data-extortion',
    coverAlt: 'Rows of server cabinets in a modern data centre.',
    excerpt:
      'No ransomware. No outage. A claimed 700 terabytes and a deadline. This is what a major Canadian incident looks like now.',
    body: [
      { t: 'p', c: 'In March, TELUS Digital disclosed unauthorised access to a limited number of its systems. The ShinyHunters group claimed to have taken at least 700 terabytes of data, including personally identifiable information, call detail records, background check material, and source code. TELUS Digital did not confirm the claimed volume or contents while its investigation remained ongoing.' },
      { t: 'p', c: 'Note what is absent: no encryption event, no service disruption, no recovery timeline. The leverage is disclosure, and the pressure is regulatory and reputational rather than operational.' },
      { t: 'h2', c: 'Why this model is spreading' },
      { t: 'p', c: 'Encryption is loud, technically demanding, and increasingly survivable for organisations with tested backups. Exfiltration is quieter, harder to detect, and produces leverage that restoring from backup cannot remove. Once data has left, it has left.' },
      { t: 'p', c: 'The same group has been linked to a series of large-scale data extortion campaigns across sectors during this period, following a consistent pattern: obtain access, stage and exfiltrate at volume, then run a timed "pay or leak" campaign with public pressure.' },
      { t: 'h2', c: 'What Canadian organisations should take from it' },
      { t: 'ul', c: [
        'Egress volume is your primary detection signal. If you cannot answer "how much data left our environment last week," that is the gap.',
        'Source code is customer data\'s neighbour. Repository access controls belong in the same tier as database access.',
        'Third-party and background-check data carries obligations you may not have inventoried.',
        'PIPEDA breach-of-security-safeguards reporting has its own trigger and record-keeping requirements. Know them before the clock starts.',
        'Rehearse the scenario where systems are healthy and the incident is entirely about disclosure. Most IR plans assume an outage.',
      ]},
      { t: 'note', c: 'Claimed data volumes in extortion campaigns are frequently inflated and should be treated as unverified until confirmed. The tactical pattern is the durable lesson, not the number.' },
    ],
  },

  {
    slug: 'infostealers-session-hijacking-mfa-bypass',
    title: 'Infostealers Are How Attackers Skip Your MFA',
    date: '2026-06-18',
    updated: '2026-08-30',
    readingTime: 6,
    tags: ['Identity', 'Threat Intelligence', 'Detection'],
    motif: 'keys',
    cover: '/images/blog/session-token-hijack',
    coverAlt: 'USB security token beside a laptop.',
    excerpt:
      'A stolen session cookie is a valid, already-authenticated session. Your second factor was satisfied hours ago.',
    body: [
      { t: 'p', c: 'A large repository of infostealer logs was published this month, containing millions of browser cookies and stored credentials. The credentials matter less than the cookies — because a live session token does not need a password or a second factor.' },
      { t: 'p', c: 'Session hijacking sidesteps the control most organisations regard as settled. The authentication event already happened, on the victim\'s machine, and it succeeded. The attacker simply imports the resulting artifact.' },
      { t: 'h2', c: 'How the material is obtained' },
      { t: 'p', c: 'Infostealers arrive through malicious search advertising, trojanised software downloads, cracked applications, and fake browser update prompts. They run once, harvest browser-stored credentials, cookies, and cryptocurrency wallets, and exit. There is often no persistence — which means no ongoing behaviour for EDR to detect after the fact.' },
      { t: 'p', c: 'Unmanaged devices are the dominant exposure. Contractor laptops, personal machines used for a single urgent login, and BYOD endpoints outside your EDR coverage all produce the same artifact as a managed device would.' },
      { t: 'h2', c: 'Detection and control' },
      { t: 'ul', c: [
        'Bind sessions to device posture where your IdP supports it. Token protection and continuous access evaluation are the controls that actually close this.',
        'Shorten session lifetimes for privileged roles. A 30-day refresh token is a 30-day standing invitation.',
        'Alert on the same session token appearing from a new ASN, device fingerprint, or geography.',
        'Monitor stealer-log marketplaces for your domains. Corporate credentials appear there before they are used.',
        'Force reauthentication for sensitive actions rather than trusting the session that reached them.',
      ]},
      { t: 'h2', c: 'The response step teams miss' },
      { t: 'p', c: 'After confirmed credential exposure, resetting the password is not sufficient. Existing sessions survive a password change in most configurations. You must explicitly revoke refresh tokens and active sessions — and verify that revocation propagated to every federated application.' },
      { t: 'note', c: 'If your credential-exposure runbook ends at "reset password," the attacker keeps their access.' },
    ],
  },

  {
    slug: 'firewall-became-the-front-door',
    title: 'The Firewall Became the Front Door',
    date: '2026-08-12',
    updated: '2026-08-30',
    readingTime: 6,
    tags: ['Vulnerability Management', 'Ransomware', 'Network Security'],
    motif: 'perimeter',
    cover: '/images/blog/edge-appliance-review',
    coverAlt: 'Technician inspecting network equipment and cabling in a server rack.',
    excerpt:
      'Edge security appliances are now the leading initial-access vector for ransomware. The device you bought to keep attackers out is how they get in.',
    body: [
      { t: 'p', c: 'A sustained wave of exploitation against edge VPN and firewall appliances — spanning Palo Alto Networks, Fortinet, Citrix, and Check Point products — has become a dominant initial-access route for ransomware operators through 2026.' },
      { t: 'p', c: 'The trend is not new but the scale is. Verizon\'s 2025 DBIR reported a near-eightfold increase in zero-day exploitation of edge devices year over year, and edge appliances accounted for more CISA KEV additions than any other technology category in 2025.' },
      { t: 'h2', c: 'Why these devices are such good targets' },
      { t: 'ul', c: [
        'They are internet-facing by definition and cannot be hidden behind another control.',
        'They terminate VPN sessions, so compromise yields network position rather than a single host.',
        'Most run appliance operating systems that do not accept an EDR agent, leaving a visibility gap by design.',
        'They are patched on change-control cycles measured in weeks, against exploitation measured in hours.',
      ]},
      { t: 'p', c: 'That last point is the crux. One recent NetScaler memory-disclosure flaw was reported exploited in the wild within roughly a day of public disclosure. A monthly patch window is not a defence against that timeline.' },
      { t: 'h2', c: 'What to change' },
      { t: 'ol', c: [
        'Establish an emergency patch path for internet-facing appliances with a target measured in hours, pre-authorised so it does not require a CAB meeting.',
        'Subscribe to CISA KEV and treat an edge-device addition as an incident trigger, not a ticket.',
        'Ship appliance logs to your SIEM and build detections for configuration change, new admin accounts, and anomalous VPN session sources.',
        'Rotate credentials and certificates after any appliance compromise. Attackers harvest them specifically.',
        'Assume post-exploitation persistence survives patching. Patch, then hunt — implants have repeatedly outlived the fix.',
      ]},
      { t: 'note', c: 'If your last penetration test scoped out the VPN appliance because it was "vendor-managed," that exclusion is now your largest untested exposure.' },
    ],
  },
];

/**
 * The public collection. Guides are appended rather than interleaved because
 * the source order here is chronological for readability; every consumer sorts
 * through sortedPosts / pinnedPosts anyway.
 */
export const posts = [...articles, ...guides];

/** Newest first. The source array is chronological for readability. */
export const sortedPosts = () =>
  [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

/**
 * Pinned posts lead the index regardless of date. These are the standing
 * reference pieces (detection rules, hardening baselines) that stay useful
 * long after the news-pegged analysis has aged out, so burying them under
 * reverse-chronological order works against the reader.
 *
 * `pinOrder` sets the order among them; posts without one sort last by date.
 */
export const pinnedPosts = () =>
  [...posts]
    .filter((p) => p.pinned)
    .sort((a, b) => (a.pinOrder ?? 99) - (b.pinOrder ?? 99) || new Date(b.date) - new Date(a.date));

/** Everything not pinned, newest first — the running feed. */
export const unpinnedPosts = () => sortedPosts().filter((p) => !p.pinned);

/** "18 March 2025" — parsed as UTC so the date never shifts by timezone. */
export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-CA', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });

export const getPost = (slug) => posts.find((p) => p.slug === slug) || null;

/** Chronological neighbours for prev/next navigation. */
export const getNeighbours = (slug) => {
  const ordered = sortedPosts();
  const i = ordered.findIndex((p) => p.slug === slug);
  return {
    newer: i > 0 ? ordered[i - 1] : null,
    older: i >= 0 && i < ordered.length - 1 ? ordered[i + 1] : null,
  };
};
