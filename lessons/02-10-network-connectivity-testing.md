# 02-10: Network Connectivity Testing

## Objective
To verify the end-to-end connectivity of the nested architecture and ensure that all routing and firewall rules are functioning as intended.

## Test Matrix

| From | To | Method | Expected Result |
| :--- | :--- | :--- | :--- |
| Kali (10.0.2.5) | pfSense WAN | `ping 192.168.x.y` | Success |
| Kali (10.0.2.5) | Proxmox Host | `ping 192.168.x.100` | Success |
| Kali (10.0.2.5) | Target (10.0.1.20) | `ping 10.0.1.20` | Success (if rule 02-09 is applied) |
| Target (10.0.1.20) | Internet | `ping 8.8.8.8` | Failure (if outbound block is applied) |

## Tools and Commands

### Ping
Verify basic Layer 3 connectivity:
```bash
ping -c 4 10.0.1.20
```

### Traceroute
Visualize the path through the virtual gateways:
```bash
traceroute 10.0.1.20
```
Expected path: `10.0.2.1` (VMware Gateway) -> `10.0.2.x` (pfSense WAN) -> `10.0.1.20` (Target).

### Nmap
Verify that services are reachable through the firewall:
```bash
nmap -Pn -p 80 10.0.1.20
```

## Troubleshooting
If connectivity fails, check the following:
1.  **Promiscuous Mode**: Ensure that "Promiscuous Mode" is enabled on the virtual switches if necessary.
2.  **Firewall Logs**: Check **Status** > **System Logs** > **Firewall** in pfSense.
3.  **Interface Status**: Ensure all virtual cables are "connected" in both VMware and Proxmox.
