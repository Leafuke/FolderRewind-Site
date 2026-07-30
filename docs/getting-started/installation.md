---
sidebar_position: 1
title: 安装指南
description: 选择 Store、MSI 或 MSIX 安装 FolderRewind
---

# 安装指南

FolderRewind 提供三种安装渠道：**Microsoft Store**、**MSI** 和 **MSIX 侧载包**。

:::tip 推荐
能使用 Microsoft Store 时，优先选择商店版。它安装简单，并由商店负责后续更新。
:::

:::warning 不要混装
Store、MSI 与 MSIX 版本不应同时安装或运行。MSI 与 MSIX/Store 使用不同的数据目录，切换渠道不会自动迁移配置、历史或插件。
:::

## 先选安装渠道

| 渠道 | 适合谁 | 安装方式 | 注意事项 |
| --- | --- | --- | --- |
| Microsoft Store | 大多数用户 | 商店一键安装 | 推荐，更新最省心 |
| MSI | 无法使用 Store 的普通用户 | 双击 `.msi` | 分发格式仍在测试；安装包未使用受信任的 Authenticode 证书 |
| MSIX (`.7z`) | 熟悉开发人员模式和 PowerShell 的用户 | 解压后运行 `install.ps1` | 需要开发人员模式，体验最接近 Store 版 |

大多数 Intel/AMD Windows 设备选择 **x64**；只有 Windows on ARM 设备选择 **ARM64**。

## 方式一：Microsoft Store

1. 打开 [Microsoft Store 下载页](https://apps.microsoft.com/detail/9nwsdgxdqws4)。
2. 点击安装。
3. 安装完成后，从开始菜单启动 FolderRewind。

## 方式二：MSI

1. 打开 [最新 GitHub Release](https://github.com/Leafuke/FolderRewind/releases/latest)。
2. 下载架构匹配的 `.msi` 和同名 `.msi.sha256` 文件。
3. 在下载目录运行以下命令，并将输出与 `.sha256` 文件中的值比较：

   ```powershell
   Get-FileHash .\FolderRewind_*.msi -Algorithm SHA256
   ```

4. 双击 MSI 并完成安装。默认安装到 `%LOCALAPPDATA%\Programs\FolderRewind`，也可以在向导中选择其他本地目录。

MSI 不要求开发人员模式或手动导入证书。由于安装包尚未使用 Windows 信任的 Authenticode 证书，Windows 可能显示“未知发布者”或 SmartScreen 提示。只应从官方 Release 下载并先校验哈希。

## 方式三：MSIX 侧载包

1. 打开 **Windows 设置 > 系统 > 开发者选项**，启用 **开发人员模式**。
2. 打开 [最新 GitHub Release](https://github.com/Leafuke/FolderRewind/releases/latest)。
3. 下载架构匹配的 `.7z` 和同名 `.7z.sha256` 文件。
4. 校验下载文件：

   ```powershell
   Get-FileHash .\FolderRewind_*.7z -Algorithm SHA256
   ```

5. 解压 `.7z`，在解压目录中运行：

   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
   .\install.ps1
   ```

6. 等待脚本注册证书并安装 MSIX 包，然后从开始菜单启动 FolderRewind。

`Set-ExecutionPolicy` 只影响当前 PowerShell 会话，不会修改系统全局策略。

## 数据目录与切换渠道

| 渠道 | 配置与历史目录 |
| --- | --- |
| Store / MSIX | `%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalState\FolderRewind` |
| MSI | `%LOCALAPPDATA%\FolderRewind` |

目录中包含 `config.json`、`history.json` 和 `plugins`。切换渠道前：

1. 完全退出 FolderRewind。
2. 备份当前渠道的整个 `FolderRewind` 数据目录。
3. 卸载旧渠道。
4. 安装新渠道后，再按 [数据迁移指南](../guides/data-migration) 导入或复制经过确认的数据。

不要让两套安装共用同一个运行中的备份任务。

## 从旧版本升级

升级 1.8 前请阅读 [1.8 升级与启动故障恢复](./v1-8-upgrade)。至少使用测试目录完成一次备份与还原，再把新版本用于重要数据。

如果 1.8.0 因旧语言配置无法启动，不要删除 `config.json`；升级到 1.8.1，或按恢复指南只修正 `GlobalSettings.Language`。

## 安装后立即验证

1. 创建一个使用测试目录的配置。
2. 完成一次手动备份和一次测试还原。
3. 在设置页运行 **核心功能自动校验**。
4. 确认目标备份路径可写、历史记录正常生成，再启用自动化。

## 系统要求

| 项目 | 要求 |
| --- | --- |
| 操作系统 | Windows 10 1809 及以上 / Windows 11 |
| 架构 | x64 / ARM64 |
| 运行环境 | .NET 10（应用已携带） |
| 磁盘空间 | 约 80 MB，不含备份数据 |

## 下一步

- [1.8 升级与启动故障恢复](./v1-8-upgrade)
- [首次备份](./first-backup)
- [首次还原](./first-restore)
