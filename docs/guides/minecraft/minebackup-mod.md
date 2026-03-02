---
sidebar_position: 2
title: MineBackup 联动模组详解
description: 从安装前置到完整命令参考，系统理解 MineBackup 与 FolderRewind/MineRewind 的联动方式
---

# MineBackup 联动模组详解

MineBackup 是 Minecraft 侧的联动模组，负责把游戏内状态（保存、退出、重进）与 FolderRewind / MineRewind 的备份还原流程连接起来。

你可以把它理解为“游戏进程内代理层”：

- MineRewind 负责 FolderRewind 插件侧能力（配置发现、备份/还原编排）
- MineBackup 负责 Minecraft 运行时协同（热备份前保存、热还原前退出、还原后重进）
- KnotLink 负责两者之间的命令和事件传输

---

## 一、适用场景与能力边界

适合以下用户：

- 单人生存长线玩家（担心崩档、误操作、回档后快速继续）
- 小型服主或整合包测试者（需要频繁回溯）
- 希望把“备份操作”从手动复制文件升级为标准化流程的用户

MineBackup 的核心价值在于两点：

1. **热备份协同**：在主程序发起备份时，先在游戏内触发完整保存，尽量减少运行中备份不一致。
2. **热还原协同**：在主程序发起还原时，模组保存并退出当前世界，待还原完成后自动重进并回传结果。

你仍然要理解一个现实边界：

- 它不是“永不失败”的魔法层，链路超时、权限不足、外部程序未响应都会中断流程。
- 因此强烈建议先在测试世界演练至少一次完整热还原。

---

## 二、安装与前置条件

## 1) 环境前置

根据模组声明与现有联动设计，建议满足：

