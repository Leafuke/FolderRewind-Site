---
sidebar_position: 2
title: "Architecture patterns and transaction boundaries"
description: "Understand MVVM, explicit dependencies and transaction boundaries for cancellable operations and reliable state commits."
reviewed_baseline: "1.10-api3.17"
---

# Architecture patterns and transaction boundaries

The UI retains MVVM. ViewModels own presentation state and asynchronous commands; view code bridges UI events. I/O, transactions and recovery belong to their services.

Core retains domain behavior and algorithms while the Host supplies dependencies at composition boundaries. Interfaces or callbacks are introduced for concrete dependencies, without a new global service locator. Explicit callbacks deliver diagnostics to the Host; existing operation-scoped diagnostics still record measurements and counters.

Ordinary tests reference production Core rather than recompiling its source files. Remaining source-linked Host presentation or adapter code has an explicit inventory; types moved to Core must not be linked again. Fault-injection tests and process probes use isolated outputs that cannot contaminate normal builds.

Review file moves separately from behavior changes. Preserve lock ordering, cancellation, disposal, serialization fields and compatibility. Structural cleanup does not authorize changing those semantics.

<span id="mvvm-pattern" />
<span id="static-service-architecture" />
<span id="shell-navigation-pattern" />
<span id="configuration-driven-design" />
<span id="partial-class-organization" />
<span id="serialization-strategy" />
