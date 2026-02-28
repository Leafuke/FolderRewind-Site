---
sidebar_position: 5
title: 插件配置定义
description: PluginSettingDefinition 设计规范与字段约定
---

# 插件配置定义

插件通过 `GetSettingsDefinitions()` 声明设置项，Host 负责渲染 UI、保存值，并在调用插件时通过 `settingsValues` 传回。

## 设计原则

- Key 稳定：发布后尽量不改
- 描述明确：说明用途、默认值、风险
- 默认值可回退：解析失败时使用保底值

## 建议实践

- Bool 统一解析 `true/false/1/0`
- 数值设置增加最小/最大边界检查
- 路径设置优先验证目录可访问性

## 示例

MineRewind 使用了两项布尔设置：

- `EnableHotBackup`
- `PreservePlayerData`

## 相关链接

- [Plugin API 参考](./plugin-api)
- [插件开发快速上手](./quick-start)
