---
sidebar_position: 0
title: 快速开始
description: 5 分钟上手 FolderRewind
---

# 快速开始

欢迎使用 **FolderRewind（存档时光机）**。它是一个面向重要文件、项目资料与游戏存档的现代化备份工具，同时也是 MineBackup 的后继作品。

:::caution 升级前建议
如果你是从旧版本升级，先阅读 [1.8 升级与启动故障恢复](/docs/getting-started/v1-8-upgrade)，并在测试目录完成几轮备份与还原演练，再把新版本投入生产使用。
:::

## FolderRewind 现在适合做什么

FolderRewind 可以帮助你：

- 使用 **7-Zip 引擎** 创建高压缩率、可加密的版本化备份
- 通过 **智能增量链、链长控制与安全删除** 长期管理历史记录
- 使用 **核心功能自动校验**，在当前电脑上快速验证备份、还原、安全删除等关键流程是否正常
- 创建并复用 **配置模板**，把备份策略、过滤器和路径规则沉淀成可重复使用的方案
- 通过 **模板分享、导入与官方模板搜索**，在不同设备或不同用户之间快速复用配置
- 通过 **云存档能力（rclone）**，将本地备份目录稳定同步到 OneDrive 等云端
- 使用 **设置页搜索与运行状态显示**，更快定位配置项并判断当前软件状态
- 借助 **插件系统** 深度适配特定场景，例如 Minecraft 存档管理

## 三步开始使用

### 第一步：安装

优先从 Microsoft Store 安装，或参考 [安装指南](/docs/getting-started/installation) 进行侧载安装。

> 建议优先使用 Microsoft Store 下载，**请勿同时安装商店版与当前页面下载的离线版**。

<a href="https://apps.microsoft.com/detail/9nwsdgxdqws4" target="_blank">
  👉 从 Microsoft Store 安装
</a>

### 第二步：创建配置

你现在有两种常见方式：

1. 点击 **新建配置**，手动创建一个普通配置
2. 点击 **从模板创建**，直接套用现成模板并自动识别可加入的来源文件夹

![新建配置对话框，显示配置名称、类型和图标选项](/img/docs/intro/create-config-and-add-folder-entry.webp)

如果你已经整理出一套稳定的规则，也可以在配置设置中将当前配置 **保存为模板**，以后重复使用。

### 第三步：执行首轮备份并验证

进入配置管理页后：

1. 添加要保护的文件夹，或确认模板自动识别出的文件夹列表
2. 执行一次手动备份
3. 建议立刻做一次测试还原，或到设置页运行 **核心功能自动校验**

这样可以更早发现环境、路径、权限或第三方工具相关的问题。

## 近期能力

FolderRewind 1.8 系列把备份控制、迁移和远程联动放在同一条安全链路中：

- **区域范围备份**：Minecraft 可按 `x1,z1,x2,z2` 选择区域，并在还原时强制使用 Overwrite。
- **文件夹重命名**：迁移本地目录、历史身份、配置引用和自动化目标，并在失败时尝试回滚。
- **性能预设与高级参数**：按自动、轻量、极轻量或自定义策略平衡速度、线程和优先级。
- **KnotLink Server v3 与参数化协议 v2**：让远程工具和插件通过可发现的命令、安全地联动备份流程。
- **安全还原**：先验证备份，再按普通或部分备份规则选择 Clean / Overwrite，避免误清空未备份数据。

升级旧版本或更换安装渠道前，请先阅读 [1.8 升级与启动故障恢复](/docs/getting-started/v1-8-upgrade)。
Minecraft 用户还可以从 [区域范围备份指南](/docs/guides/minecraft/selected-region-backup) 和 [文件夹重命名指南](/docs/guides/folder-management) 开始。

## 下一步

- [安装指南](/docs/getting-started/installation)
- [首次备份](/docs/getting-started/first-backup)
- [首次还原](/docs/getting-started/first-restore)
- [模板：创建与使用](/docs/guides/templates)
- [模板：分享与导入](/docs/guides/template-sharing)
- [自动化任务](/docs/guides/automation)
- [云存档功能介绍](/docs/guides/cloud-archive)
