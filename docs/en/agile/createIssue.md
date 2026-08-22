---
title: Issue Creation Prompt
description: Introducing core principles for using Jira efficiently. ✅ Discover how to increase project transparency and team productivity through issue allocation rules, ✅ essential commenting guides, and ✅ status management know-how. This is a guide for team collaboration.
head:
  - - meta
    - name: keywords
      content: LLM prompt generation, prompt-based issue writing, AI prompt guide, prompt template, AI-based development support, automated issue creation, LLM prompt guide, sample data generation, UI scenario writing, test automation tool, automated test scenario, QA efficiency, software onboarding
  - - meta
    - property: og:title
      content: Issue Creation Prompt Usage Guide
  - - meta
    - property: og:description
      content: A step-by-step guide on how to efficiently create issues. A practical guide including the use of LLM prompts, automatic generation of sample data/scenarios, and writing UI scenarios.
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://empasy.io/agile/createIssue.html
sort: 7000
---

# Prompt

```
I want to create a new issue in the issue management system of a Playwright-based test automation tool.
Please write it in the format of a **JIRA ticket template** based on the following content.

Requirements:
1. Generate an issue **Title**
2. Write in the format of a **JIRA ticket template**
  - Summary
  - Description
  - Acceptance Criteria
  - Priority
3. Include an example of a **UI scenario** that can be referenced during development

Issue Content:
{{Issue Content}}
```

# Sample

```
I want to create a new issue in the issue management system of a Playwright-based test automation tool.
Please write it in the format of a **JIRA ticket template** based on the following content.

Requirements:
1. Generate an issue **Title**
2. Write in the format of a **JIRA ticket template**
   - Summary
   - Description
   - Acceptance Criteria
   - Priority
3. Include an example of a **UI scenario** that can be referenced during development

Issue Content:
 Add a feature to generate sample data like DBeaver upon first login
```

# Register the issue after modifying the result as needed

```
## 📌 JIRA Ticket Example

**Title**
Add automatic generation of sample data and sample project/scenario upon first login

**Summary**
When a new user logs in for the first time and has no projects, generate a sample project and scenario to improve the initial experience of the tool and support quick onboarding.

**Description**
Currently, in the Playwright-based test automation tool, when a new user logs in for the first time without any projects or scenarios, a blank screen is displayed.
To improve this, the following feature must be implemented:

1. If no project exists upon first login, provide a **popup asking whether to generate samples**

   * "Would you like to generate a sample project and scenario?"
2. If the user agrees, **automatically generate a sample project and sample scenario**
3. The generated sample project and scenario can be checked in the UI and executed immediately

**Acceptance Criteria**

* [ ] Display a popup if there is no project upon first login
* [ ] Automatically generate a sample project and sample scenario when "Yes" is selected
* [ ] The sample project is displayed in the project list on the UI
* [ ] The sample scenario is executable and confirmed to work normally
* [ ] Do not generate if "No" is selected
* [ ] This logic is executed only at the time of the first login

**Priority**
Medium

**Labels**

* playwright
* onboarding
* enhancement

**Expected Benefits**

* Provide an **immediately executable sample** to new users
* Users can **intuitively understand** how to utilize the tool
* **Improved UX** by providing default sample data instead of a blank screen

---

## 💻 UI Scenario Example

**Sample Project Name:** `Sample Project`

1. **Sample Scenario 1: Web Login Test**

   * Step 1: Open browser
   * Step 2: Navigate to URL (`https://example.com/login`)
   * Step 3: Enter ID (`test_user`)
   * Step 4: Enter PW (`password123`)
   * Step 5: Click login button
   * Step 6: Verify "Login Successful" message

2. **Sample Scenario 2: API Call Test**

   * Step 1: Call `GET /api/health`
   * Step 2: Check for response status code 200
   * Step 3: Verify the `"status": "ok"` value within the response JSON

3. **Sample Scenario 3: Basic UI Validation Test**

   * Step 1: Navigate to main page
   * Step 2: Check if the logo image is displayed on the screen
   * Step 3: Click the main menu button and verify page transition
```
