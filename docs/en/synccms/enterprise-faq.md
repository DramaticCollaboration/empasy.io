---
title: Enterprise Operations & Technical FAQ | SyncCMS
description: Answers to common enterprise questions regarding source code delivery, licensing, infrastructure sizing, PostgreSQL JSONB tuning, and support channels.
head:
  - - meta
    - name: keywords
      content: SyncCMS FAQ, Enterprise CMS, Source Code Delivery, Infrastructure Sizing, PostgreSQL GIN Index, E-Approval, Support
  - - meta
    - property: og:title
      content: Enterprise Operations & Technical FAQ | SyncCMS
  - - meta
    - property: og:description
      content: Technical FAQ covering SyncCMS licensing, source delivery, infrastructure requirements, and database tuning.
sort: 7
---

# Enterprise Operations & Technical FAQ

Technical Q&A and system sizing guidelines for engineering teams evaluating and managing SyncCMS deployments.

---

## Frequently Asked Questions (FAQ)

### Q1. What is the scope of delivered source code?
**A. Spring Boot 3 core backend applications and complete RDBMS DDL scripts are fully delivered.**  
SyncCMS is not a black-box binary package. Core controller and service logic, Vue 3 admin console source, and Nuxt 3 frontend portal source are provided transparently, empowering client engineering teams to customize business logic, comply with corporate security standards, and permanently internalize the system as a software asset.

### Q2. Are there recurring fees as traffic or content volume increases?
**A. No additional recurring license fees are incurred.**  
Unlike SaaS-based headless CMS providers (e.g. Contentful, Sanity), SyncCMS does not charge usage-based fees tied to API calls, user seats, or traffic volume. Once deployed on-premise or in private clouds, the system operates as a permanent enterprise asset.

### Q3. Does the AI pipeline operate in completely air-gapped networks?
**A. Yes, on-premise AI operates entirely within isolated networks.**  
By pairing local GPU servers running vLLM or Ollama with open-weight models (Llama-3, EXAONE, Solar), LangChain4j executes prompt generation, PII de-identification, and RAG knowledge retrieval without establishing external internet connections.

### Q4. How does SyncCMS integrate with existing groupware e-approval and ERP systems?
**A. Integration is established via standard webhooks and ACID multi-database transactions.**  
Content publication workflows generate approval drafts via groupware REST APIs. Upon receiving signed approval callbacks, the backend orchestrates database commits, ERP promotion master updates, and cache invalidation.

---

## Recommended Infrastructure Specifications

| Component | Minimum (Dev / QA) | Recommended (Production 1,000+ RPS) |
| :--- | :--- | :--- |
| **API Server (Spring Boot 3)** | 2 Core CPU, 4GB RAM | 4 Core CPU, 8GB RAM (2+ nodes load-balanced) |
| **JVM Options** | `-Xms2g -Xmx2g` | `-Xms4g -Xmx4g -XX:+UseG1GC` |
| **Database (PostgreSQL)** | 2 Core CPU, 4GB RAM | 8 Core CPU, 16GB RAM, SSD Storage |
| **Cache Server (Redis)** | 1 Core CPU, 2GB RAM | 2 Core CPU, 4GB RAM (Sentinel / Cluster) |
| **On-Premise AI Server (Optional)** | CPU-only (Quantized models) | NVIDIA A10G / L40S GPU (vLLM engine) |
| **Supported Databases** | PostgreSQL 14+, Oracle 19c+, MySQL 8.0+ | PostgreSQL 15+ (JSONB with GIN indexing) |

---

## PostgreSQL JSONB Indexing Optimization

SyncCMS leverages PostgreSQL `JSONB` data types to persist dynamic UI component trees and schema configurations. Use GIN indexing for fast querying:

```sql
-- Create GIN index for UI block fields
CREATE INDEX idx_cms_content_fields_gin 
ON tb_cms_content USING gin (fields jsonb_path_ops);

-- Optimize queries for specific nested fields
CREATE INDEX idx_cms_content_headline 
ON tb_cms_content ((fields->>'headline'));
```

---

## Technical Support & Consultation

For enterprise PoC inquiries, architecture reviews, and consulting:

- **Technical Inquiries**: `poh@empasy.com`
- **Phone**: `0507-1360-8169`
- **Company**: Empasy Inc. Solution Development Team | Empasy SyncSeries
