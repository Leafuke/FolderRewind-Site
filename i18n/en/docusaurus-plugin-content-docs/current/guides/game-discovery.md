---
sidebar_position: 20
title: "Automatic game-save discovery Beta"
description: "FolderRewind 1.9 automatic game-save discovery beta: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Automatic game-save discovery Beta

![Discovery Beta initial page,1.9.2.0/API3.5 Chinese candidate; no network scan](/img/docs/v1-9/discovery-candidate.png)

*Discovery Beta initial page,1.9.2.0/API3.5 Chinese candidate; no network scan.*


## What discovery means

Definitions describe paths, not installation proof. Windows Steam/GOG/Epic supply evidence; Ludusavi primary, manually selected secondary manifests and local overrides describe resources. Registry resources can be unsupported; registry backup/Heroic/Lutris are outside current Windows Beta scope.

Opening the page makes no network request. Explicitly download/update inputs, select roots/stores/accounts and scan. Inspect per-root diagnostics; valid cache can survive network failures, but corrupt inputs must not appear as healthy empty output.

## Review and create

A game can contain multiple provider Backup Sets. Selecting resources/presets creates drafts for review, not automatic persistent configs. MineRewind instances can become independent configs.

Steam defaults to the most recent account; other accounts/wildcard fallbacks remain visible but unselected. Check paths/resources/scope and broad-root warnings. Source/destination overlap blocks. Single-shot save failure preserves config/review baseline.

## Source scope

All or validated relative Include globs define directory/file-set boundaries. Config filters/plugin policies can only narrow them. Complete capture within a source boundary does not mean the entire physical root.

## Rediscovery

Three-way review compares last-reviewed upstream baseline, current user config and new candidates, preserving user changes by default. Identity is provider + DefinitionId + SetId, not display title. Upstream changes, narrowing and conflicts need review.

## Acceptance

Exercise scan/account selection/create, scope edits, single-source backup, review conflicts/cancellation and attribution. Discovery knowledge does not elect runtime Kind ownership.


