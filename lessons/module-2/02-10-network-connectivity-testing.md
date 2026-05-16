# 02-10: Network Connectivity Testing

## What is it used for?
Network connectivity testing is the validation phase of our lab setup. It ensures that the complex multi-layered network we've built—spanning from the physical host to the nested virtual machines—is correctly routed and secured. 

This process is used to:
- **Confirm Routing Paths**: Verify that traffic is flowing through the pfSense firewall as expected.
- **Validate Firewall Rules**: Ensure that "Allow" rules permit legitimate traffic and "Deny" rules successfully block unauthorized access.
- **Identify Bottlenecks or Misconfigurations**: Quickly find issues like incorrect IP assignments, missing gateway settings, or virtual switch misconfigurations.
- **Establish a Baseline**: Create a known-good state of the network before starting offensive or defensive exercises.

## Techniques
- **ICMP Reachability Testing**: Using Ping to check basic connectivity between different network segments.
- **Path Analysis**: Using Traceroute to map the hops traffic takes through the nested gateways.
- **Port Scanning**: Using Nmap to verify that specific services (like HTTP or SSH) are reachable through the firewall.
- **Log Inspection**: Monitoring firewall logs in real-time to see which rules are being triggered during tests.
- **Protocol Analysis**: Using packet capture tools (like tcpdump) to verify that traffic is reaching its destination without being altered.

## How those techniques are used
- **Layered Ping Tests**: Testing starts from the innermost segment (DMZ) and moves outward, then from the outermost (Kali) and moves inward.
- **Gateway Hop Verification**: Running traceroute from Kali to a target machine to ensure it hits the pfSense WAN IP before reaching the target LAN IP.
- **Service Verification**: Even if Ping is blocked for security reasons, we use Nmap to check if web servers or databases are accessible on their specific ports.
- **Negative Testing**: Deliberately trying to access a blocked segment to ensure the firewall is actually doing its job (e.g., trying to access the Management interface from the DMZ).

## Commands used

### Basic Connectivity Check
```bash
ping -c 4 10.0.1.20
```

### Trace the Network Path
On Linux/Kali:
```bash
traceroute 10.0.1.20
```
On Windows:
```bash
tracert 10.0.1.20
```

### Check Port Accessibility
```bash
nmap -Pn -p 80,443,22 10.0.1.20
```

### Verify Interface IP and Routes
```bash
ip addr
ip route
```

### Real-time Log Monitoring (on pfSense via Shell)
```bash
clog /var/log/filter.log | tail -f
```

## Summary
Successful connectivity testing marks the completion of the "Build" phase of your homelab. By systematically verifying pings, traceroutes, and port access, you confirm that your virtual network architecture is robust and correctly isolated. If any test fails, the results provide a clear starting point for troubleshooting, typically leading back to a firewall rule or a virtual network adapter setting.

## Reference links
- [pfSense Documentation: Troubleshooting Connectivity](https://docs.netgate.com/pfsense/en/latest/troubleshooting/connectivity.html)
- [Nmap Network Scanning Guide](https://nmap.org/book/man.html)
- [ICMP Protocol Overview (RFC 792)](https://datatracker.ietf.org/doc/html/rfc792)
- [Understanding Traceroute](https://www.net.princeton.edu/traceroute.html)

## Next Lesson
[Next Lesson: 03-01 - Linux Containers (LXC) Fundamentals](/lessons/module-3/03-01-linux-containers-lxc-fundamentals)
