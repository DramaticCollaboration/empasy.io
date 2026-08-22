---
title: "Enterprise Security & On-Premises Deployment"
description: "Air-gapped deployment, local LLM/Vision model integration, PII data masking, and RBAC governance for enterprise security compliance."
sort: 1100
---

# Enterprise Security & On-Premises Deployment

SyncETA supports full **air-gapped on-premises deployment** and **data governance controls** to satisfy enterprise compliance requirements in financial and public sectors.

---

## 1. Air-Gapped Network Architecture

SyncETA operates fully within closed internal networks without requiring outbound internet connectivity.

```mermaid
graph TD
    subgraph Air_Gapped_Network [Air-Gapped / Internal VPC]
        A[QA Engineer Workstation] --> B[SyncETA Web & Core Server]
        B --> C[Playwright Runner Containers]
        B --> D[On-Premise PostgreSQL & Redis]
        B --> E[Internal Vision / LLM Server - vLLM]
    end

    style Air_Gapped_Network fill:#f9f9f9,stroke:#333,stroke-width:2px
```

### Local Vision / LLM Integration
- **Open-Weight Models**: Deploy models like Qwen2-VL or LLaVA on internal GPU clusters via vLLM or Ollama.
- **OpenAI-Compatible Endpoints**: Connect simply by setting the base URL (`http://vllm.internal:8000/v1`).

---

## 2. PII Data Masking

- **DOM Masking**: Sensitive form fields (`type="password"`) and regex-matched values are obfuscated to `********` during capture.
- **Visual Blur**: Configured selector areas are blurred prior to saving screenshots and video artifacts.

---

## 3. RBAC & Audit Trails

- **Role-Based Access**: Restricts scenario editing, test execution, and API key management across Admin, Lead, Engineer, and Viewer tiers.
- **Audit Logging**: Retains immutable logs of test executions and self-healing approvals for compliance verification.
