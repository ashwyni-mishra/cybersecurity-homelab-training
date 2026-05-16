# 03-04: Installing Docker in LXC

## Overview
Running Docker inside an LXC container (nested virtualization) requires specific configuration changes in Proxmox to allow the container to manage its own storage layers and namespaces.

## Configuration Requirements
1. **Unprivileged Containers**: Ensure the container is unprivileged for better security.
2. **Features**: In the container's 'Options' tab, enable 'nesting' and 'keyctl'.
3. **Storage Driver**: The overlay2 driver is recommended, but may require specific kernel modules loaded on the Proxmox host.

## Installation Commands
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```
