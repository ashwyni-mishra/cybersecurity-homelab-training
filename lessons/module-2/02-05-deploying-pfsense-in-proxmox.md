# 02-05: Deploying pfSense in Proxmox

## What is it used for?
Deploying pfSense in Proxmox is the process of creating a virtual instance of a world-class firewall to manage your lab's network traffic. This step is used to:
- **Centralize Network Control**: Create a single point for routing and security.
- **Enable Multi-homing**: Allow a single machine to bridge the gap between your management network (`vmbr0`) and your isolated lab network (`vmbr1`).
- **Provision Services**: Setup a DHCP server to automatically assign IP addresses to new target VMs and containers.

## Techniques
The deployment of pfSense in a virtual environment utilizes several specific virtualization techniques:

1. **Paravirtualization (VirtIO)**: Using specialized drivers (`VirtIO`) for disk and network interfaces to achieve high-performance I/O with minimal overhead.
2. **ISO Mounting**: Booting a virtual machine from a virtualized CD/DVD drive containing the pfSense installation media.
3. **Multi-NIC Provisioning**: Attaching multiple virtual network interface cards (vNICs) to a single VM, each mapped to a different virtual bridge.
4. **Hardware Passthrough (Optional)**: While not used here, this technique allows a VM to directly control physical hardware for even higher performance.

## How those techniques are used
In our specific lab setup, we apply these techniques as follows:

- **Scenario: Initial Boot**: We upload the pfSense ISO to the Proxmox local storage and mount it to our new VM's virtual drive. This allows the installation process to begin.
- **Scenario: Network Bridging**: We add two network devices to the VM. The first device is linked to `vmbr0` (Management/WAN), and the second is linked to `vmbr1` (Lab/LAN). This allows pfSense to "see" both networks simultaneously.
- **Scenario: Performance Optimization**: By selecting `VirtIO` for the network model, we ensure that the traffic between the firewall and other VMs is processed efficiently by the Proxmox host.

## Commands used
While much of the deployment is done via the Proxmox GUI, you can verify and manage the VM via the CLI.

### Creating the VM via CLI (Alternative)
```bash
# Create a VM with 2GB RAM and 2 Network Interfaces
qm create 100 --name pfsense-fw --memory 2048 --net0 virtio,bridge=vmbr0 --net1 virtio,bridge=vmbr1 --scsihw virtio-scsi-pci --ostype other
```

### Proxmox UI Steps
1. **Create VM**:
   - **Name**: `pfsense-fw`
   - **ISO**: `pfSense-CE-2.x.x-RELEASE-amd64.iso`
   - **Disk**: `20 GB`, Bus: `VirtIO Block`
   - **CPU**: `1 Core`, Type: `host`
   - **Network**: `Model: VirtIO`, `Bridge: vmbr0`
2. **Post-Creation**:
   - Navigate to the VM's **Hardware** tab.
   - Click **Add > Network Device**.
   - Select `Model: VirtIO` and `Bridge: vmbr1`.
3. **Installation**:
   - **Start** the VM.
   - Follow the text-based installer (Accept > Install > Default Partitioning).
   - Reboot when finished.

## Summary
Deploying pfSense in Proxmox is a foundational step in building a sophisticated cybersecurity lab. By creating a multi-homed virtual machine with paravirtualized hardware, we establish a robust and efficient gateway that can manage traffic across multiple isolated network segments.

## Reference links
- [pfSense Official Download Page](https://www.pfsense.org/download/)
- [Proxmox VE: VM Management Documentation](https://pve.proxmox.com/wiki/Qemu/KVM_Virtual_Machines)
- [Netgate: Installing pfSense Software](https://docs.netgate.com/pfsense/en/latest/install/index.html)
- [Understanding VirtIO Networking](https://wiki.libvirt.org/Virtio.html)

## Next Lesson
[Next Lesson: 02-06 - pfSense Interface Assignments](/lessons/module-2/02-06-pfsense-interface-assignments)
