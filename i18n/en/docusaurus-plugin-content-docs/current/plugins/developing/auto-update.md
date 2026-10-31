---
sidebar_position: 7
title: "Official Catalog and plugin updates"
description: "Publish catalog entries that bind versions, URLs and hashes, and understand trusted updates, compatibility checks and rollback responsibilities."
reviewed_baseline: "1.10-api3.17"
---

# Official Catalog and plugin updates

Publish catalog entries that bind versions, URLs and hashes, and understand trusted updates, compatibility checks and rollback responsibilities.

## Update authority

The independent official Catalog supplies fixed versions and artifact declarations. GitHub Releases hosts those assets, and the repository field links to the project.

The Host matches PluginId and compares SemVer 2.0 precedence. Download and installation verify exact URLs, SHA-256, API, architectures and declarations. Follow the publication steps below.

## Author workflow

Update product version, build immutable .frplugin/checksum and upload fixed-tag assets. Verify public bytes before submitting a catalog source entry. Catalog CI validates the package and generates public/catalog.v1.json. Document API requirement changes independently of app versions.

## Update transaction

Updates preserve Enabled Intent, drain operations and keep current/previous known-good payloads plus recovery journals. Reject incompatible/static-invalid candidates without executing them. Follow RequiresRestart when reported.

## Manual distribution

Manual packages undergo the same checks and retain Manual provenance. Equal IDs/names cannot confer Official status. Explain maintenance/compatibility and use local install rather than overwriting assemblies.

<span id="notes" />
<span id="recommended-workflow" />
<span id="related-links" />
