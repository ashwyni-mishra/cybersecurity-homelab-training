# 05-10: Implementing Proxmox Firewall Mitigations

## What is it used for?
Implementing firewall mitigations in Proxmox VE is the process of using the built-in, distributed firewall to protect virtual machines and containers at the hypervisor level. Unlike a traditional software firewall inside a VM, the Proxmox firewall sits at the virtual bridge, making it much harder for an attacker to bypass even if they gain root access to the guest.

This is used for:
- **Defense-in-Depth**: Adding a second layer of network security behind the primary pfSense firewall.
- **Micro-segmentation**: Isolating individual containers or VMs from each other, even if they are on the same virtual network segment.
- **Incident Response**: Rapidly blocking a confirmed malicious IP address across the entire cluster without needing to touch individual VM configurations.
- **Resource Protection**: Preventing compromised VMs from launching outbound attacks on other parts of your network.

## Techniques
- **Hierarchical Rule Enforcement**: Applying rules at the Datacenter (cluster), Node (host), or NIC (VM) levels.
- **Security Grouping**: Creating a standardized "Web Server" or "Database" security profile that can be instantly applied to any new VM.
- **IP Set Management**: Maintaining dynamic lists of "Blocked IPs" or "Admin IPs" that are referenced by multiple rules.
- **Stateful Packet Inspection (SPI)**: Automatically allowing return traffic for established connections while blocking unsolicited inbound requests.
- **Logging and Monitoring**: Forwarding firewall drop/reject logs to a SIEM like Wazuh for centralized analysis.

## How those techniques are used
- **Emergency Blocking**: When Wazuh alerts on a brute-force attack from a specific IP, a `DROP` rule is added to the "Datacenter" firewall to block that IP from the entire lab.
- **Service Isolation**: Creating a rule that only allows the "Offensive" network (Kali) to reach the "DMZ" on specific ports (80, 443), while blocking all other internal traffic.
- **Macro Application**: Using pre-defined Proxmox macros (like `SSH` or `HTTP`) to quickly configure common services without needing to remember port numbers.
- **Interface-Specific Rules**: Applying different rules to a VM's management interface versus its public-facing interface.

## Commands used

### Enabling the Firewall via CLI
```bash
pve-firewall start
```

### Checking Firewall Status
```bash
pve-firewall status
```

### Listing Current Rules for a VM (e.g., VMID 100)
```bash
cat /etc/pve/firewall/100.fw
```

### Manually Adding a Block Rule (Editing config)
```bash
# In /etc/pve/firewall/100.fw
[RULES]
IN DROP -source 10.0.2.5 -log nolog
```

### Viewing Firewall Logs
```bash
tail -f /var/log/pve-firewall.log
```

## Summary
The Proxmox firewall is a powerful, enterprise-grade tool that provides granular control over your lab's network security. By moving beyond simple "Allow/Deny" rules and embracing micro-segmentation and security groups, you can build a resilient architecture that can withstand and contain modern cyber attacks. This final lesson ties together the offensive and defensive concepts explored throughout the course, demonstrating the practical application of a layered defense strategy.

## Reference links
- [Proxmox VE Documentation: Firewall](https://pve.proxmox.com/pve-docs/pve-firewall.html)
- [Proxmox Wiki: Firewall Examples](https://pve.proxmox.com/wiki/Firewall)
- [Netfilter/IPTables: The engine behind Proxmox Firewall](https://www.netfilter.org/)
- [NIST: Guidelines on Firewalls and Firewall Policy (SP 800-41)](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-41r1.pdf)
