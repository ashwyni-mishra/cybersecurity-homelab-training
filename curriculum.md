# Curriculum Index

::: info CONTINUOUS IMPROVEMENT
This curriculum was developed and is maintained by **Ashwani Mishra**. While CyberHomelab is an independent initiative, your updates and feedback are highly appreciated. The field of cybersecurity is vast, and your efforts to help refine and expand these labs make a meaningful impact on the learning experience.
:::

This curriculum is designed as a modular, platform-agnostic path through the complexities of modern cybersecurity infrastructure.
 Each module builds upon the previous, and you can choose the hypervisor and operating system that best fits your hardware.

---

### Module 1: Host Infrastructure
Build the foundational hypervisor environment and prepare the host system for nested virtualization. Master the deployment of your primary hypervisor (VMware, VirtualBox, or KVM) and the initial configuration of Proxmox VE.

[Start Infrastructure Setup →](/lessons/01-01-introduction-to-nested-virtualization)

---

### Module 2: Network Segregation
Establish a secure, isolated network topology using virtual bridges and firewalls. Learn how to implement strict traffic control and NAT routing that works across any virtualization platform.

[Start Network Engineering →](/lessons/02-01-proxmox-virtual-bridges-explained)

---

### Module 3: Target Provisioning
Populate the lab with vulnerable infrastructure. Deploy Linux Containers (LXC), Dockerized applications, and a vulnerable Windows Active Directory domain within your nested Proxmox environment.

[Start Provisioning Targets →](/lessons/03-01-linux-containers-lxc-fundamentals)

---

### Module 4: Offensive Operations
Master the penetration testing methodology. Conduct reconnaissance, perform vulnerability scanning, and execute advanced exploitation tactics to gain initial access to your targets.

[Start Offensive Tactics →](/lessons/04-01-offensive-methodology-overview)

---

### Module 5: Defensive Security
Implement enterprise-grade monitoring and detection. Deploy a SIEM solution (Wazuh), analyze network traffic, and practice structured incident response using the PICERL cycle.

[Start Defensive Operations →](/lessons/05-01-defensive-methodology-and-incident-response)
