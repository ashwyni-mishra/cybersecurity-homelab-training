# 01-01: Introduction to Nested Virtualization

## Prerequisites
- A physical host machine (L0) with a modern CPU (Intel VT-x or AMD-V support).
- Basic understanding of what a Virtual Machine (VM) is.

## Learning Goals
- Understand the hierarchical levels of nested virtualization (L0 to L3).
- Identify why nested virtualization is critical for security research.
- Learn how hardware acceleration enables nested performance.

---

## Theoretical Deep Dive

### What is Nested Virtualization?
In standard virtualization, a physical host (L0) runs a hypervisor (L1), which manages multiple Virtual Machines (L2). Nested virtualization adds another layer: the L2 Virtual Machine itself runs a hypervisor, which then manages its own guests (L3).

This "Inception-style" architecture is made possible through **Hardware Virtualization Passthrough**.

### The Hierarchy of Layers
1. **Level 0 (L0) - Physical Hardware**: The bare metal (CPU, RAM, NIC).
2. **Level 1 (L1) - Bare-Metal Hypervisor**: The first software layer (e.g., VMware Workstation on Windows, or KVM on Linux).
3. **Level 2 (L2) - Nested Hypervisor**: A Virtual Machine configured to act as a hypervisor (e.g., Proxmox installed inside a VMware VM).
4. **Level 3 (L3) - Lab Targets**: The final payload VMs or containers (e.g., a vulnerable Ubuntu server) running inside the L2 hypervisor.

### Why use it for Security Labs?
- **Total Isolation**: You can run malware or "dirty" network traffic inside L3, and it must "break out" of two hypervisors (L2 and L1) to reach your physical machine (L0).
- **Snapshot Chain**: You can snapshot the entire L2 environment. If a target (L3) gets corrupted, you can revert the entire L2 hypervisor to a clean state instantly.
- **Complex Topologies**: You can simulate an entire enterprise network (Domain Controllers, Firewalls, SIEMs) within a single L2 host, keeping your L1 host clean.

---

## Technical Mechanics: Performance & Acceleration
Nested virtualization used to be extremely slow because every instruction had to be emulated by the L1 hypervisor. Modern CPUs solve this with:
- **Intel VT-x / AMD-V**: Hardware instructions that allow the CPU to manage VM state transitions directly.
- **EPT (Extended Page Tables) / RVI**: Hardware-assisted memory virtualization that significantly reduces the overhead of mapping L3 memory to L0 physical RAM.

::: tip PRO TIP
When setting up your lab, always ensure that **Virtualization Engine Passthrough** is enabled in your L1 settings. This allows the L2 hypervisor to access the L0 hardware acceleration features directly.
:::

---

## Validation: Checking Host Support

Before proceeding, you must verify that your L0 host supports nested virtualization.

@tabs

@tab Windows
1. Open **Task Manager** (Ctrl+Shift+Esc).
2. Go to the **Performance** tab and select **CPU**.
3. Look for **Virtualization: Enabled**.
4. Run `systeminfo` in Command Prompt and check the bottom section for "Hyper-V Requirements" - it should say "Virtualization Firmare Enabled: Yes".

@tab macOS
1. Open **Terminal**.
2. Run: `sysctl -a | grep machdep.cpu.features`.
3. Look for `VMX` (Intel) or check the Virtualization.framework support for Apple Silicon.

@tab Linux
1. Open **Terminal**.
2. Run: `egrep -c '(vmx|svm)' /proc/cpuinfo`.
3. If the output is greater than **0**, your hardware supports virtualization.

@endtabs

---

## Reference Links
- [Intel Virtualization Technology (VT-x) Overview](https://www.intel.com/content/www/us/en/virtualization/virtualization-technology/intel-virtualization-technology.html)
- [VMware Documentation: Running Nested VMs](https://docs.vmware.com/en/VMware-Workstation-Pro/17/com.vmware.ws.using.doc/GUID-E79B6C24-B1F1-4F90-893C-85664C59A722.html)
- [Proxmox VE: Nested Virtualization Guide](https://pve.proxmox.com/wiki/Nested_Virtualization)
