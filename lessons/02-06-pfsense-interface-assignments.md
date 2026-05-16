# 02-06: pfSense Interface Assignments

## Objective
To correctly map the virtual network interfaces provided by Proxmox to the logical WAN and LAN roles within pfSense.

## Configuration Steps (Console)

1.  **VLANs**: When asked "Should VLANs be set up now?", enter `n`.
2.  **WAN Interface**: Enter the name of the first interface (typically `vtnet0`). This corresponds to the Proxmox `vmbr0` (NAT/Management).
3.  **LAN Interface**: Enter the name of the second interface (typically `vtnet1`). This corresponds to the Proxmox `vmbr1` (Isolated Sandbox).
4.  **Confirm**: Type `y` to proceed with the assignments.
5.  Wait for the configuration to be applied and the main menu to appear.

## Assigning IP Addresses (Console Option 2)

### WAN Interface
- **DHCP**: Enter `y`. Since it is connected to the VMware NAT network, it will receive an IP automatically from VMware.

### LAN Interface
- **IP Address**: Enter `10.0.1.1` (This will be the gateway for the internal target network).
- **Subnet Bit Count**: Enter `24`.
- **Gateway**: Leave blank (Press Enter).
- **DHCP Server**: Enter `y`.
- **DHCP Range**: `10.0.1.10` to `10.0.1.200`.
- **HTTP/HTTPS**: Enter `n` to keep the webConfigurator on HTTPS.

## Verification
The console menu should now display the assigned IP addresses for both interfaces.
