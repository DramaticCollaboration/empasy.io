---
title: Scrumban
description: Scrumban is a hybrid Agile methodology that combines Scrum's iterative structure with Kanban's flow management and WIP limits to flexibly and efficiently manage work.
head:
  - - meta
    - name: keywords
      content: Scrumban, Introduction to Scrumban, Scrumban Concept, What is Scrumban, Difference between Scrum and Kanban, Scrum vs Kanban, Agile Methodology, Agile Framework, Kanban Methodology, Scrum Methodology, Scrumban Process, Scrumban Operation Guide, Scrumban Board, WIP Limit, Workflow Management, How to use Kanban Board, Scrumban Advantages, Scrumban Features, Scrumban Effects, Scrumban Use Cases, Scrumban Adoption Effects, Scrumban Jira Setup, Scrumban Board Template, Scrumban Tools, Scrumban Collaboration Tools, Scrumban Workflow, Agile Project Management, Work Efficiency Methodology, Iterative Work Management, Bottleneck Resolution
  - - meta
    - property: og:title
      content: Scrumban
  - - meta
    - property: og:description
      content: Scrumban is a hybrid Agile methodology that combines Scrum's iterative structure with Kanban's flow management and WIP limits to flexibly and efficiently manage work.
  - - meta
    - property: og:image
      content: https://empasy.io/docs/images/favicon.png
  - - meta
    - property: og:url
      content: https://empasy.io/agile/
sort: 200
---

# Scrumban

> **One-line summary:** Scrumban is a process that combines the structure of Scrum (roles/meetings/backlog concepts) with Kanban's flow-centric approach and WIP (Work In Progress) limits. Instead of the strictness of a sprint, it emphasizes **Flow** and **Pull**, while maintaining Scrum-style ceremonies (planning/retrospectives) where necessary.


## Introduction · Definition

**Scrumban** is a hybrid process designed for software development and knowledge work teams to flexibly manage their workflow.

- **Scrum**: Iterations (Sprints), fixed ceremonies (Sprint Planning/Review/Retro), clear roles
- **Kanban**: Visual board, WIP limits, pull-based work, continuous improvement
  Scrumban takes the advantages of both approaches and focuses on **practical flow improvement**.


## When is it good to use Scrumban?

- Teams that are currently using **Scrum** but find it hard to bundle work into sprints due to frequent changes (urgent requests).
- Teams managing flow with **Kanban**, but need disciplines like backlog management, prioritization, and regular retrospectives.
- Maintenance, operations, and support teams (a mix of operational tasks + new feature development).
- When **continuous delivery** and flow optimization are valued more than predictability.


## Core Concepts

1. **Pull System**: Work is only started (pulled into the next column) when the team has the capacity to handle it.
2. **WIP (Work In Progress) Limits**: Limits the number of tasks in progress simultaneously to reduce multitasking and promote completion.
3. **Visualized Board**: Clearly shows the status of work and instantly identifies bottlenecks.
4. **Regular Replenishment / Planning**: Fills the backlog with tasks only when needed (periodically or upon reaching a threshold).
5. **Measurement and Improvement**: Improves flow using metrics like cycle time, lead time, and throughput.
6. **Explicit Policies**: Documents column transition conditions, prioritization rules, and Definition of Ready/Done.


## Scrum vs Kanban vs Scrumban

| Item           | Scrum | Kanban | Scrumban |
| -------------- | ---: | --- | --- |
| Iteration (Sprint) | Yes (Fixed length) | No (Continuous flow) | Optional / Mix of short iterations |
| WIP Limit      | Implicit (Sprint scope) | Explicit | Explicit (Core) |
| Planning Method| Sprint Planning | Replenishment / Pull-based | Replenishment + Planning if needed |
| Roles          | PO/SM/Dev | Flexible (No roles) | PO + Flow Manager (or maintain SM role) |
| Goal           | Commitment (Sprint Goal) | Flow Optimization | Flow Optimization + Priority Management |


## Roles and Responsibilities

- **Product Owner (PO)**: Backlog prioritization, stakeholder coordination, business value definition
- **Flow Manager (or maintaining Scrum Master role)**: Flow monitoring, bottleneck removal support, process improvement facilitation
- **Team (Developers/Testers, etc.)**: Complies with defined policies, starts/completes work using a pull method within WIP limits
- **Stakeholders**: Provide requirements/feedback, participate in reviews (if necessary)

> Flexibly adjust roles according to the team's situation. The key is that the **responsibility for flow management** must be clear.

## Core Artifacts · Tools

- **Kanban Board** (Physical or Digital) — including columns and WIP limits
- **Backlog (Priority List)** — candidates for pull-status tasks
- **Explicit Policies** — column transition rules, definitions (Ready/Done)
- **Classes of Service** — priority types such as Urgent/Fixed Date/Standard
- **Metrics Dashboard**: Cycle time, lead time, throughput, CFD (Cumulative Flow Diagram)


## Board Layout

Basic Scrumban Board (Example):

| Column              | Description | Recommended WIP Limit |
| ------------------- | --- | ---: |
| Backlog             | All prioritized tasks | — |
| Ready               | Tasks ready to start (Can be moved to Do) | — |
| Doing / In Progress | Actually working | 3 |
| Code Review         | Waiting for review | 2 |
| Testing             | QA/Verification | 2 |
| Done                | Completed | — |

**Simple ASCII Board:**

```
Backlog -> Ready -> [Doing (WIP 3)] -> Code Review (WIP 2) -> Testing (WIP 2) -> Done
```

## Workflow Rule Examples

