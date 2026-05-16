# 03-03: Deploying an Ubuntu LXC Node

## Overview
This lesson provides a step-by-step guide to deploying a standard Ubuntu-based container which will serve as a target or service host in our lab.

## Deployment Steps
1. Click 'Create CT' in the Proxmox web interface.
2. **General**: Set Hostname (e.g., ubuntu-target) and a secure root password.
3. **Template**: Select the downloaded Ubuntu template.
4. **Disk**: Assign 8GB - 16GB of disk space.
5. **CPU**: Allocate 1 or 2 cores.
6. **Memory**: Allocate 512MB - 1024MB RAM.
7. **Network**: Bridge to `vmbr1` (Isolated Sandbox) and assign a static IP address.
8. **Confirm**: Review settings and click Finish.
