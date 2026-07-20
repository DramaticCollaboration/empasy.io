---
title: コミットメッセージ
description: 効率的なGitコミットメッセージの作成方法完全ガイド。feat、fix、refactorなどタイプ別のルール、コミットの件名・本文の作成方法と実践例まで。
head:
  - - meta
    - name: keywords
      content: git commit, git commit メッセージ, git コミット ルール, git コミット コンベンション, commit message guide, commit convention, git コラボレーション, git ブランチ戦略, feat, fix, refactor
  - - meta
    - property: og:title
      content: スクラムバン
  - - meta
    - property: og:description
      content: git commit, git commit メッセージ, git コミット ルール, git コミット コンベンション, commit message guide, commit convention, git コラボレーション, git ブランチ戦略, feat, fix, refactor
  - - meta
    - property: og:image
      content: https://doc.empasy.com/images/favicon.png
  - - meta
    - property: og:url
      content: https://doc.empasy.com/agile/activity.html
sort: 5000
---

## git コミットメッセージの作成

## 🔎 要約 (TL;DR)

- **形式**: `<type>(scope): <subject>`
- **件名(Subject)**: 命令形、**50文字以内**、末尾にピリオドなし
- **本文(Body)**: _何を_ + **なぜ** したのか (必要な場合のみ、1行約72文字)
- **フッター(Footer)**: イシューのリンク `Closes #123`、大きな変更は `BREAKING CHANGE:`
- **タイプ(Conventional Commits)**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`
- **原則**: 1つのコミット = 1つの目的、「解決策はコードが語り、動機は本文が語る」

---

## 📘 詳細な説明

## 1) メッセージ構造

```
<type>(オプション:scope): <subject>

本文(オプション) — 何を、なぜを説明、72文字以内で改行
必要であればリスト/項目化

フッター(オプション) — イシュー/破壊的変更/共同作業者など
```

### 例

```
feat(auth): Googleソーシャルログインの追加

OAuth 2.0ベースでGoogleアカウントによるログイン/登録をサポートします。
既存のメールベースの登録のコンバージョン率が低いため、代替ルートを提供します。

Closes #52
```

---

## 2) 件名(Subject)作成ルール

- **命令形の動詞**で開始: 「Add」、「Fix」、「Refactor」 / 日本語なら「追加」、「修正」のように**行為**がわかるように。
- **50文字以内**、**ピリオド( . )禁止**、**不要な修飾語禁止**。
- **Scope**は狭く明確に: `auth`, `api`, `signup`, `ci`, `deps` など。

**良い例**

- `fix(api): 会員登録の重複メール検査の追加`
- `refactor(search): インデックス戦略の変更による応答時間の改善`
- `docs: インストールガイドにDockerの使用法を追加`

**悪い例**

- `update stuff`
- `fix`
- `final commit`, `temp`, `WIP`

---

## 3) 本文(Body) — _何を + なぜ_

- **何を** 変更したかの要約 + **なぜ** 必要なのかの背景/意図/代替案との比較。
- 「どのように」は過度に説明せず、**重要な意思決定/トレードオフ**は残す。
- バグ修正であれば **再現条件 → 原因 → 解決方法** の順序が良い。
- 行幅は **約72文字** で自動改行(可読性/CLIビューを考慮)。

**本文の例(バグ修正)**

```
非同期検証中に重複リクエストが発生すると、最後の応答が前の結果で上書きされる問題を
debounce処理とキャンセルトークンを通じて防止しました。

再現: 遅いネットワークで入力欄に素早くタイピングすると状態の不一致が発生。
原因: 前のリクエストのキャンセルが未実装。
解決: AbortControllerで前のリクエストをキャンセル + debounce(300ms)適用。
```

---

## 4) フッター(Footer)

- **イシューのリンク**: `Closes #123` / `Fixes JIRA-456`
- **破壊的変更**: `BREAKING CHANGE:` で開始し、**何が壊れたか**と**移行方法**を明示
- **共同作業者**: `Co-authored-by: 名前 <email>`
- **参照**: `Refs #789`, `See also: ...`

