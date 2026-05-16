# 02-01: Proxmox Virtual Bridges Explained

## What is it used for?
In Proxmox VE, virtual bridges (`vmbr`) are the foundation of virtual networking. They function as software-defined virtual switches that allow Virtual Machines (VMs) and Containers (LXCs) to communicate with each other and with the outside world.

Virtual bridges are used to:
- **Abstract Physical Networking**: Decouple the virtual network interfaces from physical hardware.
- **Segment Traffic**: Create isolated networks for different purposes (e.g., Management, Production, Lab).
- **Provide Connectivity**: Bridge the gap between the host's physical network adapters and the virtual NICs of guest systems.

## Techniques
Proxmox primarily utilizes **Linux Bridges** to implement virtual networking. The key techniques involved include:

1. **Bridging**: Creating a logical interface that aggregates multiple physical or virtual interfaces into a single Layer 2 segment.
2. **VLAN Tagging**: Using IEEE 802.1Q to segregate traffic within a single bridge using VLAN IDs.
3. **IP Assignment**: Assigning IP addresses to the bridge itself for host management or routing.
4. **Interface Binding**: Mapping a physical network interface (e.g., `eth0`, `ens33`) to a virtual bridge (e.g., `vmbr0`).

## How those techniques are used
In our cybersecurity homelab, we use these techniques to create a tiered network architecture:

- **Management Access**: `vmbr0` is bound to the primary interface (`ens33`) to provide access to the Proxmox Web GUI and SSH.
- **Isolated Lab Environment**: `vmbr1` is used as an internal switch for our "Sandbox." By not binding it to a physical interface that has internet access, or by binding it to a specific host-only network, we ensure lab traffic remains contained.
- **Virtual Router Integration**: VMs like pfSense are connected to multiple bridges simultaneously (e.g., `vmbr0` for WAN and `vmbr1` for LAN) to act as a gateway between segments.

## Commands used
While Proxmox networking is typically configured via the GUI, it can also be managed via the CLI.

### Viewing Network Configuration
```bash
# View all network interfaces and bridges
ip addr show

# View bridge status
brctl show
```

### Manual Configuration Snippet (`/etc/network/interfaces`)
```text
auto lo
iface lo inet loopback

iface ens33 inet manual

auto vmbr0
iface vmbr0 inet static
        address 192.168.1.100/24
        gateway 192.168.1.1
        bridge-ports ens33
        bridge-stp off
        bridge-fd 0

auto vmbr1
iface vmbr1 inet manual
        bridge-ports ens34
        bridge-stp off
        bridge-fd 0
```

### Proxmox UI Steps
1. Navigate to **System > Network**.
2. Click **Create > Linux Bridge**.
3. Set **Name** (e.g., `vmbr1`), **Bridge ports** (e.g., `ens34`), and optionally an **IP address**.

## Summary
Proxmox Virtual Bridges are the virtual switches that power our lab's connectivity. By using `vmbr0` for management and `vmbr1` for our isolated sandbox, we create a secure and organized environment for testing and learning. Understanding how to map physical interfaces to these bridges is critical for building complex network topologies.

## Reference links
- [Proxmox VE Networking Documentation](https://pve.proxmox.com/wiki/Network_Configuration)
- [Linux Bridge Architecture Explained](https://wiki.linuxfoundation.org/networking/bridge)
- [pfSense Documentation: Virtualizing with Proxmox](https://docs.netgate.com/pfsense/en/latest/recipes/virtualize-proxmox-ve.html)
- [Debian Network Configuration](https://wiki.debian.org/NetworkConfiguration)

## Next Lesson
[Next Lesson: 02-02 - Configuring vmbr0 Management Interface](/lessons/module-2/02-02-configuring-vmbr0-management-interface)
