---
title: Story Points
description: Story points are a unit for relatively estimating the size, complexity, and uncertainty of work. They do not map directly to absolute time, and their purpose is to determine a reasonable workload per sprint and estimate the team's schedule.
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
      content: https://doc.empasy.com/agile/glossaryOfTerms.html
sort: 2000
---

# Story Point Guide: Work Estimation Method for Agile Teams

## What are Story Points?

Story points are a unit for relatively estimating the **size, complexity, and uncertainty** of work. They do not map directly to absolute time, and their purpose is to determine a reasonable workload per sprint and estimate the team's schedule.

> ❌ The approach of "5 points = 5 times the time of 1 point" is incorrect.

## Reason for Using the Fibonacci Sequence

Story point estimation generally uses the Fibonacci sequence, such as **1, 2, 3, 5, 8, 13, 21...**. The reasons for using a sequence rather than consecutive numbers are:

- The gaps become larger, reflecting uncertainty
- The difference between 5 and 8 is clearer than the difference between 5 and 6
- It reflects that complexity and risk increase exponentially for larger tasks
- As a result, team consensus becomes easier, and over/under-estimation can be reduced

## Story Point Utilization Example

| Work Item | Points | Description |
| ------------ | -------- | ----------------------------------- |
| User Research | 3 points | Work requiring relatively light effort |
| Wireframing | 5 points | Simple work done after user research |
| UI Design | 8 points | Work requiring coordination within the team |
| Dev Task | 13 points | Complex work involving many elements |
| QA Testing | 8 points | Complex but manageable level of work |

## Baseline Task Examples

### Story Point 5: User Password Reset Feature

**Definition of Done**

- Implement password change feature
- Implement email verification feature
- Comply with password rules (alphanumeric, etc.)

**Supplementary Considerations**

- DB table design
- Email sending/receiving environment
- Exceptions do not need to be considered

### Story Point 13: Credit Card Payment Feature

**Definition of Done**

- Implement product payment feature
- Purchase history can be viewed on My Page
- Admins can also check

**Supplementary Considerations**

- Card registration feature already exists
- DB design required
- Error patterns do not need to be considered

## Caution: Incorrect Usage

**Avoid the method of directly substituting time.**

- ❌ "A 4-hour task = 1 point" → No different from the existing method
- ❌ "5 points = 5 times the time of 1 point"

**Correct meaning**: It means it is 5 times more complex than 1 point. Such incorrect approaches destroy the essence of story points.

## Refactoring and Quality Considerations

Every story must include the following two elements:

1. A feature that **works properly**
2. Quality that ensures it **operates correctly**

If only the first element is satisfied and the second is ignored, the story point is incomplete. Refactoring work can also be assigned points from the perspective of quality improvement (removing technical debt).

> Caution: Never use story points to compare individual performance. This is purely a team-level tool.

## Core Summary

- Story points are a **relative estimation unit**
- The purpose is to **compare complexity/uncertainty** of work, not to convert it to time
- Using the Fibonacci sequence reflects that risks increase as the work gets larger
- Establish team consensus criteria (e.g., 3, 5, 8, 13) and make decisions by comparing new tasks
- Avoid incorrect time mapping methods and ensure quality standards are reflected

---

# Story Point Meeting Guide

## Meeting Agenda

### Opening (5 mins)

- Explain the purpose of the meeting: Relatively estimate the difficulty/complexity of tasks for this sprint
- Emphasize reaching a consensus through relative size comparison, not absolute time units

### Basic Concepts Reminder (10 mins)

- Definition of story points: A unit representing the size, complexity, and uncertainty of work
- Does not match 1:1 with time (❌ "5 points = 5 times the time of 1 point")
- Explain why the Fibonacci sequence is used (1, 2, 3, 5, 8, 13, 21...)

### Share Baseline Examples (10 mins)

- Share story point examples (User Research → 3, Wireframing → 5, etc.)
- Review specific baseline tasks (5 points: password reset, 13 points: credit card payment)

### Caution on Incorrect Usage (5 mins)

- Emphasize not to directly substitute time
- "5 points = 5 times the time of 1 point" ❌
- Correct interpretation: "5 times more complex than 1 point"

### Refactoring and Quality Considerations (10 mins)

- Every story must include [1] Works properly + [2] Operates correctly (Quality)
- Points need to be allocated for refactoring/technical debt improvement depending on the situation
- Reiterate that it is not for comparing individual performance

### Actual Work Estimation (30~40 mins)

- Review backlog items one by one
- Discuss by comparing with baseline examples
- Team consensus → Decide on one of the Fibonacci numbers (e.g., 3, 5, 8, 13)
- Find a middle ground when there are issues or conflicting opinions

### Wrap-up (5 mins)

- Summarize the story point results decided in the meeting
- Notify that it will be reflected in the next sprint planning
- Reiterate that "Story points are a tool to help the team estimate schedules quickly and easily"

Story points are a useful tool for team productivity and schedule management, but they show their true value only when understood and used correctly.

---
