import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

export default withMermaid({
  title: "CyberHomelab",
  description: "Enterprise Nested Cybersecurity Training Architecture",
  cleanUrls: true,
  srcExclude: ['README.md'],
  rewrites: {
    'curriculum.md': 'index.md'
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  },
  themeConfig: {
    logo: 'https://github.com/ashwyni-mishra.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/overview' },
      { text: 'Author', link: '/author' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Course Index',
        items: [
          { text: 'Table of Contents', link: '/' },
          { text: 'Project Overview', link: '/overview' }
        ]
      },
      {
        text: 'Module 1: Host Infrastructure',
        items: [
          { text: 'Introduction to Nested Virtualization', link: '/lessons/01-01-introduction-to-nested-virtualization' },
          { text: 'Host BIOS and Hardware Acceleration', link: '/lessons/01-02-host-bios-and-hardware-acceleration' },
          { text: 'Primary Hypervisor Setup', link: '/lessons/01-03-installing-vmware-workstation' },
          { text: 'Virtual Network Configuration', link: '/lessons/01-04-vmware-virtual-network-editor' },
          { text: 'Creating the Isolated Network', link: '/lessons/01-05-creating-the-host-only-network' },
          { text: 'Introduction to Proxmox VE', link: '/lessons/01-06-introduction-to-proxmox-ve' },
          { text: 'Deploying Nested Proxmox', link: '/lessons/01-07-deploying-proxmox-as-a-nested-vm' },
          { text: 'Proxmox Initial Configuration', link: '/lessons/01-08-proxmox-initial-configuration' },
          { text: 'Attacker OS Installation', link: '/lessons/01-09-kali-linux-installation-on-vmware' },
          { text: 'Attaching Attacker to Network', link: '/lessons/01-10-attaching-kali-to-the-host-only-network' }
        ]
      },
      {
        text: 'Module 2: Network Segregation',
        items: [
          { text: 'Virtual Bridges Explained', link: '/lessons/02-01-proxmox-virtual-bridges-explained' },
          { text: 'Configuring Management Interface', link: '/lessons/02-02-configuring-vmbr0-management-interface' },
          { text: 'Configuring Isolated Sandbox', link: '/lessons/02-03-configuring-vmbr1-isolated-sandbox' },
          { text: 'Introduction to Virtual Firewalls', link: '/lessons/02-04-introduction-to-virtual-firewalls' },
          { text: 'Deploying the Firewall Gateway', link: '/lessons/02-05-deploying-pfsense-in-proxmox' },
          { text: 'Interface Assignments', link: '/lessons/02-06-pfsense-interface-assignments' },
          { text: 'Configuring NAT and Routing', link: '/lessons/02-07-configuring-nat-and-routing-in-pfsense' },
          { text: 'Establishing the DMZ', link: '/lessons/02-08-establishing-the-dmz' },
          { text: 'Firewall Rules for Network', link: '/lessons/02-09-firewall-rules-for-the-offensive-network' },
          { text: 'Network Connectivity Testing', link: '/lessons/02-10-network-connectivity-testing' }
        ]
      },
      {
        text: 'Module 3: Target Provisioning',
        items: [
          { text: 'LXC Fundamentals', link: '/lessons/03-01-linux-containers-lxc-fundamentals' },
          { text: 'Downloading Templates', link: '/lessons/03-02-downloading-lxc-templates-in-proxmox' },
          { text: 'Deploying LXC Nodes', link: '/lessons/03-03-deploying-an-ubuntu-lxc-node' },
          { text: 'Installing Docker in LXC', link: '/lessons/03-04-installing-docker-in-lxc' },
          { text: 'Docker Compose Fundamentals', link: '/lessons/03-05-docker-compose-fundamentals' },
          { text: 'Deploying Vulnerable Applications', link: '/lessons/03-06-deploying-dvwa-via-docker-compose' },
          { text: 'Deploying OWASP Juice Shop', link: '/lessons/03-07-deploying-owasp-juice-shop' },
          { text: 'Verifying Target Accessibility', link: '/lessons/03-08-verifying-target-accessibility' },
          { text: 'Server VM Templates', link: '/lessons/03-09-creating-windows-server-vm-templates' },
          { text: 'Deploying Vulnerable AD', link: '/lessons/03-10-deploying-vulnerable-active-directory' }
        ]
      },
      {
        text: 'Module 4: Offensive Operations',
        items: [
          { text: 'Offensive Methodology', link: '/lessons/04-01-offensive-methodology-overview' },
          { text: 'Passive Recon and OSINT', link: '/lessons/04-02-passive-reconnaissance-and-osint' },
          { text: 'Active Network Discovery', link: '/lessons/04-03-active-network-discovery-with-nmap' },
          { text: 'Port Scanning and Enumeration', link: '/lessons/04-04-port-scanning-and-service-enumeration' },
          { text: 'Web Vulnerability Scanning', link: '/lessons/04-05-web-application-vulnerability-scanning' },
          { text: 'Intercepting Traffic', link: '/lessons/04-06-intercepting-traffic-with-burp-suite' },
          { text: 'Exploiting Command Injection', link: '/lessons/04-07-exploiting-dvwa-command-injection' },
          { text: 'Exploiting SQL Injection', link: '/lessons/04-08-exploiting-juice-shop-sql-injection' },
          { text: 'Using Metasploit for Access', link: '/lessons/04-09-using-metasploit-for-initial-access' },
          { text: 'Establishing Reverse Shells', link: '/lessons/04-10-establishing-reverse-shells' }
        ]
      },
      {
        text: 'Module 5: Defensive Security',
        items: [
          { text: 'Defensive Methodology', link: '/lessons/05-01-defensive-methodology-and-incident-response' },
          { text: 'Host-Based Logging', link: '/lessons/05-02-host-based-logging-with-syslog' },
          { text: 'Network Traffic Analysis', link: '/lessons/05-03-network-traffic-analysis-with-tcpdump' },
          { text: 'Analyzing PCAPs', link: '/lessons/05-04-analyzing-pcaps-with-wireshark' },
          { text: 'Introduction to SIEM Systems', link: '/lessons/05-05-introduction-to-siem-systems' },
          { text: 'Deploying SIEM Manager', link: '/lessons/05-06-deploying-wazuh-manager-in-proxmox' },
          { text: 'Installing Security Agents', link: '/lessons/05-07-installing-wazuh-agents-on-targets' },
          { text: 'Detecting Network Scans', link: '/lessons/05-08-detecting-nmap-scans-in-wazuh' },
          { text: 'Detecting Web Attacks', link: '/lessons/05-09-detecting-web-attacks-in-logs' },
          { text: 'Firewall Mitigations', link: '/lessons/05-10-implementing-proxmox-firewall-mitigations' }
        ]
      },
      {
        text: 'About the Author',
        items: [
          { text: 'Profile', link: '/author' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ashwyni-mishra/cybersecurity-homelab-training' }
    ]
  }
})
