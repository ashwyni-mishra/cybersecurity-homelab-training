# 02-07: Configuring NAT and Routing in pfSense

## Objective
To enable communication between the management zone (where the administrator sits) and the internal target networks, while maintaining controlled access.

## WebConfigurator Access
Since the LAN interface is isolated, access the pfSense web interface from a management VM connected to `vmbr0` or temporarily allow access from the WAN.

## NAT Configuration

### Outbound NAT
1.  Navigate to **Firewall** > **NAT** > **Outbound**.
2.  Switch to **Hybrid Outbound NAT** mode and click **Save**.
3.  This ensures that internal target VMs can reach the internet for updates through the WAN interface if specifically allowed.

### Port Forwarding (Simulating Public Services)
1.  Navigate to **Firewall** > **NAT** > **Port Forward**.
2.  **Interface**: WAN.
3.  **Protocol**: TCP.
4.  **Destination Port**: 80 (HTTP).
5.  **Redirect Target IP**: `10.0.1.20` (Internal Web Server).
6.  **Redirect Target Port**: 80.
7.  Click **Save** and **Apply Changes**.

## Routing
pfSense acts as the default gateway for all hosts in the `10.0.1.0/24` network. It automatically routes traffic between its directly connected networks based on the rules defined in the firewall.
