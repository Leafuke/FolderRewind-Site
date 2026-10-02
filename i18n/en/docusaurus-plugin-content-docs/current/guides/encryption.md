---
sidebar_position: 4
title: "Encrypted backups and recovery materials"
description: "FolderRewind 1.9 encrypted backups and recovery materials: source-checked steps, contracts, failure handling, compatibility and practical acceptance checks for reliable backup and recovery."
reviewed_baseline: "1.9-api3.5"
---

# Encrypted backups and recovery materials

## Create

Choose encrypted project/password in creation, confirm test sources/destination and make a backup. Passwords cannot be changed directly afterward; keep recovery materials outside templates/logs.

## Device boundary

The Host protects local passwords with current-user Windows DPAPI, not plaintext config JSON. Same-machine/user access is not portable to another device; importing config.json alone does not transfer password storage. Preserve needed passwords and test new-device restores on copies.

## Restore

Validate credentials before materialization; bad passwords/integrity failures block before live mutation. Full/Smart/Rolling still require payload closure. ArtifactRead/materializers may access decrypted content; review service declarations/trust.

## Acceptance

Exercise correct/incorrect passwords, cross-device, missing dependencies, cancellation and restored bytes. Encryption offers no password recovery and does not replace Safe Restore, replicas or boundary validation.

<span id="best-for" />
<span id="create-an-encrypted-config" />
<span id="restore-behavior" />
<span id="storage-and-security-notes" />
<span id="recommended-strategy-combinations" />
<span id="faq" />
<span id="what-if-i-forget-the-password" />
<span id="why-does-restore-fail-after-importing-config" />
<span id="related-links" />
