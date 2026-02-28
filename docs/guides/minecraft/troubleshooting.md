---
sidebar_position: 6
title: 故障排查
description: MineRewind 常见异常现象、原因与处理步骤
---

# 故障排查

本页按“现象 -> 可能原因 -> 处理步骤”给出快速排查路径。

## 现象 1：扫描不到存档

可能原因：

- 选择目录不是 `.minecraft`、`saves` 或版本目录
- 世界目录缺失 `level.dat`

处理步骤：

1. 确认选择的是 Minecraft 根目录或 `saves` 目录。
2. 检查目标世界目录是否存在 `level.dat`。
3. 重新执行扫描或改用手动添加目录。

## 现象 2：热备份没有触发协同

可能原因：

- `EnableHotBackup` 已关闭
- KnotLink/联动模组不可用
- 世界文件并未被占用，流程回退为普通备份

处理步骤：

1. 在插件设置确认 `EnableHotBackup = true`。
2. 检查联动模组是否在线且 KnotLink 可用。
3. 通过 `BACKUP_CURRENT` 再测试一次强制协同链路。

## 现象 3：热还原中途取消

可能原因：

- 握手超时或版本不兼容
- 世界文件未在超时窗口内释放
- 没有可用备份文件

处理步骤：

1. 先执行 `LIST_BACKUPS_CURRENT` 确认备份存在。
2. 检查模组与服务状态后重试。
3. 若仍失败，改用常规还原流程。

## 现象 4：指定备份还原失败

可能原因：

- `RESTORE_CURRENT <backup_file>` 中文件名拼写错误
- 备份文件已被移动或删除

处理步骤：

1. 先列出备份文件并复制精确文件名。
2. 再执行指定还原命令。

## 现象 5：还原后玩家状态异常

可能原因：

- 未开启 `PreservePlayerData`
- 当前世界数据结构不满足写回条件

处理步骤：

1. 在插件设置中开启 `PreservePlayerData`。
2. 先在测试世界验证一次保留流程。

## 仍未解决？

- 导出日志并附上复现步骤（触发方式、时间点、命令、结果）
- 到社区或仓库 Issues 提交问题

## 相关链接

- [Minecraft 专题总览](./overview)
- [KnotLink 与联动模组](./knotlink-mod)
- [插件安装与管理](../../plugins/using-plugins)
