# 01-05: Creating the Host-Only Network

## What is it used for?
A Host-Only network is a private virtual network that is restricted to the host and the virtual machines connected to it. In this homelab, we use it to create an isolated communication channel between the L1 hypervisor and the L2 hypervisor (Proxmox).

This specific network (VMnet2 in our case) is used for:
- **Internal Lab Transport**: Moving traffic between the attacker machine (Kali) and the lab gateway (Proxmox/pfSense) without it ever leaving the host.
- **Stealth and Security**: Ensuring that scanning tools or exploit traffic cannot be detected or interfered with by external network monitoring tools (like your home ISP router).
- **Static Infrastructure**: Providing a stable network segment where we can manually assign IP addresses without interference from external DHCP servers.

## Techniques
- **Subnetting**: Dividing a large network into smaller, manageable segments (e.g., using `10.0.2.0/24`).
- **DHCP Suppression**: Disabling the hypervisor's built-in DHCP server to prevent it from automatically assigning IPs, allowing us to use our own DHCP server (like pfSense) later.
- **Host Adapter Disconnection**: Removing the virtual interface from the host OS so that even the host machine cannot easily "talk" to the virtual lab, increasing security.
- **Custom VMnet Assignment**: Specifically choosing a non-default VMnet (like VMnet2 instead of VMnet1) to avoid conflicts with existing software.

## How those techniques are used
- **Manual IP Management**: By disabling DHCP, we force ourselves to understand the network topology by manually configuring IPs on our L2 Proxmox node.
- **Air-Gapping (Virtual)**: By unchecking "Connect a host virtual adapter", we effectively air-gap the lab from the host OS while still allowing the VMs to talk to each other.
- **Traffic Redirection**: Later, we will use this Host-Only network as the "WAN" interface for our pfSense firewall, effectively making it the entry point for all lab traffic.

## Commands used

### Windows (PowerShell - Network Verification)
To see all VMware-related network adapters and their status:
```powershell
Get-NetAdapter | Where-Object { $_.InterfaceDescription -like "*VMware*" } | Select-Object Name, Status, LinkSpeed
```

### Linux (Command Line - IP Link)
To see the virtual bridge created for the host-only network:
```bash
ip link show | grep vmnet
```
To check the IP assigned to a specific vmnet interface:
```bash
ip addr show vmnet2
```

### VMware (Virtual Network Editor Settings)
These are the manual steps typically performed in the UI:
1. **Network**: `VMnet2`
2. **Type**: `Host-only`
3. **DHCP**: `Disabled`
4. **Subnet**: `10.0.2.0`
5. **Mask**: `255.255.255.0`

## Summary
The Host-Only network (VMnet2) is the backbone of our lab's internal communication. By disabling DHCP and isolating it from the host OS, we create a clean, predictable environment for our security testing. This ensures that our "dirty" lab traffic stays exactly where it belongs—within the virtual environment.

## Reference links
- [VMware: Configuring Host-Only Networking](https://docs.vmware.com/en/VMware-Workstation-Pro/17/com.vmware.ws.using.doc/GUID-623D7791-ED60-492F-B9E1-E9EB6E1F4D3C.html)
- [TCP/IP Subnetting Basics](https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html)
- [Managing Virtual Networks with `virsh`](https://libvirt.org/manpages/virsh.html#network-commands)
- [Difference between NAT, Bridge and Host-only](https://kb.vmware.com/s/article/1018693)

## Next Lesson
[Next Lesson: 01-06 - Introduction to Proxmox VE](/lessons/module-1/01-06-introduction-to-proxmox-ve)
