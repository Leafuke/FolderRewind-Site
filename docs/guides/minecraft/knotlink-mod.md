---
sidebar_position: 6
title: "KnotLink 与 Minecraft 联动组件"
description: "FolderRewind 1.9 系列KnotLink 与 Minecraft 联动组件操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# KnotLink 与 Minecraft 联动组件

## 前置与版本

当前文档后端为 FolderRewind1.9、MineRewind1.9.3、API3.5；KnotLink Server v3、wire v2与能力 manifestVersion3.0.0独立。游戏组件按各自 Release 的加载器／游戏版本安装，不能把插件 API3.5当 Server或游戏模组版本。

## 最小联调

先确认 Host插件Active，游戏组件已加载且服务可用；执行 PING、GET_CAPABILITIES、当前世界查询、备份，再在副本测试还原。选择器解析稳定目标后继承核心参数。

```text
cmd=PING
cmd=GET_CAPABILITIES
cmd=LIST_BACKUPS;current_save=true
cmd=BACKUP;current_save=true;from=panel;request_id=mc-001
cmd=RESTORE;current_save=true;preserve_player_data=false;from=panel;request_id=mc-002
```

MineRewind提供BACKUP、LIST_BACKUPS、RESTORE、AUTO_BACKUP、STOP_AUTO_BACKUP、MARK_IMPORTANT共6个current_save变体。from／request_id用于有会话的操作，字段按运行时描述校验。

## 游戏回传与终态

握手、WORLD_SAVED、保存退出、释放、还原终态及重进结果按关联ID协调。长任务请求ok只表示接受。Server Sidecar交接和单人客户端重进不同；不能在Host事务写入中自行启动服务器。

未知／恢复必需终态先保存诊断，不盲目重复操作。[命令参考](/docs/plugins/knotlink-commands)给出默认Clean、参数追加与Quick Restore语义。

<span id="前置条件" />
<span id="当前世界命令" />
<span id="联动回传" />
<span id="minerewind-信号" />
<span id="最小联调顺序" />
<span id="相关链接" />
