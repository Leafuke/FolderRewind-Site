---
sidebar_position: 2
title: Install and Manage Plugins
description: How to install, enable, upgrade, and troubleshoot plugins in FolderRewind
---

# Install and Manage Plugins

This page is for everyday users who want stable plugin usage.

## Installation methods

## 1) Install from plugin marketplace

1. Open **Plugin Management** in FolderRewind.
2. Select the target plugin and install.
3. Restart the app when prompted.

## 2) Local ZIP install

1. Download plugin package (usually `.zip`).
2. In Plugin Management, choose **Local Install**.
3. Select ZIP file and finish import.

> Plugin ZIP should include `manifest.json` and entry assembly (for example `MineRewind.dll`).

## Enable and disable

- When enabled, plugin is loaded at app startup and runs `Initialize`.
- When disabled, plugin no longer participates in discovery, backup hooks, or command extensions.

## Upgrade and rollback

- Prefer upgrade entry provided by plugin page.
- Run one manual backup before upgrading.
- If upgrade is unstable, roll back to previous stable version and restart app.

## FAQ

### Installation failed

- Check ZIP structure (top folder + `manifest.json`).
- Check whether plugin `MinHostVersion` is higher than current host version.

### Plugin installed but feature is missing

- Confirm plugin is enabled.
- Confirm prerequisite conditions are met (for example MineRewind requires recognizable Minecraft directory structure).

## Related links

- [Plugin System Overview](./overview)
- [Plugin Development Quick Start](./developing/quick-start)
- [Minecraft Guide](../guides/minecraft/overview)
