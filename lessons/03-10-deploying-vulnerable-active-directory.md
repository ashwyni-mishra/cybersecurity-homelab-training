# 03-10: Deploying Vulnerable Active Directory

## Overview
Active Directory (AD) is the core of most enterprise networks and a primary target for attackers. A vulnerable AD lab allows for testing techniques like Kerberoasting and NTLM relaying.

## Components
1. **Domain Controller**: Windows Server running AD DS and DNS.
2. **Client Workstation**: Windows 10/11 joined to the domain.
3. **Vulnerabilities**: Intentional misconfigurations such as weak passwords, unconstrained delegation, and ACL misconfigurations using tools like 'BadBlood' or manual scripts.
