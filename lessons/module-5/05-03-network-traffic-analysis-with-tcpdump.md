# 05-03: Network Traffic Analysis with tcpdump

## What is it used for?
`tcpdump` is a powerful command-line packet analyzer used to capture and inspect network traffic. In a security context, it is indispensable for:
*   **Incident Response**: Capturing malicious traffic during an active attack for forensic evidence.
*   **Network Troubleshooting**: Identifying why a connection is failing or where packets are being dropped in a complex virtual network.
*   **Protocol Analysis**: Verifying if applications are using encryption (like TLS) or sending sensitive data in plaintext.
*   **Vulnerability Assessment**: Monitoring how a target system responds to specific exploit payloads or scanning techniques.

## Techniques
### Berkeley Packet Filter (BPF)
`tcpdump` uses BPF syntax to filter traffic at the kernel level. This ensures that only relevant packets are processed by the tool, which is crucial for maintaining performance on high-traffic interfaces.

### Snaplen (Snapshot Length)
This determines how many bytes of each packet are captured. Capturing only the headers (e.g., 96 bytes) is efficient for metadata analysis, while capturing the full packet (`-s 0`) is necessary for inspecting the application-layer payload.

### PCAP File Management
Traffic is often captured to a `.pcap` (Packet Capture) file. These files serve as a "recording" of network activity that can be analyzed later using `tcpdump` itself or graphical tools like Wireshark.

### Verbosity and Payload Inspection
Using flags like `-v` (verbose), `-A` (ASCII), and `-X` (Hex + ASCII), analysts can see the details of packet headers and the actual data being transmitted.

## How those techniques are used
*   **Detecting Scans**: An administrator can run `tcpdump` on a Proxmox bridge (`vmbr1`) to watch for incoming Nmap "SYN" scans from the Kali VM.
*   **Exposing Credentials**: By capturing traffic on port 80 (HTTP) or 21 (FTP), a security analyst can use the `-A` flag to see usernames and passwords being transmitted in plaintext.
*   **Headless Capture**: On a remote or resource-constrained server, you can capture traffic to a file and then download that file to a local workstation for deep analysis.
*   **Filtering Noise**: Using `not port 22` allows you to monitor network traffic without seeing your own SSH management session.

## Commands used

### Basic Capture and Display
```bash
# Capture on a specific interface without DNS or port resolution
tcpdump -i eth0 -nn

# Capture the full packet payload in Hex and ASCII
tcpdump -i eth0 -s 0 -X

# Capture 100 packets and exit
tcpdump -i eth0 -c 100
```

### Filtering with BPF Syntax
```bash
# Capture only traffic to or from a specific IP
tcpdump -i eth0 host 10.0.0.5

# Capture only TCP traffic on port 443 (HTTPS)
tcpdump -i eth0 tcp port 443

# Capture all traffic EXCEPT SSH
tcpdump -i eth0 not port 22

# Capture traffic on a specific subnet
tcpdump -i eth0 net 192.168.1.0/24
```

### Working with Files
```bash
# Write traffic from the internal bridge to a pcap file
tcpdump -i vmbr1 -w investigation.pcap

# Read from a saved file and filter for HTTP traffic with ASCII output
tcpdump -r investigation.pcap port 80 -A
```

## Summary
`tcpdump` is the "Swiss Army Knife" of network security. While it lacks the graphical interface of Wireshark, its speed, efficiency, and near-universal availability on Linux systems make it the first tool most analysts reach for. Mastery of its BPF filters allows you to quickly isolate critical security events from the background noise of a busy network.

## Reference links
- [Official tcpdump Documentation](https://www.tcpdump.org/manpages/tcpdump.1.html)
- [Daniel Miessler's tcpdump Primer](https://www.danielmiessler.com/study/tcpdump/)
- [SANS: Tcpdump Cheat Sheet](https://www.sans.org/blog/tcpdump-cheat-sheet/)
- [Wireshark Wiki: BPF Syntax](https://wiki.wireshark.org/CaptureFilters)

## Next Lesson
[Next Lesson: 05-04 - Analyzing pcaps with Wireshark](/lessons/module-5/05-04-analyzing-pcaps-with-wireshark)
