# Curriculum Index

Welcome to the CyberHomelab curriculum. This course is structured as a progressive journey, moving from fundamental infrastructure setup to advanced security operations.

---

## Module 1: Host Infrastructure
**Objective**: Build the foundational hypervisor environment and prepare the host system for nested virtualization.

- **Foundations**: Learn the principles of nested virtualization and BIOS optimization.
- **Primary Setup**: Install and configure VMware Workstation as the host hypervisor.
- **Nested Deployment**: Deploy Proxmox VE as a virtualized node and prepare Kali Linux.

[Begin Module 1 →](/lessons/01-01-introduction-to-nested-virtualization)

---

## Module 2: Network Segregation
**Objective**: Establish a secure, isolated network topology to contain all lab traffic.

- **Virtual Bridging**: Master the configuration of Proxmox Linux bridges (`vmbr`).
- **Firewall Integration**: Deploy pfSense as the gateway between your offensive and target networks.
- **Traffic Control**: Implement NAT, routing, and custom firewall rules.

[Begin Module 2 →](/lessons/02-01-proxmox-virtual-bridges-explained)

---

## Module 3: Target Provisioning
**Objective**: Populate the lab with a diverse range of vulnerable targets and enterprise services.

- **Containerization**: Deploy lightweight targets using Linux Containers (LXC).
- **Vulnerable Apps**: Host DVWA and OWASP Juice Shop via Docker Compose.
- **Windows AD**: Build a vulnerable Active Directory domain for advanced exploitation testing.

[Begin Module 3 →](/lessons/03-01-linux-containers-lxc-fundamentals)

---

## Module 4: Offensive Operations
**Objective**: Master the methodology of penetration testing and vulnerability research.

- **Reconnaissance**: Practice passive and active network discovery techniques.
- **Vulnerability Scanning**: Use enterprise-grade tools to identify security weaknesses.
- **Exploitation**: Gain initial access and establish reverse shells using various tactics.

[Begin Module 4 →](/lessons/04-01-offensive-methodology-overview)

---

## Module 5: Defensive Security
**Objective**: Implement monitoring, detection, and mitigation strategies to protect the network.

- **Logging and SIEM**: Deploy Wazuh and configure host-based logging.
- **Traffic Analysis**: Analyze network captures using tcpdump and Wireshark.
- **Incident Response**: Practice the PICERL cycle and implement Proxmox firewall mitigations.

[Begin Module 5 →](/lessons/05-01-defensive-methodology-and-incident-response)
