---
sidebar_position: 1
title: 插件开发快速上手
description: 从零开始开发一个 FolderRewind 插件
---

# 插件开发快速上手

本指南将带你完成 FolderRewind 插件开发的完整流程：从创建项目到安装测试。

:::info 前置要求
- Visual Studio 2022 或 JetBrains Rider
- .NET 10 SDK
- FolderRewind 已安装（[下载页](/download)）
:::

## 插件架构概览

FolderRewind 插件基于 .NET 类库构建，通过接口与宿主交互。每个插件必须实现核心接口，可选择实现扩展接口：

| 接口 | 必选 | 用途 |
|------|:----:|------|
| `IFolderRewindPlugin` | ✅ | 插件主入口：生命周期、备份/还原钩子、配置发现 |
| `IFolderRewindHotkeyProvider` | — | 注册自定义快捷键（全局或应用内） |
| `IFolderRewindKnotLinkCommandHandler` | — | 扩展 KnotLink IPC 命令集 |
| `IFolderRewindParameterizedKnotLinkCommandHandler` | — | 新版参数化 KnotLink 命令 |
| `IFolderRewindBackupScopeProvider` | — | 定义备份范围/过滤策略（如按区域备份） |

插件运行在宿主进程中，但通过 `AssemblyLoadContext` 实现依赖隔离，互不干扰。

### 生命周期

```mermaid
graph LR
    A[创建项目] --> B[实现接口]
    B --> C[打包 ZIP]
    C --> D[安装到 FolderRewind]
    D --> E[启用插件]
    E --> F[Initialize 调用]
    F --> G[运行中 — 钩子/命令/快捷键]
```

## 第一步：创建项目

创建一个 .NET 10 类库项目：

```powershell
dotnet new classlib -n MyFirstPlugin -f net10.0
```

在 `.csproj` 中添加 FolderRewind 插件接口的引用。你需要引用 FolderRewind 安装目录下的接口程序集：

```xml
<!-- MyFirstPlugin.csproj -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <!-- 引用 FolderRewind 的插件接口程序集 -->
    <!-- 路径根据你的 FolderRewind 安装目录调整 -->
    <Reference Include="FolderRewind">
      <HintPath>..\..\FolderRewind\FolderRewind\bin\Release\net10.0-windows10.0.26100.0\FolderRewind.dll</HintPath>
    </Reference>
  </ItemGroup>
</Project>
```

## 第二步：编写 manifest.json

每个插件必须在根目录包含一个 `manifest.json`，描述插件的基本信息：

```json
{
  "Id": "com.example.myfirstplugin",
  "Name": "MyFirstPlugin",
  "Version": "1.0.0",
  "Author": "YourName",
  "Description": "我的第一个 FolderRewind 插件",
  "EntryAssembly": "MyFirstPlugin.dll",
  "EntryType": "MyFirstPlugin.MyPlugin"
}
```

**字段说明：**

| 字段 | 必选 | 说明 |
|------|:----:|------|
| `Id` | ✅ | 全局唯一标识，建议反向域名风格 |
| `Name` | ✅ | 插件显示名称 |
| `Version` | ✅ | 语义化版本号（`MAJOR.MINOR.PATCH`） |
| `Author` | ✅ | 作者名称 |
| `Description` | ✅ | 一句话描述 |
| `EntryAssembly` | ✅ | 入口 DLL 文件名 |
| `EntryType` | ✅ | 入口类型的完全限定名 |
| `LocalizedName` | — | 多语言名称 `{"en-US": "...", "zh-CN": "..."}` |
| `LocalizedDescription` | — | 多语言描述 |
| `MinHostVersion` | — | 最低宿主版本 |
| `Homepage` | — | 插件主页链接 |
| `Repository` | — | GitHub 仓库（`owner/repo`，用于自动更新） |

## 第三步：实现最小插件

创建 `MyPlugin.cs`，实现 `IFolderRewindPlugin` 的必要成员：

