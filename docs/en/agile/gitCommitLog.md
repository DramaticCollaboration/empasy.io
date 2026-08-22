---
title: Commit Message
description: A complete guide on how to write efficient Git commit messages. Rules by type such as feat, fix, refactor, how to write commit subjects and bodies, and practical examples.
head:
  - - meta
    - name: keywords
      content: git commit, git commit message, git commit rules, git commit convention, commit message guide, commit convention, git collaboration, git branching strategy, feat, fix, refactor
  - - meta
    - property: og:title
      content: Scrumban
  - - meta
    - property: og:description
      content: git commit, git commit message, git commit rules, git commit convention, commit message guide, commit convention, git collaboration, git branching strategy, feat, fix, refactor
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://empasy.io/agile/activity.html
sort: 5000
---

## Writing a Git Commit Message

## 🔎 Summary (TL;DR)

- **Format**: `<type>(scope): <subject>`
- **Subject**: Imperative mood, **under 50 characters**, no period at the end
- **Body**: _What_ + **Why** it was done (only when necessary, wrap at ~72 characters)
- **Footer**: Link issues `Closes #123`, `BREAKING CHANGE:` for major changes
- **Types (Conventional Commits)**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`
- **Principles**: One commit = one purpose, "The code says how, the body says why"

---

## 📘 Detailed Explanation

## 1) Message Structure

```
<type>(optional scope): <subject>

Body (optional) — Explain what and why, wrap within 72 characters
Use lists/items if necessary

Footer (optional) — Issues/Breaking changes/Co-authors, etc.
```

### Example

```
feat(auth): Add Google social login

Supports login/signup with a Google account based on OAuth 2.0.
Provides an alternative route as the conversion rate for the existing email-based signup is low.

Closes #52
```

---

## 2) Subject Writing Rules

- Start with an **imperative verb**: "Add", "Fix", "Refactor" / If in Korean, use an **action** like "추가", "수정".
- **Under 50 characters**, **No period ( . )**, **No unnecessary modifiers**.
- **Scope** should be narrow and clear: `auth`, `api`, `signup`, `ci`, `deps`, etc.

**Good Examples**

- `fix(api): Add duplicate email check during signup`
- `refactor(search): Improve response time by changing index strategy`
- `docs: Add Docker usage to installation guide`

**Bad Examples**

- `update stuff`
- `fix`
- `final commit`, `temp`, `WIP`

---

## 3) Body — _What + Why_

- Summarize **what** was changed + background/intent/alternatives compared for **why** it was needed.
- Do not over-explain "how", but do leave **important decisions/trade-offs**.
- For bug fixes, the order of **reproduction conditions → cause → solution** is good.
- Auto-wrap at **~72 characters** (considering readability/CLI views).

**Body Example (Bug Fix)**

```
Prevented the issue where the last response was overwritten by the previous result 
when duplicate requests occurred during asynchronous validation, 
using debounce processing and a cancellation token.

Reproduction: State mismatch occurs when typing quickly in the input field on a slow network.
Cause: Previous request cancellation not implemented.
Solution: Cancel previous request with AbortController + apply debounce(300ms).
```

---

## 4) Footer

- **Issue Connection**: `Closes #123` / `Fixes JIRA-456`
- **Breaking Change**: Start with `BREAKING CHANGE:` and specify **what broke** and the **migration method**
- **Co-author**: `Co-authored-by: Name <email>`
- **Reference**: `Refs #789`, `See also: ...`

**Breaking Example**

```
BREAKING CHANGE: Add unique index(email) to member table.
Existing duplicate data needs to be cleaned up with a migration script.
```

---

## 5) Types (Conventional Commits) Quick Guide

- `feat`: **New feature** visible to the user
- `fix`: **Bug fix**
- `docs`: Document/guide changes
- `style`: Formatting/spaces/semicolons, etc., **unrelated to logic**
- `refactor`: Refactoring (same behavior)
- `test`: Add/modify tests
- `chore`: Build/tool/package tasks (little code impact)
- `build`: Build system/dependencies
- `ci`: CI settings/scripts

> Using a **narrow set of essential types** in a team increases consistency. (e.g., `feat|fix|refactor|docs|test|chore`)

---

## 6) Samples by Situation

\*\* Feature Addition \*\*

```
feat(search): Add recommended keywords API

Provides server-side recommended keywords to improve search conversion rates.
Will be exposed only to AB test Group B and evaluated after 2 weeks of collection.

Closes #410
```

\*\* Bug Fix \*\*

```
fix(cart): Fix issue where discount codes were applied twice

Due to a missing condition when calculating discount policy priority,
it was applied twice in certain scenarios.

Fixes #612
```

\*\* Refactoring \*\*

```
refactor(core): Reduce module coupling with dependency injection

Removed singleton global access and replaced it with a DI container.
Introduced interfaces for testability and scalability.
```

\*\* Documentation \*\*

```
docs(readme): Supplement local development environment setup procedure

Added Node version constraints and .env sample file explanations.
```

\*\* Settings/Dependencies \*\*

```
chore(deps): Security update to lodash 4.17.21

Includes patch for GHSA-... vulnerability.
Refs #702
```

---

## 7) Team Operation Tips

- Agree on **language unification** (Korean/English) and **tense unification** (Imperative).
- **One commit = one purpose** (easy to review/revert). Keep code small, commit often.
- Matching the convention **PR title = main commit title** improves changelog quality↑
- **Issue-Branch-Commit Connection Rule**: `feature/JIRA-123-auth-social-login` → Commit `feat(auth): ... (Closes JIRA-123)`

---

## 8) Anti-patterns (To Avoid)

- Overusing `WIP`, **meaningless titles** like "update/fix"
- **Mixing multiple logics in one commit** (Format + Refactor + Feature)
- Attaching **code dumps/long logs** in the commit message
- Losing context **without a body** (especially bug fixes)

---

## 9) Automation (Optional)

- **Commit Template** (Local): `git config --global commit.template ~/.gitmessage.txt`

```txt
# <type>(scope): <subject>
#
# Body: what + why (wrap ~72)
#
# Footer: Closes #, BREAKING CHANGE:, Co-authored-by:
```

- Enforcing rules with **commitlint + husky** (e.g., Node repository)
  `package.json` Example:

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

Setup:

```bash
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```
