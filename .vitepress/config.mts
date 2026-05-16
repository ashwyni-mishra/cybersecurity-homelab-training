import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid({
  title: "cybersehomelab",
  description: "Enterprise Nested Cybersecurity Training Architecture",
  cleanUrls: true,
  rewrites: {
    'README.md': 'index.md'
  },
  themeConfig: {
    logo: 'https://github.com/ashwyni-mishra.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Curriculum', link: '/lessons/01-01-introduction-to-nested-virtualization' },
      { text: 'Author', link: 'https://github.com/ashwyni-mishra' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Project Overview',
        items: [
          { text: 'Architecture & Topology', link: '/#network-topology' },
          { text: 'Author Profile', link: '/#about-the-author' }
        ]
      },
      {
        text: 'Module 1: Host Infrastructure',
        items: [
          { text: 'Introduction to Nested Virtualization', link: '/lessons/01-01-introduction-to-nested-virtualization' },
          { text: 'Host BIOS and Hardware Acceleration', link: '/lessons/01-02-host-bios-and-hardware-acceleration' },
          { text: 'Installing VMware Workstation', link: '/lessons/01-03-installing-vmware-workstation' },
          { text: 'VMware Virtual Network Editor', link: '/lessons/01-04-vmware-virtual-network-editor' },
          { text: 'Creating the Host-Only Network', link: '/lessons/01-05-creating-the-host-only-network' },
          { text: 'Introduction to Proxmox VE', link: '/lessons/01-06-introduction-to-proxmox-ve' },
          { text: 'Deploying Proxmox as a Nested VM', link: '/lessons/01-07-deploying-proxmox-as-a-nested-vm' },
          { text: 'Proxmox Initial Configuration', link: '/lessons/01-08-proxmox-initial-configuration' },
          { text: 'Kali Linux Installation on VMware', link: '/lessons/01-09-kali-linux-installation-on-vmware' },
          { text: 'Attaching Kali to the Host-Only Network', link: '/lessons/01-10-attaching-kali-to-the-host-only-network' }
        ]
      },
      {
        text: 'Module 2: Network Segregation',
        items: [
          { text: 'Proxmox Virtual Bridges Explained', link: '/lessons/02-01-proxmox-virtual-bridges-explained' },
          { text: 'Configuring vmbr0 Management Interface', link: '/lessons/02-02-configuring-vmbr0-management-interface' },
          { text: 'Configuring vmbr1 Isolated Sandbox', link: '/lessons/02-03-configuring-vmbr1-isolated-sandbox' },
          { text: 'Introduction to Virtual Firewalls', link: '/lessons/02-04-introduction-to-virtual-firewalls' },
          { text: 'Deploying pfSense in Proxmox', link: '/lessons/02-05-deploying-pfsense-in-proxmox' },
          { text: 'pfSense Interface Assignments', link: '/lessons/02-06-pfsense-interface-assignments' },
          { text: 'Configuring NAT and Routing in pfSense', link: '/lessons/02-07-configuring-nat-and-routing-in-pfsense' },
          { text: 'Establishing the DMZ', link: '/lessons/02-08-establishing-the-dmz' },
          { text: 'Firewall Rules for the Offensive Network', link: '/lessons/02-09-firewall-rules-for-the-offensive-network' },
          { text: 'Network Connectivity Testing', link: '/lessons/02-10-network-connectivity-testing' }
        ]
      },
      {
        text: 'Module 3: Target Provisioning',
        items: [
          { text: 'Linux Containers (LXC) Fundamentals', link: '/lessons/03-01-linux-containers-lxc-fundamentals' },
          { text: 'Downloading LXC Templates in Proxmox', link: '/lessons/03-02-downloading-lxc-templates-in-proxmox' },
          { text: 'Deploying an Ubuntu LXC Node', link: '/lessons/03-03-deploying-an-ubuntu-lxc-node' },
          { text: 'Installing Docker in LXC', link: '/lessons/03-04-installing-docker-in-lxc' },
          { text: 'Docker Compose Fundamentals', link: '/lessons/03-05-docker-compose-fundamentals' },
          { text: 'Deploying DVWA via Docker Compose', link: '/lessons/03-06-deploying-dvwa-via-docker-compose' },
          { text: 'Deploying OWASP Juice Shop', link: '/lessons/03-07-deploying-owasp-juice-shop' },
          { text: 'Verifying Target Accessibility', link: '/lessons/03-08-verifying-target-accessibility' },
          { text: 'Creating Windows Server VM Templates', link: '/lessons/03-09-creating-windows-server-vm-templates' },
          { text: 'Deploying Vulnerable Active Directory', link: '/lessons/03-10-deploying-vulnerable-active-directory' }
        ]
      },
      {
        text: 'Module 4: Offensive Operations',
        items: [
          { text: 'Offensive Methodology Overview', link: '/lessons/04-01-offensive-methodology-overview' },
          { text: 'Passive Reconnaissance and OSINT', link: '/lessons/04-02-passive-reconnaissance-and-osint' },
          { text: 'Active Network Discovery with Nmap', link: '/lessons/04-03-active-network-discovery-with-nmap' },
          { text: 'Port Scanning and Service Enumeration', link: '/lessons/04-04-port-scanning-and-service-enumeration' },
          { text: 'Web Application Vulnerability Scanning', link: '/lessons/04-05-web-application-vulnerability-scanning' },
          { text: 'Intercepting Traffic with Burp Suite', link: '/lessons/04-06-intercepting-traffic-with-burp-suite' },
          { text: 'Exploiting DVWA Command Injection', link: '/lessons/04-07-exploiting-dvwa-command-injection' },
          { text: 'Exploiting Juice Shop SQL Injection', link: '/lessons/04-08-exploiting-juice-shop-sql-injection' },
          { text: 'Using Metasploit for Initial Access', link: '/lessons/04-09-using-metasploit-for-initial-access' },
          { text: 'Establishing Reverse Shells', link: '/lessons/04-10-establishing-reverse-shells' }
        ]
      },
      {
        text: 'Module 5: Defensive Security',
        items: [
          { text: 'Defensive Methodology and Incident Response', link: '/lessons/05-01-defensive-methodology-and-incident-response' },
          { text: 'Host-Based Logging with Syslog', link: '/lessons/05-02-host-based-logging-with-syslog' },
          { text: 'Network Traffic Analysis with tcpdump', link: '/lessons/05-03-network-traffic-analysis-with-tcpdump' },
          { text: 'Analyzing PCAPs with Wireshark', link: '/lessons/05-04-analyzing-pcaps-with-wireshark' },
          { text: 'Introduction to SIEM Systems', link: '/lessons/05-05-introduction-to-siem-systems' },
          { text: 'Deploying Wazuh Manager in Proxmox', link: '/lessons/05-06-deploying-wazuh-manager-in-proxmox' },
          { text: 'Installing Wazuh Agents on Targets', link: '/lessons/05-07-installing-wazuh-agents-on-targets' },
          { text: 'Detecting Nmap Scans in Wazuh', link: '/lessons/05-08-detecting-nmap-scans-in-wazuh' },
          { text: 'Detecting Web Attacks in Logs', link: '/lessons/05-09-detecting-web-attacks-in-logs' },
          { text: 'Implementing Proxmox Firewall Mitigations', link: '/lessons/05-10-implementing-proxmox-firewall-mitigations' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ashwyni-mishra/cybersecurity-homelab-training' }
    ]
  }
})
