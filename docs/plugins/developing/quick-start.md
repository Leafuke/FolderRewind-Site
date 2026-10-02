---
sidebar_position: 1
title: "插件开发快速上手"
description: "FolderRewind 1.9 系列插件开发快速上手操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 插件开发快速上手

本页适用于 FolderRewind 1.9 系列、Plugin API 3.5。应用版本、插件产品版本、SDK 包版本和程序集版本独立演进。

## 准备环境

安装 .NET 10 SDK、Node.js 24 和 Python 3.10+；使用能支持 .NET 10 的编辑器。安装支持 API 3.5 的 FolderRewind。示例项目从[网站源码仓库](https://github.com/Leafuke/FolderRewind-Site/tree/codex/docs-1.9-refresh/examples/plugins)获取。

:::info[发布候选基线]
本教程使用 Abstractions 3.5.0。正式上线前必须确认 NuGet.org 已列出该版本。若公开恢复提示找不到版本，请核对发布状态，不要改为引用 FolderRewind.dll。网站发布分支的本地包验证不代表 SDK 已公开发布。
:::

## 创建独立类库

```powershell
dotnet new classlib -n MyFirstPlugin -f net10.0
dotnet add MyFirstPlugin package FolderRewind.Plugin.Abstractions --version 3.5.0
```

仅引用 `FolderRewind.Plugin.Abstractions`。不要引用应用、WinUI、Models 或 Runtime 项目。设置 SDK 引用的 `Private="false"`，不将 Abstractions DLL 放入发布包。

## 实现生命周期

下面直接展示可构建的 MinimalPlugin 源文件：

import CodeBlock from '@theme/CodeBlock';
import MinimalSource from '!!raw-loader!@site/examples/plugins/MinimalPlugin/Plugin.cs';

<CodeBlock language="csharp" title="MinimalPlugin/Plugin.cs">{MinimalSource}</CodeBlock>

激活阶段只读取设置／配置快照并注册能力。Host 校验并原子提交后才公开能力。无能力插件只展示生命周期；它不会自动增加备份按钮。

## 静态清单与设置

import MinimalManifest from '!!raw-loader!@site/examples/plugins/MinimalPlugin/manifest.json';
import MinimalSettings from '!!raw-loader!@site/examples/plugins/MinimalPlugin/settings.schema.json';

<CodeBlock language="json" title="manifest.json">{MinimalManifest}</CodeBlock>
<CodeBlock language="json" title="settings.schema.json">{MinimalSettings}</CodeBlock>

`manifestVersion` 为3，`pluginApi` 请求3.5。字段使用精确的 camelCase；入口类型必须与类的完全限定名一致。无设置仍需合法的空设置模式。

## 构建、打包与安装

在网站仓库根目录运行：

```powershell
node scripts/pack-plugin.mjs MinimalPlugin
Get-FileHash .\artifacts\examples\MinimalPlugin-1.0.0.frplugin -Algorithm SHA256
```

`.frplugin` 使用 ZIP 容器，根目录直接放置 `manifest.json`、`settings.schema.json` 和入口 DLL。包不携带 Abstractions。不要增加旧教程要求的顶层插件目录。

打开设置中的插件管理，选择本地安装并检查静态声明。新安装默认停用；明确启用后才执行代码。正常安装／启停可热切换；只有界面提示 RequiresRestart 时重启。

## 验证与排错

确认名称、版本、来源、请求服务和运行状态。若加载失败，依次检查 API 兼容、入口类型、静态设置类型、声明与能力注册一致性。不要仅依据启用开关判断激活成功。

下一步：[实战教程](/docs/plugins/developing/tutorial)、[API 参考](/docs/plugins/developing/plugin-api)、[打包与发布](/docs/plugins/developing/packaging)。

<span id="插件架构概览" />
<span id="生命周期" />
<span id="第一步创建项目" />
<span id="第二步编写-manifestjson" />
<span id="第三步实现最小插件" />
<span id="第四步打包为-zip" />
<span id="第五步安装与测试" />
<span id="验证加载成功" />
<span id="常见错误排查" />
<span id="下一步" />
