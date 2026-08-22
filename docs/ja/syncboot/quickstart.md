---
title: 5分クイックスタート
description: Docker Composeを使用して、SyncBootバックエンドサーバー、管理コンソール、MCP Server、サンプルDBをローカル環境で起動・検証します。
sort: 1
---

# 5分クイックスタート

Docker Composeを利用して、ローカル開発環境にSyncBootサービスを起動し、管理コンソールおよびMCP APIをテストする手順を説明します。

---

## システム要件

- **Docker & Docker Compose**: Docker 24.0以上 / Docker Compose v2.20以上
- **メモリ**: 最小 4GB RAM (推奨 8GB 以上)
- **ポート**: `8080` (Spring Boot API), `3000` (Admin Console UI), `3306` (MySQL), `6379` (Redis)

---

## 1. リポジトリのクローン & サービス起動

ターミナルで以下のコマンドを実行します。

```bash
# 1. リポジトリをクローン
git clone https://github.com/DramaticCollaboration/SyncSeries.git
cd SyncSeries/SyncBoot

# 2. Docker Composeで起動
docker-compose -f docker-compose-local.yml up -d
```

> [!NOTE]
> 初回起動時にデータベース初期化スクリプト（`01. init.sql`, `02. syncboot.sql`, `03. sample.sql`）が順次適用され、約30〜60秒で各コンテナが正常稼働状態になります。

---

## 2. エンドポイント一覧

起動後、以下のURLから各サービスにアクセスできます。

| サービス | URL | 認証情報 | 説明 |
| :--- | :--- | :--- | :--- |
| **Admin Console UI** | `http://localhost:3000` | `admin` / `syncboot123!` | バックエンド統合管理コンソール |
| **REST API Server** | `http://localhost:8080` | JWT Bearer Token | Spring Boot 3 ビジネスAPIサーバー |
| **OpenAPI / Swagger**| `http://localhost:8080/swagger-ui/index.html` | - | 対話型REST APIテスト環境 |
| **MCP Server SSE** | `http://localhost:8080/mcp/sse` | MCP Auth Header | Model Context Protocol SSEエンドポイント |

---

## 3. 正常動作の検証

### 1) REST API 状態確認
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

### 2) MCP Server ツール一覧の取得
```bash
curl -X GET http://localhost:8080/mcp/tools
```
```json
{
  "tools": [
    {
      "name": "syncboot_read_schema",
      "description": "指定されたドメインのテーブル構造とカラムメタデータを取得します。"
    },
    {
      "name": "syncboot_execute_query",
      "description": "認可された範囲内でドメインCRUDクエリを実行します。"
    },
    {
      "name": "syncboot_fetch_server_logs",
      "description": "最近の分散サーバーエラーログを収集します。"
    }
  ]
}
```

---

## 関連ドキュメント

- [システムアーキテクチャおよびモジュール構成](./architecture)
- [知能型スキーマスタジオ & 3-File標準](./schema-studio)
- [ローコードフルスタック生成器](./lowcode-generator)
