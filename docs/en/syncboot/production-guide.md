---
title: Production Deployment & Performance Metrics
description: Production deployment configurations using Docker Compose and Kubernetes, performance benchmark metrics, and high-availability settings.
sort: 8
---

# Production Deployment & Performance Metrics

This section describes container deployment configurations and performance metrics for running SyncBoot in production environments.

---

## Performance Metrics (Benchmark Data)

Runtime and development productivity metrics based on internal test environments:

| Metric | Result / Details | Remarks |
| :--- | :--- | :--- |
| **Domain CRUD API & UI Scaffolding** | ~3 Minutes (1-Click Generation) | Controllers, Services, Mappers, Vue UI |
| **Single Instance Read Throughput** | 8,000+ TPS (HikariCP + Redis Caching) | Test Environment (8 Core, 16GB RAM) |
| **Average Response Latency (P99)** | < 12ms | Redis Cache Hit Criteria |
| **Distributed Log Retrieval** | < 1 Minute | MCP Tool-based Inspection |

---

## Docker Compose Production Setup

```yaml
version: '3.8'

services:
  syncboot-server:
    image: empasy/syncboot-server:latest
    container_name: syncboot-server
    restart: always
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_HOST=syncboot-mysql
      - REDIS_HOST=syncboot-redis
      - JAVA_OPTS=-Xms2g -Xmx4g -XX:+UseG1GC
    ports:
      - "8080:8080"
    depends_on:
      - syncboot-mysql
      - syncboot-redis

  syncboot-admin:
    image: empasy/syncboot-admin:latest
    container_name: syncboot-admin
    restart: always
    ports:
      - "3000:80"
    environment:
      - BACKEND_API_URL=http://syncboot-server:8080

  syncboot-mysql:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: syncboot_db
    volumes:
      - mysql_data:/var/lib/mysql

  syncboot-redis:
    image: redis:7.2-alpine
    restart: always
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data

volumes:
  mysql_data:
  redis_data:
```

---

## Kubernetes Autoscaling (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: syncboot-server-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: syncboot-server
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```
