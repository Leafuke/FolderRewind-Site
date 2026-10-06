---
sidebar_position: 0
title: "架构总览"
description: "了解 FolderRewind 的技术栈与系统边界，从界面编排追踪到配置、历史、插件和归档。"
reviewed_baseline: "1.9-api3.9"
---

# 架构总览

了解 FolderRewind 的技术栈与系统边界，从界面编排追踪到配置、历史、插件和归档。

FolderRewind 是.NET10／WinUI3 Windows 应用，当前项目 Windows App SDK2.5.1。UI 使用 MVVM 与可测试命令编排，核心历史和插件运行时通过实例服务与显式依赖组织；不能把所有业务解释成静态单例。

```mermaid
flowchart TD
  V[Views / ViewModels] --> H[Host application orchestration]
  H --> C[User-owned configuration]
  H --> N[Native History runtime]
  H --> P[Plugin Runtime]
  P --> A[Public Abstractions API 3.9]
  N --> R[Representations / Replicas]
  R --> Z[7-Zip / cloud transport]
  H --> D[Discovery / reviewed drafts]
```

## 边界

Host、SDK、Runtime 与 MineRewind 独立产品／构建边界。SDK 仅 BCL，net10.0；Runtime 可无 WinUI 测试；第三方插件只依赖 SDK。Host 使用固定哈希.frplugin 验收，不以插件应用源码作为构建输入。

配置由用户拥有；发现提出候选，插件对账提出修订提案。Native History 用不可变事实与可重建索引；设备 Workspace 与共享分支区分。还原由 Host 先物化／校验，再在操作门内修改目标；插件不能绕过。

查看[目录](/docs/architecture/directory-structure)、[模式](/docs/architecture/patterns)、[服务](/docs/architecture/services)、[模型](/docs/architecture/data-models)与[插件体系](/docs/architecture/plugin-system)。

<span id="技术栈" />
<span id="文档导航" />
<span id="架构鸟瞰" />
