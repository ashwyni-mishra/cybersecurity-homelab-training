# 04-01: Offensive Methodology Overview

## What is it used for?
Offensive methodology provides a structured framework for conducting security assessments, penetration tests, and red team operations. It is used to ensure that security professionals approach a target systematically, minimizing the risk of missing critical vulnerabilities and ensuring that all activities are documented, repeatable, and legally compliant. By following a proven methodology, practitioners can transform a chaotic "hacking" attempt into a disciplined, professional security audit that provides clear value to an organization.

## Techniques
Several industry-standard frameworks define offensive methodologies:
1.  **The Cyber Kill Chain (Lockheed Martin)**: Focuses on the steps an adversary must take to achieve their objective, emphasizing the detection and disruption of attacks.
2.  **PTES (Penetration Testing Execution Standard)**: A comprehensive standard covering the entire lifecycle of a penetration test, from initial engagement to final reporting.
3.  **MITRE ATT&CK Framework**: A globally accessible knowledge base of adversary tactics and techniques based on real-world observations.
4.  **OWASP Testing Guide**: Specifically focused on web application security testing.

## How those techniques are used
In a practical lab or professional environment, these methodologies are applied in phases:
-   **Pre-engagement & Scoping**: Establishing the "Rules of Engagement" (RoE), defining what is in-scope and out-of-scope, and obtaining legal authorization.
-   **Intelligence Gathering (Reconnaissance)**: Using OSINT and active scanning to map the target's attack surface.
-   **Vulnerability Analysis**: Analyzing gathered data to identify potential weaknesses, such as misconfigurations or unpatched software.
-   **Exploitation**: Safely attempting to bypass security controls by leveraging identified vulnerabilities to gain unauthorized access.
-   **Post-Exploitation**: Determining the value of the compromised system, maintaining persistence, and attempting lateral movement within the network.
-   **Reporting**: Documenting every finding, its risk level, and providing clear remediation steps for the client.

## Commands used
While "methodology" is a conceptual framework, it is supported by specific tools and documentation practices:
-   **Documentation**: Using tools like CherryTree, Obsidian, or Notion to track progress.
-   **Project Management**: Creating checklists based on PTES or OWASP.
-   **Scanning/Enumeration**: Initial commands often include:
    ```bash
    # Basic network discovery (detailed in 04-03)
    nmap -sn 10.0.0.0/24 
    ```
-   **Engagement Planning**: Reviewing the scope document:
    ```text
    Scope: 192.168.50.0/24
    Excluded: 192.168.50.1 (Gateway)
    Allowed Hours: 08:00 - 17:00
    ```

## Summary
The Offensive Methodology Overview teaches that professional security testing is a disciplined process rather than a random series of attacks. By adhering to frameworks like PTES or the Cyber Kill Chain, practitioners ensure thorough coverage of the target environment, maintain ethical and legal boundaries, and provide actionable results that improve an organization's overall security posture.

## Reference links
- [MITRE ATT&CK: Enterprise Matrix](https://attack.mitre.org/matrices/enterprise/)
- [PTES Technical Guide](http://www.pentest-standard.org/index.php/PTES_Technical_Guideline)
- [Lockheed Martin: Cyber Kill Chain](https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
