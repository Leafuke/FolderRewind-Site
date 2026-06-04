---
sidebar_position: 7
title: 打包与发布
description: 插件产物结构、ZIP 规范与发布检查清单
---

# 打包与发布

## ZIP 结构要求

插件发布包为 `.zip` 文件，**必须**包含一个顶层目录，其中放置 `manifest.json` 和编译产物：

```text
MyPlugin.zip
└─ MyPlugin/
   ├─ manifest.json
   ├─ MyPlugin.dll
   └─ （其他依赖 DLL，如有）
```

:::warning
ZIP 根目录**不能**直接包含文件——必须有一层与插件名相同的目录。否则安装会失败。
:::

## 构建脚本

### PowerShell

```powershell
# 1. 编译
dotnet publish -c Release -o ./publish

# 2. 创建暂存目录
$pluginName = "MyPlugin"
$staging = "staging/$pluginName"
New-Item -ItemType Directory -Path $staging -Force

# 3. 复制编译产物和 manifest
Copy-Item -Path "./publish/*" -Destination $staging -Recurse
Copy-Item -Path "./manifest.json" -Destination $staging

# 4. 打包 ZIP
Compress-Archive -Path "./staging/$pluginName" -DestinationPath "./$pluginName.zip" -Force

# 5. 清理暂存目录
Remove-Item -Path "./staging" -Recurse -Force
```

### dotnet publish + 手动打包

```powershell
dotnet publish -c Release -o ./publish
# 然后手动将 publish/ 目录内容和 manifest.json 放入一个文件夹，压缩为 ZIP
```

## manifest.json 完整字段

```json
{
  "Id": "com.example.myplugin",
  "Name": "MyPlugin",
  "Version": "1.0.0",
  "Author": "YourName",
  "Description": "插件描述",
  "LocalizedName": {
    "en-US": "My Plugin",
    "zh-CN": "我的插件"
  },
  "LocalizedDescription": {
    "en-US": "A sample plugin for FolderRewind",
    "zh-CN": "一个 FolderRewind 示例插件"
  },
  "EntryAssembly": "MyPlugin.dll",
  "EntryType": "MyPlugin.MyPlugin",
  "MinHostVersion": "1.7.3",
  "Homepage": "https://github.com/yourname/myplugin",
  "Repository": "yourname/myplugin"
}
```

| 字段 | 必选 | 说明 |
|------|:----:|------|
| `Id` | ✅ | 全局唯一标识，建议反向域名风格 |
| `Name` | ✅ | 插件名称 |
| `Version` | ✅ | 语义化版本 |
| `Author` | ✅ | 作者 |
| `Description` | ✅ | 一句话描述 |
| `EntryAssembly` | ✅ | 入口 DLL 文件名 |
| `EntryType` | ✅ | 入口类型完全限定名 |
| `LocalizedName` | — | 多语言名称 |
| `LocalizedDescription` | — | 多语言描述 |
| `MinHostVersion` | — | 最低宿主版本 |
| `Homepage` | — | 主页链接 |
| `Repository` | — | GitHub 仓库（`owner/repo`，用于自动更新） |

## 发布前检查清单

- `manifest.json` 的 `EntryAssembly` / `EntryType` 与实际代码一致
- `EntryType` 是完全限定名（包含命名空间）
- `MinHostVersion` 与目标用户版本匹配
- ZIP 结构正确（顶层目录 → 文件）
- 在干净环境完成一次安装与基本功能验证
- 设置项的 `DefaultValue` 都有合理值
- 所有钩子方法都有 try-catch 保护

## 版本策略

使用语义化版本（`MAJOR.MINOR.PATCH`）：

- **MAJOR**：不兼容的 API 变更
- **MINOR**：向后兼容的功能新增
- **PATCH**：向后兼容的问题修复

每次发布附更新说明（新增/修复/破坏性变更）。

## 相关链接

- [插件安装与管理](../using-plugins)
- [插件自动更新](./auto-update)
