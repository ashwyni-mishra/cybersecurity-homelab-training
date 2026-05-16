# 03-02: Downloading LXC Templates in Proxmox

## What is it used for?
LXC templates (also known as container images) are pre-configured, compressed archives of a Linux distribution's root filesystem. They are used to:
- **Rapid Deployment**: Instantiate a new container in seconds without running an installer.
- **Consistency**: Ensure that every container started from the same template begins with the exact same configuration.
- **Minimal Footprint**: Provide a slimmed-down version of the OS optimized for container environments.

## Techniques
Proxmox provides multiple ways to manage and download LXC templates:
1. **Integrated Template Browser (GUI)**: A user-friendly interface to search and download distributions.
2. **Proxmox Appliance Manager (PVEAM CLI)**: A command-line tool for updating the template list and downloading images.
3. **Custom Templates**: Importing manually created or third-party container images into the Proxmox storage.
4. **Storage Filtering**: Configuring specific storage locations to only allow 'Container templates' content type.

## How those techniques are used
- **Repository Synchronization**: Proxmox periodically synchronizes its local list of available templates with the official Proxmox repository. This ensures users have access to the latest security updates and new distribution releases (e.g., Ubuntu 22.04, Debian 12).
- **Storage Assignment**: Templates are usually stored in the `local` storage by default. However, in a cluster environment, they might be stored on shared storage so any node can use them to create a container.
- **Template Selection**: Users choose a template based on their needs—Alpine Linux for ultra-lightweight services, or Ubuntu/Debian for broader software compatibility.

## Commands used
The `pveam` (Proxmox VE Appliance Manager) command is used for template management via the CLI.

### Updating the Template List
```bash
pveam update
```

### Searching for Templates
```bash
pveam available
```
*To filter for a specific distribution (e.g., Ubuntu):*
```bash
pveam available | grep ubuntu
```

### Downloading a Template
```bash
# Usage: pveam download <storage> <template_name>
pveam download local ubuntu-22.04-standard_22.04-1_amd64.tar.zst
```

### Listing Downloaded Templates
```bash
pveam list local
```

### Removing a Template
Templates are stored as files, typically in `/var/lib/vz/template/cache/`. They can be deleted via the GUI or by removing the file directly.

## Summary
Downloading LXC templates is a fundamental step in Proxmox administration. By using the GUI or the `pveam` CLI tool, administrators can quickly pull down optimized Linux distribution images, which serve as the foundation for all future container deployments in the lab.

## Reference links
- [Proxmox VE Documentation: Container Images](https://pve.proxmox.com/wiki/Linux_Container#_container_images)
- [PVEAM (Proxmox VE Appliance Manager) Manual](https://pve.proxmox.com/pve-docs/pveam.1.html)
- [TurnKey Linux Templates in Proxmox](https://www.turnkeylinux.org/proxmox)

## Next Lesson
[Next Lesson: 03-03 - Deploying an Ubuntu LXC Node](/lessons/module-3/03-03-deploying-an-ubuntu-lxc-node)
