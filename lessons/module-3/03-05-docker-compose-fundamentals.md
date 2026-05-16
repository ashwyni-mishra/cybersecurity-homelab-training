# 03-05: Docker Compose Fundamentals

## What is it used for?
Docker Compose is a tool for defining and running multi-container Docker applications. It is used to:
- **Simplify Orchestration**: Instead of manual `docker run` commands for each component, you define the entire application stack in a single YAML file.
- **Environment Consistency**: Ensure that an application runs exactly the same way in development, testing, and production.
- **Dependency Management**: Easily manage applications that require multiple services to function, such as a web server coupled with a database.
- **Microservices Deployment**: Ideal for modern software architectures where functionality is split across many small, communicating services.

## Techniques
Docker Compose utilizes several key techniques to manage application lifecycles:
1. **Declarative Configuration**: Using a `docker-compose.yml` file to specify the "desired state" of the infrastructure.
2. **Service Discovery**: Automatically creating a DNS-enabled network where containers can find each other using their service names (e.g., `db` instead of an IP address).
3. **Volume Mapping**: Linking host directories to container paths to ensure data persists even if a container is deleted and recreated.
4. **Environment Abstraction**: Using `.env` files to separate configuration (like API keys or passwords) from the logic defined in the YAML file.

## How those techniques are used
- **The YAML File**: The `docker-compose.yml` file is the heart of the tool. It contains sections for `services` (the containers), `networks` (isolation layers), and `volumes` (persistent storage).
- **Service Isolation**: By default, Compose sets up a single network for your app. Each container for a service joins the default network and is both reachable by other containers on that network, and discoverable by them at a hostname identical to the service name.
- **Resource Cleanup**: Docker Compose tracks all resources it creates (containers, networks, volumes). This allows for easy cleanup—running one command can tear down the entire stack and remove its associated networking.

## Commands used

### Installation Check
Modern Docker includes Compose as a plugin:
```bash
docker compose version
```

### Stack Management
Run these in the directory containing your `docker-compose.yml`:
```bash
# Start all services in the background (detached mode)
docker compose up -d

# Check the status of the stack
docker compose ps

# View logs for all services
docker compose logs -f

# Execute a command inside a specific service container
docker compose exec <service_name> <command>
# Example: docker compose exec db mysql -u root -p
```

### Stopping and Cleaning Up
```bash
# Stop all containers but keep them
docker compose stop

# Stop and remove all containers and networks
docker compose down

# Stop and remove containers, networks, AND volumes (CAUTION: deletes data)
docker compose down -v
```

## Summary
Docker Compose is an essential tool for any security lab. It allows us to treat a complex set of interconnected services as a single application. By defining our vulnerable targets in YAML, we can ensure they are deployed consistently with the correct networking and security configurations every time.

## Reference links
- [Docker Compose Overview](https://docs.docker.com/compose/)
- [Docker Compose File Specification](https://docs.docker.com/compose/compose-file/)
- [Best Practices for Docker Compose](https://docs.docker.com/compose/best-practices/)

## Next Lesson
[Next Lesson: 03-06 - Deploying DVWA via Docker Compose](/lessons/module-3/03-06-deploying-dvwa-via-docker-compose)
