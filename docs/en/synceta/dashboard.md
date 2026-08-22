---
title: "Dashboard & Failure Analysis Guide"
description: "Execution statistics, synchronized MP4 video replay, DOM tree inspection, console error logging, and SSL certificate tracking in SyncETA."
sort: 800
---

# Dashboard & Failure Analysis Guide

The SyncETA Dashboard provides an observability hub to inspect test pass rates, diagnose root causes, and replay synchronized execution recordings.

---

## 1. Execution Metrics & Trends

Filter results across test types (Direct, Scheduled, CI/CD) and inspect high-priority test pass rates.

![Main Dashboard](./image/dashboard/main.png)
![Metrics Summary](./image/dashboard/total.png)

---

## 2. Synchronized Video Replay & Error Diagnostics

Replay MP4 session recordings synchronized with step execution timelines.

![Execution Details](./image/dashboard/row_detail.png)
![Video Auto Play](./image/dashboard/auto_play.png)
![Timeline Sync](./image/dashboard/auto_play2.png)
![Multi-Tab Replay](./image/dashboard/open1111.png)

### Error Navigation
Clicking an error log instantly jumps to the corresponding step in the timeline and video.

![Jump to Step](./image/dashboard/move.png)
![Jump in Video](./image/dashboard/move_video.png)

---

## 3. Team Collaboration

Add comments and mention team members (`@username`) directly on individual test steps.

![Comments](./image/dashboard/comment.png)
![Mentions](./image/dashboard/mention.png)

---

## 4. Automated Diagnostics

- **DOM Snapshots**: Full DOM tree state captured at every action.
- **Console Errors**: Captures client-side JavaScript runtime errors.
- **SSL Tracking**: Tracks TLS certificate expiration dates for tested domains.

![DOM Inspection](./image/dashboard/select_dom.png)
![Console Error](./image/dashboard/console_err.png)
![SSL Expiration](./image/dashboard/ssl.png)
