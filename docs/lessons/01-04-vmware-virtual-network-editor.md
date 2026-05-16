# 01-04: VMware Virtual Network Editor

## Overview
The Virtual Network Editor (VNE) is a critical utility provided with VMware Workstation Pro. It allows for the management and configuration of virtual networks (VMnets) that connect virtual machines to each other and to the physical host's network.

## Default Network Types

1.  **Bridged (VMnet0)**: Connects virtual machines directly to the physical network using the host's network adapter. The VM appears as a separate physical device on the network.
2.  **NAT (VMnet8)**: Virtual machines share the host's IP address. This is the default for providing internet access to VMs while keeping them behind a virtual firewall/router.
3.  **Host-Only (VMnet1)**: Creates a network that is completely isolated from the physical network. VMs can only communicate with each other and the host.

## Advanced Configuration
The VNE allows for:
- Changing Subnet IP ranges.
- Configuring DHCP settings for each VMnet.
- Creating additional custom VMnets (e.g., VMnet2, VMnet3) for complex lab isolation.
- Managing Host Virtual Adapters (the interfaces seen by the host OS).

## Accessing the Editor
The Virtual Network Editor must be run with **Administrator** privileges to modify network configurations. It is typically found in the VMware folder in the Start Menu or via the `Edit` > `Virtual Network Editor` menu within VMware Workstation.
