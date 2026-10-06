---
sidebar_position: 1
title: "项目目录与构建边界"
description: "从仓库目录找到界面、历史核心、插件契约和验证工具，明确各项目的构建边界。"
reviewed_baseline: "1.9-api3.9"
---

# 项目目录与构建边界

从仓库目录找到界面、历史核心、插件契约和验证工具，明确各项目的构建边界。

```text
FolderRewind/
  Views/ ViewModels/ Models/ Services/
  History/
    Domain/ Storage/ Index/ LocalState/
    Application/ Representation/ Retention/ Cloud/ Migration/ Merge/
  Assets/ Strings/ Styles/ Controls/ Converters/
FolderRewind.Plugin.Abstractions/
FolderRewind.Plugin.Runtime/
FolderRewind.Tests/
FolderRewind.Plugin.Abstractions.Tests/
FolderRewind.Plugin.Runtime.Tests/
Installer/ .github/ docs/
```

## UI 与宿主

Views 处理视图和交互绑定，ViewModels 提供状态与异步命令。Models 按配置、范围、过滤、自动化、云、插件持久化与发现拆分；不再依赖旧 1300 行 BackupModels.cs 文件清单。Services 包含 Host 适配、发现及 Plugins/V3 编排。

## 核心与外部仓库

Abstractions 包含 Manifest、Lifecycle、Capabilities、Snapshots、Identifiers、Artifacts 和 KnotLinkCoreCommands。Runtime 管理 Activation、Loading、Settings、Packaging、Operations 和 Artifact 事务，不能作为第三方插件的公开引用。

MineRewind、官方 Catalog、网站是独立仓库。工作区旁边存在这些 checkout 不代表 Host 解决方案依赖它们；验收绑定精确制品。目录用实际项目文件验证，不复制旧源码文件树冒充当前事实。

<span id="主项目内部结构" />
<span id="仓库根目录" />
<span id="关键入口文件" />
