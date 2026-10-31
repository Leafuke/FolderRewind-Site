---
sidebar_position: 2
title: "Install and manage plugins"
description: "Install plugins from the official catalog or a local package, review services and runtime settings, and manage updates, rollback and removal."
reviewed_baseline: "1.10-api3.17"
---

# Install and manage plugins

Open plugin management in Settings to review installed plugins, change settings or add extensions. MineRewind comes with the app; install other plugins as needed.

## Install from the official catalog

Open the plugin store, select a plugin and review its features, author, version, API compatibility and requested services. Install it, enable it and check its runtime state. New installations start disabled; enabling runs the plugin code.

## Install a local package

Download a `.frplugin` and matching SHA-256 file from a trusted author, verify the checksum and choose Local install. The app checks package structure, declarations, settings and entry metadata.

Current packages place `manifest.json`, the settings schema and entry DLL at the root. Authors of older v2 plugins provide compatible packages; see [plugin migration](/docs/plugins/developing/migration-v2-v3).

## Settings and runtime state

Select a plugin, edit its settings and save. Check runtime state and diagnostics and prepare required services. Follow `RequiresRestart` when shown. Safe Mode retains the enabled choice while pausing plugin execution.

Plugin code runs with current-user permissions. Consider its source and service declarations when choosing extensions.

## Update and roll back

Official updates use fixed versions, download URLs, SHA-256 values and declarations from the Catalog. Finish affected tasks, then update through plugin management. The app keeps current and previous known-good payloads for rollback through the interface.

Manually distributed packages are recorded as Manual. Continue maintaining them through the author's packages and the management interface. Before rolling back, check compatibility with settings and backup formats already in use.

## Uninstall

Review the code, settings and optional private data in the uninstall preview. Backups and history remain in the app. Recovering versions in plugin-specific formats still requires a matching materializer.

Restart to finish recovery after an interrupted uninstall. If a feature is missing, check runtime state, API, architecture, settings, services and source kind, then read plugin diagnostics and logs.

<span id="1-install-from-plugin-marketplace" />
<span id="2-local-zip-install" />
<span id="enable-and-disable" />
<span id="faq" />
<span id="installation-failed" />
<span id="installation-methods" />
<span id="plugin-installed-but-feature-is-missing" />
<span id="related-links" />
<span id="upgrade-and-rollback" />

<span id="installing-and-managing-plugins" />
<span id="official-catalog" />
<span id="local-install" />
<span id="settings-and-transitions" />
<span id="updates-and-rollback" />

<span id="troubleshooting" />
