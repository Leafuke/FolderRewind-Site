---
sidebar_position: 3
title: "Templates and Backup Presets"
description: "Save a verified backup policy as a preset, create projects from discovery results, and review plugin and environment dependencies."
reviewed_baseline: "1.9-api3.9"
---

# Templates and Backup Presets

Save a verified backup policy as a preset, create projects from discovery results, and review plugin and environment dependencies.

A Backup Preset is reusable policy, not installed-game evidence or a saved configuration.1.9 uses Backup Preset V2 with legacy import compatibility; do not apply old1.8 Envelope restrictions to every new preset.

## Save and create

Save a validated config as a template with name/author/description, checking compression, scopes, filters and automation. Inspect inferred paths/Kind on import. Home template creation or discovery plus preset produces drafts for Host-reviewed persistence.

## Provider targeting

V2 can reference a provider DefinitionId to choose discovery sets. Definitions differ from Backup Sets; presets do not redefine installation proof, discovery identity or runtime ownership. API3.0 discovery without DefinitionCatalog remains compatible but lacks targeted-definition participation.

## Dependencies and maintenance

Inspect missing/disabled/incompatible plugin diagnostics and explicitly confirm behavior. Do not assume silent Default fallback retains specialized protection. Preview before batch creation and recheck scope/mode/retention after upgrades.

Template management supports inspect/edit/copy/delete/path preview. Remove private paths/credentials/nonportable state before [sharing](/docs/guides/template-sharing).


## Minecraft Enhanced Experience preset

In 1.9.6, the preset checks for and reuses a compatible KnotLink Service. When installation is needed, it downloads, verifies and launches the installer after confirmation, then checks readiness and connection. Installation, service readiness and actual game integration are separate steps. Keep diagnostics and resolve failed dependencies before continuing.

<span id="build-templates-from-proven-configs" />
<span id="create-a-config-from-a-template" />
<span id="how-path-rules-help" />
<span id="manage-local-templates" />
<span id="re-check-templates-after-major-upgrades" />
<span id="recommended-workflow" />
<span id="related-links" />
<span id="save-the-current-config-as-a-template" />
<span id="template-first-automate-later" />
<span id="templates-and-plugins" />
<span id="when-templates-are-useful" />
