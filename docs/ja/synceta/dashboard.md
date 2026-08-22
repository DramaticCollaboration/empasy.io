---
title: "ダッシュボードおよび結果分析ガイド"
description: "テスト実行統計、同期ビデオ再生（MP4）、DOMツリー分析、コンソールエラー、SSL証明書モニタリングの解説です。"
sort: 800
---

# ダッシュボードおよび結果分析ガイド

SyncETAダッシュボードは、プロジェクト全体のテスト結果と失敗原因を迅速に診断できる統合インターフェースです。

---

## 1. 実行統計

実行タイプ別、期間別に成功率や重要テストの合否トレンドを可視化します。

![Main Dashboard](./image/dashboard/main.png)
![Metrics Summary](./image/dashboard/total.png)

---

## 2. 録画動画の同期再生とエラー診断

ステップ実行と完全に同期したMP4動画再生により、失敗箇所の挙動を視覚的に追跡できます。

![Execution Details](./image/dashboard/row_detail.png)
![Video Auto Play](./image/dashboard/auto_play.png)
![Timeline Sync](./image/dashboard/auto_play2.png)
![Multi-Tab Replay](./image/dashboard/open1111.png)

### エラー位置へのジャンプ
エラー行をクリックすると、該当ステップの録画箇所へ自動シークします。

![Jump to Step](./image/dashboard/move.png)
![Jump in Video](./image/dashboard/move_video.png)

---

## 3. 自動収集診断情報

- **DOMスナップショット**: イベント発生時点のDOMツリー状態を保存
- **コンソールエラー**: JavaScriptランタイムエラーの自動収集
- **SSL証明書チェック**: 対象ドメインのTLS有効期限を監視

![DOM Inspection](./image/dashboard/select_dom.png)
![Console Error](./image/dashboard/console_err.png)
![SSL Expiration](./image/dashboard/ssl.png)
