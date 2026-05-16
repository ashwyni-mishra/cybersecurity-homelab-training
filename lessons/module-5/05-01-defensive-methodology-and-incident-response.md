# 05-01: Defensive Methodology and Incident Response

## What is it used for?
Defensive methodology provides a structured approach to securing an environment and responding to security incidents. Instead of reacting randomly to threats, it establishes a framework based on three core pillars:
1.  **Prevention**: Proactive measures to stop attacks before they happen (e.g., hardening, firewalls, patching).
2.  **Detection**: Identifying security breaches as they occur (e.g., SIEM, IDS/IPS, logging).
3.  **Response**: Actions taken to mitigate, contain, and recover from an attack once it has been identified.

The goal is to minimize the "dwell time" of an attacker and ensure the resilience and continuity of the organization's assets.

## Techniques
### PICERL Incident Response Life Cycle
Developed by SANS, this is the industry-standard methodology for handling security incidents:
*   **Preparation**: Establishing tools, policies, and a team (SOC/CSIRT) before an incident occurs.
*   **Identification**: Analyzing logs, alerts, and system behavior to confirm a security event.
*   **Containment**: Limiting the damage and preventing the threat from spreading (Short-term and Long-term).
*   **Eradication**: Identifying and removing the root cause of the incident (e.g., deleting malware, closing backdoors).
*   **Recovery**: Restoring systems to normal operation and monitoring for signs of re-infection.
*   **Lessons Learned**: A post-incident review to document findings and improve future defenses.

### Defense-in-Depth
This technique involves layering multiple security controls so that if one layer fails, others remain to protect the system. Layers include:
*   **Network Layer**: Firewalls, VLANs, and Network Intrusion Detection Systems (NIDS).
*   **Host Layer**: Operating system hardening, Endpoint Detection and Response (EDR), and local logging.
*   **Application Layer**: Web Application Firewalls (WAF), input validation, and secure coding practices.
*   **Data Layer**: Encryption at rest and in transit, and strict Access Control Lists (ACLs).

## How those techniques are used
In a homelab or enterprise environment, these techniques are applied practically:
*   **Preparation**: Configuring your pfSense firewall, deploying a Wazuh manager, and ensuring all nodes are sending logs before starting any offensive exercises.
*   **Identification**: Monitoring the Wazuh dashboard for high-severity alerts when running Nmap or Metasploit from your Kali Linux VM.
*   **Containment**: Using Proxmox to "unplug" a virtual network cable from a compromised VM or using pfSense to block all traffic from a specific subnet.
*   **Defense-in-Depth**: Combining pfSense rules (Network), Syslog monitoring (Host), and Proxmox firewalling to create multiple hurdles for an attacker attempting to move laterally.

## Commands used
While methodology is largely conceptual, several commands and UI actions are essential during the Identification and Containment phases:

**Checking System Integrity (Identification):**
```bash
# Check the status of security and logging services
systemctl status wazuh-agent
systemctl status rsyslog

# Monitor authentication logs in real-time
tail -f /var/log/auth.log

# List active network connections to identify suspicious traffic
ss -tulpn
```

**Network Isolation (Containment):**
*   **Proxmox UI**: Navigate to `VM -> Hardware -> Network Device`, and uncheck the **Connected** box to instantly isolate the VM.
*   **pfSense UI**: Go to `Firewall -> Rules`, and create a top-level "Block All" rule for the specific interface (e.g., DMZ) where the incident is occurring.

## Summary
Defensive security is more than just installing software; it is about following a repeatable, structured methodology. By mastering the PICERL cycle and implementing a Defense-in-Depth strategy, you move from a reactive posture to a proactive one. This lesson establishes the framework for all the technical monitoring and mitigation steps that follow in this module.

## Reference links
- [SANS: Incident Handler's Handbook](https://www.sans.org/white-papers/33901/)
- [NIST: Computer Security Incident Handling Guide](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf)
- [CISA: Incident Response Training](https://www.cisa.gov/incident-response-training-guides)
- [MITRE ATT&CK: Defend Tactics](https://d3fend.mitre.org/)
