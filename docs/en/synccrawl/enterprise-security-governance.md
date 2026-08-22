---
title: Enterprise Security & Governance | SyncCrawl
description: SSRF protection, air-gapped on-premise deployment, private LLM integrations, granular RBAC, and audit trails.
sort: 5
---

# Enterprise Security & Governance

Security and compliance are essential when operating web crawlers within enterprise infrastructure. SyncCrawl incorporates multi-layered controls to safeguard against unauthorized network exploration and data exposure.

---

## SSRF (Server-Side Request Forgery) Defense

Web crawlers execute network requests to external targets. Without proper validation, unauthorized requests to private IP spaces or cloud metadata endpoints (`169.254.169.254`) could pose security risks.

SyncCrawl implements the **`BrowserNavigateUrlValidator`** module to enforce URL filtering policies:

```mermaid
graph TD
    REQ[Crawl URL Target Input] --> VAL{BrowserNavigateUrlValidator}
    
    VAL -->|1. Loopback Block| DROP1[Block 127.0.0.1 / localhost]
    VAL -->|2. RFC 1918 Block| DROP2[Block 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16]
    VAL -->|3. Cloud Metadata Block| DROP3[Block 169.254.169.254 AWS/Azure Meta]
    VAL -->|4. Non-Standard Scheme Block| DROP4[Block file://, gopher://, ftp://]
    VAL -->|5. DNS Rebinding Check| DROP5[Inspect resolved IP prior to socket connection]
    
    VAL -->|All Checks Passed| PERMIT[Allow Safe External Web Navigation]
```

### Key SSRF Security Controls
- **Loopback & Private Subnet Filtering**: Prohibits requests to `localhost`, `127.0.0.1`, and RFC 1918 internal subnets.
- **Cloud Metadata Shield**: Restricts access to cloud instance metadata services (`169.254.169.254`).
- **DNS Rebinding Verification**: Resolves domain names and verifies the destination IP address prior to opening socket connections.
- **Protocol Whitelist**: Allows `http://` and `https://` schemes while excluding non-standard protocols (`file://`, `jar://`, `dict://`).

---

## Air-Gapped Network & On-Premises Isolation

SyncCrawl operates within isolated enterprise intranets:

```mermaid
graph TD
    subgraph "On-Premises Isolated Network (Air-Gapped)"
        CONSOLE[smart-crawling-console]
        SERVER[smart-crawling-server]
        AGENT[smart-crawling-agent]
        
        subgraph "Internal AI Infrastructure"
            VLLM[Private LLMs - vLLM / Ollama]
            EMB[Internal Embeddings - BGE-M3]
            VDB[(Internal PGVector / Milvus)]
        end
        
        CONSOLE --> SERVER
        SERVER --> AGENT
        SERVER --> VLLM & EMB & VDB
    end
    
    OUTSIDE((External Web / DMZ Proxy))
    AGENT -.->|Egress via Secure Forward Proxy| OUTSIDE
```

- **Private LLM Integration**: Connects with on-premise `vLLM`, `Ollama`, or `LocalAI` instances to minimize data egress risks.
- **DMZ Forward Proxy Support**: Routes external web requests through designated enterprise forward proxies.
- **Air-Gapped Registry Ready**: Container images and dependencies can be served from private registries (Harbor, Nexus).

---

## Granular RBAC & Audit Trails

Crawling operations and knowledge searches are managed through role-based access control and logged for audit purposes:

### 1. Role-Based Access Control (RBAC)
- **Crawling Engineer (Admin)**: Scenario authoring, Quartz schedule management, selector rule tuning.
- **Business Analyst (Analyst)**: Data exploration, RAG testing, report exporting.
- **Compliance Officer (Auditor)**: Access logs, egress traffic inspection, security policy monitoring.

### 2. Audit Trail Logging
For every crawling execution, SyncCrawl records:
- Execution ID, requesting user identity, and client IP.
- Requested URL and canonical destination URL after redirects.
- Execution duration, HTTP status code, and response size.
- SHA-256 hash of archived HTML snapshots.
- Self-Healing diffs showing selector modifications.