```csharp
using FolderRewind.Models;
using FolderRewind.Services.Plugins;

namespace MyFirstPlugin
{
    public class MyPlugin : IFolderRewindPlugin
    {
        // 必选：插件清单（与 manifest.json 保持一致）
        public PluginInstallManifest Manifest { get; } = new()
        {
            Id = "com.example.myfirstplugin",
            Name = "MyFirstPlugin",
            Version = "1.0.0",
            Author = "YourName",
            Description = "我的第一个 FolderRewind 插件",
            EntryAssembly = "MyFirstPlugin.dll",
            EntryType = "MyFirstPlugin.MyPlugin"
        };

        // 必选：声明插件设置（无设置则返回空列表）
        public IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions()
            => new List<PluginSettingDefinition>();

        // 必选：插件启用时调用一次
        public void Initialize(IReadOnlyDictionary<string, string> settingsValues)
        {
            // 读取设置、预热状态等
        }

        // 必选：备份前钩子（返回 null 表示不修改备份源路径）
        public string? OnBeforeBackupFolder(
            BackupConfig config,
            ManagedFolder folder,
            IReadOnlyDictionary<string, string> settingsValues)
            => null;

        // 必选：备份后钩子
        public void OnAfterBackupFolder(
            BackupConfig config,
            ManagedFolder folder,
            bool success,
            string? generatedArchiveFileName,
            IReadOnlyDictionary<string, string> settingsValues)
        {
            // 清理、日志、元数据等
        }

        // 必选：文件夹发现（返回空列表表示不自动发现）
        public IReadOnlyList<ManagedFolder> TryDiscoverManagedFolders(
            string selectedRootPath,
            IReadOnlyDictionary<string, string> settingsValues)
            => new List<ManagedFolder>();
    }
}
```

:::tip
`IFolderRewindPlugin` 的许多方法有默认实现（如 `OnBeforeRestoreFolder`、`WantsToHandleBackup` 等），你只需实现上述 6 个必要成员即可让插件正常加载。
:::

## 第四步：打包为 ZIP

插件以 ZIP 包形式分发。ZIP 内必须包含一个顶层目录，其中放置 `manifest.json` 和编译产物：

```text
MyFirstPlugin.zip
└─ MyFirstPlugin/
   ├─ manifest.json
   ├─ MyFirstPlugin.dll
   └─ （其他依赖 DLL，如有）
```

构建并打包：

```powershell
# 编译
dotnet publish -c Release -o ./publish

# 创建 ZIP（PowerShell）
$staging = "staging/MyFirstPlugin"
New-Item -ItemType Directory -Path $staging -Force
Copy-Item -Path "./publish/*" -Destination $staging -Recurse
Copy-Item -Path "./manifest.json" -Destination $staging
Compress-Archive -Path "./staging/MyFirstPlugin" -DestinationPath "./MyFirstPlugin.zip" -Force
Remove-Item -Path "./staging" -Recurse -Force
```

## 第五步：安装与测试

1. 打开 FolderRewind → **设置** → **插件管理**
2. 点击 **本地安装**，选择 `MyFirstPlugin.zip`
3. 安装完成后重启 FolderRewind
4. 在插件列表中确认 `MyFirstPlugin` 已出现并启用

### 验证加载成功

- 插件管理界面显示插件名称、版本、作者
- 无加载错误提示

### 常见错误排查

| 症状 | 可能原因 |
|------|----------|
| 插件未出现在列表中 | ZIP 结构错误（缺少顶层目录或 `manifest.json`） |
| 加载失败：找不到入口类型 | `EntryType` 与实际类的完全限定名不一致 |
| 加载失败：版本不兼容 | `MinHostVersion` 高于当前 FolderRewind 版本 |
| 编译错误：找不到引用 | `.csproj` 中的 `HintPath` 指向了不存在的路径 |

## 下一步

- [实战教程：构建游戏存档备份插件](./tutorial) — 跟着做一个完整插件
- [Plugin API 参考](./plugin-api) — 接口全量说明
- [MineRewind 源码](https://github.com/Leafuke/FolderRewind-Plugin-Minecraft) — 官方插件参考实现
