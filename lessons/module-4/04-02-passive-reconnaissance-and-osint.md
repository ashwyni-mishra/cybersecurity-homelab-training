# 04-02: Passive Reconnaissance and OSINT

## What is it used for?
Passive Reconnaissance and Open Source Intelligence (OSINT) are used to gather as much information as possible about a target without directly interacting with their infrastructure. The primary goal is to remain undetected while identifying the target's attack surface, including domain names, IP addresses, employee information, technologies used, and potential misconfigurations. This phase is crucial because it allows an attacker to plan a more focused and effective active attack while minimizing the risk of triggering security alerts.

## Techniques
Several techniques are used for passive reconnaissance:
1.  **Google Dorking**: Using advanced search operators to find sensitive information indexed by search engines.
2.  **DNS Enumeration (Passive)**: Querying public DNS records and historical databases to find subdomains and IP ranges.
3.  **WHOIS Lookups**: Identifying domain ownership, registration dates, and administrative contact information.
4.  **Social Media Intelligence (SOCMINT)**: Harvesting information from LinkedIn, Twitter, and other platforms to identify employee roles and tech stacks.
5.  **Service Search Engines (Shodan/Censys)**: Using databases that have already scanned the internet to find open ports and services on the target's IP addresses.
6.  **GitHub/GitLab Harvesting**: Searching public repositories for leaked secrets, API keys, and internal documentation.

## How those techniques are used
-   **Identifying Entry Points**: By using Google Dorks like `site:target.com intitle:"index of"`, an attacker might find an exposed file directory containing sensitive documents.
-   **Mapping the Network**: Using Shodan to search for `hostname:target.com` can reveal which servers are exposed to the internet and what services (like SSH or RDP) are running on them.
-   **Targeting Employees**: LinkedIn can be used to find IT staff or developers. If a developer mentions "managing our Kubernetes cluster" on their profile, it reveals a specific technology to target.
-   **Finding Leaks**: Searching GitHub for the company name might reveal a developer's personal repository containing hardcoded database credentials for a "test" environment that mirrors production.

## Commands used
Many OSINT techniques are performed via web browsers, but several CLI tools facilitate the process:
-   **DNS & WHOIS**:
    ```bash
    # Perform a WHOIS lookup to find domain registration details
    whois target.com

    # Query DNS records using 'dig' (passive if using public resolvers like 8.8.8.8)
    dig target.com ANY @8.8.8.8

    # List subdomains found in search engines (using sublist3r)
    sublist3r -d target.com
    ```
-   **Google Dorks (Input into Google Search)**:
    -   `site:target.com filetype:php` -> Find PHP pages.
    -   `site:target.com inurl:login` -> Find login portals.
    -   `site:pastebin.com "target.com"` -> Find mentions of the target in Pastebin leaks.
-   **Shodan CLI**:
    ```bash
    # Search for details about a specific IP (requires API key)
    shodan host 8.8.8.8
    
    # Count how many devices are running a specific service in a city
    shodan count apache city:"New York"
    ```

## Summary
Passive Reconnaissance and OSINT are the foundation of any successful offensive operation. By leveraging publicly available data from search engines, DNS records, and social media, an attacker can build a detailed profile of a target's infrastructure and personnel without ever sending a single packet to the target's network. This silent approach is essential for remaining undetected and identifying the most promising paths for exploitation.

## Reference links
- [OSINT Framework](https://osintframework.com/) - A directory of OSINT tools.
- [Google Hacking Database (GHDB)](https://www.exploit-db.com/google-hacking-database) - A list of useful Google Dorks.
- [Shodan](https://www.shodan.io/) - The search engine for the Internet of Things.
- [Sublist3r GitHub](https://github.com/aboul3la/Sublist3r) - Tool for subdomain enumeration.

## Next Lesson
[Next Lesson: 04-03 - Active Network Discovery with Nmap](/lessons/module-4/04-03-active-network-discovery-with-nmap)
