# 01-03: Installing VMware Workstation

## Introduction
VMware Workstation Pro and VMware Workstation Player are industry-standard Type-2 hypervisors for Windows and Linux. They provide robust support for nested virtualization, making them ideal for the L1 hypervisor in this architecture.

## Installation Steps (Windows)

1.  **Download**: Obtain the latest installer from the official VMware website.
2.  **Execute**: Run the `.exe` installer with administrative privileges.
3.  **Setup Wizard**:
    - Accept the End User License Agreement.
    - Select the installation directory (default is recommended).
    - **Enhanced Keyboard Driver**: It is recommended to enable this for better input handling.
    - **Add to PATH**: Ensure the VMware console tools are added to the system PATH.
4.  **User Experience**: Opt-in or out of the product improvement program as per organizational policy.
5.  **License**: Enter a valid Pro license key or select the non-commercial use option for Player.
6.  **Reboot**: A system restart is required to initialize the virtual network drivers and bridge services.

## Post-Installation Check
Upon successful installation, the following components should be present:
- **VMware Workstation Application**: The primary management GUI.
- **Virtual Network Editor**: Utility for configuring virtual switches (VMnets).
- **VMware Services**: Check `services.msc` for "VMware Authorization Service" and "VMware NAT Service".
