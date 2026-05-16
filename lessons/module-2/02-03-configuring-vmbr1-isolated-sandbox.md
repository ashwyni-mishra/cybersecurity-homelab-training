# 02-03: Configuring vmbr1 Isolated Sandbox

## What is it used for?
The `vmbr1` interface is designed as an **Isolated Sandbox** or "dirty pipe" for offensive security testing. Its primary purpose is to carry traffic between your attacker machine (e.g., Kali Linux) and your vulnerable targets without exposing the rest of your home network to malicious activity.

In our lab, `vmbr1` serves as:
- **The Internal LAN/DMZ**: A private segment where vulnerable VMs reside.
- **A Layer 2 Switch**: Connecting the "inside" interface of your firewall (pfSense) to the target systems.
- **Traffic Isolation**: Ensuring that exploits, malware, or scanning traffic are confined to a specific virtual boundary.

## Techniques
Creating an isolated sandbox involves several specialized techniques:

1. **Layer 2 Passthrough**: Binding the bridge to a specific physical or L1 interface (like `ens34`) that is mapped to a "Host-Only" network in the hypervisor.
2. **IP-less Bridge**: Leaving the bridge itself without an IP address on the host. This makes the Proxmox host "invisible" to the traffic on that segment and reduces its attack surface.
3. **Promiscuous Mode**: Allowing the virtual switch to pass all traffic, including packets not addressed to the host, which is essential for network sniffing and monitoring.
4. **Network Segmentation**: Using separate bridges for management (`vmbr0`) and testing (`vmbr1`) to prevent accidental cross-contamination of traffic.

## How those techniques are used
In our setup, we use these techniques to build a secure testing environment:

- **Scenario: Attacking a Target**: When you launch an exploit from Kali to an Ubuntu target, the traffic enters `vmbr1` via the L1 "Host-Only" network. Because `vmbr1` has no IP, the Proxmox host doesn't process the traffic at Layer 3, acting only as a switch.
- **Scenario: Traffic Analysis**: By connecting a tool like Wireshark to a VM on `vmbr1`, you can capture the raw interaction between the attacker and the victim because the bridge facilitates Layer 2 communication.
- **Scenario: Malware Testing**: If a target VM is infected with malware that attempts to spread, it is trapped within the `vmbr1` segment and cannot reach the internet unless you explicitly allow it through the pfSense firewall.

## Commands used
Since `vmbr1` is intended to be an IP-less bridge, the commands focus on verification and manual creation.

### Checking Bridge Status
```bash
# Verify the bridge exists and which ports are attached
brctl show vmbr1

# Check the state of the physical interface bound to vmbr1
ip link show ens34
```

### Manual Configuration Snippet (`/etc/network/interfaces`)
```text
auto ens34
iface ens34 inet manual

auto vmbr1
iface vmbr1 inet manual
        bridge-ports ens34
        bridge-stp off
        bridge-fd 0
```

### Proxmox UI Steps
1. Navigate to **Proxmox Node > System > Network**.
2. Click **Create > Linux Bridge**.
3. Set **Name** to `vmbr1`.
4. Set **Bridge ports** to the secondary interface name (e.g., `ens34`).
5. Ensure **IPv4/CIDR** and **Gateway** are left **EMPTY**.
6. Check **Autostart**.
7. Click **Create** and then **Apply Configuration**.

## Summary
`vmbr1` is the "Internal" switch of our lab. By configuring it as an IP-less bridge connected to a host-only network, we create a safe, isolated environment for offensive operations. This setup ensures that your Proxmox host remains secure while providing the necessary Layer 2 connectivity for your target infrastructure.

## Reference links
- [Proxmox VE: Network Configuration](https://pve.proxmox.com/wiki/Network_Configuration)
- [Linux Foundation: Bridge documentation](https://wiki.linuxfoundation.org/networking/bridge)
- [Understanding Layer 2 vs Layer 3 Networking](https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html)
- [Proxmox Security: Hardening the Hypervisor](https://pve.proxmox.com/wiki/Hardening_Proxmox_VE)

## Next Lesson
[Next Lesson: 02-04 - Introduction to Virtual Firewalls](/lessons/module-2/02-04-introduction-to-virtual-firewalls)
