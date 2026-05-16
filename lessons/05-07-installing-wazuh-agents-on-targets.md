# 05-07: Installing Wazuh Agents on Targets

## Overview
Wazuh agents are installed on the endpoints you want to monitor. They collect security data and forward it to the Wazuh Manager for analysis.

## Agent Capabilities
- **Log Data Collection**: Monitoring system and application logs.
- **File Integrity Monitoring (FIM)**: Tracking changes to critical files and directories.
- **Rootkit Detection**: Scanning for hidden malware and suspicious system behavior.
- **Vulnerability Detection**: Identifying outdated software and security misconfigurations.
- **Inventory Collection**: Gathering hardware and software information.

## Deployment to LXC
Wazuh agents can be installed directly within Linux Containers (LXC).
1.  **Add Repository**: Add the Wazuh repository to the container's package manager.
2.  **Install Agent**: `apt install wazuh-agent`.
3.  **Configure Manager IP**: Set the `WAZUH_MANAGER` environment variable or edit `/var/ossec/etc/ossec.conf`.
4.  **Start Agent**: `systemctl start wazuh-agent`.

## Deployment to Docker Hosts
The agent is installed on the Docker host itself. It can monitor both the host OS and the Docker daemon logs. Specialized configurations are available to monitor container activity from the host perspective.

## Verification
In the Wazuh Dashboard, the new agent should appear in the 'Agents' list with an 'Active' status.
