# 01-09: Attacker OS Installation

## What is it used for?
The "Attacker OS" is the primary workspace for a security researcher or penetration tester. Kali Linux is the most popular choice for this role, as it comes pre-loaded with hundreds of tools designed for information gathering, vulnerability analysis, exploitation, and post-exploitation.

In our homelab, the Kali VM is used for:
- **Launching Attacks**: Running tools like Nmap, Metasploit, and Burp Suite against our lab targets.
- **Traffic Interception**: Acting as a man-in-the-middle to analyze how applications communicate.
- **Payload Development**: Writing and compiling custom scripts or exploits to test against the nested environment.
- **Learning and Certification**: Familiarizing yourself with the standard Linux-based offensive security toolkit used in professional certifications like OSCP.

## Techniques
- **Image-Based Deployment**: Using pre-built virtual machine images (.ova, .vmdk) to quickly spin up a Kali instance without a manual install.
- **ISO Installation**: Performing a manual installation from a disk image to customize disk partitioning and package selection.
- **Guest Additions Integration**: Installing specialized drivers (`open-vm-tools`) to enable features like clipboard sharing, folder sharing, and automatic resolution resizing.
- **Rolling Distribution Management**: Using the "rolling release" model to keep all security tools at their absolute latest version.
- **Snapshot Baselines**: Taking a snapshot of the "Clean" Kali install so you can quickly revert after a messy engagement or tool failure.

## How those techniques are used
- **Surgical Tool Selection**: During the installation, choosing only the "Top 10" tools to keep the VM lightweight, or selecting the "Large" collection for a comprehensive lab experience.
- **Shared Folders**: Configuring a shared folder between your physical host (L0) and Kali (L1/L2) to easily move exploit code or report documents.
- **Persistence**: Using a persistent encrypted partition if running Kali from a USB or live environment (though we use a VM for this lab).
- **Updating the Arsenal**: Regularly running `apt full-upgrade` to ensure that even brand-new exploits are available in the local repository.

## Commands used

### System Update and Upgrade
To keep Kali Linux up to date:
```bash
sudo apt update && sudo apt full-upgrade -y
```

### Installing Virtualization Tools (VMware)
```bash
sudo apt install -y open-vm-tools-desktop
sudo reboot
```

### Basic Tool Verification
To ensure the most common tools are installed and working:
```bash
nmap --version
msfconsole -v
python3 --version
```

### Changing Default Password (Recommended)
```bash
passwd
```

## Summary
Kali Linux is the "Swiss Army Knife" of our security lab. By installing it on our primary hypervisor (or within the nested environment), we gain access to a powerful, standardized platform for offensive operations. Successful deployment involves not just the installation, but also ensuring that guest tools and system updates are correctly applied for a smooth user experience.

## Reference links
- [Official Kali Linux Documentation](https://www.kali.org/docs/)
- [Kali Linux Tool Documentation](https://www.kali.org/tools/)
- [Download Kali Linux VM Images](https://www.kali.org/get-kali/#kali-virtual-machines)
- [Offensive Security: Kali Linux Training](https://www.offsec.com/kali-training/)

## Next Lesson
[Next Lesson: 01-10 - Attaching Kali to the Host-Only Network](/lessons/module-1/01-10-attaching-kali-to-the-host-only-network)
