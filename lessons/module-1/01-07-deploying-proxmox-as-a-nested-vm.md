# 01-07: Deploying Proxmox as a Nested VM

## What is it used for?
Deploying Proxmox as a nested VM is a technique used to create a "lab within a lab." While Proxmox is designed to be installed on physical hardware, installing it as a VM inside a primary hypervisor (like VMware) allows us to test enterprise-grade virtualization features on a single desktop or laptop.

This deployment is used for:
- **Scaling Hardware**: Running an entire data center worth of VMs on a single powerful physical machine.
- **Testing Cluster Features**: Deploying multiple Proxmox nodes as VMs to test high-availability and clustering without buying multiple servers.
- **Easy Reset and Portability**: Exporting the entire Proxmox VM to another computer or reverting it to a clean state if a lab experiment goes wrong.
- **Security Research**: Creating a multi-layered barrier between a guest (L3) and the physical host (L0).

## Techniques
- **Nested Hardware Virtualization Passthrough**: The critical technique of allowing the L1 hypervisor to "pass through" the CPU's VT-x or AMD-V instructions to the L2 guest.
- **IOMMU Passthrough**: Virtualizing the I/O Memory Management Unit to allow the nested hypervisor to manage its own virtual PCI devices.
- **Promiscuous Mode Networking**: Configuring virtual switches to allow multiple MAC addresses on a single port, which is often required for nested traffic to flow correctly.
- **Resource Overcommitment**: Allocating more virtual resources (vCPUs, RAM) to the nested hypervisor than might be strictly available, relying on the hypervisor to manage the load.

## How those techniques are used
- **Enabling Acceleration**: In VMware, checking the "Virtualize Intel VT-x/EPT" box allows the Proxmox installer to detect KVM support. Without this, Proxmox will only allow slow software emulation.
- **Assigning Multiple NICs**: Adding two virtual network adapters to the Proxmox VM: one for management (NAT) and one for the isolated lab traffic (Host-Only).
- **Disk Provisioning**: Creating a large virtual disk (e.g., 100GB+) within the L1 hypervisor to serve as the local storage for all the L3 VMs that Proxmox will manage.

## Commands used

### VirtualBox (Enabling Nested VT-x via CLI)
If the "Nested VT-x" option is greyed out in the GUI, use this command:
```bash
VBoxManage modifyvm "Your_Proxmox_VM_Name" --nested-hw-virt on
```

### Linux KVM (Checking for Nested Support)
To check if the physical host supports nested virtualization for Intel:
```bash
cat /sys/module/kvm_intel/parameters/nested
```
For AMD:
```bash
cat /sys/module/kvm_amd/parameters/nested
```
(If it returns `0` or `N`, you must enable it in the kernel parameters).

### Proxmox Initial CLI Verification
After installation, log in to the Proxmox console and check if KVM is ready:
```bash
kvm-ok
```
(You may need to install `cpu-checker` first via `apt update && apt install cpu-checker`).

To list the physical (virtual) CPU features detected by Proxmox:
```bash
lscpu | grep Virtualization
```

## Summary
Deploying Proxmox as a nested VM is the heart of our homelab setup. By enabling hardware virtualization passthrough, we transform a simple virtual machine into a powerful hypervisor capable of hosting its own ecosystem of targets and tools. This multi-layered approach provides the flexibility and isolation required for advanced cybersecurity training.

## Reference links
- [Proxmox VE: Installation Guide](https://pve.proxmox.com/wiki/Installation)
- [VMware: Enabling Nested Virtualization](https://docs.vmware.com/en/VMware-Workstation-Pro/17/com.vmware.ws.using.doc/GUID-E79B6C24-B1F1-4F90-893C-85664C59A722.html)
- [VirtualBox: Manual on Nested Virtualization](https://www.virtualbox.org/manual/ch06.html#nested-virt)
- [Proxmox Wiki: Running Proxmox on VMware](https://pve.proxmox.com/wiki/Proxmox_VE_inside_VMware)

## Next Lesson
[Next Lesson: 01-08 - Proxmox Initial Configuration](/lessons/module-1/01-08-proxmox-initial-configuration)
