# 03-01: Linux Containers (LXC) Fundamentals

## What is it used for?
Linux Containers (LXC) are an operating-system-level virtualization method for running multiple isolated Linux systems (containers) on a single control host. LXC is used to provide an environment as close as possible to a virtual machine but without the overhead that comes with running a separate kernel and simulating all the hardware. It is ideal for:
- **Resource Efficiency**: Running many isolated services on limited hardware.
- **Fast Deployment**: Spinning up entire Linux environments in seconds.
- **Development/Testing**: Creating consistent environments that mirror production systems.
- **Application Isolation**: Keeping services separate for security and dependency management.

## Techniques
LXC relies on several core Linux kernel features to provide isolation and resource management:
1. **Namespaces**: Provide isolation of various system resources (Process IDs, Network, Mount points, Inter-process Communication, UTS/Hostnames, and User IDs).
2. **Control Groups (cgroups)**: Manage and limit resource usage (CPU, memory, disk I/O, network) for a group of processes.
3. **Chroot**: Changes the apparent root directory for the current running process and its children.
4. **AppArmor/SELinux**: Security modules that provide mandatory access control (MAC) to restrict container capabilities.
5. **Seccomp**: Restricts the system calls available to a process, reducing the attack surface.

## How those techniques are used
- **Isolation via Namespaces**: When a container is started, it is placed in its own namespaces. For example, the `PID namespace` ensures that the container only sees its own processes, starting with PID 1 (often an init system like systemd). The `Network namespace` provides the container with its own virtual network stack, interfaces, and IP addresses.
- **Resource Limits via Cgroups**: A system administrator can define that a specific container should never use more than 2GB of RAM or 50% of a CPU core. This prevents "noisy neighbor" scenarios where one container crashes the host by consuming all resources.
- **Filesystem Isolation**: The container operates within its own root filesystem (rootfs), which is a directory on the host that looks like `/` to the container.

## Commands used
While Proxmox uses the `pct` (Proxmox Container Toolkit) utility, standard LXC uses the `lxc-*` suite:

### Standard LXC Commands
- `lxc-ls -f`: List containers with details.
- `lxc-start -n <container_name>`: Start a container.
- `lxc-stop -n <container_name>`: Stop a container.
- `lxc-info -n <container_name>`: Display information about a container.
- `lxc-attach -n <container_name>`: Get a shell inside a running container.

### Proxmox Specific (pct)
- `pct list`: List all containers on the Proxmox host.
- `pct start <vmid>`: Start a specific container by ID.
- `pct enter <vmid>`: Enter the shell of a container.

## Summary
LXC provides a high-performance, lightweight virtualization solution by sharing the host's Linux kernel while maintaining strong isolation through namespaces and cgroups. Unlike Virtual Machines, which emulate hardware and run their own kernels, LXC containers share the host's resources directly, leading to significantly lower overhead and faster startup times.

## Reference links
- [LXC Official Project Website](https://linuxcontainers.org/)
- [Proxmox VE LXC Documentation](https://pve.proxmox.com/wiki/Linux_Container)
- [Linux Namespaces Overview (man7.org)](https://man7.org/linux/man-pages/man7/namespaces.7.html)
- [Cgroups Introduction](https://www.kernel.org/doc/Documentation/cgroup-v1/cgroups.txt)
