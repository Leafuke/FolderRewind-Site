---
sidebar_position: 3
title: "Manage folders and historical bindings"
description: "Add and organize backup sources, edit ranges, rename folders and keep their historical source bindings."
reviewed_baseline: "1.10-api3.17"
---

# Manage folders and historical bindings

Choose a backup project in management to add sources, inspect status and run backups. Each source has a stable identity linking its current directory to history.

![A demonstration source and its actions in management.](/img/docs/v1-9-6/manager-en-light-1604.webp)

*A demonstration source and its actions in management.*

## Add and organize sources

Use Add folder for one directory, subdirectories or plugin discovery results. Check that source and archive locations do not overlap. Add a useful name and description; favorite a source for quick access from home.

When editing its range, choose all content or relative inclusion rules and inspect the effective file preview. Names and paths can change, but another folder with the same name cannot replace source identity.

## Rename a folder

Choose Rename in the source action menu. Review the proposed changes to source directories, archive locations, metadata and configuration references. Resolve naming conflicts before confirming.

The app attempts rollback on failure. If rollback also fails, check path and configuration consistency before another backup or restore. Existing cloud objects and immutable history are not all physically renamed with the local label. Avoid bulk archive renaming in File Explorer.

## Rebind historical sources

When restoring or checking out history, an old source may lack a current path. Confirm its real location and retain the original stable identity when rebinding. Exporting files to another directory is separate from restoring that historical binding.

## Check after saving

After saving, check directories, scope, automation targets and recovery of older versions. Follow permission or disk diagnostics and retry if saving fails.

Minecraft Java sources can open [map preview](/docs/guides/minecraft/world-preview) from their action menu. Ordinary folders can use the [mini window](/docs/guides/mini-window) for everyday backups.

<span id="cloud-objects-are-not-physically-renamed" />
<span id="name-and-conflict-validation" />
<span id="post-rename-checklist" />
<span id="related-links" />
<span id="what-the-transaction-migrates" />
<span id="where-to-rename" />
