# 04-03: Active Network Discovery with Nmap

## Overview
Nmap (Network Mapper) is the industry-standard tool for network discovery and security auditing. It sends specially crafted packets to the target and analyzes the responses.

## Common Commands
- **Host Discovery**: `nmap -sn 192.168.1.0/24` (Ping sweep).
- **TCP Connect Scan**: `nmap -sT <target>`.
- **SYN Stealth Scan**: `nmap -sS <target>`.
- **UDP Scan**: `nmap -sU <target>`.
- **Timing Templates**: `-T0` (Paranoid) to `-T5` (Insane).

## Reference Links
- **Nmap Official Documentation**: [The Nmap Reference Guide](https://nmap.org/book/man.html)
- **Nmap Scripting Engine (NSE)**: [Browse Official Scripts](https://nmap.org/nsedoc/)
- **Top 10 Scanning Techniques**: [Nmap.org Guide](https://nmap.org/book/nmap-usage.html)
