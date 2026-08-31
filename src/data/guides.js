/**
 * Long-form reference guides.
 *
 * Kept separate from posts.js because these are standing references rather
 * than news-pegged analysis: they are pinned to the top of the blog index,
 * they carry code and detection blocks the shorter posts do not, and they are
 * revised in place rather than superseded.
 *
 * Generated content note: the detection queries, YARA rules, and hardening
 * commands are written against the schemas and syntax current at the `updated`
 * date. SIEM schemas drift — re-validate the field names against your own
 * platform before deploying any rule, and read every command before running it.
 */

export const guides = [
  {
    "slug": "top-10-detection-rules-2026",
    "title": "Top 10 Detection Rules for Emerging Threats in 2026",
    "date": "2026-08-30",
    "updated": "2026-08-30",
    "readingTime": 18,
    "tags": [
      "Detection Engineering",
      "Threat Hunting",
      "SIEM"
    ],
    "motif": "grid",
    "pinned": true,
    "pinOrder": 1,
    "cover": "/images/blog/detection-rules-2026",
    "coverAlt": "Analyst workstation showing multiple monitoring dashboards in a darkened room.",
    "excerpt": "Ten detections that map to the techniques actually carrying intrusions right now — each one written out in KQL, SPL and ES|QL, with YARA where a file artefact exists.",
    "body": [
      {
        "t": "p",
        "c": "Every December a list of next year’s threats appears, and every January the same intrusions keep working. This is not that list. These ten detections cover the techniques that actually carried incidents through 2025 and into 2026 — token theft, infostealers, OAuth abuse, edge appliances, and the first genuinely new category, over-permissioned AI agents."
      },
      {
        "t": "p",
        "c": "Each rule ships in <b>KQL</b> (Microsoft Sentinel and Defender XDR), <b>SPL</b> (Splunk), and <b>ES|QL or EQL</b> (Elastic). Every rule also carries its false-positive profile, because a detection shipped without one gets tuned to death in week two."
      },
      {
        "t": "note",
        "c": "<b>On YARA:</b> YARA matches patterns in files and memory. It is not a log query language, so there is no meaningful YARA equivalent of “two sign-ins from different ASNs.” Writing one anyway would be theatre. The four YARA rules in this post sit in their own section below and cover the detections where a file artefact genuinely exists."
      },
      {
        "t": "h2",
        "c": "Before you paste anything"
      },
      {
        "t": "p",
        "c": "These are written as hunting queries, not as tuned production alerts. Three things to do first:"
      },
      {
        "t": "ol",
        "c": [
          "<b>Confirm the log source exists.</b> Half of all “the rule does not fire” tickets are a missing data connector, not a broken query. Run the FROM/table clause alone first and confirm rows come back.",
          "<b>Fix the field names to your schema.</b> Splunk field names in particular depend on which add-on parsed the data. The SPL below assumes Common Information Model (CIM) data models where possible and notes the sourcetype where not.",
          "<b>Run it over 30 days of history before alerting on it.</b> That is your false-positive baseline. If a rule returns 400 hits a day in your environment, it is a hunting query, not an alert."
        ]
      },
      {
        "t": "h2",
        "c": "The ten"
      },
      {
        "t": "detect",
        "c": {
          "id": "D01",
          "name": "Session token replay after AiTM phishing",
          "technique": "T1550.004",
          "tags": [
            "Identity",
            "Entra ID"
          ],
          "logic": "An adversary-in-the-middle proxy (Evilginx, Tycoon, EvilProxy) captures the session cookie after the user completes MFA, so the replayed session looks fully authenticated. The signal is not a failed login — it is one user holding valid sessions from two different autonomous systems inside the same hour, and Entra ID Protection’s own anomalousToken risk detection.",
          "fp": "Corporate VPN split-tunnelling, mobile hand-off between carrier and Wi-Fi, and users on a cloud VDI whose egress differs from their laptop. Baseline your VPN and VDI egress ASNs and exclude them explicitly rather than raising the threshold.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "// Signal 1 — one identity, one hour, two autonomous systems and two countries.\nSigninLogs\n| where TimeGenerated > ago(7d)\n| where ResultType == 0                       // successful sign-in only\n| where AuthenticationRequirement == \"multiFactorAuthentication\"\n| summarize\n    ASNs      = make_set(AutonomousSystemNumber, 10),\n    Countries = make_set(tostring(LocationDetails.countryOrRegion), 10),\n    IPs       = make_set(IPAddress, 10),\n    Apps      = make_set(AppDisplayName, 10)\n    by UserPrincipalName, bin(TimeGenerated, 1h)\n| where array_length(ASNs) > 1 and array_length(Countries) > 1\n| order by UserPrincipalName asc\n\n// Signal 2 — Entra ID Protection already flagged the token itself.\nSigninLogs\n| where TimeGenerated > ago(7d)\n| where ResultType == 0\n| mv-expand RiskType = todynamic(RiskEventTypes_V2) to typeof(string)\n| where RiskType in (\"anomalousToken\", \"tokenIssuerAnomaly\", \"unfamiliarFeatures\")\n| project TimeGenerated, UserPrincipalName, IPAddress, RiskType,\n          AppDisplayName, UserAgent, AutonomousSystemNumber"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "` comment(\"Sourcetype from the Splunk Add-on for Microsoft Cloud Services.\") `\nindex=azure sourcetype=\"azure:aad:signin\" \"properties.status.errorCode\"=0\n| rename properties.* as *\n| eval user=lower(userPrincipalName)\n| bin _time span=1h\n| stats dc(autonomousSystemNumber) as asn_count\n        dc(location.countryOrRegion)  as country_count\n        values(ipAddress)             as src_ips\n        values(appDisplayName)        as apps\n        by user, _time\n| where asn_count > 1 AND country_count > 1\n| sort - _time"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "// ES|QL — same identity, same hour, more than one ASN and country.\nFROM logs-azure.signinlogs-*\n| WHERE event.outcome == \"success\"\n| EVAL hour = DATE_TRUNC(1 hour, @timestamp)\n| STATS asn_count     = COUNT_DISTINCT(source.as.number),\n        country_count = COUNT_DISTINCT(source.geo.country_iso_code),\n        ips           = VALUES(source.ip)\n      BY user.name, hour\n| WHERE asn_count > 1 AND country_count > 1\n| SORT hour DESC"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D02",
          "name": "Infostealer reading the browser credential store",
          "technique": "T1555.003",
          "tags": [
            "Endpoint",
            "Credential Access"
          ],
          "logic": "Infostealers (Lumma, StealC, Rhadamanthys and successors) do not crack passwords — they copy Chrome and Edge profile files and lift session cookies wholesale. The detection is a process that is not a browser touching Login Data, Cookies, Web Data, or Local State inside a browser profile directory.",
          "fp": "Backup agents, EDR scanners, profile-sync and migration tooling, and browser-password-import utilities all read these paths legitimately. Allow-list by full signed publisher, not by file name — file name alone is trivially spoofed.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "DeviceFileEvents\n| where TimeGenerated > ago(7d)\n| where FileName in~ (\"Login Data\", \"Cookies\", \"Web Data\", \"Local State\", \"key4.db\", \"logins.json\")\n| where FolderPath has_any (@\"\\Google\\Chrome\\User Data\",\n                           @\"\\Microsoft\\Edge\\User Data\",\n                           @\"\\Mozilla\\Firefox\\Profiles\",\n                           @\"\\BraveSoftware\\\")\n| where InitiatingProcessFileName !in~ (\"chrome.exe\",\"msedge.exe\",\"firefox.exe\",\"brave.exe\",\n                                        \"explorer.exe\",\"MsMpEng.exe\",\"backup-agent.exe\")\n| project Timestamp, DeviceName, AccountName, FolderPath, FileName,\n          InitiatingProcessFileName, InitiatingProcessCommandLine,\n          InitiatingProcessAccountName, InitiatingProcessSHA256\n| order by Timestamp desc"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "| tstats summariesonly=true count\n    min(_time) as firstTime max(_time) as lastTime\n    FROM datamodel=Endpoint.Filesystem\n    WHERE Filesystem.file_name IN (\"Login Data\",\"Cookies\",\"Web Data\",\"Local State\",\"key4.db\",\"logins.json\")\n      AND Filesystem.file_path IN (\"*\\\\Google\\\\Chrome\\\\User Data*\",\n                                   \"*\\\\Microsoft\\\\Edge\\\\User Data*\",\n                                   \"*\\\\Mozilla\\\\Firefox\\\\Profiles*\")\n    BY Filesystem.dest Filesystem.user Filesystem.process_name Filesystem.file_path\n| `drop_dm_object_name(Filesystem)`\n| search NOT process_name IN (\"chrome.exe\",\"msedge.exe\",\"firefox.exe\",\"explorer.exe\",\"MsMpEng.exe\")\n| `security_content_ctime(firstTime)`"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "// EQL — non-browser process opening a browser credential store.\nfile where event.type in (\"change\", \"access\", \"creation\") and\n  file.name : (\"Login Data\", \"Cookies\", \"Web Data\", \"Local State\", \"key4.db\", \"logins.json\") and\n  file.path : (\"*\\\\Google\\\\Chrome\\\\User Data*\",\n               \"*\\\\Microsoft\\\\Edge\\\\User Data*\",\n               \"*\\\\Mozilla\\\\Firefox\\\\Profiles*\") and\n  not process.name : (\"chrome.exe\", \"msedge.exe\", \"firefox.exe\", \"explorer.exe\", \"MsMpEng.exe\")"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D03",
          "name": "New credential added to an existing service principal",
          "technique": "T1098.001",
          "tags": [
            "Identity",
            "Persistence",
            "Cloud"
          ],
          "logic": "Rather than maintain a stolen password against rotation and MFA, an intruder adds their own client secret or certificate to an application that already holds tenant permissions. The result is durable, MFA-immune, and survives the user password reset that usually closes an incident.",
          "fp": "Legitimate secret rotation by platform teams and CI/CD pipelines. Alert on the actor rather than the action: a credential added by an account that is not in your app-registration owners group is the finding.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "AuditLogs\n| where TimeGenerated > ago(30d)\n| where OperationName in (\"Add service principal credentials\",\n                          \"Update application - Certificates and secrets management\",\n                          \"Update application\")\n| where Result == \"success\"\n| extend Actor  = tostring(InitiatedBy.user.userPrincipalName)\n| extend AppActor = tostring(InitiatedBy.app.displayName)\n| extend TargetApp = tostring(TargetResources[0].displayName)\n| extend Props = TargetResources[0].modifiedProperties\n| where tostring(Props) has_any (\"KeyDescription\", \"PasswordCredentials\", \"KeyCredentials\")\n| project TimeGenerated, Actor, AppActor, TargetApp, OperationName,\n          CorrelationId, ModifiedProperties = Props\n| order by TimeGenerated desc"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "index=azure sourcetype=\"azure:aad:audit\"\n    operationName IN (\"Add service principal credentials\",\n                      \"Update application - Certificates and secrets management\")\n    \"result\"=success\n| rename properties.* as *\n| eval actor=coalesce('initiatedBy.user.userPrincipalName','initiatedBy.app.displayName')\n| eval target_app='targetResources{}.displayName'\n| search targetResources{}.modifiedProperties{}.displayName IN (\"KeyDescription\",\"PasswordCredentials\",\"KeyCredentials\")\n| table _time actor target_app operationName correlationId\n| sort - _time"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "FROM logs-azure.auditlogs-*\n| WHERE azure.auditlogs.operation_name IN (\n      \"Add service principal credentials\",\n      \"Update application - Certificates and secrets management\")\n  AND event.outcome == \"success\"\n| KEEP @timestamp, azure.auditlogs.identity, azure.auditlogs.operation_name,\n       azure.auditlogs.properties.target_resources\n| SORT @timestamp DESC"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D04",
          "name": "Edge appliance: unexpected admin account or config write",
          "technique": "T1190",
          "tags": [
            "Network",
            "Initial Access"
          ],
          "logic": "VPN and edge appliances remain the most reliable initial access route: internet-facing by definition, no EDR agent, and patched on change-control cycles measured in weeks against exploitation measured in hours. Post-exploitation almost always includes an administrative account or a configuration write, and that is what you can see from syslog.",
          "fp": "Genuine out-of-hours maintenance and vendor support sessions. Require change-ticket correlation rather than suppressing the rule — an appliance config change with no ticket is worth a phone call regardless of who made it.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "// Normalise appliance syslog first; table name will match your connector.\nlet AdminSources = dynamic([\"10.10.5.0/24\"]);   // your jump hosts, nothing else\nSyslog\n| where TimeGenerated > ago(7d)\n| where Facility in (\"local0\",\"local7\") or ProcessName has_any (\"nsvpn\",\"sslvpn\",\"ike\")\n| where SyslogMessage has_any (\"admin account created\", \"user added\", \"config changed\",\n                               \"login success\", \"superuser\", \"write memory\")\n| extend SrcIP = extract(@\"(\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})\", 1, SyslogMessage)\n| where isnotempty(SrcIP)\n| where not(ipv4_is_in_any_range(SrcIP, AdminSources))\n| project TimeGenerated, Computer, SrcIP, ProcessName, SyslogMessage\n| order by TimeGenerated desc"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "index=network sourcetype IN (\"cisco:asa\",\"pan:system\",\"fortigate_event\",\"citrix:netscaler\")\n    (\"admin account created\" OR \"user added\" OR \"config changed\" OR \"write memory\" OR \"superuser\")\n| rex field=_raw \"(?<src_ip>\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})\"\n| search NOT src_ip IN (10.10.5.0/24)\n| stats count values(_raw) as events by host, src_ip, sourcetype\n| sort - count"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "FROM logs-network.*\n| WHERE message LIKE \"*admin account created*\"\n     OR message LIKE \"*config changed*\"\n     OR message LIKE \"*write memory*\"\n| WHERE NOT CIDR_MATCH(source.ip, \"10.10.5.0/24\")\n| STATS hits = COUNT(*) BY host.name, source.ip\n| SORT hits DESC"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D05",
          "name": "Ransomware precursor: recovery destruction",
          "technique": "T1490",
          "tags": [
            "Endpoint",
            "Impact"
          ],
          "logic": "Before encryption starts, ransomware deletes volume shadow copies, clears the backup catalogue, and disables Windows recovery. This is the single highest-fidelity endpoint detection in the whole list — there is almost no benign reason for it, and it fires in the minutes before payload execution, which is the only window where response still matters.",
          "fp": "Legitimate backup software occasionally resizes shadow storage, and some imaging tools clear catalogues. Exclude by signed publisher and expect fewer than a handful of hits a month in a normal estate.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "DeviceProcessEvents\n| where TimeGenerated > ago(7d)\n| where FileName in~ (\"vssadmin.exe\",\"wmic.exe\",\"bcdedit.exe\",\"wbadmin.exe\",\n                      \"powershell.exe\",\"pwsh.exe\",\"diskshadow.exe\")\n| where ProcessCommandLine has_any (\"delete shadows\", \"shadowcopy delete\", \"resize shadowstorage\",\n                                    \"recoveryenabled no\", \"bootstatuspolicy ignoreallfailures\",\n                                    \"delete catalog\", \"Win32_ShadowCopy\", \"Remove-Item -Path C:\\\\$Recycle\")\n| project Timestamp, DeviceName, AccountName, FileName, ProcessCommandLine,\n          InitiatingProcessFileName, InitiatingProcessCommandLine, ReportId\n| order by Timestamp desc"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "| tstats summariesonly=true count\n    min(_time) as firstTime max(_time) as lastTime\n    FROM datamodel=Endpoint.Processes\n    WHERE Processes.process_name IN (\"vssadmin.exe\",\"wmic.exe\",\"bcdedit.exe\",\"wbadmin.exe\",\"diskshadow.exe\")\n    BY Processes.dest Processes.user Processes.parent_process_name\n       Processes.process_name Processes.process\n| `drop_dm_object_name(Processes)`\n| search process IN (\"*delete shadows*\",\"*shadowcopy delete*\",\"*resize shadowstorage*\",\n                     \"*recoveryenabled no*\",\"*delete catalog*\",\"*ignoreallfailures*\")\n| `security_content_ctime(firstTime)`\n| table firstTime dest user parent_process_name process_name process"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "// EQL — recovery destruction, any of the usual binaries.\nprocess where event.type == \"start\" and\n  process.name : (\"vssadmin.exe\", \"wmic.exe\", \"bcdedit.exe\", \"wbadmin.exe\", \"diskshadow.exe\") and\n  process.command_line : (\"*delete shadows*\", \"*shadowcopy delete*\", \"*resize shadowstorage*\",\n                          \"*recoveryenabled no*\", \"*delete catalog*\", \"*ignoreallfailures*\")"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D06",
          "name": "Kerberoasting: bulk RC4 service ticket requests",
          "technique": "T1558.003",
          "tags": [
            "Active Directory",
            "Credential Access"
          ],
          "logic": "An authenticated user requests service tickets for many SPNs and downgrades the encryption to RC4-HMAC (0x17) so the tickets can be cracked offline. The tell is not any single request — it is one account requesting tickets for an unusual number of distinct services in a short window, in RC4 when your domain otherwise negotiates AES.",
          "fp": "Legacy applications and older Linux Kerberos clients genuinely negotiate RC4. Establish which accounts do this normally, exclude them, and then treat any new account exhibiting the pattern as a finding.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "SecurityEvent\n| where TimeGenerated > ago(7d)\n| where EventID == 4769                              // Kerberos service ticket requested\n| where TicketEncryptionType == \"0x17\"               // RC4-HMAC — the downgrade\n| where TicketOptions == \"0x40810000\"\n| where ServiceName !endswith \"$\" and ServiceName !~ \"krbtgt\"\n| where Status == \"0x0\"\n| summarize SpnCount = dcount(ServiceName),\n            Spns     = make_set(ServiceName, 25),\n            Requests = count()\n    by Account, IpAddress, bin(TimeGenerated, 10m)\n| where SpnCount >= 10\n| order by SpnCount desc"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "index=windows source=\"WinEventLog:Security\" EventCode=4769\n    Ticket_Encryption_Type=0x17 Ticket_Options=0x40810000\n| search NOT Service_Name=\"*$\" NOT Service_Name=\"krbtgt\"\n| bin _time span=10m\n| stats dc(Service_Name) as spn_count\n        values(Service_Name) as spns\n        count as requests\n        by Account_Name, Client_Address, _time\n| where spn_count >= 10\n| sort - spn_count"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "FROM logs-system.security-*\n| WHERE event.code == \"4769\"\n  AND winlog.event_data.TicketEncryptionType == \"0x17\"\n  AND winlog.event_data.TicketOptions == \"0x40810000\"\n  AND NOT winlog.event_data.ServiceName LIKE \"*$\"\n| EVAL win = DATE_TRUNC(10 minutes, @timestamp)\n| STATS spn_count = COUNT_DISTINCT(winlog.event_data.ServiceName),\n        requests  = COUNT(*)\n      BY user.name, source.ip, win\n| WHERE spn_count >= 10\n| SORT spn_count DESC"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D07",
          "name": "EC2 instance credentials used from outside AWS",
          "technique": "T1552.005",
          "tags": [
            "Cloud",
            "AWS",
            "Credential Access"
          ],
          "logic": "An SSRF or compromised workload lets an attacker read the instance metadata service and walk away with the instance role’s temporary credentials. Those credentials then get used from the attacker’s own infrastructure. The detection is a principal whose session name is an instance ID being used from a source IP that is not that instance — the pattern behind the 2019 Capital One breach and still working.",
          "fp": "AWS services calling on your behalf show a source IP of an amazonaws.com service principal rather than a public IP; exclude those. Genuine hybrid workloads using instance roles through a NAT gateway need their egress IPs allow-listed.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "AWSCloudTrail\n| where TimeGenerated > ago(7d)\n| where UserIdentityType == \"AssumedRole\"\n| where UserIdentityPrincipalid has \":i-\"          // session name is an EC2 instance id\n| where SourceIpAddress !endswith \".amazonaws.com\"\n| where not(ipv4_is_in_any_range(SourceIpAddress,\n        dynamic([\"10.0.0.0/8\",\"172.16.0.0/12\",\"192.168.0.0/16\",\"203.0.113.10/32\"])))  // + your NAT egress\n| summarize Calls = count(),\n            Actions = make_set(EventName, 30),\n            Regions = make_set(AWSRegion, 5)\n    by UserIdentityPrincipalid, SourceIpAddress, bin(TimeGenerated, 1h)\n| order by Calls desc"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "index=aws sourcetype=aws:cloudtrail userIdentity.type=AssumedRole\n| search userIdentity.principalId=\"*:i-*\"\n| search NOT sourceIPAddress=\"*.amazonaws.com\"\n| search NOT sourceIPAddress IN (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 203.0.113.10)\n| stats count as calls\n        values(eventName) as actions\n        dc(eventName) as distinct_actions\n        by userIdentity.principalId, sourceIPAddress, awsRegion\n| where calls > 0\n| sort - distinct_actions"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "FROM logs-aws.cloudtrail-*\n| WHERE aws.cloudtrail.user_identity.type == \"AssumedRole\"\n  AND aws.cloudtrail.user_identity.arn LIKE \"*:i-*\"\n  AND NOT source.ip LIKE \"*.amazonaws.com\"\n  AND NOT CIDR_MATCH(source.ip, \"10.0.0.0/8\", \"172.16.0.0/12\", \"192.168.0.0/16\")\n| STATS calls = COUNT(*), actions = COUNT_DISTINCT(event.action)\n      BY aws.cloudtrail.user_identity.arn, source.ip\n| SORT actions DESC"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D08",
          "name": "Remote monitoring tool installed outside IT change",
          "technique": "T1219",
          "tags": [
            "Endpoint",
            "Command and Control"
          ],
          "logic": "Ransomware crews stopped writing custom C2 and started installing ScreenConnect, AnyDesk, Atera, or Splashtop — signed, legitimate software that no EDR will block and no proxy will flag. Detect on the estate rule instead: which RMM tools does your IT function actually use, and every other one is an incident.",
          "fp": "Vendor support sessions and shadow IT. This rule works only if you first decide what your sanctioned RMM is. If the answer is “three of them, depending on the team,” fix that first — the detection is downstream of the policy.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "// Everything except your one sanctioned tool. Replace the allow-list.\nlet Sanctioned = dynamic([\"ScreenConnect.ClientService.exe\"]);\nDeviceProcessEvents\n| where TimeGenerated > ago(14d)\n| where FileName in~ (\"AnyDesk.exe\",\"TeamViewer.exe\",\"ScreenConnect.ClientService.exe\",\n                      \"AteraAgent.exe\",\"SplashtopStreamer.exe\",\"RemotePCService.exe\",\n                      \"Syncro.Service.exe\",\"LogMeIn.exe\",\"GoToAssist.exe\",\"ngrok.exe\")\n| where FileName !in~ (Sanctioned)\n| summarize FirstSeen = min(Timestamp), Executions = count(),\n            Users = make_set(AccountName, 5), Cmds = make_set(ProcessCommandLine, 3)\n    by DeviceName, FileName, InitiatingProcessFileName\n| order by FirstSeen desc"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "| tstats summariesonly=true count min(_time) as firstTime\n    FROM datamodel=Endpoint.Processes\n    WHERE Processes.process_name IN (\"AnyDesk.exe\",\"TeamViewer.exe\",\"AteraAgent.exe\",\n                                     \"SplashtopStreamer.exe\",\"RemotePCService.exe\",\n                                     \"Syncro.Service.exe\",\"LogMeIn.exe\",\"GoToAssist.exe\",\"ngrok.exe\")\n    BY Processes.dest Processes.user Processes.process_name Processes.parent_process_name\n| `drop_dm_object_name(Processes)`\n| `security_content_ctime(firstTime)`\n| sort - firstTime"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "FROM logs-endpoint.events.process-*\n| WHERE process.name IN (\"AnyDesk.exe\",\"TeamViewer.exe\",\"AteraAgent.exe\",\"SplashtopStreamer.exe\",\n                         \"RemotePCService.exe\",\"Syncro.Service.exe\",\"LogMeIn.exe\",\"ngrok.exe\")\n| STATS first_seen = MIN(@timestamp), executions = COUNT(*)\n      BY host.name, process.name, user.name\n| SORT first_seen DESC"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D09",
          "name": "LOLBin download and execute chain",
          "technique": "T1218",
          "tags": [
            "Endpoint",
            "Execution"
          ],
          "logic": "Living-off-the-land binaries let an intruder stage a payload without dropping an unsigned executable: certutil pulls a file from a URL, mshta runs remote script, regsvr32 loads a remote scriptlet. The binaries are Microsoft-signed, so signature-based blocking will not help — the command line is the artefact.",
          "fp": "Enterprise software deployment and some patching tools genuinely use bitsadmin and certutil. Exclude by parent process (your deployment agent) rather than by binary, or you will blind the rule entirely.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "DeviceProcessEvents\n| where TimeGenerated > ago(7d)\n| where FileName in~ (\"certutil.exe\",\"bitsadmin.exe\",\"mshta.exe\",\"regsvr32.exe\",\n                      \"curl.exe\",\"msiexec.exe\",\"installutil.exe\",\"rundll32.exe\")\n| where ProcessCommandLine has_any (\"urlcache\",\"-urlcache\",\"/transfer\",\"http://\",\"https://\",\n                                    \"scrobj.dll\",\"javascript:\",\"vbscript:\")\n| where InitiatingProcessFileName !in~ (\"ccmexec.exe\",\"setup.exe\",\"TrustedInstaller.exe\")\n| project Timestamp, DeviceName, AccountName, FileName, ProcessCommandLine,\n          InitiatingProcessFileName, InitiatingProcessParentFileName\n| order by Timestamp desc"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "| tstats summariesonly=true count min(_time) as firstTime\n    FROM datamodel=Endpoint.Processes\n    WHERE Processes.process_name IN (\"certutil.exe\",\"bitsadmin.exe\",\"mshta.exe\",\n                                     \"regsvr32.exe\",\"curl.exe\",\"installutil.exe\")\n    BY Processes.dest Processes.user Processes.parent_process_name\n       Processes.process_name Processes.process\n| `drop_dm_object_name(Processes)`\n| search process IN (\"*urlcache*\",\"*/transfer*\",\"*http://*\",\"*https://*\",\n                     \"*scrobj.dll*\",\"*javascript:*\")\n| search NOT parent_process_name IN (\"ccmexec.exe\",\"TrustedInstaller.exe\")\n| `security_content_ctime(firstTime)`"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "// EQL — signed Microsoft binary reaching out to a URL.\nprocess where event.type == \"start\" and\n  process.name : (\"certutil.exe\", \"bitsadmin.exe\", \"mshta.exe\", \"regsvr32.exe\",\n                  \"curl.exe\", \"installutil.exe\") and\n  process.command_line : (\"*urlcache*\", \"*/transfer*\", \"*http://*\", \"*https://*\",\n                          \"*scrobj.dll*\", \"*javascript:*\") and\n  not process.parent.name : (\"ccmexec.exe\", \"TrustedInstaller.exe\")"
            }
          ]
        }
      },
      {
        "t": "detect",
        "c": {
          "id": "D10",
          "name": "AI agent identity operating outside its baseline",
          "technique": "T1098 / OWASP LLM06",
          "tags": [
            "AI",
            "Identity",
            "Emerging"
          ],
          "logic": "This is the genuinely new one. An AI assistant or MCP server is wired into your tenant with a service principal and a broad consent grant. When it is prompt-injected — through a document, an email, a ticket — it does not exploit anything. It uses the permissions you already gave it. There is no malware and no signature; the only signal is that a non-interactive identity started doing something it has never done before.",
          "fp": "Genuine feature launches and expanded automation scope will trip this. That is the point: the rule should force a conversation about what the agent is permitted to do, and any expansion should be a known change rather than a surprise.",
          "queries": [
            {
              "lang": "KQL",
              "label": "Microsoft Sentinel / Defender XDR",
              "code": "// Part A — broad delegated consent granted to any application.\nAuditLogs\n| where TimeGenerated > ago(30d)\n| where OperationName in (\"Consent to application\", \"Add delegated permission grant\",\n                          \"Add app role assignment to service principal\")\n| extend Scopes = tostring(TargetResources[0].modifiedProperties)\n| where Scopes has_any (\"Mail.Read\",\"Mail.ReadWrite\",\"Files.ReadWrite.All\",\n                        \"Sites.FullControl.All\",\"Directory.ReadWrite.All\",\n                        \"User.ReadWrite.All\",\"Application.ReadWrite.All\")\n| project TimeGenerated, Actor = tostring(InitiatedBy.user.userPrincipalName),\n          App = tostring(TargetResources[0].displayName), OperationName, Scopes\n\n// Part B — service principal doing something it has not done in 14 days.\nlet Baseline =\n    AADServicePrincipalSignInLogs\n    | where TimeGenerated between (ago(21d) .. ago(7d))\n    | summarize KnownIPs = make_set(IPAddress, 100), KnownApps = make_set(ResourceDisplayName, 50)\n        by ServicePrincipalName;\nAADServicePrincipalSignInLogs\n| where TimeGenerated > ago(7d)\n| where ResultType == 0\n| join kind=leftouter Baseline on ServicePrincipalName\n| where isnull(KnownIPs) or IPAddress !in (KnownIPs)\n| project TimeGenerated, ServicePrincipalName, IPAddress, ResourceDisplayName, ServicePrincipalId"
            },
            {
              "lang": "SPL",
              "label": "Splunk (SPL)",
              "code": "index=azure sourcetype=\"azure:aad:audit\"\n    operationName IN (\"Consent to application\",\"Add delegated permission grant\",\n                      \"Add app role assignment to service principal\")\n| rename properties.* as *\n| eval scopes='targetResources{}.modifiedProperties{}.newValue'\n| search scopes IN (\"*Mail.Read*\",\"*Files.ReadWrite.All*\",\"*Sites.FullControl.All*\",\n                    \"*Directory.ReadWrite.All*\",\"*Application.ReadWrite.All*\")\n| table _time initiatedBy.user.userPrincipalName targetResources{}.displayName operationName scopes\n| sort - _time"
            },
            {
              "lang": "ELK",
              "label": "Elastic (ES|QL / EQL)",
              "code": "FROM logs-azure.auditlogs-*\n| WHERE azure.auditlogs.operation_name IN (\n      \"Consent to application\", \"Add delegated permission grant\",\n      \"Add app role assignment to service principal\")\n| WHERE azure.auditlogs.properties.target_resources LIKE \"*ReadWrite.All*\"\n     OR azure.auditlogs.properties.target_resources LIKE \"*FullControl.All*\"\n| KEEP @timestamp, azure.auditlogs.identity, azure.auditlogs.operation_name\n| SORT @timestamp DESC"
            }
          ]
        }
      },
      {
        "t": "h2",
        "c": "The YARA rules"
      },
      {
        "t": "p",
        "c": "These four match on-disk and in-memory artefacts, which is where YARA earns its place: D02 (infostealers), D05 (ransomware), and the webshells that frequently follow D04. Scan with <b>yara -r rules.yar /path</b>, or wire them into your EDR’s custom-IOC ingestion where it supports YARA."
      },
      {
        "t": "note",
        "c": "Every rule below is a <b>heuristic</b>, written to be readable rather than exhaustive. They will produce false positives on security tooling, malware research directories, and documentation. Test with <b>--print-strings</b> against a known-clean host before you scan production."
      },
      {
        "t": "code",
        "label": "YARA — infostealer targeting browser credential stores",
        "c": "rule Infostealer_Browser_Credential_Paths\n{\n    meta:\n        description = \"Heuristic: binary referencing multiple browser credential stores\"\n        author      = \"Cloud Secure Canada\"\n        date        = \"2026-08-30\"\n        reference   = \"https://attack.mitre.org/techniques/T1555/003/\"\n        maps_to     = \"D02\"\n\n    strings:\n        $chrome1 = \"\\\\Google\\\\Chrome\\\\User Data\" ascii wide nocase\n        $chrome2 = \"Login Data\"                      ascii wide\n        $chrome3 = \"Local State\"                     ascii wide\n        $edge1   = \"\\\\Microsoft\\\\Edge\\\\User Data\" ascii wide nocase\n        $ff1     = \"logins.json\"                     ascii wide\n        $ff2     = \"key4.db\"                         ascii wide\n\n        // DPAPI + master-key handling that cookie theft needs\n        $api1    = \"CryptUnprotectData\"              ascii\n        $api2    = \"os_crypt\"                        ascii wide\n        $api3    = \"encrypted_key\"                   ascii wide\n\n    condition:\n        uint16(0) == 0x5A4D            // PE\n        and filesize < 15MB\n        and 3 of ($chrome*, $edge*, $ff*)\n        and 1 of ($api*)\n}"
      },
      {
        "t": "code",
        "label": "YARA — ransom note heuristic",
        "c": "rule Ransomware_Note_Generic\n{\n    meta:\n        description = \"Heuristic: small text file carrying ransom-note language\"\n        author      = \"Cloud Secure Canada\"\n        date        = \"2026-08-30\"\n        reference   = \"https://attack.mitre.org/techniques/T1486/\"\n        maps_to     = \"D05\"\n\n    strings:\n        $enc1 = \"your files have been encrypted\"  ascii wide nocase\n        $enc2 = \"all your files are encrypted\"    ascii wide nocase\n        $enc3 = \"your network has been breached\"  ascii wide nocase\n        $enc4 = \"decryption key\"                  ascii wide nocase\n\n        $prs1 = \"do not rename\"                   ascii wide nocase\n        $prs2 = \"third party recovery\"            ascii wide nocase\n        $prs3 = \"permanently lost\"                ascii wide nocase\n        $prs4 = \"published on our blog\"           ascii wide nocase\n\n        $con1 = \".onion\"                          ascii wide nocase\n        $con2 = \"qTox\"                            ascii wide nocase\n        $con3 = \"session id\"                      ascii wide nocase\n\n    condition:\n        filesize < 50KB\n        and 1 of ($enc*)\n        and 1 of ($prs*)\n        and 1 of ($con*)\n}"
      },
      {
        "t": "code",
        "label": "YARA — generic webshell (ASPX / PHP / JSP)",
        "c": "rule Webshell_Generic_Eval_Dispatch\n{\n    meta:\n        description = \"Heuristic: small web-root file dispatching attacker-supplied input\"\n        author      = \"Cloud Secure Canada\"\n        date        = \"2026-08-30\"\n        reference   = \"https://attack.mitre.org/techniques/T1505/003/\"\n        maps_to     = \"D04\"\n\n    strings:\n        // attacker-controlled input reaching an executor\n        $php1 = /eval\\s*\\(\\s*\\$_(GET|POST|REQUEST|COOKIE)/ nocase\n        $php2 = /assert\\s*\\(\\s*\\$_(GET|POST|REQUEST)/       nocase\n        $php3 = /(system|shell_exec|passthru|popen)\\s*\\(\\s*\\$_/ nocase\n\n        $asp1 = \"Request.Item[\"                          ascii nocase\n        $asp2 = \"System.Diagnostics.Process\"             ascii nocase\n        $asp3 = \"eval(Request\"                           ascii nocase\n\n        $jsp1 = \"Runtime.getRuntime().exec\"              ascii\n        $jsp2 = \"request.getParameter\"                   ascii\n\n    condition:\n        filesize < 500KB\n        and (\n              any of ($php*)\n              or (2 of ($asp*))\n              or (all of ($jsp*))\n            )\n}"
      },
      {
        "t": "code",
        "label": "YARA — in-memory beacon configuration markers",
        "c": "rule Beacon_Config_In_Memory\n{\n    meta:\n        description = \"Heuristic: Cobalt-Strike-style beacon config in a memory dump\"\n        author      = \"Cloud Secure Canada\"\n        date        = \"2026-08-30\"\n        reference   = \"https://attack.mitre.org/techniques/T1071/001/\"\n        note        = \"Scan process memory, not disk: yara -p 8 rules.yar <pid>\"\n\n    strings:\n        // default reflective-loader export and named-pipe patterns\n        $ldr  = \"ReflectiveLoader\"        ascii\n        $pipe = /\\\\\\\\\\.\\\\pipe\\\\(msagent|postex|status)_[0-9a-f]{4}/ nocase\n\n        // config block markers seen in unencrypted beacon settings\n        $cfg1 = { 00 01 00 01 00 02 }\n        $cfg2 = { 00 02 00 01 00 02 }\n        $ua   = \"User-Agent: Mozilla/\"   ascii\n\n    condition:\n        filesize < 500MB\n        and (\n              ($ldr and $ua)\n              or $pipe\n              or (all of ($cfg*) and $ua)\n            )\n}"
      },
      {
        "t": "h2",
        "c": "Validating that any of this works"
      },
      {
        "t": "p",
        "c": "A deployed rule that has never fired is indistinguishable from a broken one. Before you call a detection live, generate the behaviour and confirm the alert lands:"
      },
      {
        "t": "ol",
        "c": [
          "<b>Atomic Red Team</b> has a mapped test for most of these techniques. Run the atomic for T1490 on an isolated host and confirm D05 fires end to end — log, rule, alert, ticket.",
          "<b>Record the detection latency.</b> The gap between the event and the analyst seeing it is the number that determines whether D05 is useful or just forensic.",
          "<b>Write down the tuning.</b> Every exclusion you add is a hole. An exclusion with no comment explaining why becomes permanent, and permanent exclusions are how estates go blind.",
          "<b>Re-test after upgrades.</b> Schema changes in a SIEM upgrade silently break field references. A quarterly re-run of the atomics catches it."
        ]
      },
      {
        "t": "note",
        "c": "If you deploy only one rule from this post, deploy <b>D05</b>. It is the highest fidelity, the cheapest to tune, and it fires during the only window in a ransomware incident where a human can still change the outcome."
      }
    ],
    "sources": [
      {
        "title": "MITRE ATT&CK Enterprise Matrix",
        "publisher": "MITRE",
        "url": "https://attack.mitre.org/matrices/enterprise/"
      },
      {
        "title": "Known Exploited Vulnerabilities Catalog",
        "publisher": "CISA",
        "url": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
      },
      {
        "title": "Splunk Security Content (detection research)",
        "publisher": "Splunk Threat Research Team",
        "url": "https://research.splunk.com/"
      },
      {
        "title": "Elastic prebuilt detection rules",
        "publisher": "Elastic",
        "url": "https://github.com/elastic/detection-rules"
      },
      {
        "title": "Microsoft Sentinel community detections",
        "publisher": "Microsoft",
        "url": "https://github.com/Azure/Azure-Sentinel"
      },
      {
        "title": "Sigma — generic signature format for SIEM systems",
        "publisher": "SigmaHQ",
        "url": "https://github.com/SigmaHQ/sigma"
      },
      {
        "title": "Atomic Red Team — technique validation tests",
        "publisher": "Red Canary",
        "url": "https://github.com/redcanaryco/atomic-red-team"
      },
      {
        "title": "YARA documentation",
        "publisher": "VirusTotal",
        "url": "https://yara.readthedocs.io/"
      },
      {
        "title": "OWASP Top 10 for Large Language Model Applications",
        "publisher": "OWASP",
        "url": "https://genai.owasp.org/llm-top-10/"
      }
    ]
  },
  {
    "slug": "baseline-hardening-macos-windows-linux",
    "title": "Baseline Hardening for macOS, Windows 11, and Linux",
    "date": "2026-08-30",
    "updated": "2026-08-30",
    "readingTime": 16,
    "tags": [
      "Hardening",
      "Endpoint",
      "Baselines"
    ],
    "motif": "layers",
    "pinned": true,
    "pinOrder": 2,
    "cover": "/images/blog/baseline-hardening",
    "coverAlt": "Laptop on a desk beside a notebook, used here to represent endpoint configuration work.",
    "excerpt": "The controls that remove the most attacker options per hour of effort, on all three platforms — with the commands to verify what you have before you change anything.",
    "body": [
      {
        "t": "p",
        "c": "Most hardening guides fail for the same reason: they are 400 controls long, written against one OS version, and abandoned three pages in. This one is deliberately shorter. It covers the controls that remove the most attacker options per hour of effort, on all three platforms, in a form you can apply whether you are securing five laptops or five thousand."
      },
      {
        "t": "p",
        "c": "Nothing here is exotic. It is the floor. If you are already past it, use it as an audit checklist; if you are starting from a default install, work top to bottom and you will close most of what a commodity intrusion relies on."
      },
      {
        "t": "note",
        "c": "<b>Test before you deploy.</b> Every command below changes system behaviour, and a few will break legitimate workflows in a specific estate — device encryption without escrowed recovery keys locks you out, and application control without an audit phase stops the business. Pilot on a small ring first. This is a starting point, not a change ticket."
      },
      {
        "t": "h2",
        "c": "What applies everywhere first"
      },
      {
        "t": "p",
        "c": "Before any OS-specific setting, these six determine more of your outcome than the rest of the guide combined. A perfectly hardened laptop with a local admin user who reuses a password is not hardened."
      },
      {
        "t": "ol",
        "c": [
          "<b>Know what you have.</b> An asset inventory that is current within a week. You cannot harden or patch a device you do not know exists, and unmanaged devices are where intrusions start.",
          "<b>Patch on a clock, and separately for internet-facing things.</b> A 30-day cycle for workstations is defensible. Internet-facing appliances need an emergency path measured in hours — exploitation of edge devices routinely beats a monthly window.",
          "<b>Remove standing local administrator rights.</b> This single change defeats a large share of commodity malware, which assumes it can write to system locations. Give admin on demand and time-bound it.",
          "<b>Phishing-resistant MFA on every account that can reach anything.</b> Passkeys or hardware tokens. Push-approval MFA is now routinely defeated by fatigue and AiTM proxies.",
          "<b>Full-disk encryption with escrowed recovery keys.</b> Encryption without key escrow is a self-inflicted outage waiting to happen; key escrow without encryption is nothing.",
          "<b>Ship logs somewhere the endpoint cannot delete them.</b> Local logs are cleared by the intruder. Ninety days retained centrally is a workable minimum, and it is the difference between an investigation and a shrug."
        ]
      },
      {
        "t": "h2",
        "c": "macOS"
      },
      {
        "t": "p",
        "c": "macOS ships reasonably secure by default, and the work is mostly confirming defaults are still on, closing the sharing services, and getting devices under a management profile so settings cannot be silently reversed by the user."
      },
      {
        "t": "h3",
        "c": "Verify the platform protections are actually on"
      },
      {
        "t": "code",
        "label": "macOS — verification (run first, change nothing)",
        "c": "# FileVault full-disk encryption\nsudo fdesetup status                       # want: FileVault is On.\n\n# System Integrity Protection — protects system files even from root\ncsrutil status                             # want: enabled\n\n# Gatekeeper — blocks unsigned / unnotarised applications\nspctl --status                             # want: assessments enabled\n\n# Application firewall\nsudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate\n\n# Signed system volume (macOS Big Sur and later)\ncsrutil authenticated-root status          # want: enabled\n\n# Which sharing services are listening\nsudo launchctl list | grep -Ei 'smbd|afpd|screensharing|ssh'"
      },
      {
        "t": "h3",
        "c": "Apply the baseline"
      },
      {
        "t": "code",
        "label": "macOS — baseline hardening",
        "c": "# --- Encryption -------------------------------------------------------------\n# Enable FileVault. Escrow the recovery key through MDM before running this\n# on a fleet; without escrow you will eventually lock someone out permanently.\nsudo fdesetup enable\n\n# --- Network ----------------------------------------------------------------\nsudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on\nsudo /usr/libexec/ApplicationFirewall/socketfilterfw --setstealthmode on\nsudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsigned on\nsudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsignedapp off\n\n# --- Turn off sharing services you are not deliberately using ---------------\nsudo systemsetup -setremotelogin off          # SSH\nsudo launchctl disable system/com.apple.smbd  # SMB file sharing\nsudo launchctl disable system/com.apple.screensharing\n\n# --- Updates ----------------------------------------------------------------\nsudo defaults write /Library/Preferences/com.apple.SoftwareUpdate \\\n     AutomaticCheckEnabled -bool true\nsudo defaults write /Library/Preferences/com.apple.SoftwareUpdate \\\n     AutomaticDownload -bool true\nsudo defaults write /Library/Preferences/com.apple.SoftwareUpdate \\\n     CriticalUpdateInstall -bool true\n# Rapid Security Responses — out-of-band fixes for actively exploited bugs\nsudo defaults write /Library/Preferences/com.apple.SoftwareUpdate \\\n     AutomaticallyInstallMacOSUpdates -bool true\n\n# --- Screen lock ------------------------------------------------------------\ndefaults write com.apple.screensaver askForPassword -int 1\ndefaults write com.apple.screensaver askForPasswordDelay -int 0\n\n# --- Reduce local attack surface -------------------------------------------\nsudo dscl . -create /Users/guest UserShell /usr/bin/false   # no guest shell\nsudo defaults write /Library/Preferences/com.apple.loginwindow \\\n     GuestEnabled -bool false"
      },
      {
        "t": "p",
        "c": "Two settings worth calling out because they are commonly missed. <b>Lockdown Mode</b> (System Settings → Privacy &amp; Security) is an extreme profile intended for people plausibly targeted by commercial spyware — it breaks some web and messaging features, so do not push it estate-wide, but it belongs on the devices of executives, journalists, and anyone handling acquisition or litigation material. <b>Firmware protection</b> differs by silicon: Intel Macs use <b>firmwarepasswd</b>, while Apple Silicon uses the Recovery lock set through MDM. Do not assume a policy written for Intel still applies."
      },
      {
        "t": "note",
        "c": "On a fleet, apply all of this as a <b>configuration profile through MDM</b> rather than as shell commands. Commands drift the moment a user changes a setting; a profile re-asserts itself and reports compliance. Apple publishes a per-version macOS Security Compliance Project that generates signed baselines for CIS, STIG, and NIST 800-53 — start there rather than hand-rolling."
      },
      {
        "t": "h2",
        "c": "Windows 11"
      },
      {
        "t": "p",
        "c": "Windows 11 on modern hardware ships with the virtualisation-based protections available, and on new installs meeting the hardware requirements several are on by default. The work is confirming they are actually enabled on your estate — in-place upgrades from Windows 10 frequently are not — and then adding attack surface reduction, logging, and credential hygiene."
      },
      {
        "t": "h3",
        "c": "Verify first"
      },
      {
        "t": "code",
        "label": "PowerShell (admin) — verification",
        "c": "# Disk encryption status for every volume\nGet-BitLockerVolume | Select-Object MountPoint, VolumeStatus, ProtectionStatus, EncryptionMethod\n\n# Virtualisation-based security and Credential Guard\nGet-CimInstance -ClassName Win32_DeviceGuard `\n  -Namespace root\\Microsoft\\Windows\\DeviceGuard |\n  Select-Object VirtualizationBasedSecurityStatus,\n                SecurityServicesConfigured, SecurityServicesRunning\n# SecurityServicesRunning containing 1 = Credential Guard active\n\n# LSA running as a protected process (blocks credential dumping from lsass)\nGet-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa' -Name RunAsPPL -EA 0\n\n# Defender real-time protection and tamper protection\nGet-MpComputerStatus | Select-Object RealTimeProtectionEnabled, IsTamperProtected,\n                                     AntivirusSignatureAge\n\n# Which ASR rules are configured\nGet-MpPreference | Select-Object -ExpandProperty AttackSurfaceReductionRules_Ids\n\n# SMBv1 should not be present at all\nGet-WindowsOptionalFeature -Online -FeatureName SMB1Protocol |\n  Select-Object FeatureName, State"
      },
      {
        "t": "h3",
        "c": "Apply the baseline"
      },
      {
        "t": "code",
        "label": "PowerShell (admin) — baseline hardening",
        "c": "# --- Disk encryption --------------------------------------------------------\n# Escrow recovery keys to Entra ID / AD before enabling on a fleet.\nEnable-BitLocker -MountPoint 'C:' -EncryptionMethod XtsAes256 `\n                 -UsedSpaceOnly -TpmProtector\nAdd-BitLockerKeyProtector -MountPoint 'C:' -RecoveryPasswordProtector\nBackupToAAD-BitLockerKeyProtector -MountPoint 'C:' `\n  -KeyProtectorId (Get-BitLockerVolume -MountPoint 'C:').KeyProtector[1].KeyProtectorId\n\n# --- Protect LSA against credential dumping --------------------------------\nNew-ItemProperty -Path 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa' `\n  -Name 'RunAsPPL' -Value 1 -PropertyType DWORD -Force\n\n# --- Defender: tamper-resistant, cloud-assisted -----------------------------\nSet-MpPreference -DisableRealtimeMonitoring $false\nSet-MpPreference -MAPSReporting Advanced\nSet-MpPreference -SubmitSamplesConsent SendSafeSamples\nSet-MpPreference -CloudBlockLevel High\nSet-MpPreference -PUAProtection Enabled\n\n# --- Attack Surface Reduction ----------------------------------------------\n# Deploy in Audit (2) first, review the telemetry, then move to Enabled (1).\n# GUIDs below are a starting set; pull the current full list from Microsoft.\n$asr = @{\n  '9e6c4e1f-7d60-472f-ba1a-a39ef669e4b2' = 'Block credential stealing from LSASS'\n  'd4f940ab-401b-4efc-aadc-ad5f3c50688a' = 'Block Office apps creating child processes'\n  'be9ba2d9-53ea-4cdc-84e5-9b1eeee46550' = 'Block executable content from email/webmail'\n  'e6db77e5-3df2-4cf1-b95a-636979351e5b' = 'Block persistence via WMI event subscription'\n  '56a863a9-875e-4185-98a7-b882c64b5ce5' = 'Block abuse of vulnerable signed drivers'\n}\nforeach ($id in $asr.Keys) {\n  Add-MpPreference -AttackSurfaceReductionRules_Ids $id `\n                   -AttackSurfaceReductionRules_Actions AuditMode\n}\n\n# --- Remove legacy protocols ------------------------------------------------\nDisable-WindowsOptionalFeature -Online -FeatureName SMB1Protocol -NoRestart\n\n# --- Logging that investigations actually need ------------------------------\n$psBase = 'HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell'\nNew-Item -Path \"$psBase\\ScriptBlockLogging\" -Force | Out-Null\nNew-ItemProperty -Path \"$psBase\\ScriptBlockLogging\" `\n  -Name 'EnableScriptBlockLogging' -Value 1 -PropertyType DWORD -Force\nNew-Item -Path \"$psBase\\ModuleLogging\" -Force | Out-Null\nNew-ItemProperty -Path \"$psBase\\ModuleLogging\" `\n  -Name 'EnableModuleLogging' -Value 1 -PropertyType DWORD -Force\n\n# Command line in process-creation events — without this, 4688 is near useless\nauditpol /set /subcategory:\"Process Creation\" /success:enable /failure:enable\nNew-ItemProperty -Path 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit' `\n  -Name 'ProcessCreationIncludeCmdLine_Enabled' -Value 1 -PropertyType DWORD -Force\n\n# Grow the Security log so it does not roll before you read it\nwevtutil sl Security /ms:1073741824"
      },
      {
        "t": "p",
        "c": "Two more that matter more than their effort suggests. <b>Windows LAPS</b> is built into Windows 11 and randomises the local administrator password per device — without it, one recovered local admin hash moves laterally across the entire estate. And <b>application control</b> (WDAC, or AppLocker on older estates) is the highest-value control on this page and the one most likely to cause an outage; run it in audit mode for at least a month and read the logs before enforcing."
      },
      {
        "t": "h2",
        "c": "Linux"
      },
      {
        "t": "p",
        "c": "Linux baselines vary more by distribution than the other two platforms, so the commands below note where they differ. The priorities are the same everywhere: lock down SSH, restrict privilege escalation, turn on the kernel hardening that is off by default, and make sure the audit trail exists."
      },
      {
        "t": "h3",
        "c": "SSH — the control that matters most"
      },
      {
        "t": "code",
        "label": "/etc/ssh/sshd_config.d/00-hardening.conf",
        "c": "# Drop a file into sshd_config.d rather than editing sshd_config directly:\n# package upgrades overwrite the main file and silently revert your hardening.\n\nPermitRootLogin no\nPasswordAuthentication no\nKbdInteractiveAuthentication no\nChallengeResponseAuthentication no\nPubkeyAuthentication yes\n\n# Restrict who may log in at all\nAllowGroups ssh-users\n\n# Reduce brute-force and session surface\nMaxAuthTries 3\nMaxSessions 4\nLoginGraceTime 30\nClientAliveInterval 300\nClientAliveCountMax 2\n\n# Turn off forwarding features unless a workload genuinely needs them\nX11Forwarding no\nAllowAgentForwarding no\nAllowTcpForwarding no\nPermitTunnel no\n\n# Modern algorithms only\nKexAlgorithms curve25519-sha256,curve25519-sha256@libssh.org\nCiphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com\nMACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com"
      },
      {
        "t": "code",
        "label": "bash — validate and reload sshd safely",
        "c": "# ALWAYS validate before reloading, and keep your current session open\n# until you have proven a second session can connect.\nsudo sshd -t && sudo systemctl reload sshd\n\n# From another terminal, confirm you can still get in:\nssh -o BatchMode=yes user@host 'echo connected'"
      },
      {
        "t": "h3",
        "c": "Kernel and filesystem"
      },
      {
        "t": "code",
        "label": "/etc/sysctl.d/99-hardening.conf",
        "c": "# Memory / process protections\nkernel.randomize_va_space = 2        # full ASLR\nkernel.kptr_restrict = 2             # hide kernel pointers from userspace\nkernel.dmesg_restrict = 1            # non-root cannot read the kernel ring buffer\nkernel.yama.ptrace_scope = 1         # restrict debugger attachment\nkernel.unprivileged_bpf_disabled = 1\nfs.protected_hardlinks = 1\nfs.protected_symlinks = 1\nfs.suid_dumpable = 0\n\n# Network\nnet.ipv4.tcp_syncookies = 1\nnet.ipv4.conf.all.rp_filter = 1\nnet.ipv4.conf.all.accept_redirects = 0\nnet.ipv4.conf.all.send_redirects = 0\nnet.ipv4.conf.all.accept_source_route = 0\nnet.ipv4.conf.all.log_martians = 1\nnet.ipv6.conf.all.accept_redirects = 0\n\n# Apply:  sudo sysctl --system"
      },
      {
        "t": "code",
        "label": "bash — mandatory access control, firewall, updates",
        "c": "# --- Mandatory access control: confirm it is enforcing, not permissive ------\n# RHEL / Fedora / Rocky:\nsestatus                          # want: enabled + enforcing\nsudo setenforce 1\n# Debian / Ubuntu:\nsudo aa-status                    # want: profiles in enforce mode\n\n# --- Host firewall: default deny inbound ------------------------------------\n# Debian / Ubuntu (ufw):\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow from 10.10.5.0/24 to any port 22 proto tcp\nsudo ufw enable\n# RHEL family (firewalld):\nsudo firewall-cmd --set-default-zone=drop\nsudo firewall-cmd --permanent --add-service=ssh\nsudo firewall-cmd --reload\n\n# --- Unattended security updates -------------------------------------------\n# Debian / Ubuntu:\nsudo apt install -y unattended-upgrades\nsudo dpkg-reconfigure --priority=low unattended-upgrades\n# RHEL family:\nsudo dnf install -y dnf-automatic\nsudo systemctl enable --now dnf-automatic-install.timer\n\n# --- Audit what you cannot prevent ------------------------------------------\nsudo systemctl enable --now auditd"
      },
      {
        "t": "code",
        "label": "/etc/audit/rules.d/hardening.rules",
        "c": "# Identity and privilege files\n-w /etc/passwd  -p wa -k identity\n-w /etc/shadow  -p wa -k identity\n-w /etc/group   -p wa -k identity\n-w /etc/sudoers -p wa -k privilege\n-w /etc/sudoers.d/ -p wa -k privilege\n\n# SSH configuration\n-w /etc/ssh/sshd_config -p wa -k sshd_config\n\n# Every process execution (high volume — size your log shipping for it)\n-a always,exit -F arch=b64 -S execve -k exec\n-a always,exit -F arch=b32 -S execve -k exec\n\n# Privilege escalation and module loading\n-a always,exit -F arch=b64 -S setuid -S setgid -F auid>=1000 -F auid!=4294967295 -k privesc\n-w /sbin/insmod -p x -k modules\n-w /sbin/modprobe -p x -k modules\n\n# Load with:  sudo augenrules --load"
      },
      {
        "t": "p",
        "c": "Mount options are the cheapest remaining win. Adding <b>nodev,nosuid,noexec</b> to <b>/tmp</b>, <b>/var/tmp</b>, and <b>/dev/shm</b> in <b>/etc/fstab</b> removes the most convenient staging directories on the system, and almost nothing legitimate breaks. Test it — a few package installers and older application servers genuinely execute from /tmp."
      },
      {
        "t": "h2",
        "c": "Prove it, then keep proving it"
      },
      {
        "t": "p",
        "c": "A baseline that is applied once and never measured decays within a quarter. Use a scanner that produces a score you can trend:"
      },
      {
        "t": "table",
        "head": [
          "Platform",
          "Tool",
          "What it gives you"
        ],
        "rows": [
          [
            "All three",
            "<b>CIS-CAT</b> (CIS Benchmarks)",
            "Scored assessment against the published benchmark. Free Lite tier covers common platforms; full version needs CIS SecureSuite membership."
          ],
          [
            "Linux",
            "<b>Lynis</b> (<b>lynis audit system</b>)",
            "Free, no agent, immediately useful. Produces a hardening index plus specific remediation suggestions."
          ],
          [
            "Linux / Windows",
            "<b>OpenSCAP</b> (<b>oscap xccdf eval</b>)",
            "Automated SCAP content including DISA STIG profiles. Machine-readable results suitable for a pipeline."
          ],
          [
            "Windows",
            "<b>Microsoft Security Compliance Toolkit</b>",
            "Microsoft's own baseline GPOs plus Policy Analyzer to diff your settings against them."
          ],
          [
            "macOS",
            "<b>macOS Security Compliance Project</b>",
            "Generates signed configuration profiles and audit scripts for CIS, STIG, and NIST 800-53 per macOS version."
          ]
        ]
      },
      {
        "t": "h2",
        "c": "Rolling it out without breaking the business"
      },
      {
        "t": "ol",
        "c": [
          "<b>Pilot ring first.</b> Ten to twenty devices covering your genuinely awkward users — the developers, the finance team with the ancient add-in, the executive with unusual hardware. They will find the breakage.",
          "<b>Audit mode before enforce.</b> Application control and ASR both support it. A month of audit telemetry tells you exactly what would have broken.",
          "<b>Keep a documented break-glass path.</b> A tested way back in when a policy locks out a device, held by more than one person, and rehearsed before you need it.",
          "<b>Escrow every recovery key before enabling encryption.</b> Not after. This is the single most common self-inflicted outage in a hardening project.",
          "<b>Re-baseline after every OS feature update.</b> Major upgrades reset settings and add new ones. Schedule the re-scan as part of the upgrade, not as a separate project nobody funds."
        ]
      },
      {
        "t": "note",
        "c": "If you can only do three things this month: remove standing local admin, turn on disk encryption with escrowed keys, and get process-creation logs with command lines shipping somewhere central. That combination blocks a large share of commodity intrusion and makes the rest investigable."
      }
    ],
    "sources": [
      {
        "title": "CIS Benchmarks",
        "publisher": "Center for Internet Security",
        "url": "https://www.cisecurity.org/cis-benchmarks"
      },
      {
        "title": "Security Technical Implementation Guides (STIGs)",
        "publisher": "DISA / DoD Cyber Exchange",
        "url": "https://public.cyber.mil/stigs/"
      },
      {
        "title": "Apple Platform Security guide",
        "publisher": "Apple",
        "url": "https://support.apple.com/guide/security/welcome/web"
      },
      {
        "title": "macOS Security Compliance Project",
        "publisher": "NIST / Apple / DoD",
        "url": "https://github.com/usnistgov/macos_security"
      },
      {
        "title": "Windows security baselines and the Security Compliance Toolkit",
        "publisher": "Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/windows-security-baselines"
      },
      {
        "title": "Attack surface reduction rules reference",
        "publisher": "Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference"
      },
      {
        "title": "Windows LAPS overview",
        "publisher": "Microsoft Learn",
        "url": "https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview"
      },
      {
        "title": "Lynis — security auditing tool for Linux and Unix",
        "publisher": "CISOfy",
        "url": "https://cisofy.com/lynis/"
      },
      {
        "title": "OpenSCAP — SCAP-based compliance scanning",
        "publisher": "OpenSCAP project",
        "url": "https://www.open-scap.org/"
      },
      {
        "title": "NIST Cybersecurity Framework",
        "publisher": "NIST",
        "url": "https://www.nist.gov/cyberframework"
      }
    ]
  },
  {
    "slug": "using-ai-to-strengthen-security-posture",
    "title": "Using AI to Strengthen Your Security Posture",
    "date": "2026-08-30",
    "updated": "2026-08-30",
    "readingTime": 14,
    "tags": [
      "AI",
      "Security Operations",
      "Strategy"
    ],
    "motif": "shards",
    "pinned": true,
    "pinOrder": 3,
    "cover": "/images/blog/ai-security-posture",
    "coverAlt": "Racks of networking and compute hardware in a data centre aisle.",
    "excerpt": "Where AI genuinely reduces risk at small, mid-market and enterprise scale — with worked monthly costs at published rates, and the governance that keeps it from becoming its own incident.",
    "body": [
      {
        "t": "p",
        "c": "Most security teams are already using AI, whether or not anyone approved it. The useful question is no longer whether to adopt it but where it genuinely reduces risk, what it costs to run at your size, and which tasks you should categorically keep it away from."
      },
      {
        "t": "p",
        "c": "This is a practical map: what to do at small, mid-market, and enterprise scale; what open-weight models get you for nothing versus what paid frontier models get you per token; and worked monthly costs at real published prices rather than hand-waving."
      },
      {
        "t": "note",
        "c": "<b>The framing that keeps this honest:</b> AI is very good at reading a lot of text and producing a first draft. It is not a control. It does not patch anything, enforce anything, or accept accountability for anything. Every use case below is a way to get a human to a good decision faster — not a way to remove the human."
      },
      {
        "t": "h2",
        "c": "Where AI actually helps, and where it does not"
      },
      {
        "t": "table",
        "head": [
          "Genuinely good at",
          "Genuinely bad at"
        ],
        "rows": [
          [
            "Summarising long, messy text — alert context, vendor advisories, log bundles, policy documents",
            "Being the sole basis for a security decision that has consequences"
          ],
          [
            "Translating between formats — a Sigma rule into KQL, a finding into an executive paragraph",
            "Arithmetic on your actual risk, or anything requiring precise recall of your environment"
          ],
          [
            "First drafts — policies, procedures, questionnaire responses, incident timelines",
            "Signing off compliance. An auditor wants evidence and a named human, not model output"
          ],
          [
            "Explaining unfamiliar things — a CVE, a stack trace, a piece of obfuscated script",
            "Autonomous remediation. Anything that changes production needs an approval gate"
          ],
          [
            "Triage and prioritisation at volume, where being 90% right fast beats 100% right slowly",
            "Handling data it should never have seen. The model will not tell you that you overshared"
          ]
        ]
      },
      {
        "t": "h2",
        "c": "Use cases by organisation size"
      },
      {
        "t": "p",
        "c": "Size changes what is worth building, not what is possible. A five-person company should never build an agentic pipeline; a five-thousand-person company should not be pasting alerts into a chat window by hand."
      },
      {
        "t": "h3",
        "c": "Small — roughly 1 to 50 people, no dedicated security staff"
      },
      {
        "t": "p",
        "c": "You have no SOC and probably no security engineer. AI substitutes for expertise you cannot afford to hire, on tasks where a good draft is genuinely most of the value."
      },
      {
        "t": "ul",
        "c": [
          "<b>Phishing triage.</b> Paste a suspicious message with headers and ask what is off about it. This is the single highest-value use at this size — it is the attack you actually face, and the analysis is well within reach of any current model.",
          "<b>Policy and procedure drafting.</b> An acceptable use policy, an incident response plan, a starter risk register. A draft you edit beats the empty document you never start.",
          "<b>Making vendor findings legible.</b> Feed in the penetration test report or the Nessus output and ask what to fix first and why. Then have a human sanity-check the ordering.",
          "<b>Script and configuration help.</b> Backup scripts, firewall rules, hardening commands — with the hard rule that you understand anything before you run it.",
          "<b>Security awareness content.</b> Short, specific, internal training material that reflects your actual tools rather than generic annual-training slop."
        ]
      },
      {
        "t": "note",
        "c": "At this size the biggest risk is not the model — it is the tool choice. A free consumer chat product may train on what you paste. Use a business tier with a no-training commitment, or run a local model, before anything sensitive goes near it."
      },
      {
        "t": "h3",
        "c": "Medium — roughly 50 to 1,000 people, a small security function"
      },
      {
        "t": "p",
        "c": "You have one to five security people and more alerts than they can read. The win here is automation of the reading, not of the deciding."
      },
      {
        "t": "ul",
        "c": [
          "<b>Alert enrichment and triage drafts.</b> Wire your SIEM to send each alert plus its context to a model and get back a plain-language summary, a suggested severity, and the three questions an analyst should ask. The analyst still decides. This is the highest-return build at this size — see the costing below.",
          "<b>Detection rule authoring and translation.</b> Write once, translate across SIEM dialects. Models are strong at this because it is a syntax transformation, and it is trivially verifiable — you run the query.",
          "<b>Incident timeline drafting.</b> Feed the log extracts, get a chronological narrative to correct. Saves hours during the part of an incident when everyone is exhausted.",
          "<b>Vendor security questionnaires.</b> Answer once properly, then let the model draft subsequent responses from your approved answer bank. A human signs every one.",
          "<b>Pull request review for security issues.</b> Not a replacement for SAST, but good at the classes of bug static analysis misses — logic flaws, authorisation gaps, unsafe defaults.",
          "<b>Threat intelligence triage.</b> Summarise the week's advisories filtered against your actual technology stack, so people read five relevant items instead of ignoring fifty."
        ]
      },
      {
        "t": "h3",
        "c": "Large — 1,000+ people, a real security organisation"
      },
      {
        "t": "p",
        "c": "You have tiered analysts, a detection engineering function, and compliance obligations. AI here is infrastructure, and it needs the same change control, logging, and access review as anything else in production."
      },
      {
        "t": "ul",
        "c": [
          "<b>Tier-1 augmentation at scale.</b> Every alert arrives pre-summarised, pre-enriched, and pre-correlated with similar historical incidents. Measure it on analyst time-to-decision and on how often the model's suggested severity survived review.",
          "<b>Detection-as-code pipelines.</b> Model-assisted rule generation from threat intel, automatic translation across platforms, and regression testing against historical data before merge.",
          "<b>Retrieval over your own knowledge.</b> Point a model at your runbooks, past incidents, and architecture docs so the answer reflects your environment rather than the general internet. This is where most enterprise value actually lands.",
          "<b>Continuous compliance evidence mapping.</b> Map controls to evidence across frameworks and flag drift. The model drafts the mapping; your GRC team owns it.",
          "<b>Purple team scenario generation.</b> Generate realistic attack scenarios from current threat intel for tabletop exercises and detection validation.",
          "<b>Agentic workflows with tool access</b> — the highest value and the highest risk on this list. An agent that can query your SIEM, enrich indicators, and open tickets saves real time, and an agent that can also <b>act</b> is a new attack surface. Read the governance section before building one."
        ]
      },
      {
        "t": "h2",
        "c": "Open weights versus paid APIs"
      },
      {
        "t": "p",
        "c": "These are not competing choices so much as different tools. Most mature setups end up running both: a local open-weight model for high-volume, privacy-sensitive, mechanical work, and a paid frontier model for the smaller number of genuinely hard reasoning tasks."
      },
      {
        "t": "table",
        "head": [
          "",
          "Open-weight, self-hosted",
          "Paid API"
        ],
        "rows": [
          [
            "<b>Marginal cost</b>",
            "None per token. You pay for hardware and the person who maintains it.",
            "Per token, metered, no floor and no ceiling."
          ],
          [
            "<b>Data handling</b>",
            "Nothing leaves your network. This is the reason most regulated teams start here.",
            "Leaves your network. Enterprise tiers offer no-training commitments and regional processing — verify contractually, do not assume."
          ],
          [
            "<b>Best at</b>",
            "Classification, summarisation, extraction, redaction, translation, high-volume mechanical work.",
            "Multi-step reasoning, long-context analysis, code, tool use, anything where quality per attempt matters."
          ],
          [
            "<b>Weakest at</b>",
            "Long chains of reasoning; degrades faster on ambiguity and long context.",
            "Nothing technical — the constraints are cost, data governance, and dependency on a third party."
          ],
          [
            "<b>Real cost driver</b>",
            "Engineering time. Someone owns the GPUs, the serving stack, and the upgrades.",
            "Token volume. Cost scales linearly with use, which is easy to forecast and easy to overrun."
          ],
          [
            "<b>Good first workload</b>",
            "Redacting sensitive fields out of data before it is sent anywhere else.",
            "Alert triage, detection translation, and anything where you would otherwise hire."
          ]
        ]
      },
      {
        "t": "p",
        "c": "The families worth knowing in the open-weight space are Meta's <b>Llama</b>, Mistral's models, Alibaba's <b>Qwen</b>, Google's <b>Gemma</b>, and <b>DeepSeek</b>. Licences differ meaningfully — several are “open weights” rather than open source, with restrictions on commercial use at scale. <b>Read the licence before you build a product on one.</b> Practical serving is usually <b>Ollama</b> or <b>LM Studio</b> for a workstation and <b>vLLM</b> for anything with real throughput requirements."
      },
      {
        "t": "h2",
        "c": "What it actually costs"
      },
      {
        "t": "p",
        "c": "Below is a worked example rather than a range, because ranges let vendors hide. The scenario: <b>10,000 alerts per month</b>, each sent to a model with roughly <b>2,000 tokens of input</b> (the alert, its context, and your triage playbook) and returning about <b>400 tokens</b> of summary and recommendation. That is 20 million input tokens and 4 million output tokens a month."
      },
      {
        "t": "p",
        "c": "Applying Anthropic's published Claude API rates as of August 2026:"
      },
      {
        "t": "table",
        "head": [
          "Model",
          "Input / output per million tokens",
          "Monthly cost at this volume",
          "Where it fits"
        ],
        "rows": [
          [
            "<b>Claude Haiku 4.5</b>",
            "$1 / $5",
            "<b>~$40</b>",
            "High-volume mechanical triage, enrichment, classification. The default for tier-1 volume."
          ],
          [
            "<b>Claude Sonnet 5</b>",
            "$2 / $10",
            "<b>~$80</b>",
            "The balanced choice for most triage pipelines — noticeably better reasoning for double the cost."
          ],
          [
            "<b>Claude Opus 5</b>",
            "$5 / $25",
            "<b>~$200</b>",
            "Reserve for the hard minority: incident analysis, complex code review, anything where a wrong answer is expensive."
          ]
        ]
      },
      {
        "t": "p",
        "c": "Two levers cut those figures substantially, and both are worth building in from the start rather than retrofitting:"
      },
      {
        "t": "ul",
        "c": [
          "<b>Prompt caching.</b> Most of that 2,000-token input is a stable playbook that never changes between alerts. Cached input is read at roughly a tenth of the normal rate. If 1,500 of the 2,000 tokens are cacheable, the Sonnet 5 example drops from about <b>$80 to roughly $53 a month</b> — the cached 15M tokens cost about $3 instead of $30.",
          "<b>Batch processing.</b> Work that does not need an answer within seconds — overnight enrichment, weekly intel summaries, compliance mapping — runs asynchronously at <b>50% of standard cost</b>. Splitting urgent from non-urgent traffic is often the single biggest saving available."
        ]
      },
      {
        "t": "note",
        "c": "Prices change, and this table is a snapshot of Anthropic's published rates in August 2026. Other providers price differently. Before you commit a budget, check the current published pricing rather than trusting any blog post — including this one."
      },
      {
        "t": "h3",
        "c": "Budget bands, and what each realistically buys"
      },
      {
        "t": "table",
        "head": [
          "Monthly spend",
          "What you can realistically achieve"
        ],
        "rows": [
          [
            "<b>$0</b>",
            "An open-weight model on hardware you already own, via Ollama or LM Studio. Summarisation, classification, drafting, and redaction — entirely offline, nothing leaves the building. Cost is your time, and quality on hard reasoning is a real step below frontier models."
          ],
          [
            "<b>Under $100</b>",
            "Business-tier assistant seats for the security team plus light API use, or the ~$40–$80 triage pipeline above. This is the band where most small and mid-sized organisations get the majority of the available value."
          ],
          [
            "<b>$100 – $1,000</b>",
            "Production automation: alert triage across a real alert volume, detection authoring and translation, vulnerability report summarisation, questionnaire drafting, PR security review. A mid-market security function operates comfortably here."
          ],
          [
            "<b>$1,000 – $10,000</b>",
            "Enterprise-scale pipelines — whole-SOC augmentation, retrieval over internal knowledge, continuous compliance mapping, agentic workflows with tool access. At this point you need cost monitoring per workload, not one shared key."
          ],
          [
            "<b>$10,000+</b>",
            "Large enterprise. Typically a hybrid: self-hosted open-weight inference for high-volume sensitive processing, frontier API for the reasoning-heavy minority. Dedicated GPU capacity becomes cheaper than per-token billing somewhere in this band, but only if you have the engineering capacity to run it."
          ]
        ]
      },
      {
        "t": "p",
        "c": "On self-hosting economics: a workstation-class GPU with enough memory to serve a mid-sized open-weight model is a low-thousands capital purchase, and rented cloud GPU capacity is billed hourly at rates that vary widely by class and region. The break-even against per-token pricing arrives later than most people expect — and it never accounts for the engineer maintaining it. Price both, honestly, before choosing."
      },
      {
        "t": "h2",
        "c": "Governance, or how this goes wrong"
      },
      {
        "t": "p",
        "c": "Every item below has already caused real incidents at real organisations. None of them are hypothetical."
      },
      {
        "t": "ol",
        "c": [
          "<b>Decide what may be pasted, and say it out loud.</b> Client data, credentials, personal information, unreleased financials, legally privileged material. Write it down and tell people, because the alternative is that everyone quietly guesses.",
          "<b>Know where inference happens.</b> If you are Canadian and handling personal information, PIPEDA obligations follow the data across the border. Regional processing and no-training commitments are contractual questions, not marketing ones — get them in writing.",
          "<b>Treat prompt injection as a real attack class.</b> Any model that reads untrusted content — email, tickets, documents, web pages — can be instructed by that content. If it also holds tools and permissions, that instruction becomes an action. This is OWASP's top LLM risk, and it is why the agent identity detection in our detection-rules guide exists.",
          "<b>Keep humans on anything that changes state.</b> Read-only agents are a productivity tool. Agents that can write, delete, disable, or approve need an explicit gate, and the gate needs to be a person who understands what they are approving.",
          "<b>Log every AI action to the same standard as a privileged user.</b> What was asked, what came back, what was done about it. When something goes wrong you will need to reconstruct the decision, and “the model said so” is not a reconstruction.",
          "<b>Give agents their own identity and least privilege.</b> Not a shared service account, not a human's token. Scope it, review it quarterly, and alert on it operating outside its baseline.",
          "<b>Verify anything that matters.</b> Models produce confident, well-formatted, wrong answers. Every generated detection rule gets run. Every generated command gets read. Every compliance mapping gets reviewed by someone accountable."
        ]
      },
      {
        "t": "h2",
        "c": "A sensible first 30 days"
      },
      {
        "t": "ol",
        "c": [
          "<b>Week 1 — write the data policy.</b> One page: what can and cannot go into an AI tool, which tools are approved, who to ask. Nothing else on this list is safe without it.",
          "<b>Week 2 — pick one painful, low-risk task.</b> Phishing triage for a small team, alert summarisation for a larger one. One task, one measurable before-and-after.",
          "<b>Week 3 — measure it honestly.</b> Time saved, and how often the output needed correcting. If the correction rate is high, the task is wrong for AI, not the model.",
          "<b>Week 4 — decide and document.</b> Keep it, kill it, or expand it. Write down the cost and the governance decisions so the next use case does not restart the argument."
        ]
      },
      {
        "t": "note",
        "c": "The organisations getting real value from AI in security are not the ones with the most sophisticated deployments. They are the ones that picked one genuinely painful task, measured it properly, and refused to let it touch production without a human in the path."
      }
    ],
    "sources": [
      {
        "title": "OWASP Top 10 for Large Language Model Applications",
        "publisher": "OWASP GenAI Security Project",
        "url": "https://genai.owasp.org/llm-top-10/"
      },
      {
        "title": "AI Risk Management Framework (AI RMF 1.0)",
        "publisher": "NIST",
        "url": "https://www.nist.gov/itl/ai-risk-management-framework"
      },
      {
        "title": "Claude API pricing",
        "publisher": "Anthropic",
        "url": "https://www.anthropic.com/pricing"
      },
      {
        "title": "Prompt caching documentation",
        "publisher": "Anthropic",
        "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
      },
      {
        "title": "Message Batches API",
        "publisher": "Anthropic",
        "url": "https://docs.anthropic.com/en/docs/build-with-claude/batch-processing"
      },
      {
        "title": "PIPEDA in brief",
        "publisher": "Office of the Privacy Commissioner of Canada",
        "url": "https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda_brief/"
      },
      {
        "title": "Guidance on generative AI and privacy",
        "publisher": "Office of the Privacy Commissioner of Canada",
        "url": "https://www.priv.gc.ca/en/privacy-topics/technology/artificial-intelligence/"
      },
      {
        "title": "Ollama — run open-weight models locally",
        "publisher": "Ollama",
        "url": "https://ollama.com/"
      },
      {
        "title": "vLLM — high-throughput inference serving",
        "publisher": "vLLM project",
        "url": "https://docs.vllm.ai/"
      }
    ]
  }
];
