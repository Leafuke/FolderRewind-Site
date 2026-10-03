---
slug: v{{VERSION}}-release
title: FolderRewind v{{VERSION}} 发布
authors: [leafuke]
tags: [release]
description: FolderRewind 1.9 系列正式发布，新增原生不可变历史、分支与安全恢复点、游戏发现、云副本恢复和独立 Plugin API 3.6，附升级迁移及兼容说明
---

FolderRewind {{VERSION}} 的正式信息与下载附件见[官方 Release]({{RELEASE_URL}})。

{/* truncate */}

## 更新内容

- Full、Smart、Rolling：Rolling创建不可变新包，保留旧归档。
- 原生历史、配置Checkpoint、分支、文件级合并、安全快照与恢复点。
- 游戏发现Beta及来源范围审阅，配置归用户拥有。
- 云历史并集、可信副本准备及恢复到新目录。
- Plugin System v3与独立Abstractions3.6.0、静态.frplugin、typed settings及官方目录。
- 内置 MineRewind 1.9.5，多启动器与基岩版发现；Java 普通Restore全UUID玩家保留、方块坐标范围和配置级环境协调。

## 升级和使用

升级前备份配置、历史、插件数据、归档和加密恢复材料。旧v2代码不加载，用户数据按受控迁移处理；新版数据回退旧版时使用升级前副本。

[安装](/docs/getting-started/installation) · [1.9升级](/docs/getting-started/v1-9-upgrade) · [插件迁移](/docs/plugins/developing/migration-v2-v3) · [历史](/docs/guides/history-timeline) · [发现](/docs/guides/game-discovery) · [云](/docs/guides/cloud-archive)

GitHub提供x64／ARM64 Setup EXE与SHA-256；Store按实际商店版本获取。Minecraft合并保守处理文件冲突，部分捕获强制Overwrite；不要把API夹具测试当真实游戏加载证明。
