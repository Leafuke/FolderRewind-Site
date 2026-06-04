---
sidebar_position: 2
title: 插件安装与管理
description: 如何在 FolderRewind 中安装、启用、升级和排查插件
---

# 插件安装与管理

本文面向日常用户，帮助你稳定地使用插件。

## 安装方式

### 1) 从插件商店安装

1. 打开 FolderRewind → **设置** → **插件管理**
2. 点击 **插件商店** 浏览可用插件
3. 选择目标插件并点击安装
4. 安装完成后按提示重启应用

### 2) 本地安装 ZIP

1. 下载插件发布包（`.zip` 文件）
2. 在插件管理页选择 **本地安装**
3. 选择 ZIP 文件并完成导入
4. 重启应用

:::info
插件 ZIP 需包含一个顶层目录，其中放置 `manifest.json` 和入口程序集（如 `MyPlugin.dll`）。
:::

## 启用与停用

- 在插件管理界面，每个插件旁有启用/停用开关
- 启用后，插件会在应用启动阶段加载并执行 `Initialize`
- 停用后，插件不参与配置发现、备份钩子或命令扩展
- 启用/停用切换不需要重启应用（热切换）

## 插件设置

某些插件提供可配置的选项：

1. 在插件管理界面点击插件名称
2. 在设置区域修改配置项
3. 保存后立即生效（部分设置可能需要重启）

设置由 FolderRewind 持久化管理，无需手动编辑配置文件。

## 插件日志

插件的日志与 FolderRewind 主日志合并输出。查看方式：

- 在 FolderRewind 的日志目录中查找最新的日志文件
- 插件日志以插件名称为前缀，如 `[MineRewind] ...`

## 升级与回滚

- 插件管理界面会显示可用更新（需插件配置了 GitHub 仓库）
- 建议优先使用插件页面提供的升级入口
- 升级前建议先执行一次手动备份
- 若升级异常，可在 GitHub Release 页面下载旧版本 ZIP 手动安装回滚

## 常见问题

### 安装失败

- 检查 ZIP 内结构是否正确（顶层目录 + `manifest.json`）
- 检查 `manifest.json` 中 `EntryAssembly` 和 `EntryType` 是否正确
- 检查插件 `MinHostVersion` 是否高于当前 FolderRewind 版本

### 安装后看不到功能

- 确认插件已启用（插件管理界面的开关）
- 检查是否满足功能前置条件（例如 MineRewind 需要可识别的 Minecraft 目录结构）
- 重启 FolderRewind 后再检查

### 插件冲突

- 每个插件在独立的 `AssemblyLoadContext` 中运行，一般不会冲突
- 如果两个插件注册了相同的快捷键，后加载的会覆盖先加载的
- 同一配置类型建议只由一个插件管理

### 版本不兼容

- 如果提示「版本不兼容」，需要更新 FolderRewind 到插件要求的最低版本
- 插件的 `MinHostVersion` 在 `manifest.json` 中声明

## 相关链接

- [插件系统概述](./overview)
- [插件开发快速上手](./developing/quick-start)
- [Minecraft 专题](../guides/minecraft/overview)
