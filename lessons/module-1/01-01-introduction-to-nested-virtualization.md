# 01-01: Introduction to Nested Virtualization

## What is it used for?
Nested virtualization is the process of running a hypervisor within another hypervisor. In a standard setup, you have a physical machine (L0) running a hypervisor (L1), which in turn runs virtual machines (L2). Nested virtualization adds a layer by allowing an L2 virtual machine to run its own hypervisor, which then manages its own guest virtual machines (L3).

In cybersecurity research and homelab environments, nested virtualization is primarily used for:
- **Complex Lab Environments**: Simulating entire enterprise networks with multiple subnets, firewalls, and servers (like Proxmox or ESXi) within a single physical host.
- **Isolation and Safety**: Providing multiple layers of abstraction. If malware escapes an L3 guest, it still remains trapped within the L2 hypervisor.
- **Snapshot and Reversion**: Allowing researchers to snapshot the entire state of a nested hypervisor (L2), making it easy to revert complex configurations after testing or potential corruption.
- **Education and Testing**: Learning how to manage and deploy data center-grade hypervisors (Proxmox, VMware ESXi) without needing dedicated physical hardware.

## Techniques
The primary techniques involved in nested virtualization include:
- **Hardware Virtualization Passthrough**: Passing CPU features like Intel VT-x or AMD-V from the physical host (L0) through the L1 hypervisor to the L2 guest.
- **Hardware-Assisted Memory Virtualization**: Utilizing features like EPT (Extended Page Tables) or RVI (Rapid Virtualization Indexing) to reduce the performance overhead of mapping memory across multiple layers.
- **Virtualization Engine Emulation**: If hardware passthrough is not available, some hypervisors can emulate virtualization features, though this is significantly slower.
- **Bridged Networking**: Configuring virtual network adapters to allow traffic to flow seamlessly between L0, L1, L2, and L3 layers.

## How those techniques are used
- **Simulating a Data Center**: A researcher installs VMware Workstation (L1) on their Windows PC (L0). They then create a VM and install Proxmox VE (L2). By enabling "Virtualize Intel VT-x/EPT", Proxmox (L2) can now run its own Windows or Linux VMs (L3).
- **Malware Analysis**: A suspicious file is executed in a Windows VM (L3) running inside a nested Proxmox host (L2). The researcher uses snapshots at the L2 level to quickly reset the entire L3 environment if it becomes compromised.
- **Network Prototyping**: Using a nested firewall (like pfSense at L2) to manage traffic for multiple L3 containers, mimicking a real-world DMZ or internal network architecture.

## Commands used

### Checking Host Support (L0)

#### Windows (Command Prompt/PowerShell)
To verify Hyper-V requirements and virtualization status:
```cmd
systeminfo
```
Look for the **Hyper-V Requirements** section at the bottom.

#### Linux (Terminal)
To check if the CPU supports virtualization (VMX for Intel, SVM for AMD):
```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```
If the output is **1** or higher, virtualization is supported.

#### macOS (Terminal)
To check for hardware virtualization features:
```bash
sysctl -a | grep machdep.cpu.features
```
Look for `VMX` in the output.

### Enabling Passthrough (L1 Settings)
In VMware Workstation, this is typically done via the GUI, but the configuration is stored in the `.vmx` file:
```text
vhv.enable = "TRUE"
```

## Summary
Nested virtualization is a powerful technique for creating hierarchical lab environments (L0 -> L1 -> L2 -> L3). It leverages hardware acceleration passthrough (Intel VT-x/AMD-V) to allow a virtual machine to act as a hypervisor itself. This provides unmatched flexibility, isolation, and efficiency for cybersecurity training and software testing.

## Reference links
- [Intel Virtualization Technology (VT-x) Overview](https://www.intel.com/content/www/us/en/virtualization/virtualization-technology/intel-virtualization-technology.html)
- [VMware Documentation: Running Nested VMs](https://docs.vmware.com/en/VMware-Workstation-Pro/17/com.vmware.ws.using.doc/GUID-E79B6C24-B1F1-4F90-893C-85664C59A722.html)
- [Proxmox VE: Nested Virtualization Guide](https://pve.proxmox.com/wiki/Nested_Virtualization)
- [AMD Virtualization (AMD-V™) Technology](https://www.amd.com/en/technologies/virtualization)
