# 01-10: Attaching Attacker to Network

## Overview
To allow the Attacker (Kali Linux) to reach the nested lab, we must move it from the general NAT network to the **Isolated Network** (Dirty Pipe) we created in Lesson 01-04.

---

## Configuration by Platform

@tabs

@tab VMware
1. Shut down the Kali VM.
2. Go to **Settings > Network Adapter**.
3. Select **"Custom: Specific virtual network"**.
4. Choose **VMnet2 (Host-only)**.
5. Boot the VM and verify it no longer has internet access (expected).

@tab VirtualBox
1. Shut down the Kali VM.
2. Go to **Settings > Network**.
3. Change "Attached to" to **"Host-only Adapter"**.
4. Select the adapter you created earlier (e.g., `vboxnet0`).
5. Boot and verify internal connectivity.

@tab KVM/Libvirt
1. Open the VM details in `virt-manager`.
2. Select the **NIC** device.
3. Change the **Network source** to the "Isolated" network you created.
4. Apply and start the VM.

@endtabs

---

## Testing the Link
Run `ip a` on your Attacker machine. You should see an interface connected to the isolated segment. You will not have an IP address until we configure the **pfSense Gateway** in Module 2.
