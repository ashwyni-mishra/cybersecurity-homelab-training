# 02-05: Deploying pfSense in Proxmox

## Objective
To install pfSense as the primary gateway and firewall for the nested target environment.

## VM Configuration (Proxmox)

1.  **Create VM**:
    - **Node**: `pve01`
    - **VM ID**: 100 (example)
    - **Name**: `pfsense-fw`
2.  **OS**:
    - **ISO Image**: Select the pfSense Community Edition ISO.
    - **Type**: Other.
3.  **System**: Defaults.
4.  **Disks**: 20GB (VirtIO Block).
5.  **CPU**: 1 Core, 2 Threads (Host type).
6.  **Memory**: 1GB (minimum) to 2GB.
7.  **Network**:
    - **Model**: VirtIO (paravirtualized).
    - **Bridge**: `vmbr0` (This will be the WAN interface).
8.  **Add Second Interface**:
    - After creation, go to **Hardware** > **Add** > **Network Device**.
    - **Bridge**: `vmbr1` (This will be the LAN/Isolated interface).

## Installation Steps
1.  Start the VM and open the console.
2.  Accept the license agreement.
3.  Select **Install**.
4.  Follow the partitioning defaults (ZFS or UFS).
5.  Complete the installation and reboot.
6.  Upon reboot, pfSense will prompt for interface assignments.
