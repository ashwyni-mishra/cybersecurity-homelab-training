# 01-04: Virtual Network Configuration

## Overview
Proper network configuration is critical for lab isolation. We must establish two primary virtual networks:
1. **NAT/Bridge**: For internet access and management.
2. **Host-Only/Isolated**: For internal lab traffic (The "Dirty Pipe").

---

## Configuration by Platform

@tabs

@tab VMware (Windows/macOS/Linux)
1. Open **Virtual Network Editor** (Windows/Linux) or **VMware Fusion Settings > Network**.
2. **VMnet8 (NAT)**: Usually exists by default. Provides DHCP and internet access.
3. **VMnet2 (Host-Only)**: Create a new custom network. Ensure "Connect a host virtual adapter" is checked, but **Disable DHCP**. We will manually assign IPs or use pfSense.

@tab VirtualBox (All Platforms)
1. Go to **File > Tools > Network Manager**.
2. **Host-only Networks**: Create a new adapter (e.g., `vboxnet0`). Set IPv4 to `192.168.100.1` and mask `255.255.255.0`. **Disable the DHCP Server**.
3. **NAT Network**: Go to the "NAT Networks" tab and create a new network (e.g., `NatNetwork`).

@tab Linux (KVM/Libvirt)
1. Open `virt-manager` and go to **Edit > Connection Details > Virtual Networks**.
2. **Default (NAT)**: Usually active. Provides `192.168.122.0/24` by default.
3. **Isolated Network**: Create a new network. Set mode to "Isolated". Set IP range (e.g., `10.0.0.0/24`). **Disable DHCP** if you plan to use pfSense as the DHCP server.

@endtabs

---

## Technical Concept: The Isolated Network
This network has no route to the host or the internet. It exists only within the memory of the hypervisor. By connecting both the Attacker and the Target Gateway to this network, we create a secure, software-defined playground.
