# 03-07: Deploying OWASP Juice Shop

## What is it used for?
OWASP Juice Shop is a modern, sophisticated, and "intentionally insecure" web application. It is used in security training, awareness demonstrations, and CTFs (Capture The Flag). It is particularly useful for:
- **Modern Web Security**: Unlike older targets, Juice Shop uses a modern stack (Node.js, Express, Angular) and REST APIs.
- **Gamified Learning**: It features a hidden "Score Board" that tracks your progress as you successfully exploit various vulnerabilities.
- **Comprehensive Coverage**: It covers the entire OWASP Top 10 and more, including challenges ranging from trivial to extremely difficult.
- **Tool Testing**: It is an excellent "guinea pig" for testing modern DAST (Dynamic Application Security Testing) tools and manual proxy techniques.

## Techniques
Deploying Juice Shop in our homelab utilizes the following containerization techniques:
1. **Automated Resource Provisioning**: Using Docker to pull the official `bkimminich/juice-shop` image, which includes the entire application and its internal SQLite database.
2. **Dynamic Port Mapping**: Exposing the application on port 3000, which is the standard port for many Node.js applications.
3. **Environment Persistence**: While Juice Shop can run statelessly, we can use Docker volumes if we want to save our progress on the scoreboard between restarts.
4. **Health Checking**: Monitoring the container to ensure the Node.js process is active and responsive.

## How those techniques are used
- **Single Command Deployment**: Because Juice Shop is self-contained (including its database), it can be started with a single `docker run` command or a minimal `docker-compose.yml`.
- **Finding the Score Board**: The first task for any user is to find the hidden `/score-board` URL. This is a practical exercise in web enumeration and directory busting.
- **Exploitation via API**: Many of Juice Shop's vulnerabilities are found in its REST API, requiring users to use tools like Burp Suite or Postman to manipulate JSON requests rather than just standard form fields.

## Commands used

### Option 1: Quick Start (Docker Run)
```bash
docker run -d -p 3000:3000 --name juice-shop bkimminich/juice-shop
```

### Option 2: Persistent Deployment (Docker Compose)
Create a directory `~/lab/juiceshop` and create a `docker-compose.yml`:
```yaml
version: '3'
services:
  juice-shop:
    image: bkimminich/juice-shop
    ports:
      - "3000:3000"
    restart: always
```
Run with:
```bash
docker compose up -d
```

### Post-Deployment Verification
```bash
# Check if the container is running
docker ps | grep juice-shop

# Check the logs if you cannot reach the site
docker logs juice-shop
```

### Accessing the Shop
Open your browser and navigate to:
`http://<LXC_IP_ADDRESS>:3000`

## Summary
OWASP Juice Shop provides a realistic and modern target for our security lab. By deploying it via Docker, we gain access to a wide array of security challenges that mirror real-world vulnerabilities found in JavaScript-heavy applications. Its gamified nature makes it an engaging tool for both beginners and advanced practitioners.

## Reference links
- [OWASP Juice Shop Official Project Page](https://owasp.org/www-project-juice-shop/)
- [Pwning OWASP Juice Shop (Free E-book)](https://pwning.owasp-juice.shop/)
- [Juice Shop GitHub Repository](https://github.com/juice-shop/juice-shop)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)

## Next Lesson
[Next Lesson: 03-08 - Verifying Target Accessibility](/lessons/module-3/03-08-verifying-target-accessibility)
