# 03-08: Verifying Target Accessibility

## Overview
Before beginning offensive operations, it is critical to verify that the Kali Linux instance (Offensive Network) can route traffic correctly to the targets in the Isolated Sandbox (vmbr1) through the pfSense firewall.

## Verification Steps
1. **Ping Test**: Attempt to ping the static IPs of the LXC containers from Kali.
2. **Nmap Scan**: Run a basic `nmap -F <target_ip>` to ensure ports 80/3000 are open.
3. **Browser Access**: Open Firefox in Kali and navigate to the URLs of DVWA and Juice Shop.
4. **Firewall Logs**: If unreachable, check the pfSense firewall logs for dropped packets on the DMZ/Sandbox interfaces.
