/**
 * Concise, source-checked process diagrams for each article. The diagrams do
 * not introduce new incident claims; they separate confirmed events from
 * reported claims and explain the control or attack path described in prose.
 */
export const postDiagrams = {
  'pci-dss-4-0-1-grace-period-over': {
    kicker: 'Attack path + control points',
    title: 'How a payment-page skimmer reaches card data',
    summary: 'The checkout can continue working normally while a second, hidden data path sends card details elsewhere.',
    steps: [
      { title: 'Script enters the page', detail: 'First-party code, tag managers, and vendors can all execute in the browser.' },
      { title: 'Page trust is inherited', detail: 'Approved and tampered scripts run inside the same payment context.' },
      { title: 'Fields are observed', detail: 'Malicious code reads form values or intercepts data before submission.' },
      { title: 'A second copy leaves', detail: 'The payload is sent to attacker infrastructure alongside the real payment.' },
      { title: 'Change must surface', detail: 'Inventory, integrity checks, and tamper monitoring expose unauthorized changes.' },
    ],
    outcome: 'The real payment can still succeed, so compromise may begin without a visible checkout failure.',
    controls: ['Authorize and justify every script', 'Verify integrity and monitor changes', 'Alert on payment-page and header tampering'],
  },

  'help-desk-is-your-weakest-authentication-factor': {
    kicker: 'Identity recovery attack path',
    title: 'How a phone call becomes an authenticated session',
    summary: 'The attacker targets the recovery workflow that is allowed to replace a password or second factor.',
    steps: [
      { title: 'Build a believable identity', detail: 'Public details, breached data, and internal terminology support the pretext.' },
      { title: 'Call the help desk', detail: 'Urgency and authority pressure the agent to prioritize resolution speed.' },
      { title: 'Trigger recovery', detail: 'A password reset or new MFA enrollment replaces the original control.' },
      { title: 'Sign in legitimately', detail: 'The new credential produces a valid session, not a failed-authentication signal.' },
      { title: 'Expand access', detail: 'The actor reaches SSO, file stores, and administrative workflows as the user.' },
    ],
    outcome: 'MFA was not cryptographically defeated; the recovery process was persuaded to replace it.',
    controls: ['Callback to the number of record', 'Separate privileged-account recovery', 'Alert on reset + new device + rapid resource access'],
  },

  'soc-2-type-ii-observation-window': {
    kicker: 'Assurance lifecycle',
    title: 'Why a Type II report cannot be rushed at the end',
    summary: 'Designing a control is only the starting point. The report depends on evidence that the control kept operating across the review period.',
    steps: [
      { title: 'Scope the criteria', detail: 'Select the commitments that match the service, architecture, and contracts.' },
      { title: 'Design the controls', detail: 'Assign owners, frequency, evidence, and an exception path before testing starts.' },
      { title: 'Open the window', detail: 'Controls begin operating and evidence starts accumulating on schedule.' },
      { title: 'Preserve each cycle', detail: 'Access reviews, changes, alerts, and approvals must remain traceable over time.' },
      { title: 'Auditor samples', detail: 'The auditor tests whether selected controls operated effectively throughout the period.' },
    ],
    outcome: 'A missing sample in month six cannot be recreated honestly after the fact and may become a report exception.',
    controls: ['Automate evidence collection early', 'Test the routine before opening the window', 'Track and resolve exceptions as they occur'],
  },

  'salesloft-drift-oauth-supply-chain': {
    kicker: 'Third-party OAuth compromise',
    title: 'How one vendor token crossed hundreds of customer boundaries',
    summary: 'The downstream API saw a valid connected application. The trust failure happened upstream of each customer tenant.',
    steps: [
      { title: 'Integration is authorized', detail: 'A customer grants the vendor application OAuth access to selected SaaS data.' },
      { title: 'Vendor token is exposed', detail: 'Compromised access and refresh tokens preserve the permissions already granted.' },
      { title: 'APIs accept the caller', detail: 'Queries run as the connected application without a new user login or MFA prompt.' },
      { title: 'Business records leave', detail: 'Cases, accounts, users, and other objects can be exported at automated volume.' },
      { title: 'Secrets enable pivots', detail: 'Keys and credentials found in records may unlock unrelated cloud environments.' },
    ],
    outcome: 'A supplier compromise becomes customer compromise wherever the same token has broad, standing access.',
    controls: ['Minimize connected-app scopes', 'Baseline export volume per integration', 'Scan records for secrets and rotate exposed credentials'],
  },

  'bill-c-8-canadian-critical-infrastructure': {
    kicker: 'Current implementation path',
    title: 'From Royal Assent to an operating cyber security program',
    summary: 'Bill C-8 is now law, but the Critical Cyber Systems Protection Act obligations depend on coming-into-force orders and operator designations.',
    steps: [
      { title: 'Royal Assent', detail: 'Bill C-8 became Statutes of Canada 2026, chapter 9 on 15 June 2026.' },
      { title: 'Part 2 comes into force', detail: 'The Governor in Council sets the effective day or days by order.' },
      { title: 'Operators are designated', detail: 'Orders identify covered classes, vital systems, and the corresponding regulator.' },
      { title: '90-day program window', detail: 'A newly designated operator must establish and provide its cyber security program.' },
      { title: 'Operate and maintain', detail: 'Risk, supply-chain, incident, review, and reporting duties become recurring work.' },
    ],
    outcome: 'As of this review, Part 2 is not yet in force; Royal Assent is the trigger to prepare, not a reason to wait.',
    controls: ['Map likely critical cyber systems now', 'Build the supply-chain risk register', 'Rehearse incident classification and reporting'],
  },

  'ransomware-2025-new-baseline': {
    kicker: 'Modern ransomware lifecycle',
    title: 'Why the visible incident may start months after access',
    summary: 'Initial access, persistence, data theft, and extortion can be performed by different actors at different times.',
    steps: [
      { title: 'Access is obtained', detail: 'Phishing, stolen sessions, or exposed services create the first foothold.' },
      { title: 'Persistence is planted', detail: 'Accounts, remote tools, and perimeter backdoors keep the route available.' },
      { title: 'Access changes hands', detail: 'A broker can sell the foothold to an affiliate long after the original intrusion.' },
      { title: 'Data is staged and copied', detail: 'Sensitive repositories are collected before the victim sees an outage.' },
      { title: 'Pressure is applied', detail: 'The actor encrypts systems, threatens disclosure, or combines both paths.' },
    ],
    outcome: 'Backups address the encryption branch; they cannot retrieve data that has already been copied.',
    controls: ['Hunt for persistence older than the incident', 'Monitor unusual outbound data volume', 'Rehearse the extortion-only scenario'],
  },

  'ai-agents-prompt-injection-mcp': {
    kicker: 'Confused-deputy path',
    title: 'How untrusted content reaches a privileged tool',
    summary: 'The dangerous transition occurs when data from outside the trust boundary is allowed to influence a tool call with real permissions.',
    steps: [
      { title: 'Untrusted content arrives', detail: 'A document, message, webpage, memory item, or tool response contains instructions.' },
      { title: 'Data enters model context', detail: 'The model can interpret attacker-controlled text as part of the task.' },
      { title: 'Agent selects a tool', detail: 'Planning converts manipulated context into a proposed action or API call.' },
      { title: 'Credentials authorize it', detail: 'The downstream system sees the agent identity and its granted permissions.' },
      { title: 'A real effect occurs', detail: 'Data is exposed, a record changes, or an external action is performed.' },
    ],
    outcome: 'The agent becomes a confused deputy: the attacker supplies intent while the system supplies authority.',
    controls: ['Separate untrusted content from privileged execution', 'Give each tool the minimum scope', 'Independently approve high-impact actions'],
  },

  'telus-breach-extortion-without-encryption': {
    kicker: 'Confirmed facts vs. reported claims',
    title: 'How a data-theft incident creates pressure without an outage',
    summary: 'TELUS Digital confirmed unauthorized access. The scale and contents described by the threat actor remain claims unless independently verified.',
    steps: [
      { title: 'Access is confirmed', detail: 'TELUS Digital reported unauthorized access to a limited number of systems.' },
      { title: 'Scope is investigated', detail: 'Operations stayed available while forensic review and customer notification continued.' },
      { title: 'Large theft is claimed', detail: 'ShinyHunters claimed at least 700 TB; the company did not confirm that volume.' },
      { title: 'Disclosure becomes leverage', detail: 'Copied data can drive regulatory, legal, customer, and reputational pressure.' },
      { title: 'Response continues', detail: 'Containment, evidence review, notification, and credential rotation proceed without a restore event.' },
    ],
    outcome: 'Extortion does not require encryption: copied data creates durable leverage even while services remain online.',
    controls: ['Baseline and alert on egress volume', 'Know which repositories hold regulated data', 'Rehearse a disclosure-only incident'],
  },

  'infostealers-session-hijacking-mfa-bypass': {
    kicker: 'Session replay path',
    title: 'How a browser artifact bypasses a new MFA challenge',
    summary: 'A stolen session cookie represents authentication that already succeeded on the victim device.',
    steps: [
      { title: 'A device runs the stealer', detail: 'A fake update, trojanized download, or malicious ad delivers the payload.' },
      { title: 'Browser artifacts are copied', detail: 'Cookies, passwords, refresh tokens, and local profile data are harvested.' },
      { title: 'The session changes hands', detail: 'Logs are sold, shared, or used directly by the operator.' },
      { title: 'Token is replayed', detail: 'The attacker imports the artifact from another device or network.' },
      { title: 'The app accepts the session', detail: 'A still-valid token can reach services without another password or MFA prompt.' },
    ],
    outcome: 'Resetting the password alone can leave the stolen session alive until its tokens are explicitly revoked or expire.',
    controls: ['Keep sensitive access on managed devices', 'Bind and shorten privileged sessions', 'Revoke sessions and refresh tokens during response'],
  },

  'firewall-became-the-front-door': {
    kicker: 'Edge-appliance compromise',
    title: 'Why patching is only half of the response',
    summary: 'An internet-facing security appliance can provide both the initial exploit path and a trusted position inside the network.',
    steps: [
      { title: 'Appliance is exposed', detail: 'VPN and firewall services must accept traffic from the public internet.' },
      { title: 'A flaw is exploited', detail: 'Attackers scan quickly for vulnerable versions and reachable management surfaces.' },
      { title: 'Device access is gained', detail: 'Configuration, sessions, credentials, or a persistent implant may be exposed.' },
      { title: 'The perimeter is crossed', detail: 'The appliance provides VPN or network position beyond a single endpoint.' },
      { title: 'Access survives the fix', detail: 'A patch closes the flaw but may not remove accounts, stolen secrets, or implants.' },
    ],
    outcome: 'Treat known exploitation as an incident: patch, rotate, inspect, and hunt rather than closing only the vulnerability ticket.',
    controls: ['Pre-authorize emergency edge patching', 'Centralize appliance logs and configuration changes', 'Rotate credentials and hunt after exploitation'],
  },
};

export const getPostDiagram = (slug) => postDiagrams[slug] || null;
