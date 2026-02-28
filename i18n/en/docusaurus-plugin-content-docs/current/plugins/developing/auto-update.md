---
sidebar_position: 7
title: Plugin Auto Update
description: Version release and update strategy based on GitHub Releases
---

# Plugin Auto Update

Publishing plugins to GitHub Releases is recommended for traceable and rollback-friendly version delivery.

## Recommended workflow

1. Update version and changelog.
2. Build and package ZIP release artifact.
3. Create GitHub Release and upload assets.
4. Sync upgrade notes and compatibility statements in docs.

## Notes

- Increase major version for breaking changes.
- If `MinHostVersion` is raised, state it clearly in release title/body.
- Keep several recent stable versions for rollback.

## Related links

- [Packaging and Release](./packaging)
- [Install and Manage Plugins](../using-plugins)
