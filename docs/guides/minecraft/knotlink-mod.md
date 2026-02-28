---
sidebar_position: 5
title: KnotLink 与联动模组
description: MineRewind 与外部模组通信的命令、事件与兼容性要点
---

# KnotLink 与联动模组

MineRewind 的热备份/热还原依赖 KnotLink 通道与联动模组配合。

## 你需要准备

- FolderRewind + MineRewind（版本满足插件最小宿主要求）
- 联动模组（可响应握手、保存、重进事件）
- KnotLink 服务可用（收发链路正常）

## 常见命令（外部 -> MineRewind）

- `BACKUP_CURRENT`：备份当前活跃世界
- `LIST_BACKUPS_CURRENT`：列出当前世界备份文件
- `RESTORE_CURRENT_LATEST`：还原到最新备份
- `RESTORE_CURRENT <backup_file>`：还原到指定备份

## 常见事件（MineRewind -> 外部）

- `event=handshake`：请求握手与版本协商
- `event=pre_hot_backup`：请求保存世界再备份
- `event=pre_hot_restore`：请求保存并退出后还原
- `event=restore_finished`：还原阶段结果
- `event=rejoin_world`：请求重进世界
- `event=hot_restore_complete`：整条热还原链路完成状态

## 兼容性关注点

- 插件内部有最低模组版本判断
- 握手不通过时会回退或中止相应流程
- 命令返回统一建议采用 `OK:` / `ERROR:` 前缀

## 实操建议

- 先执行 `BACKUP_CURRENT` 验证最短链路
- 再测试 `RESTORE_CURRENT_LATEST`，观察保存-退出-重进全流程
- 使用指定备份前先执行 `LIST_BACKUPS_CURRENT`

## 相关链接

- [热备份机制详解](./hot-backup)
- [热还原机制详解](./hot-restore)
- [KnotLink 协议与联动](../../plugins/knotlink)
