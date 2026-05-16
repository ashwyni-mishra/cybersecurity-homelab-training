# 01-03: Setting Up the Primary Hypervisor

## Overview
The primary hypervisor (Level 1) is installed directly on your host operating system. It provides the foundation for our nested lab environment.

---

## Installation Guide

Select the tab that matches your host operating system and preferred hypervisor.

@tabs

@tab Windows (VMware)
1. **Download**: Obtain VMware Workstation Player (Free) or Pro.
2. **Install**: Run the installer and follow the wizard.
3. **Reboot**: A system restart is required to initialize virtual network drivers.
4. **Verify**: Open the application and ensure you can create a new Virtual Machine.

@tab Windows (VirtualBox)
1. **Download**: Obtain the latest version of Oracle VM VirtualBox.
2. **Install**: Run the installer; ensure the "VirtualBox Networking" components are selected.
3. **Extension Pack**: Install the VirtualBox Extension Pack for USB 2.0/3.0 support.
4. **Reboot**: Recommended to ensure kernel drivers are loaded.

@tab macOS (VMware Fusion)
1. **Download**: Obtain VMware Fusion Player (Personal Use) or Pro.
2. **Install**: Drag the application to your Applications folder.
3. **Permissions**: Grant the required "System Extensions" and "Accessibility" permissions in System Settings.
4. **Verify**: Ensure the application launches and recognizes your CPU's virtualization features.

@tab Linux (KVM/QEMU)
1. **Install Packages**:
   ```bash
   sudo apt update
   sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager
   ```
2. **User Groups**: Add your user to the libvirt group:
   ```bash
   sudo adduser $USER libvirt
   sudo adduser $USER kvm
   ```
3. **Service**: Enable and start the libvirt service:
   ```bash
   sudo systemctl enable --now libvirtd
   ```
4. **Verify**: Open `virt-manager` to ensure the connection to the QEMU/KVM hypervisor is successful.

@endtabs

---

## Post-Installation Check
Regardless of your platform, ensure that **Nested Virtualization** is supported. You can check this by running:

- **Windows/Linux**: Look for `VT-x` or `AMD-V` in your CPU specifications.
- **macOS**: Apple Silicon (M1/M2/M3) supports virtualization natively via the Virtualization.framework.
