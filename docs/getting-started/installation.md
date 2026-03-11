---
sidebar_position: 1
title: 安装指南
description: 安装并启动 FolderRewind
---

# 安装指南

FolderRewind 支持两种安装方式：Microsoft Store（推荐）和侧载安装。

:::caution v1.5.0 升级提醒
本版本的备份与还原逻辑发生了破坏性更改。对于从旧版本升级的场景，请在正式使用前先完成几轮备份与还原测试。

另外，**请勿同时安装商店版与当前页面下载的离线版**，否则排查问题和确认实际运行版本都会变得困难。
:::

## 方式一：Microsoft Store（推荐）

1. 点击下方链接或在 Microsoft Store 中搜索「FolderRewind」：

   <a href="https://apps.microsoft.com/detail/9nwsdgxdqws4" target="_blank">
     👉 从 Microsoft Store 安装
   </a>

2. 点击 **「获取/安装」** 按钮。
3. 安装完成后，从开始菜单启动 FolderRewind。

> **优点：** 自动更新、安全沙箱运行、一键安装。

## 方式二：侧载安装

适合无法访问 Microsoft Store 的用户。如果你已经安装了商店版，请不要再同时安装离线版。

### 前置步骤

1. 打开 **系统设置** → **系统** → **开发者选项**
2. 启用 **开发人员模式**
3. 滚动到页面底部，展开 **PowerShell** 区块，开启 **「更改执行策略…」** 选项

### 安装步骤

1. 前往 [GitHub Releases](https://github.com/Leafuke/FolderRewind/releases) 页面
2. 在最新版本的 **Assets** 中找到应用包，命名格式为：`FolderRewind_{version}_{platform}.7z`
3. 下载并解压
4. 右键单击文件夹中的 `install.ps1` 脚本，选择 **「使用 PowerShell 运行」**
5. 安装完成后，在开始菜单中启动 FolderRewind

:::tip 首次启动提示
第一次打开后，建议先创建一个测试配置，完成一次备份，再执行一次还原验证，确认目标路径可写入、还原结果也符合预期。
:::

## 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 10 1809 (17763) 及以上 / Windows 11 |
| 架构 | x64 / ARM64 |
| 运行时 | .NET 10（应用内已包含） |
| 磁盘空间 | 约 180 MB（不含备份数据） |

## 安装后快速自检（1 分钟）

1. 打开应用，确认首页能正常显示配置卡片区域。
2. 点击 **「新建配置」**，确认弹窗可打开。
3. 创建一个测试配置并完成一次手动备份。
4. 在测试目录执行一次还原验证，确认结果符合预期。

如果这些步骤都正常，说明安装可用，可以继续正式配置与自动化设置。

## 下一步

安装完成后，请继续阅读 [首次备份](./first-backup) 教程。
