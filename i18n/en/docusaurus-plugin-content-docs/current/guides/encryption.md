---
sidebar_position: 4
title: "Encrypted backups and passwords"
description: "Set an encryption password, understand Windows-local password storage, prepare passwords and complete archives for migration and test recovery."
reviewed_baseline: "1.10-api3.17"
---

# Encrypted backups and passwords

Encryption suits backups stored on external disks or in the cloud. After creating an encrypted project, make a backup and test a restore before using it for important files.

## Create an encrypted project

Choose encryption during project creation, set a password and review source and backup locations. The project keeps that password after creation, so store it separately in a reliable place.

## Local use and migration

The app protects local password material with Windows user-scoped DPAPI. The same user on the same device can use saved material. Prepare the original password separately before moving to another device or account, along with complete archives and incremental dependencies.

Configuration exports carry project settings. Keep encryption passwords in your chosen password manager. Recovering encrypted content requires the original password.

## Restore and check

Enter the password when prompted. The app extracts and verifies content before changing the destination. Check a test-folder restore before enabling automation or cloud uploads.

Plugin materializers may read decrypted content, so choose trusted plugins for the task. If recovery fails, check the password, archive locations and dependency chain separately, keep original copies and read the operation log.

<span id="best-for" />
<span id="create-an-encrypted-config" />
<span id="faq" />
<span id="recommended-strategy-combinations" />
<span id="related-links" />
<span id="restore-behavior" />
<span id="storage-and-security-notes" />
<span id="what-if-i-forget-the-password" />
<span id="why-does-restore-fail-after-importing-config" />

<span id="encryption-and-recovery-material" />

<span id="local-passwords-and-another-device" />
<span id="restore-an-encrypted-version" />
<span id="troubleshooting" />
