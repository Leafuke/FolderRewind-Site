---
sidebar_position: 0
title: "Architecture overview"
description: "Explore the FolderRewind stack and trace UI orchestration through configuration, history, plugins and archives."
reviewed_baseline: "development-1.10"
---

# Architecture overview

> This page describes the 1.10 development layout; it does not announce a released version.

FolderRewind uses .NET 10 and WinUI 3. The exact SDK and package versions are declared by global.json, project files and central package version configuration in the source checkout.

```mermaid
flowchart TD
  UI[Views / ViewModels] --> Host[Host application orchestration]
  Host --> Core[Core: History and headless policies]
  Host --> Runtime[Plugin Runtime]
  Core --> Runtime
  Runtime --> API[Plugin Abstractions]
  Core --> Storage[Windows file safety / archive and replica interfaces]
```

The Host owns configuration persistence, scheduling, notifications and platform adapters. Core receives explicit inputs, service instances and cancellation tokens and returns results and diagnostics; it does not resolve application globals. Plugins own domain semantics and cannot bypass Host transactions, integrity checks or target-directory mutation.

Production Core and ordinary tests share a compilation boundary. Recovery acceptance uses an isolated build of the same project; shipping artifacts exclude test fault hooks. Core is an internal library, not another public plugin SDK.

See [directories](/docs/architecture/directory-structure), [patterns](/docs/architecture/patterns), [services](/docs/architecture/services), [models](/docs/architecture/data-models) and [plugin boundaries](/docs/architecture/plugin-system).

<span id="tech-stack" />
<span id="architecture-birds-eye-view" />
<span id="documentation-navigation" />
