---
sidebar_position: 4
title: KnotLink 命令参考
description: FolderRewind 1.8 参数化协议 v2 的内置命令、字段、响应和信号
---

# KnotLink 命令参考

本页以 FolderRewind 1.8 的 `funcList.json` 为内置命令事实源。运行时请先调用 `GET_CAPABILITIES`，因为插件可以增加命令参数和信号。

## 公共格式

```text
key=value;key2=value2
```

- 所有请求都需要 `cmd`。
- 改变状态的命令需要 `from` 和唯一的 `request_id`。
- `folder` 可以是文件夹显示名称或配置内索引。
- 响应至少包含 `status=ok` 或 `status=error`；会话命令还会回显 `from` 和 `request_id`。
- 动态值必须 percent-encode，列表则逐项编码后用逗号连接。

```text
# 注释“发布前;手动检查”
comment=%E5%8F%91%E5%B8%83%E5%89%8D%3B%E6%89%8B%E5%8A%A8%E6%A3%80%E6%9F%A5

# 两条白名单：world data、config=prod
backup_whitelist=world%20data,config%3Dprod
```

## 连接与发现

| 命令 | 请求字段 | 成功响应字段 | 说明 |
|------|----------|--------------|------|
| `PING` | `cmd` | `status`, `message` | 检查 FolderRewind KnotLink 端点是否可用 |
| `GET_STATUS` | `cmd` | `status`, `data` | 查询启用、初始化、活动自动备份和活动任务状态 |
| `GET_CAPABILITIES` | `cmd` | `status`, `content_type`, `encoding`, `manifest_version`, `func_list` | 获取 percent-encoded 的运行时 JSON 能力清单 |

示例：

```text
> cmd=PING
< status=ok;message=PONG

> cmd=GET_CAPABILITIES
< status=ok;content_type=application%2Fjson;encoding=percent;manifest_version=2.0.0;func_list=%7B...%7D
```

客户端应解码 `func_list` 后按清单生成请求，不应把本页当作插件能力的永久硬编码列表。

## 配置与历史查询

| 命令 | 请求字段 | 成功响应 | 说明 |
|------|----------|----------|------|
| `LIST_CONFIGS` | `cmd` | `status`, `data` | 列出备份配置 |
| `LIST_FOLDERS` | `cmd`, `config_id` | `status`, `data` | 列出指定配置的受管文件夹 |
| `LIST_BACKUPS` | `cmd`, `config_id`, `folder` | `status`, `data` | 列出指定文件夹的备份 |
| `GET_CONFIG` | `cmd`, `config_id` | `status`, `data` | 获取配置名称、备份模式、格式和保留数等摘要 |

查询示例：

```text
cmd=LIST_BACKUPS;config_id=demo;folder=0
```

`data` 是单个 percent-encoded 字段；请先按 v2 解析负载，再解码其内容。

## `BACKUP`

为一个受管文件夹排入备份任务。

| 字段 | 必需 | 说明 |
|------|------|------|
| `config_id` | 是 | 配置 ID |
| `folder` | 是 | 文件夹名称或索引 |
| `from` | 是 | 调用方标识 |
| `request_id` | 是 | 本次请求的唯一关联 ID |
| `comment` | 否 | 一次性备份注释 |
| `backup_mode` | 否 | 一次性覆盖：`full` 或 `incremental` |
| `compression_method` | 否 | `LZMA2`、`Deflate`、`BZip2` 或 `zstd` |
| `compression_level` | 否 | 一次性压缩等级 |
| `backup_blacklist` | 否 | 逗号分隔的一次性黑名单 |
| `backup_whitelist` | 否 | 逗号分隔的一次性白名单 |
| `backup_scope` | 否 | 插件提供的备份范围 ID |
| `scope_areas` | 否 | 示例范围参数；实际字段以运行时能力清单为准 |
| `scope_dimensions` | 否 | 示例维度参数；实际字段以运行时能力清单为准 |

