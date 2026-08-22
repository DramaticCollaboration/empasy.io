---
title: "SyncETA: 自律回帰テストおよび自己修復プラットフォーム"
description: "Webブラウザの操作記録、Playwrightベースの分散並列実行、Vision AIによる視覚的回帰検証、セレクター自己修復（Self-Healing）を提供するエンタープライズテスト自動化ソリューションです。"
head:
  - - meta
    - name: keywords
      content: SyncETA, テスト自動化, 回帰テスト, Playwright, MCP, Model Context Protocol, Visual Regression, Self-Healing, CI/CD, エンタープライズQA
  - - meta
    - property: og:title
      content: "SyncETA: 自律回帰テストおよび自己修復プラットフォーム"
  - - meta
    - property: og:description
      content: "ブラウザ操作記録、Playwright MCP実行、Vision AI視覚検証、自己修復パイプラインをサポートします。"
sort: 10
---

# SyncETA: 自律回帰テストおよび自己修復プラットフォーム

SyncETAは、Webアプリケーションにおけるユーザー操作を記録し、Model Context Protocol（MCP）標準インターフェースを介してテストを自動実行し、視覚的なレイアウト崩れの検知およびセレクターの自己修復（Self-Healing）を支援するエンタープライズQAプラットフォームです。

---

## 4大コア機能領域

```mermaid
graph LR
    A[SyncETA 4大コア領域] --> B[1. ユーザー操作記録・正規化]
    A --> C[2. Playwright MCP分散実行]
    A --> D[3. Vision AI視覚的回帰検証]
    A --> E[4. 自己修復・ガバナンス]

    B -.-> B1[Seleniumベースのイベント/DOM抽出・JSON/YAML変換]
    C -.-> C1[Chrome, Firefox, Edgeマルチブラウザ並列駆動]
    D -.-> D1[レイアウト崩れ・要素重複の視覚検知]
    E -.-> E1[Broken Selector検知・SyncVerse承認連携]
```

1. **ユーザー操作記録およびシナリオ正規化**:
   - クリック、入力、ページ遷移、タブ切替などのブラウザ操作をリアルタイムに収集します。
   - 収集されたイベントはXPath、CSS Selector、DOM階層情報とともに標準JSON/YAML形式に正規化されます。

2. **Playwright MCPベースの分散テスト実行**:
   - Model Context Protocol（MCP）標準ツールを介して、マルチブラウザ（Chromium, Firefox, WebKit）環境でテストを並列実行します。
   - テスト失敗時には、DOMスナップショット、コンソールログ、同期録画ビデオ（MP4）を自動収集します。

3. **Vision AIベースの視覚的回帰検証**:
   - 単純なピクセル比較にとどまらず、ビジョンモデルを活用して要素の重なり、テキスト欠け、レスポンシブ崩れを人間認知レベルで検知します。
   - 動的領域（現在時刻、バナー広告等）のマスキング設定をサポートします。

4. **セレクター自己修復およびガバナンス**:
   - UI変更により既存のセレクターが無効になった場合、画面構造を解析して代替セレクターを算出します。
   - コードを勝手に上書きせず、管理者（SyncVerse/QA）の承認（Human-in-the-Loop）を経てテスト資産を更新します。

---

## ドキュメント目次

### 1. 概要・システムアーキテクチャ
- [システムアーキテクチャ・パイプライン](./architecture) - 4層アーキテクチャおよび通信構造
- [5分クイックスタートガイド](./quickstart) - ローカルコンテナ起動と初回テスト実行

### 2. 実務ユーザーガイド
- [アカウント・ワークスペース管理](./account) - アカウント作成・設定
- [プロジェクト・権限管理（RBAC）](./project) - プロジェクト作成・ロール権限
- [シナリオ記録・エディター](./scenario-create) - 録画、待機条件、検証条件、復旧スクリプト
- [シナリオ実行・スケジューラー](./scenario-run) - クロスブラウザ、並列実行、定期実行
- [コレクション管理](./collection) - 複数シナリオの一括順次/並列実行
- [ストーリーワークフロー](./story) - フローチャート連携シナリオチェーン
- [データセット管理](./dataset) - Excel連携、変数置換（Data-Driven Testing）
- [ダッシュボード・結果分析](./dashboard) - 統計、DOMスナップショット、録画ビデオ再生

### 3. 高度連携・エンタープライズ
- [視覚的回帰検証・自己修復](./self-healing-and-vision) - Vision AI検知およびセレクター修復手順
- [MCPプロトコル・CI/CD連携](./mcp-and-cicd) - HTTP SSE標準Toolスキーマおよびパイプライン連携
- [エンタープライズセキュリティ・オンプレミス](./enterprise-security) - ローカルLLM連携、閉域網対応、データマスキング
- [技術用語集](./glossary) - 主要用語定義
