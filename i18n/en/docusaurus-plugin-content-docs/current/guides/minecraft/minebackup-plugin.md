---
title: MineBackupPlugin (Spigot/Paper Integration)
description: FolderRewind/MineBackup backup, hot restore, and Sidecar handoff for Spigot and Paper dedicated servers
---

# MineBackupPlugin (Spigot/Paper Integration)

MineBackupPlugin is the integration path for Minecraft servers outside the mod-loader ecosystem. It targets Spigot, Paper, and servers compatible with the Bukkit/Spigot API. The plugin does not store backups itself: it saves worlds, asks MineBackup or FolderRewind to create backups through KnotLink, and hands stopped-server file release over to a pure-JDK Sidecar during restore.

:::warning It is not a standalone backup program
The host application, the Minecraft-side integration, and a working KnotLink service must still be running. The plugin cannot create or restore archives by itself.
:::

## Support scope

| Item | Current baseline |
| --- | --- |
| Server | Spigot, Paper, and Bukkit/Spigot-compatible servers |
| Minecraft | 1.21.1–26.2 |
| Java | Java 21 bytecode; the same JAR can run on Java 25 for Minecraft 26.2 servers |
| FolderRewind | 1.16.0 or newer |
| Permission | OP owns `minebackup.command` by default |

Use the [MineBackupPlugin releases](https://github.com/Leafuke/MineBackup-Plugin/releases) or [Modrinth page](https://modrinth.com/plugin/minebackupplugin) as the final source for downloadable versions and compatibility.

## Prerequisites and installation

Prepare:

1. The MineBackup or FolderRewind host application.
2. If you use FolderRewind, MineRewind and a Minecraft save target.
3. A KnotLink service; on Windows it must be allowed to provide the local communication endpoint.
4. A MineBackupPlugin JAR matching the server version.

Install it as follows:

1. Put the JAR in the server's `plugins` directory.
2. Start the server once so it generates `plugins/MineBackupPlugin/config.yml`.
3. Verify that the host application, Minecraft integration, and KnotLink are running.
4. Run `/mb status` to inspect connection, current operation, auto-save, and Sidecar state.

The plugin supports `zh_cn` and `en_us`. Console messages use `default-language`; with `follow-player-locale` enabled, player messages follow the client language when possible.

## Command reference

All commands require `minebackup.command` by default.

| Command | Purpose |
| --- | --- |
| `/mb help` | Show help |
| `/mb status` | Show KnotLink, current operation, auto-save, scheduler, and Sidecar state |
| `/mb save` | Save all players and all loaded worlds |
| `/mb backup [comment]` | Back up the current world with an optional comment |
| `/mb restore [backup-file]` | Restore the current world from a file or the latest archive |
| `/mb confirm` | Submit a restore countdown immediately |
| `/mb stop` | Cancel a restore countdown before submission |
| `/mb list configs` | List FolderRewind configurations |
| `/mb list folders <config-id>` | List folders under a configuration |
| `/mb list backups <config-id> <folder>` | List archives for a target |
| `/mb target backup <config-id> <folder> [comment]` | Back up a non-current-world target |
| `/mb auto start <minutes>` | Start scheduled backups for the current world |
| `/mb auto stop` | Stop scheduled backups |
| `/mb reload` | Atomically reload plugin configuration |

Use double quotes for folders, filenames, or comments containing spaces. Double quotes and backslashes can be escaped with `\`. Every restore must pass through the current-world operation gate; arbitrary target restore is not supported.

## Default configuration

The first launch creates `config.yml`:

```yaml
# MineBackupPlugin 3 configuration
config-version: 2

general:
  debug: false

localization:
  # zh_cn or en_us. Console and non-player messages use this language.
  default-language: zh_cn
  # Each player receives messages in their Minecraft client language when possible.
  follow-player-locale: true

backup:
  freeze-timeout-seconds: 180

restore:
  countdown-seconds: 10

dedicated-restore:
  # SIDECAR or DISABLED
  mode: SIDECAR
  # Empty: discover exactly one start.bat/start.cmd/run.bat/run.cmd or start.sh/run.sh.
  restart-script: ""
  sidecar-start-timeout-seconds: 5
  world-release-timeout-seconds: 8
  operation-timeout-seconds: 3600

auto-backup:
  # 0 disables automatic current-world backups.
  interval-minutes: 0

logging:
  enabled: true
  max-size-mib: 10
  retained-files: 5
```

When upgrading from 2.x, the plugin does not guess a migration. It saves the old file as `config-v1-backup-time.yml` and creates a new `config-version: 2` configuration.

## Hot backup

Before an external backup starts, the plugin coordinates a safe save:

1. Save all players and loaded worlds.
2. Freeze auto-save during the backup window to avoid concurrent writes.
3. Let the host application run the backup.
4. Unfreeze auto-save after the backup completes.

Auto-save freezing has a timeout fallback. Even so, check `/mb status` after an abnormal operation.

## Dedicated-server restore and Sidecar

`dedicated-restore.mode` defaults to `SIDECAR`. The restore flow is:

1. Validate the unique restart script, session directory, and current operation state.
2. Save every player and loaded world, then write the handoff state.
3. Start the pure-JDK Sidecar; only after it subscribes to KnotLink does the plugin kick players and shut down normally.
4. The Sidecar waits for the parent JVM to exit and repeatedly confirms that world files are released.
5. It runs the restart script once only after receiving an explicit success, failure, or cancellation terminal state from the host.

Disconnects, timeouts, and unknown terminal states become uncertain outcomes. The server stays offline rather than treating silence as success.

:::danger Do not let two restart managers race
Do not enable a panel or wrapper's “restart immediately after process exit” behavior at the same time. It can start the server while FolderRewind is still writing restored files.
:::

The plugin does not automatically reconnect kicked players. After a successful restore, the Sidecar only starts the configured script; players reconnect manually after the server is ready.

## When KnotLink is unavailable

- The plugin still loads and keeps trying to reconnect.
- `/mb save` can still save the current server worlds.
- Commands that depend on the host return communication errors.

Start troubleshooting with `/mb status` and verify the host, KnotLink, and plugin operation states before retrying backup or restore.

## Related integration components

- [Minecraft Guide Overview](/en/docs/guides/minecraft/overview): choose a mod-loader or Spigot/Paper deployment.
- [MineBackup Integration Mod](/en/docs/guides/minecraft/minebackup-mod): the in-game bridge for modded servers.
- [Death Rewind](/en/docs/guides/minecraft/death-rewind): the singleplayer death-screen rewind extension.
- [Just Enough Accidents](/en/docs/guides/minecraft/just-enough-accidents): the accident detection extension.
- [KnotLink and Integration Mod](/en/docs/guides/minecraft/knotlink-mod): protocol and hot-flow details.

Run a full “backup → restore → restart → manual reconnect” drill on a test server before relying on this in production.
