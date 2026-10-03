---
sidebar_position: 1
title: "项目目录与构建边界"
description: "FolderRewind 1.9 系列项目目录与构建边界操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# 项目目录与构建边界

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

## UI与宿主

Views处理视图和交互绑定，ViewModels提供状态与异步命令。Models按配置、范围、过滤、自动化、云、插件持久化与发现拆分；不再依赖旧1300行BackupModels.cs文件清单。Services包含Host适配、发现及Plugins/V3编排。

## 核心与外部仓库

Abstractions包含Manifest、Lifecycle、Capabilities、Snapshots、Identifiers、Artifacts和KnotLinkCoreCommands。Runtime管理Activation、Loading、Settings、Packaging、Operations和Artifact事务，不能作为第三方插件的公开引用。

MineRewind、官方Catalog、网站是独立仓库。工作区旁边存在这些checkout不代表Host解决方案依赖它们；验收绑定精确制品。目录用实际项目文件验证，不复制旧源码文件树冒充当前事实。

<span id="仓库根目录" />
<span id="主项目内部结构" />
<span id="关键入口文件" />
