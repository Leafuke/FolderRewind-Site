---
sidebar_position: 1
title: "插件开发快速上手"
description: "使用公开 SDK 3.17.0 创建独立插件类库，了解生命周期和静态清单，构建 .frplugin，并在应用中安装、启用和检查结果。"
reviewed_baseline: "1.10-api3.17"
---

# 插件开发快速上手

从一个只实现生命周期的最小插件开始，先走通构建、打包和安装，再添加需要的能力。

## 准备环境与项目

安装 .NET 10 SDK、Node.js 24 和 Python 3.10+，获取[网站源码中的示例](https://github.com/Leafuke/FolderRewind-Site/tree/main/examples/plugins)。公开 NuGet 包 `FolderRewind.Plugin.Abstractions 3.17.0` 对应 API 3.17。

```powershell
dotnet new classlib -n MyFirstPlugin -f net10.0
dotnet add MyFirstPlugin package FolderRewind.Plugin.Abstractions --version 3.17.0
```

插件只引用 Abstractions。项目中设置该引用 `Private="false"`，发布包由宿主提供共享契约程序集。

## 实现生命周期

下面的代码直接来自可构建示例：

import CodeBlock from '@theme/CodeBlock';
import MinimalSource from '!!raw-loader!@site/examples/plugins/MinimalPlugin/Plugin.cs';

<CodeBlock language="csharp" title="MinimalPlugin/Plugin.cs">{MinimalSource}</CodeBlock>

激活时读取快照并注册能力，Host 验证后开放调用。这个最小示例用于检查激活和停用流程；下一步可以加入发现、命令等能力。

## 清单与设置

import MinimalManifest from '!!raw-loader!@site/examples/plugins/MinimalPlugin/manifest.json?raw';
import MinimalSettings from '!!raw-loader!@site/examples/plugins/MinimalPlugin/settings.schema.json?raw';

<CodeBlock language="json" title="manifest.json">{MinimalManifest}</CodeBlock>
<CodeBlock language="json" title="settings.schema.json">{MinimalSettings}</CodeBlock>

清单使用 `manifestVersion=3`、API major／minor 和稳定插件 ID。入口类型写完全限定名，设置模式即使没有项目也提供合法空数组。

## 构建与安装

在网站仓库根目录运行：

```powershell
node scripts/pack-plugin.mjs MinimalPlugin
Get-FileHash .\artifacts\examples\MinimalPlugin-1.0.0.frplugin -Algorithm SHA256
```

包根目录包含清单、设置和插件 DLL，私有依赖随包提供。打开应用的插件管理，使用本地安装，检查声明后启用。

查看实际运行状态和激活诊断。遇到加载问题时，依次核对 API、入口类型、设置与能力注册；界面要求重启时完成重启。

继续阅读[GameRewind 实战](/docs/plugins/developing/tutorial)、[API 参考](/docs/plugins/developing/plugin-api)和[打包说明](/docs/plugins/developing/packaging)。

<span id="下一步" />
<span id="常见错误排查" />
<span id="插件架构概览" />
<span id="生命周期" />
<span id="第一步创建项目" />
<span id="第三步实现最小插件" />
<span id="第二步编写-manifestjson" />
<span id="第五步安装与测试" />
<span id="第四步打包为-zip" />
<span id="验证加载成功" />

<span id="准备环境" />
<span id="创建独立类库" />

<span id="静态清单与设置" />
<span id="构建打包与安装" />
<span id="验证与排错" />
