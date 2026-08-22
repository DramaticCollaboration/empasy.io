---
title: REST API＆MCP Toolリファレンス | SyncCrawl
description: SyncCrawlの主要なデータ収集ジョブ制御、即時実行、結果照会およびModel Context Protocol (MCP)仕様を解説します。
sort: 6
---

# SyncCrawl REST API＆MCP Toolリファレンス

SyncCrawlは、外部サービスやAIエージェントとの連携のために**標準RESTful API**と**Model Context Protocol (MCP)**ツールを提供します。

---

## 認証 (Authentication)

すべてのRESTリクエストは、HTTPヘッダーに有効なJWTトークンを含める必要があります。

```http
Authorization: Bearer <YOUR_ACCESS_TOKEN>
X-Sync-Tenant-Id: TENANT_DEFAULT
Content-Type: application/json
```

---

## 1. クローリングジョブ登録 API (Create Crawling Job)

新しい定期または単発のクローリングジョブを登録します。

### `POST /api/v1/crawl/jobs`

#### リクエスト例 (cURL)
```bash
curl -X POST "https://empasy.io/api/v1/crawl/jobs" \
     -H "Authorization: Bearer ${SYNC_TOKEN}" \
     -H "Content-Type: application/json" \
     -d '{
       "jobName": "金融監督ニュース収集",
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

#### レスポンス例 (201 Created)
```json
{
  "code": "SUCCESS",
  "data": {
    "jobId": "JOB_20260823_0042",
    "jobName": "金融監督ニュース収集",
    "status": "SCHEDULED",
    "nextRunAt": "2026-08-24T09:00:00Z",
    "createdAt": "2026-08-23T07:10:00Z"
  }
}
```

---

## 2. ジョブ即時実行トリガー API (Trigger Job Run)

スケジュールに関係なく特定のジョブを即時実行します。

### `POST /api/v1/crawl/jobs/{jobId}/trigger`

#### リクエスト例 (cURL)
```bash
curl -X POST "https://empasy.io/api/v1/crawl/jobs/JOB_20260823_0042/trigger" \
     -H "Authorization: Bearer ${SYNC_TOKEN}"
```

#### レスポンス例 (200 OK)
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

## 3. 収集結果照会 API (Fetch Crawled Data)

完了したジョブの抽出データおよび実行メタデータを取得します。

### `GET /api/v1/crawl/results/{executionId}`

#### リクエスト例 (cURL)
```bash
curl -X GET "https://empasy.io/api/v1/crawl/results/EXEC_20260823_9011" \
     -H "Authorization: Bearer ${SYNC_TOKEN}"
```

#### レスポンス例 (200 OK)
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
        "title": "2026年下半期 電子金融セキュリティガイドライン改定案内",
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

## 4. Model Context Protocol (MCP) ツール仕様

SyncCrawlはAIエージェントが自然言語推論中にツールとして呼び出せる**MCP Tool仕様**を提供します。

### `synccrawl_collect_page`
- **説明**: 指定されたURLを巡回し、整形された本文テキストおよびテーブルデータを取得します。
- **入力パラメータ**:
  ```json
  {
    "url": { "type": "string", "description": "収集対象のWebページURL" },
    "extractSelectors": { "type": "object", "description": "抽出するフィールド別セレクター (任意)" },
    "waitForSelector": { "type": "string", "description": "描画完了待機用セレクター" }
  }
  ```

### `synccrawl_query_knowledge`
- **説明**: SyncCrawlナレッジベースに蓄積されたベクトルデータからセマンティック検索を行い、回答の根拠を取得します。
- **入力パラメータ**:
  ```json
  {
    "query": { "type": "string", "description": "ユーザーの質問テキスト" },
    "category": { "type": "string", "description": "カテゴリフィルター" },
    "topK": { "type": "number", "default": 5, "description": "取得する類似ドキュメント件数" }
  }
  ```
