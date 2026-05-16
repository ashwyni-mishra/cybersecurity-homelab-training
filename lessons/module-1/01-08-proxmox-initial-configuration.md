# 01-08: Proxmox Initial Configuration

## Post-Install Steps
After the Proxmox installation is complete and the VM reboots, the web interface can be accessed from the host machine.

## Accessing the Web GUI
1.  Open a browser on the physical host.
2.  Navigate to `https://<Proxmox-IP>:8006`.
3.  Bypass the SSL warning (expected with self-signed certificates).
4.  Log in with username `root` and the password set during installation.

## Configuration Tasks

### 1. Repository Setup
By default, Proxmox uses the Enterprise repository, which requires a subscription. For lab environments, switch to the "No-Subscription" repository:
- Go to `pve01` > `Repositories`.
- Disable the `enterprise` component.
- Add the `No-Subscription` repository.
- Refresh and run updates: `apt update && apt dist-upgrade -y`.

### 2. Storage Configuration
- **local**: Used for ISO images, templates, and backups.
- **local-lvm**: Used for virtual machine disks and container volumes.
- Verify that storage is active and has sufficient free space.

### 3. Time Synchronization
Ensure NTP is functioning correctly to prevent authentication issues and log inconsistencies.
- Check `pve01` > `System` > `Time`.
- Ensure it matches the host time.
