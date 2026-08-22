---
title: "Technical Glossary"
description: "Core terminology definitions for SyncETA: Record, Scenario, Collection, Story, Dataset, MCP, Visual Regression, and Self-Healing."
sort: 1200
---

# Technical Glossary

Standard terminology definitions used across the SyncETA platform.

---

### Record
The atomic execution unit capturing browser interactions. Stores timestamp, coordinates, XPath, CSS selectors, and DOM node metadata.

### Scenario
An ordered sequence of records representing an end-to-end user journey, including wait conditions, assertions, and recovery scripts.

### Collection
A test suite grouping multiple scenarios for sequential or parallel batch execution.

### Story
A flowchart-based workflow chaining multiple scenarios within a persistent browser session.

### Dataset
A tabular key-value repository used to parameterize scenario inputs for Data-Driven Testing.

### Playwright MCP
A distributed execution engine exposing browser automation tools through the Model Context Protocol (MCP) standard.

### Visual Regression AI
Perception-based layout inspection analyzing element overlap, text clipping, and responsive UI integrity.

### Self-Healing
An automated recovery mechanism that visualizes broken DOM selectors and proposes updated paths under Human-in-the-Loop governance.

### Air-Gapped Deployment
An enterprise on-premises installation operating within fully isolated internal networks with local LLM/Vision model endpoints.
