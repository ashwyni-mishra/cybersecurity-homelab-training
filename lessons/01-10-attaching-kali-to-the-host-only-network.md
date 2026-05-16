# 01-10: Attaching Kali to the Host-Only Network

## Objective
To transition Kali Linux from the NAT network (used for updates) to the isolated Host-Only network (VMnet2), where it can interact with the Proxmox environment without exposing the lab traffic to the internet or the production host network.

## VMware Settings Modification
1.  Shut down the Kali Linux VM.
2.  Right-click the VM and select **Settings**.
3.  Select the **Network Adapter**.
4.  Change the connection type to **Custom: Specific virtual network**.
5.  Select **VMnet2 (Host-only)** from the dropdown.
6.  Click **OK**.
7.  Power on the VM.

## OS-Level Configuration (Kali)
Since the VMnet2 network does not have a DHCP server (configured in 01-05), a static IP must be assigned manually.

1.  Open the network configuration file or use the GUI network manager.
2.  Assign the following static IP configuration:
    - **IP Address**: `10.0.2.5`
    - **Netmask**: `255.255.255.0`
    - **Gateway**: `10.0.2.1` (This will be the pfSense address later).
3.  Restart the networking service:
```bash
sudo systemctl restart networking
```

## Verification
Verify the interface status using `ip addr`. The `eth0` interface should now reflect the assigned `10.0.2.5` address. Connectivity to Proxmox will be established once the bridges are configured in the next module.
