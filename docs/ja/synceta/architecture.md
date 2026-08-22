---
title: "システムアーキテクチャ・パイプライン"
description: "SyncETAの4層アーキテクチャ、Selenium記録エンジン、Playwright MCP実行エンジン、Vision AI検証および自己修復パイプラインの構造を解説します。"
sort: 20
---

# システムアーキテクチャ・パイプライン

SyncETAは、ブラウザ操作の取得から分散実行、視覚検証、自己修復に至る全工程をモジュール化された4層アーキテクチャで処理します。

---

## 4層アーキテクチャダイアグラム

```mermaid
graph TD
    subgraph Layer1 [1. Interaction & Recording Layer]
        A1[Webブラウザインスペクター]
        A2[Selenium Event Interceptor]
        A3[DOM & XPath Normalizer]
    end

    subgraph Layer2 [2. Orchestration & Protocol Layer]
        B1[SyncETA Core Server - NestJS]
        B2[Scenario Repository - PostgreSQL]
        B3[Model Context Protocol Server - HTTP SSE]
    end

    subgraph Layer3 [3. Execution & Validation Layer]
        C1[Playwright Multi-Browser Engine]
        C2[Chromium / Firefox / WebKit Workers]
        C3[Vision AI Layout Analysis Engine]
    end

    subgraph Layer4 [4. Governance & Self-Healing Layer]
        D1[Broken Selector Detection]
        D2[Alternative Selector Generator]
        D3[SyncVerse / QA Approval Console]
    end

    A1 --> A2 --> A3 --> B1
    B1 <--> B2
    B1 --> B3 --> C1
    C1 --> C2
    C2 --> C3
    C3 -->|欠陥・崩れ検知| D1
    D1 --> D2 --> D3
```

---

## 各層の仕様概要

- **第1層（操作記録）**: Seleniumエンジンによりクリック、入力、スクロールを傍受し、DOM階層情報とともにJSON/YAMLに変換。
- **第2層（オーケストレーション）**: NestJSサーバーおよびHTTP SSEベースのMCPサーバーにより外部CI/CD・AIと無状態通信。
- **第3層（実行・視覚検証）**: Playwrightコンテナによるマルチブラウザ並列実行およびVision AIによる画面レイアウト整合性検証。
- **第4層（ガバナンス・修復）**: 壊れたセレクターを自動検知し、代替パスを生成してQA管理者の承認キューに送信。
