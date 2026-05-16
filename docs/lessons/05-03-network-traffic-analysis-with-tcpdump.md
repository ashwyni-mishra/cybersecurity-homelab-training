# 05-03: Network Traffic Analysis with tcpdump

## Overview
`tcpdump` is a powerful command-line packet analyzer. it allows users to display TCP/IP and other packets being transmitted or received over a network to which the computer is attached.

## Basic Syntax
The basic command to capture traffic on a specific interface is:
`tcpdump -i eth0`

## Common Options
- `-n`: Do not resolve hostnames or port names.
- `-v`, `-vv`, `-vvv`: Increase verbosity.
- `-c [count]`: Stop after receiving [count] packets.
- `-w [file]`: Write the raw packets to a file (pcap format).
- `-r [file]`: Read packets from a pcap file.

## Using BPF Filters
Berkeley Packet Filters (BPF) allow for precise targeting of traffic:
- `host 192.168.1.50`: Capture traffic to/from a specific host.
- `port 80`: Capture traffic on a specific port.
- `src 10.0.0.5`: Capture traffic originating from a specific source IP.
- `dst net 172.16.0.0/24`: Capture traffic destined for a specific subnet.
- `tcp`: Capture only TCP packets.

## Use Cases
`tcpdump` is invaluable for troubleshooting network connectivity, analyzing application behavior, and identifying suspicious network activity in real-time or via post-capture analysis.
