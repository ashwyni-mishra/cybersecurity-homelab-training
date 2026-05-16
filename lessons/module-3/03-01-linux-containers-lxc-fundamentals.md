# 03-01: Linux Containers (LXC) Fundamentals

## Overview
Linux Containers (LXC) are an operating system-level virtualization method for running multiple isolated Linux systems on a single control host. Unlike Virtual Machines (VMs), LXC shares the host's kernel but provides isolated process space and file systems.

## Key Differences: VM vs. LXC
1. **Kernel Usage**: VMs run a complete guest OS with its own kernel. LXC shares the host kernel, making them much lighter.
2. **Resource Overhead**: LXC containers start in seconds and use significantly less RAM and CPU compared to VMs.
3. **Isolation**: VMs provide hardware-level isolation (more secure). LXC provides OS-level isolation via namespaces and cgroups.
4. **Efficiency**: LXC allows for higher density of services on a single physical host.
