---
title: Git Flow
description: チームコラボレーションのためのGit Flow完全ガイド。ブランチ構造、コミットメッセージのルール、リリースおよびホットフィックスの管理方法を段階別にわかりやすく説明します。
head:
  - - meta
    - name: keywords
      content: git flow, git flow ガイド, git ブランチ戦略, feature branch, develop branch, release branch, hotfix branch, git コミットメッセージ, git コラボレーション, git workflow
  - - meta
    - property: og:title
      content: スクラムバン
  - - meta
    - property: og:description
      content: チームコラボレーションのためのGit Flow完全ガイド。ブランチ構造、コミットメッセージのルール、リリースおよびホットフィックスの管理方法を段階別にわかりやすく説明します。
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://doc.empasy.com/agile/activity.html
sort: 4000
---

# 🚀 Git Flow ガイド

## 1. Git Flowとは？

- **コラボレーションのためのGitブランチ戦略**
- 機能開発、バグ修正、デプロイを構造的に管理できる
- メリット:
  - 役割別のブランチで混乱を最小化
  - 安定したデプロイプロセス
  - チーム単位のコラボレーションに最適

---

## 2. ブランチの種類

Git Flowは主に5つの主要ブランチを使用します。

1. **main (master)**

- プロダクション（本番サービス）にデプロイされる安定したコード
- 常にデプロイ可能な状態を維持

2. **develop**

- 次のバージョンの開発のための統合ブランチ
- すべての機能(feature)とバグ修正がmergeされる中心ブランチ

3. **feature/**

- 新機能開発用のブランチ
- `develop`から分岐 → 開発完了後に再び`develop`へmerge
- ネーミングの例:
  - `feature/login-api`
  - `feature/ui-redesign`

4. **release/**

- デプロイ準備用のブランチ
- `develop`から分岐 → QA/テスト後にバグ修正 → `main`と`develop`の両方にmerge
- ネーミングの例:
  - `release/1.2.0`

5. **hotfix/**

- プロダクションでの緊急バグ修正用
- `main`から分岐 → 修正後、`main`と`develop`にmerge
- ネーミングの例:
  - `hotfix/1.2.1`

---

## 3. Git Flow ブランチのフロー

```
main -----------●------------------●------------------->
                ↑                  ↑
                │                  │
       release/1.2.0        hotfix/1.2.1
                ↑
develop ----●---●---●---●---●---●---●----------------->
             ↑   ↑
             │   │
feature/login   feature/payment
```

---

## 4. Git Flow 作業手順

### (1) 新機能の開発

```bash
git checkout develop
git checkout -b feature/機能名
# コード作業後
git add .
git commit -m "feat: 機能の説明"
git checkout develop
git merge --no-ff feature/機能名
git branch -d feature/機能名
```

### (2) デプロイの準備

```bash
git checkout develop
git checkout -b release/1.2.0
# QA / バグ修正
git commit -m "fix: release QA バグ修正"
git checkout main
git merge --no-ff release/1.2.0
git tag -a 1.2.0 -m "Release 1.2.0"
git checkout develop
git merge --no-ff release/1.2.0
git branch -d release/1.2.0
```

### (3) 緊急バグの修正

```bash
git checkout main
git checkout -b hotfix/1.2.1
# バグ修正
git commit -m "fix: 緊急バグ修正"
git checkout main
git merge --no-ff hotfix/1.2.1
git tag -a 1.2.1 -m "Hotfix 1.2.1"
git checkout develop
git merge --no-ff hotfix/1.2.1
git branch -d hotfix/1.2.1
```

---

## 5. コミットメッセージのコンベンション (推奨: Angularスタイル)

- `feat`: 新機能の追加
- `fix`: バグの修正
- `docs`: ドキュメントの変更
- `style`: コードスタイルの変更 (セミコロン、フォーマットなど)
- `refactor`: リファクタリング (機能の変化なし)
- `test`: テストコード関連
- `chore`: ビルド/ツールの設定変更

例:

```
feat(auth): ログインAPIの実装
fix(ui): モバイル画面でのボタン崩れを修正
```

---

## 6. Git Flow コラボレーションのチェックリスト

✅ すべての機能は `feature/` ブランチから始める
✅ `develop` ブランチには直接コミットせず、mergeのみを行う
✅ デプロイは必ず `release/` ブランチを通じて進行する
✅ 緊急修正は `hotfix/` ブランチで直接処理する
✅ merge時には `--no-ff` オプションを使用し、ブランチの履歴を維持する
✅ コミットメッセージはコンベンションに従う
