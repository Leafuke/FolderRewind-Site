---
sidebar_position: 3
title: "命名空间与契约入口"
description: "按命名空间查找实现入口，区分宿主模型、公开插件契约和运行时职责。"
reviewed_baseline: "1.9-api3.9"
---

# 命名空间与契约入口

按命名空间查找实现入口，区分宿主模型、公开插件契约和运行时职责。

| 命名空间 | 当前职责 |
|---|---|
| FolderRewind.Views／ViewModels | 页面、交互、状态与命令 |
| FolderRewind.Models | 用户配置和 Host 持久化／UI 模型 |
| FolderRewind.Services | Host 编排、运行环境与适配 |
| FolderRewind.Services.Discovery | provider、清单、资源规划、审阅与草稿事务 |
| FolderRewind.Services.Plugins.V3 | SDK 快照／请求与 Host 模型映射、运行及操作适配 |
| FolderRewind.History.Domain | Version／Checkpoint／Branch／Representation／Replica 等不可变事实 |
| FolderRewind.History.Application | runtime、提交、还原、Checkout、Merge、迁移与传输 |
| FolderRewind.History.Storage／Index／LocalState | Commit Pack 仓库、投影和设备状态 |
| FolderRewind.History.Representation／Retention／Cloud | 物化、保留依赖与共享事实／副本同步 |
| FolderRewind.Plugin.Abstractions | 第三方唯一公开 SDK 契约 |
| FolderRewind.Plugin.Runtime | 宿主插件运行时实现 |

插件作者从 Abstractions 导入 IFolderRewindPlugin 与能力，不从 FolderRewind.Services.Plugins 或 FolderRewind.Models 导入旧接口。显示名和 namespace 不是产品身份；版本兼容由 manifest API 决定。
