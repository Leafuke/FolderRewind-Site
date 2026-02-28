---
sidebar_position: 7
title: Mini Window
description: Lightweight monitoring and quick backup for a single folder
---

# Mini Window

Mini Window is ideal for "work while backing up" scenarios: small window, fast actions, and clear status.

## How to open

1. Enter config management page.
2. Open action menu on target folder row.
3. Click **Mini Window**.

If a Mini Window for this folder already exists, it will be activated instead of opening a duplicate.

## Core capabilities

- Monitor folder change status
- Trigger one-click backup for that folder
- Right-click quick actions: open folder / backup / close
- Global hotkey support for backup on the most recently active Mini Window

## Global hotkey

- Default: `Ctrl+Alt+A`
- Target: most recently focused Mini Window
- Customizable in Settings hotkey list

## Recommended usage

- Enable Mini Window for frequently edited project folders
- Combine with Smart Incremental mode to reduce backup cost
- Trigger one manual backup at each work milestone

## Notes

- Closing Mini Window stops monitoring for that window.
- Global hotkey applies only to the most recently active Mini Window.

## FAQ

### Hotkey does not trigger backup

Confirm:

- At least one Mini Window is open
- Target Mini Window was recently focused
- Hotkey is not occupied by system/other software

### Failed to open Mini Window

Usually related to invalid path or window state issues. Confirm the source folder exists and is accessible.

## Related links

- [Automation](./automation)
- [Backup Modes](./backup-modes)
