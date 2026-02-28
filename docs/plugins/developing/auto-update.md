---
sidebar_position: 7
title: 插件自动更新
description: 基于 GitHub Releases 的版本发布与更新策略
---

# 插件自动更新

建议将插件发布到 GitHub Releases，保持版本可追踪、可回滚。

## 推荐流程

1. 更新版本号与变更说明。
2. 构建并生成 ZIP 发布包。
3. 创建 GitHub Release 并上传资产。
4. 在文档中同步升级说明与兼容性声明。

## 注意事项

- 破坏性变更要提高主版本号。
- 若提高 `MinHostVersion`，请在 Release 标题和正文明确说明。
- 保留最近几个稳定版本，方便用户回滚。

## 相关链接

- [打包与发布](./packaging)
- [插件安装与管理](../using-plugins)
