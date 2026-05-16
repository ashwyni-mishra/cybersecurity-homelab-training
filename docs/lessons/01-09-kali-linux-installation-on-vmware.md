# 01-09: Kali Linux Installation on VMware

## Introduction
Kali Linux is the industry-standard Linux distribution for penetration testing and security auditing. In this architecture, Kali will be installed as a separate VM on the L1 hypervisor (VMware Workstation), acting as the primary offensive engine.

## Installation Steps (VMware)

1.  **New Virtual Machine**: Choose "Typical".
2.  **ISO Image**: Select the Kali Linux Installer ISO.
3.  **Guest OS**: Select "Linux" and "Debian 11 (64-bit)".
4.  **Processor/Memory**: 2 Cores and 4GB RAM is recommended.
5.  **Network**: Initially set to **NAT** to facilitate updates during installation.
6.  **Disk**: 80GB (SCSI).

## Kali Installer Configuration
- **Language/Region**: Default.
- **Hostname**: `kali`.
- **Domain**: `lab.local`.
- **User Account**: Create a non-root user.
- **Partitioning**: "Guided - use entire disk".
- **Software Selection**:
  - Desktop Environment: XFCE (default) or GNOME.
  - Tools: Select "default" and "large" for a comprehensive toolset.
- **GRUB Bootloader**: Install to the primary drive.

## Post-Install Verification
Log in to Kali and update the system:
```bash
sudo apt update && sudo apt full-upgrade -y
```
Ensure that essential tools like `nmap`, `metasploit-framework`, and `wireshark` are installed and functional.
