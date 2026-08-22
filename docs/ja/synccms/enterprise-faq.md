---
title: エンタープライズ運用および技術FAQ | SyncCMS
description: ソースコード開示範囲、ライセンス体系、インフラ推奨構成、PostgreSQL JSONBインデックス最適化、およびサポート窓口について回答します。
head:
  - - meta
    - name: keywords
      content: SyncCMS FAQ, エンタープライズCMS, ソースコード公開, インフラ構成, PostgreSQL GINインデックス, 電子決裁, サポート窓口
  - - meta
    - property: og:title
      content: エンタープライズ運用および技術FAQ | SyncCMS
  - - meta
    - property: og:description
      content: SyncCMSのライセンス、ソースコード提供、インフラ推奨構成およびデータベース性能最適化FAQ
sort: 7
---

# エンタープライズ運用および技術FAQ

SyncCMSの導入および運用をご検討中のエンジニアおよびインフラ担当者向けの技術FAQとシステムサイジング指針です。

---

## よくあるご質問 (FAQ)

### Q1. ビジネスソースコードはどの範囲まで提供されますか？
**A. Spring Boot 3のコアバックエンドソースおよびRDBMS DDLの全編を透過的に提供します。**  
SyncCMSはブラックボックスなバイナリパッケージではありません。コアController、Serviceロジック、Vue 3管理コンソール、Nuxt 3フロントエンドポータルの全ソースコードが開示されるため、お客様の社内開発チームがセキュリティ基準や業務要件に合わせて柔軟に機能拡張し、恒久的なソフトウェア資産として内製化できます。

### Q2. トラフィックやコンテンツ量が増加した場合、追加ライセンス費用は発生しますか？
**A. 追加のライセンス費用は一切発生しません。**  
SaaS型ヘッドレスCMS(Contentful、Sanity等)とは異なり、APIコール数、管理者アカウント数、アクセス量に応じた従量課金はありません。オンプレミスまたはプライベートクラウドへ1回導入いただいた後は、恒久的に運用いただけます。

### Q3. 外部インターネットが完全に遮断された社内閉域網でもAI機能を利用できますか？
**A. オンプレミスインフラを活用して完全に稼働します。**  
社内のGPUサーバー上にvLLMまたはOllamaを構築し、オープンウェイトモデル(Llama-3、EXAONE、Solar等)を配備した上で、LangChain4jを通じて連携します。外部へのデータ流出リスクをゼロにした状態で、AI下書き生成、PII非識別化、RAGナレッジ検索を実行できます。

### Q4. 既存の社内グループウェア電子決裁やERPシステムとどのように連携しますか？
**A. 標準WebフックおよびマルチDBトランザクションにより連携します。**  
コンテンツ配信ワークフローからグループウェアREST APIを呼び出して決裁文書を自動起票し、最終承認Webフックの受信時にDBコミット、ERPプロモーションマスタ同期、キャッシュ破棄が順次実行されます。

---

## 推奨インフラ構成スペック

| 構成要素 | 最小構成 (開発/検証環境) | 推奨構成 (本番環境 1,000+ RPS) |
| :--- | :--- | :--- |
| **APIサーバー (Spring Boot 3)** | 2 Core CPU, 4GB RAM | 4 Core CPU, 8GB RAM (2台以上の負荷分散) |
| **JVMオプション** | `-Xms2g -Xmx2g` | `-Xms4g -Xmx4g -XX:+UseG1GC` |
| **データベース (PostgreSQL)** | 2 Core CPU, 4GB RAM | 8 Core CPU, 16GB RAM, SSDストレージ |
| **キャッシュサーバー (Redis)** | 1 Core CPU, 2GB RAM | 2 Core CPU, 4GB RAM (Sentinel / Cluster) |
| **社内AI推論サーバー (任意)** | CPU-only (量子化モデル) | NVIDIA A10G / L40S GPU (vLLM稼働) |
| **サポート対象RDBMS** | PostgreSQL 14+, Oracle 19c+, MySQL 8.0+ | PostgreSQL 15+ (JSONB & GINインデックス推奨) |

---

## PostgreSQL JSONBインデックス最適化

SyncCMSは、柔軟なUIブロックやフォーム定義を保存するためにPostgreSQLの`JSONB`型を活用します。高速な検索を実現するため、以下のGINインデックスを設定します:

```sql
-- UIブロックフィールド検索用GINインデックスの作成
CREATE INDEX idx_cms_content_fields_gin 
ON tb_cms_content USING gin (fields jsonb_path_ops);

-- 特定のネストされたフィールド検索の最適化
CREATE INDEX idx_cms_content_headline 
ON tb_cms_content ((fields->>'headline'));
```

---

## 技術サポートおよび導入相談

SyncCMSの技術検証、PoC支援、アーキテクチャ診断に関するお問い合わせは以下までご連絡ください。

- **技術および導入お問い合わせ**: `poh@empasy.com`
- **お電話**: `0507-1360-8169`
- **運営会社**: 株式会社エムパシー ソリューション開発チーム | Empasy SyncSeries
