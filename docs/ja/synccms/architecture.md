---
title: システムアーキテクチャ & Clean Architecture | SyncCMS
description: SyncCMSのエンタープライズClean Architecture 4層構成、Spring Boot 3、LangChain4j、Nuxt 3技術スタックおよびデータ処理パイプラインについて解説します。
head:
  - - meta
    - name: keywords
      content: SyncCMS アーキテクチャ, Clean Architecture, Spring Boot 3, LangChain4j, Nuxt 3, Vue 3, PostgreSQL JSONB, Redis, Quartz, オンプレミスAI
  - - meta
    - property: og:title
      content: システムアーキテクチャ & Clean Architecture | SyncCMS
  - - meta
    - property: og:description
      content: エンタープライズClean Architecture 4層構成とSpring Boot 3、LangChain4j、Nuxt 3技術スタック
sort: 2
---

# SyncCMS システムアーキテクチャ

SyncCMSは、大規模トラフィック処理とエンタープライズ環境での拡張性を確保するため、**Clean Architecture 4層構造**で設計されています。

---

## 4層アーキテクチャ概要図

```mermaid
graph TD
    subgraph "1. プレゼンテーション層 (Presentation Layer)"
        UI1["ユーザーWebポータル (Nuxt 3 / Vue 3 SSR)"]
        UI2["管理コンソール (Vue 3 / Vite)"]
        UI3["モバイルアプリ & 外部クライアント (iOS / Android / Next.js)"]
        UI4["Sync-Live-SDK インラインエディタ"]
    end

    subgraph "2. セキュリティ & ゲートウェイ層 (Security Layer)"
        GW["REST API Controller & Rate Limiter"]
        SSO["JWTステートレス認証 & 社内SSO連携"]
        RBAC["多層RBAC詳細権限制御"]
        AUDIT["改ざん防止監査ログエンジン"]
    end

    subgraph "3. コアフレームワーク層 (Core Layer)"
        CTRL["ビジネスコアサービス (Spring Boot 3)"]
        LC4J["LangChain4j AIオーケストレーションエンジン"]
        ENG["スナップショットバージョン管理 & ロールバックエンジン"]
        SCHED["Quartz動的ジョブスケジューラ"]
    end

    subgraph "4. データ & インフラ層 (Data & Infra Layer)"
        RDB[("RDBMS (PostgreSQL JSONB / Oracle / MySQL)")]
        VEC[("Vector DB (PGVector ナレッジベース)")]
        CACHE[("Redis分散キャッシュ & Edge CDN")]
        LLM["社内オンプレミスLLM (vLLM / Ollama)"]
    end

    UI1 & UI2 & UI3 & UI4 --> GW
    GW --> SSO & RBAC & AUDIT
    SSO & RBAC --> CTRL
    CTRL --> LC4J & ENG & SCHED
    CTRL --> RDB
    LC4J --> VEC & LLM
    ENG --> CACHE
```

---

## 各層の技術仕様

### 1. プレゼンテーション層 (Presentation Layer)
- **ユーザーWeb (Nuxt 3)**: SSR(サーバーサイドレンダリング)を活用し、バックエンドAPIから取得したコンポーネントツリーをサーバー側で事前レンダリングすることで、初期読み込み速度の向上と検索エンジン最適化(SEO)を実現します。
- **管理コンソール (Vue 3 / Vite)**: TypeScriptおよびAnt Design Vueを採用し、ドラッグ＆ドロップによるブロックレイアウトビルダーやQuartz監視コンソールを提供します。
- **Sync-Live-SDK**: 実際の運用Web画面上で直接コンテンツ要素を選択し、インライン編集を行える軽量フロントエンドSDKです。

### 2. セキュリティ & ゲートウェイ層 (Security Layer)
- **ステートレスJWT認証**: サーバー間のセッション同期オーバーヘッドを排除し、分散ノード環境での高速認証処理をサポートします。
- **多層RBAC (Role-Based Access Control)**: システム管理者、サイト運用者、コンテンツ作成者、承認権限者など、役割に応じてAPIエンドポイントおよびメニューアクセス権限を厳密に制御します。
- **監査ログ (Audit Logging)**: コンテンツの作成、修正、承認、配信、ロールバックなどの全操作履歴を、ユーザーID、IPアドレス、変更差分(diff)とともに不変ログとして記録します。

### 3. コアフレームワーク層 (Core Layer)
- **Spring Boot 3 & Java 17+**: 標準Javaフレームワークをベースとし、堅牢なトランザクション管理と高い保守性を提供します。
- **LangChain4j AIエンジン**: Java環境において、オンプレミスLLM連携、プロンプトテンプレート制御、RAG(検索拡張生成)検索を統合パイプラインとして実行します。
- **スナップショットロールバックエンジン**: 配信時点のコンテンツ状態をバージョンごとのスナップショットとして保持し、障害発生時に1クリックでの即時復旧を可能にします。
- **Quartzスケジューラ**: 定期バッチジョブや予約配信をアプリケーション停止なしで動的に制御します。

### 4. データ & インフラ層 (Data & Infra Layer)
- **PostgreSQL JSONBストレージ**: 構造化されていないUIブロックデータや動的フォーム定義をJSONB形式で保存し、GINインデックスにより高速な検索性能を担保します。
- **Redis分散キャッシュ**: 頻繁に参照されるヘッドレスコンテンツをキャッシュし、DB負荷の低減とレスポンスの高速化を図ります。
- **社内オンプレミスAIインフラ**: 閉域網環境下でvLLMまたはOllamaを通じてオープンウェイトモデルを駆動します。

---

## 動的ページレンダリングパイプライン

SyncCMSの画面構成は、固定されたテンプレートファイルではなく、データベース内のJSON構造を通じて柔軟に生成およびレンダリングされます。

```mermaid
sequenceDiagram
    autonumber
    participant Client as ユーザーブラウザ
    participant Nuxt as Nuxt 3 (SSRサーバー)
    participant API as Spring Boot 3 API
    participant DB as PostgreSQL (JSONB)

    Client->>Nuxt: ページリクエスト (GET /events/summer)
    Nuxt->>API: コンテンツおよびレイアウト取得API要求
    API->>DB: JSONBレイアウトデータのクエリ
    DB-->>API: UIブロックメタデータの返却
    API-->>Nuxt: 標準JSONペイロード応答
    Nuxt->>Nuxt: Vue動的コンポーネントのSSRコンパイル
    Nuxt-->>Client: 生成されたHTML/CSS/JSストリーム応答
```
