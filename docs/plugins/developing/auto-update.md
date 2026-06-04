---
sidebar_position: 8
title: 插件自动更新
description: 基于 GitHub Releases 的版本发布与更新策略
---

# 插件自动更新

FolderRewind 支持通过 GitHub Releases 自动检查插件更新。

## 工作原理

1. 插件 `manifest.json` 中的 `Repository` 字段指定 GitHub 仓库（格式：`owner/repo`）
2. FolderRewind 定期调用 GitHub Releases API 获取最新版本
3. 比较最新版本与当前安装版本
4. 如果有新版本，在插件管理界面显示更新提示
5. 用户确认后自动下载 ZIP 并安装

## 配置步骤

### 1. 设置 Repository 字段

在 `manifest.json` 中添加：

```json
{
  "Repository": "yourname/myplugin"
}
```

### 2. 创建 GitHub Release

每次发布新版本时：

```powershell
# 1. 更新 manifest.json 中的 Version
# 2. 构建并打包（参见「打包与发布」）
# 3. 在 GitHub 创建 Release
gh release create v1.1.0 ./MyPlugin.zip --title "MyPlugin v1.1.0" --notes "修复了..."
```

Release 的 tag 名称应以 `v` 开头，后跟语义化版本号。

### 3. 上传 ZIP 资产

将打包好的 ZIP 文件作为 Release 的 asset 上传。FolderRewind 会自动识别 ZIP 文件并下载安装。

## MinHostVersion

`MinHostVersion` 字段声明插件所需的最低宿主版本：

```json
{
  "MinHostVersion": "1.7.3"
}
```

- 如果用户的 FolderRewind 版本低于此值，插件不会被加载
- 如果新版本提高了 `MinHostVersion`，请在 Release 标题和正文明确说明
- 建议在提高 `MinHostVersion` 时使用 MAJOR 或 MINOR 版本号变更

## 破坏性变更处理

- 破坏性变更（不兼容旧版宿主）要提高主版本号
- 在 Release 说明中明确列出破坏性变更
- 保留最近几个稳定版本的 Release，方便用户回滚
- 考虑在插件代码中做运行时兼容性检查

## 相关链接

- [打包与发布](./packaging)
- [插件安装与管理](../using-plugins)
