---
title: "5-Minute QuickStart Guide"
description: "Launch the SyncETA local environment, record your first scenario, execute tests via Playwright, and inspect results in 5 minutes."
sort: 30
---

# 5-Minute QuickStart Guide

This guide walks you through setting up SyncETA and executing your first automated web test scenario.

---

## 1. Prerequisites

- **OS**: Windows 10/11, macOS, Linux (Ubuntu 20.04+)
- **Runtime**: Docker Compose or Node.js 20+
- **Browser**: Google Chrome latest stable release

---

## 2. Launching Services via Docker Compose

```bash
# Clone the repository
git clone https://github.com/DramaticCollaboration/SyncSeries.git
cd SyncSeries/SyncEta

# Start core services
docker compose -f docker-compose.dev.yml up -d
```

Navigate to `http://localhost:9000` in your browser to access the SyncETA management console.

---

## 3. 4-Step Walkthrough

### Step 1: Create Project & Register Base URL
1. Click **'Projects'** in the sidebar.
2. Click **'New Project'**, enter a name (e.g., `E-Commerce E2E Suite`), and set the target URL (`https://shop.example.com`).

### Step 2: Record First Scenario
1. Navigate to **'Scenarios'** ➔ **'New Scenario'**.
2. Select the browser engine (Chrome) and resolution (1920x1080), then click **'Start Recording'**.
3. In the recording browser, perform the target workflow:
   - Click the search input and type `Wireless Keyboard`.
   - Click the search button.
   - Click the first search result item.
4. Click **'Finish Recording'** in the top bar to save.

### Step 3: Add Assertions
1. Open the saved scenario.
2. Right-click the final step and select **'Add Assertion' ➔ 'DOM Visible'**.
3. Click the **'Add to Cart'** button in the browser window to assign the target assertion element.

### Step 4: Execute via Playwright MCP
1. Click **'Run Scenario'** in the top right.
2. Check **'Headless Mode'** and **'Save Video'**, then click **'Execute'**.
3. Go to the **'Dashboard'** to inspect execution duration, step logs, and replay the synchronized MP4 video.
