# 02-02: Configuring vmbr0 Management Interface

## Objective
To configure the first virtual bridge (`vmbr0`) in Proxmox to handle management traffic and provide internet access via the VMware NAT network.

## Configuration Steps

1.  Log in to the Proxmox Web GUI.
2.  Navigate to **System** > **Network**.
3.  Identify the first network interface (e.g., `ens33` or `eth0`).
4.  Edit `vmbr0`:
    - **Bridge ports**: Ensure it points to the primary interface (`ens33`).
    - **IP Address**: This should already be set from the installation (e.g., `192.168.x.100/24`).
    - **Gateway**: Points to the VMware NAT gateway (`192.168.x.2`).
5.  Click **OK** and then **Apply Configuration**.

## Verification
Test connectivity from the Proxmox console:
```bash
ping -c 3 8.8.8.8
```
If the ping is successful, the management bridge is correctly routing traffic through the L1 NAT network.
