---
title: "データセット管理（Data-Driven Testing）"
description: "ExcelやKey-Valueテーブルを用いて入力値をパラメータ化し、大量のデータパターンでテストを実行するガイドです。"
sort: 700
---

# データセット管理（Data-Driven Testing）

**「データセット」** は、テスト入力値を外部データテーブルと動的に紐付け、多様な値（境界値、特殊文字、多言語）で反復検証する機能です。

---

## 1. 特徴と作成

- **スプレッドシートUI**: 直感的な行・列インターフェース。
- **Excelファイル連携**: [dataset_form.xlsx](./image/dataset/dataset_form.xlsx) による一括登録。
- **動的変数**: `{{username}}` や `{{keyword}}` をシナリオにバインド。

![Dataset Table](./image/dataset/dataset.png)
![Excel Upload](./image/dataset/exel.png)
![AI Sample Fill](./image/dataset_ai.png)

<iframe width="100%" height="400" src="https://www.youtube.com/embed/d2RU8aabXIQ" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
