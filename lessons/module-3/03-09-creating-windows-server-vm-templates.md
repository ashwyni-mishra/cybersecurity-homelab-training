# 03-09: Creating Windows Server VM Templates

## What is it used for?
Windows Server VM templates are used to streamline the deployment of Windows-based infrastructure in the lab. Because Windows installations are resource-heavy and time-consuming, templates allow for:
- **Rapid Provisioning**: Deploying a new, fully updated Windows Server in minutes.
- **Consistency**: Ensuring every Windows VM starts with the correct drivers, guest agents, and base security configurations.
- **Lab Scalability**: Easily creating multi-server environments (e.g., Domain Controllers, File Servers) from a single "Golden Image."
- **Efficiency**: Using "Linked Clones" to save significant disk space on the Proxmox host.

## Techniques
Creating a high-quality Windows template involves several specialized techniques:
1. **VirtIO Optimization**: Using paravirtualized drivers for Disk (SCSI) and Network (NIC) to achieve near-native performance within the VM.
2. **Guest Agent Integration**: Installing the QEMU Guest Agent to allow the Proxmox host to communicate with the Windows OS for clean shutdowns and IP reporting.
3. **Generalization (Sysprep)**: Removing system-specific information (like the Security Identifier or SID) so that clones don't conflict with each other on the network.
4. **Thin Provisioning**: Using "Linked Clones" in Proxmox to create new VMs that only store the *differences* from the base template, saving massive amounts of storage.

## How those techniques are used
- **Base Image Creation**: We start by creating a standard VM, mounting both the Windows Server ISO and the VirtIO-win ISO. During installation, we "Load Driver" to ensure Windows can see the VirtIO SCSI disk.
- **Configuration**: We install all available Windows updates, enable RDP for remote management, and install the Guest Agent.
- **Sysprep Execution**: Before converting to a template, we run the Sysprep tool with the `/generalize` and `/oobe` (Out-of-Box Experience) flags. This ensures that the next time the VM (or its clone) starts, it generates a new SID and prompts for initial setup.
- **Template Conversion**: In the Proxmox GUI, we right-click the VM and select "Convert to template," which makes the disk image read-only and ready for cloning.

## Commands used

### Sysprep (Inside Windows VM)
Run this from the "Run" dialog (Win+R) or an administrative command prompt to prepare the image:
```cmd
C:\Windows\System32\Sysprep\sysprep.exe /generalize /oobe /shutdown
```

### Proxmox VirtIO Setup (GUI)
1. Attach **VirtIO-win ISO** to the VM.
2. In Windows "Device Manager," update drivers for any "Unknown Devices" (typically PCI Simple Communications Controller, Ethernet Controller, etc.).
3. Run `virtio-win-guest-tools.exe` from the ISO to install everything at once.

### Proxmox CLI (Alternative to GUI)
```bash
# Example: Convert VM ID 200 to a template
qm template 200

# Create a linked clone from the template
# Usage: qm clone <vmid> <newid> --name <name> --full 0
qm clone 200 201 --name dc-01 --full 0
```

## Summary
Creating a Windows Server template is a "do-it-once" task that pays dividends throughout the life of your homelab. By using VirtIO drivers for performance and Sysprep for system unique identity, we create a reliable, high-performance "Golden Image" that serves as the foundation for our Active Directory and Windows security testing environments.

## Reference links
- [Proxmox VE: Windows Guest Best Practices](https://pve.proxmox.com/wiki/Windows_10_guest_best_practices)
- [Microsoft: Sysprep (System Preparation) Overview](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/sysprep--system-preparation--overview)
- [VirtIO Windows Drivers Download (Fedora Project)](https://github.com/virtio-win/virtio-win-pkg-scripts/blob/master/README)
- [Proxmox Wiki: QEMU Guest Agent](https://pve.proxmox.com/wiki/Qemu-guest-agent)

## Next Lesson
[Next Lesson: 03-10 - Deploying Vulnerable Active Directory](/lessons/module-3/03-10-deploying-vulnerable-active-directory)
