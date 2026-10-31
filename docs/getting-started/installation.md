---
sidebar_position: 1
title: "安装指南"
description: "从 Microsoft Store 或 GitHub 安装 FolderRewind，选择 x64 或 ARM64，核对安装包，并了解应用数据目录与安装渠道切换。"
reviewed_baseline: "1.10-api3.17"
---

# 安装指南

FolderRewind 支持 Windows 10 1809 及以上版本和 Windows 11。可以通过 Microsoft Store 安装，也可以下载 GitHub 的 Setup 安装包。

## Microsoft Store

打开 [Microsoft Store](https://apps.microsoft.com/detail/9nwsdgxdqws4)，选择安装。后续更新由商店管理。商店与 GitHub 各自发布更新，已安装版本可在应用“关于”中查看。

## GitHub Setup 安装包

1. 打开 [GitHub Releases](https://github.com/Leafuke/FolderRewind/releases)。
2. Intel／AMD 电脑下载 x64；Windows on ARM 设备下载 ARM64。
3. 同时下载同名 `.sha256` 文件，在 PowerShell 中核对 SHA-256：

```powershell
Get-FileHash .\FolderRewind_1.10.0.0_Setup_x64.exe -Algorithm SHA256
```

4. 运行安装包，按中英文向导选择安装路径和范围。默认安装到当前用户的 `%LOCALAPPDATA%\Programs\FolderRewind`；所有用户安装需要管理员权限。

Setup 包含 .NET 和 Windows App SDK 运行环境。安装包尚未进行生产代码签名，Windows 可能显示“未知发布者”或 SmartScreen 提示；请从项目官方 Release 下载并核对校验值。旧客户端的更新检查尚未找到 Setup 时，可以直接下载升级。

## 数据目录与安装渠道

| 渠道 | 应用数据目录 |
| --- | --- |
| Microsoft Store／旧 MSIX | `%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalState\FolderRewind` |
| Setup | `%LOCALAPPDATA%\FolderRewind` |

项目配置、插件、历史仓库、日志和本机状态存放在应用数据目录。实际备份文件使用各项目设置的备份位置，磁盘还需为备份与还原暂存留出空间。

切换渠道时，先退出原应用，保留数据目录和归档，再在新安装中迁移配置、历史和来源路径。日常使用选定一个渠道维护相同来源，具体步骤见[数据迁移](/docs/guides/data-migration)。卸载默认保留设置，安装器也提供清理当前用户设置的选项。

安装完成后，继续[首次备份](/docs/getting-started/first-backup)。

<span id="下一步" />
<span id="从旧版本升级" />
<span id="先选安装渠道" />
<span id="安装后立即验证" />
<span id="数据目录与切换渠道" />
<span id="方式一microsoft-store" />
<span id="方式三msix-侧载包" />
<span id="方式二msi" />
<span id="系统要求" />

<span id="setup-exe" />
<span id="系统要求与数据目录" />
<span id="旧版包" />
