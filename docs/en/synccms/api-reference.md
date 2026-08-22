---
title: Headless REST API Reference | SyncCMS
description: Detailed endpoint specifications, request/response JSON schemas, HTTP status codes, and RFC 7807 error formats for SyncCMS headless APIs.
head:
  - - meta
    - name: keywords
      content: REST API, API Reference, Headless API, JSON Schema, cURL, CDN Purge API, RFC 7807, Spring Boot 3
  - - meta
    - property: og:title
      content: Headless REST API Reference | SyncCMS
  - - meta
    - property: og:description
      content: Specifications and standard JSON schemas for SyncCMS headless REST APIs.
sort: 6
---

# Headless REST API Reference

SyncCMS provides standard RESTful endpoints for accessing published content, submitting dynamic forms, and managing deployment caches.

---

## Common HTTP Request Headers

Include the following HTTP headers in API requests:

| Header | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `X-Sync-Site-Key` | Yes | Target site or channel identifier | `SITE_MAIN_PORTAL` |
| `Authorization` | Optional | JWT bearer token for protected administration endpoints | `Bearer eyJhbGciOi...` |
| `Accept` | Yes | Desired response MIME type | `application/json` |

---

## 1. Content Retrieval API

### `GET /api/v1/contents/{contentSlug}`

Fetches the latest published content payload and SEO metadata for a specific slug.

#### Request Example (cURL)
```bash
curl -X GET "https://empasy.io/api/v1/contents/2026-fall-membership" \
     -H "X-Sync-Site-Key: SITE_MAIN_PORTAL" \
     -H "Accept: application/json"
```

#### Response Example (200 OK)
```json
{
  "success": true,
  "data": {
    "contentId": "CNT_20260901_001",
    "slug": "2026-fall-membership",
    "title": "2026 Fall Membership Benefits Guide",
    "status": "PUBLISHED",
    "publishedAt": "2026-09-01T09:00:00Z",
    "version": 3,
    "fields": {
      "headline": "2026 Fall Membership Festival",
      "description": "Join today to receive welcome coupon packs and double reward points.",
      "bannerUrl": "https://empasy.io/images/promo2026.webp",
      "ctaText": "Claim Offer",
      "ctaLink": "/events/welcome-pack"
    },
    "seo": {
      "metaTitle": "2026 Membership Benefits | Empasy",
      "metaDescription": "Explore exclusive perks and event updates for new members.",
      "ogImage": "https://empasy.io/images/og-fall.png"
    }
  }
}
```

---

## 2. Dynamic Form Submission API

### `POST /api/v1/forms/{formKey}/submit`

Accepts and validates user-submitted form records from frontend channels.

#### Request Example (cURL)
```bash
curl -X POST "https://empasy.io/api/v1/forms/contact-us/submit" \
     -H "X-Sync-Site-Key: SITE_MAIN_PORTAL" \
     -H "Content-Type: application/json" \
     -d '{
       "applicantName": "John Doe",
       "email": "user@example.com",
       "company": "Empasy Inc.",
       "inquiryType": "ARCHITECTURE_CONSULTING",
       "message": "Requesting technical review for SyncCMS on-premise deployment."
     }'
```

#### Response Example (201 Created)
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

## 3. Global Cache Invalidation API (CDN Purge)

### `POST /api/v1/deploy/purge-cache`

Immediately purges backend distributed caches (Redis) and connected edge CDN caches.

#### Request Example (cURL)
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

## 4. Standard Error Response Format (RFC 7807)

Errors are returned in RFC 7807 `application/problem+json` format:

```json
{
  "type": "https://empasy.io/errors/content-not-found",
  "title": "Content Not Found",
  "status": 404,
  "detail": "No published content found for the specified slug ('invalid-slug').",
  "instance": "/api/v1/contents/invalid-slug",
  "timestamp": "2026-09-01T10:20:00Z"
}
```
