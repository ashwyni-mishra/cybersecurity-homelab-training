# 01-04: Virtual Network Configuration

## What is it used for?
Virtual network configuration is used to define how virtual machines communicate with each other, the host system, and the external internet. In a cybersecurity lab, it is crucial to segment traffic to prevent accidental exposure of the host network to potentially "dirty" lab traffic (malware, scans, exploits).

Proper network configuration allows us to:
- **Isolate Lab Traffic**: Creating a "sandbox" where exploits can be tested without affecting the home network.
- **Simulate Real-World Architectures**: Mimicking DMZs, internal corporate networks, and public-facing segments.
- **Provide Internet Access Safely**: Using NAT (Network Address Translation) to allow lab updates while blocking inbound threats from the internet.
- **Enable Management Access**: Allowing the host (L0) to manage the nested hypervisor (L2) through a dedicated management network.

## Techniques
- **NAT (Network Address Translation)**: The VM shares the host's IP address. It can access the internet, but the internet cannot access the VM directly.
- **Bridged Networking**: The VM appears as a unique physical device on your local home network (it gets an IP from your home router).
- **Host-Only Networking**: The VM can only communicate with the host and other VMs on the same host-only network. It has no external internet access.
- **Isolated / Internal Networking**: Similar to Host-Only, but the VM cannot even communicate with the host. It only sees other VMs on the same virtual switch.
- **DHCP Management**: Choosing whether the hypervisor provides IP addresses automatically or if you will manage them manually (static) or via a virtual firewall (pfSense).

## How those techniques are used
- **Management Interface**: We use NAT or a Host-Only adapter to connect to the Proxmox (L2) web interface from our physical host (L0).
- **Isolated Lab Environment**: We use an Isolated network (e.g., `VMnet2`) for our vulnerable targets. This ensures that even if a target is compromised, the attacker cannot reach the host or the internet.
- **Service Hosting**: Using Bridged networking if you want your lab services (like a test web server) to be accessible from other physical devices in your house.

## Commands used

### VMware (Virtual Network Editor - Windows/Linux)
While mostly GUI-based, you can manage networking via the `vmnet-cfg` tool on Linux or by editing `vnetlib.exe` parameters on Windows.
- **Open Editor (Linux)**:
  ```bash
  sudo vmware-netcfg
  ```

### Linux (Libvirt/KVM CLI)
To list virtual networks:
```bash
virsh net-list --all
```

To create a new network from an XML definition:
```bash
virsh net-define my-isolated-network.xml
virsh net-start my-isolated-network
virsh net-autostart my-isolated-network
```

Example XML for an isolated network (`isolated.xml`):
```xml
<network>
  <name>isolated</name>
  <bridge name='virbr1' stp='on' delay='0'/>
  <ip address='192.168.100.1' netmask='255.255.255.0'>
  </ip>
</network>
```

### Windows (PowerShell - Hyper-V Networking)
To create a new internal switch:
```powershell
New-VMSwitch -Name "LabIsolated" -SwitchType Internal
```

## Summary
Network configuration is the "glue" of your virtual lab. By understanding the differences between NAT, Bridged, and Host-Only networking, you can build a lab that is both functional and secure. The Virtual Network Editor (or its equivalents in KVM/VirtualBox) is the primary tool for carving out these virtual communication paths.

## Reference links
- [VMware: Understanding Virtual Networking](https://docs.vmware.com/en/VMware-Workstation-Pro/17/com.vmware.ws.using.doc/GUID-D9B0A334-C029-4C25-BF42-186036AD26E8.html)
- [Proxmox VE: Network Configuration Guide](https://pve.proxmox.com/wiki/Network_Configuration)
- [VirtualBox: Virtual Networking Modes](https://www.virtualbox.org/manual/ch06.html)
- [Libvirt: Virtual Networking Documentation](https://libvirt.org/formatnetwork.html)
