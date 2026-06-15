---
sidebar_position: 1
title: 安装指南
description: 安装并启动 FolderRewind
---

# 安装指南

FolderRewind 支持两种安装方式：**Microsoft Store** 和 **侧载安装**。

:::tip 推荐做法
能使用 Microsoft Store 时，优先使用商店版。它更新更省心，也更不容易出现多版本并存问题。
:::

## 方式一：Microsoft Store

1. 打开 [Microsoft Store 下载页](https://apps.microsoft.com/detail/9nwsdgxdqws4)
2. 点击安装
3. 安装完成后，从开始菜单启动 FolderRewind

> 请不要和离线侧载版同时安装。

## 方式二：侧载安装

适用于无法访问 Microsoft Store，或需要使用离线包的场景。

### 前置设置

1. 打开 Windows 设置
2. 进入 **系统 > 开发者选项**
3. 启用 **开发人员模式**
4. 确认 PowerShell 允许执行脚本（安装脚本需要）

### 安装步骤

1. 打开 [GitHub Releases](https://github.com/Leafuke/FolderRewind/releases)
2. 下载最新版本的安装包（文件名格式：`FolderRewind_{版本}_{平台}.7z`，如 `FolderRewind_1.7.0_x64.7z`）
3. 解压压缩包到任意目录
4. 在解压目录中，右键 `install.ps1` → **使用 PowerShell 运行**
   - 如果提示执行策略被阻止，打开 PowerShell 终端，执行：
     ```powershell
     Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
     .\install.ps1
     ```
5. 等待安装完成（脚本会自动注册证书并安装 MSIX 包）
6. 从开始菜单启动 FolderRewind

## 侧载版 1.6.0 新增体验

### GitHub 镜像源

从 v1.6.0 开始，侧载版本可以在设置页切换 **GitHub 更新源 / 镜像源**。

这个设置会影响：

- 应用更新检查与下载
- 在线模板列表获取
- 模板文件下载

商店版更新不受该设置影响。

如果你的网络环境访问官方 GitHub 较慢，可以在设置页选择镜像源，必要时也可以填写自定义镜像地址。

### 侧载更新体验优化

v1.6.0 还优化了侧载版本的更新流程，减少下载源不可用或切换源时带来的干扰。对于经常手动升级的用户，这会更友好。

## 常见安装问题

### 运行 install.ps1 提示"无法加载文件，因为在此系统上禁止运行脚本"

在 PowerShell 中执行以下命令，然后重新运行安装脚本：

```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\install.ps1
```

此设置仅对当前 PowerShell 会话生效，不会影响系统全局策略。

## 安装后建议立刻做的事

### 1. 先创建一个测试配置

用测试目录跑一次完整流程，确认目标备份路径可写、界面正常、历史记录能生成。

### 2. 运行核心功能自动校验

在 **设置页** 中可以找到 **核心功能自动校验**。它会自动验证当前机器上的关键流程是否可用，包括：

- 备份
- 还原
- 安全删除
- 数量限制清理
- 共享锁文件处理

如果你是升级到 v1.6.0 后首次使用，强烈建议执行一次。

## 系统要求

| 项目 | 要求 |
| --- | --- |
| 操作系统 | Windows 10 1809 及以上 / Windows 11 |
| 架构 | x64 / ARM64 |
| 运行环境 | .NET 10（应用已携带） |
| 磁盘空间 | 约 80 MB，不含备份数据 |

## 下一步

安装完成后，继续阅读 [首次备份](./first-backup)。
