---
sidebar_position: 1
title: "安装指南"
description: "FolderRewind 1.9 系列安装指南操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 安装指南

FolderRewind 1.9.3 已于 2026-10-03 发布，内置 MineRewind 1.9.5。可从 Microsoft Store 或 GitHub Setup EXE 安装；商店版本按实际页面和应用显示核对。

## Microsoft Store

从 [Microsoft Store](https://apps.microsoft.com/detail/9nwsdgxdqws4) 安装，更新由商店管理。核对应用版本；商店审核与 GitHub 发布可能不同步。

## Setup EXE

正式 [GitHub Release](https://github.com/Leafuke/FolderRewind/releases) 每版只公开以下附件：

```text
FolderRewind_<version>_Setup_x64.exe
FolderRewind_<version>_Setup_x64.exe.sha256
FolderRewind_<version>_Setup_arm64.exe
FolderRewind_<version>_Setup_arm64.exe.sha256
```

Intel／AMD 电脑选择 x64，Windows on ARM 选择 arm64。先下载对应包及校验文件：

```powershell
Get-FileHash .\FolderRewind_<version>_Setup_x64.exe -Algorithm SHA256
```

把输出与同名 .sha256 核对后运行中英文安装向导，选择当前用户或所有用户安装范围；所有用户安装需要相应权限。卸载默认保留设置，可显式清理当前用户设置，备份仍保留。旧客户端无法识别 Setup 更新时，从 Release 页面手动下载。Setup 内含安装引擎，不要求用户另找 MSI。没有架构匹配 EXE 时打开 Release 页面，不回退推荐旧 MSI。

## 系统要求与数据目录

Windows10 1809+／Windows11；发行架构 x64／ARM64；程序携带 .NET10。安装空间以正式附件及安装器显示为准，不沿用旧80MB估计；备份、临时物化和恢复另需空间。

| 渠道 | 数据目录 |
|---|---|
| Store／旧 MSIX | `%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalState\FolderRewind` |
| Setup 未打包版 | `%LOCALAPPDATA%\FolderRewind` |

配置、plugins、按配置的 history 仓库、日志和本机状态在数据目录下；归档还保存在每个配置的目标目录。切换渠道不会自动迁移两套数据。完全退出、备份完整数据目录和归档、卸载旧渠道，再按迁移指南验证新环境；不要同时运行两种渠道保护相同来源。

## 旧版包

1.8等历史 Release 可能仍含 MSI／MSIX .7z 和 install.ps1，仅用于对应旧版本。1.9 GitHub 不公开这些附件；开发人员模式／证书脚本不是新 Setup 安装步骤。

安装后用测试来源完成备份和还原，再运行核心自动校验并启用自动任务。[数据迁移](/docs/guides/data-migration)说明配置与载荷的区别。

<span id="先选安装渠道" />
<span id="方式一microsoft-store" />
<span id="方式二msi" />
<span id="方式三msix-侧载包" />
<span id="数据目录与切换渠道" />
<span id="从旧版本升级" />
<span id="安装后立即验证" />
<span id="系统要求" />
<span id="下一步" />