这些覆盖项只影响本次调用，不写回持久配置。Host 会在排队前校验过滤器、备份范围和压缩设置。

```text
cmd=BACKUP;config_id=demo;folder=World;comment=Before%20upgrade;backup_mode=full;from=panel;request_id=backup-001
```

## `BACKUP_ALL`

为指定配置中的所有文件夹排入备份：

| 字段 | 必需 | 说明 |
|------|------|------|
| `config_id`, `from`, `request_id` | 是 | 配置与会话元数据 |
| `comment` | 否 | 一次性注释 |
| `backup_blacklist`, `backup_whitelist` | 否 | 一次性过滤器覆盖 |
| `backup_scope` | 否 | 插件范围 ID |

`BACKUP_ALL` 不接受 `folder`。范围参数必须适用于配置中的目标文件夹，否则整个请求会被拒绝。

## `RESTORE`

| 字段 | 必需 | 说明 |
|------|------|------|
| `config_id` | 是 | 配置 ID |
| `folder` | 是 | 文件夹名称或索引 |
| `file` | 是 | 备份包文件名 |
| `from` | 是 | 调用方标识 |
| `request_id` | 是 | 唯一关联 ID |
| `mode` | 否 | `overwrite` 或 `clean` |
| `restore_whitelist` | 否 | 逗号分隔的一次性还原白名单 |

```text
cmd=RESTORE;config_id=demo;folder=World;file=backup%202026-07-30.7z;mode=overwrite;from=panel;request_id=restore-001
```

:::danger 部分备份规则
如果记录是指定区域等部分备份，Host 会强制使用 `overwrite`，即使请求传入 `mode=clean` 也不会清空未备份文件。
:::

## 自动备份控制

| 命令 | 必需字段 | 其他字段 | 说明 |
|------|----------|----------|------|
| `AUTO_BACKUP` | `config_id`, `folder`, `interval_minutes`, `from`, `request_id` | — | 为一个文件夹启动周期备份 |
| `STOP_AUTO_BACKUP` | `config_id`, `folder`, `from`, `request_id` | — | 停止该文件夹的周期备份 |

`interval_minutes` 必须是有效的分钟间隔。重复启动前先查询状态或在调用方维护任务状态。

## `MARK_IMPORTANT`

设置或取消一个备份包的重要标记：

```text
cmd=MARK_IMPORTANT;config_id=demo;folder=0;file=backup.7z;important=true;from=panel;request_id=mark-001
```

`important` 接受 `true` 或 `false`。请求必须同时给出 `config_id`、`folder` 和 `file` 以定位记录。

## 响应状态

| 状态 | 含义 |
|------|------|
| `status=ok` | 查询已完成，或长任务已通过初始校验并被接受 |
| `status=error` | 解析、字段、状态或执行校验失败；读取 `message` |

`status=ok` 对长任务通常表示“已接受”，不表示备份或还原已经完成。最终结果要结合生命周期和业务信号。

## 信号

### 命令生命周期

- `command_accepted`
- `command_started`
- `command_progress`
- `command_completed`
- `command_failed`
- `command_error`

这些事件包含 `command` 和 `request_id`；进度或错误事件还可能增加阶段、百分比和原因字段。

### 备份与还原

- 单文件夹备份：`backup_started`、`backup_success`、`backup_warning`、`backup_failed`
- 整个配置：`backup_all_started`、`backup_all_completed`、`backup_all_failed`
- 还原：`restore_started`、`restore_success`、`restore_failed`、`restore_finished`
- 自动备份：`auto_backup_started`、`auto_backup_executed`、`auto_backup_stopped`、`auto_backup_error`

此外还有 `app_startup`、`status`、`list_configs`、`list_folders`、`list_backups`、`get_config` 和 `mark_important` 查询/状态信号。插件可通过运行时清单添加更多信号。

## 相关链接

- [KnotLink 协议与联动](./knotlink)
- [KnotLink Command API](./developing/knotlink-api)
- [备份模式与一次性参数](../guides/backup-modes)
