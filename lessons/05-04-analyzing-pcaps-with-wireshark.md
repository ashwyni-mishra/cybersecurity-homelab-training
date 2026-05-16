# 05-04: Analyzing pcaps with Wireshark

## Overview
Wireshark is the world's foremost network protocol analyzer. It provides a graphical interface to interactively browse packet data from a live network or a previously saved capture file (pcap).

## Core Features
- **Deep Inspection**: Thousands of protocols are supported, with more being added constantly.
- **Display Filters**: Powerful filtering language to isolate specific traffic (e.g., `http.request.method == "POST"`).
- **Follow Stream**: Reassemble TCP, UDP, or TLS streams to view the full conversation.
- **Statistics**: Built-in tools for analyzing protocol hierarchy, endpoints, and conversations.

## Identifying Attack Patterns
- **Reconnaissance**: Large volumes of SYN packets to multiple ports (port scanning) or many ARP requests.
- **Brute Force**: Multiple failed login attempts in application-layer protocols like SSH, FTP, or HTTP.
- **Data Exfiltration**: Unusual volumes of outbound traffic to external IPs, particularly over unexpected ports.
- **Web Attacks**: SQL injection attempts in GET/POST parameters or shellcode in HTTP headers.

## Workflow
1.  **Open Capture**: Load the pcap file into Wireshark.
2.  **Filter**: Use display filters to narrow down the noise.
3.  **Analyze**: Examine packet details and reassemble streams.
4.  **Export**: Save relevant findings for reporting or further investigation.
