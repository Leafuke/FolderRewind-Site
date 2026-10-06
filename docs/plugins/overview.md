---
sidebar_position: 1
title: "插件系统概述"
description: "了解插件提供的发现、备份还原、地图与命令能力，以及宿主职责、版本兼容和可信安装来源。"
reviewed_baseline: "1.9-api3.9"
---

# 插件系统概述

了解插件提供的发现、备份还原、地图与命令能力，以及宿主职责、版本兼容和可信安装来源。

FolderRewind 1.9 的 Plugin System v3 使用独立 BCL-only SDK、静态包声明和能力注册。当前源码 API 为 3.9。宿主管理配置、任务编排、历史、保留、云同步、完整性和目标修改。

## 能力与分工

插件可发现候选和提出配置修改、约束文件／备份范围、提供一致性来源、描述文件夹／版本元数据、协调还原环境、贡献命令／热键／KnotLink、转换不可变制品并物化还原。全部 16 种能力见[API 参考](/docs/plugins/developing/plugin-api)。

插件不直接保存宿主配置，不通过备份后钩子改写旧包，不绕过 Safe Restore。发现身份、配置 Kind 所有者和状态命名空间是不同角色。

## MineRewind

FolderRewind 1.9.6 内置 MineRewind 1.9.8，请求 API 3.9，提供实例发现、批量草稿、区域范围、一致性、元数据、还原协调、玩家保留、命令和目标选择。请核对正式 Host／SDK／插件版本，不能把旧 1.8 插件 ZIP 装入 v3。

## 安装与信任

官方目录或手动 `.frplugin` 都通过静态校验。新安装默认停用，显式启用后才运行。AssemblyLoadContext 隔离依赖，但插件在同一进程拥有当前用户权限，目录审核、哈希和服务门控不是安全沙箱。只启用信任的代码。

阅读[安装与管理](/docs/plugins/using-plugins)、[开发入门](/docs/plugins/developing/quick-start)、[Minecraft 专题](/docs/guides/minecraft/overview)。



## 内置与独立发布版本

FolderRewind 1.9.6 内置 MineRewind 1.9.8（API 3.9）。独立插件 Release 和官方目录当前仍提供 1.9.5（API 3.6），不含地图预览；不要为了获取新功能而将内置新版替换为旧独立包。Java 地图使用见[只读预览](/docs/guides/minecraft/world-preview)。

<span id="minerewind" />
<span id="安装插件" />
<span id="官方插件" />
<span id="成为开发者" />
<span id="插件能做什么" />
<span id="插件隔离" />
<span id="相关链接" />
