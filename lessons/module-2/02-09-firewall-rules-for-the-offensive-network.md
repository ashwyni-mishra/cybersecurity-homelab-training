# 02-09: Firewall Rules for the Offensive Network

## What is it used for?
Firewall rules for the offensive network are designed to facilitate security testing while maintaining safety. These rules are used to:
- **Enable Exploit Delivery**: Allow an attacker machine (e.g., Kali Linux) to send various types of traffic (scans, exploits, shells) into the target environment.
- **Contain Malicious Activity**: Prevent any automated malware or aggressive scanning from "leaking" out of the lab and into your physical home network or the internet.
- **Monitor Attack Patterns**: Use firewall logs to see exactly what traffic is being sent and what is being blocked, providing a "defender's view" of the offensive operations.

## Techniques
Managing an offensive network segment requires specific firewalling techniques:

1. **Permissive Inbound Rules**: Setting up rules that allow specific source IPs (the attacker) to reach internal target subnets on any port/protocol.
2. **Egress Lockdown**: Implementing a "Default Deny" policy for outgoing traffic from the lab segments to prevent data exfiltration or malware command-and-control (C2) callbacks to the internet.
3. **Bypassing Bogon Filters**: Disabling default protections that block private IP ranges (RFC 1918) on the WAN interface, as our lab uses these ranges for management.
4. **Log-All Policy**: Enabling detailed logging on specific rules to capture every packet of an attack for later analysis in a SIEM or log viewer.

## How those techniques are used
In our cybersecurity lab, we apply these techniques to create a controlled "firing range":

- **Scenario: Initial Scanning**: We create a rule on the WAN interface that allows our Kali machine (`10.0.2.5`) to send any traffic into the LAN and DMZ subnets. This allows `nmap` scans to pass through the firewall uninterrupted.
- **Scenario: Malware Execution**: If we execute a piece of ransomware on a target Windows VM in the LAN, the **Egress Lockdown** rule prevents it from reaching out to the internet to fetch encryption keys or notify its creator, keeping the infection contained.
- **Scenario: Reverse Shells**: To allow a reverse shell to work, we must ensure the firewall permits the target VM to "talk back" to the Kali machine on a specific port (e.g., 4444). We create a "Pass" rule for this specific flow.

## Commands used
Firewall rules are mostly managed via the pfSense WebGUI, but can be inspected via the shell.

### Inspecting Rules (pfSense Shell)
```bash
# View the ruleset currently loaded into the 'pf' engine
pfctl -sr | grep "Kali"

# Watch the firewall log in real-time
tail -f /var/log/filter.log
```

### WebGUI Paths
- **Rule Configuration**: `Firewall > Rules`
- **Interface Selection**: Click on `WAN`, `LAN`, or `DMZ` tabs.

### Disabling Private IP Blocking (Critical for Lab)
1. Navigate to **Interfaces > WAN**.
2. Scroll to the bottom (**Reserved Networks**).
3. Uncheck **Block private networks and loopback addresses**.
4. Uncheck **Block bogon networks**.
5. Click **Save** and **Apply Changes**.

### Creating an Offensive "Pass" Rule
1. Go to **Firewall > Rules > WAN**.
2. Click **Add**.
3. **Action**: `Pass`.
4. **Protocol**: `Any`.
5. **Source**: `Single host or alias`, `10.0.2.5` (Kali IP).
6. **Destination**: `Any` (or specific target subnet).
7. **Description**: `Allow Kali to Attack Targets`.
8. Click **Save** and **Apply**.

## Summary
Firewall rules are the "rules of engagement" for your lab. By properly configuring pfSense to allow traffic from your attacker machine while strictly limiting where lab traffic can go, you create a safe environment for high-risk testing. Disabling default WAN protections is a necessary step in nested labs, and enabling logging provides the data needed for deep analysis of your offensive techniques.

## Reference links
- [pfSense Documentation: Firewall Rule Basics](https://docs.netgate.com/pfsense/en/latest/firewall/firewall-rule-basics.html)
- [Netgate: Troubleshooting Firewall Rules](https://docs.netgate.com/pfsense/en/latest/firewall/troubleshooting-firewall-rules.html)
- [RFC 1918: Private Address Space](https://datatracker.ietf.org/doc/html/rfc1918)
- [The OpenBSD Packet Filter (pf) Manual](https://man.openbsd.org/pf.4)

## Next Lesson
[Next Lesson: 02-10 - Network Connectivity Testing](/lessons/module-2/02-10-network-connectivity-testing)
