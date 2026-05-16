# Technical Overview and Topology

This page provides a deep dive into the underlying architecture of the CyberHomelab environment.

---

## Architectural Overview
The lab utilizes a multi-layer nested virtualization strategy to isolate offensive traffic from the host network.

- **Primary Hypervisor**: VMware Workstation Player/Pro (Type-2)
- **Nested Hypervisor**: Proxmox VE (Type-1 Simulation)
- **Offensive Engine**: Kali Linux
- **Defensive Gateway**: pfSense/OPNsense
- **Targets**: Docker-based vulnerable applications (DVWA, Juice Shop) and LXC nodes.

---

<a name="network-topology"></a>
## Network Topology

The following diagram illustrates the traffic flow and isolation boundaries within the homelab.

```mermaid
graph TD
    subgraph Windows_Host
        NAT[VMnet8 - NAT/Internet]
        HO[VMnet2 - Host-Only / Dirty Pipe]
    end

    subgraph VMware_Layer
        Kali[Kali Linux - Offensive]
        Proxmox[Proxmox VE Server]
    end

    subgraph Proxmox_Internal
        vmbr0[vmbr0 - Management Bridge]
        vmbr1[vmbr1 - Sandbox Bridge]
        Targets[Vulnerable Targets / Containers]
    end

    Kali --> HO
    HO --> vmbr1
    vmbr1 --> Targets
    NAT --> vmbr0
    vmbr0 --> Proxmox
```

::: tip NETWORKING NOTE
The use of **VMnet2 (Host-Only)** ensures that offensive traffic from Kali Linux never touches your physical home network or the internet directly.
:::
