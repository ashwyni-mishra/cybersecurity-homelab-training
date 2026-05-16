# 02-06: pfSense Interface Assignments

## What is it used for?
Interface assignment is the process of mapping physical (or virtual) network adapters to logical roles within the firewall. In pfSense, this step is used to:
- **Define the Security Boundary**: Determine which interface faces the untrusted "Outside" (WAN) and which faces the trusted "Inside" (LAN).
- **Enable Routing**: Establish the paths through which traffic will flow between different network segments.
- **Initialize Network Services**: Assigning an interface allows pfSense to start listening for DHCP requests, DNS queries, and firewall rule matching on that specific segment.

## Techniques
When assigning interfaces in a virtualized environment, several techniques are employed:

1. **MAC Address Identification**: Correlating the MAC address seen in Proxmox with the one seen in pfSense to ensure the correct bridge is mapped to the correct role.
2. **Dynamic Host Configuration Protocol (DHCP)**: Using DHCP on the WAN interface to automatically obtain an IP from the upstream provider (in this case, the VMware NAT network).
3. **Static IP Assignment**: Manually setting a fixed IP for the LAN interface to ensure it acts as a reliable gateway for internal clients.
4. **Service Scoping**: Defining a range of IP addresses (a DHCP pool) that will be handed out to clients on a specific interface.

## How those techniques are used
In our lab, we apply these techniques during the first-boot configuration:

- **Scenario: Mapping vtnet0**: We assign `vtnet0` to the WAN role. Because `vtnet0` is linked to `vmbr0` (which is bridged to the VMware NAT), pfSense will use DHCP to get an address like `192.168.222.x`.
- **Scenario: Configuring the Gateway**: We assign `vtnet1` to the LAN role and set its static IP to `10.0.1.1/24`. This makes the pfSense VM the "Default Gateway" for all future target VMs on the `vmbr1` segment.
- **Scenario: Automatic Client Setup**: By enabling the DHCP server on the LAN interface with a range of `10.0.1.100 - 10.0.1.200`, any new VM we create (like a Windows or Ubuntu target) will automatically get an IP address and internet access without manual configuration.

## Commands used
These steps are performed using the pfSense text-based console menu after the initial installation.

### Console Menu Options
- **Option 1 (Assign Interfaces)**: Used to map `vtnet0` to WAN and `vtnet1` to LAN.
- **Option 2 (Set interface(s) IP address)**: Used to configure the static IP and DHCP server.

### Example Console Workflow (Option 2)
1. Select **2**.
2. Select **2** (LAN).
3. Enter IP: `10.0.1.1`.
4. Enter Subnet: `24`.
5. Enter Gateway: `[Press Enter for None]`.
6. Enable DHCP: `y`.
7. Start Range: `10.0.1.100`.
8. End Range: `10.0.1.200`.
9. Revert to HTTP: `n`.

## Summary
Correctly assigning interfaces in pfSense is critical for ensuring traffic flows as intended. By mapping `vtnet0` to our external-facing bridge and `vtnet1` to our internal-facing sandbox, we create a clear security boundary. Providing a static IP and DHCP services on the LAN ensures that our internal lab machines are easy to manage and have consistent connectivity.

## Reference links
- [pfSense Documentation: Interface Settings](https://docs.netgate.com/pfsense/en/latest/interfaces/index.html)
- [Netgate: Assigning Interfaces](https://docs.netgate.com/pfsense/en/latest/install/assign-interfaces.html)
- [Understanding DHCP Concepts](https://www.netgear.com/business/hub/blog/what-is-dhcp-and-why-is-it-important/)
- [Proxmox: VirtIO Network Performance](https://pve.proxmox.com/wiki/VirtIO_Network_Driver)

## Next Lesson
[Next Lesson: 02-07 - Configuring NAT and Routing in pfSense](/lessons/module-2/02-07-configuring-nat-and-routing-in-pfsense)
