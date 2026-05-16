# 02-08: Establishing the DMZ

## What is it used for?
A Demilitarized Zone (DMZ) is a physical or logical subnetwork that contains and exposes an organization's external-facing services to an untrusted network, usually the internet. In our lab, the DMZ is used to:
- **Isolate Vulnerable Assets**: Host public-facing targets (like OWASP Juice Shop) in a zone where they can be attacked without risking the rest of the network.
- **Prevent Lateral Movement**: Ensure that if a server in the DMZ is compromised, the attacker cannot easily "pivot" or move sideways into more sensitive areas like the Management or Internal LAN segments.
- **Simulate Real-World Architectures**: Mimic the multi-tiered network designs used by corporations to protect their internal data.

## Techniques
Establishing a functional and secure DMZ involves several networking and security techniques:

1. **VLAN Tagging (or Physical Isolation)**: Using separate virtual bridges or 802.1Q VLAN tags to create a distinct broadcast domain for the DMZ.
2. **Three-Legged Firewall Architecture**: Configuring the firewall with three distinct interfaces: WAN (External), LAN (Internal), and DMZ (Exposed).
3. **Egress Filtering**: Implementing strict rules on what traffic is allowed to *leave* the DMZ, often blocking everything except essential updates.
4. **Static IP Orchestration**: Assigning fixed IPs to DMZ assets to ensure that port forwarding and firewall rules remain consistent.

## How those techniques are used
In our lab environment, we use these techniques to create a "Sacrificial Lamb" zone:

- **Scenario: Hosting Juice Shop**: We place the Juice Shop container on the DMZ bridge. We then create a firewall rule that allows traffic from the WAN to reach only port 3000 on that specific DMZ IP.
- **Scenario: Blocking the Pivot**: We create a "Block" rule at the top of the DMZ interface in pfSense. This rule explicitly denies any traffic where the destination is the "LAN Subnet" or "Proxmox Management IP." This ensures that even if an attacker gains a shell on the Juice Shop server, they cannot scan the internal LAN.
- **Scenario: Centralized Logging**: All attempts by the DMZ host to reach the LAN are logged by pfSense. This allows us to practice detecting post-exploitation activity and lateral movement attempts.

## Commands used
Configuring a DMZ involves steps in both Proxmox and the pfSense WebGUI.

### Proxmox: Creating a DMZ Bridge (Optional if not using VLANs)
1. Go to **System > Network**.
2. Create **Linux Bridge** named `vmbr2` (no IP).
3. Attach it to the pfSense VM as a third network device.

### pfSense: Interface Enablement (GUI)
1. Navigate to **Interfaces > Assignments**.
2. Add the new `vtnet2` interface.
3. Click on the interface name (e.g., `OPT1`) and rename it to `DMZ`.
4. Check **Enable Interface**.
5. Set **IPv4 Configuration Type** to `Static IPv4`.
6. Set **IPv4 Address** to `10.0.3.1` and mask to `/24`.
7. Click **Save** and **Apply Changes**.

### pfSense: "No-Pivot" Firewall Rule
1. Go to **Firewall > Rules > DMZ**.
2. Click **Add** (Top).
3. **Action**: `Block`.
4. **Protocol**: `Any`.
5. **Source**: `DMZ net`.
6. **Destination**: `LAN net`.
7. **Description**: `Prevent DMZ to LAN lateral movement`.
8. Click **Save** and **Apply**.

## Summary
Establishing a DMZ is a critical skill for any security architect. By isolating vulnerable services into their own network segment and applying strict "no-pivot" rules, we create a secure environment where we can safely practice offensive techniques without endangering our entire infrastructure. The DMZ acts as a buffer zone, providing visibility into attacks while containing their impact.

## Reference links
- [NIST SP 800-41: Guidelines on Firewalls and Firewall Policy](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-41r1.pdf)
- [SANS Institute: DMZ Design and Implementation](https://www.sans.org/white-papers/952/)
- [pfSense Documentation: Security Considerations](https://docs.netgate.com/pfsense/en/latest/book/firewall/firewall-rules.html)
- [Understanding the Three-Legged Firewall Model](https://www.firewall.cx/networking-topics/firewalls/154-firewall-types-dmz.html)
