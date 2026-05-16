# 05-08: Detecting Nmap Scans in Wazuh

## Overview
Reconnaissance is the first stage of most attacks. Detecting tools like Nmap early can prevent a full-scale breach. Wazuh uses log correlation and pre-defined rules to identify scanning activity.

## How Nmap is Logged
- **System Logs**: Failed connection attempts logged by the kernel or firewall.
- **Application Logs**: Unusual connection patterns in web servers or SSH services.
- **Wazuh Decoders**: Wazuh parses these logs to extract IPs, ports, and protocols.

## Wazuh Rules for Scanning
Wazuh includes several rules to detect common scanning techniques:
- **Rule 40601**: Port scanning detected.
- **Rule 40101**: Multiple failed SSH login attempts.
- **Rule 31101**: Web server 404 error (often indicative of directory brute-forcing).

## Analyzing Alerts
When a scan occurs, Wazuh generates an alert. Analysts should examine:
- **Source IP**: Where is the scan originating from?
- **Target Ports**: What services are being targeted?
- **Frequency**: Is it a slow, stealthy scan or a fast, aggressive one?
- **IP Reputation**: Does the source IP have a known bad reputation?

## Response Actions
Once a scan is detected, automated or manual actions can be taken, such as blocking the source IP at the firewall or isolating the targeted system for further investigation.
