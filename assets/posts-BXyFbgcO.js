const s=[{slug:"top-10-detection-rules-2026",title:"Top 10 Detection Rules for Emerging Threats in 2026",date:"2026-08-30",updated:"2026-08-30",readingTime:18,tags:["Detection Engineering","Threat Hunting","SIEM"],motif:"grid",pinned:!0,pinOrder:1,cover:"/images/blog/detection-rules-2026",coverAlt:"Analyst workstation showing multiple monitoring dashboards in a darkened room.",excerpt:"Ten detections that map to the techniques actually carrying intrusions right now — each one written out in KQL, SPL and ES|QL, with YARA where a file artefact exists.",body:[{t:"p",c:"Every December a list of next year’s threats appears, and every January the same intrusions keep working. This is not that list. These ten detections cover the techniques that actually carried incidents through 2025 and into 2026 — token theft, infostealers, OAuth abuse, edge appliances, and the first genuinely new category, over-permissioned AI agents."},{t:"p",c:"Each rule ships in <b>KQL</b> (Microsoft Sentinel and Defender XDR), <b>SPL</b> (Splunk), and <b>ES|QL or EQL</b> (Elastic). Every rule also carries its false-positive profile, because a detection shipped without one gets tuned to death in week two."},{t:"note",c:"<b>On YARA:</b> YARA matches patterns in files and memory. It is not a log query language, so there is no meaningful YARA equivalent of “two sign-ins from different ASNs.” Writing one anyway would be theatre. The four YARA rules in this post sit in their own section below and cover the detections where a file artefact genuinely exists."},{t:"h2",c:"Before you paste anything"},{t:"p",c:"These are written as hunting queries, not as tuned production alerts. Three things to do first:"},{t:"ol",c:["<b>Confirm the log source exists.</b> Half of all “the rule does not fire” tickets are a missing data connector, not a broken query. Run the FROM/table clause alone first and confirm rows come back.","<b>Fix the field names to your schema.</b> Splunk field names in particular depend on which add-on parsed the data. The SPL below assumes Common Information Model (CIM) data models where possible and notes the sourcetype where not.","<b>Run it over 30 days of history before alerting on it.</b> That is your false-positive baseline. If a rule returns 400 hits a day in your environment, it is a hunting query, not an alert."]},{t:"h2",c:"The ten"},{t:"detect",c:{id:"D01",name:"Session token replay after AiTM phishing",technique:"T1550.004",tags:["Identity","Entra ID"],logic:"An adversary-in-the-middle proxy (Evilginx, Tycoon, EvilProxy) captures the session cookie after the user completes MFA, so the replayed session looks fully authenticated. The signal is not a failed login — it is one user holding valid sessions from two different autonomous systems inside the same hour, and Entra ID Protection’s own anomalousToken risk detection.",fp:"Corporate VPN split-tunnelling, mobile hand-off between carrier and Wi-Fi, and users on a cloud VDI whose egress differs from their laptop. Baseline your VPN and VDI egress ASNs and exclude them explicitly rather than raising the threshold.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`// Signal 1 — one identity, one hour, two autonomous systems and two countries.
SigninLogs
| where TimeGenerated > ago(7d)
| where ResultType == 0                       // successful sign-in only
| where AuthenticationRequirement == "multiFactorAuthentication"
| summarize
    ASNs      = make_set(AutonomousSystemNumber, 10),
    Countries = make_set(tostring(LocationDetails.countryOrRegion), 10),
    IPs       = make_set(IPAddress, 10),
    Apps      = make_set(AppDisplayName, 10)
    by UserPrincipalName, bin(TimeGenerated, 1h)
| where array_length(ASNs) > 1 and array_length(Countries) > 1
| order by UserPrincipalName asc

// Signal 2 — Entra ID Protection already flagged the token itself.
SigninLogs
| where TimeGenerated > ago(7d)
| where ResultType == 0
| mv-expand RiskType = todynamic(RiskEventTypes_V2) to typeof(string)
| where RiskType in ("anomalousToken", "tokenIssuerAnomaly", "unfamiliarFeatures")
| project TimeGenerated, UserPrincipalName, IPAddress, RiskType,
          AppDisplayName, UserAgent, AutonomousSystemNumber`},{lang:"SPL",label:"Splunk (SPL)",code:`\` comment("Sourcetype from the Splunk Add-on for Microsoft Cloud Services.") \`
index=azure sourcetype="azure:aad:signin" "properties.status.errorCode"=0
| rename properties.* as *
| eval user=lower(userPrincipalName)
| bin _time span=1h
| stats dc(autonomousSystemNumber) as asn_count
        dc(location.countryOrRegion)  as country_count
        values(ipAddress)             as src_ips
        values(appDisplayName)        as apps
        by user, _time
| where asn_count > 1 AND country_count > 1
| sort - _time`},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`// ES|QL — same identity, same hour, more than one ASN and country.
FROM logs-azure.signinlogs-*
| WHERE event.outcome == "success"
| EVAL hour = DATE_TRUNC(1 hour, @timestamp)
| STATS asn_count     = COUNT_DISTINCT(source.as.number),
        country_count = COUNT_DISTINCT(source.geo.country_iso_code),
        ips           = VALUES(source.ip)
      BY user.name, hour
| WHERE asn_count > 1 AND country_count > 1
| SORT hour DESC`}]}},{t:"detect",c:{id:"D02",name:"Infostealer reading the browser credential store",technique:"T1555.003",tags:["Endpoint","Credential Access"],logic:"Infostealers (Lumma, StealC, Rhadamanthys and successors) do not crack passwords — they copy Chrome and Edge profile files and lift session cookies wholesale. The detection is a process that is not a browser touching Login Data, Cookies, Web Data, or Local State inside a browser profile directory.",fp:"Backup agents, EDR scanners, profile-sync and migration tooling, and browser-password-import utilities all read these paths legitimately. Allow-list by full signed publisher, not by file name — file name alone is trivially spoofed.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`DeviceFileEvents
| where TimeGenerated > ago(7d)
| where FileName in~ ("Login Data", "Cookies", "Web Data", "Local State", "key4.db", "logins.json")
| where FolderPath has_any (@"\\Google\\Chrome\\User Data",
                           @"\\Microsoft\\Edge\\User Data",
                           @"\\Mozilla\\Firefox\\Profiles",
                           @"\\BraveSoftware\\")
| where InitiatingProcessFileName !in~ ("chrome.exe","msedge.exe","firefox.exe","brave.exe",
                                        "explorer.exe","MsMpEng.exe","backup-agent.exe")
| project Timestamp, DeviceName, AccountName, FolderPath, FileName,
          InitiatingProcessFileName, InitiatingProcessCommandLine,
          InitiatingProcessAccountName, InitiatingProcessSHA256
| order by Timestamp desc`},{lang:"SPL",label:"Splunk (SPL)",code:`| tstats summariesonly=true count
    min(_time) as firstTime max(_time) as lastTime
    FROM datamodel=Endpoint.Filesystem
    WHERE Filesystem.file_name IN ("Login Data","Cookies","Web Data","Local State","key4.db","logins.json")
      AND Filesystem.file_path IN ("*\\\\Google\\\\Chrome\\\\User Data*",
                                   "*\\\\Microsoft\\\\Edge\\\\User Data*",
                                   "*\\\\Mozilla\\\\Firefox\\\\Profiles*")
    BY Filesystem.dest Filesystem.user Filesystem.process_name Filesystem.file_path
| \`drop_dm_object_name(Filesystem)\`
| search NOT process_name IN ("chrome.exe","msedge.exe","firefox.exe","explorer.exe","MsMpEng.exe")
| \`security_content_ctime(firstTime)\``},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`// EQL — non-browser process opening a browser credential store.
file where event.type in ("change", "access", "creation") and
  file.name : ("Login Data", "Cookies", "Web Data", "Local State", "key4.db", "logins.json") and
  file.path : ("*\\\\Google\\\\Chrome\\\\User Data*",
               "*\\\\Microsoft\\\\Edge\\\\User Data*",
               "*\\\\Mozilla\\\\Firefox\\\\Profiles*") and
  not process.name : ("chrome.exe", "msedge.exe", "firefox.exe", "explorer.exe", "MsMpEng.exe")`}]}},{t:"detect",c:{id:"D03",name:"New credential added to an existing service principal",technique:"T1098.001",tags:["Identity","Persistence","Cloud"],logic:"Rather than maintain a stolen password against rotation and MFA, an intruder adds their own client secret or certificate to an application that already holds tenant permissions. The result is durable, MFA-immune, and survives the user password reset that usually closes an incident.",fp:"Legitimate secret rotation by platform teams and CI/CD pipelines. Alert on the actor rather than the action: a credential added by an account that is not in your app-registration owners group is the finding.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`AuditLogs
| where TimeGenerated > ago(30d)
| where OperationName in ("Add service principal credentials",
                          "Update application - Certificates and secrets management",
                          "Update application")
| where Result == "success"
| extend Actor  = tostring(InitiatedBy.user.userPrincipalName)
| extend AppActor = tostring(InitiatedBy.app.displayName)
| extend TargetApp = tostring(TargetResources[0].displayName)
| extend Props = TargetResources[0].modifiedProperties
| where tostring(Props) has_any ("KeyDescription", "PasswordCredentials", "KeyCredentials")
| project TimeGenerated, Actor, AppActor, TargetApp, OperationName,
          CorrelationId, ModifiedProperties = Props
| order by TimeGenerated desc`},{lang:"SPL",label:"Splunk (SPL)",code:`index=azure sourcetype="azure:aad:audit"
    operationName IN ("Add service principal credentials",
                      "Update application - Certificates and secrets management")
    "result"=success
| rename properties.* as *
| eval actor=coalesce('initiatedBy.user.userPrincipalName','initiatedBy.app.displayName')
| eval target_app='targetResources{}.displayName'
| search targetResources{}.modifiedProperties{}.displayName IN ("KeyDescription","PasswordCredentials","KeyCredentials")
| table _time actor target_app operationName correlationId
| sort - _time`},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`FROM logs-azure.auditlogs-*
| WHERE azure.auditlogs.operation_name IN (
      "Add service principal credentials",
      "Update application - Certificates and secrets management")
  AND event.outcome == "success"
| KEEP @timestamp, azure.auditlogs.identity, azure.auditlogs.operation_name,
       azure.auditlogs.properties.target_resources
| SORT @timestamp DESC`}]}},{t:"detect",c:{id:"D04",name:"Edge appliance: unexpected admin account or config write",technique:"T1190",tags:["Network","Initial Access"],logic:"VPN and edge appliances remain the most reliable initial access route: internet-facing by definition, no EDR agent, and patched on change-control cycles measured in weeks against exploitation measured in hours. Post-exploitation almost always includes an administrative account or a configuration write, and that is what you can see from syslog.",fp:"Genuine out-of-hours maintenance and vendor support sessions. Require change-ticket correlation rather than suppressing the rule — an appliance config change with no ticket is worth a phone call regardless of who made it.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`// Normalise appliance syslog first; table name will match your connector.
let AdminSources = dynamic(["10.10.5.0/24"]);   // your jump hosts, nothing else
Syslog
| where TimeGenerated > ago(7d)
| where Facility in ("local0","local7") or ProcessName has_any ("nsvpn","sslvpn","ike")
| where SyslogMessage has_any ("admin account created", "user added", "config changed",
                               "login success", "superuser", "write memory")
| extend SrcIP = extract(@"(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})", 1, SyslogMessage)
| where isnotempty(SrcIP)
| where not(ipv4_is_in_any_range(SrcIP, AdminSources))
| project TimeGenerated, Computer, SrcIP, ProcessName, SyslogMessage
| order by TimeGenerated desc`},{lang:"SPL",label:"Splunk (SPL)",code:`index=network sourcetype IN ("cisco:asa","pan:system","fortigate_event","citrix:netscaler")
    ("admin account created" OR "user added" OR "config changed" OR "write memory" OR "superuser")
| rex field=_raw "(?<src_ip>\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})"
| search NOT src_ip IN (10.10.5.0/24)
| stats count values(_raw) as events by host, src_ip, sourcetype
| sort - count`},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`FROM logs-network.*
| WHERE message LIKE "*admin account created*"
     OR message LIKE "*config changed*"
     OR message LIKE "*write memory*"
| WHERE NOT CIDR_MATCH(source.ip, "10.10.5.0/24")
| STATS hits = COUNT(*) BY host.name, source.ip
| SORT hits DESC`}]}},{t:"detect",c:{id:"D05",name:"Ransomware precursor: recovery destruction",technique:"T1490",tags:["Endpoint","Impact"],logic:"Before encryption starts, ransomware deletes volume shadow copies, clears the backup catalogue, and disables Windows recovery. This is the single highest-fidelity endpoint detection in the whole list — there is almost no benign reason for it, and it fires in the minutes before payload execution, which is the only window where response still matters.",fp:"Legitimate backup software occasionally resizes shadow storage, and some imaging tools clear catalogues. Exclude by signed publisher and expect fewer than a handful of hits a month in a normal estate.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`DeviceProcessEvents
| where TimeGenerated > ago(7d)
| where FileName in~ ("vssadmin.exe","wmic.exe","bcdedit.exe","wbadmin.exe",
                      "powershell.exe","pwsh.exe","diskshadow.exe")
| where ProcessCommandLine has_any ("delete shadows", "shadowcopy delete", "resize shadowstorage",
                                    "recoveryenabled no", "bootstatuspolicy ignoreallfailures",
                                    "delete catalog", "Win32_ShadowCopy", "Remove-Item -Path C:\\\\$Recycle")
| project Timestamp, DeviceName, AccountName, FileName, ProcessCommandLine,
          InitiatingProcessFileName, InitiatingProcessCommandLine, ReportId
| order by Timestamp desc`},{lang:"SPL",label:"Splunk (SPL)",code:`| tstats summariesonly=true count
    min(_time) as firstTime max(_time) as lastTime
    FROM datamodel=Endpoint.Processes
    WHERE Processes.process_name IN ("vssadmin.exe","wmic.exe","bcdedit.exe","wbadmin.exe","diskshadow.exe")
    BY Processes.dest Processes.user Processes.parent_process_name
       Processes.process_name Processes.process
| \`drop_dm_object_name(Processes)\`
| search process IN ("*delete shadows*","*shadowcopy delete*","*resize shadowstorage*",
                     "*recoveryenabled no*","*delete catalog*","*ignoreallfailures*")
| \`security_content_ctime(firstTime)\`
| table firstTime dest user parent_process_name process_name process`},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`// EQL — recovery destruction, any of the usual binaries.
process where event.type == "start" and
  process.name : ("vssadmin.exe", "wmic.exe", "bcdedit.exe", "wbadmin.exe", "diskshadow.exe") and
  process.command_line : ("*delete shadows*", "*shadowcopy delete*", "*resize shadowstorage*",
                          "*recoveryenabled no*", "*delete catalog*", "*ignoreallfailures*")`}]}},{t:"detect",c:{id:"D06",name:"Kerberoasting: bulk RC4 service ticket requests",technique:"T1558.003",tags:["Active Directory","Credential Access"],logic:"An authenticated user requests service tickets for many SPNs and downgrades the encryption to RC4-HMAC (0x17) so the tickets can be cracked offline. The tell is not any single request — it is one account requesting tickets for an unusual number of distinct services in a short window, in RC4 when your domain otherwise negotiates AES.",fp:"Legacy applications and older Linux Kerberos clients genuinely negotiate RC4. Establish which accounts do this normally, exclude them, and then treat any new account exhibiting the pattern as a finding.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`SecurityEvent
| where TimeGenerated > ago(7d)
| where EventID == 4769                              // Kerberos service ticket requested
| where TicketEncryptionType == "0x17"               // RC4-HMAC — the downgrade
| where TicketOptions == "0x40810000"
| where ServiceName !endswith "$" and ServiceName !~ "krbtgt"
| where Status == "0x0"
| summarize SpnCount = dcount(ServiceName),
            Spns     = make_set(ServiceName, 25),
            Requests = count()
    by Account, IpAddress, bin(TimeGenerated, 10m)
| where SpnCount >= 10
| order by SpnCount desc`},{lang:"SPL",label:"Splunk (SPL)",code:`index=windows source="WinEventLog:Security" EventCode=4769
    Ticket_Encryption_Type=0x17 Ticket_Options=0x40810000
| search NOT Service_Name="*$" NOT Service_Name="krbtgt"
| bin _time span=10m
| stats dc(Service_Name) as spn_count
        values(Service_Name) as spns
        count as requests
        by Account_Name, Client_Address, _time
| where spn_count >= 10
| sort - spn_count`},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`FROM logs-system.security-*
| WHERE event.code == "4769"
  AND winlog.event_data.TicketEncryptionType == "0x17"
  AND winlog.event_data.TicketOptions == "0x40810000"
  AND NOT winlog.event_data.ServiceName LIKE "*$"
| EVAL win = DATE_TRUNC(10 minutes, @timestamp)
| STATS spn_count = COUNT_DISTINCT(winlog.event_data.ServiceName),
        requests  = COUNT(*)
      BY user.name, source.ip, win
| WHERE spn_count >= 10
| SORT spn_count DESC`}]}},{t:"detect",c:{id:"D07",name:"EC2 instance credentials used from outside AWS",technique:"T1552.005",tags:["Cloud","AWS","Credential Access"],logic:"An SSRF or compromised workload lets an attacker read the instance metadata service and walk away with the instance role’s temporary credentials. Those credentials then get used from the attacker’s own infrastructure. The detection is a principal whose session name is an instance ID being used from a source IP that is not that instance — the pattern behind the 2019 Capital One breach and still working.",fp:"AWS services calling on your behalf show a source IP of an amazonaws.com service principal rather than a public IP; exclude those. Genuine hybrid workloads using instance roles through a NAT gateway need their egress IPs allow-listed.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`AWSCloudTrail
| where TimeGenerated > ago(7d)
| where UserIdentityType == "AssumedRole"
| where UserIdentityPrincipalid has ":i-"          // session name is an EC2 instance id
| where SourceIpAddress !endswith ".amazonaws.com"
| where not(ipv4_is_in_any_range(SourceIpAddress,
        dynamic(["10.0.0.0/8","172.16.0.0/12","192.168.0.0/16","203.0.113.10/32"])))  // + your NAT egress
| summarize Calls = count(),
            Actions = make_set(EventName, 30),
            Regions = make_set(AWSRegion, 5)
    by UserIdentityPrincipalid, SourceIpAddress, bin(TimeGenerated, 1h)
| order by Calls desc`},{lang:"SPL",label:"Splunk (SPL)",code:`index=aws sourcetype=aws:cloudtrail userIdentity.type=AssumedRole
| search userIdentity.principalId="*:i-*"
| search NOT sourceIPAddress="*.amazonaws.com"
| search NOT sourceIPAddress IN (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 203.0.113.10)
| stats count as calls
        values(eventName) as actions
        dc(eventName) as distinct_actions
        by userIdentity.principalId, sourceIPAddress, awsRegion
| where calls > 0
| sort - distinct_actions`},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`FROM logs-aws.cloudtrail-*
| WHERE aws.cloudtrail.user_identity.type == "AssumedRole"
  AND aws.cloudtrail.user_identity.arn LIKE "*:i-*"
  AND NOT source.ip LIKE "*.amazonaws.com"
  AND NOT CIDR_MATCH(source.ip, "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16")
| STATS calls = COUNT(*), actions = COUNT_DISTINCT(event.action)
      BY aws.cloudtrail.user_identity.arn, source.ip
| SORT actions DESC`}]}},{t:"detect",c:{id:"D08",name:"Remote monitoring tool installed outside IT change",technique:"T1219",tags:["Endpoint","Command and Control"],logic:"Ransomware crews stopped writing custom C2 and started installing ScreenConnect, AnyDesk, Atera, or Splashtop — signed, legitimate software that no EDR will block and no proxy will flag. Detect on the estate rule instead: which RMM tools does your IT function actually use, and every other one is an incident.",fp:"Vendor support sessions and shadow IT. This rule works only if you first decide what your sanctioned RMM is. If the answer is “three of them, depending on the team,” fix that first — the detection is downstream of the policy.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`// Everything except your one sanctioned tool. Replace the allow-list.
let Sanctioned = dynamic(["ScreenConnect.ClientService.exe"]);
DeviceProcessEvents
| where TimeGenerated > ago(14d)
| where FileName in~ ("AnyDesk.exe","TeamViewer.exe","ScreenConnect.ClientService.exe",
                      "AteraAgent.exe","SplashtopStreamer.exe","RemotePCService.exe",
                      "Syncro.Service.exe","LogMeIn.exe","GoToAssist.exe","ngrok.exe")
| where FileName !in~ (Sanctioned)
| summarize FirstSeen = min(Timestamp), Executions = count(),
            Users = make_set(AccountName, 5), Cmds = make_set(ProcessCommandLine, 3)
    by DeviceName, FileName, InitiatingProcessFileName
| order by FirstSeen desc`},{lang:"SPL",label:"Splunk (SPL)",code:`| tstats summariesonly=true count min(_time) as firstTime
    FROM datamodel=Endpoint.Processes
    WHERE Processes.process_name IN ("AnyDesk.exe","TeamViewer.exe","AteraAgent.exe",
                                     "SplashtopStreamer.exe","RemotePCService.exe",
                                     "Syncro.Service.exe","LogMeIn.exe","GoToAssist.exe","ngrok.exe")
    BY Processes.dest Processes.user Processes.process_name Processes.parent_process_name
| \`drop_dm_object_name(Processes)\`
| \`security_content_ctime(firstTime)\`
| sort - firstTime`},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`FROM logs-endpoint.events.process-*
| WHERE process.name IN ("AnyDesk.exe","TeamViewer.exe","AteraAgent.exe","SplashtopStreamer.exe",
                         "RemotePCService.exe","Syncro.Service.exe","LogMeIn.exe","ngrok.exe")
| STATS first_seen = MIN(@timestamp), executions = COUNT(*)
      BY host.name, process.name, user.name
| SORT first_seen DESC`}]}},{t:"detect",c:{id:"D09",name:"LOLBin download and execute chain",technique:"T1218",tags:["Endpoint","Execution"],logic:"Living-off-the-land binaries let an intruder stage a payload without dropping an unsigned executable: certutil pulls a file from a URL, mshta runs remote script, regsvr32 loads a remote scriptlet. The binaries are Microsoft-signed, so signature-based blocking will not help — the command line is the artefact.",fp:"Enterprise software deployment and some patching tools genuinely use bitsadmin and certutil. Exclude by parent process (your deployment agent) rather than by binary, or you will blind the rule entirely.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`DeviceProcessEvents
| where TimeGenerated > ago(7d)
| where FileName in~ ("certutil.exe","bitsadmin.exe","mshta.exe","regsvr32.exe",
                      "curl.exe","msiexec.exe","installutil.exe","rundll32.exe")
| where ProcessCommandLine has_any ("urlcache","-urlcache","/transfer","http://","https://",
                                    "scrobj.dll","javascript:","vbscript:")
| where InitiatingProcessFileName !in~ ("ccmexec.exe","setup.exe","TrustedInstaller.exe")
| project Timestamp, DeviceName, AccountName, FileName, ProcessCommandLine,
          InitiatingProcessFileName, InitiatingProcessParentFileName
| order by Timestamp desc`},{lang:"SPL",label:"Splunk (SPL)",code:`| tstats summariesonly=true count min(_time) as firstTime
    FROM datamodel=Endpoint.Processes
    WHERE Processes.process_name IN ("certutil.exe","bitsadmin.exe","mshta.exe",
                                     "regsvr32.exe","curl.exe","installutil.exe")
    BY Processes.dest Processes.user Processes.parent_process_name
       Processes.process_name Processes.process
| \`drop_dm_object_name(Processes)\`
| search process IN ("*urlcache*","*/transfer*","*http://*","*https://*",
                     "*scrobj.dll*","*javascript:*")
| search NOT parent_process_name IN ("ccmexec.exe","TrustedInstaller.exe")
| \`security_content_ctime(firstTime)\``},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`// EQL — signed Microsoft binary reaching out to a URL.
process where event.type == "start" and
  process.name : ("certutil.exe", "bitsadmin.exe", "mshta.exe", "regsvr32.exe",
                  "curl.exe", "installutil.exe") and
  process.command_line : ("*urlcache*", "*/transfer*", "*http://*", "*https://*",
                          "*scrobj.dll*", "*javascript:*") and
  not process.parent.name : ("ccmexec.exe", "TrustedInstaller.exe")`}]}},{t:"detect",c:{id:"D10",name:"AI agent identity operating outside its baseline",technique:"T1098 / OWASP LLM06",tags:["AI","Identity","Emerging"],logic:"This is the genuinely new one. An AI assistant or MCP server is wired into your tenant with a service principal and a broad consent grant. When it is prompt-injected — through a document, an email, a ticket — it does not exploit anything. It uses the permissions you already gave it. There is no malware and no signature; the only signal is that a non-interactive identity started doing something it has never done before.",fp:"Genuine feature launches and expanded automation scope will trip this. That is the point: the rule should force a conversation about what the agent is permitted to do, and any expansion should be a known change rather than a surprise.",queries:[{lang:"KQL",label:"Microsoft Sentinel / Defender XDR",code:`// Part A — broad delegated consent granted to any application.
AuditLogs
| where TimeGenerated > ago(30d)
| where OperationName in ("Consent to application", "Add delegated permission grant",
                          "Add app role assignment to service principal")
| extend Scopes = tostring(TargetResources[0].modifiedProperties)
| where Scopes has_any ("Mail.Read","Mail.ReadWrite","Files.ReadWrite.All",
                        "Sites.FullControl.All","Directory.ReadWrite.All",
                        "User.ReadWrite.All","Application.ReadWrite.All")
| project TimeGenerated, Actor = tostring(InitiatedBy.user.userPrincipalName),
          App = tostring(TargetResources[0].displayName), OperationName, Scopes

// Part B — service principal doing something it has not done in 14 days.
let Baseline =
    AADServicePrincipalSignInLogs
    | where TimeGenerated between (ago(21d) .. ago(7d))
    | summarize KnownIPs = make_set(IPAddress, 100), KnownApps = make_set(ResourceDisplayName, 50)
        by ServicePrincipalName;
AADServicePrincipalSignInLogs
| where TimeGenerated > ago(7d)
| where ResultType == 0
| join kind=leftouter Baseline on ServicePrincipalName
| where isnull(KnownIPs) or IPAddress !in (KnownIPs)
| project TimeGenerated, ServicePrincipalName, IPAddress, ResourceDisplayName, ServicePrincipalId`},{lang:"SPL",label:"Splunk (SPL)",code:`index=azure sourcetype="azure:aad:audit"
    operationName IN ("Consent to application","Add delegated permission grant",
                      "Add app role assignment to service principal")
| rename properties.* as *
| eval scopes='targetResources{}.modifiedProperties{}.newValue'
| search scopes IN ("*Mail.Read*","*Files.ReadWrite.All*","*Sites.FullControl.All*",
                    "*Directory.ReadWrite.All*","*Application.ReadWrite.All*")
| table _time initiatedBy.user.userPrincipalName targetResources{}.displayName operationName scopes
| sort - _time`},{lang:"ELK",label:"Elastic (ES|QL / EQL)",code:`FROM logs-azure.auditlogs-*
| WHERE azure.auditlogs.operation_name IN (
      "Consent to application", "Add delegated permission grant",
      "Add app role assignment to service principal")
| WHERE azure.auditlogs.properties.target_resources LIKE "*ReadWrite.All*"
     OR azure.auditlogs.properties.target_resources LIKE "*FullControl.All*"
| KEEP @timestamp, azure.auditlogs.identity, azure.auditlogs.operation_name
| SORT @timestamp DESC`}]}},{t:"h2",c:"The YARA rules"},{t:"p",c:"These four match on-disk and in-memory artefacts, which is where YARA earns its place: D02 (infostealers), D05 (ransomware), and the webshells that frequently follow D04. Scan with <b>yara -r rules.yar /path</b>, or wire them into your EDR’s custom-IOC ingestion where it supports YARA."},{t:"note",c:"Every rule below is a <b>heuristic</b>, written to be readable rather than exhaustive. They will produce false positives on security tooling, malware research directories, and documentation. Test with <b>--print-strings</b> against a known-clean host before you scan production."},{t:"code",label:"YARA — infostealer targeting browser credential stores",c:`rule Infostealer_Browser_Credential_Paths
{
    meta:
        description = "Heuristic: binary referencing multiple browser credential stores"
        author      = "Cloud Secure Canada"
        date        = "2026-08-30"
        reference   = "https://attack.mitre.org/techniques/T1555/003/"
        maps_to     = "D02"

    strings:
        $chrome1 = "\\\\Google\\\\Chrome\\\\User Data" ascii wide nocase
        $chrome2 = "Login Data"                      ascii wide
        $chrome3 = "Local State"                     ascii wide
        $edge1   = "\\\\Microsoft\\\\Edge\\\\User Data" ascii wide nocase
        $ff1     = "logins.json"                     ascii wide
        $ff2     = "key4.db"                         ascii wide

        // DPAPI + master-key handling that cookie theft needs
        $api1    = "CryptUnprotectData"              ascii
        $api2    = "os_crypt"                        ascii wide
        $api3    = "encrypted_key"                   ascii wide

    condition:
        uint16(0) == 0x5A4D            // PE
        and filesize < 15MB
        and 3 of ($chrome*, $edge*, $ff*)
        and 1 of ($api*)
}`},{t:"code",label:"YARA — ransom note heuristic",c:`rule Ransomware_Note_Generic
{
    meta:
        description = "Heuristic: small text file carrying ransom-note language"
        author      = "Cloud Secure Canada"
        date        = "2026-08-30"
        reference   = "https://attack.mitre.org/techniques/T1486/"
        maps_to     = "D05"

    strings:
        $enc1 = "your files have been encrypted"  ascii wide nocase
        $enc2 = "all your files are encrypted"    ascii wide nocase
        $enc3 = "your network has been breached"  ascii wide nocase
        $enc4 = "decryption key"                  ascii wide nocase

        $prs1 = "do not rename"                   ascii wide nocase
        $prs2 = "third party recovery"            ascii wide nocase
        $prs3 = "permanently lost"                ascii wide nocase
        $prs4 = "published on our blog"           ascii wide nocase

        $con1 = ".onion"                          ascii wide nocase
        $con2 = "qTox"                            ascii wide nocase
        $con3 = "session id"                      ascii wide nocase

    condition:
        filesize < 50KB
        and 1 of ($enc*)
        and 1 of ($prs*)
        and 1 of ($con*)
}`},{t:"code",label:"YARA — generic webshell (ASPX / PHP / JSP)",c:`rule Webshell_Generic_Eval_Dispatch
{
    meta:
        description = "Heuristic: small web-root file dispatching attacker-supplied input"
        author      = "Cloud Secure Canada"
        date        = "2026-08-30"
        reference   = "https://attack.mitre.org/techniques/T1505/003/"
        maps_to     = "D04"

    strings:
        // attacker-controlled input reaching an executor
        $php1 = /eval\\s*\\(\\s*\\$_(GET|POST|REQUEST|COOKIE)/ nocase
        $php2 = /assert\\s*\\(\\s*\\$_(GET|POST|REQUEST)/       nocase
        $php3 = /(system|shell_exec|passthru|popen)\\s*\\(\\s*\\$_/ nocase

        $asp1 = "Request.Item["                          ascii nocase
        $asp2 = "System.Diagnostics.Process"             ascii nocase
        $asp3 = "eval(Request"                           ascii nocase

        $jsp1 = "Runtime.getRuntime().exec"              ascii
        $jsp2 = "request.getParameter"                   ascii

    condition:
        filesize < 500KB
        and (
              any of ($php*)
              or (2 of ($asp*))
              or (all of ($jsp*))
            )
}`},{t:"code",label:"YARA — in-memory beacon configuration markers",c:`rule Beacon_Config_In_Memory
{
    meta:
        description = "Heuristic: Cobalt-Strike-style beacon config in a memory dump"
        author      = "Cloud Secure Canada"
        date        = "2026-08-30"
        reference   = "https://attack.mitre.org/techniques/T1071/001/"
        note        = "Scan process memory, not disk: yara -p 8 rules.yar <pid>"

    strings:
        // default reflective-loader export and named-pipe patterns
        $ldr  = "ReflectiveLoader"        ascii
        $pipe = /\\\\\\\\\\.\\\\pipe\\\\(msagent|postex|status)_[0-9a-f]{4}/ nocase

        // config block markers seen in unencrypted beacon settings
        $cfg1 = { 00 01 00 01 00 02 }
        $cfg2 = { 00 02 00 01 00 02 }
        $ua   = "User-Agent: Mozilla/"   ascii

    condition:
        filesize < 500MB
        and (
              ($ldr and $ua)
              or $pipe
              or (all of ($cfg*) and $ua)
            )
}`},{t:"h2",c:"Validating that any of this works"},{t:"p",c:"A deployed rule that has never fired is indistinguishable from a broken one. Before you call a detection live, generate the behaviour and confirm the alert lands:"},{t:"ol",c:["<b>Atomic Red Team</b> has a mapped test for most of these techniques. Run the atomic for T1490 on an isolated host and confirm D05 fires end to end — log, rule, alert, ticket.","<b>Record the detection latency.</b> The gap between the event and the analyst seeing it is the number that determines whether D05 is useful or just forensic.","<b>Write down the tuning.</b> Every exclusion you add is a hole. An exclusion with no comment explaining why becomes permanent, and permanent exclusions are how estates go blind.","<b>Re-test after upgrades.</b> Schema changes in a SIEM upgrade silently break field references. A quarterly re-run of the atomics catches it."]},{t:"note",c:"If you deploy only one rule from this post, deploy <b>D05</b>. It is the highest fidelity, the cheapest to tune, and it fires during the only window in a ransomware incident where a human can still change the outcome."}],sources:[{title:"MITRE ATT&CK Enterprise Matrix",publisher:"MITRE",url:"https://attack.mitre.org/matrices/enterprise/"},{title:"Known Exploited Vulnerabilities Catalog",publisher:"CISA",url:"https://www.cisa.gov/known-exploited-vulnerabilities-catalog"},{title:"Splunk Security Content (detection research)",publisher:"Splunk Threat Research Team",url:"https://research.splunk.com/"},{title:"Elastic prebuilt detection rules",publisher:"Elastic",url:"https://github.com/elastic/detection-rules"},{title:"Microsoft Sentinel community detections",publisher:"Microsoft",url:"https://github.com/Azure/Azure-Sentinel"},{title:"Sigma — generic signature format for SIEM systems",publisher:"SigmaHQ",url:"https://github.com/SigmaHQ/sigma"},{title:"Atomic Red Team — technique validation tests",publisher:"Red Canary",url:"https://github.com/redcanaryco/atomic-red-team"},{title:"YARA documentation",publisher:"VirusTotal",url:"https://yara.readthedocs.io/"},{title:"OWASP Top 10 for Large Language Model Applications",publisher:"OWASP",url:"https://genai.owasp.org/llm-top-10/"}]},{slug:"baseline-hardening-macos-windows-linux",title:"Baseline Hardening for macOS, Windows 11, and Linux",date:"2026-08-30",updated:"2026-08-30",readingTime:16,tags:["Hardening","Endpoint","Baselines"],motif:"layers",pinned:!0,pinOrder:2,cover:"/images/blog/baseline-hardening",coverAlt:"Laptop on a desk beside a notebook, used here to represent endpoint configuration work.",excerpt:"The controls that remove the most attacker options per hour of effort, on all three platforms — with the commands to verify what you have before you change anything.",body:[{t:"p",c:"Most hardening guides fail for the same reason: they are 400 controls long, written against one OS version, and abandoned three pages in. This one is deliberately shorter. It covers the controls that remove the most attacker options per hour of effort, on all three platforms, in a form you can apply whether you are securing five laptops or five thousand."},{t:"p",c:"Nothing here is exotic. It is the floor. If you are already past it, use it as an audit checklist; if you are starting from a default install, work top to bottom and you will close most of what a commodity intrusion relies on."},{t:"note",c:"<b>Test before you deploy.</b> Every command below changes system behaviour, and a few will break legitimate workflows in a specific estate — device encryption without escrowed recovery keys locks you out, and application control without an audit phase stops the business. Pilot on a small ring first. This is a starting point, not a change ticket."},{t:"h2",c:"What applies everywhere first"},{t:"p",c:"Before any OS-specific setting, these six determine more of your outcome than the rest of the guide combined. A perfectly hardened laptop with a local admin user who reuses a password is not hardened."},{t:"ol",c:["<b>Know what you have.</b> An asset inventory that is current within a week. You cannot harden or patch a device you do not know exists, and unmanaged devices are where intrusions start.","<b>Patch on a clock, and separately for internet-facing things.</b> A 30-day cycle for workstations is defensible. Internet-facing appliances need an emergency path measured in hours — exploitation of edge devices routinely beats a monthly window.","<b>Remove standing local administrator rights.</b> This single change defeats a large share of commodity malware, which assumes it can write to system locations. Give admin on demand and time-bound it.","<b>Phishing-resistant MFA on every account that can reach anything.</b> Passkeys or hardware tokens. Push-approval MFA is now routinely defeated by fatigue and AiTM proxies.","<b>Full-disk encryption with escrowed recovery keys.</b> Encryption without key escrow is a self-inflicted outage waiting to happen; key escrow without encryption is nothing.","<b>Ship logs somewhere the endpoint cannot delete them.</b> Local logs are cleared by the intruder. Ninety days retained centrally is a workable minimum, and it is the difference between an investigation and a shrug."]},{t:"h2",c:"macOS"},{t:"p",c:"macOS ships reasonably secure by default, and the work is mostly confirming defaults are still on, closing the sharing services, and getting devices under a management profile so settings cannot be silently reversed by the user."},{t:"h3",c:"Verify the platform protections are actually on"},{t:"code",label:"macOS — verification (run first, change nothing)",c:`# FileVault full-disk encryption
sudo fdesetup status                       # want: FileVault is On.

# System Integrity Protection — protects system files even from root
csrutil status                             # want: enabled

# Gatekeeper — blocks unsigned / unnotarised applications
spctl --status                             # want: assessments enabled

# Application firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate

# Signed system volume (macOS Big Sur and later)
csrutil authenticated-root status          # want: enabled

# Which sharing services are listening
sudo launchctl list | grep -Ei 'smbd|afpd|screensharing|ssh'`},{t:"h3",c:"Apply the baseline"},{t:"code",label:"macOS — baseline hardening",c:`# --- Encryption -------------------------------------------------------------
# Enable FileVault. Escrow the recovery key through MDM before running this
# on a fleet; without escrow you will eventually lock someone out permanently.
sudo fdesetup enable

# --- Network ----------------------------------------------------------------
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsigned on
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsignedapp off

# --- Turn off sharing services you are not deliberately using ---------------
sudo systemsetup -setremotelogin off          # SSH
sudo launchctl disable system/com.apple.smbd  # SMB file sharing
sudo launchctl disable system/com.apple.screensharing

# --- Updates ----------------------------------------------------------------
sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate \\
     AutomaticCheckEnabled -bool true
sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate \\
     AutomaticDownload -bool true
sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate \\
     CriticalUpdateInstall -bool true
# Rapid Security Responses — out-of-band fixes for actively exploited bugs
sudo defaults write /Library/Preferences/com.apple.SoftwareUpdate \\
     AutomaticallyInstallMacOSUpdates -bool true

# --- Screen lock ------------------------------------------------------------
defaults write com.apple.screensaver askForPassword -int 1
defaults write com.apple.screensaver askForPasswordDelay -int 0

# --- Reduce local attack surface -------------------------------------------
sudo dscl . -create /Users/guest UserShell /usr/bin/false   # no guest shell
sudo defaults write /Library/Preferences/com.apple.loginwindow \\
     GuestEnabled -bool false`},{t:"p",c:"Two settings worth calling out because they are commonly missed. <b>Lockdown Mode</b> (System Settings → Privacy &amp; Security) is an extreme profile intended for people plausibly targeted by commercial spyware — it breaks some web and messaging features, so do not push it estate-wide, but it belongs on the devices of executives, journalists, and anyone handling acquisition or litigation material. <b>Firmware protection</b> differs by silicon: Intel Macs use <b>firmwarepasswd</b>, while Apple Silicon uses the Recovery lock set through MDM. Do not assume a policy written for Intel still applies."},{t:"note",c:"On a fleet, apply all of this as a <b>configuration profile through MDM</b> rather than as shell commands. Commands drift the moment a user changes a setting; a profile re-asserts itself and reports compliance. Apple publishes a per-version macOS Security Compliance Project that generates signed baselines for CIS, STIG, and NIST 800-53 — start there rather than hand-rolling."},{t:"h2",c:"Windows 11"},{t:"p",c:"Windows 11 on modern hardware ships with the virtualisation-based protections available, and on new installs meeting the hardware requirements several are on by default. The work is confirming they are actually enabled on your estate — in-place upgrades from Windows 10 frequently are not — and then adding attack surface reduction, logging, and credential hygiene."},{t:"h3",c:"Verify first"},{t:"code",label:"PowerShell (admin) — verification",c:`# Disk encryption status for every volume
Get-BitLockerVolume | Select-Object MountPoint, VolumeStatus, ProtectionStatus, EncryptionMethod

# Virtualisation-based security and Credential Guard
Get-CimInstance -ClassName Win32_DeviceGuard \`
  -Namespace root\\Microsoft\\Windows\\DeviceGuard |
  Select-Object VirtualizationBasedSecurityStatus,
                SecurityServicesConfigured, SecurityServicesRunning
# SecurityServicesRunning containing 1 = Credential Guard active

# LSA running as a protected process (blocks credential dumping from lsass)
Get-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa' -Name RunAsPPL -EA 0

# Defender real-time protection and tamper protection
Get-MpComputerStatus | Select-Object RealTimeProtectionEnabled, IsTamperProtected,
                                     AntivirusSignatureAge

# Which ASR rules are configured
Get-MpPreference | Select-Object -ExpandProperty AttackSurfaceReductionRules_Ids

# SMBv1 should not be present at all
Get-WindowsOptionalFeature -Online -FeatureName SMB1Protocol |
  Select-Object FeatureName, State`},{t:"h3",c:"Apply the baseline"},{t:"code",label:"PowerShell (admin) — baseline hardening",c:`# --- Disk encryption --------------------------------------------------------
# Escrow recovery keys to Entra ID / AD before enabling on a fleet.
Enable-BitLocker -MountPoint 'C:' -EncryptionMethod XtsAes256 \`
                 -UsedSpaceOnly -TpmProtector
Add-BitLockerKeyProtector -MountPoint 'C:' -RecoveryPasswordProtector
BackupToAAD-BitLockerKeyProtector -MountPoint 'C:' \`
  -KeyProtectorId (Get-BitLockerVolume -MountPoint 'C:').KeyProtector[1].KeyProtectorId

# --- Protect LSA against credential dumping --------------------------------
New-ItemProperty -Path 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa' \`
  -Name 'RunAsPPL' -Value 1 -PropertyType DWORD -Force

# --- Defender: tamper-resistant, cloud-assisted -----------------------------
Set-MpPreference -DisableRealtimeMonitoring $false
Set-MpPreference -MAPSReporting Advanced
Set-MpPreference -SubmitSamplesConsent SendSafeSamples
Set-MpPreference -CloudBlockLevel High
Set-MpPreference -PUAProtection Enabled

# --- Attack Surface Reduction ----------------------------------------------
# Deploy in Audit (2) first, review the telemetry, then move to Enabled (1).
# GUIDs below are a starting set; pull the current full list from Microsoft.
$asr = @{
  '9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2' = 'Block credential stealing from LSASS'
  'd4f940ab-401b-4efc-aadc-ad5f3c50688a' = 'Block Office apps creating child processes'
  'be9ba2d9-53ea-4cdc-84e5-9b1eeee46550' = 'Block executable content from email/webmail'
  'e6db77e5-3df2-4cf1-b95a-636979351e5b' = 'Block persistence via WMI event subscription'
  '56a863a9-875e-4185-98a7-b882c64b5ce5' = 'Block abuse of vulnerable signed drivers'
}
foreach ($id in $asr.Keys) {
  Add-MpPreference -AttackSurfaceReductionRules_Ids $id \`
                   -AttackSurfaceReductionRules_Actions AuditMode
}

# --- Remove legacy protocols ------------------------------------------------
Disable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart

# --- Logging that investigations actually need ------------------------------
$psBase = 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell'
New-Item -Path "$psBase\\ScriptBlockLogging" -Force | Out-Null
New-ItemProperty -Path "$psBase\\ScriptBlockLogging" \`
  -Name 'EnableScriptBlockLogging' -Value 1 -PropertyType DWORD -Force
New-Item -Path "$psBase\\ModuleLogging" -Force | Out-Null
New-ItemProperty -Path "$psBase\\ModuleLogging" \`
  -Name 'EnableModuleLogging' -Value 1 -PropertyType DWORD -Force

# Command line in process-creation events — without this, 4688 is near useless
auditpol /set /subcategory:"Process Creation" /success:enable /failure:enable
New-ItemProperty -Path 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit' \`
  -Name 'ProcessCreationIncludeCmdLine_Enabled' -Value 1 -PropertyType DWORD -Force

# Grow the Security log so it does not roll before you read it
wevtutil sl Security /ms:1073741824`},{t:"p",c:"Two more that matter more than their effort suggests. <b>Windows LAPS</b> is built into Windows 11 and randomises the local administrator password per device — without it, one recovered local admin hash moves laterally across the entire estate. And <b>application control</b> (WDAC, or AppLocker on older estates) is the highest-value control on this page and the one most likely to cause an outage; run it in audit mode for at least a month and read the logs before enforcing."},{t:"h2",c:"Linux"},{t:"p",c:"Linux baselines vary more by distribution than the other two platforms, so the commands below note where they differ. The priorities are the same everywhere: lock down SSH, restrict privilege escalation, turn on the kernel hardening that is off by default, and make sure the audit trail exists."},{t:"h3",c:"SSH — the control that matters most"},{t:"code",label:"/etc/ssh/sshd_config.d/00-hardening.conf",c:`# Drop a file into sshd_config.d rather than editing sshd_config directly:
# package upgrades overwrite the main file and silently revert your hardening.

PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
ChallengeResponseAuthentication no
PubkeyAuthentication yes

# Restrict who may log in at all
AllowGroups ssh-users

# Reduce brute-force and session surface
MaxAuthTries 3
MaxSessions 4
LoginGraceTime 30
ClientAliveInterval 300
ClientAliveCountMax 2

# Turn off forwarding features unless a workload genuinely needs them
X11Forwarding no
AllowAgentForwarding no
AllowTcpForwarding no
PermitTunnel no

# Modern algorithms only
KexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com`},{t:"code",label:"bash — validate and reload sshd safely",c:`# ALWAYS validate before reloading, and keep your current session open
# until you have proven a second session can connect.
sudo sshd -t && sudo systemctl reload sshd

# From another terminal, confirm you can still get in:
ssh -o BatchMode=yes user@host 'echo connected'`},{t:"h3",c:"Kernel and filesystem"},{t:"code",label:"/etc/sysctl.d/99-hardening.conf",c:`# Memory / process protections
kernel.randomize_va_space = 2        # full ASLR
kernel.kptr_restrict = 2             # hide kernel pointers from userspace
kernel.dmesg_restrict = 1            # non-root cannot read the kernel ring buffer
kernel.yama.ptrace_scope = 1         # restrict debugger attachment
kernel.unprivileged_bpf_disabled = 1
fs.protected_hardlinks = 1
fs.protected_symlinks = 1
fs.suid_dumpable = 0

# Network
net.ipv4.tcp_syncookies = 1
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.all.log_martians = 1
net.ipv6.conf.all.accept_redirects = 0

# Apply:  sudo sysctl --system`},{t:"code",label:"bash — mandatory access control, firewall, updates",c:`# --- Mandatory access control: confirm it is enforcing, not permissive ------
# RHEL / Fedora / Rocky:
sestatus                          # want: enabled + enforcing
sudo setenforce 1
# Debian / Ubuntu:
sudo aa-status                    # want: profiles in enforce mode

# --- Host firewall: default deny inbound ------------------------------------
# Debian / Ubuntu (ufw):
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow from 10.10.5.0/24 to any port 22 proto tcp
sudo ufw enable
# RHEL family (firewalld):
sudo firewall-cmd --set-default-zone=drop
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload

# --- Unattended security updates -------------------------------------------
# Debian / Ubuntu:
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
# RHEL family:
sudo dnf install -y dnf-automatic
sudo systemctl enable --now dnf-automatic-install.timer

# --- Audit what you cannot prevent ------------------------------------------
sudo systemctl enable --now auditd`},{t:"code",label:"/etc/audit/rules.d/hardening.rules",c:`# Identity and privilege files
-w /etc/passwd  -p wa -k identity
-w /etc/shadow  -p wa -k identity
-w /etc/group   -p wa -k identity
-w /etc/sudoers -p wa -k privilege
-w /etc/sudoers.d/ -p wa -k privilege

# SSH configuration
-w /etc/ssh/sshd_config -p wa -k sshd_config

# Every process execution (high volume — size your log shipping for it)
-a always,exit -F arch=b64 -S execve -k exec
-a always,exit -F arch=b32 -S execve -k exec

# Privilege escalation and module loading
-a always,exit -F arch=b64 -S setuid -S setgid -F auid>=1000 -F auid!=4294967295 -k privesc
-w /sbin/insmod -p x -k modules
-w /sbin/modprobe -p x -k modules

# Load with:  sudo augenrules --load`},{t:"p",c:"Mount options are the cheapest remaining win. Adding <b>nodev,nosuid,noexec</b> to <b>/tmp</b>, <b>/var/tmp</b>, and <b>/dev/shm</b> in <b>/etc/fstab</b> removes the most convenient staging directories on the system, and almost nothing legitimate breaks. Test it — a few package installers and older application servers genuinely execute from /tmp."},{t:"h2",c:"Prove it, then keep proving it"},{t:"p",c:"A baseline that is applied once and never measured decays within a quarter. Use a scanner that produces a score you can trend:"},{t:"table",head:["Platform","Tool","What it gives you"],rows:[["All three","<b>CIS-CAT</b> (CIS Benchmarks)","Scored assessment against the published benchmark. Free Lite tier covers common platforms; full version needs CIS SecureSuite membership."],["Linux","<b>Lynis</b> (<b>lynis audit system</b>)","Free, no agent, immediately useful. Produces a hardening index plus specific remediation suggestions."],["Linux / Windows","<b>OpenSCAP</b> (<b>oscap xccdf eval</b>)","Automated SCAP content including DISA STIG profiles. Machine-readable results suitable for a pipeline."],["Windows","<b>Microsoft Security Compliance Toolkit</b>","Microsoft's own baseline GPOs plus Policy Analyzer to diff your settings against them."],["macOS","<b>macOS Security Compliance Project</b>","Generates signed configuration profiles and audit scripts for CIS, STIG, and NIST 800-53 per macOS version."]]},{t:"h2",c:"Rolling it out without breaking the business"},{t:"ol",c:["<b>Pilot ring first.</b> Ten to twenty devices covering your genuinely awkward users — the developers, the finance team with the ancient add-in, the executive with unusual hardware. They will find the breakage.","<b>Audit mode before enforce.</b> Application control and ASR both support it. A month of audit telemetry tells you exactly what would have broken.","<b>Keep a documented break-glass path.</b> A tested way back in when a policy locks out a device, held by more than one person, and rehearsed before you need it.","<b>Escrow every recovery key before enabling encryption.</b> Not after. This is the single most common self-inflicted outage in a hardening project.","<b>Re-baseline after every OS feature update.</b> Major upgrades reset settings and add new ones. Schedule the re-scan as part of the upgrade, not as a separate project nobody funds."]},{t:"note",c:"If you can only do three things this month: remove standing local admin, turn on disk encryption with escrowed keys, and get process-creation logs with command lines shipping somewhere central. That combination blocks a large share of commodity intrusion and makes the rest investigable."}],sources:[{title:"CIS Benchmarks",publisher:"Center for Internet Security",url:"https://www.cisecurity.org/cis-benchmarks"},{title:"Security Technical Implementation Guides (STIGs)",publisher:"DISA / DoD Cyber Exchange",url:"https://public.cyber.mil/stigs/"},{title:"Apple Platform Security guide",publisher:"Apple",url:"https://support.apple.com/guide/security/welcome/web"},{title:"macOS Security Compliance Project",publisher:"NIST / Apple / DoD",url:"https://github.com/usnistgov/macos_security"},{title:"Windows security baselines and the Security Compliance Toolkit",publisher:"Microsoft Learn",url:"https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines"},{title:"Attack surface reduction rules reference",publisher:"Microsoft Learn",url:"https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"},{title:"Windows LAPS overview",publisher:"Microsoft Learn",url:"https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview"},{title:"Lynis — security auditing tool for Linux and Unix",publisher:"CISOfy",url:"https://cisofy.com/lynis/"},{title:"OpenSCAP — SCAP-based compliance scanning",publisher:"OpenSCAP project",url:"https://www.open-scap.org/"},{title:"NIST Cybersecurity Framework",publisher:"NIST",url:"https://www.nist.gov/cyberframework"}]},{slug:"using-ai-to-strengthen-security-posture",title:"Using AI to Strengthen Your Security Posture",date:"2026-08-30",updated:"2026-08-30",readingTime:14,tags:["AI","Security Operations","Strategy"],motif:"shards",pinned:!0,pinOrder:3,cover:"/images/blog/ai-security-posture",coverAlt:"Racks of networking and compute hardware in a data centre aisle.",excerpt:"Where AI genuinely reduces risk at small, mid-market and enterprise scale — with worked monthly costs at published rates, and the governance that keeps it from becoming its own incident.",body:[{t:"p",c:"Most security teams are already using AI, whether or not anyone approved it. The useful question is no longer whether to adopt it but where it genuinely reduces risk, what it costs to run at your size, and which tasks you should categorically keep it away from."},{t:"p",c:"This is a practical map: what to do at small, mid-market, and enterprise scale; what open-weight models get you for nothing versus what paid frontier models get you per token; and worked monthly costs at real published prices rather than hand-waving."},{t:"note",c:"<b>The framing that keeps this honest:</b> AI is very good at reading a lot of text and producing a first draft. It is not a control. It does not patch anything, enforce anything, or accept accountability for anything. Every use case below is a way to get a human to a good decision faster — not a way to remove the human."},{t:"h2",c:"Where AI actually helps, and where it does not"},{t:"table",head:["Genuinely good at","Genuinely bad at"],rows:[["Summarising long, messy text — alert context, vendor advisories, log bundles, policy documents","Being the sole basis for a security decision that has consequences"],["Translating between formats — a Sigma rule into KQL, a finding into an executive paragraph","Arithmetic on your actual risk, or anything requiring precise recall of your environment"],["First drafts — policies, procedures, questionnaire responses, incident timelines","Signing off compliance. An auditor wants evidence and a named human, not model output"],["Explaining unfamiliar things — a CVE, a stack trace, a piece of obfuscated script","Autonomous remediation. Anything that changes production needs an approval gate"],["Triage and prioritisation at volume, where being 90% right fast beats 100% right slowly","Handling data it should never have seen. The model will not tell you that you overshared"]]},{t:"h2",c:"Use cases by organisation size"},{t:"p",c:"Size changes what is worth building, not what is possible. A five-person company should never build an agentic pipeline; a five-thousand-person company should not be pasting alerts into a chat window by hand."},{t:"h3",c:"Small — roughly 1 to 50 people, no dedicated security staff"},{t:"p",c:"You have no SOC and probably no security engineer. AI substitutes for expertise you cannot afford to hire, on tasks where a good draft is genuinely most of the value."},{t:"ul",c:["<b>Phishing triage.</b> Paste a suspicious message with headers and ask what is off about it. This is the single highest-value use at this size — it is the attack you actually face, and the analysis is well within reach of any current model.","<b>Policy and procedure drafting.</b> An acceptable use policy, an incident response plan, a starter risk register. A draft you edit beats the empty document you never start.","<b>Making vendor findings legible.</b> Feed in the penetration test report or the Nessus output and ask what to fix first and why. Then have a human sanity-check the ordering.","<b>Script and configuration help.</b> Backup scripts, firewall rules, hardening commands — with the hard rule that you understand anything before you run it.","<b>Security awareness content.</b> Short, specific, internal training material that reflects your actual tools rather than generic annual-training slop."]},{t:"note",c:"At this size the biggest risk is not the model — it is the tool choice. A free consumer chat product may train on what you paste. Use a business tier with a no-training commitment, or run a local model, before anything sensitive goes near it."},{t:"h3",c:"Medium — roughly 50 to 1,000 people, a small security function"},{t:"p",c:"You have one to five security people and more alerts than they can read. The win here is automation of the reading, not of the deciding."},{t:"ul",c:["<b>Alert enrichment and triage drafts.</b> Wire your SIEM to send each alert plus its context to a model and get back a plain-language summary, a suggested severity, and the three questions an analyst should ask. The analyst still decides. This is the highest-return build at this size — see the costing below.","<b>Detection rule authoring and translation.</b> Write once, translate across SIEM dialects. Models are strong at this because it is a syntax transformation, and it is trivially verifiable — you run the query.","<b>Incident timeline drafting.</b> Feed the log extracts, get a chronological narrative to correct. Saves hours during the part of an incident when everyone is exhausted.","<b>Vendor security questionnaires.</b> Answer once properly, then let the model draft subsequent responses from your approved answer bank. A human signs every one.","<b>Pull request review for security issues.</b> Not a replacement for SAST, but good at the classes of bug static analysis misses — logic flaws, authorisation gaps, unsafe defaults.","<b>Threat intelligence triage.</b> Summarise the week's advisories filtered against your actual technology stack, so people read five relevant items instead of ignoring fifty."]},{t:"h3",c:"Large — 1,000+ people, a real security organisation"},{t:"p",c:"You have tiered analysts, a detection engineering function, and compliance obligations. AI here is infrastructure, and it needs the same change control, logging, and access review as anything else in production."},{t:"ul",c:["<b>Tier-1 augmentation at scale.</b> Every alert arrives pre-summarised, pre-enriched, and pre-correlated with similar historical incidents. Measure it on analyst time-to-decision and on how often the model's suggested severity survived review.","<b>Detection-as-code pipelines.</b> Model-assisted rule generation from threat intel, automatic translation across platforms, and regression testing against historical data before merge.","<b>Retrieval over your own knowledge.</b> Point a model at your runbooks, past incidents, and architecture docs so the answer reflects your environment rather than the general internet. This is where most enterprise value actually lands.","<b>Continuous compliance evidence mapping.</b> Map controls to evidence across frameworks and flag drift. The model drafts the mapping; your GRC team owns it.","<b>Purple team scenario generation.</b> Generate realistic attack scenarios from current threat intel for tabletop exercises and detection validation.","<b>Agentic workflows with tool access</b> — the highest value and the highest risk on this list. An agent that can query your SIEM, enrich indicators, and open tickets saves real time, and an agent that can also <b>act</b> is a new attack surface. Read the governance section before building one."]},{t:"h2",c:"Open weights versus paid APIs"},{t:"p",c:"These are not competing choices so much as different tools. Most mature setups end up running both: a local open-weight model for high-volume, privacy-sensitive, mechanical work, and a paid frontier model for the smaller number of genuinely hard reasoning tasks."},{t:"table",head:["","Open-weight, self-hosted","Paid API"],rows:[["<b>Marginal cost</b>","None per token. You pay for hardware and the person who maintains it.","Per token, metered, no floor and no ceiling."],["<b>Data handling</b>","Nothing leaves your network. This is the reason most regulated teams start here.","Leaves your network. Enterprise tiers offer no-training commitments and regional processing — verify contractually, do not assume."],["<b>Best at</b>","Classification, summarisation, extraction, redaction, translation, high-volume mechanical work.","Multi-step reasoning, long-context analysis, code, tool use, anything where quality per attempt matters."],["<b>Weakest at</b>","Long chains of reasoning; degrades faster on ambiguity and long context.","Nothing technical — the constraints are cost, data governance, and dependency on a third party."],["<b>Real cost driver</b>","Engineering time. Someone owns the GPUs, the serving stack, and the upgrades.","Token volume. Cost scales linearly with use, which is easy to forecast and easy to overrun."],["<b>Good first workload</b>","Redacting sensitive fields out of data before it is sent anywhere else.","Alert triage, detection translation, and anything where you would otherwise hire."]]},{t:"p",c:"The families worth knowing in the open-weight space are Meta's <b>Llama</b>, Mistral's models, Alibaba's <b>Qwen</b>, Google's <b>Gemma</b>, and <b>DeepSeek</b>. Licences differ meaningfully — several are “open weights” rather than open source, with restrictions on commercial use at scale. <b>Read the licence before you build a product on one.</b> Practical serving is usually <b>Ollama</b> or <b>LM Studio</b> for a workstation and <b>vLLM</b> for anything with real throughput requirements."},{t:"h2",c:"What it actually costs"},{t:"p",c:"Below is a worked example rather than a range, because ranges let vendors hide. The scenario: <b>10,000 alerts per month</b>, each sent to a model with roughly <b>2,000 tokens of input</b> (the alert, its context, and your triage playbook) and returning about <b>400 tokens</b> of summary and recommendation. That is 20 million input tokens and 4 million output tokens a month."},{t:"p",c:"Applying Anthropic's published Claude API rates as of August 2026:"},{t:"table",head:["Model","Input / output per million tokens","Monthly cost at this volume","Where it fits"],rows:[["<b>Claude Haiku 4.5</b>","$1 / $5","<b>~$40</b>","High-volume mechanical triage, enrichment, classification. The default for tier-1 volume."],["<b>Claude Sonnet 5</b>","$2 / $10","<b>~$80</b>","The balanced choice for most triage pipelines — noticeably better reasoning for double the cost."],["<b>Claude Opus 5</b>","$5 / $25","<b>~$200</b>","Reserve for the hard minority: incident analysis, complex code review, anything where a wrong answer is expensive."]]},{t:"p",c:"Two levers cut those figures substantially, and both are worth building in from the start rather than retrofitting:"},{t:"ul",c:["<b>Prompt caching.</b> Most of that 2,000-token input is a stable playbook that never changes between alerts. Cached input is read at roughly a tenth of the normal rate. If 1,500 of the 2,000 tokens are cacheable, the Sonnet 5 example drops from about <b>$80 to roughly $53 a month</b> — the cached 15M tokens cost about $3 instead of $30.","<b>Batch processing.</b> Work that does not need an answer within seconds — overnight enrichment, weekly intel summaries, compliance mapping — runs asynchronously at <b>50% of standard cost</b>. Splitting urgent from non-urgent traffic is often the single biggest saving available."]},{t:"note",c:"Prices change, and this table is a snapshot of Anthropic's published rates in August 2026. Other providers price differently. Before you commit a budget, check the current published pricing rather than trusting any blog post — including this one."},{t:"h3",c:"Budget bands, and what each realistically buys"},{t:"table",head:["Monthly spend","What you can realistically achieve"],rows:[["<b>$0</b>","An open-weight model on hardware you already own, via Ollama or LM Studio. Summarisation, classification, drafting, and redaction — entirely offline, nothing leaves the building. Cost is your time, and quality on hard reasoning is a real step below frontier models."],["<b>Under $100</b>","Business-tier assistant seats for the security team plus light API use, or the ~$40–$80 triage pipeline above. This is the band where most small and mid-sized organisations get the majority of the available value."],["<b>$100 – $1,000</b>","Production automation: alert triage across a real alert volume, detection authoring and translation, vulnerability report summarisation, questionnaire drafting, PR security review. A mid-market security function operates comfortably here."],["<b>$1,000 – $10,000</b>","Enterprise-scale pipelines — whole-SOC augmentation, retrieval over internal knowledge, continuous compliance mapping, agentic workflows with tool access. At this point you need cost monitoring per workload, not one shared key."],["<b>$10,000+</b>","Large enterprise. Typically a hybrid: self-hosted open-weight inference for high-volume sensitive processing, frontier API for the reasoning-heavy minority. Dedicated GPU capacity becomes cheaper than per-token billing somewhere in this band, but only if you have the engineering capacity to run it."]]},{t:"p",c:"On self-hosting economics: a workstation-class GPU with enough memory to serve a mid-sized open-weight model is a low-thousands capital purchase, and rented cloud GPU capacity is billed hourly at rates that vary widely by class and region. The break-even against per-token pricing arrives later than most people expect — and it never accounts for the engineer maintaining it. Price both, honestly, before choosing."},{t:"h2",c:"Governance, or how this goes wrong"},{t:"p",c:"Every item below has already caused real incidents at real organisations. None of them are hypothetical."},{t:"ol",c:["<b>Decide what may be pasted, and say it out loud.</b> Client data, credentials, personal information, unreleased financials, legally privileged material. Write it down and tell people, because the alternative is that everyone quietly guesses.","<b>Know where inference happens.</b> If you are Canadian and handling personal information, PIPEDA obligations follow the data across the border. Regional processing and no-training commitments are contractual questions, not marketing ones — get them in writing.","<b>Treat prompt injection as a real attack class.</b> Any model that reads untrusted content — email, tickets, documents, web pages — can be instructed by that content. If it also holds tools and permissions, that instruction becomes an action. This is OWASP's top LLM risk, and it is why the agent identity detection in our detection-rules guide exists.","<b>Keep humans on anything that changes state.</b> Read-only agents are a productivity tool. Agents that can write, delete, disable, or approve need an explicit gate, and the gate needs to be a person who understands what they are approving.","<b>Log every AI action to the same standard as a privileged user.</b> What was asked, what came back, what was done about it. When something goes wrong you will need to reconstruct the decision, and “the model said so” is not a reconstruction.","<b>Give agents their own identity and least privilege.</b> Not a shared service account, not a human's token. Scope it, review it quarterly, and alert on it operating outside its baseline.","<b>Verify anything that matters.</b> Models produce confident, well-formatted, wrong answers. Every generated detection rule gets run. Every generated command gets read. Every compliance mapping gets reviewed by someone accountable."]},{t:"h2",c:"A sensible first 30 days"},{t:"ol",c:["<b>Week 1 — write the data policy.</b> One page: what can and cannot go into an AI tool, which tools are approved, who to ask. Nothing else on this list is safe without it.","<b>Week 2 — pick one painful, low-risk task.</b> Phishing triage for a small team, alert summarisation for a larger one. One task, one measurable before-and-after.","<b>Week 3 — measure it honestly.</b> Time saved, and how often the output needed correcting. If the correction rate is high, the task is wrong for AI, not the model.","<b>Week 4 — decide and document.</b> Keep it, kill it, or expand it. Write down the cost and the governance decisions so the next use case does not restart the argument."]},{t:"note",c:"The organisations getting real value from AI in security are not the ones with the most sophisticated deployments. They are the ones that picked one genuinely painful task, measured it properly, and refused to let it touch production without a human in the path."}],sources:[{title:"OWASP Top 10 for Large Language Model Applications",publisher:"OWASP GenAI Security Project",url:"https://genai.owasp.org/llm-top-10/"},{title:"AI Risk Management Framework (AI RMF 1.0)",publisher:"NIST",url:"https://www.nist.gov/itl/ai-risk-management-framework"},{title:"Claude API pricing",publisher:"Anthropic",url:"https://www.anthropic.com/pricing"},{title:"Prompt caching documentation",publisher:"Anthropic",url:"https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"},{title:"Message Batches API",publisher:"Anthropic",url:"https://docs.anthropic.com/en/docs/build-with-claude/batch-processing"},{title:"PIPEDA in brief",publisher:"Office of the Privacy Commissioner of Canada",url:"https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda_brief/"},{title:"Guidance on generative AI and privacy",publisher:"Office of the Privacy Commissioner of Canada",url:"https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/"},{title:"Ollama — run open-weight models locally",publisher:"Ollama",url:"https://ollama.com/"},{title:"vLLM — high-throughput inference serving",publisher:"vLLM project",url:"https://docs.vllm.ai/"}]}],r=[{slug:"pci-dss-4-0-1-grace-period-over",title:"PCI DSS 4.0.1: The Grace Period Is Over",date:"2025-03-18",updated:"2026-08-30",readingTime:5,tags:["PCI DSS","Compliance","FinTech"],motif:"grid",cover:"/images/blog/pci-dss-payment-page",coverAlt:"Blank chip card held beside a laptop during an online payment.",excerpt:"On March 31 the 51 future-dated requirements stop being best practice and start being mandatory. Two of them will catch most teams off guard.",body:[{t:"p",c:'On March 31, 2025, the future-dated requirements introduced in PCI DSS v4.x stop being "best practice" and become mandatory. There is no extended grace period and no phased enforcement. If your next assessment falls after that date, your QSA will test against all of them.'},{t:"p",c:"Most organisations we speak to have handled the obvious ones. Two consistently get missed, and both concern the payment page itself."},{t:"h2",c:"Requirement 6.4.3: you now own every script on your payment page"},{t:"p",c:"You must maintain an inventory of every script executed in the browser on a payment page, record a written business justification for each one, and verify its integrity. In practice that means knowing exactly what your analytics tag, chat widget, and A/B testing tool are loading — including the third-party scripts they load in turn."},{t:"p",c:"This is the control that would have caught Magecart-style skimming. It is also the one most likely to reveal that nobody on your team can currently enumerate what runs on checkout."},{t:"h2",c:"Requirement 11.6.1: detect the change, not just the script"},{t:"p",c:"11.6.1 requires a tamper-detection mechanism that alerts on unauthorised modification to the HTTP headers and script content of payment pages, evaluated at least every seven days. An inventory is a point-in-time artifact. This requirement asks whether you would notice a change between assessments."},{t:"h2",c:"The others worth checking now"},{t:"ul",c:["Targeted risk analyses (12.3.1) for every requirement that permits a flexible frequency — each needs documented justification, not a default.","Authenticated internal vulnerability scanning (11.3.1.2), which surfaces materially more than unauthenticated scanning.","Expanded penetration testing obligations under 11.4, including segmentation testing where a CDE boundary exists.","Multi-factor authentication for all access into the CDE (8.4.2), not just administrative access."]},{t:"h2",c:"What to do this month"},{t:"ol",c:["Pull a live inventory of scripts on your checkout flow. Compare it to what you expected. The gap is your finding.","Run a gap assessment against 4.0.1 as written rather than against your last 3.2.1 ROC.","Book segmentation testing if you rely on network segmentation to reduce CDE scope. It is explicitly in scope under 11.4.5.","Write the targeted risk analyses now. They are documentation, not engineering, and they are the cheapest findings to close."]},{t:"note",c:"If your assessment window opens in the next two quarters and you have not tested segmentation against 4.0.1, that is the first thing to schedule."}]},{slug:"help-desk-is-your-weakest-authentication-factor",title:"Your Help Desk Is Your Weakest Authentication Factor",date:"2025-05-14",updated:"2026-08-30",readingTime:6,tags:["Identity","Social Engineering","Incident Response"],motif:"nodes",cover:"/images/blog/help-desk-identity-verification",coverAlt:"Support professional wearing a headset while working at a laptop.",excerpt:"Marks & Spencer and Co-op did not lose control of their environments to a zero-day. They lost it to a phone call.",body:[{t:"p",c:"Two of the UK's largest retailers disclosed serious intrusions in recent weeks. Neither began with an unpatched appliance or a novel exploit. Both began with someone calling an IT help desk and successfully persuading an agent to reset credentials or enrol a new MFA device."},{t:"p",c:"This is the defining access pattern of the current threat landscape, and it is the one your security stack is least equipped to stop. The activity that follows a successful help-desk reset is, by definition, authenticated."},{t:"h2",c:"Why this works so reliably"},{t:"p",c:"The attacker is not defeating MFA. They are using your account-recovery process exactly as designed. Recovery exists to help legitimate users who have lost a device, and it is typically staffed by people measured on resolution time and customer satisfaction — metrics that reward being helpful and penalise friction."},{t:"p",c:"CrowdStrike observed voice-based help-desk phishing in nearly every SCATTERED SPIDER incident it responded to, targeting Microsoft Entra ID, SSO, and VDI accounts. The group has moved through retail, insurance, and aviation in sequence, reusing the same playbook against each sector."},{t:"h2",c:"The controls that actually hold"},{t:"ul",c:["Require video verification against a pre-enrolled photo for any privileged account recovery. Voice alone is no longer a credential.","Enforce a mandatory callback to the number of record — never a number supplied during the call.","Impose a hold period on MFA re-enrolment for privileged accounts, with notification to the user and their manager.","Remove reset authority for administrative and executive accounts from the general help-desk queue entirely.","Alert on the sequence, not the event: MFA reset followed by sign-in from a new device, a new ASN, and immediate access to file shares or the identity provider itself."]},{t:"h2",c:"Test it the way an attacker would"},{t:"p",c:"The only reliable way to know whether your recovery process holds is to call it. A scoped social-engineering assessment against your own help desk — with written authorisation and agreed stop conditions — produces a clearer answer in an afternoon than a policy review produces in a month."},{t:"note",c:'If your incident response plan does not have a documented path for "an attacker holds a valid session for a privileged account," that is the gap to close first.'}]},{slug:"soc-2-type-ii-observation-window",title:"The SOC 2 Type II Observation Window Is Where Deals Go to Die",date:"2025-07-09",updated:"2026-08-30",readingTime:5,tags:["SOC 2","Compliance","SaaS"],motif:"bars",cover:"/images/blog/soc2-evidence-window",coverAlt:"Professionals reviewing documents and laptops together in an office.",excerpt:"Type I says you designed the controls. Type II says they ran, for months, with evidence. The distance between the two is usually two quarters of stalled revenue.",body:[{t:"p",c:"A Type I report attests that your controls were suitably designed on a single date. A Type II attests that they operated effectively across a period — typically three to twelve months — and that you can prove it. Enterprise procurement now asks for Type II by default."},{t:"p",c:"The gap between the two is not a documentation exercise. It is elapsed time you cannot compress, and it is where fintech and SaaS deals stall."},{t:"h2",c:"What actually goes wrong"},{t:"p",c:"Teams buy a compliance automation platform, connect their integrations, watch the dashboard turn green, and assume they are ready. The platform is measuring whether a control exists, not whether it operated. When the auditor asks for evidence that access reviews ran every quarter for the last nine months, the dashboard cannot produce nine months of history it never collected."},{t:"p",c:"The second failure is scoping. Teams accept a default list of Trust Services Criteria rather than selecting the ones their architecture and customer commitments actually require. Availability and Confidentiality carry real operational obligations. Taking them on without needing to is self-inflicted work."},{t:"h2",c:"Sequencing that works"},{t:"ol",c:["Scope the criteria against your architecture and your largest customer contract. Security is mandatory; the rest are a decision.","Implement controls and — critically — the evidence routine at the same time. A control with no collection mechanism will fail the observation window.","Run a readiness assessment before the window opens, not during it. Findings discovered in month two of a nine-month window cost you the window.","Open the observation window only once evidence is accruing automatically."]},{t:"h2",c:"The shortcut that is not a shortcut"},{t:"p",c:"Some teams open the window immediately to start the clock, intending to fix controls as they go. This produces a report with exceptions. An exception in a Type II is worse than a later clean report: it is a documented finding your prospect's security team will read, and it invites questions your sales engineer cannot answer."},{t:"note",c:"If a prospect has asked for Type II and you have not started, the honest answer is a date, not a dashboard. Most buyers will accept a credible timeline with a Type I in hand."}]},{slug:"salesloft-drift-oauth-supply-chain",title:"The Salesloft Drift Breach: Your Vendor's OAuth Token Is Your Attack Surface",date:"2025-09-11",updated:"2026-08-30",readingTime:6,tags:["Supply Chain","SaaS","Vendor Risk"],motif:"chain",cover:"/images/blog/oauth-supply-chain",coverAlt:"Fibre patch cables connecting multiple ports in a network rack.",excerpt:"More than 700 organisations lost Salesforce data without any of them being breached. The compromise was one integration upstream.",body:[{t:"p",c:"Between August 9 and 17, the threat cluster tracked as UNC6395 used OAuth tokens stolen from Salesloft's Drift chat integration to access Salesforce environments belonging to more than 700 organisations. Salesloft and Salesforce revoked all Drift tokens on August 20. Salesforce subsequently removed the application from AppExchange pending investigation."},{t:"p",c:"Named victims include Cloudflare, Google, Palo Alto Networks, Proofpoint, Tanium, and Zscaler — organisations with mature security programs. None of them were breached in the conventional sense. A vendor they had authorised was."},{t:"h2",c:"What the attacker actually took"},{t:"p",c:"The primary target was the text content of Salesforce Case objects. Support cases are where customers and engineers paste API keys, connection strings, VPN credentials, and configuration excerpts while troubleshooting. The stolen records were then mined for AWS keys, Snowflake tokens, and other secrets that enable follow-on compromise."},{t:"p",c:"This is worth sitting with. Your CRM is not usually modelled as a secrets store. In practice, it is one."},{t:"h2",c:"Why detection failed"},{t:"p",c:"The activity ran through Salesforce's own APIs using automated SOQL queries and bulk exports. To monitoring, it looked like an authorised integration doing what integrations do. There was no anomalous login, no impossible travel, no failed authentication — the token was valid and the access was granted."},{t:"h2",c:"What to change"},{t:"ul",c:["Inventory every OAuth grant in your major SaaS tenants. Most organisations find applications nobody currently owns.","Scope grants to the minimum object set. A chat integration rarely needs read access to every Case record.","Alert on bulk export volume per integration, not just per user. Volume was the only reliable signal here.","Treat support-ticket text as sensitive. Scan for secrets in Case bodies and redact on ingestion.","Rotate any credential that has ever been pasted into a support ticket. Assume disclosure."]},{t:"note",c:"Vendor questionnaires would not have caught this. Continuous visibility into what your integrations can reach — and what they actually did — would have."}]},{slug:"bill-c-8-canadian-critical-infrastructure",title:"Bill C-8 Is Law: What Canadian Operators Need to Do Next",date:"2025-11-06",updated:"2026-08-30",readingTime:5,tags:["Canada","Regulation","Critical Infrastructure"],motif:"maple",cover:"/images/blog/canadian-critical-infrastructure",coverAlt:"Electrical distribution substation representing critical infrastructure.",excerpt:"Bill C-8 received Royal Assent on 15 June 2026. Part 2 is not yet in force, making this the preparation window for likely designated operators.",body:[{t:"p",c:"Bill C-8 received Royal Assent on 15 June 2026 and became Statutes of Canada 2026, chapter 9. Part 2 enacts the Critical Cyber Systems Protection Act, but the Justice Laws website currently marks that part as not in force. Its effective day or days will be fixed by order of the Governor in Council."},{t:"p",c:"For federally regulated operators, the practical question is no longer whether the bill passes. It is when Part 2, the operator designations, and the supporting regulations take effect — and whether the organisation is ready for the 90-day program window that follows designation."},{t:"h2",c:"Who it covers"},{t:"p",c:"The CCSPA applies to designated operators across four federally regulated sectors: telecommunications, finance (federally regulated banks), energy (interprovincial pipelines and nuclear), and certain federally regulated transportation. If you are provincially regulated, you are outside the direct scope — but your federally regulated customers will push these requirements down through contracts."},{t:"h2",c:"The four obligations that matter"},{t:"ul",c:["Establish and maintain a documented cyber security program, reviewed on a defined cycle.","Identify and mitigate supply chain and third-party risks to critical cyber systems.","Report cyber security incidents to the Canadian Centre for Cyber Security, with sector regulator notification alongside.","Comply with cyber security directions, including where the content of a direction is confidential."]},{t:"h2",c:"The part organisations underestimate"},{t:"p",c:"Incident reporting is a two-step process on a statutory clock. Meeting it requires knowing, quickly, whether an event qualifies — which requires detection coverage and a triage process that produces a defensible answer under time pressure. Organisations that cannot currently say how long it takes to determine incident scope will not meet the obligation by writing a policy."},{t:"h2",c:"Sensible preparation now"},{t:"ol",c:['Map which of your systems would meet the "critical cyber system" definition. Scope drives everything else.',"Time your current detection-to-triage path. If you cannot classify an incident within hours, that is the gap.","Build the supply chain register now — it is the longest lead-time item and it has standalone value.","Run a tabletop with the reporting clock as an explicit constraint, including who signs off on the determination."]},{t:"note",c:"Status checked 30 August 2026: Bill C-8 has Royal Assent, while Part 2 is not yet in force. Confirm current orders, designations, and regulations before making implementation commitments."}]},{slug:"ransomware-2025-new-baseline",title:"Ransomware in 2025: The Floor Moved, Not the Ceiling",date:"2026-01-15",updated:"2026-08-30",readingTime:5,tags:["Ransomware","Threat Intelligence"],motif:"wave",cover:"/images/blog/ransomware-response-baseline",coverAlt:"Focused technology team reviewing a shared workstation.",excerpt:"Quarterly attack volume set records through late 2025. The more useful signal is that the low end never came back down.",body:[{t:"p",c:"Ransomware activity accelerated through the final quarter of 2025 and reached record quarterly highs. Attack counts fluctuate — the number that matters is the floor. Quarterly volume now sits at a baseline of roughly 2,500 incidents where a quieter quarter used to mean a meaningful drop."},{t:"p",c:"Roughly 91 distinct groups were active across the year. That fragmentation is the story: affiliate ecosystems reshuffle constantly, and takedowns of individual brands no longer reduce aggregate volume for long."},{t:"h2",c:"Three structural shifts"},{t:"p",c:"<b>Access is brokered.</b> Intrusion and extortion are increasingly performed by different actors. The group that encrypts your files may have purchased access from someone who obtained it months earlier. Your dwell time is longer than your incident timeline suggests."},{t:"p",c:"<b>The browser replaced the exploit.</b> Initial access has shifted toward user-mediated compromise through trusted applications — malicious search results, fake software updates, and browser-delivered payloads — rather than perimeter exploitation."},{t:"p",c:"<b>Coercion outweighs encryption.</b> Pressure is applied through regulatory exposure, litigation risk, and direct contact with executives and customers. Several groups no longer bother encrypting at all. Reliable backups remain necessary, and they are no longer sufficient."},{t:"h2",c:"What this changes about readiness"},{t:"ul",c:["Test restore, not backup. A backup you have never restored under time pressure is an assumption.","Rehearse the extortion-only scenario: data is gone, systems are fine, and the clock is legal rather than operational.","Decide the ransom position before you need it, in writing, with counsel and your board.","Instrument for the brokered-access model: hunt for persistence that predates the incident you are responding to.","Pre-draft breach notification templates. Under a 72-hour regulatory clock, drafting from scratch is not viable."]},{t:"note",c:"Figures here are drawn from published quarterly ransomware tracking and vendor incident reports. Counts vary by methodology — treat direction as reliable and precise totals as approximate."}]},{slug:"ai-agents-prompt-injection-mcp",title:"AI Agents Have a Confused Deputy Problem",date:"2026-03-05",updated:"2026-08-30",readingTime:7,tags:["AI Security","Architecture","Emerging Threats"],motif:"circuit",cover:"/images/blog/ai-agent-permission-path",coverAlt:"Engineers testing a robotic arm in a technology lab.",excerpt:"Prompt injection stopped being a chatbot curiosity the moment agents were given tools that take real actions.",body:[{t:"p",c:"A language model cannot reliably distinguish instructions from data. That was a manageable limitation when the worst outcome was an inappropriate answer. It is a security architecture problem now that agents hold credentials and execute actions."},{t:"p",c:"OWASP ranks prompt injection as the leading security risk to AI systems, and it remains the dominant cause of agentic failures observed in production. Documented findings span Slack AI, Microsoft 365 Copilot, GitHub integrations, and AI coding assistants."},{t:"h2",c:"Indirect injection is the real risk"},{t:"p",c:"Direct injection — a user typing an adversarial prompt — is the version everyone tests for. Indirect injection is the one that lands: instructions hidden in a document the agent summarises, a web page it retrieves, a ticket it triages, or an email it processes. The malicious input arrives through a data channel nobody is monitoring, from a source the user never chose."},{t:"p",c:"The severity is set by capability. An agent that can only read is a disclosure risk. An agent that can send email, open pull requests, or move funds is a confused deputy holding your credentials."},{t:"h2",c:"MCP and the all-or-nothing grant"},{t:"p",c:"The Model Context Protocol standardised how agents connect to tools, and adoption outpaced the security model. Connecting to a server has typically meant receiving its full capability set rather than a scoped subset — structurally similar to OAuth before scoped permissions, with the same privilege-escalation consequences."},{t:"p",c:"One analysis of 2,614 MCP implementations found 82% using file operations susceptible to path traversal and 34% exposing APIs vulnerable to command injection. Most of that surface is inherited, not written by the teams deploying it."},{t:"h2",c:"Controls that hold"},{t:"ul",c:["Scope agent credentials to the minimum capability set, and issue them per-task rather than per-agent.","Require human approval for irreversible actions — outbound communication, financial movement, production writes, permission changes.","Treat all retrieved content as untrusted input. Isolate it from the instruction context wherever the framework allows.","Log every tool invocation with its triggering input. Without this, incident reconstruction is guesswork.","Inventory MCP servers as third-party dependencies, because that is what they are."]},{t:"note",c:"Survey data suggests a wide gap between the share of organisations reporting AI agent incidents and the share of executives who believe existing policy already covers agent behaviour. Assume you are in the gap until you have tested otherwise."}]},{slug:"telus-breach-extortion-without-encryption",title:"The TELUS Digital Breach and the Rise of Extortion Without Encryption",date:"2026-04-23",updated:"2026-08-30",readingTime:5,tags:["Canada","Data Breach","Incident Response"],motif:"shards",cover:"/images/blog/telecom-data-extortion",coverAlt:"Rows of server cabinets in a modern data centre.",excerpt:"No ransomware. No outage. A claimed 700 terabytes and a deadline. This is what a major Canadian incident looks like now.",body:[{t:"p",c:"In March, TELUS Digital disclosed unauthorised access to a limited number of its systems. The ShinyHunters group claimed to have taken at least 700 terabytes of data, including personally identifiable information, call detail records, background check material, and source code. TELUS Digital did not confirm the claimed volume or contents while its investigation remained ongoing."},{t:"p",c:"Note what is absent: no encryption event, no service disruption, no recovery timeline. The leverage is disclosure, and the pressure is regulatory and reputational rather than operational."},{t:"h2",c:"Why this model is spreading"},{t:"p",c:"Encryption is loud, technically demanding, and increasingly survivable for organisations with tested backups. Exfiltration is quieter, harder to detect, and produces leverage that restoring from backup cannot remove. Once data has left, it has left."},{t:"p",c:'The same group has been linked to a series of large-scale data extortion campaigns across sectors during this period, following a consistent pattern: obtain access, stage and exfiltrate at volume, then run a timed "pay or leak" campaign with public pressure.'},{t:"h2",c:"What Canadian organisations should take from it"},{t:"ul",c:['Egress volume is your primary detection signal. If you cannot answer "how much data left our environment last week," that is the gap.',"Source code is customer data's neighbour. Repository access controls belong in the same tier as database access.","Third-party and background-check data carries obligations you may not have inventoried.","PIPEDA breach-of-security-safeguards reporting has its own trigger and record-keeping requirements. Know them before the clock starts.","Rehearse the scenario where systems are healthy and the incident is entirely about disclosure. Most IR plans assume an outage."]},{t:"note",c:"Claimed data volumes in extortion campaigns are frequently inflated and should be treated as unverified until confirmed. The tactical pattern is the durable lesson, not the number."}]},{slug:"infostealers-session-hijacking-mfa-bypass",title:"Infostealers Are How Attackers Skip Your MFA",date:"2026-06-18",updated:"2026-08-30",readingTime:6,tags:["Identity","Threat Intelligence","Detection"],motif:"keys",cover:"/images/blog/session-token-hijack",coverAlt:"USB security token beside a laptop.",excerpt:"A stolen session cookie is a valid, already-authenticated session. Your second factor was satisfied hours ago.",body:[{t:"p",c:"A large repository of infostealer logs was published this month, containing millions of browser cookies and stored credentials. The credentials matter less than the cookies — because a live session token does not need a password or a second factor."},{t:"p",c:"Session hijacking sidesteps the control most organisations regard as settled. The authentication event already happened, on the victim's machine, and it succeeded. The attacker simply imports the resulting artifact."},{t:"h2",c:"How the material is obtained"},{t:"p",c:"Infostealers arrive through malicious search advertising, trojanised software downloads, cracked applications, and fake browser update prompts. They run once, harvest browser-stored credentials, cookies, and cryptocurrency wallets, and exit. There is often no persistence — which means no ongoing behaviour for EDR to detect after the fact."},{t:"p",c:"Unmanaged devices are the dominant exposure. Contractor laptops, personal machines used for a single urgent login, and BYOD endpoints outside your EDR coverage all produce the same artifact as a managed device would."},{t:"h2",c:"Detection and control"},{t:"ul",c:["Bind sessions to device posture where your IdP supports it. Token protection and continuous access evaluation are the controls that actually close this.","Shorten session lifetimes for privileged roles. A 30-day refresh token is a 30-day standing invitation.","Alert on the same session token appearing from a new ASN, device fingerprint, or geography.","Monitor stealer-log marketplaces for your domains. Corporate credentials appear there before they are used.","Force reauthentication for sensitive actions rather than trusting the session that reached them."]},{t:"h2",c:"The response step teams miss"},{t:"p",c:"After confirmed credential exposure, resetting the password is not sufficient. Existing sessions survive a password change in most configurations. You must explicitly revoke refresh tokens and active sessions — and verify that revocation propagated to every federated application."},{t:"note",c:'If your credential-exposure runbook ends at "reset password," the attacker keeps their access.'}]},{slug:"firewall-became-the-front-door",title:"The Firewall Became the Front Door",date:"2026-08-12",updated:"2026-08-30",readingTime:6,tags:["Vulnerability Management","Ransomware","Network Security"],motif:"perimeter",cover:"/images/blog/edge-appliance-review",coverAlt:"Technician inspecting network equipment and cabling in a server rack.",excerpt:"Edge security appliances are now the leading initial-access vector for ransomware. The device you bought to keep attackers out is how they get in.",body:[{t:"p",c:"A sustained wave of exploitation against edge VPN and firewall appliances — spanning Palo Alto Networks, Fortinet, Citrix, and Check Point products — has become a dominant initial-access route for ransomware operators through 2026."},{t:"p",c:"The trend is not new but the scale is. Verizon's 2025 DBIR reported a near-eightfold increase in zero-day exploitation of edge devices year over year, and edge appliances accounted for more CISA KEV additions than any other technology category in 2025."},{t:"h2",c:"Why these devices are such good targets"},{t:"ul",c:["They are internet-facing by definition and cannot be hidden behind another control.","They terminate VPN sessions, so compromise yields network position rather than a single host.","Most run appliance operating systems that do not accept an EDR agent, leaving a visibility gap by design.","They are patched on change-control cycles measured in weeks, against exploitation measured in hours."]},{t:"p",c:"That last point is the crux. One recent NetScaler memory-disclosure flaw was reported exploited in the wild within roughly a day of public disclosure. A monthly patch window is not a defence against that timeline."},{t:"h2",c:"What to change"},{t:"ol",c:["Establish an emergency patch path for internet-facing appliances with a target measured in hours, pre-authorised so it does not require a CAB meeting.","Subscribe to CISA KEV and treat an edge-device addition as an incident trigger, not a ticket.","Ship appliance logs to your SIEM and build detections for configuration change, new admin accounts, and anomalous VPN session sources.","Rotate credentials and certificates after any appliance compromise. Attackers harvest them specifically.","Assume post-exploitation persistence survives patching. Patch, then hunt — implants have repeatedly outlived the fix."]},{t:"note",c:'If your last penetration test scoped out the VPN appliance because it was "vendor-managed," that exclusion is now your largest untested exposure.'}]}],a=[...r,...s],i=()=>[...a].sort((e,t)=>new Date(t.date)-new Date(e.date)),c=()=>[...a].filter(e=>e.pinned).sort((e,t)=>(e.pinOrder??99)-(t.pinOrder??99)||new Date(t.date)-new Date(e.date)),l=()=>i().filter(e=>!e.pinned),d=e=>new Date(`${e}T12:00:00Z`).toLocaleDateString("en-CA",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}),u=e=>a.find(t=>t.slug===e)||null,h=e=>{const t=i(),n=t.findIndex(o=>o.slug===e);return{newer:n>0?t[n-1]:null,older:n>=0&&n<t.length-1?t[n+1]:null}};export{d as formatDate,h as getNeighbours,u as getPost,c as pinnedPosts,a as posts,i as sortedPosts,l as unpinnedPosts};
