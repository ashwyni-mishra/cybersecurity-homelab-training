# 02-07: Configuring NAT and Routing in pfSense

## What is it used for?
Network Address Translation (NAT) and Routing are the core functions that allow pfSense to act as a gateway. These features are used to:
- **Enable Internet Access**: Allow internal lab machines with private IP addresses to reach the internet for updates or research.
- **Publish Services**: Make internal services (like a web server or an exploit target) accessible from the management network or the "outside" world.
- **Control Traffic Flow**: Ensure that data packets know which path to take to reach their destination across different network segments.

## Techniques
In a cybersecurity lab, several NAT and routing techniques are essential:

1. **Outbound NAT (Masquerading)**: Translating the source IP of outgoing packets from an internal private address to the firewall's WAN IP.
2. **Port Forwarding (DNAT)**: Mapping an external port on the firewall's WAN interface to an internal IP and port, allowing external access to a specific service.
3. **Static Routing**: Manually defining paths for traffic destined for networks that are not directly connected to the firewall.
4. **Inter-VLAN Routing**: Routing traffic between different internal segments (e.g., between the LAN and the DMZ) based on security policies.

## How those techniques are used
In our specific environment, we use these techniques to manage our lab's visibility and connectivity:

- **Scenario: Updating Target OS**: When a target VM (e.g., Ubuntu) runs `sudo apt update`, the request goes to pfSense. pfSense uses **Outbound NAT** to change the source IP to its WAN address before sending it to the internet, then tracks the response to send it back to the target.
- **Scenario: Exposing a Vulnerable App**: We use **Port Forwarding** to map port 8080 on the pfSense WAN to port 80 on our internal OWASP Juice Shop VM. This allows us to access the vulnerable app from our main physical host via the pfSense WAN IP.
- **Scenario: Segment Isolation**: By default, pfSense routes traffic between its interfaces. We use firewall rules to "police" this routing, ensuring that a compromised machine in the DMZ cannot freely route packets into our Management segment.

## Commands used
While these settings are typically managed in the pfSense WebGUI, understanding the underlying system logic is helpful.

### Viewing NAT Tables (pfSense Shell)
```bash
# List all active NAT rules
pfctl -sn

# View the current NAT translation table (states)
pfctl -ss | grep "NAT"
```

### WebGUI Paths
- **Outbound NAT**: `Firewall > NAT > Outbound`
- **Port Forwarding**: `Firewall > NAT > Port Forward`
- **Routing Table**: `Diagnostics > Routes`

### Configuring Port Forwarding via GUI
1. Go to **Firewall > NAT > Port Forward**.
2. Click **Add**.
3. **Interface**: `WAN`.
4. **Protocol**: `TCP`.
5. **Destination Port Range**: `From: 80, To: 80`.
6. **Redirect Target IP**: `10.0.1.50` (Target VM IP).
7. **Redirect Target Port**: `80`.
8. **Description**: `Access to Internal Web Target`.
9. Click **Save** and **Apply Changes**.

## Summary
NAT and Routing are what turn our virtual lab from a collection of isolated machines into a functional network. Outbound NAT provides the "cloaking" needed for internal machines to reach the internet, while Port Forwarding allows us to selectively expose targets for testing. Mastering these concepts is vital for any security professional managing network-based environments.

## Reference links
- [pfSense Documentation: NAT](https://docs.netgate.com/pfsense/en/latest/nat/index.html)
- [Netgate: Port Forwarding Guide](https://docs.netgate.com/pfsense/en/latest/nat/port-forwards.html)
- [RFC 1918: Address Allocation for Private Internets](https://datatracker.ietf.org/doc/html/rfc1918)
- [Understanding the 'pf' Packet Filter](https://www.openbsd.org/faq/pf/nat.html)

## Next Lesson
[Next Lesson: 02-08 - Establishing the DMZ](/lessons/module-2/02-08-establishing-the-dmz)
