---
title: 5-Minute QuickStart
description: Launch and verify the SyncBoot backend server, Admin Console, MCP Server, and sample database locally using Docker Compose.
sort: 1
---

# 5-Minute QuickStart

This guide explains how to set up the SyncBoot development environment locally using Docker Compose and test the Admin Console and MCP APIs.

---

## System Requirements

Recommended specifications for running SyncBoot locally:

- **Docker & Docker Compose**: Docker 24.0+ / Docker Compose v2.20+
- **Memory**: Minimum 4GB RAM (8GB+ recommended)
- **Ports**: `8080` (Spring Boot API), `3000` (Admin Console UI), `3306` (MySQL), `6379` (Redis)

---

## 1. Clone Repository & Launch Services

Run the following commands in your terminal:

```bash
# 1. Clone repository
git clone https://github.com/DramaticCollaboration/SyncSeries.git
cd SyncSeries/SyncBoot

# 2. Launch with Docker Compose
docker-compose -f docker-compose-local.yml up -d
```

> [!NOTE]
> On the initial startup, database initialization scripts (`01. init.sql`, `02. syncboot.sql`, `03. sample.sql`) are applied automatically. Containers transition to healthy status within 30-60 seconds.

---

## 2. Service Endpoints

Access the running services via the following URLs:

| Service | URL | Credentials | Description |
| :--- | :--- | :--- | :--- |
| **Admin Console UI** | `http://localhost:3000` | `admin` / `syncboot123!` | Central management and administrative console |
| **REST API Server** | `http://localhost:8080` | JWT Bearer Token | Spring Boot 3 domain business engine |
| **OpenAPI / Swagger**| `http://localhost:8080/swagger-ui/index.html` | - | Interactive REST API testing sandbox |
| **MCP Server SSE** | `http://localhost:8080/mcp/sse` | MCP Auth Header | Model Context Protocol SSE endpoint |

---

## 3. Health & Tool Verification

### 1) REST API Health Check
```bash
curl -X GET http://localhost:8080/actuator/health
```
```json
{
  "status": "UP",
  "components": {
    "db": { "status": "UP", "details": { "database": "MySQL", "validationQuery": "isValid()" } },
    "redis": { "status": "UP", "details": { "version": "7.2.4" } },
    "diskSpace": { "status": "UP" }
  }
}
```

### 2) MCP Tool Discovery
```bash
curl -X GET http://localhost:8080/mcp/tools
```
```json
{
  "tools": [
    {
      "name": "syncboot_read_schema",
      "description": "Retrieves table structures and column metadata for specified domain."
    },
    {
      "name": "syncboot_execute_query",
      "description": "Executes authorized domain CRUD queries."
    },
    {
      "name": "syncboot_fetch_server_logs",
      "description": "Collects recent distributed server error logs."
    }
  ]
}
```

---

## Next Steps

- [System Architecture & Modules](./architecture)
- [Intelligent Schema Studio & 3-File Standard](./schema-studio)
- [Low-Code Fullstack Generator](./lowcode-generator)
