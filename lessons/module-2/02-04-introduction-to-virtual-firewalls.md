# 02-04: Introduction to Virtual Firewalls

## What is it used for?
A virtual firewall is a software-defined security appliance that provides the same functionality as a physical firewall—packet filtering, stateful inspection, NAT, and VPN—but within a virtualized environment.

In our lab, a virtual firewall is used for:
- **Gatekeeping**: Acting as the primary entry and exit point for all network traffic within the virtual environment.
- **Traffic Orchestration**: Routing packets between different virtual network segments (e.g., WAN, LAN, DMZ).
- **Security Enforcement**: Implementing firewall rules to block or allow specific ports, protocols, and IP addresses.
- **Service Provisioning**: Running essential network services like DHCP, DNS, and NTP for the guest machines.

## Techniques
Virtual firewalls employ several key techniques to protect and manage networks:

1. **Stateful Packet Inspection (SPI)**: Keeping track of the state of network connections (e.g., TCP handshakes) to ensure that incoming packets match a legitimate outgoing request.
2. **Network Address Translation (NAT)**: Mapping multiple internal private IP addresses to a single public or external IP, effectively hiding the internal network structure.
3. **Zone-Based Security**: Categorizing network interfaces into security zones (e.g., WAN, LAN, DMZ) and applying policies based on the source and destination zones.
4. **Deep Packet Inspection (DPI)**: Inspecting the data part of a packet to detect malware, intrusions, or non-compliance with protocols (often used in Next-Gen Firewalls).
5. **Multi-homing**: Connecting a single virtual appliance to multiple virtual bridges (NICs) to facilitate routing between isolated segments.

## How those techniques are used
In our cybersecurity lab, we use these techniques to simulate a corporate network environment:

- **Scenario: Protecting the DMZ**: We use zone-based security to isolate the OWASP Juice Shop and DVWA servers into a "DMZ" zone. Rules are set so that the DMZ can only be reached on HTTP (port 80) and HTTPS (port 443).
- **Scenario: Hiding Target Infrastructure**: We use NAT so that all traffic leaving the lab appears to come from the pfSense WAN IP. This prevents external networks from seeing the private IP scheme of our targets.
- **Scenario: Access Control**: We implement rules on the "Offensive" interface to prevent the attacker from reaching the Proxmox management interface, ensuring that a compromised attacker VM doesn't lead to a total host takeover.

## Commands used
While pfSense is primarily configured via a web interface, the initial setup and troubleshooting often happen at the console.

### Common pfSense Console Operations
```text
1) Assign Interfaces
2) Set interface(s) IP address
3) Reset webConfigurator password
4) Reset to factory defaults
8) Shell
11) Restart webConfigurator
```

### Checking Firewall State via Shell
```bash
# View current firewall rules (pf rules)
pfctl -sr

# View current NAT rules
pfctl -sn

# Check interface status
ifconfig
```

## Summary
Virtual firewalls like pfSense are the heart of a secure and realistic homelab. They allow us to segment our network, control traffic flow, and provide essential services while simulating the security boundaries found in production environments. By understanding how to bridge these firewalls across multiple virtual segments, we can create complex, multi-tiered topologies.

## Reference links
- [pfSense Documentation: Overview](https://docs.netgate.com/pfsense/en/latest/index.html)
- [Cisco: What is a Firewall?](https://www.cisco.com/c/en/us/products/security/firewalls/what-is-a-firewall.html)
- [Proxmox VE: Using pfSense as a Virtual Firewall](https://pve.proxmox.com/wiki/PfSense_Guest_Notes)
- [NIST: Guidelines on Firewalls and Firewall Policy](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-41r1.pdf)
