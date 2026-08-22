---
title: REST API & MCP Tool Reference | SyncCrawl
description: RESTful API endpoints, request/response schemas, and Model Context Protocol (MCP) tool specifications for SyncCrawl.
sort: 6
---

# SyncCrawl REST API & MCP Tool Reference

SyncCrawl exposes **standard RESTful APIs** and **Model Context Protocol (MCP)** tools for integration with external services and AI agents.

---

## Authentication

All REST requests require a valid JWT token in the HTTP Authorization header:

```http
Authorization: Bearer <YOUR_ACCESS_TOKEN>
X-Sync-Tenant-Id: TENANT_DEFAULT
Content-Type: application/json
```

---

## 1. Create Crawling Job

Register a new scheduled or on-demand crawling task.

### `POST /api/v1/crawl/jobs`

#### Request Example (cURL)
```bash
curl -X POST "https://empasy.io/api/v1/crawl/jobs" \
     -H "Authorization: Bearer ${SYNC_TOKEN}" \
     -H "Content-Type: application/json" \
     -d '{
       "jobName": "Financial News Digest",
       "targetUrl": "https://www.fss.or.kr/fss/bbs/B0000188/list.do",
       "cronExpression": "0 0 9 * * ?",
       "selectors": {
         "listRow": ".board-list tbody tr",
         "title": ".subject a",
         "publishedAt": ".date",
         "link": ".subject a::attr(href)"
       },
       "enableRagSync": true,
       "ragConfig": {
         "targetVectorDb": "PGVECTOR",
         "embeddingModel": "BGE-M3",
         "chunkSize": 500,
         "chunkOverlap": 50
       }
     }'
```

#### Response Example (201 Created)
```json
{
  "code": "SUCCESS",
  "data": {
    "jobId": "JOB_20260823_0042",
    "jobName": "Financial News Digest",
    "status": "SCHEDULED",
    "nextRunAt": "2026-08-24T09:00:00Z",
    "createdAt": "2026-08-23T07:10:00Z"
  }
}
```

---

## 2. Trigger Job Execution

Dispatch an execution run to distributed worker nodes.

### `POST /api/v1/crawl/jobs/{jobId}/trigger`

#### Request Example (cURL)
```bash
curl -X POST "https://empasy.io/api/v1/crawl/jobs/JOB_20260823_0042/trigger" \
     -H "Authorization: Bearer ${SYNC_TOKEN}"
```

#### Response Example (200 OK)
```json
{
  "code": "SUCCESS",
  "data": {
    "executionId": "EXEC_20260823_9011",
    "jobId": "JOB_20260823_0042",
    "status": "RUNNING",
    "allocatedAgent": "smart-crawling-agent-worker-02",
    "startedAt": "2026-08-23T07:11:05Z"
  }
}
```

---

## 3. Fetch Crawled Results

Retrieve structured items and execution metadata from a completed run.

### `GET /api/v1/crawl/results/{executionId}`

#### Request Example (cURL)
```bash
curl -X GET "https://empasy.io/api/v1/crawl/results/EXEC_20260823_9011" \
     -H "Authorization: Bearer ${SYNC_TOKEN}"
```

#### Response Example (200 OK)
```json
{
  "code": "SUCCESS",
  "data": {
    "executionId": "EXEC_20260823_9011",
    "totalCount": 10,
    "elapsedTimeMs": 2450,
    "selfHealingOccurred": false,
    "items": [
      {
        "id": "ITEM_001",
        "title": "Electronic Financial Security Guidelines Update 2026",
        "publishedAt": "2026-08-22",
        "detailUrl": "https://www.fss.or.kr/fss/bbs/B0000188/view.do?nttId=14092",
        "vectorSyncStatus": "INDEXED",
        "vectorId": "VEC_FSS_14092"
      }
    ]
  }
}
```

---

## 4. Model Context Protocol (MCP) Specifications

SyncCrawl provides MCP tool bindings for AI agents:

### `synccrawl_collect_page`
- **Description**: Visits the designated URL and extracts cleaned text and table contents.
- **Input Schema**:
  ```json
  {
    "url": { "type": "string", "description": "Target webpage URL to crawl" },
    "extractSelectors": { "type": "object", "description": "Key-value mapping for selectors (optional)" },
    "waitForSelector": { "type": "string", "description": "Selector to wait for rendering completion" }
  }
  ```

### `synccrawl_query_knowledge`
- **Description**: Performs semantic vector search over the SyncCrawl knowledge base to retrieve supporting context.
- **Input Schema**:
  ```json
  {
    "query": { "type": "string", "description": "User question or search query" },
    "category": { "type": "string", "description": "Category taxonomy filter" },
    "topK": { "type": "number", "default": 5, "description": "Number of matching chunks to retrieve" }
  }
  ```
