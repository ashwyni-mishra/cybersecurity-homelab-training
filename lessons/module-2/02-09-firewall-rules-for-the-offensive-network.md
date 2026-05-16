# 02-09: Firewall Rules for the Offensive Network

## Objective
To configure pfSense to support offensive operations while preventing accidental leaks of malicious traffic into the production environment.

## Policy Configuration (Firewall > Rules)

### 1. Offensive Zone (WAN Interface)
Since Kali Linux (`10.0.2.5`) is on the "outside" (connected to `vmbr0` through the L1 Host-Only network), pfSense sees it as coming from its WAN interface.

1.  Navigate to **Firewall** > **Rules** > **WAN**.
2.  **Add Rule**:
    - **Action**: Pass.
    - **Protocol**: Any.
    - **Source**: `10.0.2.5` (Kali).
    - **Destination**: Any.
    - **Description**: Allow Kali Offensive Traffic.
3.  **Security Recommendation**: Disable "Block private networks and loopback addresses" on the WAN interface settings, as we are using private ranges for the L1 lab.

### 2. Internal Lockdown (LAN Interface)
1.  Navigate to **Firewall** > **Rules** > **LAN**.
2.  By default, pfSense allows all traffic from LAN to any. In a security lab, this should be restricted:
    - Allow LAN to pfSense (DNS/WebGUI).
    - Block LAN to WAN (To prevent "phoning home" of malware).
    - Block LAN to DMZ (Unless specific pivoting is part of the training).

## Logging
Enable logging on all "Block" rules to capture and analyze failed exploit attempts or unexpected network behavior.
