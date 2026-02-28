---
sidebar_position: 3
title: Hotkey API
description: IFolderRewindHotkeyProvider 接口说明与热键设计建议
---

# Hotkey API

`IFolderRewindHotkeyProvider` 用于向 Host 注册插件热键，并在触发时执行逻辑。

## 接口

- `GetHotkeyDefinitions()`：返回热键定义列表
- `OnHotkeyInvokedAsync(...)`：热键触发时回调

## 字段说明

`PluginHotkeyDefinition` 关键字段：

- `Id`：插件内唯一 ID
- `DisplayName`：用户可见名称
- `DefaultGesture`：如 `Alt+Ctrl+S`
- `IsGlobalHotkey`：是否为全局热键

## 实战建议

- 默认手势避免与常见系统快捷键冲突
- 热键回调中避免长阻塞，耗时操作使用异步任务
- 为失败场景提供日志与反馈事件

MineRewind 的示例：

- `Alt+Ctrl+S`：备份当前活跃世界
- `Alt+Ctrl+Z`：热还原当前活跃世界

## 相关链接

- [Plugin API 参考](./plugin-api)
- [KnotLink Command API](./knotlink-api)
