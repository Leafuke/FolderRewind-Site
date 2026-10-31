---
sidebar_position: 1
title: "项目目录与构建边界"
description: "从仓库目录找到 WinUI 界面、Core 历史、公开插件契约、运行时与验证工具，了解生产项目、测试和独立仓库的构建关系。"
reviewed_baseline: "1.10-api3.17"
---

# 项目目录与构建边界

```text
FolderRewind.slnx
src/
  FolderRewind/
  FolderRewind.Core/
  FolderRewind.Plugin.Abstractions/
  FolderRewind.Plugin.Runtime/
tests/
  FolderRewind.Tests/
  FolderRewind.Core.Recovery.Tests/
  FolderRewind.TestSupport/
  FolderRewind.Plugin.Abstractions.Tests/
  FolderRewind.Plugin.Runtime.Tests/
Installer/  tools/  benchmarks/  scripts/  docs/
```
源码放在 src，测试和共享夹具放在 tests。Installer 保存安装器源码；tools 保存独立探针；benchmarks 保存性能运行与分析入口；scripts 按 common、build、test、integration、release、maintenance 分组。输出统一写入被忽略的 artifacts。

应用保持 MVVM：Views、ViewModels、Models、Services 在各层内部按功能分组，同一个 partial 类型的文件放在一起。Controls、Converters、Styles、Strings、Assets 保留原有职责。目录变化不改变命名空间、配置格式或插件身份。

Core 包含 History 的领域、存储、索引、捕获、恢复、合并、保留、迁移和副本算法，以及不依赖 UI 的相关策略。应用保留启动、窗口、通知、资源加载和 Host 编排。Core 面向 Windows，不引用 WinUI；Runtime 不反向引用 Core，插件只引用 Abstractions。

MineRewind、Catalog、模板和网站保持独立仓库。Host 的 docs 只留领域术语、有效 ADR 与协议/安全约束；计划、进度和验收结果不长期入库。

<span id="仓库根目录" />
<span id="主项目内部结构" />
<span id="关键入口文件" />
