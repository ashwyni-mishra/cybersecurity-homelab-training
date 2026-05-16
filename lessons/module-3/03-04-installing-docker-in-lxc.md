# 03-04: Installing Docker in LXC

## What is it used for?
Installing Docker inside an LXC container (nested virtualization) is used to create a "container host" that can run multiple Dockerized applications. This is beneficial for:
- **Application Isolation**: Keeping various vulnerable web applications (like DVWA and Juice Shop) separate while residing on the same LXC node.
- **Portability**: Using Docker Compose files to quickly spin up complex application stacks.
- **Resource Efficiency**: Avoiding the overhead of multiple VMs by using a single LXC container to host multiple Docker containers.

## Techniques
Running Docker inside LXC requires "punching holes" in the container's isolation to allow it to manage its own containerized processes and storage layers:
1. **Nesting**: Enabling the LXC container to use the `mount` and `cgroup` syscalls required by Docker.
2. **Keyctl**: Allowing the container to use the Linux kernel keyring, which Docker uses for some operations.
3. **Storage Driver Selection**: Configuring Docker to use a compatible storage driver (usually `overlay2` or `fuse-overlayfs`) that works within the LXC environment.
4. **FUSE Mounts**: Optionally allowing FUSE mounts if the standard overlay2 driver has issues with the host's filesystem.

## How those techniques are used
- **Proxmox GUI Configuration**: Before installing Docker, you must go to the Proxmox web interface, select the container, navigate to **Options > Features**, and check both **Nesting** and **Keyctl**. Without these, the Docker daemon will fail to start.
- **Kernel Module Loading**: On the Proxmox host (the physical server), the `overlay` and `br_netfilter` modules must be loaded to support Docker's networking and storage requirements.
- **Automated Installation**: Using the official Docker convenience script simplifies the installation of the Docker engine, CLI, and containerd.

## Commands used

### Proxmox Host Configuration
Run these on the physical Proxmox host (via SSH or Shell):
```bash
# Ensure required modules are loaded
modprobe overlay
modprobe br_netfilter

# Make them persistent across reboots
echo "overlay" >> /etc/modules
echo "br_netfilter" >> /etc/modules
```

### Container Configuration (GUI)
1. Select the LXC Container in Proxmox.
2. Go to **Options**.
3. Double-click **Features**.
4. Check **Nesting** and **Keyctl**.
5. Restart the container.

### Docker Installation (Inside LXC)
Run these inside the LXC container shell:
```bash
# Download and run the install script
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start and enable Docker service
systemctl enable --now docker

# Verify the installation
docker run hello-world
```

## Summary
Installing Docker in LXC allows for a highly efficient "host-within-a-host" setup. By enabling Nesting and Keyctl in the Proxmox settings, we provide the LXC container with the necessary permissions to manage its own Docker containers, enabling us to deploy complex security lab environments with ease.

## Reference links
- [Proxmox VE Documentation: Docker inside LXC](https://pve.proxmox.com/wiki/Docker_inside_LXC)
- [Docker Documentation: Install on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Understanding Docker Storage Drivers](https://docs.docker.com/storage/storagedriver/select-storage-driver/)
