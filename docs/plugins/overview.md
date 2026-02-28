---
sidebar_position: 1
title: 插件系统概述
description: 了解 FolderRewind 的插件生态
---

# 插件系统概述

FolderRewind 内置了完整的插件系统，允许开发者为特定场景扩展功能。

## 插件能做什么？

| 能力 | 说明 | 示例 |
|------|------|------|
| **自定义配置类型** | 定义新的备份配置类型 | MineRewind 定义了「Minecraft」类型 |
| **自动发现** | 智能扫描文件夹结构 | 自动发现 `.minecraft/saves` 下的存档 |
| **热备份介入** | 在备份前后执行自定义逻辑 | 游戏运行中创建快照 |
| **快捷键扩展** | 注册自定义全局快捷键 | 一键触发特定操作 |
| **KnotLink 命令** | 通过 IPC 协议接收外部指令 | 第三方工具联动 |

## 官方插件

### MineRewind v1.4.0

专为 Minecraft 打造的存档增强插件。

- 自动扫描并发现 Minecraft 存档
- 游戏运行中热备份
- 版本信息识别

👉 [Minecraft 专题](../guides/minecraft/overview) | [下载页](/download)

## 安装插件

1. 从插件来源下载插件文件
2. 在 FolderRewind 的 **插件管理** 界面中安装
3. 重启应用以加载新插件

## 成为开发者

如果你想为 FolderRewind 开发插件，请查看 [插件开发快速上手](./developing/quick-start)。

FolderRewind 提供了以下开发接口：

- `IFolderRewindPlugin` — 插件主接口
- `IFolderRewindHotkeyProvider` — 快捷键扩展接口
- `IFolderRewindKnotLinkCommandHandler` — KnotLink 命令接口

## 相关链接

- [插件开发快速上手](./developing/quick-start)
- [插件安装与管理](./using-plugins)
- [KnotLink 协议与联动](./knotlink)
- [Plugin API 参考](./developing/plugin-api)
- [Minecraft 专题](../guides/minecraft/overview)
