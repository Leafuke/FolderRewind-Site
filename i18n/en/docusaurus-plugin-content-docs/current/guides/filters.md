---
sidebar_position: 5
title: "Source scope, filters and restore preservation"
description: "Filter files, folders or both, check source scope in the effective file preview, and choose a restore whitelist or one-time preservation."
reviewed_baseline: "1.10-api3.17"
---

# Source scope, filters and restore preservation

Use source scope, backup filters and restore preservation for different tasks: skip caches, capture only documents or keep current files during a restore.

![A filter rule can target files, folders or both.](/img/docs/v1-10-0/filters-110-en-light-1604.webp)

## Set the source scope first

Choose all content or relative Include rules in source settings. Project filters and plugin rules further narrow this scope. Review the effective file list before saving.

## Choose the rule target

Each rule targets files, folders or both. Matching a folder applies the rule to that directory and all its descendants.

| Example | Target | Effect in a blacklist |
| --- | --- | --- |
| `*.tmp` | Files | Exclude matching temporary filenames at any depth |
| `cache` | Folders | Exclude directories named cache and all their contents |
| `./build` | Folders | Exclude the build directory directly under the source root |
| `logs/**` | Files | Exclude matching files beneath logs |
| `cache` | Both | Exclude a matching file, or a matching folder and its descendants |

Name-only rules match names. Rules containing a path are relative to the source root. `*` matches within one path segment, `**` can cross directories and `?` matches one character. For a regular expression, enable the regular-expression option and use the `regex:` prefix and check the effective file preview.

Blacklists exclude matches; whitelists include matches. Existing legacy rules keep their original matching behavior. Preview the result again after editing a rule or changing its target.

## Restore whitelists

A restore whitelist preserves matching current paths during Clean's cleanup stage. When the archive contains the same path, the backup file is written. Overwrite keeps current content outside the archive's coverage; partial captures such as region backups use Overwrite.

## One-time file and directory preservation {/* #restore-preserve-paths */}

KnotLink's `restore_preserve_paths` and the SDK's `RestoreRequestOptions.RestorePreservePaths` let you select files or folders whose current state takes priority for one ordinary restore.

```text
notes.txt,config/
```

Use source-relative paths, a trailing `/` for directories and commas between selections. Selected files keep their current bytes; files currently deleted stay deleted. Additions and deletions inside a selected directory also keep their current state.

An operation accepts up to 16 selectors, with staging limited to 4096 file operations and 64 MiB of current content. Selections stay within the effective managed boundary. Minecraft paths are relative to the unique managed world root. Use explicit file or directory paths here and use backup filters for pattern matching.

These options apply to ordinary Restore and Quick Restore. Checkout and Merge apply the selected branch or merge result. Test the rules with a small set of added, modified and deleted files.

<span id="backup-filter-mode" />
<span id="best-practices" />
<span id="blacklist-backup-stage" />
<span id="examples" />
<span id="faq" />
<span id="old-files-remain-after-restore" />
<span id="regex-rule-is-not-working" />
<span id="related-links" />
<span id="restore-whitelist-clean-restore-stage" />
<span id="supported-matching-methods" />
<span id="three-filter-lists" />
<span id="typical-use-cases" />
<span id="where-to-configure" />
<span id="whitelist-mode-examples" />

<span id="source-scopes-filters-and-restore-whitelists" />
<span id="ordering-and-boundaries" />
<span id="backup-filters" />
<span id="clean-and-restore-whitelist" />
<span id="verify" />
<span id="one-shot-file-and-directory-preservation" />
