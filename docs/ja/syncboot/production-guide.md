---
title: 本番デプロイおよび性能指標
description: Docker ComposeおよびKubernetesによる本番デプロイ構成、性能ベンチマーク指標、高可用性設定ガイド。
sort: 8
---

# 本番デプロイおよび性能指標

SyncBootの本番運用環境向けコンテナデプロイ構成と主要な性能指標を説明します。

---

## 性能指標 (Benchmark Data)

内部テスト環境に基づくランタイムおよび開発生産性指標です。

| 項目 | 数値および内容 | 備考 |
| :--- | :--- | :--- |
| **ドメインCRUD API & UIコード生成** | 約3分前後 (1-Click生成) | Controller, Service, Mapper, Vue UI一括 |
| **単一インスタンス読込Throughput** | 8,000+ TPS (HikariCP + Redis キャッシュ適用時) | テスト環境 (8 Core, 16GB RAM) |
| **平均応答レイテンシ (P99)** | 12ms 以下 | Redis キャッシュヒット時 |
| **分散サーバーログ照会時間** | 1分以内 | MCP ツール経由 |

---

## Docker Compose 本番構成例

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

## Kubernetes オートスケーリング (HPA)

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
