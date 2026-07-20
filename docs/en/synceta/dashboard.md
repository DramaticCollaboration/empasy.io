---
title: Dashboard
description: Compare AI test automation methods and the latest tools. Learn how to increase QA efficiency with machine learning-based automated testing.
head:
  - - meta
    - name: keywords
      content: Test Automation, Testing Generative AI, Playwright, Selenium, Real-time Quality Feedback, Zero-downtime Testing, AI-based Test Automation, Continuous Testing, QAOps, TestOps, Codeless, Low-Code, Self-healing Test, Self-healing, AI Test Automation, Codeless Automation, QA Automation, Software Testing, Test Scenario Creation, Codeless Test, Natural Language Test, Test Automation Tool, Test Automation Platform, Test Efficiency, Playwright, Selenium, QAOps, TestOps, Shift-Left Testing, Shift-Right Testing
  - - meta
    - property: og:title
      content: AI Test Automation | SyncETA
  - - meta
    - property: og:description
      content: Reduce QA time by 80% with AI-based test automation. Set a new standard for QA with codeless test creation, natural language scenario writing, and multi-platform support.
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://doc.empasy.com/synceta/
sort: 8
---

# Dashboard

## Test Results

#### You can view the results by setting the execution type/period.

![image](./image/dashboard/main.png)

#### Displays statistics for test results within the inquiry period.

::: info

1. Total number of scenario executions
2. Total number of record executions
3. Execution success rate of records set with 'High' importance (Importance setting is below)
4. Verification success rate of verification records
   :::

![image](./image/dashboard/total.png)

#### How to check the detailed execution results of a scenario

![image](./image/dashboard/row_detail.png)

#### Auto Play

![image](./image/dashboard/auto_play.png)

#### You can easily check the execution result by focusing on the record at the time of the video.

![image](./image/dashboard/auto_play2.png)

#### You can view videos from multiple tabs at once.

![image](./image/dashboard/open1111.png)

#### Clicking will scroll to the corresponding error record.

![image](./image/dashboard/move.png)

#### Moves to the video at the time of record execution.

![image](./image/dashboard/move_video.png)

#### You can write comments on test results.

::: info

- Can tag team members using @
  :::

![image](./image/dashboard/comment.png)

#### You can check tagged comments.

![image](./image/dashboard/mention.png)

## Collected Information

1. **Self-Information Collection**  
    SyncETA automatically collects and provides relevant information during regression testing based on the information collected at the time of recording.
   ::: info
   Collects various information of the dom where the event occurred based on user actions.
   :::
   ![image](./image/dashboard/select_dom.png)
2. **ConsoleError Collection**  
    You can check ConsoleErrors occurring on the test target page by automatically detecting and collecting them.
   ::: info
   Collects and provides console Errors that occurred during the test.
   :::
   ![image](./image/dashboard/console_err.png)

3. **HTML5 Validation (Feature being added)**  
   Automatically conducts W3C-based HTML5 validation during regression testing, and the results can be collected and utilized to improve the user experience.

4. **SSL Certificate Check**  
    Automatically checks and collects the expiration date of the SSL certificate of the tested page, and informs via a mailing service if the expiration is imminent.
   ::: info
   Collects and provides the SSL certificate expiration date of the service where the test was conducted.

- SSL certificate automatic renewal feature is being added
  :::
  ![image](./image/dashboard/ssl.png)
