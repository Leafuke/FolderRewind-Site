---
sidebar_position: 2
title: 插件安装与管理
description: 如何在 FolderRewind 中安装、启用、升级和排查插件
---

# 插件安装与管理

本文面向日常用户，帮助你稳定地使用插件。

## 安装方式

## 1) 从插件市场安装

1. 打开 FolderRewind 的 **插件管理**。
2. 在插件列表中选择目标插件并安装。
3. 安装完成后按提示重启应用。

## 2) 本地安装 ZIP

1. 下载插件发布包（通常为 `.zip`）。
2. 在插件管理页选择 **本地安装**。
3. 选择 ZIP 文件并完成导入。

> 插件 ZIP 需包含 `manifest.json` 与入口程序集（如 `MineRewind.dll`）。

## 启用与停用

- 启用后，插件会在应用启动阶段加载并执行 `Initialize`。
- 停用后，插件不会参与配置发现、备份钩子或命令扩展。

## 升级与回滚

- 建议优先使用插件页面提供的升级入口。
- 升级前建议先执行一次手动备份。
- 若升级异常，回滚到上一个稳定版本并重启应用。

## 常见问题

### 安装失败

- 检查 ZIP 内结构是否正确（顶层目录 + `manifest.json`）。
- 检查插件 `MinHostVersion` 是否高于当前主程序版本。

### 安装后看不到功能

- 确认插件已启用。
- 检查是否满足功能前置条件（例如 MineRewind 需要可识别的 Minecraft 目录结构）。

## 相关链接

- [插件系统概述](./overview)
- [插件开发快速上手](./developing/quick-start)
- [Minecraft 专题](../guides/minecraft/overview)
