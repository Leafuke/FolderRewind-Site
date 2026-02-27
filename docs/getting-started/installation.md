---
sidebar_position: 1
title: 安装指南
description: 如何安装 FolderRewind
---

# 安装指南

FolderRewind 支持两种安装方式：Microsoft Store（推荐）和侧载安装。

## 方式一：Microsoft Store（推荐）

1. 点击下方链接或在 Microsoft Store 中搜索「FolderRewind」：

   <a href="https://apps.microsoft.com/detail/9nwsdgxdqws4" target="_blank">
     👉 从 Microsoft Store 安装
   </a>

2. 点击 **「获取/安装」** 按钮。
3. 安装完成后，从开始菜单启动 FolderRewind。

> **优点：** 自动更新、安全沙箱运行、一键安装。

## 方式二：侧载安装

适合无法访问 Microsoft Store 的用户。

### 前置步骤

1. 打开 **系统设置** → **系统** → **开发者选项**
2. 启用 **开发人员模式**
3. 滚动到页面底部，展开 **PowerShell** 区块，开启 **「更改执行策略…」** 选项

### 安装步骤

1. 前往 [GitHub Releases](https://github.com/Leafuke/FolderRewind/releases) 页面
2. 在最新版本的 **Assets** 中找到应用包，命名格式为：`FolderRewind_{version}_{platform}.7z`
3. 下载并解压
4. 右键单击文件夹中的 `install.ps1` 脚本，选择 **「使用 PowerShell 运行」**

## 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Windows 10 1809 (17763) 及以上 / Windows 11 |
| 架构 | x64 / ARM64 |
| 运行时 | .NET 10（应用内已包含） |
| 磁盘空间 | 约 50 MB（不含备份数据） |

## 下一步

安装完成后，请继续阅读 [首次备份](./first-backup) 教程。
