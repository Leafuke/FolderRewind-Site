---
sidebar_position: 6
title: "Plugin System v3 architecture"
description: "Trace plugins from static validation through activation, committed capabilities, invocation, draining and recovery, including maps, merging and artifacts."
reviewed_baseline: "1.10-api3.17"
---

# Plugin System v3 architecture

## Installation and activation

The public SDK supplies BCL-only Abstractions, with API 3.x sharing assembly identity `3.0.0.0`. The manifest declares kinds, API, capabilities, services, settings, artifacts and merge policies.

Installation checks paths, limits, settings and PE metadata. Enabling reads activation snapshots and registers capabilities. The Host validates and atomically commits state before exposing an Active session.

## Routing and ownership

Kind owners supply runtime domain capabilities. Discovery returns drafts; Reconciliation returns revision-bound proposals. The Host owns configuration commits, history, retention, cloud, encryption, integrity and destination changes.

Artifact transforms propose new graph nodes; materializers write isolated workspaces. SpatialPreview, SpatialComparison and SpatialScopeSelection handle read-only inputs and scope parameters. MergeProvider analyzes and builds; the Host persists plans and decisions and applies the result.

## Lifecycle and recovery

Invocations hold capability leases and observe operation and lifetime cancellation. Disabling revokes routes, cancels and drains work, then runs bounded Deactivate. Resources retained for restart are reported as RequiresRestart.

Versioned installations keep known-good payloads and transaction journals for interrupted-operation recovery. Safe Mode retains enabled choices while pausing execution.

Plugins run with current-user process permissions. AssemblyLoadContext isolates dependencies. The Catalog binds official artifacts and declarations, while manifest requests and Host gates control formal services.

See all 19 capabilities in the [API reference](/docs/plugins/developing/plugin-api) and package details in [packaging](/docs/plugins/developing/packaging).

<span id="backup-and-restore-extensions" />
<span id="interface-map" />
<span id="knotlink-subsystem" />
<span id="layout-and-isolation" />
<span id="lifecycle" />
<span id="related-links" />

<span id="static-packages-and-sessions" />
<span id="ownership" />
<span id="trust-and-cancellation" />
