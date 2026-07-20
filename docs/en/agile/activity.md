---
title: Scrumban Step-by-Step Activities
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
      content: https://doc.empasy.com/agile/activity.html
sort: 400
---

# Scrumban Step-by-Step Activity Guide

| Step | Main Activity | Detailed Description |
| --- | --- | --- |
| **1. Backlog** | - Collect new ideas/requests<br>- Record backlog items<br>- Assign class of service | The starting point for all work.<br>**Product Owner** or team records business requests, bugs, technical debt, etc.<br>Assign **priority** and **work type (Expedite, Fixed Date, Standard, Intangible)** to each card.<br>Items in this stage are not yet ready to start. |
| **2. Ready** | - Check Definition of Ready (DoR)<br>- Break down work (if necessary)<br>- Unassigned handler | Details are prepared so work can start immediately.<br>Must meet DoR criteria (clear requirements, design/resources secured, test conditions defined, etc.).<br>Usually moved from Backlog to Ready during **Replenishment meetings**. |
| **3. Doing / In Progress** | - Start work (Pull)<br>- Update progress status<br>- Mark blockers | Team members pull from Ready to start within WIP limits.<br>**Bottlenecks/Blockers** that occur during work are visually marked on the board (red labels, icons, etc.).<br>Share status in daily stand-ups. |
| **4. Review (Code Review / Peer Review)** | - Perform code review/document review<br>- Reflect feedback | Completed work is moved to the Review column.<br>Designated reviewers check for code quality and standard compliance.<br>If there is review feedback, it goes back to Doing or goes back to the Review stage after modification. |
| **5. Testing / QA** | - Functional testing<br>- Write bug reports and fix | QA or team members perform testing.<br>Can combine automated testing + manual testing.<br>If there is a bug, record it on the card and re-verify after fixing. |
| **6. Done** | - Confirm Definition of Done (DoD) is met<br>- Document/Update release notes<br>- Deployment complete | Meets all quality criteria and deployment is complete.<br>Includes documentation like release notes and user manuals.<br>Record completion date on the card (used for cycle time analysis). |

---

## Visualizing the Activity Flow for Each Stage

```
[Backlog]
  ↓ (Replenishment Meeting)
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

## Operation Tips per Stage

### 1. Backlog

- **Clarify Priority Criteria**: Based on urgency, value, deadlines, and risk
- **Standardize Card Size**: Split before Ready if too large
- **Periodic Cleanup**: Discard old/unnecessary cards

### 2. Ready

- **Example of Definition of Ready (DoR) Checklist**
  - Requirements are clear
  - Design/Data/Resources are secured
  - Test conditions are defined
  - Estimated work time/scope is confirmed

### 3. Doing

- Maintain the **Stop Starting, Start Finishing** rule
- Discuss immediately when bottlenecks occur
- Minimize multitasking

### 4. Review

- Define code review criteria (e.g., code style, performance, security, tests included)
- Utilize notification systems to reduce review wait time

### 5. Testing

- Parallel use of automated testing and manual testing
- Re-verify after fixing on the same card when bugs occur
- WIP limit exceptions can be allowed if a test fails

### 6. Done

- **Record cycle time** on the card upon completion
- Review completed cards during release retrospectives
- Assign tags for data analysis (bugs, new features, etc.)

---

## Key Metrics per Stage

| Stage | Key Metric | Purpose of Utilization |
| --- | --- | --- |
| Backlog → Ready | Lead Time (Request ~ Ready to Start) | Identify causes of preparation delays |
| Ready → Doing | Pull Frequency | Grasp the team's throughput capacity |
| Doing | Average WIP, Blocker Ratio | Bottleneck management |
| Review | Review Wait Time | Balance between quality and speed |
| Testing | Defect Rate, Rework Rate | QA efficiency |
| Done | Cycle Time, Throughput | Improve predictability |

---

By organizing this way, it becomes clear **what teams adopting Scrumban should do at each stage**, and **metric-based improvement activities** can also be conducted concurrently.

---
