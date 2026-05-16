# 05-10: Implementing Proxmox Firewall Mitigations

## Overview
Proxmox VE includes a built-in firewall that provides a powerful way to protect your virtualized infrastructure. It can be configured at the cluster, node, and VM/container level.

## Firewall Hierarchy
1.  **Cluster Level**: Rules applied across the entire Proxmox cluster.
2.  **Node Level**: Rules specific to an individual physical host.
3.  **VM/Container Level**: Rules applied to a specific guest.

## Key Features
- **Security Groups**: Reusable sets of firewall rules that can be applied to multiple VMs or containers.
- **IP Sets**: Lists of IP addresses or networks that can be used as source or destination in rules.
- **Macros**: Pre-defined rules for common services like SSH, HTTP, and DNS.

## Blocking Malicious IPs
To block a malicious IP address identified during an incident:
1.  **Navigate to Firewall**: In the Proxmox UI, go to the appropriate level (e.g., VM level).
2.  **Add Rule**: Create a new 'In' rule.
3.  **Action**: Set the action to `DROP` or `REJECT`.
4.  **Source**: Enter the malicious IP address.
5.  **Enable**: Ensure the rule is enabled.

## Best Practices
- **Default Drop**: Use a "default drop" policy for incoming traffic and only allow necessary services.
- **Logging**: Enable logging for dropped packets to monitor for ongoing attack attempts.
- **Testing**: Always test new firewall rules to ensure they don't inadvertently block legitimate traffic.
