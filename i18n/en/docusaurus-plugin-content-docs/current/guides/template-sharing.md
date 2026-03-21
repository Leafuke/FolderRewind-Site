---
sidebar_position: 4
title: "Templates: Share and Import"
description: Export, import, browse, and share FolderRewind templates
---

# Templates: Share and Import

v1.6.0 completes the full template sharing workflow. You can export templates locally, import templates from others, or browse official templates directly.

## Export a local template

In the **Template Data** section of Settings, you can choose:

- **Export Template**
- **Import Template**

When exporting, pick one of your local templates and save it as a template file. This is useful for:

- moving setups across devices
- sharing within a team
- archiving your own template versions

## Import a template

When importing, FolderRewind validates the file first and then handles name conflicts.

If a conflict is detected, the app usually offers two choices:

- replace the existing template
- keep both and rename the imported one

If you are not sure which version is newer, keeping both first is usually safer.

## Official templates and share codes

Besides importing files manually, FolderRewind also supports:

- browsing the official template list
- importing a template via a **share code**

This is a good fit for communities, plugin authors, and tutorial-driven distribution.

## Prepare a template sharing package

If you want to submit a template to the official repository, or send a reviewable package to someone else first, you can prepare a template sharing package in Settings.

That process typically validates whether the template is suitable for public sharing, such as:

- no obviously unsafe path rules
- no inappropriate local-sensitive data
- required metadata is complete

## Submit directly to GitHub

v1.6.0 also supports initiating the GitHub submission flow from inside the app.

The general flow is:

1. choose a local template
2. add share metadata such as game name
3. sign in to GitHub
4. let the app generate and submit the sharing content
5. receive a share code and Pull Request link

This makes it much easier to go from “template created” to “template shared”.

## Mirror source and online templates

Online template browsing and template file downloads are affected by the **GitHub source / mirror source** setting.

If you notice that:

- official template search is slow
- template downloads fail
- the online template list does not refresh correctly

try switching the mirror source in Settings first.

## Before sharing a template

- test-import it on another machine or another test directory
- clearly describe the intended scenario and expected folder structure
- document plugin requirements
- avoid hard-coding personal private directory structures

## Related links

- [Templates: Create and Use](./templates)
- [Installation Guide](../getting-started/installation)
