# 01-07: Deploying Proxmox as a Nested VM

## Objective
To install Proxmox VE as a virtual machine within VMware Workstation while ensuring it has the necessary hardware access to perform nested virtualization.

## VM Configuration (L1 - VMware)

1.  **New Virtual Machine**: Choose "Custom (advanced)".
2.  **Hardware Compatibility**: Use the latest Workstation version.
3.  **Installer Disk Image**: Select the Proxmox VE ISO.
4.  **Guest OS**: Select "Linux" and "Debian 11 (64-bit)" or the latest Debian version.
5.  **Processors**:
    - **Number of processors**: 1 (minimum).
    - **Number of cores per processor**: 2 (minimum).
    - **Virtualization Engine**: Ensure **"Virtualize Intel VT-x/EPT or AMD-V/RVI"** is **CHECKED**. This is the most critical setting for nested virtualization.
6.  **Memory**: 4GB (minimum) or 8GB+ (recommended).
7.  **Network Adapter**:
    - Adapter 1: Connect to **NAT (VMnet8)** for internet access (updates/management).
    - Adapter 2: Add a second adapter and connect it to **Custom: VMnet2 (Host-only)** for the offensive lab traffic.
8.  **Disk**: 100GB (SCSI or NVMe).

## Installation inside the VM
Follow the Proxmox installation prompts:
- Select the target disk.
- Configure localization (Country, Time Zone, Keyboard).
- Set a strong root password and provide an email.
- **Management Interface**: Select the adapter connected to NAT (usually `eth0`).
- **Hostname**: `pve01.lab.local`.
- **IP Address**: Assign a static IP (e.g., `192.168.x.100`) within the VMware NAT range.
- **Gateway/DNS**: Use the VMware NAT gateway (usually `192.168.x.2`).
- Confirm and install.
