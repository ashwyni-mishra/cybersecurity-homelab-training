# 01-07: Deploying Nested Proxmox

## Overview
Proxmox VE is a Type-1 hypervisor. In this lab, we deploy it as a "Nested" VM (Level 2) inside our primary hypervisor. This requires enabling "Hardware Virtualization Passthrough" so Proxmox can host its own VMs.

---

## Configuration by Primary Hypervisor

@tabs

@tab VMware (Workstation/Fusion)
1. **Processor Settings**: In the VM settings, go to **Processors**.
2. **Virtualization engine**: Check the box for **"Virtualize Intel VT-x/EPT or AMD-V/RVI"**.
3. **I/O Memory**: Check **"Virtualize IOMMU (IO memory management unit)"**.
4. **RAM**: Assign at least 8GB of RAM to the Proxmox VM.

@tab VirtualBox
1. **System Settings**: Go to **Settings > System > Processor**.
2. **Acceleration**: Check the box for **"Enable Nested VT-x/AMD-V"**. (Note: If greyed out, use the command line: `VBoxManage modifyvm "VM Name" --nested-hw-virt on`).
3. **Network**: Ensure the first adapter is set to **Bridge** or **NAT Network**.

@tab Linux (KVM/QEMU)
1. **CPU Model**: In `virt-manager`, set the CPU model to **"host-passthrough"**.
2. **XML Config**: (Optional) Verify nested virtualization is enabled on the host:
   ```bash
   cat /sys/module/kvm_intel/parameters/nested # Should be 'Y' or '1'
   ```
3. **Memory**: Enable **"Memory Ballooning"** and assign sufficient resources.

@endtabs

---

## Proxmox ISO Installation
1. Boot the VM from the Proxmox VE ISO.
2. Select **"Install Proxmox VE"**.
3. Follow the EULA and disk selection (defaults are usually fine).
4. **Network Config**: Assign a static IP from your **NAT/Management** network range.
5. **Reboot**: Once finished, access the GUI via `https://<static-ip>:8006`.
