# 03-08: Verifying Target Accessibility

## What is it used for?
Verifying target accessibility is a critical validation step in the homelab setup. It is used to:
- **Confirm Network Routing**: Ensure that traffic from the Offensive Network (Kali Linux) can reach the Isolated Sandbox (LXC targets) through the pfSense firewall.
- **Validate Service Status**: Confirm that the Docker containers (DVWA, Juice Shop) started correctly and are listening for connections.
- **Troubleshoot Firewall Rules**: Identify if the security policies created in Module 2 are correctly allowing or accidentally blocking legitimate lab traffic.
- **Baseline Connectivity**: Establish a known-good state before beginning complex exploitation or monitoring tasks.

## Techniques
We use a layered approach to verify connectivity, moving from the network layer up to the application layer:
1. **ICMP Testing (Layer 3)**: Using `ping` to check for basic end-to-end reachability.
2. **Port Scanning (Layer 4)**: Using `nmap` to verify that specific TCP ports (80 for DVWA, 3000 for Juice Shop) are open and accessible.
3. **Application Probing (Layer 7)**: Using `curl` or a web browser to confirm that the web services are returning valid HTTP responses.
4. **Path Tracing**: Using `traceroute` to visualize the hops (gateways) between the attacker and the target.

## How those techniques are used
- **Step-by-Step Verification**: Start with a `ping`. If it fails, the issue is likely routing or a firewall blocking ICMP. If `ping` succeeds but the web page won't load, the issue is likely the Docker container or a port-specific firewall rule.
- **Firewall Log Inspection**: If connectivity fails, we log into the pfSense web interface (configured in Lesson 02-05) and check **Status > System Logs > Firewall** to see if packets from the Kali IP are being dropped.
- **Service Verification**: Running `docker compose ps` inside the Ubuntu LXC container confirms the applications are "Up".

## Commands used

### From Kali Linux (Attacker)
```bash
# 1. Test basic reachability
ping -c 4 <TARGET_IP>

# 2. Scan for specific service ports
nmap -p 80,3000 <TARGET_IP>

# 3. Verify HTTP headers
curl -I http://<TARGET_IP>:80
curl -I http://<TARGET_IP>:3000

# 4. Check the network path
traceroute <TARGET_IP>
```

### From Ubuntu LXC (Target Host)
```bash
# Check if Docker containers are running
docker ps

# Check local port listening status
ss -tulpn | grep -E '80|3000'
```

### From pfSense (Gateway)
- Navigate to **Diagnostics > Ping** in the GUI to test connectivity from the firewall to the containers.
- Navigate to **Status > System Logs > Firewall** to monitor real-time traffic filtering.

## Summary
Verification is the bridge between infrastructure setup and security testing. By systematically checking reachability, port status, and application responses, we ensure that our lab environment is robust and that any future "failures" during exploits are due to security controls or incorrect techniques, rather than simple network misconfigurations.

## Reference links
- [Nmap Official Documentation](https://nmap.org/docs.html)
- [How to use the Ping command](https://www.linuxfoundation.org/blog/blog/classic-sysadmin-how-to-use-the-ping-command-on-linux)
- [pfSense: Troubleshooting Firewall Rules](https://docs.netgate.com/pfsense/en/latest/firewall/troubleshooting-blocked-traffic.html)
- [Understanding HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
