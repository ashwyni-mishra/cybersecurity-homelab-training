# 03-06: Deploying DVWA via Docker Compose

## What is it used for?
Damn Vulnerable Web Application (DVWA) is a PHP/MySQL web application that is purposely designed to be "damn vulnerable." It is used by security professionals and students to:
- **Practice Web Attacks**: Safely test techniques like SQL Injection, XSS, and Command Injection.
- **Learn Security Levels**: DVWA features "Low," "Medium," "High," and "Impossible" difficulty settings to demonstrate how different coding practices affect security.
- **Test Security Tools**: Benchmark the effectiveness of vulnerability scanners and manual interception proxies like Burp Suite.
- **Educational Demonstrations**: Show exactly how a web-based attack occurs in a controlled environment.

## Techniques
To deploy DVWA efficiently in our lab, we use several Docker-based techniques:
1. **Container Image Pulling**: Fetching the `vulnerables/web-dvwa` image, which is a pre-configured environment containing the web server, PHP, and MySQL.
2. **Port Forwarding**: Mapping the container's internal port 80 to the LXC host's port (e.g., 80 or 8080) so it can be accessed by our Kali Linux machine.
3. **Restart Policies**: Using `restart: always` to ensure the target is available whenever the lab is running.
4. **State Initialization**: Using the internal application logic to "Create/Reset" the database after the container starts.

## How those techniques are used
- **The Compose File**: We define a single service in our `docker-compose.yml`. This file tells Docker exactly which image to use and how to expose it to the network.
- **Accessing the Target**: Once the container is running, we use the IP address assigned to the Ubuntu LXC node (from lesson 03-03) to access the DVWA login page.
- **Security Selection**: Once logged in (default credentials `admin`/`password`), the "DVWA Security" tab is used to adjust the difficulty of the challenges.

## Commands used

### Setting up the Environment
```bash
# Create a dedicated directory for the application
mkdir -p ~/lab/dvwa && cd ~/lab/dvwa
```

### Creating the Configuration
Create a file named `docker-compose.yml` with the following content:
```yaml
version: '3'
services:
  dvwa:
    image: vulnerables/web-dvwa
    ports:
      - "80:80"
    restart: always
```

### Launching the Application
```bash
# Start the container
docker compose up -d

# Verify it is running
docker compose ps
```

### Initial Setup Steps (Web UI)
1. Open a browser and navigate to `http://<LXC_IP_ADDRESS>`.
2. Login with Username: `admin` and Password: `password`.
3. Click on the **Setup / Reset DB** button in the left sidebar.
4. Click **Create / Reset Database**.
5. You will be redirected to the login page; log in again to begin testing.

## Summary
By using Docker Compose, we can deploy the Damn Vulnerable Web Application in seconds. This provides us with a standard, resettable, and highly configurable web vulnerability target that is essential for the offensive security modules later in this course.

## Reference links
- [DVWA Official GitHub Repository](https://github.com/digininja/DVWA)
- [Vulnerables/web-dvwa Docker Hub Page](https://hub.docker.com/r/vulnerables/web-dvwa)
- [OWASP: Top 10 Web Application Security Risks](https://owasp.org/www-project-top-ten/)

## Next Lesson
[Next Lesson: 03-07 - Deploying OWASP Juice Shop](/lessons/module-3/03-07-deploying-owasp-juice-shop)
