# 04-03: Active Network Discovery with Nmap

## What is it used for?
Active Network Discovery with Nmap (Network Mapper) is used to identify live hosts on a network, discover open ports, and enumerate the services running on those ports. Unlike passive reconnaissance, active discovery involves sending packets directly to the target systems and analyzing the responses. This process is essential for building an accurate map of the target's attack surface, identifying potential entry points, and gathering the information necessary for vulnerability analysis and exploitation.

## Techniques
Nmap employs several techniques to gather information:
1.  **Host Discovery**: Identifying which IP addresses in a range are currently assigned to active devices (e.g., Ping scans).
2.  **TCP Port Scanning**: Sending various TCP packets (SYN, ACK, FIN, etc.) to determine if a port is open, closed, or filtered.
3.  **UDP Port Scanning**: Identifying open UDP services, which is more challenging due to the connectionless nature of UDP.
4.  **Service and Version Detection**: Probing open ports with specific payloads to determine the exact application name and version number.
5.  **OS Fingerprinting**: Analyzing subtle differences in how a system's TCP/IP stack responds to packets to guess the operating system.
6.  **Scripting Engine (NSE)**: Using automated scripts to perform advanced discovery, vulnerability detection, and even basic exploitation.

## How those techniques are used
-   **Mapping a Subnet**: A security auditor uses a ping scan (`-sn`) to quickly identify all active servers in a new data center segment.
-   **Identifying Vulnerable Services**: By running a version scan (`-sV`), a pentester discovers that a web server is running an outdated version of Apache (e.g., 2.4.49) that is vulnerable to path traversal.
-   **Bypassing Firewalls**: Using the SYN scan (`-sS`) technique allows for faster and more stealthy scanning because it doesn't complete the 3-way handshake, often evading simple logging mechanisms.
-   **Inventorying Shadow IT**: Scanning all 65,535 ports (`-p-`) might reveal an unofficial database or management interface (like IPMI) running on a non-standard port that was previously unknown to the IT team.

## Commands used
Nmap is primarily used via the command line with various flags:
-   **Discovery and Basic Scanning**:
    ```bash
    # Find live hosts in a subnet without scanning ports
    nmap -sn 10.0.0.0/24

    # Standard stealth scan of the top 1000 ports
    nmap -sS 10.0.0.5
    ```
-   **Detailed Enumeration**:
    ```bash
    # Scan all ports with service version and OS detection
    nmap -p- -sV -O 10.0.0.5

    # Aggressive scan (Includes OS detection, versioning, and scripts)
    nmap -A 10.0.0.5
    ```
-   **NSE Scripting**:
    ```bash
    # Run default scripts to check for common issues
    nmap -sC 10.0.0.5

    # Check for vulnerabilities specifically related to the 'http' service
    nmap --script http-vuln-* 10.0.0.5
    ```
-   **Performance Tuning**:
    ```bash
    # Increase speed to level 4 (recommended for reliable local networks)
    nmap -T4 10.0.0.5
    ```

## Summary
Nmap is the "Swiss Army Knife" of network security. It provides an unparalleled ability to discover what is happening on a network by identifying hosts, services, and operating systems. Mastering Nmap's various scanning techniques and flags is a fundamental skill for any security professional, enabling them to move from initial network discovery to detailed vulnerability assessment.

## Reference links
- [Nmap Reference Guide (Official)](https://nmap.org/book/man.html)
- [Nmap Scripting Engine (NSE) Documentation](https://nmap.org/book/nse.html)
- [The Art of Port Scanning (Nmap Book)](https://nmap.org/book/man-port-scanning-techniques.html)
- [Nmap Cheat Sheet](https://stationx.net/nmap-cheat-sheet/)
