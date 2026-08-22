---
title: システムアーキテクチャおよびモジュール構成
description: SyncBootの4層アーキテクチャと、ドメイン運用、スキーマ設計、IAMセキュリティ、MCP通信、バッチ処理を担う5大モジュール構成および技術スタックを解説します。
sort: 2
---

# システムアーキテクチャおよびモジュール構成

SyncBootは、安定したサービス運用と拡張性を確保するため、4層アーキテクチャと5大機能モジュール協調構造を採用しています。

---

## 4層システムアーキテクチャ

```mermaid
graph TD
    subgraph "1. プレゼンテーション層 (Presentation Layer)"
        UI1[SyncBoot Admin Console - Vue 3 + Ant Design]
        UI2[Swagger / OpenAPI 3.0 UI]
        UI3[外部クライアント - REST API & WebHook]
    end

    subgraph "2. セキュリティ & ゲートウェイ層 (Security Layer)"
        GW[API Gateway & Rate Limiter]
        JWT[JWT / OAuth2 / SSO 認証モジュール]
        RBAC[多層RBACフィルター & テナント分離]
        MASK[動的データマスキングモジュール]
    end

    subgraph "3. コア & エージェント層 (Core & AI Layer)"
        AGENT1[Domain Operator - CRUD処理]
        AGENT2[Schema Architect - 3-File DDL設計]
        AGENT3[Security IAM - 権限検証・監査]
        AGENT4[MCP Dispatcher - A2A SSE通信]
        AGENT5[Batch Orchestrator - 分散スケジューラー]
        LC4J[LangChain4j 標準AIフレームワーク]
    end

    subgraph "4. 永続化 & インフラ層 (Persistence & Infra Layer)"
        RDB[(RDBMS - MySQL 8.0 / PostgreSQL / Oracle)]
        REDIS[(Redis 7 - セッションキャッシュ、分散ロック、Saga状態)]
        BATCH[(Quartz & Spring Batch バッチ処理基盤)]
        LOGS[(分散サーバーログ)]
    end

    UI1 & UI2 & UI3 --> GW
    GW --> JWT & RBAC & MASK
    JWT & RBAC --> AGENT1 & AGENT2 & AGENT3 & AGENT4 & AGENT5
    AGENT1 & AGENT2 & AGENT3 & AGENT4 & AGENT5 <--> LC4J
    AGENT1 --> RDB
    AGENT2 --> RDB
    AGENT3 --> REDIS
    AGENT4 --> LOGS
    AGENT5 --> BATCH & RDB
```

---

## 5大機能モジュール仕様

### 1. Domain Operator (ドメインデータ運用)
- **役割**: ドメインエンティティのモデル構造を認識し、CRUDおよびビジネストランザクションクエリを実行します。
- **ポリシー**: ソースコードやDBスキーマを変更せず、定義されたAPIおよびマッパーの範囲内でのみ動作します。

### 2. Schema Architect (スキーマ設計)
- **役割**: 要件を分析して3-File標準DDLを作成し、ERD構造を設計します。
- **ポリシー**: スキーマ変更の影響度を事前分析し、開発者の承認（HITL）後にのみDDLを適用します。

### 3. Security IAM (RBAC & テナント分離)
- **役割**: ロールに応じた画面・APIアクセスの制御およびテナント間のデータ分離を維持します。
- **機能**: 個人情報カラムの動的マスキングおよび行レベルセキュリティ（RLS）SQLの自動注入。

### 4. MCP Dispatcher (標準プロトコル連携)
- **役割**: Model Context Protocol (MCP)標準に準拠し、外部システムに標準ツールをHTTP SSE経由で提供します。
- **ログ収集**: 障害発生時にクラスタ内のエラーログを収集して伝達します。

### 5. Batch Orchestrator (バッチ & ジョブスケジューラー)
- **役割**: 大規模データ集計や定期バッチ処理をQuartzおよびSpring Batchにより分散実行します。
- **耐障害性**: Redis分散ロックの管理と、障害発生時の自動リトライ（Exponential Backoff）を実行します。

---

## 技術スタック

| 区分 | 技術要素 | バージョンおよび詳細 |
| :--- | :--- | :--- |
| **Backend Core** | Java, Spring Boot 3 | Java 17/21, Spring Boot 3.2.x |
| **AI Framework** | LangChain4j | langchain4j-spring-boot-starter v0.35以上 |
| **ORM / Data** | MyBatis-Plus, Spring Data JPA | HikariCP, MySQL 8.0, PostgreSQL |
| **Protocol** | Model Context Protocol (MCP) | HTTP SSE / JSON-RPC 2.0 |
| **Frontend UI** | Vue 3, Vite, TypeScript | Ant Design Vue 4.x, Pinia, Vue Router |
| **Batch / Cache** | Spring Batch, Quartz, Redis | Redis 7.x, Lettuce |
