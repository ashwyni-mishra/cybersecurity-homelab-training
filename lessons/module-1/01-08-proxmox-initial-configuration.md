# 01-08: Proxmox Initial Configuration

## What is it used for?
The initial configuration of Proxmox VE is the process of transforming a "vanilla" installation into a production-ready (or lab-ready) hypervisor. This stage is critical for ensuring that the system is secure, updated, and correctly connected to its storage and network resources.

Proper configuration is used for:
- **Enabling Software Updates**: Switching from enterprise to community repositories so you can receive the latest security patches and features without a paid subscription.
- **Optimizing Storage**: Configuring how and where ISO images, virtual disks, and backups are stored.
- **Enhancing Security**: Changing default passwords, setting up SSH keys, and configuring the built-in firewall.
- **Resource Baseline**: Establishing a performance baseline and ensuring that the system clock and networking are synchronized.

## Techniques
- **Repository Management**: Editing the Debian sources list to point at the Proxmox "No-Subscription" mirrors.
- **SSL Certificate Handling**: Managing the default self-signed certificates or replacing them with trusted ones (e.g., Let's Encrypt).
- **Storage LVM/ZFS Configuration**: Deciding between Logical Volume Management (LVM) or ZFS for managing the virtual disks of your nested guests.
- **System Hardening**: Disabling unnecessary services and ensuring the root account is properly protected.
- **Package Dist-Upgrade**: Performing a full system upgrade to ensure all components are on the same version.

## How those techniques are used
- **Updating the System**: A user logs into the Proxmox web interface, navigates to the "Repositories" tab, and adds the `pve-no-subscription` repo. They then click "Refresh" and "Upgrade" to apply all pending Linux kernel and PVE updates.
- **Uploading ISOs**: Navigating to the `local` storage and using the "Upload" button to add the Kali Linux or Windows Server ISOs that will be needed for later lessons.
- **Adjusting Time Zones**: Setting the system time to UTC or the local time zone to ensure that log files from the lab align with the physical host's logs.

## Commands used

### Updating Repositories via CLI
To add the no-subscription repository manually:
```bash
echo "deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription" > /etc/apt/sources.list.d/pve-install-repo.list
```

### Disabling the Enterprise Repo
```bash
sed -i 's/^deb/#deb/g' /etc/apt/sources.list.d/pve-enterprise.list
```

### Applying Updates
```bash
apt update && apt dist-upgrade -y
```

### Checking System Status
To check the Proxmox version and health:
```bash
pveversion -v
```

To check disk usage:
```bash
df -h
```

## Summary
Initial configuration is the first step in taking control of your Proxmox environment. By setting up the correct repositories, updating the system, and organizing your storage, you create a solid foundation for the rest of your security lab. Skipping these steps can lead to outdated software and difficulty installing nested guests later.

## Reference links
- [Proxmox VE: Package Repositories](https://pve.proxmox.com/wiki/Package_Repositories)
- [Proxmox VE: System Software Updates](https://pve.proxmox.com/wiki/System_Software_Updates)
- [Proxmox VE: Storage Documentation](https://pve.proxmox.com/wiki/Storage)
- [Securing Proxmox VE](https://pve.proxmox.com/wiki/General_Virtualization_Security_Tips)
