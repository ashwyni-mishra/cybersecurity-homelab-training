# 01-05: Creating the Host-Only Network

## Objective
To ensure complete isolation of the internal lab traffic from the production network, a custom Host-Only network (VMnet2) will be created. This network will serve as the primary transport layer for the nested environment.

## Configuration Steps

1.  Open the **Virtual Network Editor** as Administrator.
2.  Click **Add Network...** and select **VMnet2**.
3.  Set the Network Type to **Host-only**.
4.  **Uncheck** "Connect a host virtual adapter to this network" to further isolate the network from the host OS (optional, but recommended for high-security labs).
5.  **Uncheck** "Use local DHCP service to distribute IP addresses to VMs". IP addressing in this lab will be managed manually or by a dedicated virtual firewall (pfSense).
6.  **Subnet IP**: Set this to a dedicated range, such as `10.0.2.0`.
7.  **Subnet Mask**: `255.255.255.0`.
8.  Click **Apply** to save the changes.

## Verification
Verify the creation of the virtual adapter in the host OS (if enabled) using the following command in PowerShell:
```powershell
Get-NetAdapter | Where-Object { $_.InterfaceDescription -like "*VMware*" }
```
This network now provides an isolated segment for traffic between Kali Linux and the Proxmox L2 hypervisor.
