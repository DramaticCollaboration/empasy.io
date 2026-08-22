---
title: System Architecture & Clean Architecture | SyncCrawl
description: Distributed agent Clean Architecture 4-layer structure with Spring Boot 3.5, LangChain4j, Playwright MCP, and Vector DB.
sort: 2
---

# SyncCrawl System Architecture

SyncCrawl is built on a **4-Layer Clean Architecture** designed for high-concurrency crawling workloads, stable operation, and enterprise RAG pipeline orchestration.

---

## 4-Layer Architecture Diagram

```mermaid
graph TD
    subgraph "1. Presentation & Scenario Layer"
        UI1[Operator Web Console - Vue 3 / Vite / Quasar]
        UI2[Interactive Natural Language Scenario Builder]
        UI3[External REST API Clients]
        UI4[MCP Client - SyncVerse Agent Bridge]
    end

    subgraph "2. Orchestration & Scheduling Layer"
        GW[REST API Controller / Rate Limiter]
        AUTH[RBAC Auth / Token Integrity Validation]
        SCHED[Quartz Distributed Crawling Scheduler]
        LC4J[LangChain4j AI Orchestration Engine]
        QUEUE[Redisson Distributed Work Queue / Handoff]
    end

    subgraph "3. Browser Automation & Execution Layer"
        AGENT1[smart-crawling-agent - Standard Worker]
        AGENT2[smart-crawling-scenario-agent - Scenario Worker]
        MCP_PLAY[Playwright MCP Protocol Bridge]
        POOL[Headless Chromium Browser Pool]
        SSRF[BrowserNavigateUrlValidator - SSRF Security Guard]
    end

    subgraph "4. Data & RAG Infrastructure Layer"
        RDB[(PostgreSQL - Meta / Execution Logs / Quartz)]
        VEC[(Vector DB - PGVector / Milvus / Qdrant Knowledge Store)]
        CACHE[(Redis - Distributed Locks / Sessions / State Cache)]
        STORAGE[(MinIO / S3 - HTML Snapshots / Evidence Captures)]
        LLM[Private LLM / Embedding Models - vLLM / Ollama]
    end

    UI1 & UI2 & UI3 & UI4 --> GW
    GW --> AUTH
    AUTH --> LC4J & SCHED
    LC4J & SCHED --> QUEUE
    QUEUE --> AGENT1 & AGENT2
    AGENT1 & AGENT2 --> MCP_PLAY
    MCP_PLAY --> SSRF
    SSRF --> POOL
    AGENT1 & AGENT2 --> RDB & STORAGE
    LC4J --> VEC & LLM
    QUEUE --> CACHE
```

---

## 4 Core Distributed Container Images

SyncCrawl is packaged into 4 independent container images for zero-downtime deployment and dynamic scaling in Kubernetes clusters:

| Container Image | Tech Stack | Role & Responsibilities |
| :--- | :--- | :--- |
| **`smart-crawling-server`** | Java 21, Spring Boot 3.5, LangChain4j, Flyway | API endpoints, Quartz scheduling, AI planning, RAG vector synchronization |
| **`smart-crawling-agent`** | Java 21, Playwright Java, MCP SDK | Standard web page fetching, DOM parsing, data extraction, HTML snapshots |
| **`smart-crawling-scenario-agent`** | Java 21, Node.js/Playwright MCP, Chromium | Complex multi-step actions (login, multi-form entry, infinite scrolling, SPA) |
| **`smart-crawling-console`** | Vue 3, TypeScript, Vite, Quasar | Dashboard monitoring, natural language scenario builder, RAG QA testing console |

---

## Layer Details

### 1. Presentation & Scenario Layer
- **Conversational Scenario Builder**: Interacts with the backend LangChain4j agent to generate multi-step browser interaction scenarios from natural language prompts.
- **Live Stream Monitoring**: Streams browser rendering screenshots and step logs via WebSocket and SSE.

### 2. Orchestration & Scheduling Layer
- **LangChain4j AI Engine**: Dynamically binds Playwright tools and plans crawling actions based on page structure and user intent.
- **Quartz Distributed Scheduler**: Dispatches recurring crawling batches with cluster-safe locking.
- **Redisson Distributed Queue**: Manages work handoff, concurrency throttling, and worker health failover.

### 3. Browser Automation & Execution Layer
- **Playwright MCP Bridge**: Controls browser instances using the Model Context Protocol.
- **SSRF Security Guard (`BrowserNavigateUrlValidator`)**: Validates requests against loopback hosts (`127.0.0.1`, `localhost`) and private CIDR ranges prior to navigation.
- **Self-Healing Recovery Engine**: Analyzes textual context and DOM hierarchy to discover alternative CSS/XPath selectors dynamically.

### 4. Data & RAG Infrastructure Layer
- **PostgreSQL & Flyway**: Manages configuration, schedules, and execution records with automated migrations.
- **Vector DB & Embeddings**: Stores semantic chunks in PGVector, Milvus, or Qdrant for enterprise RAG retrieval.
- **MinIO / S3 Storage**: Stores raw HTML archives and screenshot evidence for compliance audits.
