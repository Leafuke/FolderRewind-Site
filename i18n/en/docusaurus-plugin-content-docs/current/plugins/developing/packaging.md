---
sidebar_position: 6
title: "Plugin packaging and publishing"
description: "Package .frplugin with a static manifest, validate assemblies, capabilities and settings schemas, and publish verifiable artifacts."
reviewed_baseline: "1.9-api3.9"
---

# Plugin packaging and publishing

Package .frplugin with a static manifest, validate assemblies, capabilities and settings schemas, and publish verifiable artifacts.

## Package layout

```text
MyPlugin-1.0.0.frplugin
├─ manifest.json
├─ settings.schema.json
├─ MyPlugin.dll
└─ private-dependency.dll
```

Files go directly at the ZIP container root. Do not bundle FolderRewind.Plugin.Abstractions.dll; the Host shares assembly identity3.0.0.0. Private dependencies may be bundled. Use the [buildable sample packer](/docs/plugins/developing/quick-start), not the old nested ZIP rule.

## Manifest

manifestVersion=3; pluginId is a stable reverse-domain ID; version uses strict SemVer; pluginApi has major/minor. entryAssembly/settingsSchema use canonical relative paths and entryType is fully qualified. Names/localizations, configKinds, requestedHostServices, capabilities, Artifact declarations and observer flags match runtime behavior.

author/homepage/repository are metadata, not official trust/update authority. Use exact camelCase JSON, without old Id/EntryAssembly/MinHostVersion fields.

## Static validation

Checks cover hashes, safe Windows paths, case collisions, links, expanded sizes, compression ratio, declared files, schema, API/architecture and PE entry metadata. Defaults:10000 entries,1 GiB total,256 MiB per entry, ratio100,1 MiB manifest. Install never loads candidate assemblies or executes constructors/lifecycle/install scripts.

## Publish

Build versioned `.frplugin` and matching SHA-256; publish immutable Release assets and preserve previous versions for review/recovery. Official updates require Catalog bindings to exact URL/hash/API/architecture/manifest; manifests cannot self-declare Official.

Validate disabled-on-install, explicit Enable, settings, cancellation, Disable, update/rollback and interrupted recovery before release. SDK, plugin SemVer and Host versions are independent.

<span id="pre-release-checklist" />
<span id="recommended-zip-layout" />
<span id="related-links" />
<span id="required-artifacts" />
<span id="versioning-recommendations" />
