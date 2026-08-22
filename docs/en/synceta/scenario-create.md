---
title: "Scenario Recording & Studio Guide"
description: "Record web browser interactions in real-time, configure wait conditions, assertions, and recovery scripts for reliable test scenarios."
sort: 300
---

# Scenario Recording & Studio Guide

The SyncETA Studio captures browser actions (clicks, keyboard input, page navigation) and structures them with DOM details (XPath, CSS selectors, tag attributes) into automated test cases.

---

## 1. Scenario Definition

A **'Scenario'** represents an end-to-end user workflow.

Example: `E-Commerce Search & Cart Checkout`
1. Navigate to homepage
2. Click search box and input `Wireless Mouse`
3. Submit search query
4. Click first product from search results
5. Click 'Add to Cart' and verify confirmation modal

---

## 2. Recording Workflow

### Step 1: Open Scenario Creator
Navigate to **'Scenarios'** ➔ click **'New Scenario'**.

![New Scenario](image/scenario-create/new_scenario.png)

### Step 2: Configure Browser & Viewport
Set target URL, browser engine (Chrome/Edge), and viewport resolution.

![Recording Settings](image/scenario-create/select_option.png)

### Step 3: Event Filters
Select event types to capture (clicks, inputs, hover, scrolls). Default settings are recommended.

![Event Filter](image/scenario-create/allow_event.png)

### Step 4: Record Actions
Perform actions in the dedicated recording browser. Events appear in sequence below.

![Start Recording](image/scenario-create/start_recording.png)
![DOM Info Captured](image/scenario-create/select_dom_info.png)

---

## 3. Wait Conditions

| Type | Description | Best Used For |
| :--- | :--- | :--- |
| **Fixed Timeout** | Pauses execution for a specified millisecond duration. | External API response latency |
| **DOM Visible** | Waits until target element renders in DOM. | Dynamic modal popups |
| **Value Match** | Waits until target element's text matches expected value. | Status change to 'Completed' |

![Time Wait](image/scenario-create/time_wait.png)
![DOM Wait](image/scenario-create/dom_wait.png)
![Value Wait](image/scenario-create/value_wait.png)

---

## 4. Assertions

| Type | Description |
| :--- | :--- |
| **DOM Visible Assertion** | Asserts that a target UI component is present on screen. |
| **Value Assertion** | Asserts that text or attribute value matches expected string. |
| **Vision AI Assertion** | Analyzes rendered screenshot to verify layout visual correctness. |

![DOM Assertion](image/scenario-create/valid_dom.png)
![Value Assertion](image/scenario-create/valid_value.png)
![Vision AI Assertion](image/scenario-create/valid_ai.png)

---

## 5. Editing & Additional Features

- **Continue Recording**: Resume recording from a specific existing step.
  ![Edit](image/scenario-create/edit.png)
- **Step Comments**: Attach documentation notes to individual steps.
  ![Comment](image/scenario-create/comment.png)
- **Recovery Scripts**: Execute fallback JavaScript upon step failure.
  ![Recovery](image/scenario-create/recover.png)
- **Dataset Variables**: Bind input fields to dynamic variables (`{{username}}`).
  ![Dataset](image/scenario-create/dataset.png)
