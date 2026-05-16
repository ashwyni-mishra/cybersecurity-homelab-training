---
layout: doc
---

# How to Follow This Guide

Welcome to the CyberHomelab training curriculum. To get the most out of this material, we recommend following a structured approach.

## 1. Prerequisites
Before starting, ensure you have a workstation with at least:
- **16GB RAM** (32GB recommended)
- **4-6 Core CPU** with VT-x/AMD-V support
- **100GB Free SSD Space**

## 2. The Modular Approach
The curriculum is divided into 5 modules. Each module builds upon the previous one:
1.  **Module 1: Host Infrastructure** - Setting up the primary hypervisor and Proxmox.
2.  **Module 2: Network Segregation** - Configuring the virtual firewall and isolated networks.
3.  **Module 3: Target Provisioning** - Deploying vulnerable VMs and containers.
4.  **Module 4: Offensive Operations** - Learning penetration testing techniques.
5.  **Module 5: Defensive Security** - Implementing monitoring and incident response.

## 3. Following the Lessons
Each lesson is structured as a technical guide:
- **Read the Theory**: Understand "What is it used for" and the "Techniques" involved.
- **Hands-on Practice**: Follow the "How those techniques are used" and execute the "Commands used" in your own lab environment.
- **Verify**: Check the "Summary" to ensure you've grasped the key points.
- **Deep Dive**: Use the "Reference links" for official documentation and further study.

## 4. Safety First
::: danger 🛑 ISOLATION IS MANDATORY
Never bridge your lab's "Dirty Pipe" (isolated network) to your physical network. Always ensure you are working within the boundaries defined in the [Guidelines and Ethical Agreement](/guidelines).
:::

## 5. Getting Help & Feedback
If you encounter issues or have suggestions, please refer to the **Feedback** section in the footer or open an issue on the [GitHub repository](https://github.com/ashwyni-mishra/cybersecurity-homelab-training).

---

**Ready to start?**
[Head to Module 1: Introduction →](/lessons/module-1/01-01-introduction-to-nested-virtualization)
