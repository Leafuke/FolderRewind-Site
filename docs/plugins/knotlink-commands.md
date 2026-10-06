---
sidebar_position: 4
title: "KnotLink 命令参考"
description: "查阅 KnotLink 核心命令、参数与信号，用运行时能力清单验证备份、还原和重要标记操作。"
reviewed_baseline: "1.9-api3.9"
---

# KnotLink 命令参考

查阅 KnotLink 核心命令、参数与信号，用运行时能力清单验证备份、还原和重要标记操作。

本页以 API 3.9 的 KnotLinkCoreCommands 和当前 funcList 为基线。运行时先请求 GET_CAPABILITIES；清单 manifestVersion=3.0.0，specVersion=1.0，wire 协议 v2。

## 查询与公共目标

| 命令 | 目标／结果 |
|---|---|
| PING | message |
| GET_CAPABILITIES | content_type、encoding、manifest_version、func_list |
| LIST_CONFIGS、GET_STATUS | data |
| LIST_FOLDERS、GET_CONFIG | config_id，返回 data |
| LIST_BACKUPS | config_id、folder，返回 data |

config_id 接受稳定 ID，也支持名称／零基索引；folder 接受稳定 ID、名称、路径或零基索引。长期脚本优先稳定 ID，避免列表变动。会话操作 BACKUP、BACKUP_ALL、RESTORE、AUTO_BACKUP、STOP_AUTO_BACKUP、MARK_IMPORTANT、GET_IMPORTANCE 需 from、request_id。

## 备份参数

BACKUP 指定一个 folder；BACKUP_ALL 针对配置且不接受 folder；AUTO_BACKUP 绑定一个 folder，并要求 interval_minutes≥1（描述默认 10 分钟）。三个操作共享以下参数：

| 字段 | 语义 |
|---|---|
| comment | 本次操作备注 |
| backup_mode | full／smart；省略继承本地模式 |
| compression_method | LZMA2／Deflate／BZip2／zstd |
| compression_level | 有效整数，省略继承 |
| backup_blacklist | 与本地规则追加去重；空值不清空 |
| backup_whitelist | 追加去重；非空切换白名单模式 |
| backup_scope | 临时覆盖；full/all/default/none 禁用本次插件范围 |
| scope_dimensions | overworld／nether／end 及受支持别名 |
| scope_areas | 方块坐标矩形 x1,z1,x2,z2，每行一个；需 selected-regions |

操作覆盖不写持久配置；有效范围仍受来源硬边界约束。STOP_AUTO_BACKUP 只停止指定来源的远程周期任务。

```text
cmd=BACKUP;config_id=demo;folder=World;backup_mode=smart;from=panel;request_id=backup-001
```

## RESTORE

| 字段 | 语义 |
|---|---|
| file | 可选；省略使用活动 Workspace 唯一本地分支尖端 |
| mode | clean／overwrite，省略默认 clean |
| restore_whitelist | 与本地规则追加；Clean 保留匹配的当前路径，归档同路径内容优先 |
| restore_preserve_paths | 本次普通还原的相对文件／目录强保留；逗号分隔，目录以 / 结尾；当前内容与删除优先，不能扩大来源边界 |
| preserve_player_data | Minecraft null／true／false：省略继承本地值，显式覆盖仅本次有效 |

部分捕获始终 Overwrite，即使表示可 Exact 物化。Quick Restore 遇到分叉、不可恢复目标或前置条件缺失时阻断；已精确处于目标版本时 NoChanges，不自动选更早备份。

```text
cmd=RESTORE;config_id=demo;folder=World;from=panel;request_id=restore-001
cmd=RESTORE;current_save=true;preserve_player_data=false;from=panel;request_id=restore-002
cmd=RESTORE;config_id=demo;folder=World;restore_preserve_paths=data/local.dat,datapacks/;from=panel;request_id=restore-003
```

玩家保留针对全部 UUID 的选定 NBT 字段；备份中没有该玩家时保留其当前完整 NBT，stats／advancements 仍随备份恢复。跨 26.1 布局的保留拒绝；Checkout／Merge 不启用保留。

## MARK_IMPORTANT 与当前世界

MARK_IMPORTANT 需 file，important 省略默认 true。MineRewind 将 current_save=true 扩展到 BACKUP、LIST_BACKUPS、RESTORE、AUTO_BACKUP、STOP_AUTO_BACKUP、MARK_IMPORTANT、GET_IMPORTANCE，发现名不同但 wire cmd 不变。按运行时返回的目标信息使用。

## 响应与信号

响应至少有 status=ok／error。会话回显 from／request_id；动态值 percent-encoded。长任务的 ok 是接受信号，最终备份／还原和模组协同结果按同一 request_id 的生命周期信号判定。不要把自动重进失败等同于归档还原失败，也不要自动重复恢复。

<span id="backup" />
<span id="backup_all" />
<span id="mark_important" />
<span id="restore" />
<span id="信号" />
<span id="公共格式" />
<span id="命令生命周期" />
<span id="响应状态" />
<span id="备份与还原" />
<span id="相关链接" />
<span id="自动备份控制" />
<span id="连接与发现" />
<span id="配置与历史查询" />

## 创建受保护备份与查询标记

`BACKUP` 可传 `protect=true`，在同一次操作中保护完整、无过滤的单来源版本；数据无变化时复用并保护已有版本。部分范围或过滤备份不满足条件时会拒绝。`BACKUP_ALL` 和 `AUTO_BACKUP` 不接受此参数。

`GET_IMPORTANCE` 要求 `file`，返回 `file` 与 `important`；只查询保护标记，不表示该版本一定可还原。`MARK_IMPORTANT` 的 `important` 默认 true，返回操作信息及最终标记。两者也支持新版 MineRewind 的 `current_save` 目标解析。

```text
cmd=BACKUP;config_id=demo;folder=World;protect=true;from=panel;request_id=protected-001
cmd=GET_IMPORTANCE;config_id=demo;folder=World;file=example.7z;from=panel;request_id=importance-001
```
