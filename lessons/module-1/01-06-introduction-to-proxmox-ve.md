# 01-06: Introduction to Proxmox VE

## What is it used for?
Proxmox Virtual Environment (VE) is an open-source enterprise-grade virtualization platform. It is a Type-1 (bare-metal) hypervisor based on Debian Linux that combines two virtualization technologies: KVM for full virtual machines and LXC for lightweight containers.

In our homelab, Proxmox is used for:
- **Centralized Lab Management**: Providing a single web interface to manage dozens of virtual machines and containers.
- **Enterprise Simulation**: Learning how to use a platform that is actually used in production data centers.
- **Resource Efficiency**: Using LXC containers to run services (like databases or web servers) with very little overhead compared to full VMs.
- **Nested Hosting (L2)**: Acting as the second layer in our hierarchy, where it manages the actual "targets" of our security testing.

## Techniques
- **KVM (Kernel-based Virtual Machine)**: Used for full virtualization where the guest OS (like Windows) is unaware it is being virtualized.
- **LXC (Linux Containers)**: Sharing the host kernel to run isolated Linux environments, which is much faster and uses less RAM than full VMs.
- **Software-Defined Networking (SDN)**: Creating virtual bridges (`vmbr0`, `vmbr1`) and VLANs within the Proxmox software to route traffic between guests.
- **Web-Based Management**: Using a standard web browser (on port 8006) to perform all administrative tasks rather than relying on the command line.
- **Storage Abstraction**: Managing ISOs, disk images, and backups across various storage types (Local, NFS, ZFS).

## How those techniques are used
- **Deploying a Vulnerable Web App**: A user downloads an Ubuntu LXC template and quickly spins up a container to host a vulnerable application (like DVWA).
- **Snapshotting Before an Exploit**: Before running a dangerous exploit against a Windows VM, the user takes a "Snapshot" in Proxmox, allowing them to revert if the OS crashes.
- **Network Segmentation**: Creating a dedicated bridge (`vmbr1`) in Proxmox to act as an "isolated sandbox" for malicious files.
- **API Automation**: Using the Proxmox API to programmatically spin up new lab environments for automated security scanning.

## Commands used

### Basic Service Management (On the Proxmox Host)
To check the status of the Proxmox management service:
```bash
systemctl status pveproxy
```

To list all running virtual machines:
```bash
qm list
```

To list all running containers:
```bash
pct list
```

### Network Information
To view the network configuration from the CLI:
```bash
ip addr show
```
Or to see the bridge configuration:
```bash
brctl show
```

### GUI Access
Accessing the management interface from your host (L0):
- **URL**: `https://<proxmox-ip>:8006`
- **Default Username**: `root`
- **Default Realm**: `Linux PAM standard authentication`

## Summary
Proxmox VE is the "brain" of our nested lab. By integrating KVM and LXC into a single, easy-to-use web interface, it allows us to manage complex security scenarios with ease. In our setup, it sits at Level 2, providing the perfect environment to host our vulnerable targets while mirroring real-world enterprise infrastructure.

## Reference links
- [Proxmox VE Official Documentation](https://pve.proxmox.com/pve-docs/)
- [Proxmox VE Wiki: Main Page](https://pve.proxmox.com/wiki/Main_Page)
- [Comparison: KVM vs LXC](https://pve.proxmox.com/wiki/Linux_Container)
- [Proxmox VE API Viewer](https://pve.proxmox.com/pve-docs/api-viewer/index.html)
