---
title: Scrumban Operation Guide
description: Scrumban is a hybrid agile methodology that combines Scrum's iterative structure with Kanban's flow management and WIP limits to manage work flexibly and efficiently.
head:
  - - meta
    - name: keywords
      content: Scrumban, Scrumban Introduction, Scrumban Concept, What is Scrumban, Scrumban vs Kanban, Agile Methodology, Agile Framework, Kanban Methodology, Scrum Methodology, Scrumban Process, Scrumban Operation Guide, Scrumban Board, WIP Limit, Workflow Management, How to use Kanban Board, Scrumban Advantages, Scrumban Features, Scrumban Effects, Scrumban Use Cases, Scrumban Introduction Effects, Scrumban Jira Setup, Scrumban Board Template, Scrumban Tool, Scrumban Collaboration Tool, Scrumban Workflow, Agile Project Management, Work Efficiency Methodology, Iterative Work Management, Bottleneck Resolution
  - - meta
    - property: og:title
      content: Scrumban
  - - meta
    - property: og:description
      content: Scrumban is a hybrid agile methodology that combines Scrum's iterative structure with Kanban's flow management and WIP limits to manage work flexibly and efficiently.
  - - meta
    - property: og:image
      content: https://doc.empasy.com/images/favicon.png
  - - meta
    - property: og:url
      content: https://doc.empasy.com/agile/guide.html
sort: 300
---

# 📘 Scrumban Standard Operation Guide

## 1. Overview

Scrumban is a hybrid process combining the structure of **Scrum** with the flexible flow management approach of **Kanban**.

- Rules, roles, and backlog management provided by **Scrum**
- WIP limits, Pull system, and flow visualization provided by **Kanban**
  The core purpose is to combine these two to **adapt quickly to changes** and **optimize the flow**.

> 🔑 **Core Philosophy**
> "**Stop starting, start finishing**" — Finish work in progress rather than starting new work.

---

## 2. Basic Principles

1. **Pull-based Work**

- Work is started only when the team has the capacity to handle it.
- Forcing work to be "pushed in" disrupts the flow.

2. **WIP (Work In Progress) Limit**

- Prevents quality degradation and multitasking issues by limiting the number of works in progress simultaneously.
- Example: If there are 5 team members, Doing WIP = 3.

3. **Workflow Visualization**

- Shows all work statuses at a glance on the Kanban board.
- Bottlenecks can be identified immediately.

4. **Explicit Policies**

- Conditions for moving to each column (Definition of Ready / Done, etc.) are documented and shared by all team members.

5. **Data-driven Improvement**

- Measure Cycle Time, Throughput, WIP, CFD (Cumulative Flow Diagram), etc., to determine the direction of improvement.

---

## 3. Roles and Responsibilities

| Role | Main Responsibility | Remarks |
| ------------------------------- | --------------------------------------------------------------- | --------------------------------------------- |
| **Product Owner (PO)** | Backlog management, priority setting, requirement clarification, business goal communication | Maintained as in Scrum |
| **Flow Manager / Scrum Master** | WIP monitoring, bottleneck removal support, retrospective facilitation, process improvement promotion | Similar to the Service Delivery Manager concept in Kanban |
| **Team Member (Dev/QA, etc.)** | WIP compliance, pull-based work, card status update, quality assurance | Autonomy & responsibility essential |
| **Stakeholders** | Provide feedback, participate in demo/review | Regular involvement required |

---

## 4. Activities per Process Stage

| Stage | Activity | Detailed Description | Policy (Example) |
| ----------- | ------------------------ | ---------------------------------------------------------- | ---------------------------------------------- |
| **Backlog** | Collect requests/ideas | Starting point for all work, such as customer requests, bugs, technical debt, new features | Assign priority and Class of Service to all cards |
| **Ready** | Confirm DoR, ready for work | Clarify requirements, secure resources, define test conditions | Move only when DoR checklist is passed |
| **Doing** | Work in progress | Development/implementation after Pulling within the WIP limit | Doing WIP = 3 |
| **Review** | Code/Document review | Check quality, standard, security, test coverage | Move to Testing after reviewer approval |
| **Testing** | Quality verification | Automated/manual testing, defect fixing | Move to Done when QA is complete |
| **Done** | Work complete | Meet DoD, document/deployment complete, record cycle time | Assign completion tag |

---

## 5. Definition Criteria

### 5.1 Definition of Ready (DoR)

- Requirements are clear and documented
- Necessary design/resources secured
- Test conditions defined
- Estimated work scope/difficulty confirmed

### 5.2 Definition of Done (DoD)

- Code merge and build success
- Passed automated/manual testing
- Documentation/release notes written
- Deployment (or customer delivery) complete

---

## 6. Meeting (Event) Operation Guide

| Meeting | Purpose | Frequency | Duration | Characteristic |
| --------------------------- | -------------------- | ------------------- | -------- | ----------------------- |
| **Daily Stand-up** | Share progress, bottlenecks | Daily | 10~15 min | Discussion centered on column flow |
| **Replenishment** | Fill the Ready column | Weekly or at threshold | 30 min | Realign priorities |
| **Retrospective** | Process improvement | Every 2~4 weeks | 30~60 min | Adjust WIP/Policies |
| **Service Delivery Review** | SLA/SLE review | Monthly | 30 min | Metric-based review |

---

## 7. WIP Limit Operation

- Initial value: `Number of team members ÷ 2`
- Example WIP per column:

  - Doing: 3
  - Review: 2
  - Testing: 2

- Immediate cause analysis when WIP is exceeded (bottleneck, lack of manpower, blocker, etc.)
- Prohibit starting new work until resolved

---

## 8. Metric Management

| Metric | Definition | Utilization |
| --------------- | ---------------------- | -------------------- |
| **Lead Time** | Request Generation → Completion | Customer wait time analysis |
| **Cycle Time** | Work Start → Completion | Flow stability measurement |
| **Throughput** | Number of completed cards in a given period | Productivity forecasting |
| **Average WIP** | Average of work in progress | Prevent bottlenecks/multitasking |
| **CFD** | Cumulative number of works per column | Identify bottleneck areas |

> **Tip:** Utilize Little's Law
> `WIP = Throughput × Cycle Time`
> → If one of WIP, throughput, or cycle time is adjusted, the rest will change.

---

## 9. Example Operation Rules

1. Must check WIP before Pulling
2. Assign priority and handler to all cards
3. Mark blockers immediately (sticker/label)
4. Strictly limit meeting times (Stand-up ≤ 15 minutes)
5. Process changes are reflected after agreement in a retrospective

---

## 10. Process Visualization Example

```
[Backlog]
  ↓ (Replenishment)
[Ready]
  ↓ (Pull & WIP Check)
[Doing]
  ↓ (Development Complete)
[Review]
  ↓ (Review Approved)
[Testing]
  ↓ (Quality Verification Complete)
[Done]
```

---

## 11. Improvement Cycle

1. Collect metrics (Cycle Time, Throughput, WIP)
2. Bottleneck and variability analysis
3. Adjust WIP limits, policies, and board structure
4. Trial application for 1~2 weeks
5. Confirm after verifying effectiveness in retrospective

---

## 12. Appendix

### Classes of Service Example

- **Expedite**: Process immediately (Urgent)
- **Fixed Date**: Deadline on a specific date
- **Standard**: General request
- **Intangible**: Long-term value such as technical debt

### Recommended Tools

- Jira, Trello, Azure DevOps, Miro, ClickUp

---

**📌 Core Message**
Scrumban is a methodology for "**keeping rules to a minimum while optimizing flow**".
The process must continuously evolve based on the team's **data and consensus**.

---
