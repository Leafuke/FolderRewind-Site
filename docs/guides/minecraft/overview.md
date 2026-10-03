---
sidebar_position: 1
title: "Minecraft 专题总览"
description: "FolderRewind 1.9 系列Minecraft 专题总览操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# Minecraft 专题总览

FolderRewind 1.9 系列的 Minecraft 后端为 MineRewind v3。FolderRewind 1.9.3 内置正式 MineRewind 1.9.5，要求 API3.6；游戏侧模组／服务端插件使用自己的版本线，真实游戏加载仍需单独验证。

## 组件分工

FolderRewind 管理配置、历史、归档、云副本与 Safe Restore。MineRewind 负责实例发现、范围、一致性、元数据、环境协调与玩家暂存提案。MineBackup-Mod／MineBackupPlugin 在游戏端保存、冻结写入或退出；Death Rewind／JEA 通过游戏侧 API 请求备份／还原。

单人／LAN房主、模组化专用服务器和 Spigot/Paper 的退出／重进流程不同；服务端 Sidecar 不等于客户端自动重连。查看各组件教程与实际 Release 支持矩阵。

## 入门与发现

安装可信 .frplugin 并显式启用。静态设置 AutoDiscoverSaves 默认 true、AutoCreateConfigs 默认 false、PreservePlayerData 默认 false；v3 不再提供旧 EnableHotBackup 开关。按实例发现草稿并核对 worlds、Kind 和保存路径后创建，不用旧插件直接写配置的方法。

## 热备份与还原

使用 session.lock 的占用判断活动世界。备份通过一致性租约协调落盘和稳定来源；Prefer 可降级为带警告原始备份，Require 不满足时阻断。还原前必须协调外部写入，缺少必需提供器不能静默绕过。

默认快捷键 Alt+Ctrl+S／Alt+Ctrl+Z 分别备份／Quick Restore；Quick Restore 由 Host 选活动分支唯一本地尖端，不承诺“前一个时间点”。KnotLink 支持6个 current_save 选择器，参数复用 Host 命令。

## 玩家与区域

普通 Restore 可以保留全部 UUID 的选定 NBT 字段；stats／advancements仍恢复，跨26.1布局保留拒绝。Checkout／Merge 不保留玩家状态。区域输入是方块坐标，部分捕获强制 Overwrite，详见[区域教程](/docs/guides/minecraft/selected-region-backup)。

从[快速开始](/docs/guides/minecraft/quick-start)进入，继续阅读[热备份](/docs/guides/minecraft/hot-backup)、[热还原](/docs/guides/minecraft/hot-restore)和[故障排查](/docs/guides/minecraft/troubleshooting)。

import MinecraftEcosystem from '@site/src/components/MinecraftEcosystem';

<MinecraftEcosystem />

## Java、Bedrock 与普通目录

MineRewind 1.9.5 扩展多启动器与 Bedrock 发现，详见[快速开始](/docs/guides/minecraft/quick-start)。Java、Bedrock 和配置中的普通文件夹应分别理解：Java 世界可使用对应协调、NBT 与区域能力；Bedrock 是独立 Kind 的普通文件流程，需关闭游戏；普通目录不捕获可选世界元数据。发现成功不代表真实游戏加载验收完成。

Minecraft Merge 使用 Host 的保守文件级三方合并，没有 region／chunk／NBT 语义合并。

<span id="典型组合" />
<span id="minerewind-能力" />
<span id="1-存档发现与批量建配置" />
<span id="2-热备份协同" />
<span id="3-当前世界热还原" />
<span id="4-全局热键" />
<span id="5-knotlink-参数化命令" />
<span id="6-可选的玩家数据保留" />
<span id="使用前置条件" />
<span id="风险与边界" />
<span id="下一步" />
