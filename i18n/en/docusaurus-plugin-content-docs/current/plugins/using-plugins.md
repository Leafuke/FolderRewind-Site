---
sidebar_position: 2
title: "Installing and managing plugins"
description: "Install plugins from the official catalog or local packages, check runtime status and settings, then update, roll back or uninstall."
reviewed_baseline: "1.9-api3.9"
---

# Installing and managing plugins

Install plugins from the official catalog or local packages, check runtime status and settings, then update, roll back or uninstall.

![Plugin management shows bundled MineRewind 1.9.8; check the separate public package independently.](/img/docs/v1-9-6/plugins-en-light-1604.webp)

*Plugin management shows bundled MineRewind 1.9.8; check the separate public package independently. Interface version: 1.9.6.*

## Official Catalog

Open plugin management/store in Settings. Review product, version, API, provenance, requested services and artifact hash, then install. New installs are disabled; explicit Enable runs ActivateAsync. Persisted intent and runtime state are distinct.

## Local install

Obtain a trusted `.frplugin` and checksum, verify SHA-256 and use local install. Root manifest.json, declared settingsSchema and entry assembly are required. Old nested ZIPs and bundled Abstractions are rejected. Static checks do not prove code safety.

## Settings and transitions

The Host renders typed settings and rejects invalid types. Check activation diagnostics. Disable removes routing, drains and cleans up; timeouts can require restart, without guaranteeing immediate physical unload. Safe Mode preserves Enabled Intent without running plugins. Corrupt configuration enters Recovery Center.

## Updates and rollback

Automatic updates use Catalog-bound version/URL/SHA-256/manifest, not arbitrary downloads from self-reported Repository. Manual/Official provenance remains distinct; equal names/IDs do not prove trust.

Versioned installs maintain current/previous known-good payloads and recovery journals. Use UI update/rollback after stopping affected work, never replace DLL directories directly. Older plugins may not read current state/artifacts.

## Uninstall

Capabilities drain before transactional code/optional private-data quarantine and configuration removal. User backup history is not plugin private data. Review materializer requirements before uninstall. Let startup recovery handle interruptions; do not empty transaction directories manually.

## Troubleshooting

Check API major/minor, architecture, entry type, schema/declarations, activation diagnostics, RequiresRestart and Kind availability. Downloaded, Installed, Enabled Intent and Active are separate facts.

<span id="1-install-from-plugin-marketplace" />
<span id="2-local-zip-install" />
<span id="enable-and-disable" />
<span id="faq" />
<span id="installation-failed" />
<span id="installation-methods" />
<span id="plugin-installed-but-feature-is-missing" />
<span id="related-links" />
<span id="upgrade-and-rollback" />
