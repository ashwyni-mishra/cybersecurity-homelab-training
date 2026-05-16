# 03-06: Deploying DVWA via Docker Compose

## Overview
Damn Vulnerable Web Application (DVWA) is a PHP/MySQL web application that is damn vulnerable. Its main goals are to be an aid for security professionals to test their skills and tools.

## Deployment Procedure
1. Create a directory: `mkdir ~/dvwa && cd ~/dvwa`.
2. Create `docker-compose.yml` with the `vulnerables/web-dvwa` image.
3. Execute `docker-compose up -d`.
4. Access the web interface on port 80 and click 'Create / Reset Database'.

## Reference Links
- **DVWA Project**: [Official GitHub Repository](https://github.com/digininja/DVWA)
- **Docker Image**: [Vulnerables/web-dvwa Documentation](https://hub.docker.com/r/vulnerables/web-dvwa)
- **Walkthrough Guide**: [DVWA Solutions and Explanations](https://github.com/macton-github/dvwa-walkthrough)
