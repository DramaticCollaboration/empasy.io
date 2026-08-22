---
title: "System Architecture & Pipelines"
description: "Detailed breakdown of SyncETA's 4-layer architecture, Selenium recording engine, Playwright MCP runner, Vision AI inspection, and self-healing pipelines."
sort: 20
---

# System Architecture & Pipelines

SyncETA operates across a modular 4-layer architecture spanning event capture, distributed execution, visual verification, and automated self-healing.

---

## 4-Layer Architecture Diagram

```mermaid
graph TD
    subgraph Layer1 [1. Interaction & Recording Layer]
        A1[Web Browser Inspector]
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
    C3 -->|Defect / Anomaly Detected| D1
    D1 --> D2 --> D3
```

---

## Component Specifications

### 1. Interaction & Recording Layer
- **Selenium Event Interceptor**: Intercepts real-time browser user events (`click`, `input/change`, `scroll`, `tab switch`).
- **DOM Normalizer**: Extracts absolute and relative XPath, CSS IDs, class combinations, and hierarchy trees for each event target.
- **Serialization**: Converts raw events into standardized, portable JSON/YAML scenario definitions.

### 2. Orchestration & Protocol Layer
- **NestJS Core Server**: Manages test scenario versioning, project isolation, dataset bindings, and cron execution schedules.
- **Model Context Protocol (MCP) Server**: Provides standardized, stateless tool calling interfaces via HTTP Server-Sent Events (SSE).
- **JWT Authorization**: Verifies role claims and tenant IDs on every incoming request.

### 3. Execution & Validation Layer
- **Playwright MCP Engine**: Spins up containerized Chromium, Firefox, and WebKit browser instances for concurrent test execution.
- **Artifact Collector**: Captures before/after DOM trees, console logs, and synchronized MP4 video recordings for failure triage.
- **Vision AI Engine**: Inspects rendered screenshots to identify visual overlapping, clipped text, and responsive layout breakage.

### 4. Governance & Self-Healing Layer
- **Broken Selector Detection**: Triggers visual localization when DOM selectors fail due to frontend refactoring.
- **Alternative Selector Generator**: Generates replacement DOM paths corresponding to the visually identified target component.
- **Human-in-the-Loop Governance**: Requires explicit QA approval before applying permanent updates to test scenario definitions.
