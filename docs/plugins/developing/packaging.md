---
sidebar_position: 7
title: "插件打包与发布"
description: "FolderRewind 1.9 系列插件打包与发布操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# 插件打包与发布

## 包结构

```text
MyPlugin-1.0.0.frplugin
├─ manifest.json
├─ settings.schema.json
├─ MyPlugin.dll
└─ private-dependency.dll
```

这是 ZIP 容器，根目录直接放文件。禁止携带 FolderRewind.Plugin.Abstractions.dll；宿主共享程序集身份3.0.0.0。私有依赖可以随包携带。使用[可构建示例](/docs/plugins/developing/quick-start)的打包脚本，不复制旧 ZIP 顶层目录规则。

## Manifest

manifestVersion=3；pluginId 是稳定反向域名；version 为严格 SemVer；pluginApi 为 major/minor；entryAssembly 和 settingsSchema 为规范相对路径，entryType 完全限定。name、description、本地化字典、configKinds、requestedHostServices、capabilities、Artifact 声明和 observer 标记与实际实现一致。

author／homepage／repository 是描述信息，repository 不授予官方来源或自动更新信任。JSON字段严格 camelCase，不能保留旧 Id／EntryAssembly／MinHostVersion。

## 静态验证

检查哈希、Windows 安全路径、大小写冲突、链接、展开大小、压缩比、声明的文件、设置 JSON、API／架构以及 PE 入口元数据。当前默认限制：10000条目、总展开1 GiB、单条256 MiB、压缩比100、清单1 MiB。安装不装载候选程序集、不执行构造器／生命周期／安装脚本。

## 发布

构建固定版本 `.frplugin` 与同名 SHA-256。使用不可变 Release 附件并保留旧版本供审核／恢复。正式官方更新需要 Catalog 绑定精确 URL、哈希、API、架构和 manifest；不能通过 manifest 自称 Official。

在干净 Host 验证安装默认停用、显式启用、设置、取消、停用、更新／回滚及失败恢复后再发布。SDK包版本、插件产品 SemVer、宿主版本彼此独立。

<span id="zip-结构要求" />
<span id="构建脚本" />
<span id="powershell" />
<span id="dotnet-publish--手动打包" />
<span id="manifestjson-完整字段" />
<span id="发布前检查清单" />
<span id="版本策略" />
<span id="相关链接" />
