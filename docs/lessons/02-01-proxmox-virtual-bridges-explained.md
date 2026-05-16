# 02-01: Proxmox Virtual Bridges Explained

## Overview
In Proxmox VE, networking is built around virtual bridges (`vmbr`). A virtual bridge acts like a physical network switch, allowing virtual machines and the host to communicate.

## Core Bridges

### vmbr0: Management Interface
- **Type**: Linux Bridge
- **Purpose**: Provides the primary management connection for the Proxmox host.
- **Connection**: Attached to the physical interface (or virtual adapter in VMware) that connects to the NAT network.
- **Function**: Handles SSH, Web GUI (8006), and outgoing traffic for updates.

### vmbr1: Isolated Sandbox
- **Type**: Linux Bridge
- **Purpose**: Provides the transport layer for the offensive lab traffic.
- **Connection**: Attached to the virtual adapter connected to VMware's VMnet2 (Host-only).
- **Function**: Carries traffic between the attacker (Kali) and the target infrastructure.

## Network Topology Diagram

```mermaid
graph TD
    subgraph "Physical Host (L0)"
        VMW[VMware Workstation]
    end

    subgraph "L1: Virtual Networks"
        VMnet8[VMnet8 - NAT]
        VMnet2[VMnet2 - Host-Only]
    end

    subgraph "L2: Proxmox VM"
        ens33[ens33 - Interface 1]
        ens34[ens34 - Interface 2]
        vmbr0[vmbr0 - Management]
        vmbr1[vmbr1 - Sandbox]
    end

    ens33 --- vmbr0
    ens34 --- vmbr1
    vmbr0 --- VMnet8
    vmbr1 --- VMnet2

    subgraph "L3: Guests"
        pfWAN[pfSense WAN]
        pfLAN[pfSense LAN]
        Targets[Target VMs]
    end

    pfWAN --- vmbr0
    pfLAN --- vmbr1
    Targets --- vmbr1
```
