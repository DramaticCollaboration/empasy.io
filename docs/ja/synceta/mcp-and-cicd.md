---
title: "MCP APIプロトコルおよびCI/CD連携規格"
description: "SyncETAが提供するModel Context Protocol (MCP) ツール仕様、HTTP SSE通信規格、およびGitHub Actions、Jenkins連携方法を解説します。"
sort: 1000
---

# MCP APIプロトコルおよびCI/CD連携規格

SyncETAは **Model Context Protocol (MCP)** 標準に準拠し、外部オーケストレーター（SyncVerse）やCI/CDパイプラインとのリモート連携をサポートします。

---

## 1. プロトコル仕様

- **標準規格**: Model Context Protocol (MCP)
- **トランスポート**: HTTP Server-Sent Events (SSE)
- **認証**: HTTP Bearer JWT（ロール権限検証）
- **エンドポイント**: `POST /mcp/v1/tools/call`

---

## 2. 主要MCPツール仕様

- `run_playwright`: 指定シナリオをブラウザエンジンで並列実行
- `capture_screenshot`: 対象DOM要素またはフルページのスクリーンショット取得
- `get_test_results`: 実行ログ、DOMスナップショット、録画動画URLの取得

---

## 3. GitHub Actions連携例

```yaml
name: SyncETA E2E Regression Suite

on:
  pull_request:
    branches: [ main, develop ]

jobs:
  run-synceta-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger SyncETA Regression Tests via MCP
        env:
          SYNCETA_API_KEY: ${{ secrets.SYNCETA_API_KEY }}
          SYNCETA_HOST: "https://synceta-api.company.internal"
        run: |
          curl -s -X POST "$SYNCETA_HOST/mcp/v1/tools/call" \
            -H "Authorization: Bearer $SYNCETA_API_KEY" \
            -H "Content-Type: application/json" \
            -d '{
              "name": "run_playwright",
              "arguments": { "scenario_id": "scen_order_checkout_v2", "headless": true }
            }'
```
