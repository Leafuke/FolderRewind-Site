---
sidebar_position: 3
title: "Templates: Create and Use"
description: Save configs as templates and create new configs from them
---

# Templates: Create and Use

Starting with v1.6.0, FolderRewind can save an existing config as a reusable template and apply it later.

A template is more than a copied config name. It can preserve a reusable backup solution, such as:

- backup policy
- automation presets
- filters
- path rules
- default config type
- selected plugin-related extended properties

## When templates are useful

- You create many similar configs
- You want to standardize a proven backup setup
- You deploy FolderRewind on multiple devices
- You want to share a setup with teammates, friends, or a game community

## Save the current config as a template

1. Open an existing config
2. Go to **Config Settings**
3. Click **Save as Template**
4. Fill in template name, author, and description
5. Save

FolderRewind will preserve the main strategy information and try to infer reusable path rules.

> If no strong path rule can be inferred, the template can still be saved. It will simply have weaker auto-discovery capability.

## Create a config from a template

From the home page, click **Create from Template** and follow this general flow:

1. Choose a local template
2. Optionally search and import an official template
3. Confirm the config name
4. Review the suggested config type
5. Review the auto-discovered folder candidates
6. Create the config and continue to the management page

## How path rules help

Template path rules try to locate matching folders on the current machine, for example:

- known game save directories
- fixed project structures under user folders
- paths that contain specific marker files or subdirectories

FolderRewind does not silently add those folders. It presents them as candidates for confirmation first, which is much safer.

## Templates and plugins

A template may depend on a plugin-defined config type or plugin-specific capabilities.

If the target machine does not have the required plugin, FolderRewind can:

- show a warning
- fall back to `Default` when necessary

So when you share a template, it is a good idea to document any plugin dependency.

## Manage local templates

In Settings, you can manage your local template library:

- browse templates
- search templates
- edit name, author, and description
- adjust path rules
- preview matching behavior
- duplicate templates
- delete templates

This is especially useful if you maintain a long-lived template library.

## Recommended workflow

### Build templates from proven configs

Only template a config after it has gone through several successful backup and restore drills.

### Template first, automate later

If you plan to deploy automation on multiple devices, build the template first, then apply it and only adjust local paths.

### Re-check templates after major upgrades

If a release changes assumptions around retention, filters, or backup behavior, review your templates before reusing them at scale.

## Related links

- [Templates: Share and Import](./template-sharing)
- [Automation](./automation)
- [Filters](./filters)
