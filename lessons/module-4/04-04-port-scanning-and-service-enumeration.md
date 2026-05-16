# 04-04: Port Scanning and Service Enumeration

## What is it used for?
Port Scanning and Service Enumeration are used to identify the specific applications and services running on a target system. While network discovery tells you *if* a machine is alive, port scanning tells you *what* it is doing. Service enumeration goes deeper by identifying the specific version and configuration of those services. This information is critical for vulnerability mapping, as many exploits are version-specific. Identifying a service like "Apache 2.4.18" is far more useful than simply knowing that port 80 is open.

## Techniques
1.  **Banner Grabbing**: Connecting to a port and reading the initial text string (banner) sent by the service, which often reveals the application name and version.
2.  **Service Fingerprinting**: Sending specific probes and comparing the responses to a database of known service behaviors (Nmap's `-sV` technique).
3.  **Default Credential Testing**: Attempting to log in with common or default usernames and passwords (e.g., admin/admin) on identified services like SSH, Telnet, or HTTP.
4.  **Protocol-Specific Enumeration**: Using specialized tools to extract detailed information from specific protocols (e.g., enumerating SMB shares, SNMP communities, or LDAP directories).
5.  **Vulnerability Scripting**: Running automated scripts (like Nmap's NSE) to check for known misconfigurations or vulnerabilities associated with a specific service.

## How those techniques are used
-   **Identifying Exploitable Software**: A scanner finds port 445 (SMB) open. By enumerating the service, it determines the target is running an old version of Windows without the MS17-010 patch (EternalBlue).
-   **Finding Hidden Admin Panels**: Enumerating a web server on port 80/443 might reveal a `/phpmyadmin` or `/admin` directory that wasn't linked from the main page.
-   **Extracting User Lists**: Using specialized tools like `enum4linux` on port 139/445 can sometimes leak a list of local users on a Windows machine.
-   **SNMP Data Harvesting**: If port 161 (SNMP) is open with a default "public" community string, an attacker can extract system information, network interfaces, and even running processes.

## Commands used
-   **Nmap Service Enumeration**:
    ```bash
    # Intense service version detection
    nmap -sV --version-intensity 5 10.0.0.5

    # Enumerate common HTTP directories/files
    nmap --script http-enum 10.0.0.5
    ```
-   **Manual Banner Grabbing**:
    ```bash
    # Connect to a port using netcat to see the banner
    nc -nv 10.0.0.5 22
    ```
-   **Protocol-Specific Tools**:
    ```bash
    # Enumerate SMB shares and user info (requires enum4linux)
    enum4linux -a 10.0.0.5

    # Enumerate SNMP data (requires snmp-check)
    snmp-check -t 10.0.0.5 -c public
    ```

## Summary
Port Scanning and Service Enumeration bridge the gap between initial discovery and exploitation. By identifying the exact software versions and configurations of target services, a security professional can pinpoint specific vulnerabilities and develop a targeted attack plan. Without this detailed information, exploitation attempts are often "blind" and far more likely to fail or be detected.

## Reference links
- [Nmap Service and Version Detection](https://nmap.org/book/vscan.html)
- [HackTricks: Pentesting Services](https://book.hacktricks.xyz/network-services-pentesting)
- [Enum4linux-ng GitHub](https://github.com/carlospolop/enum4linux-ng)
- [CWE-200: Exposure of Sensitive Information through Data Under-extraction](https://cwe.mitre.org/data/definitions/200.html)
