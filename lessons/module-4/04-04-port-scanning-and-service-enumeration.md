# 04-04: Port Scanning and Service Enumeration

## Overview
After discovering live hosts, the next step is to identify open ports and the specific versions of services running on those ports.

## Service Detection
Using the `-sV` flag, Nmap attempts to determine the version of the service running on a port by analyzing banners and response patterns.

## Scripting Engine (NSE)
Nmap Scripting Engine allows for automated vulnerability detection and advanced discovery. Example:
`nmap --script http-enum <target>`
