---
sidebar_position: 3
title: "命名空间与契约入口"
description: "按命名空间查找实现入口，区分宿主模型、公开插件契约和运行时职责。"
reviewed_baseline: "development-1.10"
---

# 命名空间与契约入口

> 本页描述 1.10 开发分支的重构布局，尚未表示正式版已发布。

命名空间保持稳定，目录和程序集承担新的组织边界。

| 命名空间 | 职责与归属 |
|---|---|
| FolderRewind.Views / ViewModels | 应用界面与交互 |
| FolderRewind.Models | 纯模型可在 Core；应用配置根与呈现模型继续由 Host 组织 |
| FolderRewind.Services | Core 的无 UI 策略，以及应用的编排/适配；按项目归属区分 |
| FolderRewind.History.* | Core 历史能力；Host 绑定入口仍在应用 |
| FolderRewind.Plugin.Abstractions | 插件唯一公开 SDK |
| FolderRewind.Plugin.Runtime | 加载、激活、能力路由、Artifact 事务 |

查找代码时先看项目引用和实际文件位置，不依据 namespace 推断程序集。程序集、配置身份和插件 manifest 身份不是目录名。第三方插件不得因迁移而新增对 Core、Runtime 或应用项目的引用。
