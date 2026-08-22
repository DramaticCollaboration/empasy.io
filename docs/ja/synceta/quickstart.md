---
title: "5分クイックスタートガイド"
description: "SyncETAローカル環境の立ち上げ、最初のシナリオ記録、Playwrightによる実行および結果確認までを案内します。"
sort: 30
---

# 5分クイックスタートガイド

本ガイドでは、SyncETAを立ち上げ、Webサイトに対するテストシナリオを記録・実行する手順を説明します。

---

## 1. 事前準備

- **OS**: Windows 10/11, macOS, Linux (Ubuntu 20.04+)
- **ランタイム**: Docker Compose または Node.js 20+
- **ブラウザ**: Google Chrome 最新安定版

---

## 2. Docker Composeによる起動

```bash
# リポジトリクローン
git clone https://github.com/DramaticCollaboration/SyncSeries.git
cd SyncSeries/SyncEta

# サービス一括起動
docker compose -f docker-compose.dev.yml up -d
```

ブラウザで `http://localhost:9000` にアクセスしてログインします。

---

## 3. 4ステップ実践

1. **プロジェクト作成**: 「プロジェクト」メニューから新規プロジェクトを作成し、対象URLを設定します。
2. **シナリオ記録**: 「シナリオ」➔「新規シナリオ」でChromeブラウザを開き、検索やクリック操作を行います。
3. **検証条件の追加**: 保存したシナリオの特定ステップを右クリックし、「要素表示検証（DOM Visible）」を追加します。
4. **Playwright実行**: 「シナリオ実行」ボタンをクリックし、ヘッドレスモードで実行してダッシュボードで録画動画を確認します。
