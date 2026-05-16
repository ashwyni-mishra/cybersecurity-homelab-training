# 01-02: Host BIOS and Hardware Acceleration

## Hardware-Assisted Virtualization
Modern CPUs include specific instruction sets designed to offload virtualization tasks from the software to the hardware, significantly improving performance and stability. For nested virtualization to function correctly, these features must be enabled at the BIOS/UEFI level.

### Key Technologies
- **Intel VT-x (Virtualization Technology)**: Intel's hardware-assisted virtualization.
- **AMD-V (AMD Virtualization)**: AMD's equivalent hardware-assisted virtualization.
- **EPT (Extended Page Tables)** / **RVI (Rapid Virtualization Indexing)**: Technologies for memory virtualization that are critical for nested performance.

## Importance for Nested Virtualization
Without hardware acceleration, the L1 hypervisor must use software emulation for the L2 guest. This results in:
1.  Extreme performance degradation.
2.  Inability to run 64-bit guests within the L2 hypervisor.
3.  Failure of the L2 hypervisor to initialize hardware-accelerated features.

## Enabling Features in BIOS/UEFI
1.  Restart the host machine and enter the BIOS/UEFI setup (typically using F2, F10, F12, or DEL).
2.  Locate the **Processor** or **Advanced** configuration menu.
3.  Ensure the following settings are set to **Enabled**:
    - Intel Virtualization Technology
    - VT-d (Directed I/O)
    - AMD-V / SVM Mode
4.  Save and Exit.

## Verification
In Windows, virtualization status can be verified via Task Manager under the **Performance** tab, looking for "Virtualization: Enabled".
