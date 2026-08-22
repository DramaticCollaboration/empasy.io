---
title: "コレクション管理および一括実行"
description: "複数のテストシナリオをグループ化し、順次または並列で一括実行するコレクション機能の解説です。"
sort: 500
---

# コレクション管理および一括実行

**「コレクション（Collection）」** は、関連するテストシナリオをまとめてテストスイートとして順次または並列に一括実行する機能です。

---

## 1. 主な用途

- **E2E一括実行**: ログイン ➔ 商品検索 ➔ 決済 などの個別シナリオを連続実行。
- **クロスブラウザ並列検証**: 同一シナリオ群を複数ブラウザで同時に並列検証。

---

## 2. コレクション作成

1. 「コレクション」メニュー ➔ 「新規コレクション」をクリック。
   ![New Collection](./image/collection/newcollection.png)
2. 実行するシナリオを選択し、順序をドラッグして設定します。
   ![Select Scenarios](./image/collection/collection2.png)

<iframe width="100%" height="400" src="https://www.youtube.com/embed/dsb0XpGy7A0" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
