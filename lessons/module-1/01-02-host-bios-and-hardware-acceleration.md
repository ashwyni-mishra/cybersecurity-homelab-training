# 01-02: Host BIOS and Hardware Acceleration

## What is it used for?
Hardware acceleration features in modern CPUs are essential for efficient virtualization. They allow the CPU to manage virtual machine states and memory mappings directly in hardware rather than relying on slow software emulation. In a nested virtualization context, these features must be enabled at the physical host (L0) BIOS/UEFI level so they can be passed through to the subsequent layers (L1 and L2).

These features are used for:
- **Performance Optimization**: Reducing the overhead of CPU and memory operations in virtual machines.
- **Enabling Nested Virtualization**: Allowing an L2 hypervisor to access the physical hardware's virtualization instructions.
- **64-bit Support**: enabling the ability to run 64-bit guest operating systems within a virtualized environment.
- **Security**: Hardware-level isolation between the host and virtual machines.

## Techniques
- **Intel VT-x / AMD-V**: CPU-specific instruction sets that provide hardware support for virtualization.
- **Intel VT-d / AMD Vi**: I/O virtualization technologies that allow virtual machines to directly access hardware devices (Direct Memory Access).
- **Extended Page Tables (EPT) / Rapid Virtualization Indexing (RVI)**: Hardware-assisted memory virtualization that maps guest physical memory to host physical memory efficiently.
- **BIOS/UEFI Configuration**: The manual process of enabling these hardware features in the motherboard firmware.

## How those techniques are used
- **Firmware Activation**: A user enters the BIOS/UEFI on their L0 host to toggle "Intel Virtualization Technology" to "Enabled". This unlocks the VT-x instructions for the L1 hypervisor (e.g., VMware or KVM).
- **Memory Mapping**: EPT/RVI is used automatically by the hypervisor to handle memory requests from an L3 target, ensuring that even three layers deep, memory access remains fast.
- **Device Passthrough**: Using VT-d/AMD Vi to give a specific VM direct control over a network card or GPU for high-performance tasks.

## Commands used

### Verifying Hardware Support (Windows)
To check if virtualization is enabled without entering BIOS:
```powershell
Get-ComputerInfo | Select-Object HyperV*
```

### Verifying Hardware Support (Linux)
To check if the hardware supports VT-x/AMD-V and if it's enabled:
```bash
lscpu | grep Virtualization
```
To check for the presence of the virtualization flag:
```bash
grep -E --color 'vmx|svm' /proc/cpuinfo
```

### UI Steps: Enabling in BIOS/UEFI
1. Power on or restart your computer.
2. Press the BIOS entry key (common keys: `F2`, `F10`, `F12`, `Del`).
3. Navigate to **Advanced**, **CPU Configuration**, or **Security**.
4. Locate **Intel Virtualization Technology**, **VT-x**, **SVM Mode**, or **AMD-V**.
5. Change the setting to **Enabled**.
6. (Optional but recommended) Enable **VT-d** or **IOMMU** if available.
7. Save settings and exit (usually `F10`).

## Summary
Hardware acceleration is the foundation of modern nested virtualization. By enabling technologies like VT-x, AMD-V, and EPT in the BIOS/UEFI, we provide the necessary hardware instructions for the hypervisor to run virtual machines at near-native speeds. Without these settings, nested virtualization is either impossible or extremely slow.

## Reference links
- [Intel: What is Virtualization Technology?](https://www.intel.com/content/www/us/en/gaming/resources/what-is-virtualization.html)
- [AMD Virtualization (AMD-V™) Overview](https://www.amd.com/en/technologies/virtualization)
- [Understanding EPT (Extended Page Tables)](https://en.wikipedia.org/wiki/Second_Level_Address_Translation)
- [BIOS/UEFI Virtualization Settings Guide](https://www.howtogeek.com/213795/how-to-enable-intel-vt-x-in-your-computers-bios-or-uefi-firmware/)
