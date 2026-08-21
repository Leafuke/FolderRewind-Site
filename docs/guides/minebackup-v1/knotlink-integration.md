---
sidebar_position: 13
title: KnotLink v2 联动
description: MineBackup 1.16.2 通过 KnotLink v2 参数化协议与 MineBackup-Mod、KnotLinkService 联动的完整流程，包含版本要求、请求格式、服务发现与跨平台安装边界
---

# KnotLink v2 联动

MineBackup 1.16.2 只实现 FolderRewind/KnotLink 的 v2 参数化协议。请求是非空的分号分隔键值表，例如：

```text
key=value;key2=value2
```

键不区分大小写，值使用 RFC 3986 percent-encoding。空段、重复键、非法 `%`、原始保留字符或缺少 `cmd` 的请求会被拒绝。旧式空格命令、位置参数和旧别名不属于当前兼容范围。

## 版本和服务前提

- MineBackup：1.16.2。
- MineBackup-Mod：至少 `3.0.0`。
- KnotLinkService：当前联动路径要求 `3.2.0.0` 或更高版本。
- Windows 服务必须提供本机回环端口 `6370` 和 `6378`；启动等待超过 10 秒会被视为失败，但不应阻塞主窗口。

Linux 通过 dpkg 发现服务，macOS 通过 Installer receipt 发现服务。向导和设置页可以从官方发布地址下载服务安装包，必要时尝试文本镜像，然后交给系统安装器；MineBackup 不替用户完成剩余系统安装步骤。

## Headless Server 推荐入口

如果 Minecraft Server 长期运行在无人登录桌面的主机上，推荐使用 [`minebackup-cli serve`](/docs/guides/minebackup-v1/cli/serve) 持有长期运行时，而不是把 GUI 或旧的 Windows Service Mode 当作后台守护进程。`serve` 让同一配置档的备份、历史、校验、还原和 KnotLink 运行时持续在线；同一时间仍只允许一个配置档 owner。使用 `serve status` 检查 KnotLink 状态，使用 `serve stop` 做有序停止；系统调度模板和账户边界见 [Linux systemd](/docs/guides/minebackup-v1/cli/linux-systemd) 与 [Windows Task Scheduler](/docs/guides/minebackup-v1/cli/windows-task-scheduler)。

## 先做能力检查

联动端应先发送：

```text
cmd=PING
cmd=GET_CAPABILITIES
cmd=GET_STATUS
```

能力清单只会声明 MineBackup 实际实现的命令和参数。变更状态的 `BACKUP`、`RESTORE`、`BACKUP_ALL`、`AUTO_BACKUP`、`STOP_AUTO_BACKUP` 和 `MARK_IMPORTANT` 请求必须同时提供 `from` 与 `request_id`。

## 当前世界的常用命令

| 用途 | v2 请求 |
| --- | --- |
| 列出当前世界归档 | `cmd=LIST_BACKUPS;current_save=true` |
| 备份当前世界 | `cmd=BACKUP;current_save=true;from=minebackup.mod;request_id=req-1;comment=QuickSave` |
| 还原最新归档 | `cmd=RESTORE;current_save=true;from=minebackup.mod;request_id=req-2` |
| 还原指定归档 | 在上一条请求中增加 `file=<encoded filename>` |

省略 `file` 时，`RESTORE` 选择最新归档。一次性覆盖项只影响当前请求，不会写回配置；例如 `backup_mode=full` 或 `backup_mode=incremental` 不会永久改变配置界面的 Full/Smart/Overwrite 选择。

查询响应的 `data` 是外层编码的单个标量，不是 JSON 数组或对象。解析时应严格遵循 MineBackup v2 文档定义的命令专属格式。

## 事件关联

后台操作通常经历 `command_accepted`、`command_started` 和 `command_completed` / `command_failed`。响应和事件会继承请求中的 `from` 与 `request_id`，联动端应使用 `request_id` 关联一次操作，不要只依赖事件到达顺序。

热流程还会涉及：

- `pre_hot_backup` 和 `WORLD_SAVED`：保存后进入备份窗口。
- `pre_hot_restore` 和 `WORLD_SAVE_AND_EXIT_COMPLETE`：保存并退出后释放世界文件。
- `restore_finished`：归档还原完成状态。
- `rejoin_world` 和 `REJOIN_RESULT`：请求并报告重进结果。
- `hot_restore_complete` 或 `restore_cancelled`：整条热还原流程的终态。

## 不支持的扩展

MineBackup v2 不实现区域范围、备份白名单或 NBT 玩家数据保留等 FolderRewind/Minecraft 扩展。发送非空的 `backup_whitelist`、`backup_scope`、`scope_*` 或 `preserve_player_data=true` 会得到结构化的 `unsupported_parameter` 错误；其他未知扩展键可能被忽略。

已移除的旧命令包括 `SET_CONFIG`、`BACKUP_MODS`、`ADD_TO_WE`、`SEND`、`LIST_WORLDS` 和各类 `*_CURRENT` 别名。

## 最小联调顺序

1. 关闭测试世界之外的高风险存档。
2. 启动 MineBackup、KnotLinkService 和 Minecraft 联动模组。
3. 发送 `PING`、`GET_CAPABILITIES` 和 `GET_STATUS`。
4. 用 `current_save=true` 完成一次热备份并检查历史。
5. 列出归档后用最新归档执行热还原。
6. 确认保存、退出、文件释放、还原和重进的每个阶段。

如果握手失败、模组版本过旧或超时，先回到退出游戏后的普通备份/还原路径。不要在生产世界上连续重试热还原。