```text
Policy: Pull Condition (Move to Doing Column)
- Card is in the Ready column, and WIP in the Doing column < WIP limit
- Meets the 'Definition of Ready' for the task (Requirements/Test Cases/Design, etc.)
- Confirm availability of necessary resources (Tester/Reviewer)

Policy: Definition of Done (Completion Criteria)
- Code is merged and build is successful
- Passed automated/manual tests
- Deployment (or QA handover) documentation completed
```

**Classes of Service Examples**

- **Expedite**: Process immediately (Highest task priority, WIP exception allowed)
- **Fixed Date**: Needed by a specific date — requires schedule monitoring
- **Standard**: General request
- **Intangible**: Long-term value like technical debt


## Events and Recommended Frequencies

- **Daily Stand-up (Daily, 10~15 mins)**: Flow-centric (share bottlenecks/blockers rather than what you are doing)
- **Replenishment / Backlog Refinement (Weekly or when needed)**: Fill the Ready column — re-prioritize
- **Planning (When needed)**: Breakdown large tasks (Epics) or alternative planning — keep it short.
- **Retrospective (Every 2~4 weeks)**: Process improvement, review WIP limit adjustments
- **Service Delivery Review / Ops Review (Monthly)**: Review SLAs, SLEs, and metrics

> You don't need to strictly schedule all meetings like in Scrum. Introduce meetings when you see **points that disrupt the flow**.


## Estimation · Planning Methods

- **Keep Story Points**: Suitable for teams transitioning from Scrum. Good for predictability against throughput.
- **No Estimates (Skip Estimation)**: Predict using simple card counts + cycle time/throughput.
- **Bucket (Time-based) Planning**: Replenish based on the amount of work (throughput) that can be completed monthly.
- **Recommendation**: Reduce heavy estimation activities and predict using **actual data (cycle time, throughput)**.


## Core Metrics (Definition · Utilization)

- **Lead Time** = The point a card is backlogged (or created) → point of completion
- **Cycle Time** = Work start (Doing) → completion
- **Throughput** = Number of cards completed within a specific period
- **WIP (Average number of tasks in progress)**
- **Cumulative Flow Diagram (CFD)**: Visualizes bottlenecks/flow changes with the cumulative area of each column
- **Service Level Expectation (SLE)**: e.g., 85% of tasks will be completed within 10 days

**Reference Utilization**

- Little’s Law: `WIP = Throughput × Cycle Time` (using average values) — useful for predictions and identifying limits
- Goal: Stabilize cycle time → increase predictability


## From Scrum to Scrumban

1. **Map the current process**: Visualize how work flows
2. **Configure the board**: Start with minimal columns (Ready → Doing → QA → Done)
3. **Set WIP limits**: Start conservatively (e.g., Doing = Number of team members ÷ 2)
4. **Determine replenishment rules**: Decide when to fill Ready from Backlog (Weekly/Threshold)
5. **Collect data**: Collect cycle time/throughput (2~4 weeks)
6. **Iterate adjustments**: Adjust WIP/columns/policies in retrospectives


## Kanban/Scrumban Adoption Checklist

- [ ] Does the board reflect the team's reality?
- [ ] Are WIP limits set and understood by everyone?
- [ ] Are Definition of Ready/Done documented?
- [ ] Is the Replenishment frequency (or rule) set?
- [ ] Does the Daily stand-up focus on bottlenecks?
- [ ] Are cycle time, throughput, and CFD being collected and analyzed?
- [ ] Are Classes of Service and policies defined?
- [ ] Are process changes reflected in regular retros?


## Practical Tips & Best Practices

- **Start small**: Make the board and WIP limits small to get fast feedback.
- **Stop starting — start finishing**: A culture of finishing ongoing work rather than starting new ones.
- **Team discipline upon WIP violation**: Immediate discussion (why it was violated, identifying the bottleneck cause).
- **Visual cues**: Mark blockers/urgent cards with separate colors/stickers.
- **Document policies**: Clearly write down "when to move a card".
- **Automation**: Shorten cycle time with CI/CD and automated tests.
- **Data-driven decision making**: Plan with actual cycle time/throughput rather than estimation.


## Common Mistakes

- Setting WIP limits but not enforcing them
- Maintaining Scrum ceremonies while ignoring WIP/Pull concepts
- Creating classes and using them without criteria (priority confusion)
- Making decisions based on 'feelings' without collecting metrics
- Overcomplicating the board with too many columns/segmentations


## Template: Replenishment Meeting (Simple Agenda)

1. Completed work from the previous week (Brief review) — 5 mins
2. Check Ready column status (Re-prioritize) — 10~20 mins
3. Check current available resources against WIP limits — 5 mins
4. Decide on Pulling new tasks (Fill by priority) — 10~20 mins
5. Share Blockers / Risk factors — 5 mins


## FAQ

**Q. Do sprints disappear completely?**
A. If the team wants, you can maintain short iterations (e.g., 2 weeks) while applying Scrumban principles. The key is flow improvement.

**Q. Should we keep using Story Points?**
A. Not necessarily. Predicting with throughput and cycle time is also widely used. Decide based on team culture and reporting needs.

**Q. How do we set WIP limits?**
A. Start conservatively (based on team size, or estimated from past throughput). Gradually adjust while keeping the limits.


## Application Example

- 5 Team members → Doing WIP = 3 (Limit concurrent work)
- Replenishment : Once a week (Monday)
- Retrospective: Every 2 weeks (Mix of online/offline)
- Metrics: Observe weekly throughput + 4-week cumulative cycle time


## Wrap-up — Starter Guide

1. **Create the board**,
2. **Set WIP limits**,
3. **Document Pull rules and Definitions**,
4. **Collect data (cycle time/throughput) for 2~4 weeks** and **adjust in retros**.
