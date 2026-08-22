---
title: ヘッドレスREST APIリファレンス | SyncCMS
description: SyncCMSのヘッドレスREST APIエンドポイント仕様、リクエスト/レスポンスJSONスキーマ、HTTPステータスコードおよびRFC 7807エラー仕様を解説します。
head:
  - - meta
    - name: keywords
      content: REST API, API Reference, ヘッドレスAPI, JSONスキーマ, cURL, キャッシュ破棄API, RFC 7807, Spring Boot 3
  - - meta
    - property: og:title
      content: ヘッドレスREST APIリファレンス | SyncCMS
  - - meta
    - property: og:description
      content: SyncCMSヘッドレスREST APIエンドポイント仕様および標準JSONレスポンススキーマ
sort: 6
---

# ヘッドレスREST APIリファレンス

SyncCMSは、すべてのコンテンツ、レイアウト、およびフォームデータを標準的なRESTful API形式で提供します。

---

## 共通リクエストヘッダー (Headers)

APIリクエスト時には以下のHTTPヘッダーを指定してください:

| ヘッダー名 | 必須 | 説明 | 例 |
| :--- | :--- | :--- | :--- |
| `X-Sync-Site-Key` | 必須 | 対象サイト/チャネルの識別キー | `SITE_MAIN_PORTAL` |
| `Authorization` | 任意 | 保護された管理/配信API呼び出し時のJWTトークン | `Bearer eyJhbGciOi...` |
| `Accept` | 必須 | レスポンスのメディアタイプ | `application/json` |

---

## 1. コンテンツ取得 API

### `GET /api/v1/contents/{contentSlug}`

指定されたチャネルに公開(Published)された最新のコンテンツデータおよびSEOメタデータを取得します。

#### リクエスト例 (cURL)
```bash
curl -X GET "https://empasy.io/api/v1/contents/2026-fall-membership" \
     -H "X-Sync-Site-Key: SITE_MAIN_PORTAL" \
     -H "Accept: application/json"
```

#### レスポンス例 (200 OK)
```json
{
  "success": true,
  "data": {
    "contentId": "CNT_20260901_001",
    "slug": "2026-fall-membership",
    "title": "2026年 秋の新規会員特典のご案内",
    "status": "PUBLISHED",
    "publishedAt": "2026-09-01T09:00:00Z",
    "version": 3,
    "fields": {
      "headline": "2026年 秋の会員フェスティバル",
      "description": "新規登録でウェルカムクーポンとポイント特典を即時進呈します。",
      "bannerUrl": "https://empasy.io/images/promo2026.webp",
      "ctaText": "特典を確認する",
      "ctaLink": "/events/welcome-pack"
    },
    "seo": {
      "metaTitle": "2026年 会員特典 | Empasy",
      "metaDescription": "新規会員特典とキャンペーン詳細をご確認ください。",
      "ogImage": "https://empasy.io/images/og-fall.png"
    }
  }
}
```

---

## 2. 動的フォーム送信 API

### `POST /api/v1/forms/{formKey}/submit`

Web/アプリフロントエンドから送信されたユーザー入力フォームデータを保存・検証します。

#### リクエスト例 (cURL)
```bash
curl -X POST "https://empasy.io/api/v1/forms/contact-us/submit" \
     -H "X-Sync-Site-Key: SITE_MAIN_PORTAL" \
     -H "Content-Type: application/json" \
     -d '{
       "applicantName": "山田太郎",
       "email": "user@example.com",
       "company": "株式会社エムパシー",
       "inquiryType": "ARCHITECTURE_CONSULTING",
       "message": "SyncCMSオンプレミス導入に関する技術検証を希望します。"
     }'
```

#### レスポンス例 (201 Created)
```json
{
  "success": true,
  "data": {
    "submissionId": "SUB_20260901_9812",
    "receivedAt": "2026-09-01T10:15:30Z"
  }
}
```

---

## 3. グローバルキャッシュ破棄 API (CDN Purge)

### `POST /api/v1/deploy/purge-cache`

コンテンツ更新時にバックエンド分散キャッシュ(Redis)およびEdge CDNキャッシュを即時無効化します。

#### リクエスト例 (cURL)
```bash
curl -X POST "https://empasy.io/api/v1/deploy/purge-cache" \
     -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "siteKey": "SITE_MAIN_PORTAL",
       "contentSlug": "2026-fall-membership"
     }'
```

---

## 4. 標準エラーレスポンス仕様 (RFC 7807)

エラー発生時は、RFC 7807標準の`application/problem+json`形式で一貫したエラー情報を返却します:

```json
{
  "type": "https://empasy.io/errors/content-not-found",
  "title": "Content Not Found",
  "status": 404,
  "detail": "指定されたスラッグ('invalid-slug')に該当する公開コンテンツが存在しません。",
  "instance": "/api/v1/contents/invalid-slug",
  "timestamp": "2026-09-01T10:20:00Z"
}
```
