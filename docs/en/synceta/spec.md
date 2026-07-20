---
title: Feature Specifications
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
sort: 2000
---

# SyncETA Hardware and Software Detailed Specifications

This document details the hardware and software specifications of the SyncETA regression test automation solution.
It describes the user's web browser action recording, test execution, result management, and other ancillary features.

## 1. System Deployment and Operating Environment

- **Deployment Format**: SyncETA can be deployed as a Docker-based installation (On-premise) or as a Cloud SaaS (Software as a Service) format.
- **Security Requirements**: Supports executing LLM models on-premise depending on security requirements.
- **Test Environment**: Supports testing in real environments by performing scenario recording and execution against the production server rather than the development server.

## 2. System Components and Detailed Features

SyncETA largely consists of the following modules:

### 2.1 SyncETA Recorder (User Action Recording Module)

**Technology**: Uses Selenium technology. It utilizes a powerful and easy-to-use framework based on Selenium to simplify test creation and maintenance and optimize the web testing process.

**Features**:

- Captures and records the user's actual browser actions (clicks, inputs, scrolls, page movements, tab information, etc.) in real-time.
- Records detailed events and DOM information such as URL, XPath, Class, ID, and DOM information during recording.
- Recorded actions are automatically generated into scenarios suitable for testing purposes and saved in JSON/YAML-based formats.
- Supports recording scenarios where multiple users interact simultaneously.

**User Interface**:

- Provides a convenient screen to enter the web URL to record, and freely select the web browser and set its size.
- Collects various user events, and test automation can be easily built using an intuitive GUI and keyword-based non-code methods.
- Also provides a script (JavaScript)-based code method.
- Strengthens data verification capabilities by adding additional conditions (AI, Script) to each event.
- Can add success conditions and set failure recovery scripts for each event.
- Provides functions to assign wait times before execution and specify variable names.

### 2.2 Test Executor (Automated Test Execution Module)

**Technology**: Interlocks and uses Playwright MCP (Multi-Channel Platform).

**Features**:

- Automatically generated execution scripts are run in an actual browser automation environment.
- Supports parallel test execution in a multi-browser automation environment, enabling rapid results.
- Supports cross-browser compatibility in various browsers such as Chrome, Firefox, and Edge, and the addition of Safari browser has also been requested.
- Provides execution result reports (pass/fail logs, screenshots, etc.), and failed test cases are automatically logged.
- Provides user-friendly error identification and diagnostic features when errors occur during test execution. It displays screenshots of the error point, recorded screens (video) when the error occurred, and user-friendly error messages. Clicking an error on the dashboard shows a video of the recorded screen at the time of the error.

### 2.3 Dashboard/Management System

**Features**: Provides a dashboard for system monitoring such as scenario registration status, execution status, error status, and browser information.

**Report**:

- Provides precise reports and analysis including execution result visualization and test trend analysis, and can provide custom reports tailored to customer requirements.
- Sends reports using mail templates, and while images can be checked on the dashboard, they are not included in the report.

**Scenario Management Feature**:

- Can classify, search, and version-control saved scenarios.
- Supports version control display for data records at the time of recording and modification history.
- Can extract test scenarios according to customer needs.
- Provides convenience in managing execution history through scenario history filtering.
- Optimizes publishing and UI change inspection tasks by automatically processing tests as failed when UI changes are detected.

### 2.4 Dataset Management Feature

**Features**:

- Can input and manage data in a tabular format, supporting the addition, modification, and deletion of variables.
- You can write directly by calling variable values set in the scenario, or automatically generate mockup data using AI and conduct tests with various values. This feature generates test data, which is distinct from AI automatic generation of test cases.
- Applying datasets enables various case tests.
- Verification Data Setting: Verifies data by granting higher accuracy through the setting of unique values for the site (project).

### 2.5 Scenario Management and Execution Options

- **Record**: The basic unit that records user events and DOM information.
- **Scenario**: A core component that implements test scenarios by systematically integrating record information. Enables tracking execution results through accuracy, stability, and real-time status information via automatic and AI-based verification.
- **Collection**: A feature that selects multiple scenarios and executes them sequentially, guaranteeing a consistent workflow by flexibly combining various scenarios. If you want to run one scenario on multiple browsers, you can run it as a collection.
- **Story**: A feature that freely connects scenarios through a Flow Chart interface and dynamically executes the next scenario based on verification results. Ensures stability and efficiency with visual workflows and automatic verification.
- **Dynamic Test Chaining**: Enables flexible testing through sequential scenario execution based on conditions.
- **Initialization upon Re-execution**: Provides an environment initialization function when re-executing a test.
- **Scenario Severity Setting**: Supports severity management for each scenario.
- **Can be executed in various environments by modifying data, and performance testing can be done in series/parallel.

## 3. System Operation and Implementation Details

- **Real-time Communication**: Enables checking real-time event actions and DOM information through socket communication.
- **Screen Verification**: Additional data verification is possible after capturing the screen for each event through AI.
- **CI/CD Integration**: Seamlessly integrates with CI/CD pipelines and various external tools/systems like Jenkins, Git, Azure, DevOps, etc. Through this, it can naturally integrate test automation into the existing development/deployment process, improving the efficiency and quality of the entire software development life cycle.
- **Security and Authentication Processing**: Includes various security and authentication processing functions such as automatic login processing, cookie and session management functions, HTTP authentication bypass capability, and VPN/Proxy setting support.
- **Reusability and Maintenance Ease**: Increases the reuse and maintenance efficiency of test assets through a modular and reusable test structure.

## 4. Expected Effects (Excluding effects on test case generation and learning)

- **Streamline QA Resources**: Repetitive test tasks are automated, increasing QA work efficiency and reducing QA resources by more than 30%.
- **Fast Release and Time-to-Market**: Shortens the development cycle through regression test automation and accelerates time-to-market with rapid feedback.
- **Test Automation without Writing Code**: Users lacking development knowledge can also easily build test automation with an intuitive GUI and keyword-based non-code methods.
- **Provide a Flexible Test Environment**: Supports various execution options and customization such as cross-browser compatibility, parallel execution, and dynamic chaining. Designed to flexibly adjust and expand test environments and functions according to customer needs.
- **User-friendly Error Identification**: Facilitates error analysis by providing user-friendly error messages when an error occurs, recording screenshots, and providing recorded screens when an error occurs.
- **Increase Accessibility and Efficiency of Test Execution**: By allowing Excel test cases to be executed directly without the existing scenario recording process, QA engineers can flexibly perform tests and save time.
- **Improve Test Quality and Reliability**: Prevents human error and maintains consistent quality. Discovers errors early and guarantees continuous and stable quality.

---
