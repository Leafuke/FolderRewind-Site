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
| **自定义配置类型** | 定义新的备份配置类型 | MineRewind 定义了「Minecraft Saves」类型 |
| **自动发现** | 智能扫描文件夹结构 | 自动发现 `.minecraft/saves` 下的存档 |
| **备份钩子** | 在备份前后执行自定义逻辑 | 游戏运行中创建快照、过滤缓存文件 |
| **还原钩子** | 在还原前后保留/恢复数据 | 保留玩家位置和物品栏 |
| **备份过滤** | 按规则过滤备份内容 | 排除临时文件、按白名单备份 |
| **备份范围** | 定义参数化的备份范围策略 | 按 Minecraft 区域选择性备份 |
| **快捷键扩展** | 注册自定义全局/应用内快捷键 | 一键备份/还原 |
| **KnotLink 命令** | 通过 IPC 协议接收外部指令 | 第三方工具联动 |
| **参数化命令** | 支持结构化参数的远程命令 | 复杂查询和批量操作 |

## 官方插件

### MineRewind v1.7.0

专为 Minecraft 打造的存档增强插件。

- 自动扫描并发现 Minecraft 存档（支持多版本目录结构）
- 游戏运行中热备份（与联动模组协调）
- 热还原（不退出游戏的快速还原）
- 全局快捷键（`Alt+Ctrl+S` 备份、`Alt+Ctrl+Z` 还原）
- KnotLink 远程命令（`BACKUP_CURRENT`、`RESTORE_CURRENT` 等）
- 按区域选择性备份

👉 [Minecraft 专题](../guides/minecraft/overview) | [下载页](/download)

## 插件隔离

每个插件在独立的 `AssemblyLoadContext` 中加载，依赖不会与宿主或其他插件冲突。插件卸载时可释放加载的程序集。

## 安装插件

1. 从插件来源下载插件 ZIP 文件
2. 在 FolderRewind 的 **插件管理** 界面中安装
3. 重启应用以加载新插件

详见 [插件安装与管理](./using-plugins)。

## 成为开发者

如果你想为 FolderRewind 开发插件，请查看：

- [插件开发快速上手](./developing/quick-start) — 从零开始
- [实战教程](./developing/tutorial) — 构建一个完整插件
- [Plugin API 参考](./developing/plugin-api) — 接口全量说明

FolderRewind 提供了以下开发接口：

| 接口 | 用途 |
|------|------|
| `IFolderRewindPlugin` | 插件主入口（必选） |
| `IFolderRewindHotkeyProvider` | 快捷键扩展 |
| `IFolderRewindKnotLinkCommandHandler` | KnotLink 命令扩展 |
| `IFolderRewindParameterizedKnotLinkCommandHandler` | 参数化 KnotLink 命令 |
| `IFolderRewindBackupScopeProvider` | 备份范围策略 |
| `IFolderRewindBackupFilterProvider` | 备份过滤规则 |

## 相关链接

- [插件开发快速上手](./developing/quick-start)
- [实战教程](./developing/tutorial)
- [插件安装与管理](./using-plugins)
- [KnotLink 协议与联动](./knotlink)
- [Plugin API 参考](./developing/plugin-api)
- [Minecraft 专题](../guides/minecraft/overview)
