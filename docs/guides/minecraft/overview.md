---
sidebar_position: 1
title: "Minecraft 专题总览"
description: "使用内置 MineRewind 发现和保护 Minecraft 存档，选择热备份、玩家保留、区域备份、地图预览与世界合并，并配置游戏侧联动。"
reviewed_baseline: "1.10-api3.17"
---

# Minecraft 专题总览

从一份世界备份开始，你可以逐步加入自动保存、地图浏览和游戏内快捷操作。FolderRewind 内置的 MineRewind 负责识别 Minecraft 世界并提供相关能力。

## 选择要做的事

| 场景 | 从这里开始 |
| --- | --- |
| 找到世界并保存第一份备份 | [快速开始](/docs/guides/minecraft/quick-start) |
| 游戏运行时备份 | [热备份](/docs/guides/minecraft/hot-backup) |
| 回档并保留玩家位置或背包 | [热还原与玩家保留](/docs/guides/minecraft/hot-restore) |
| 只保护指定区域 | [区域备份](/docs/guides/minecraft/selected-region-backup) |
| 查看地形或比较历史版本 | [世界地图](/docs/guides/minecraft/world-preview) |
| 合并不同分支的建筑与地形 | [世界合并](/docs/guides/minecraft/world-merge) |

## Java、Bedrock 与普通目录

Java 世界可使用地图、区域、NBT 玩家保留和游戏协调。Bedrock 世界按完整普通文件夹备份，先退出游戏再操作。Minecraft 项目中也可以添加整合包配置等普通目录，它们沿用普通文件流程。

自动发现支持常见启动器位置，也可手选启动器、实例库、saves 或单世界目录。确认草稿中的路径、版别和范围后创建项目。

## 游戏侧组件

FolderRewind 保存归档、历史和云副本，MineRewind 解析世界并协调操作。游戏内命令和保存、退出、重进由对应游戏侧组件提供，KnotLink 负责传递请求与状态。

import MinecraftEcosystem from '@site/src/components/MinecraftEcosystem';

<MinecraftEcosystem />

单人、LAN 房主、模组化专用服务器和 Spigot/Paper 使用各自的联动流程。按游戏版本与加载器准备组件，再在测试世界练习一次备份、还原和重新进入。

## 日常使用

默认 `Alt+Ctrl+S` 请求备份当前世界，`Alt+Ctrl+Z` 请求快速还原；后者使用活动分支的唯一尖端版本。想找更早内容，可以直接在历史中选择版本。

普通还原可按设置保留所有玩家的选定状态，统计和进度随备份恢复。分支操作使用分支与合并结果。更多选项见[热还原](/docs/guides/minecraft/hot-restore)，问题处理见[故障排查](/docs/guides/minecraft/troubleshooting)。

<span id="1-存档发现与批量建配置" />
<span id="2-热备份协同" />
<span id="3-当前世界热还原" />
<span id="4-全局热键" />
<span id="5-knotlink-参数化命令" />
<span id="6-可选的玩家数据保留" />
<span id="minerewind-能力" />
<span id="下一步" />
<span id="使用前置条件" />
<span id="典型组合" />
<span id="风险与边界" />

<span id="组件分工" />
<span id="入门与发现" />
<span id="热备份与还原" />
<span id="玩家与区域" />

<span id="内置与独立发布版本" />
