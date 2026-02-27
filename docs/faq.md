---
sidebar_position: 99
title: 常见问题
description: FolderRewind 常见问题与解答
---

# 常见问题 (FAQ)

## 安装相关

### FolderRewind 支持哪些操作系统？

Windows 10 1809 (17763) 及以上版本，包括 Windows 11。支持 x64 和 ARM64 架构。

### Microsoft Store 安装和侧载安装有什么区别？

- **Store 安装（推荐）：** 自动更新，安全沙箱运行，一键安装。
- **侧载安装：** 需要手动启用开发者模式，适合无法访问 Store 的用户。

### 安装后无法启动怎么办？

1. 确认系统版本满足最低要求
2. 尝试以管理员身份运行
3. 检查 Windows 事件查看器中的错误日志
4. 前往 [GitHub Issues](https://github.com/Leafuke/FolderRewind/issues) 搜索或提交问题

## 备份相关

### 备份文件存放在哪里？

默认放储在 FolderRewind 的数据目录中。你可以在配置中自定义备份存储路径。

### 备份会占用太多磁盘空间吗？

FolderRewind 使用 7z 压缩格式，能显著减少备份体积。同时，你可以配置保留策略，自动清理旧备份。

### 支持备份正在运行的游戏存档吗？

配合 MineRewind 插件，支持在 Minecraft 运行中进行热备份。对于其他游戏，建议在游戏暂停或关闭后再执行备份。

### 备份过程中可以继续使用电脑吗？

可以。备份在后台执行，不影响正常使用。

## 还原相关

### 还原操作会覆盖当前文件吗？

选择「原位还原」会覆盖当前文件夹内容。建议还原前先执行一次备份。你也可以选择「还原到指定位置」避免覆盖。

### 可以只还原部分文件吗？

当前版本支持整文件夹还原。部分文件还原功能在规划中。

## 插件相关

### 如何安装插件？

在 FolderRewind 的插件管理界面中安装，或手动将插件文件放入插件目录后重启应用。

### MineRewind 插件是免费的吗？

是的，MineRewind 是官方发布的免费开源插件。

### 如何开发自己的插件？

请参考 [插件开发快速上手](/docs/plugins/developing/quick-start) 文档。

## 反馈与社区

### 如何报告 Bug 或提交功能建议？

- **GitHub Issues：** [提交问题](https://github.com/Leafuke/FolderRewind/issues)
- **GitHub Discussions：** [参与讨论](https://github.com/Leafuke/FolderRewind/discussions)

### 有中文社区吗？

欢迎通过 GitHub Discussions 参与中文讨论。

---

> 没有找到你的问题？前往 [GitHub Discussions](https://github.com/Leafuke/FolderRewind/discussions) 提问。
