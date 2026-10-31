---
sidebar_position: 2
title: "Minecraft 快速开始"
description: "启用内置 MineRewind，自动发现或手选 Java 与 Bedrock 世界，检查来源与备份位置，完成第一次备份、还原和地图浏览。"
reviewed_baseline: "1.10-api3.17"
---

# Minecraft 快速开始

## 1. 启用 MineRewind

打开设置的插件管理，查看内置 MineRewind 并启用，确认实际运行状态。独立更新也可使用官方目录或可信 `.frplugin`，见[插件管理](/docs/plugins/using-plugins)。

## 2. 找到你的世界

从首页“新建备份项目 → Minecraft”进入，可以直接自动发现存档，也可以选择目录扫描。

- 自动发现会结合已知位置和记住的根目录。
- 手选可以使用启动器目录、游戏根、实例库、`saves`、`minecraftWorlds` 或单个世界目录。
- 常见位置覆盖官方 Java、HMCL、PCL2、PCLCE、Prism Launcher、Modrinth App、网易与 Bedrock；便携或自定义位置可手动补充。

勾选需要的世界，检查 Java／Bedrock 类型、完整路径与范围，填写项目名和独立备份位置，再确认摘要。多个实例可以分别创建项目。

## 3. 保存与还原

第一次练习使用世界副本，先退出游戏，再创建 Full 备份。打开历史找到该版本，恢复到测试目录，检查文件并在测试实例中加载。

Java 世界可以继续打开[地图预览](/docs/guides/minecraft/world-preview)，浏览维度和玩家位置。Bedrock 操作前保持游戏关闭，使用普通文件备份与还原。

## 4. 加入日常设置

确认流程后设置[自动备份](/docs/guides/automation)、[保留数量](/docs/guides/backup-modes)和[云副本](/docs/guides/cloud-archive)。游戏中操作时，按[热备份](/docs/guides/minecraft/hot-backup)准备 KnotLink 与游戏侧组件。

MineRewind 的 `AutoDiscoverSaves` 默认开启，`AutoCreateConfigs` 和 `PreservePlayerData` 默认关闭。按需要在插件设置中调整；玩家保留见[热还原指南](/docs/guides/minecraft/hot-restore)。

<span id="下一步" />
<span id="推荐设置" />
<span id="步骤-1安装插件" />
<span id="步骤-2扫描-minecraft" />
<span id="步骤-3验证一次备份" />

<span id="安装并启用" />
<span id="发现实例" />
<span id="首次验证" />
<span id="多启动器与基岩版" />
