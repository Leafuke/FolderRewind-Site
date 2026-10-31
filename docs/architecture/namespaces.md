---
sidebar_position: 3
title: "命名空间与契约入口"
description: "结合命名空间、项目引用与实际文件位置查找实现，了解 Host 模型、Core、公开插件契约与 Runtime 的程序集职责。"
reviewed_baseline: "1.10-api3.17"
---

# 命名空间与契约入口

命名空间保持稳定，目录和程序集承担新的组织边界。

| 命名空间 | 职责与归属 |
|---|---|
| FolderRewind.Views / ViewModels | 应用界面与交互 |
| FolderRewind.Models | 纯模型可在 Core；应用配置根与呈现模型继续由 Host 组织 |
| FolderRewind.Services | Core 的无 UI 策略，以及应用的编排/适配；按项目归属区分 |
| FolderRewind.History.* | Core 历史能力；Host 绑定入口仍在应用 |
| FolderRewind.Plugin.Abstractions | 插件唯一公开 SDK |
| FolderRewind.Plugin.Runtime | 加载、激活、能力路由、Artifact 事务 |

查找代码时结合项目引用与实际文件位置确认程序集归属。程序集、配置和 manifest 各自使用稳定身份；第三方插件通过公开 Abstractions 契约接入。
