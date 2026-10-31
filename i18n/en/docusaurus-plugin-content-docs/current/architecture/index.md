---
sidebar_position: 0
title: "Architecture overview"
description: "Explore Host, Core, plugin Runtime and public contracts, following WinUI requests through backups, history, cloud replicas and domain capabilities."
reviewed_baseline: "1.10-api3.17"
---

# Architecture overview

FolderRewind uses .NET 10 and WinUI 3. Project files, `global.json` and central package configuration declare the actual build dependencies.

```mermaid
flowchart TD
  UI[Views / ViewModels] --> Host[Host orchestration]
  Host --> Core[Core history and file policy]
  Host --> Runtime[Plugin Runtime]
  Core --> Runtime
  Runtime --> API[Plugin Abstractions]
  Core --> Storage[Windows file safety and archive interfaces]
```

The Host handles configuration, scheduling, notifications, platform and lifecycle adaptation. Core accepts explicit inputs and dependencies, performs capture, history, recovery, merging, retention and replica algorithms, and returns results and diagnostics.

Plugins provide domain capabilities through independent Abstractions contracts. Runtime manages installation, activation, routing, invocation leases and scoped Artifact services. The Host orchestrates destination writes, transactions, integrity, encryption and cloud operations.

Core targets Windows independently of WinUI. Ordinary tests reference production Core; recovery tests use isolated output and an explicit fault-injection configuration. Public Abstractions is the plugin development entry point.

Continue with [directories](/docs/architecture/directory-structure), [patterns](/docs/architecture/patterns), [services](/docs/architecture/services), [data models](/docs/architecture/data-models) and [plugin architecture](/docs/architecture/plugin-system).

<span id="tech-stack" />
<span id="architecture-birds-eye-view" />
<span id="documentation-navigation" />
