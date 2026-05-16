# 05-05: Introduction to SIEM Systems

## What is it used for?
Security Information and Event Management (SIEM) systems provide a holistic, centralized view of an organization's IT security posture. A SIEM is primarily used for:
*   **Data Aggregation**: Centralizing logs from thousands of endpoints, firewalls, and applications into one searchable database.
*   **Threat Detection**: Identifying suspicious activities that might go unnoticed if looking at a single system's isolated logs.
*   **Incident Investigation**: Providing a "single pane of glass" for analysts to search historical data during a breach to determine the root cause.
*   **Compliance and Auditing**: Storing logs securely long-term to meet regulatory requirements (e.g., PCI-DSS, HIPAA) and automatically generating audit reports.

## Techniques
### Log Normalization
Because different systems format logs differently (e.g., Windows XML Event Logs vs. Linux plain-text Syslog), a SIEM uses parsers (or decoders) to extract variables and normalize data into a common schema. This allows an analyst to search for `source_ip` regardless of whether the log originated from a Cisco router or an Apache web server.

### Event Correlation
Correlation is the core intelligence of a SIEM. It uses rules to logically link seemingly unrelated events across time and space. For example, a correlation rule might trigger an alert if it observes: 10 failed logins on a VPN (from firewall logs) followed immediately by a successful login, followed by an unusual, high-volume database extraction (from SQL server logs).

### Automated Alerting
When a correlation rule matches, the SIEM generates an alert, assigns it a severity level, and routes it to the Security Operations Center (SOC) dashboard, or integrates with tools like PagerDuty or Slack to notify analysts immediately.

## How those techniques are used
*   **Detecting "Impossible Travel"**: A SIEM normalizes authentication logs and correlates a user logging in from New York and, 5 minutes later, the same user logging in from Tokyo. It flags this as physically impossible and alerts on a compromised credential.
*   **Malware Outbreak Detection**: The SIEM aggregates logs from Endpoint Detection and Response (EDR) agents across all workstations. If 50 machines suddenly report "malware blocked" within a 60-second window, the SIEM escalates this from individual events to a high-severity, network-wide incident.
*   **Reporting**: Automatically generating a monthly PDF report showing all blocked inbound attacks from the pfSense firewall to demonstrate the value of the security infrastructure to management.

## Commands used
While SIEMs are heavily GUI-based, analysts must use specific Query Languages (like KQL for Elastic/Wazuh, or SPL for Splunk) to search the normalized data effectively.

**Example Queries (KQL - Kibana Query Language):**
```text
# Search for failed logins specifically for the root user
rule.description: *login failed* AND data.dstuser: "root"

# Find successful SSH logins originating from outside the local management subnet
rule.groups: "sshd" AND rule.description: *success* AND NOT data.srcip: "192.168.1.0/24"

# Search for execution of a specific malicious payload
data.command: "nc -e /bin/bash"
```

**System Architecture Concepts:**
*   **Ingestion**: SIEMs ingest data via localized agents (like `wazuh-agent`) or via standard network protocols (like sending `rsyslog` over UDP port 514).
*   **Storage Backend**: Most modern SIEMs utilize a NoSQL database engine (like Elasticsearch or OpenSearch) under the hood to index the massive volume of text data quickly and efficiently.

## Summary
A SIEM is the brain of the Security Operations Center. It transforms raw, noisy log data from hundreds of disparate sources into actionable, prioritized alerts through the magic of normalization and correlation. Understanding how a SIEM processes data is the essential prerequisite to deploying and tuning Wazuh in the subsequent lessons.

## Reference links
- [Wazuh SIEM Official Documentation](https://documentation.wazuh.com/current/index.html)
- [Gartner SIEM Guide](https://www.gartner.com/en/information-technology/glossary/security-information-and-event-management-siem)
- [Elastic Security Overview](https://www.elastic.co/security)
- [Splunk: What is SIEM?](https://www.splunk.com/en_us/data-insider/what-is-siem.html)
