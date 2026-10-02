---
sidebar_position: 2
title: "Minecraft 快速开始"
description: "FolderRewind 1.9 系列Minecraft 快速开始操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# Minecraft 快速开始

## 安装并启用

使用支持 API3.5 的 Host 和 MineRewind1.9.3候选；正式使用按 Release 核对。设置→插件管理从目录或本地 .frplugin 安装，检查声明并显式启用。看到 Enabled Intent 后还需确认 Active；旧1.8 ZIP不能兼容。

## 发现实例

从首页的 Minecraft 创建流程、插件批量发现或游戏发现 Beta 选择 .minecraft／versions／实例 saves 根。检查生成的备份集合／世界草稿、Kind、目标目录和来源范围；摘要确认后由 Host 创建。AutoCreateConfigs 默认 false；AutoDiscoverSaves 默认 true。多实例可分别建配置。

## 首次验证

用世界副本，先停止游戏写入，执行 Full 备份并在测试目录还原，比较内容。再联调 KnotLink Server v3 与对应游戏组件，确认运行时 GET_CAPABILITIES 暴露当前世界命令。

不要寻找旧 EnableHotBackup 选项；一致性由配置请求 Prefer／Require 和运行时 provider 决定。若启用 PreservePlayerData，另测试全 UUID、false override、stats／advancements及布局兼容。

## 下一步

[区域保护](/docs/guides/minecraft/selected-region-backup)、[热备份](/docs/guides/minecraft/hot-backup)、[热还原](/docs/guides/minecraft/hot-restore)。真实游戏加载必须单独验收，文件级测试不替代它。

<span id="步骤-1安装插件" />
<span id="步骤-2扫描-minecraft" />
<span id="步骤-3验证一次备份" />
<span id="推荐设置" />
