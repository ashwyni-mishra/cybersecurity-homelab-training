# 05-06: Deploying Wazuh Manager in Proxmox

## Overview
Wazuh is a free, open-source security platform that provides XDR and SIEM capabilities. It is highly effective for monitoring endpoints, containers, and cloud environments.

## Deployment Options
- **All-in-one**: Wazuh indexer, server, and dashboard on a single node.
- **Distributed**: Components spread across multiple nodes for scalability and high availability.

## Proxmox Implementation
For a homelab or small environment, an all-in-one deployment on a dedicated Ubuntu or Debian VM is recommended.

### Resource Requirements
- **CPU**: 4 vCPUs minimum.
- **RAM**: 8GB minimum (16GB recommended).
- **Storage**: 50GB minimum, SSD preferred.

### Installation Steps
1.  **Prepare VM**: Create a Linux VM in Proxmox with the required resources.
2.  **Run Assistant**: Wazuh provides an installation assistant script:
    `curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh`
    `bash wazuh-install.sh -a`
3.  **Access Dashboard**: Once installed, the dashboard is accessible via HTTPS on the VM's IP address.

## Post-Installation
After deployment, the default passwords should be changed, and the manager should be configured to receive data from agents.
