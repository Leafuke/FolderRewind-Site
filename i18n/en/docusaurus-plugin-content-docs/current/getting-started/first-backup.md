---
sidebar_position: 2
title: First Backup
description: Create a config and complete your first backup
---

# First Backup

This guide walks through your first verifiable backup workflow. Starting with v1.6.0, you can either create a config manually or create one directly from a template.

## Before you start

- You have completed [installation](./installation)
- You know where the backup destination should be
- You are willing to test the workflow on non-critical data first

## Path A: Create a config manually

1. Click **New Config** on the home page
2. Choose a config type
3. Enter a config name
4. Open the config management page
5. Click **Add Folder** and choose the folder you want to protect

This is the best path if you want to understand the product structure first.

## Path B: Create a config from a template

If you already have reusable rules, or an official template matches your scenario, use this flow:

1. Click **Create from Template** on the home page
2. Pick a local template, or search and import an official one first
3. Confirm the suggested config type
4. Review the auto-discovered source folders
5. Select the folders you actually want to include
6. Create the config

Templates work especially well when:

- you use the same backup policy on multiple devices
- you want to clone the same strategy across multiple projects
- you rely on plugins or known directory structures

## Run your first backup

On the config management page, you can:

- click **Backup All**
- or select one folder and click **Backup This Folder**

After it finishes, open the history view and confirm that a new backup entry was created.

## Validate immediately

After the first backup, do at least one of these:

### Option A: Manual restore test

1. Prepare a test restore directory
2. Pick the backup entry you just created
3. Run a test restore
4. Verify that the restored content matches expectations

### Option B: Run automatic core validation

If you want more than a single-config check, go to Settings and run **Automatic Core Feature Validation**. It covers more important scenarios before you enable long-running automation.

## Template-related next steps

If this config becomes stable, you can:

- save it as a template in config settings
- export the template to a file
- browse and import official templates

See:

- [Templates: Create and Use](../guides/templates)
- [Templates: Share and Import](../guides/template-sharing)

## Next step

- [First Restore](./first-restore)
- [Automation](../guides/automation)
- [Templates: Create and Use](../guides/templates)
