# 01-06: Introduction to Proxmox VE

## Overview
Proxmox Virtual Environment (VE) is a complete, open-source server management platform for enterprise virtualization. It is based on Debian GNU/Linux and integrates the KVM hypervisor and Linux Containers (LXC), software-defined storage, and networking functionality on a single platform.

## Key Features
- **KVM (Kernel-based Virtual Machine)**: Full virtualization for running Windows and Linux guests.
- **LXC**: Lightweight container virtualization for efficient resource usage.
- **Web-Based Interface**: A comprehensive GUI for managing the entire cluster, storage, and networking from any browser.
- **REST API**: Enables automation and integration with third-party tools.
- **Proxmox VE Firewall**: A built-in firewall for fine-grained network control at the VM level.

## Role in this Architecture
In this nested lab, Proxmox VE serves as the **Level 2 (L2) Hypervisor**. It runs as a virtual machine within VMware Workstation and provides the environment for hosting vulnerable targets, security services, and infrastructure components. This setup mirrors enterprise environments where virtualization platforms are used to manage multi-tenant or multi-tier applications.