- [KnotLink 服务端](https://github.com/hxh230802/KnotLink/releases)
- FolderRewind 主程序 + MineRewind 插件
- MineBackup 主程序

> 后两项二选一即可

## 2) 安装顺序建议

1. 先安装并可正常运行 FolderRewind。
2. 在 FolderRewind 中安装 MineRewind 插件。
3. 在 Minecraft 端安装 MineBackup 模组。
4. 启动后先做一次最短链路验证（见下文“场景 1”）。

## 3) 权限模型

- **单人游戏**：可直接使用 `/mb` 命令。
- **专用服务器**：通常要求 OP 管理权限（命令权限检查为 moderator 级）。

---

## 三、联动流程（你需要知道的关键链路）

## 1) 热备份链路

主程序触发热备份请求后，MineBackup 会：

1. 接收 `pre_hot_backup` 事件
2. 触发世界完整保存
3. 冻结自动保存（避免备份窗口内写入干扰）
4. 回传 `WORLD_SAVED`
5. 主程序执行备份
6. 备份完成后自动解冻

安全兜底：

- 自动保存冻结存在超时保护（约 3 分钟），超时会自动恢复并广播警告。

## 2) 热还原链路

主程序触发热还原请求后，MineBackup 会：

1. 处理 `pre_hot_restore`
2. 保存并退出当前世界/会话
3. 回传 `WORLD_SAVE_AND_EXIT_COMPLETE`
4. 等待主程序还原完成事件（`restore_finished`/`restore_success`）
5. 处理 `rejoin_world` 事件并执行自动重进
6. 回传 `REJOIN_RESULT success|failure ...`

握手阶段：

- 模组收到 `handshake` 后会返回 `HANDSHAKE_RESPONSE <mod_version>`，并进行最低版本兼容性检查。

---

## 四、完整命令参考（/mb）

以下为当前模组命令入口的完整清单。

| 分类 | 命令 | 说明 |
|---|---|---|
| 本地保存 | `/mb save` | 立即对当前服务器所有维度执行一次保存 |
| 配置查询 | `/mb list_configs` | 查询主程序中的可用配置 |
| 世界查询 | `/mb list_worlds <config_id>` | 查询指定配置下的世界列表 |
| 备份查询 | `/mb list_backups <config_id> <world_index>` | 查询指定世界的备份列表 |
| 远程备份 | `/mb backup <config_id> <world_index> [comment]` | 对指定世界发起备份，可附注释 |
| 远程还原 | `/mb restore <config_id> <world_index> <backup_file>` | 按备份文件名还原指定世界 |
| 快速备份 | `/mb quicksave [comment]` | 先本地保存，再对“当前世界”触发备份 |
| 快速还原 | `/mb quickrestore [backup_file]` | 不带参数时还原到最新备份；带参数时还原指定备份 |
| 自动备份 | `/mb auto <config_id> <world_index> <internal_time>` | 启动自动备份并记录到本地配置 |
| 停止自动备份 | `/mb stop <config_id> <world_index>` | 停止指定世界自动备份并清除本地自动备份配置 |
| WE 快照联动 | `/mb snap <config_id> <world_index> <backup_file>` | 触发与 WorldEdit 快照相关的联动指令 |
| 手动冻结 | `/mb freeze` | 保存并冻结自动保存，便于外部工具窗口操作 |
| 手动恢复 | `/mb unfreeze` | 解除自动保存冻结 |

---

## 五、两个具体场景示例

## 场景 1：先打通“最短可用链路”

目标：确认 MineBackup 与主程序通信正常。

操作步骤：

1. 进入目标世界后执行：

```text
/mb quicksave baseline_before_test
```

2. 看到“命令已发送 / 备份响应”后，再执行：

```text
/mb quickrestore
```

3. 观察流程是否出现以下关键节点：

- 还原准备提示
- 世界退出与等待还原
- 自动重进成功
- 主程序收到 `REJOIN_RESULT success`

成功标准：

- 能完成“备份 -> 还原 -> 重进”闭环，且回到可正常游玩的世界状态。

## 场景 2：精确回滚到指定备份（事故恢复）

目标：在“已知坏档/误操作”后回到指定时间点。

操作步骤：

1. 先列出可用备份：

```text
/mb list_backups <config_id> <world_index>
```

2. 选择目标备份文件名后执行：

```text
/mb quickrestore <backup_file>
```

3. 若你使用的是跨世界管理，或需要指定配置维度，也可使用：

```text
/mb restore <config_id> <world_index> <backup_file>
```

成功标准：

- 玩家回到预期时间点，关键方块/实体状态与目标备份一致。

---

## 六、常见问题与边界

## 1) 命令发送了但没有结果

可能原因：

- 主程序侧未运行
- KnotLink 链路未建立
- 端口或本机通信被拦截

建议：

- 先从 `/mb list_configs` 这类只读查询命令开始排查通信。

## 2) 热还原失败或未自动重进

常见原因：

- 目标世界标识无效（无 world / 非法路径）
- 重进超时
- 重试上限耗尽

建议：

- 优先用 `quickrestore` 在测试世界演练。
- 失败后先回到世界选择界面手动进入，确认世界本体是否可加载。

## 3) 专用服务器上命令不可用

常见原因：

- 执行者权限不足。

建议：

- 为执行者分配足够管理权限后重试。

## 4) 自动保存冻结担心忘记恢复

说明：

- 模组带有冻结超时兜底，超时会自动恢复并提示警告。
- 但仍建议操作完成后主动执行 `/mb unfreeze` 形成习惯。

---

## 七、与 MineRewind 文档如何配合阅读

推荐阅读顺序：

1. 先读 [Minecraft 专题总览](./overview)
2. 再读本文（MineBackup 模组能力）
3. 深入理解链路细节看 [KnotLink 与联动模组](./knotlink-mod)
4. 进一步看 [热备份机制详解](./hot-backup) 与 [热还原机制详解](./hot-restore)

如果你准备做联动开发或协议实现，请继续阅读 [KnotLink 协议与联动](../../plugins/knotlink)。
