---
sidebar_position: 12
title: KnotLink Integration
description: How MineBackup communicates with the in-game companion mod via handshake, events, and commands
---

# KnotLink Integration

MineBackup communicates with the in-game companion mod through KnotLink, commonly used for hot backup and hot restore scenarios.

You can think of it as a "bridge bus between the main program and the game process."

## Key Handshake

- The main program initiates a `handshake`
- The companion mod returns version information
- The main program checks minimum compatible version

If the handshake or version check fails, subsequent hot links will typically degrade or fail outright.

## Common Collaboration Events

- `pre_hot_backup`
- `pre_hot_restore`
- `restore_finished` / `restore_success`
- `rejoin_world`

Typical hot restore loop:

1. Main program sends `pre_hot_restore`
2. Companion mod saves and exits the world
3. Main program performs the restore
4. Main program sends `rejoin_world`
5. Companion mod returns the rejoin result

## Usage Boundaries

- Communication timeouts will interrupt the flow
- Version incompatibility will degrade or reject critical links
- It is recommended to rehearse the "backup -> restore -> rejoin" loop first

## Troubleshooting Tips for Integration

- First verify that basic backup/restore works without integration mode
- Then verify the handshake and version compatibility
- Finally verify the full hot link loop

Do not mix "basic feature failures" and "integration failures" in the same troubleshooting session -- it will significantly slow down diagnosis.

If you want to know more about the Minecraft-side command details, continue reading [MineBackup Mod In-Depth](../minecraft/minebackup-mod).
