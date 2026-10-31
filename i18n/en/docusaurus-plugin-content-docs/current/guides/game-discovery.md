---
sidebar_position: 20
title: "Game save discovery Beta"
description: "Scan common Windows game save locations, choose resources by game and backup set, review accounts and scope and create a project with a preset."
reviewed_baseline: "1.10-api3.17"
---

# Game save discovery Beta

Game discovery helps you find common save locations and choose what to protect. Open the page, prepare manifests and start a scan.

## Prepare and scan

Download or update the Ludusavi manifest, or use a valid saved manifest and local overrides. Windows Beta combines Steam, GOG and Epic installation information with resource rules to locate saves.

Choose stores, accounts and scan locations, then review per-root diagnostics. Steam selects the most recent account by default; expand other accounts to inspect them. Registry resources display support status; current backups focus on file resources.

## Review and create

1. Choose games and backup sets, then inspect each source and resource.
2. Check accounts, full paths and scope and choose a suitable backup preset.
3. Enter a project name and backup destination, review the summary and create.

Each source can cover a whole directory or relative Include patterns. Project filters and plugin policy narrow that scope. Use the effective file preview before saving.

## Discover again

Rescanning compares the last reviewed result, current configuration and new candidates, preserving manual edits by default. Review moved paths, added resources and scope reductions before saving project changes.

## Minecraft and custom locations

Minecraft creation can discover saves directly using known launchers and remembered roots. Select portable or custom locations manually and confirm each draft's Java/Bedrock kind. See [Minecraft quick start](/docs/guides/minecraft/quick-start).

After creating a project, complete a backup and test restore before setting up [automation](/docs/guides/automation).

<span id="automatic-game-save-discovery-beta" />
<span id="what-discovery-means" />

<span id="source-scope" />
<span id="rediscovery" />
<span id="acceptance" />
<span id="staged-confirmation-in-193" />
