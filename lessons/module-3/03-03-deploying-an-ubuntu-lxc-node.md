# 03-03: Deploying an Ubuntu LXC Node

## What is it used for?
Deploying an Ubuntu LXC node is used to create a lightweight, fully functional Linux environment within the Proxmox lab. This specific node serves as a foundation for:
- **Service Hosting**: Running applications like web servers, databases, or Docker.
- **Vulnerability Targets**: Acts as a target for offensive security testing.
- **Network Scanning Targets**: Provides a live host for practicing Nmap and other discovery tools.
- **Resource Management**: Demonstrating how to run multiple "servers" with minimal hardware overhead.

## Techniques
When deploying a container in Proxmox, several key techniques are employed:
1. **Resource Partitioning**: Precisely defining how much of the host's physical resources (CPU, RAM, Storage) the container can consume.
2. **Network Bridging**: Attaching the container's virtual network interface to a specific host bridge (e.g., `vmbr1`) to control its network placement.
3. **Static Networking**: Manually assigning an IP address and gateway to ensure the container is always reachable at the same address.
4. **Unprivileged Mode**: Running the container with a UID mapping that ensures even if the container's "root" user is compromised, the attacker does not have root access to the physical host.

## How those techniques are used
- **The Deployment Wizard**: The Proxmox "Create CT" wizard walks the user through these techniques. For instance, in the **Network** tab, selecting `vmbr1` (the isolated bridge) ensures the container cannot communicate with the external internet or the management network unless permitted by the firewall.
- **Security Selection**: Choosing an "Unprivileged container" (the default) is a standard technique for defense-in-depth.
- **Initial Configuration**: During deployment, the SSH public key can be injected, and the root password is set, allowing for immediate secure access once the container is started.

## Commands used
While the deployment is typically done via the Proxmox GUI, it can also be performed via the CLI using `pct`.

### CLI Deployment (Alternative to GUI)
```bash
# Example command to create a container
pct create 101 local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst \
  --hostname ubuntu-target \
  --password <secure_password> \
  --net0 name=eth0,bridge=vmbr1,ip=10.0.0.10/24,gw=10.0.0.1 \
  --storage local \
  --memory 512 \
  --cores 1 \
  --unprivileged 1
```

### Post-Deployment Commands
```bash
# Start the container
pct start 101

# Enter the container's shell
pct enter 101

# Inside the container, update the system
apt update && apt upgrade -y
```

## Summary
By following the Proxmox deployment wizard, we can quickly instantiate an Ubuntu-based LXC container. This node is strategically placed on the `vmbr1` isolated bridge and assigned a static IP, making it a perfect candidate for subsequent lessons on Docker installation and vulnerability exploitation.

## Reference links
- [Proxmox VE: Creating Containers](https://pve.proxmox.com/wiki/Linux_Container#_creating_containers)
- [Ubuntu Server Official Documentation](https://ubuntu.com/server/docs)
- [LXC Security: Privileged vs Unprivileged Containers](https://linuxcontainers.org/lxc/introduction/#unprivileged-containers)
