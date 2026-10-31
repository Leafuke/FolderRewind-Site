---
sidebar_position: 6
title: "KnotLink 与 Minecraft 联动组件"
description: "配置 KnotLink 与 Minecraft 联动，核对协议、组件版本、当前世界目标和最终操作结果。"
reviewed_baseline: "1.10-api3.17"
---

# KnotLink 与 Minecraft 联动组件

配置 KnotLink 与 Minecraft 联动，核对协议、组件版本、当前世界目标和最终操作结果。

## 前置与版本

准备 FolderRewind 与启用的 MineRewind，再按游戏版本和加载器安装游戏侧组件。通信使用 KnotLink Server v3 与参数化协议 v2，实际命令由运行时能力清单提供。

## 最小联调

先确认 Host 插件 Active，游戏组件已加载且服务可用；执行 PING、GET_CAPABILITIES、当前世界查询、备份，再在副本测试还原。选择器解析稳定目标后继承核心参数。

```text
cmd=PING
cmd=GET_CAPABILITIES
cmd=LIST_BACKUPS;current_save=true
cmd=BACKUP;current_save=true;from=panel;request_id=mc-001
cmd=RESTORE;current_save=true;preserve_player_data=false;from=panel;request_id=mc-002
```

MineRewind 提供 BACKUP、LIST_BACKUPS、RESTORE、AUTO_BACKUP、STOP_AUTO_BACKUP、MARK_IMPORTANT、GET_IMPORTANCE 共 7 个 current_save 变体。from／request_id 用于有会话的操作，字段按运行时描述校验。

## 游戏回传与终态

握手、WORLD_SAVED、退出与释放、还原与重进信号通过关联 ID 跟踪。检查请求接受后的最终结果。专用服务器使用 Sidecar 的进程交接流程，客户端按重进流程进入世界。

未知／恢复必需终态先保存诊断，不盲目重复操作。[命令参考](/docs/plugins/knotlink-commands)给出默认 Clean、参数追加与 Quick Restore 语义。

<span id="minerewind-信号" />
<span id="前置条件" />
<span id="当前世界命令" />
<span id="最小联调顺序" />
<span id="相关链接" />
<span id="联动回传" />
