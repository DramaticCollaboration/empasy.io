---
title: "技術用語集"
description: "SyncETAの主要用語定義：Record、Scenario、Collection、Story、Dataset、MCP、Visual Regression、Self-Healing。"
sort: 1200
---

# 技術用語集

SyncETAプラットフォームで使用される主要用語の定義です。

---

### Record（レコード）
ブラウザ操作およびDOM情報を記録する最小単位。XPath、セレクター、属性情報を保持します。

### Scenario（シナリオ）
一連のレコードで構成されるエンドツーエンドのテストケース単位。待機条件や検証条件を含みます。

### Collection（コレクション）
複数のシナリオを順次または並列に一括実行するためのテストスイート。

### Story（ストーリー）
フローチャート形式でシナリオを結合し、同一ブラウザセッションで連続実行するワークフロー。

### Dataset（データセット）
シナリオの入力値をパラメータ化するためのテーブル形式リポジトリ。

### Playwright MCP
Model Context Protocol（MCP）標準を介してブラウザ自動化ツールを提供する実行エンジン。

### Visual Regression AI（視覚的回帰検証）
画像認識により要素の重なりやレイアウト崩れを人間認知観点で検証する機能。

### Self-Healing（自己修復）
UI変更時に壊れたセレクターを検知し、代替候補を算出して管理者の承認を経て復旧する仕組み。

### Air-Gapped / オンプレミス
外部通信が遮断された閉域網環境下で社内モデル基盤と連携して独立稼働する配備形態。
