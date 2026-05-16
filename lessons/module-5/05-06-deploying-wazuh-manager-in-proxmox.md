# 05-06: Deploying Wazuh Manager in Proxmox

## What is it used for?
The Wazuh Manager is the central "brain" of the Wazuh SIEM/XDR platform. It is responsible for receiving, analyzing, and storing security data from across your entire infrastructure. It is used to:
*   **Centralize Data**: Collect logs from agents installed on Linux, Windows, and macOS endpoints.
*   **Analyze Threats**: Process incoming data against over 3,000 out-of-the-box security rules (aligned with MITRE ATT&CK, PCI-DSS, etc.).
*   **Identify Vulnerabilities**: Periodically scan agents for missing patches and insecure configurations.
*   **Host the Dashboard**: Provide a powerful web-based interface (built on OpenSearch) for security analysts to visualize alerts and manage the system.

## Techniques
### All-in-One Deployment
For homelabs and small environments, Wazuh offers an "All-in-One" deployment where the Indexer (storage), Server (analysis), and Dashboard (UI) are all installed on a single virtual machine. This simplifies management and significantly reduces the resource overhead of running a distributed cluster.

### Dedicated Resource Allocation
Because SIEMs perform real-time indexing and correlation, they are resource-intensive. In Proxmox, it is a critical technique to use "Fixed" RAM rather than "Ballooning" and to allocate multiple vCPUs to ensure the manager doesn't drop packets during high-volume security events (like an active brute-force attack).

### Network Positioning
The Wazuh manager should ideally be placed on a "Management" network bridge (e.g., `vmbr0`) that is reachable by your workstations but separated from the high-risk "Sandbox" network (`vmbr1`) by a firewall like pfSense.

## How those techniques are used
*   **Proxmox VM Sizing**: Creating an Ubuntu 22.04 LTS VM with a minimum of 4 vCPUs, 8GB of RAM (16GB preferred), and 50GB of SSD storage.
*   **Automated Scripted Install**: Using the official Wazuh installation assistant to handle the complex generation of SSL certificates and the configuration of the internal OpenSearch cluster.
*   **Security Groups**: Configuring pfSense to allow traffic from the Sandbox nodes to the Wazuh Manager's IP on port 1514 (Agent communication) and 1515 (Agent registration).

## Commands used

### System Preparation
```bash
# Update the Ubuntu VM and install prerequisites
sudo apt update && sudo apt upgrade -y
sudo apt install curl apt-transport-https unzip wget libcap2-bin -y
```

### Running the Installation Assistant
```bash
# Download the Wazuh installation script
curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh

# Execute the all-in-one installation
# The -a flag automates the entire process including certificate generation
sudo bash wazuh-install.sh -a
```

### Post-Installation & Verification
```bash
# Check the status of all three Wazuh components
sudo systemctl status wazuh-manager
sudo systemctl status wazuh-indexer
sudo systemctl status wazuh-dashboard

# Retrieve the default 'admin' password to log into the web UI
sudo tar -axf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt -O | grep -A 1 "admin"
```

## Summary
Deploying the Wazuh Manager in Proxmox provides you with a professional-grade security operations platform. By dedicating sufficient hardware resources and utilizing the official installation script, you establish a robust central node capable of monitoring, detecting, and responding to threats across your entire virtualized environment.

## Reference links
- [Wazuh Installation Assistant Documentation](https://documentation.wazuh.com/current/installation-guide/wazuh-server/index.html)
- [Wazuh Minimum Hardware Requirements](https://documentation.wazuh.com/current/installation-guide/requirements.html)
- [Proxmox: Creating a Linux VM Guide](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#qm_virtual_machines)
- [OpenSearch Documentation](https://opensearch.org/docs/latest/)
