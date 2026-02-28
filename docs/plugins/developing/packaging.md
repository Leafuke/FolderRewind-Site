---
sidebar_position: 6
title: 打包与发布
description: 插件产物结构、ZIP 规范与发布检查清单
---

# 打包与发布

## 产物要求

插件发布包通常是 `.zip`，至少包含：

- `manifest.json`
- 入口程序集（如 `MyPlugin.dll`）
- 运行所需的额外依赖（如有）

## 推荐 ZIP 结构

```text
MyPlugin.zip
└─ MyPlugin/
   ├─ manifest.json
   ├─ MyPlugin.dll
   └─ ...
```

## 发布前检查

- `manifest.json` 的 `EntryAssembly`/`EntryType` 可正确加载
- `MinHostVersion` 与目标用户版本匹配
- 在干净环境完成一次安装与基本功能验证

## 版本建议

- 使用语义化版本（`MAJOR.MINOR.PATCH`）
- 每次发布附更新说明（新增/修复/破坏性变更）

## 相关链接

- [插件安装与管理](../using-plugins)
- [插件自动更新](./auto-update)