**破壊的変更の例**

```
BREAKING CHANGE: 会員テーブルに unique index(email) 追加。
既存の重複データは移行スクリプトで整理が必要。
```

---

## 5) タイプ(Conventional Commits) クイックガイド

- `feat`: ユーザーに見える**新機能**
- `fix`: **バグ修正**
- `docs`: ドキュメント/ガイドの変更
- `style`: フォーマット/空白/セミコロンなど **ロジックに無関係**
- `refactor`: リファクタリング(動作は同じ)
- `test`: テストの追加/修正
- `chore`: ビルド/ツール/パッケージ作業(コードへの影響が少ない)
- `build`: ビルドシステム/依存関係
- `ci`: CI設定/スクリプト

> チームで**必須タイプだけを絞って**使うと一貫性が上がります。 (例: `feat|fix|refactor|docs|test|chore`)

---

## 6) 状況別サンプル

\*\* 機能追加 \*\*

```
feat(search): 推奨キーワードAPIの追加

検索コンバージョン率向上のため、サーバー側の推奨キーワードを提供します。
ABテストグループBにのみ露出し、2週間収集後に評価予定。

Closes #410
```

\*\* バグ修正 \*\*

```
fix(cart): 割引コードが重複適用されていた問題の修正

割引ポリシーの優先順位計算時に欠落していた条件により、
特定のシナリオで2回適用されていました。

Fixes #612
```

\*\* リファクタリング \*\*

```
refactor(core): 依存性の注入によりモジュール結合度を低下

シングルトンのグローバルアクセスを削除し、DIコンテナに置き換えました。
テスト可能性と拡張性のためにインターフェースを導入しました。
```

\*\* ドキュメント \*\*

```
docs(readme): ローカル開発環境のセットアップ手順の補足

Nodeバージョンの制約と.envサンプルファイルの説明を追加しました。
```

\*\* 設定/依存関係 \*\*

```
chore(deps): lodash 4.17.21へのセキュリティアップデート

GHSA-... 脆弱性パッチを含む。
Refs #702
```

---

## 7) チーム運用のヒント

- **言語の統一**(日本語/英語)、**時制の統一**(命令形)の合意。
- **1つのコミット = 1つの目的**(レビュー/リバートが容易)。コードは小さく、コミットは頻繁に。
- **PRのタイトル = 代表コミットのタイトル**の慣例に合わせるとchangelogの品質↑
- **イシュー-ブランチ-コミットの連結ルール**: `feature/JIRA-123-auth-social-login` → コミット `feat(auth): ... (Closes JIRA-123)`

---

## 8) アンチパターン(避けるべきこと)

- `WIP`の乱発、「update/fix」のような**意味のないタイトル**
- **複数のロジックを1つのコミット**に混ぜる(フォーマット+リファクタリング+機能)
- コミットメッセージに**コードダンプ/長いログ**を貼り付ける
- **本文なし**で文脈を喪失(特にバグ修正)

---

## 9) 自動化(オプション)

- **Commit Template**(ローカル): `git config --global commit.template ~/.gitmessage.txt`

```txt
# <type>(scope): <subject>
#
# Body: what + why (wrap ~72)
#
# Footer: Closes #, BREAKING CHANGE:, Co-authored-by:
```

- **commitlint + husky**でルールを強制(例: Nodeリポジトリ)
  `package.json` の例:

```json
{
  "devDependencies": {
    "@commitlint/cli": "^19",
    "@commitlint/config-conventional": "^19",
    "husky": "^9"
  },
  "commitlint": { "extends": ["@commitlint/config-conventional"] },
  "scripts": {
    "prepare": "husky install"
  }
}
```

セットアップ:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```
