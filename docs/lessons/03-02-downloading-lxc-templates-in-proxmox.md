# 03-02: Downloading LXC Templates in Proxmox

## Overview
Proxmox VE simplifies the deployment of LXC containers by providing a repository of pre-built templates for various Linux distributions.

## Storage Configuration
Before downloading templates, ensures that the 'local' or a dedicated storage volume has the 'Container template' content type enabled in the Proxmox Datacenter storage settings.

## Procedure
1. Navigate to the 'local' storage in the Proxmox GUI.
2. Select 'CT Templates'.
3. Click 'Templates' to open the template browser.
4. Search for distributions such as Ubuntu, Debian, or Alpine.
5. Click 'Download' to pull the compressed template image to the local storage.
