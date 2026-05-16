import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

export default withMermaid({
  title: "CyberHomelab",
  description: "Enterprise Nested Cybersecurity Training Architecture",
  cleanUrls: true,
  srcExclude: ['README.md'],
  rewrites: {
    'guidelines.md': 'index.md'
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
      { text: 'How to Follow', link: '/how-to-follow' },
      { text: 'Overview', link: '/overview' },
      { text: 'Curriculum', link: '/curriculum' },
      { text: 'Author', link: '/author' }
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Course Index',
        items: [
          { text: 'Ethical Guidelines', link: '/' },
          { text: 'How to Follow', link: '/how-to-follow' },
          { text: 'Project Overview', link: '/overview' },
          { text: 'Table of Contents', link: '/curriculum' }
        ]
      },
      {
        text: 'Module 1: Host Infrastructure',
        collapsed: false,
        items: [
          { text: 'Introduction to Nested Virtualization', link: '/lessons/module-1/01-01-introduction-to-nested-virtualization' },
          { text: 'Host BIOS and Hardware Acceleration', link: '/lessons/module-1/01-02-host-bios-and-hardware-acceleration' },
          { text: 'Primary Hypervisor Setup', link: '/lessons/module-1/01-03-installing-vmware-workstation' },
          { text: 'Virtual Network Configuration', link: '/lessons/module-1/01-04-vmware-virtual-network-editor' },
          { text: 'Creating the Isolated Network', link: '/lessons/module-1/01-05-creating-the-host-only-network' },
          { text: 'Introduction to Proxmox VE', link: '/lessons/module-1/01-06-introduction-to-proxmox-ve' },
          { text: 'Deploying Nested Proxmox', link: '/lessons/module-1/01-07-deploying-proxmox-as-a-nested-vm' },
          { text: 'Proxmox Initial Configuration', link: '/lessons/module-1/01-08-proxmox-initial-configuration' },
          { text: 'Attacker OS Installation', link: '/lessons/module-1/01-09-kali-linux-installation-on-vmware' },
          { text: 'Attaching Attacker to Network', link: '/lessons/module-1/01-10-attaching-kali-to-the-host-only-network' }
        ]
      },
      {
        text: 'Module 2: Network Segregation',
        collapsed: true,
        items: [
          { text: 'Virtual Bridges Explained', link: '/lessons/module-2/02-01-proxmox-virtual-bridges-explained' },
          { text: 'Configuring Management Interface', link: '/lessons/module-2/02-02-configuring-vmbr0-management-interface' },
          { text: 'Configuring Isolated Sandbox', link: '/lessons/module-2/02-03-configuring-vmbr1-isolated-sandbox' },
          { text: 'Introduction to Virtual Firewalls', link: '/lessons/module-2/02-04-introduction-to-virtual-firewalls' },
          { text: 'Deploying the Firewall Gateway', link: '/lessons/module-2/02-05-deploying-pfsense-in-proxmox' },
          { text: 'Interface Assignments', link: '/lessons/module-2/02-06-pfsense-interface-assignments' },
          { text: 'Configuring NAT and Routing', link: '/lessons/module-2/02-07-configuring-nat-and-routing-in-pfsense' },
          { text: 'Establishing the DMZ', link: '/lessons/module-2/02-08-establishing-the-dmz' },
          { text: 'Firewall Rules for Network', link: '/lessons/module-2/02-09-firewall-rules-for-the-offensive-network' },
          { text: 'Network Connectivity Testing', link: '/lessons/module-2/02-10-network-connectivity-testing' }
        ]
      },
      {
        text: 'Module 3: Target Provisioning',
        collapsed: true,
        items: [
          { text: 'LXC Fundamentals', link: '/lessons/module-3/03-01-linux-containers-lxc-fundamentals' },
          { text: 'Downloading Templates', link: '/lessons/module-3/03-02-downloading-lxc-templates-in-proxmox' },
          { text: 'Deploying LXC Nodes', link: '/lessons/module-3/03-03-deploying-an-ubuntu-lxc-node' },
          { text: 'Installing Docker in LXC', link: '/lessons/module-3/03-04-installing-docker-in-lxc' },
          { text: 'Docker Compose Fundamentals', link: '/lessons/module-3/03-05-docker-compose-fundamentals' },
          { text: 'Deploying Vulnerable Applications', link: '/lessons/module-3/03-06-deploying-dvwa-via-docker-compose' },
          { text: 'Deploying OWASP Juice Shop', link: '/lessons/module-3/03-07-deploying-owasp-juice-shop' },
          { text: 'Verifying Target Accessibility', link: '/lessons/module-3/03-08-verifying-target-accessibility' },
          { text: 'Server VM Templates', link: '/lessons/module-3/03-09-creating-windows-server-vm-templates' },
          { text: 'Deploying Vulnerable AD', link: '/lessons/module-3/03-10-deploying-vulnerable-active-directory' }
        ]
      },
      {
        text: 'Module 4: Offensive Operations',
        collapsed: true,
        items: [
          { text: 'Offensive Methodology', link: '/lessons/module-4/04-01-offensive-methodology-overview' },
          { text: 'Passive Recon and OSINT', link: '/lessons/module-4/04-02-passive-reconnaissance-and-osint' },
          { text: 'Active Network Discovery', link: '/lessons/module-4/04-03-active-network-discovery-with-nmap' },
          { text: 'Port Scanning and Enumeration', link: '/lessons/module-4/04-04-port-scanning-and-service-enumeration' },
          { text: 'Web Vulnerability Scanning', link: '/lessons/module-4/04-05-web-application-vulnerability-scanning' },
          { text: 'Intercepting Traffic', link: '/lessons/module-4/04-06-intercepting-traffic-with-burp-suite' },
          { text: 'Exploiting Command Injection', link: '/lessons/module-4/04-07-exploiting-dvwa-command-injection' },
          { text: 'Exploiting SQL Injection', link: '/lessons/module-4/04-08-exploiting-juice-shop-sql-injection' },
          { text: 'Using Metasploit for Access', link: '/lessons/module-4/04-09-using-metasploit-for-initial-access' },
          { text: 'Establishing Reverse Shells', link: '/lessons/module-4/04-10-establishing-reverse-shells' }
        ]
      },
      {
        text: 'Module 5: Defensive Security',
        collapsed: true,
        items: [
          { text: 'Defensive Methodology', link: '/lessons/module-5/05-01-defensive-methodology-and-incident-response' },
          { text: 'Host-Based Logging', link: '/lessons/module-5/05-02-host-based-logging-with-syslog' },
          { text: 'Network Traffic Analysis', link: '/lessons/module-5/05-03-network-traffic-analysis-with-tcpdump' },
          { text: 'Analyzing PCAPs', link: '/lessons/module-5/05-04-analyzing-pcaps-with-wireshark' },
          { text: 'Introduction to SIEM Systems', link: '/lessons/module-5/05-05-introduction-to-siem-systems' },
          { text: 'Deploying SIEM Manager', link: '/lessons/module-5/05-06-deploying-wazuh-manager-in-proxmox' },
          { text: 'Installing Security Agents', link: '/lessons/module-5/05-07-installing-wazuh-agents-on-targets' },
          { text: 'Detecting Network Scans', link: '/lessons/module-5/05-08-detecting-nmap-scans-in-wazuh' },
          { text: 'Detecting Web Attacks', link: '/lessons/module-5/05-09-detecting-web-attacks-in-logs' },
          { text: 'Firewall Mitigations', link: '/lessons/module-5/05-10-implementing-proxmox-firewall-mitigations' }
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
