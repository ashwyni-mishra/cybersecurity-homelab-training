# 05-08: Detecting Nmap Scans in Wazuh

## What is it used for?
Detecting Nmap scans is a critical defensive capability that allows security teams to identify the "reconnaissance" phase of an attack. By identifying when an adversary is mapping your network, you can take proactive measures to block them before they find a vulnerable entry point.

In our lab, this is used to:
- **Monitor Network Perimeter**: Identify unauthorized entities attempting to discover services on your target VMs.
- **Validate Log Collection**: Ensure that Wazuh agents are correctly forwarding relevant system and security logs to the manager.
- **Test Alerting Logic**: Verify that Wazuh's correlation engine is correctly identifying scanning patterns rather than just individual log entries.
- **Practice Incident Response**: Provide a realistic trigger for defensive actions, such as firewall rule updates or IP shunning.

## Techniques
- **Log Correlation**: Grouping multiple events (like failed connection attempts) that occur within a short time frame from the same source.
- **Signature Matching**: Identifying specific "fingerprints" in traffic or logs that are characteristic of Nmap's default behavior (e.g., specific TCP flag combinations).
- **Frequency Analysis**: Monitoring for a high volume of events directed at multiple ports in a rapid sequence.
- **Decoders and Rules**: Using specialized regex-based decoders to extract data from raw logs and matching them against a hierarchical rule set.
- **Active Response**: Automatically triggering a script (like an `iptables` block) when a high-severity scanning alert is generated.

## How those techniques are used
- **Wazuh Agent Deployment**: Installing the Wazuh agent on target machines (Ubuntu LXC, Windows VM) to monitor local logs.
- **Syslog Integration**: Configuring the Proxmox firewall or pfSense to send logs to the Wazuh manager.
- **Alert Tuning**: Adjusting the `level` and `frequency` of rules (like Rule 40601) to reduce false positives from internal monitoring tools.
- **Dashboard Visualization**: Using the Wazuh Indexer and Dashboard to visualize scan trends, most-targeted ports, and top source IPs.

## Commands used

### Triggering a Scan (from Kali)
To test detection, run an aggressive scan:
```bash
nmap -A -T4 10.0.1.20
```

### Checking Wazuh Alerts (Wazuh Manager Shell)
To view alerts in real-time from the command line:
```bash
tail -f /var/ossec/logs/alerts/alerts.json | grep -i "nmap"
```

### Restarting Wazuh Manager (to apply rule changes)
```bash
systemctl restart wazuh-manager
```

### Viewing Agent Connection Status
```bash
/var/ossec/bin/agent_control -l
```

## Summary
The ability to detect Nmap scans transforms your homelab from a static set of VMs into an active, monitored environment. By leveraging Wazuh's pre-defined rules and correlation engine, you gain visibility into the very first steps an attacker takes. This exercise demonstrates the power of centralized logging and the importance of early detection in the cyber kill chain.

## Reference links
- [Wazuh Documentation: Detecting Scans](https://documentation.wazuh.com/current/user-manual/capabilities/log-data-collection/index.html)
- [Nmap Reference Guide: Detection and Evasion](https://nmap.org/book/man-bypass-firewalls-ids.html)
- [MITRE ATT&CK: Network Service Scanning (T1595.001)](https://attack.mitre.org/techniques/T1595/001/)
- [Wazuh Ruleset GitHub Repository](https://github.com/wazuh/wazuh/tree/master/ruleset)

## Next Lesson
[Next Lesson: 05-09 - Detecting Web Attacks in Logs](/lessons/module-5/05-09-detecting-web-attacks-in-logs)
