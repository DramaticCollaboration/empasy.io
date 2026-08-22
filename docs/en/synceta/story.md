---
title: "Story Workflow Studio (Flowchart Chaining)"
description: "Chain multiple test scenarios using an interactive flowchart canvas and preserve browser session state across steps."
sort: 600
---

# Story Workflow Studio (Flowchart Chaining)

A **'Story'** visually connects individual scenarios on a flowchart canvas to run complex end-to-end user journeys within a single persistent browser session.

---

## 1. Key Features

- **Persistent Session State**: Maintains login cookies and local storage across chained scenarios.
- **Tab Aliasing**: Distinguishes and switches focus across multiple browser tabs or popup windows.
- **Range Control**: Specifies starting and ending steps for each chained node.

---

## 2. Story Construction

1. Navigate to **'Stories'** ➔ Create new canvas.
   ![New Story](./image/story/newstory.png)
2. Drag scenarios from the side drawer onto the canvas.
   ![Drag Scenario](./image/story/newstory2.png)
3. Assign tab aliases to manage multi-window contexts.
   ![Tab Alias](./image/story/5.png)
   ![Apply Alias](./image/story/6.png)
4. Connect node ports to define execution paths.
   ![Connect Nodes](./image/story/3.png)
5. Refine step boundaries per node.
   ![Step Range](./image/story/4.png)
