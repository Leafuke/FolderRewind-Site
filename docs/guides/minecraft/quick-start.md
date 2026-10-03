---
sidebar_position: 2
title: "Minecraft 快速开始"
description: "FolderRewind 1.9 系列Minecraft 快速开始操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# Minecraft 快速开始

## 安装并启用

使用 FolderRewind 1.9.3（API3.6）与 MineRewind 1.9.5，按 Release 核对来源和版本。设置→插件管理从目录或本地 .frplugin 安装，检查声明并显式启用。看到 Enabled Intent 后还需确认 Active；旧1.8 ZIP不能兼容。

## 发现实例

从首页的 Minecraft 创建流程、插件批量发现或游戏发现 Beta 自动发现，也可选择 .minecraft／versions／实例 saves 根。检查生成的备份集合／世界草稿、Kind、目标目录和来源范围；摘要确认后由 Host 创建。AutoCreateConfigs 默认 false；AutoDiscoverSaves 默认 true。多实例可分别建配置。

## 首次验证

用世界副本，先停止游戏写入，执行 Full 备份并在测试目录还原，比较内容。再联调 KnotLink Server v3 与对应游戏组件，确认运行时 GET_CAPABILITIES 暴露当前世界命令。

不要寻找旧 EnableHotBackup 选项；一致性由配置请求 Prefer／Require 和运行时 provider 决定。若启用 PreservePlayerData，另测试全 UUID、false override、stats／advancements及布局兼容。

## 下一步

[区域保护](/docs/guides/minecraft/selected-region-backup)、[热备份](/docs/guides/minecraft/hot-backup)、[热还原](/docs/guides/minecraft/hot-restore)。真实游戏加载必须单独验收，文件级测试不替代它。

## 多启动器与基岩版

首页“新建备份项目 → Minecraft”可直接自动发现；也可选择启动器目录、游戏根、实例库、saves、minecraftWorlds 或单世界。支持官方 Java、HMCL、PCL2、PCLCE、Prism Launcher、Modrinth App、网易和常见 Bedrock 位置；自定义或便携目录未找到时手选补足，不做全盘搜索。

自动发现可合并已知位置和记住的根，手选仅检查选定范围。勾选草稿后继续向导设置名称、目标位置并审阅，不在扫描阶段直接创建项目。Minecraft 配置可包含普通文件夹，它们使用普通文件备份，不强行识别为世界。

Bedrock 使用独立 Kind 的普通文件流程，先关闭游戏；不支持 Java 的 NBT 玩家保留、selected-regions 或当前世界 KnotLink 协调。Java 热备份能力不能直接套用到基岩版。

<span id="步骤-1安装插件" />
<span id="步骤-2扫描-minecraft" />
<span id="步骤-3验证一次备份" />
<span id="推荐设置" />
