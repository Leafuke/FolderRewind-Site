---
sidebar_position: 4
title: "Minecraft hot restore and player preservation"
description: "Coordinate Java world saving, exit and restore, choose a target and player preservation, and inspect recovery and re-entry results in a test world."
reviewed_baseline: "1.10-api3.17"
---

# Minecraft hot restore and player preservation

Hot restore coordinates saving and game exit, waits for world files to be released and lets FolderRewind restore the selected content. Prepare the game components and practice once in a test world.

## Choose a target and mode

Select a specific version in history or use `Alt+Ctrl+Z` for Quick Restore to the active branch's unique tip. An already exact match returns `NoChanges`.

Remote RESTORE defaults to Clean; partial captures such as region backups use Overwrite. With `file`, the app prepares the selected historical target and its complete dependencies.

```text
cmd=RESTORE;current_save=true;preserve_player_data=true;from=panel;request_id=restore-001
```

## Preserve player state

Enable `PreservePlayerData` in plugin settings to keep selected NBT fields for every player during ordinary restore: position, orientation, dimension, inventory, ender chest, experience and related state. Players absent from the backup retain their complete current NBT. Statistics and advancements restore from the backup.

Omitting remote `preserve_player_data` inherits the local setting; true or false controls this operation explicitly. Player layouts must be compatible. Follow diagnostics when moving between older layouts and the 26.1 layout.

The app combines target and preserved data in staging before applying. Checkout and Merge use branch results; player preservation here belongs to ordinary Restore.

## Preserve a current file or directory

`restore_preserve_paths` takes relative paths beneath the unique managed world root. A directory ends with `/`. Selected content and current deletions take priority. See [one-time preservation](/docs/guides/filters#restore-preserve-paths) for scope and limits.

```text
cmd=RESTORE;current_save=true;restore_preserve_paths=data/local.dat,datapacks/;preserve_player_data=false;from=panel;request_id=restore-preserve-001
```

## Check restore and re-entry

Review file recovery and game re-entry separately in the [notification center](/docs/guides/notifications). If re-entry fails, check the game environment; file recovery remains recorded in the details. Complete requested recovery steps before entering the world.

Test multiple players, explicit preservation disable, missing players, cancellation and re-entry on a copy. Bedrock uses ordinary file restore with the game closed.

<span id="common-failure-points" />
<span id="execution-flow" />
<span id="prerequisites" />
<span id="related-links" />
<span id="requestresponse-examples" />
<span id="restore-latest" />
<span id="restore-specified-backup" />
<span id="safety-recommendations" />
<span id="sequence-text" />
<span id="source-mapping" />
<span id="state-machine" />
<span id="trigger-methods" />
<span id="typical-final-states" />

<span id="host-owned-restore" />
<span id="target-and-apply-mode" />
<span id="player-preservation" />
<span id="completion-and-recovery" />
<span id="one-shot-path-preservation" />
