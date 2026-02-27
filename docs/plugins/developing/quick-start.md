---
sidebar_position: 1
title: 插件开发快速上手
description: 从零开始开发一个 FolderRewind 插件
---

# 插件开发快速上手

本指南将帮助你了解 FolderRewind 插件开发的基本流程。

:::info 前置要求
- Visual Studio 2022 或更高版本
- .NET 10 SDK
- FolderRewind 已安装
:::

## 插件架构概览

FolderRewind 插件基于 .NET 构建，主要包含以下接口：

| 接口 | 用途 |
|------|------|
| `IFolderRewindPlugin` | 插件主入口，定义生命周期和功能 |
| `IFolderRewindHotkeyProvider` | 注册自定义全局快捷键 |
| `IFolderRewindKnotLinkCommandHandler` | 处理 KnotLink IPC 命令 |

## 开发流程

### 1. 创建项目

创建一个 .NET 类库项目：

```powershell
dotnet new classlib -n MyPlugin -f net10.0
```

### 2. 添加引用

将 FolderRewind 的插件 SDK 引用添加到项目中。

```xml
<!-- MyPlugin.csproj -->
<ItemGroup>
  <!-- 引用 FolderRewind 提供的插件接口程序集 -->
  <!-- 具体路径参考 FolderRewind 安装目录 -->
</ItemGroup>
```

### 3. 实现插件接口

```csharp
using FolderRewind.Plugins;

public class MyPlugin : IFolderRewindPlugin
{
    public string Name => "MyPlugin";
    public string Version => "1.0.0";
    public string Description => "我的第一个 FolderRewind 插件";

    // 实现插件接口方法...
}
```

### 4. 打包与测试

1. 编译项目生成 DLL 文件
2. 将 DLL 放置到 FolderRewind 的插件目录
3. 重启 FolderRewind 验证插件加载

## 插件配置定义

插件可以定义配置 Schema，FolderRewind 会自动生成设置界面。

## 自动更新

插件支持通过 GitHub Release 实现自动更新检查。

## 参考资料

- [插件系统概述](../overview) — 了解插件能力边界
- [MineRewind 源码](https://github.com/Leafuke/FolderRewind) — 官方插件示例

> 💡 更详细的 API 文档将在后续版本中补充（Plugin API、Hotkey API、KnotLink API 等）。
