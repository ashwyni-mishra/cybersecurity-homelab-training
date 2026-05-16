# 02-08: Establishing the DMZ

## Objective
To create a Demilitarized Zone (DMZ) that hosts vulnerable public-facing assets, isolating them from the internal LAN and the management network.

## Interface Setup (Proxmox/pfSense)
1.  In Proxmox, add a third network interface to the pfSense VM, connected to a new bridge (e.g., `vmbr2`) or use a VLAN tag on `vmbr1`.
2.  In pfSense, go to **Interfaces** > **Assignments**.
3.  Assign the new interface and name it **DMZ**.
4.  Enable the interface and set a static IP: `10.0.3.1/24`.

## Firewall Logic
The DMZ should follow the "Least Privilege" principle:
- **WAN to DMZ**: Only allowed on specific service ports (e.g., 80, 443).
- **DMZ to LAN**: **DENIED**. This prevents an attacker who compromises a DMZ host from easily pivoting into the internal network.
- **LAN to DMZ**: Allowed for management purposes.

## Deployment of Assets
Move vulnerable web applications or mail servers to the DMZ network. Ensure their default gateway is set to the pfSense DMZ interface IP (`10.0.3.1`).
