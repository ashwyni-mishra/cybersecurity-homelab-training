# 03-07: Deploying OWASP Juice Shop

## Overview
OWASP Juice Shop is probably the most modern and sophisticated insecure web application. It can be used in security trainings, awareness demos, CTFs and as a guinea pig for security tools.

## Deployment via Docker
```bash
docker run --rm -d -p 3000:3000 --name juice-shop bkimminich/juice-shop
```
## Technical Architecture
Juice Shop is written in Node.js, Express, and Angular. It utilizes a SQLite database by default, making it an excellent target for testing JavaScript-specific vulnerabilities and SQL injection.

## Reference Links
- **OWASP Juice Shop**: [Official Project Page](https://owasp.org/www-project-juice-shop/)
- **Companion Guide**: [Pwning OWASP Juice Shop (E-book)](https://pwning.owasp-juice.shop/)
- **GitHub Repository**: [Source Code and Issues](https://github.com/juice-shop/juice-shop)
