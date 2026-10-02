---
sidebar_position: 3
title: "命名空间与契约入口"
description: "FolderRewind 1.9 系列命名空间与契约入口操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 命名空间与契约入口

| 命名空间 | 当前职责 |
|---|---|
| FolderRewind.Views／ViewModels | 页面、交互、状态与命令 |
| FolderRewind.Models | 用户配置和Host持久化／UI模型 |
| FolderRewind.Services | Host编排、运行环境与适配 |
| FolderRewind.Services.Discovery | provider、清单、资源规划、审阅与草稿事务 |
| FolderRewind.Services.Plugins.V3 | SDK快照／请求与Host模型映射、运行及操作适配 |
| FolderRewind.History.Domain | Version／Checkpoint／Branch／Representation／Replica等不可变事实 |
| FolderRewind.History.Application | runtime、提交、还原、Checkout、Merge、迁移与传输 |
| FolderRewind.History.Storage／Index／LocalState | Commit Pack仓库、投影和设备状态 |
| FolderRewind.History.Representation／Retention／Cloud | 物化、保留依赖与共享事实／副本同步 |
| FolderRewind.Plugin.Abstractions | 第三方唯一公开SDK契约 |
| FolderRewind.Plugin.Runtime | 宿主插件运行时实现 |

插件作者从Abstractions导入IFolderRewindPlugin与能力，不从FolderRewind.Services.Plugins或FolderRewind.Models导入旧接口。显示名和namespace不是产品身份；版本兼容由manifest API决定。


