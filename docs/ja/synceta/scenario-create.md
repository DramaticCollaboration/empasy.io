---
title: "シナリオ記録およびエディターガイド"
description: "Webブラウザ操作のリアルタイム記録、待機条件、検証条件、復旧スクリプトを設定して安定したテストシナリオを構築する手順を説明します。"
sort: 300
---

# シナリオ記録およびエディターガイド

SyncETAエディターは、ブラウザ操作（クリック、入力、画面遷移）をリアルタイムに記録し、DOM情報（XPath、CSSセレクター、属性）を構造化してテストを作成します。

---

## 1. シナリオの作成手順

1. **新規シナリオの開始**: 「シナリオ」メニューから「新規シナリオ」をクリックします。
   ![New Scenario](image/scenario-create/new_scenario.png)
2. **ブラウザ・解像度の設定**: 対象URL、ブラウザエンジン、解像度を指定します。
   ![Settings](image/scenario-create/select_option.png)
3. **イベント収集設定**: 収集する操作イベントを指定します（標準設定推奨）。
   ![Filter](image/scenario-create/allow_event.png)
4. **操作記録の実行**: 専用ブラウザでWebサイトを操作すると、各ステップが順次記録されます。
   ![Recording](image/scenario-create/start_recording.png)
   ![DOM Info](image/scenario-create/select_dom_info.png)

---

## 2. 待機条件（Wait Conditions）

- **時間待機**: 指定したミリ秒（ms）待機
- **要素表示待機**: 特定のDOM要素が表示されるまで待機
- **値一致待機**: 特定要素のテキストが期待値と一致するまで待機

![Time Wait](image/scenario-create/time_wait.png)
![DOM Wait](image/scenario-create/dom_wait.png)
![Value Wait](image/scenario-create/value_wait.png)

---

## 3. 検証条件（Assertions）

- **要素表示検証**: UI要素の存在を確認
- **要素値検証**: テキストや数値の一致を確認
- **Vision AI画面検証**: 画像認識によるレイアウト崩れ検知

![DOM Valid](image/scenario-create/valid_dom.png)
![Value Valid](image/scenario-create/valid_value.png)
![AI Valid](image/scenario-create/valid_ai.png)

---

## 4. 編集・追加機能

- **続きから記録**: 既存シナリオの特定ステップから追加記録
  ![Edit](image/scenario-create/edit.png)
- **ノート機能**: 各ステップへのメモ入力
  ![Comment](image/scenario-create/comment.png)
- **失敗復旧スクリプト**: エラー発生時のJavaScriptフォールバック
  ![Recovery](image/scenario-create/recover.png)
- **データセット変数**: 入力値のパラメータ変数化（`{{username}}`）
  ![Dataset](image/scenario-create/dataset.png)
