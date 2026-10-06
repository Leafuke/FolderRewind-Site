---
sidebar_position: 6
title: "KnotLink 与 Minecraft 联动组件"
description: "配置 KnotLink 与 Minecraft 联动，核对协议、组件版本、当前世界目标和最终操作结果。"
reviewed_baseline: "1.9-api3.9"
---

# KnotLink 与 Minecraft 联动组件

配置 KnotLink 与 Minecraft 联动，核对协议、组件版本、当前世界目标和最终操作结果。

## 前置与版本

当前文档后端为 FolderRewind 1.9.6、MineRewind 1.9.8、API 3.9；KnotLink Server v3、wire v2 与能力 manifestVersion3.0.0 独立。游戏组件按各自 Release 的加载器／游戏版本安装，不能把插件 API 3.9 当 Server 或游戏模组版本。

## 最小联调

先确认 Host 插件 Active，游戏组件已加载且服务可用；执行 PING、GET_CAPABILITIES、当前世界查询、备份，再在副本测试还原。选择器解析稳定目标后继承核心参数。

```text
cmd=PING
cmd=GET_CAPABILITIES
cmd=LIST_BACKUPS;current_save=true
cmd=BACKUP;current_save=true;from=panel;request_id=mc-001
cmd=RESTORE;current_save=true;preserve_player_data=false;from=panel;request_id=mc-002
```

MineRewind 提供 BACKUP、LIST_BACKUPS、RESTORE、AUTO_BACKUP、STOP_AUTO_BACKUP、MARK_IMPORTANT 共 7 个 current_save 变体。from／request_id 用于有会话的操作，字段按运行时描述校验。

## 游戏回传与终态

握手、WORLD_SAVED、保存退出、释放、还原终态及重进结果按关联 ID 协调。长任务请求 ok 只表示接受。Server Sidecar 交接和单人客户端重进不同；不能在 Host 事务写入中自行启动服务器。

未知／恢复必需终态先保存诊断，不盲目重复操作。[命令参考](/docs/plugins/knotlink-commands)给出默认 Clean、参数追加与 Quick Restore 语义。

<span id="minerewind-信号" />
<span id="前置条件" />
<span id="当前世界命令" />
<span id="最小联调顺序" />
<span id="相关链接" />
<span id="联动回传" />
