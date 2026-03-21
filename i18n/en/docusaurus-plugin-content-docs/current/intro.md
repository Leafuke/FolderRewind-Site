---
sidebar_position: 0
title: Quick Start
description: Get started with FolderRewind in 5 minutes
---

# Quick Start

Welcome to **FolderRewind (Backup Time Machine)**. It is a modern backup tool for important files, project data, and game saves, and also the successor to MineBackup.

:::caution About the English docs
The current English documentation is AI-translated and may contain inaccuracies. Please double-check key details before applying them in production.
:::

:::caution v1.6.0 upgrade notice
If you are upgrading from an older version, run several backup-and-restore drills in a test directory before relying on the new version in production.
:::

## What FolderRewind now helps with

FolderRewind can help you:

- create versioned, optionally encrypted backups with the **7-Zip engine**
- manage long-running history with **smart incremental chains, chain-length control, and safe delete**
- use **automatic core feature validation** to verify that backup, restore, safe delete, and related workflows work correctly on the current machine
- create and reuse **config templates** that preserve backup policy, filters, and path rules
- use **template sharing, importing, and official template search** to deploy the same setup across devices or users
- configure a **GitHub mirror source** for side-loaded builds to improve update checks and online template access
- extend the app through the **plugin system**, especially for scenarios like Minecraft

## Start in 3 steps

### Step 1: Install

Install from Microsoft Store first, or see the [Installation Guide](./getting-started/installation) for side-loading.

> Do not install the Store build and the side-loaded offline build at the same time.

<a href="https://apps.microsoft.com/detail/9nwsdgxdqws4" target="_blank">
  👉 Install from Microsoft Store
</a>

### Step 2: Create a config

You now have two common paths:

1. Click **New Config** and create a config manually
2. Click **Create from Template** and apply an existing template directly

If you already have a stable setup, you can also **save the current config as a template** in config settings.

### Step 3: Run a first backup and validate

After opening the config management page:

1. add the folders you want to protect, or confirm the folders found by the template
2. run one manual backup
3. immediately do a test restore, or run **Automatic Core Feature Validation** from Settings

This helps catch environment, path, permission, or toolchain issues early.

## Important new capabilities in v1.6.0

### Template workflow

v1.6.0 adds a complete template workflow:

- save a config as a template
- create a config from a template
- export a template to a file
- import a shared template
- search and import official templates
- prepare a template share package or submit directly to GitHub

If you maintain multiple similar configs, this can remove a lot of repeated setup work.

### Automatic core feature validation

Settings now includes **Automatic Core Feature Validation**. It creates a temporary workspace and validates:

- initial full backup
- no-change skip
- smart incremental backup
- shared-lock backup
- clean restore and overwrite restore
- safe delete
- keep-count pruning

This is especially useful after upgrading, changing machines, or before enabling unattended automation.

## Next steps

- [Installation Guide](./getting-started/installation)
- [First Backup](./getting-started/first-backup)
- [First Restore](./getting-started/first-restore)
- [Templates: Create and Use](./guides/templates)
- [Templates: Share and Import](./guides/template-sharing)
- [Automation](./guides/automation)
