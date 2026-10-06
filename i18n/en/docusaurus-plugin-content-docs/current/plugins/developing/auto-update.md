---
sidebar_position: 7
title: "Official Catalog and plugin updates"
description: "Publish catalog entries that bind versions, URLs and hashes, and understand trusted updates, compatibility checks and rollback responsibilities."
reviewed_baseline: "1.9-api3.9"
---

# Official Catalog and plugin updates

Publish catalog entries that bind versions, URLs and hashes, and understand trusted updates, compatibility checks and rollback responsibilities.

## Update authority

FolderRewind1.9 uses the independent Official Catalog. GitHub Releases hosts assets; repository is project metadata, not authority for accepted versions or trust.

The Host matches PluginId, compares SemVer2.0 precedence, and validates the exact Catalog item, Release URL, SHA-256, API/declarations and downloaded package. Publisher signatures and arbitrary custom catalogs are outside v3's initial scope.

## Author workflow

Update product version, build immutable .frplugin/checksum and upload fixed-tag assets. Verify public bytes before submitting a catalog source entry. Catalog CI validates the package and generates public/catalog.v1.json. Document API requirement changes independently of app versions.

## Update transaction

Updates preserve Enabled Intent, drain operations and keep current/previous known-good payloads plus recovery journals. Reject incompatible/static-invalid candidates without executing them. Follow RequiresRestart when reported.

## Manual distribution

Manual packages undergo the same checks and retain Manual provenance. Equal IDs/names cannot confer Official status. Explain maintenance/compatibility and use local install rather than overwriting assemblies.

<span id="notes" />
<span id="recommended-workflow" />
<span id="related-links" />
