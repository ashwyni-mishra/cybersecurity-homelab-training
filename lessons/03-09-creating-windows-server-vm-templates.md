# 03-09: Creating Windows Server VM Templates

## Overview
Windows Server instances are heavier than LXC containers and must be deployed as full VMs in Proxmox. Creating a template saves significant time during lab reconstruction.

## Preparation Steps
1. Upload Windows Server ISO to Proxmox ISO storage.
2. Create a VM with VirtIO drivers for optimal performance.
3. Perform a standard installation and install 'Guest Agent'.
4. Enable RDP and disable Windows Firewall (optional, for lab convenience).
5. Run `sysprep /generalize /oobe /shutdown` to prepare for cloning.
6. Convert the VM to a template in Proxmox.
