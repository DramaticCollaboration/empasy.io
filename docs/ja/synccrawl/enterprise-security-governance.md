---
title: エンタープライズセキュリティ＆閉域網ガバナンス | SyncCrawl
description: SSRF防御、オンプレミス閉域網(Air-Gapped)対応、Private LLM連携、詳細なRBACおよび監査証跡を解説します。
sort: 5
---

# エンタープライズセキュリティ＆閉域網ガバナンス

企業インフラでWebクローラーを運用する際のセキュリティ要件と規制遵守に対応するためのSyncCrawlのセキュリティアーキテクチャを紹介します。

---

## SSRF(Server-Side Request Forgery) 防御構造

外部URLを巡回するクローラーは、内部IPやクラウドメタデータエンドポイント（`169.254.169.254`）への不正アクセスリスクに配慮する必要があります。

SyncCrawlは、URL検証モジュール**`BrowserNavigateUrlValidator`**により多層の遮断ポリシーを適用します。

```mermaid
graph TD
    REQ[クローリングURLリクエスト入力] --> VAL{BrowserNavigateUrlValidator}
    
    VAL -->|1. Loopback遮断| DROP1[127.0.0.1 / localhost 遮断]
    VAL -->|2. プライベートIP遮断| DROP2[10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 遮断]
    VAL -->|3. クラウドメタデータ遮断| DROP3[169.254.169.254 AWS/Azureメタ遮断]
    VAL -->|4. 非標準スキーム遮断| DROP4[file://, gopher://, ftp:// 遮断]
    VAL -->|5. DNS Rebinding検証| DROP5[解決後の実IPアドレスを再検証]
    
    VAL -->|全セキュリティ検証合格| PERMIT[安全な外部サイトへのアクセス許可]
```

### 主要なSSRF防御ポリシー
- **ループバックおよび社内IPの遮断**: `localhost`、`127.0.0.1`、RFC 1918社内プライベートIPへの接続を制限します。
- **クラウドメタデータ保護**: クラウドインスタンスのメタデータサービス（`169.254.169.254`）へのアクセスを制限します。
- **DNS Rebinding対策**: ドメイン解決直後に取得した実際のリクエスト先IPが社内アドレスでないかを通信確立直前に再検査します。
- **プロトコルのホワイトリスト**: `http://` および `https://` を許可し、非標準スキーム（`file://`, `jar://`等）を排除します。

---

## 閉域網（Air-Gapped）およびオンプレミス環境のサポート

外部インターネットと隔離されたオンプレミス環境でもスタンドアロンで動作可能です。

```mermaid
graph TD
    subgraph "社内オンプレミス閉域網 (Air-Gapped Network)"
        CONSOLE[smart-crawling-console]
        SERVER[smart-crawling-server]
        AGENT[smart-crawling-agent]
        
        subgraph "社内AIインフラ"
            VLLM[社内Private LLM - vLLM / Ollama]
            EMB[社内埋め込みモデル - BGE-M3]
            VDB[(社内PGVector / Milvus)]
        end
        
        CONSOLE --> SERVER
        SERVER --> AGENT
        SERVER --> VLLM & EMB & VDB
    end
    
    OUTSIDE((外部インターネット / DMZプロキシ))
    AGENT -.->|認証済みフォワードプロキシ経由| OUTSIDE
```

- **社内Private LLM連携**: 外部SaaS APIに依存せず、社内サーバーに構築された`vLLM`、`Ollama`等と連携して外部データ流出リスクを低減します。
- **DMZフォワードプロキシ連携**: 外部Web収集が必要な場合、認可されたDMZフォワードプロキシ経由でトラフィックを送信します。
- **Air-Gappedデプロイ対応**: 社内プライベートレジストリ（Harbor, Nexus）からコンテナイメージおよびパッケージを調達可能です。

---

## 多層RBACと監査ログ（Audit Trail）

すべてのクローリングジョブとナレッジ検索は、ロールベースのアクセス制御と監査ログによって管理されます。

### 1. ロールベースアクセス制御 (RBAC)
- **クローリングエンジニア (Admin)**: シナリオ作成、Quartzスケジュール設定、セレクタールール管理
- **業務アナリスト (Analyst)**: データ照会、RAG検索テスト、収集レポート出力
- **セキュリティ管理担当 (Auditor)**: アクセスログ、通信先IP履歴、セキュリティポリシー監視

### 2. 実行監査ログの記録
ジョブ実行ごとに以下の項目がDBに保存されます：
- 実行ジョブID、リクエスト者アカウントおよびクライアントIP
- 対象URLおよびリダイレクト後の最終到達URL
- 所要時間、HTTPステータスコード、レスポンスサイズ
- 収集ファイルおよびHTMLのSHA-256ハッシュ値
- セレクター復旧（Self-Healing）の発生有無および変更前後のDiff
