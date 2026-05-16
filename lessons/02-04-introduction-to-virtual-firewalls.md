# 02-04: Introduction to Virtual Firewalls

## Overview
A virtual firewall is a software-based security appliance that provides the same functionality as a physical firewall (packet filtering, stateful inspection, NAT, VPN) within a virtualized environment.

## Importance in Lab Environments
In a cybersecurity lab, a virtual firewall serves as the "Gatekeeper" and "Orchestrator" of network traffic:

1.  **Network Segmentation**: Divides the lab into distinct security zones (WAN, LAN, DMZ, Management).
2.  **Traffic Control**: Allows for the implementation of strict Access Control Lists (ACLs) to simulate real-world security constraints.
3.  **Logging and Monitoring**: Provides a centralized point to observe traffic patterns, identify successful breaches, and analyze lateral movement.
4.  **Gateway Services**: Handles DHCP for target networks, DNS resolution, and Network Address Translation (NAT).

## Deployment Strategy
In this architecture, pfSense is deployed as a Level 3 (L3) guest VM within Proxmox. It will sit between the management bridge (`vmbr0`) and the isolated sandbox (`vmbr1`), controlling all flow between the "outside" world and the "inside" targets.
