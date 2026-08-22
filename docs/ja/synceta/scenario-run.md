---
title: "シナリオ実行およびスケジューラー"
description: "クロスブラウザ実行、マルチ解像度、バックグラウンド並列実行、およびスケジューラー設定ガイドです。"
sort: 400
---

# シナリオ実行およびスケジューラー

個別シナリオの即時実行から、マルチブラウザ並列実行、定期スケジューラーまで多様な実行オプションを提供します。

---

## 1. 直接実行オプション

シナリオ画面の「実行」ボタンをクリックして実行パラメータを設定します。

![Run Settings](./image/scenario-run/runsetting.png)

- **ブラウザ**: Chromium, Chrome, Microsoft Edge, Firefox, WebKit
- **解像度**: 1920x1080、タブレット、モバイル
- **モード**: 順次実行 または 並列同時実行
- **ヘッドレス**: 画面を表示せずバックグラウンド高速実行
- **録画保存**: 実行全工程をMP4ビデオとして保存

---

## 2. スケジューラー設定

定期的な回帰テスト（夜間ビルド、デプロイ後の検証）を設定します。

![Scheduler Menu](./image/scenario-run/scd.png)
![Schedule Frequency](./image/scenario-run/2222222.png)
![Target Scenarios](./image/scenario-run/dfa.png)
![Schedule Summary](./image/scenario-run/333.png)
