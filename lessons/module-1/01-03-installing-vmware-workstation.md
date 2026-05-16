# 01-03: Setting Up the Primary Hypervisor

## What is it used for?
The primary hypervisor (L1) is the first layer of software installed on your physical host (L0). It serves as the bridge between your physical hardware and the virtualized world. Its primary role is to manage physical resources (CPU, RAM, Storage, Network) and allocate them to virtual machines.

In this homelab, the L1 hypervisor is used to:
- **Host the Nested Environment**: It runs the L2 hypervisor (Proxmox), which in turn will host our security lab targets.
- **Manage Virtual Networking**: It creates the initial virtual switches and networks that allow our lab to communicate with the outside world or stay isolated.
- **Resource Control**: It allows us to set limits on how much of our physical machine's power is dedicated to the lab.

## Techniques
- **Type 2 Virtualization**: Installing a hypervisor as an application on top of an existing operating system (e.g., VMware Workstation on Windows, VMware Fusion on macOS).
- **Type 1 (Bare-Metal) Emulation**: Using tools like KVM on Linux which, while technically part of the kernel, can be managed like a Type 2 hypervisor for lab purposes.
- **Driver Injection**: During installation, the hypervisor installs specialized drivers (like vmnet for VMware) into the host OS to handle low-level networking and hardware access.
- **User-Mode Management**: Using GUI tools (VMware GUI, virt-manager) to interact with the underlying virtualization engine.

## How those techniques are used
- **Software Installation**: A user downloads an executable (like `VMware-workstation-full-17.x.x.exe`) and runs it. The installer modifies the host OS kernel to allow direct hardware access.
- **Kernel Module Loading**: On Linux, installing KVM-related packages loads modules like `kvm_intel` or `kvm_amd` into the running kernel.
- **Virtual Interface Creation**: Upon installation, the hypervisor creates virtual network adapters on the host (e.g., `VMnet1`, `VMnet8` on Windows or `virbr0` on Linux) to facilitate host-to-guest communication.

## Commands used

### Linux (KVM/QEMU Installation)
To install the necessary packages on Ubuntu/Debian:
```bash
sudo apt update
sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager
```

To add your user to the required groups (enabling management without `sudo`):
```bash
sudo adduser $USER libvirt
sudo adduser $USER kvm
```

To verify the installation:
```bash
virsh list --all
```

### Windows (PowerShell - Checking Drivers)
To check if VMware's network drivers are correctly installed:
```powershell
Get-NetAdapter | Where-Object { $_.InterfaceDescription -like "*VMware*" }
```

### macOS (Terminal - Checking KVM-like support)
To check if the Apple Virtualization Framework is available:
```bash
sysctl kern.hv_support
```

## Summary
The L1 hypervisor is the foundation of your nested lab. Whether you choose VMware Workstation, VirtualBox, or KVM, the goal is the same: to create a stable, hardware-accelerated platform for running further virtual layers. Successful installation involves not just running an installer, but ensuring that kernel drivers and network interfaces are correctly initialized.

## Reference links
- [VMware Workstation Pro Documentation](https://docs.vmware.com/en/VMware-Workstation-Pro/index.html)
- [Oracle VM VirtualBox User Manual](https://www.virtualbox.org/manual/UserManual.html)
- [KVM (Kernel-based Virtual Machine) Official Site](https://www.linux-kvm.org/page/Main_Page)
- [VMware Fusion Documentation (for macOS)](https://docs.vmware.com/en/VMware-Fusion/index.html)
