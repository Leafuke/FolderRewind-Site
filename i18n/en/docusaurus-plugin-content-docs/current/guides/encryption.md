---
sidebar_position: 4
title: "Encryption and recovery material"
description: "Create encrypted backups, keep passwords and recovery material, and check password-protection limits across devices."
reviewed_baseline: "1.9-api3.9"
---

# Encryption and recovery material

Encryption protects archive contents stored on external drives or in the cloud. Complete an encrypted backup and test restore before using it for important data.

## Create an encrypted project

Choose an encrypted project in the creation flow, set a password and review source and archive locations. The password cannot be edited directly after creation. Keep it separately in a reliable place, outside presets, comments and logs.

## Local passwords and another device

The app protects local password material with DPAPI for the current Windows user rather than storing plaintext in configuration JSON. Material usable by the same user on one machine is not automatically decryptable by another device or account.

A configuration export is not a password-store export. Record the password before migration and test restoration from archive copies on the new device. The app cannot recover a forgotten password.

## Restore an encrypted version

Enter or confirm the password as prompted. Extraction and verification precede target writes. Incorrect passwords or integrity failures block restoration. Modes such as Smart still need their complete archive dependencies.

Plugin archive-reading or materialization capabilities may access decrypted content, so enable trusted plugins only. Encryption still requires a correct backup range and reliable copies.

## Troubleshooting

Check the password, archive and dependency chain. On another device, distinguish non-portable password material from missing archives. Repeated configuration import alone will not fix either. Keep the original archive and avoid overwriting its only copy.

<span id="best-for" />
<span id="create-an-encrypted-config" />
<span id="faq" />
<span id="recommended-strategy-combinations" />
<span id="related-links" />
<span id="restore-behavior" />
<span id="storage-and-security-notes" />
<span id="what-if-i-forget-the-password" />
<span id="why-does-restore-fail-after-importing-config" />
