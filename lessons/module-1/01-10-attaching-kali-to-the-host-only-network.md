# 01-10: Attaching Kali to the Host-Only Network

## What is it used for?
Attaching the Kali Linux virtual machine to the Host-Only network is a critical step in isolating your offensive lab from your home network and the internet. This ensures that any "dirty" traffic, exploit attempts, or malware analysis performed within the lab environment stays contained. 

In this lab, it specifically:
- **Establishes the Offensive Path**: Allows Kali to communicate with the pfSense WAN interface (once deployed), which acts as the gateway to the rest of the nested lab.
- **Prevents Accidental Leaks**: Ensures that tools like Nmap or Metasploit don't accidentally scan or target devices on your actual physical network.
- **Enforces Controlled Connectivity**: Forces all traffic through the lab's firewall, allowing you to practice realistic network-based attacks and monitoring.

## Techniques
- **Network Interface Reassignment**: Moving a virtual network interface card (vNIC) from one virtual switch (NAT/Bridged) to another (Host-Only).
- **Interface State Management**: Bringing network interfaces up or down to apply configuration changes.
- **Address Verification**: Using system tools to confirm that the hardware change has been recognized by the guest operating system.
- **Isolation Verification**: Testing for the absence of external connectivity to confirm the Host-Only status.

## How those techniques are used
- **Virtual Switch Selection**: In your hypervisor (VMware, VirtualBox, or Proxmox), you select the specific "Host-Only" or "Custom" network segment (e.g., VMnet2 or vboxnet0) that was designated for the lab's "Dirty Pipe".
- **Hardware Hot-Plugging**: While some hypervisors allow changing networks while the VM is running, it is best practice to shut down the VM to ensure the virtual hardware change is cleanly registered.
- **IP Assignment Strategy**: At this stage, we verify that the interface exists. In later modules, we will either assign a static IP or wait for the pfSense DHCP service to provide one.

## Commands used

### Check Network Interface Status
To list all available network interfaces and their current status:
```bash
ip addr show
```
or the shorter version:
```bash
ip a
```

### Bring an Interface Up/Down
If the interface doesn't appear active after the hardware change:
```bash
sudo ip link set eth0 up
```

### Testing Connectivity (Should fail for internet)
To verify isolation by attempting to ping a public DNS server:
```bash
ping -c 4 8.8.8.8
```

### Checking for Lease Information (Later usage)
To see if the interface has received an IP from a DHCP server:
```bash
nmcli device show eth0
```

## Summary
By moving Kali Linux to the Host-Only network, we have successfully established the "Attacker Side" of our lab environment. The VM is now isolated from the internet and ready to be connected to the pfSense firewall. This setup provides a safe, contained playground where you can experiment with offensive techniques without risking your production environment or violating ISP terms of service.

## Reference links
- [VMware: Configuring Host-Only Networking](https://docs.vmware.com/en/VMware-Workstation-Pro/17/com.vmware.ws.using.doc/GUID-E6AB1782-BC10-4A63-8991-A9E01511218F.html)
- [VirtualBox: Host-Only Networking](https://www.virtualbox.org/manual/ch06.html#network_hostonly)
- [Kali Linux: Network Configuration](https://www.kali.org/docs/networking/basic-network-configuration/)
- [NIST: Guide to Malware Incident Prevention and Handling (SP 800-83)](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-83r1.pdf)
