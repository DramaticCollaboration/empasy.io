---
title: "MCP API Protocols & CI/CD Integration"
description: "Model Context Protocol (MCP) tool schemas, HTTP SSE specifications, and CI/CD integration guides for GitHub Actions and Jenkins."
sort: 1000
---

# MCP API Protocols & CI/CD Integration

SyncETA implements the standard **Model Context Protocol (MCP)** for remote orchestration and CI/CD automation.

---

## 1. Protocol Specifications

- **Standard**: Model Context Protocol (MCP) Specification
- **Transport**: HTTP Server-Sent Events (SSE)
- **Auth**: HTTP Bearer JWT (Role-claim authorized)
- **Endpoint**: `POST /mcp/v1/tools/call`

---

## 2. Core Tool Schemas

### `run_playwright` (Execute Scenario)
```json
{
  "name": "run_playwright",
  "description": "Executes a test scenario across specified browser engines concurrently.",
  "parameters": {
    "type": "object",
    "properties": {
      "scenario_id": { "type": "string", "description": "Scenario UUID" },
      "browser_type": { "type": "string", "enum": ["chromium", "firefox", "webkit"], "default": "chromium" },
      "headless": { "type": "boolean", "default": true },
      "viewport": {
        "type": "object",
        "properties": {
          "width": { "type": "integer", "default": 1920 },
          "height": { "type": "integer", "default": 1080 }
        }
      }
    },
    "required": ["scenario_id"]
  }
}
```

### `capture_screenshot` (Capture Rendered DOM)
```json
{
  "name": "capture_screenshot",
  "description": "Captures viewport or full-page screenshot of a target URL.",
  "parameters": {
    "type": "object",
    "properties": {
      "target_url": { "type": "string" },
      "selector": { "type": "string" },
      "full_page": { "type": "boolean", "default": false }
    },
    "required": ["target_url"]
  }
}
```

---

## 3. GitHub Actions Integration Example

```yaml
name: SyncETA E2E Regression Suite

on:
  pull_request:
    branches: [ main, develop ]

jobs:
  run-synceta-tests:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Trigger SyncETA Regression Tests via MCP
        id: synceta
        env:
          SYNCETA_API_KEY: ${{ secrets.SYNCETA_API_KEY }}
          SYNCETA_HOST: "https://synceta-api.company.internal"
        run: |
          RESPONSE=$(curl -s -X POST "$SYNCETA_HOST/mcp/v1/tools/call" \
            -H "Authorization: Bearer $SYNCETA_API_KEY" \
            -H "Content-Type: application/json" \
            -d '{
              "name": "run_playwright",
              "arguments": {
                "scenario_id": "scen_order_checkout_v2",
                "browser_type": "chromium",
                "headless": true
              }
            }')
          echo "Response: $RESPONSE"
```
