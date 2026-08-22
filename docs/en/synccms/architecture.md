---
title: System Architecture & Clean Architecture | SyncCMS
description: Explains SyncCMS enterprise Clean Architecture 4-layer design, Spring Boot 3, LangChain4j, Nuxt 3 tech stack, and dynamic data processing pipeline.
head:
  - - meta
    - name: keywords
      content: SyncCMS Architecture, Clean Architecture, Spring Boot 3, LangChain4j, Nuxt 3, Vue 3, PostgreSQL JSONB, Redis, Quartz, On-Premise AI
  - - meta
    - property: og:title
      content: System Architecture & Clean Architecture | SyncCMS
  - - meta
    - property: og:description
      content: Enterprise Clean Architecture 4-layer design with Spring Boot 3, LangChain4j, and Nuxt 3.
sort: 2
---

# SyncCMS System Architecture

SyncCMS is engineered with a **Clean Architecture 4-layer structure** to ensure horizontal scalability, high availability, and operational stability under heavy traffic loads.

---

## 4-Layer Architecture Diagram

```mermaid
graph TD
    subgraph "1. Presentation Layer"
        UI1["User Web Portal (Nuxt 3 / Vue 3 SSR)"]
        UI2["Admin Console (Vue 3 / Vite)"]
        UI3["Mobile Apps & External Clients (iOS / Android / Next.js)"]
        UI4["Sync-Live-SDK Inline Editor"]
    end

    subgraph "2. Security & Gateway Layer"
        GW["REST API Controller & Rate Limiter"]
        SSO["Stateless JWT Auth & Enterprise SSO"]
        RBAC["Multi-Tier RBAC Access Control"]
        AUDIT["Immutable Audit Log Engine"]
    end

    subgraph "3. Core Framework Layer"
        CTRL["Business Core Services (Spring Boot 3)"]
        LC4J["LangChain4j AI Orchestration Engine"]
        ENG["Snapshot Versioning & Rollback Engine"]
        SCHED["Quartz Dynamic Job Scheduler"]
    end

    subgraph "4. Data & Infrastructure Layer"
        RDB[("RDBMS (PostgreSQL JSONB / Oracle / MySQL)")]
        VEC[("Vector DB (PGVector Knowledge Base)")]
        CACHE[("Redis Distributed Cache & Edge CDN")]
        LLM["On-Premise Private LLM (vLLM / Ollama)"]
    end

    UI1 & UI2 & UI3 & UI4 --> GW
    GW --> SSO & RBAC & AUDIT
    SSO & RBAC --> CTRL
    CTRL --> LC4J & ENG & SCHED
    CTRL --> RDB
    LC4J --> VEC & LLM
    ENG --> CACHE
```

---

## Detailed Layer Specifications

### 1. Presentation Layer
- **User Web (Nuxt 3)**: Implements Server-Side Rendering (SSR) to pre-render dynamic component hierarchies fetched from backend APIs, optimizing Initial Page Load and Search Engine Optimization (SEO).
- **Admin Console (Vue 3 / Vite)**: Provides a modular management interface with Ant Design Vue, featuring drag-and-drop block builders, menu management, and Quartz scheduler monitoring.
- **Sync-Live-SDK**: A lightweight JavaScript library enabling direct DOM element selection and inline editing on production frontend applications.

### 2. Security & Gateway Layer
- **Stateless JWT Authentication**: Delivers sub-millisecond authentication verification without session replication overhead across cluster nodes.
- **Multi-Tier RBAC**: Enforces granular role-based permissions across system administrators, site managers, content editors, and compliance approvers.
- **Audit Logging**: Persists all content creation, modification, approval, deployment, and rollback events with user identities, client IPs, and state diffs.

### 3. Core Framework Layer
- **Spring Boot 3 & Java 17+**: Provides robust transaction management, modular extension points, and enterprise-grade reliability.
- **LangChain4j AI Engine**: Standardizes private LLM communication, prompt template lifecycle management, and RAG knowledge base retrieval in pure Java.
- **Snapshot Rollback Engine**: Manages immutable version snapshots to execute 1-click zero-downtime rollback in incident response scenarios.
- **Quartz Scheduler**: Manages cron-based asynchronous batch jobs and scheduled publishing without restarting applications.

### 4. Data & Infrastructure Layer
- **PostgreSQL JSONB Storage**: Stores unstructured UI block trees and flexible form definitions in binary JSON with GIN indexing for fast querying.
- **Redis Distributed Cache**: Offloads high-frequency headless content requests to sub-millisecond memory stores.
- **On-Premise AI Infrastructure**: Executes open-weight LLMs via vLLM or Ollama on private GPU instances within air-gapped corporate networks.

---

## Dynamic Page Rendering Pipeline

SyncCMS decouples UI layouts from static template files by persisting dynamic component schemas in database records:

```mermaid
sequenceDiagram
    autonumber
    participant Client as User Browser
    participant Nuxt as Nuxt 3 (SSR Server)
    participant API as Spring Boot 3 API
    participant DB as PostgreSQL (JSONB)

    Client->>Nuxt: Page Request (GET /events/summer)
    Nuxt->>API: Fetch Content & Layout Schema
    API->>DB: Query JSONB Layout Records
    DB-->>API: Return UI Block Metadata
    API-->>Nuxt: Standard JSON Payload Response
    Nuxt->>Nuxt: Server-Side Dynamic Component Compilation
    Nuxt-->>Client: Streamed HTML / CSS / Hydration Bundle
```
