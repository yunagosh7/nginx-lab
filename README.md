# Microservices App

## Overview

The goal of this project is to design the infrastructure and deploy a complete microservices-based application using modern DevOps and backend technologies.

This repository focuses primarily on:

- Infrastructure design
- Containerization
- Service-to-service communication
- Environment configuration
- Future cloud deployment using Terraform

> The project prioritizes infrastructure and system design over business features.

---

## Architecture

The application is composed of multiple services running in Docker containers and connected through a shared Docker network.

### Services

- **Nginx**
  - Acts as a reverse proxy and entry point for the application.

- **Node.js (Express)**
  - Main backend service.
  - Communicates with MySQL.
  - Publishes/consumes messages via RabbitMQ.

- **Python (FastAPI)**
  - Secondary service.
  - Uses PostgreSQL.
  - Designed for async/background workloads.

- **MySQL**
  - Database used by the Node.js service.

- **PostgreSQL**
  - Database used by the Python service.

- **RabbitMQ**
  - Message broker for asynchronous communication between services.

---

## Technologies Used

- JavaScript / TypeScript
- Node.js (Express)
- Python
- FastAPI
- MySQL
- PostgreSQL
- RabbitMQ
- Terraform *(planned for infrastructure provisioning)*
- Nginx
- Docker
- Docker Compose

---

## Getting Started

### Prerequisites

Make sure you have installed:

- Docker
- Docker Compose

---

### Setup

#### 1. Clone the repository

```bash
git clone <repo-url>
cd <repo-name>
```
2. Create environment variables
Copy the template file:
```bash
cp app-node/.env.template app-node/.env
```
---

Then edit the .env file and provide the required values.

3. Build and run the project
```bash
docker compose up -d --build
```


### Project Structure
```bash
.
├── app-node        # Node.js service
├── app-python      # FastAPI service
├── nginx.conf      # Nginx configuration
├── docker-compose.yml
└── terraform       # (future infrastructure provisioning)
```

### Environment Variables

This project uses environment variables to manage sensitive data.

The .env file is not committed to the repository.

Instead, a template file is provided:
```
app-node/.env.template
```

---

### Networking

All services communicate through an internal Docker network:
```
lab-network
```
Nginx acts as the public entry point to the system.

---

### Volumes

Persistent storage is configured for:

- MySQL data
- PostgreSQL data


### Development Notes
- The Node.js service installs dependencies at container startup.
- Services are designed to be horizontally scalable.
- The project is structured to allow easy migration to cloud environments.

### Future Improvements / Roadmap

- [ ] Infrastructure provisioning using Terraform
- [ ] Cloud deployment (AWS planned)
- [ ] CI/CD pipeline
- [ ] Service health checks
- [ ] Observability (logging + metrics)
- [ ] Load testing
- [ ] Message retry and dead-letter queues
- [ ] API Gateway improvements

### Running Containers

To check running containers:

```bash
docker compose ps
```

To stop the project:
```bash
docker compose down
```

## Author

Juan Cruz Vila