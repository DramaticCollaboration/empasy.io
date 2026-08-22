---
title: "Visual Regression & Selector Self-Healing"
description: "Vision AI layout analysis, visual defect detection, and automated selector repair pipelines under Human-in-the-Loop governance."
sort: 900
---

# Visual Regression & Selector Self-Healing

Frequent frontend deployments often break existing DOM selectors or introduce visual defects that traditional unit tests miss. SyncETA combines **Vision AI analysis** with **Selector Self-Healing** to keep regression suites stable.

---

## 1. Vision AI Visual Regression

Traditional pixel diffing frequently causes false positives due to font antialiasing or 1-pixel shifts. SyncETA evaluates rendered layouts from a human perception perspective.

```mermaid
graph LR
    A[Execution Screenshot] --> C[Vision AI Comparator]
    B[Baseline Screenshot] --> C
    C --> D{Visual Anomaly?}
    D -- Within Tolerance --> E[Pass]
    D -- Significant Defect --> F[Failure Report Generated]
    F --> F1[1. Element Overlap]
    F --> F2[2. Text Clipping]
    F --> F3[3. Viewport Breakdown]
```

### Visual Inspection Criteria
- **Element Overlap**: Detects popups or banners obstructing key interactive buttons.
- **Text Clipping**: Identifies button labels or descriptions overflowing container boundaries.
- **Ignored Regions**: Masks dynamic components (timestamps, live feeds) from comparisons.

---

## 2. Selector Self-Healing Pipeline

When DOM selectors fail due to framework upgrades or class obfuscation, SyncETA automatically identifies replacement candidates.

```mermaid
sequenceDiagram
    autonumber
    participant Runner as Playwright Runner
    participant Healing as Self-Healing Engine
    participant Vision as Vision AI
    participant Hub as Control Console (SyncVerse / QA)

    Runner->>Runner: Selector Lookup Failed (#btn_submit_2a3f)
    Runner->>Healing: Forward Error, DOM & Screenshot
    Healing->>Vision: Locate Component Visually
    Vision-->>Healing: Return Bounding Box Coordinates
    Healing->>Healing: Extract Fresh DOM Path & Candidates
    Healing->>Hub: Alert Broken Selector + Propose Candidates
    alt Low-Risk Policy
        Hub-->>Runner: Apply Temporary Fallback & Resume
    else Strict Governance Policy
        Hub-->>QA: Request Review (Human-in-the-Loop)
    end
```

---

## 3. Human-in-the-Loop Governance

- **Healing Review Queue**: Lists broken selectors alongside AI-proposed replacements.
- **Side-by-Side Visual Diff**: Compares original and current component screenshots for 1-click approval or rejection.
- **Audit Logs**: Records approval timestamps and user identity to ensure test suite integrity.
