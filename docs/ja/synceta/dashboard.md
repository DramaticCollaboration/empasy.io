---
title: ダッシュボード
description: AIテスト自動化の方法と最新ツールを比較してみてください。機械学習ベースの自動化テストでQA効率を高める方法について説明します。
head:
  - - meta
    - name: keywords
      content: テスト自動化, テスティング生成型AI, Playwright, Selenium, リアルタイム品質フィードバック, 無停止テスト, AIベーステスト自動化, 継続的テスト(Continuous Testing), QAOps, TestOps, コードレス(Codeless), ローコード(Low-Code), 自己修復テスト(Self-healing), AIテスト自動化, コードレス自動化, QA自動化, ソフトウェアテスト, テストシナリオ生成, コードレステスト, 自然言語テスト, テスト自動化ツール, テスト自動化プラットフォーム, テスト効率化, Playwright, Selenium, QAOps, TestOps, シフトレフト(Shift-Left)テスト, シフトライト(Shift-Right)テスト
  - - meta
    - property: og:title
      content: AIテスト自動化 | SyncETA
  - - meta
    - property: og:description
      content: AIベースのテスト自動化でQA時間を80%削減します。コードなしのテスト作成、自然言語によるシナリオ作成、多様なプラットフォームのサポートにより、QAの新しい基準を提示します。
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://doc.empasy.com/synceta/
sort: 8
---

# ダッシュボード

## テスト結果

#### 実行タイプ / 期間を設定して結果を照会できます。

![image](./image/dashboard/main.png)

#### 照会期間内のテスト結果に対する統計を表示します。

::: info

1. シナリオの総実行回数
2. レコードの総実行回数
3. 重要度が「高」に設定されたレコードの実行成功率 (重要度設定は下記)
4. 検証レコードの検証成功率
   :::

![image](./image/dashboard/total.png)

#### シナリオ実行結果の詳細履歴を確認する方法

![image](./image/dashboard/row_detail.png)

#### 自動再生

![image](./image/dashboard/auto_play.png)

#### 映像の時点のレコードにフォーカスを当て、実行結果を簡単に確認できます。

![image](./image/dashboard/auto_play2.png)

#### 複数のタブの映像を一度に確認できます。

![image](./image/dashboard/open1111.png)

#### クリックすると、該当するエラーレコードにスクロール移動します。

![image](./image/dashboard/move.png)

#### レコード実行時点の映像に移動します。

![image](./image/dashboard/move_video.png)


#### テスト結果にコメントを書き込むことができます。

::: info

- @ を通じてチームメンバーをタグ付け可能
  :::

![image](./image/dashboard/comment.png)

#### タグ付けされたコメントを確認できます。

![image](./image/dashboard/mention.png)

## 収集情報

1. **独自情報の収集**  
    SyncETAは、録画時点で収集した情報を基に、回帰テスト時に関連情報を自動的に収集して提供します。
   ::: info
   ユーザーの行動に基づいてイベントが発生したdomの様々な情報を収集します。
   :::
   ![image](./image/dashboard/select_dom.png)
2. **ConsoleErrorの収集**  
    テスト対象ページで発生するConsoleErrorを自動的に検知および収集して確認できます。
   ::: info
   テスト時に発生したコンソールエラーを収集して提供します。
   :::
   ![image](./image/dashboard/console_err.png)

3. **HTML5 構文チェック (機能追加中)**  
   回帰テスト時にW3CベースのHTML5構文チェックを自動的に進行し、その結果を収集してユーザーエクスペリエンスの改善に活用できます。

4. **SSL証明書のチェック**  
    テストが進行されたページのSSL証明書の有効期限を自動的に確認および収集し、有効期限が迫っている場合はメーリングサービスを通じて案内します。
   ::: info
   テストを進行したサービスのSSL証明書の有効期限を収集して提供します。

- SSL証明書自動更新機能追加中
  :::
  ![image](./image/dashboard/ssl.png)
