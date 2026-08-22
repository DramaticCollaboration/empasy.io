---
title: System Architecture & Clean Architecture | SyncCMS
description: Overview of SyncCMS Clean Architecture 4-layer structure with Spring Boot 3, LangChain4j, and Vue 3.
sort: 2
---

# SyncCMS System Architecture

SyncCMS is designed on a **4-Layer Clean Architecture** to guarantee high scalability, security, and developer freedom in high-traffic enterprise environments.

- **Presentation Layer**: Hybrid Headless REST API + Sync-Live-SDK for React, Vue, Next.js, iOS, Android.
- **Security Layer**: Stateless JWT auth, granular multi-tier RBAC, audit logging for financial compliance.
- **Core Layer**: Java Spring Boot 3 standard framework, LangChain4j AI orchestration engine, snapshot rollback engine.
- **Data & Infra Layer**: Open schema DB (Oracle, PostgreSQL, MySQL), PGVector RAG store, on-premise private LLMs (vLLM / Ollama).
