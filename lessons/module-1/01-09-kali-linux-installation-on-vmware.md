# 01-09: Attacker OS Installation

## Overview
The "Attacker" machine is the central hub for our offensive operations. **Kali Linux** is the industry-standard choice, providing a pre-configured suite of penetration testing tools.

---

## Deployment Guide

@tabs

@tab VMware
1. **New VM**: Select "Typical".
2. **ISO**: Choose the Kali Linux Installer ISO.
3. **Hardware**: Assign at least 2 cores and 4GB of RAM.
4. **Network**: Initially set to **NAT** for updates, then switch to **VMnet2 (Host-Only)** later.
5. **Install**: Follow the graphical installer. Use `kali` / `kali` as the default credentials.

@tab VirtualBox
1. **New VM**: Type: Linux, Version: Debian (64-bit).
2. **Settings > System**: Enable EFI (optional but recommended).
3. **Settings > Storage**: Attach the Kali ISO to the virtual optical drive.
4. **Network**: Adapter 1 set to **NAT Network**.
5. **Install**: Follow the graphical installer.

@tab KVM/QEMU
1. **New VM**: Choose "Local install media".
2. **Memory/CPU**: 4096 MiB / 2 CPUs.
3. **Network**: Select the **NAT** network bridge.
4. **Install**: Standard Debian-based installation process.

@endtabs

---

## Post-Install Checklist
- [ ] Run `sudo apt update && sudo apt full-upgrade -y`.
- [ ] Install guest additions/tools (e.g., `open-vm-tools-desktop`).
- [ ] Verify you have a terminal, browser, and standard tools like `nmap` and `metasploit-framework`.
