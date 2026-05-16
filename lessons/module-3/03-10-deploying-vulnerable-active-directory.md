# 03-10: Deploying Vulnerable Active Directory

## What is it used for?
Active Directory (AD) is the backbone of identity management in over 90% of Fortune 500 companies. A "vulnerable" AD lab is used to:
- **Simulate Enterprise Attacks**: Practice techniques like Kerberoasting, AS-REP Roasting, and Pass-the-Hash.
- **Learn Lateral Movement**: Understand how attackers move from a compromised workstation to becoming a Domain Admin.
- **Understand Misconfigurations**: See firsthand how weak passwords, unconstrained delegation, and insecure ACLs can be exploited.
- **Test Defensive Tools**: Evaluate the effectiveness of EDRs and SIEMs (like Wazuh, which we will deploy in Module 5) in detecting AD-specific attacks.

## Techniques
Building a vulnerable AD environment involves several strategic steps:
1. **Domain Controller Promotion**: Transforming a base Windows Server into a central authority for the domain.
2. **Bulk Object Generation**: Using scripts to create hundreds or thousands of realistic user accounts, groups, and computer objects.
3. **Intentional Misconfiguration**: Deliberately creating security holes, such as assigning Service Principal Names (SPNs) to accounts with weak passwords.
4. **Domain Joining**: Connecting client workstations to the domain to provide a starting point for an attacker's lateral movement.

## How those techniques are used
- **Rapid Cloning**: We use the Windows Server template created in Lesson 03-09 to quickly spin up a new VM for the Domain Controller (DC).
- **PowerShell Automation**: Instead of manual configuration, we use PowerShell to install the AD DS role and promote the server.
- **BadBlood Integration**: We run the `BadBlood` script, which automatically populates the AD with a complex structure of OUs, Users, and Groups, and then randomly applies security misconfigurations to make the lab "hackable."
- **Network Placement**: The DC is placed on the same isolated bridge (`vmbr1`) as our other targets, ensuring it is reachable from the Kali Linux offensive machine.

## Commands used

### Promoting to Domain Controller (PowerShell)
```powershell
# Install the AD DS Role
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Promote to a new Forest
Install-ADDSForest -DomainName "homelab.local" -SafeModeAdministratorPassword (convertto-securestring "Password123!" -asplaintext -force)
```

### Injecting Vulnerabilities (BadBlood)
Run these commands after downloading the BadBlood script:
```powershell
Set-ExecutionPolicy Bypass -Scope Process
.\Invoke-BadBlood.ps1
```

### Joining a Client Workstation to the Domain
Run this on a Windows 10/11 VM:
```powershell
Add-Computer -DomainName "homelab.local" -Restart
```

### Verifying AD Services
```powershell
# Check for active Domain Controller
Get-ADDomainController -Identity "DC01"
```

## Summary
Deploying a vulnerable Active Directory environment is the final and most complex step in our Module 3 infrastructure setup. By combining automated deployment with intentional misconfigurations, we create a high-fidelity target that mirrors real-world corporate networks, providing the perfect environment for learning advanced internal network penetration testing.

## Reference links
- [BadBlood: Active Directory Security Generator](https://github.com/davidprowe/BadBlood)
- [Microsoft: Active Directory Domain Services Overview](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/ad-ds-overview)
- [The Hacker Recipes: Active Directory Movement](https://www.thehacker.recipes/ad/movement)
- [ADSecurity.org: Common AD Attack Methods](https://adsecurity.org/)
