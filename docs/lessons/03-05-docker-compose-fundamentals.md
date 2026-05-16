# 03-05: Docker Compose Fundamentals

## Overview
Docker Compose is a tool for defining and running multi-container Docker applications. It uses YAML files to configure the application's services, networks, and volumes.

## YAML Structure
- **version**: Specifies the version of the Compose file format.
- **services**: Defines the individual containers (e.g., web, database).
- **networks**: Defines custom networks for service communication.
- **volumes**: Defines persistent data storage.

## Common Commands
- `docker-compose up -d`: Starts the stack in detached mode.
- `docker-compose down`: Stops and removes the stack containers.
- `docker-compose logs -f`: Views real-time logs.
