---
title: Death Rewind（死亡回溯）
description: 在 Fabric 单人世界死亡后，从死亡界面回溯到 MineBackup 的最新归档
---

# Death Rewind（死亡回溯）

Death Rewind 是 MineBackup 的附属模组。它在游玩期间定时请求 MineBackup 创建检查点，并在单人世界的死亡界面增加“回溯到若干分钟前”入口。

从 2.0 开始，Death Rewind 不再直接连接 FolderRewind，也不重复实现保存、自动保存冻结、还原和重连逻辑；这些操作统一由 MineBackup API v2 协调。

:::warning 这是单人/LAN 房主扩展
Death Rewind 2.0 只支持 Fabric 26.1～26.1.2 的单人世界和 LAN 世界房主。不支持专用服务器，加入 LAN 的普通客户端也不能发起世界恢复。
:::

## 支持范围与前置

| 项目 | 当前基线 |
| --- | --- |
| Minecraft | 26.1～26.1.2 |
| Loader | Fabric Loader 0.18.4+ |
| 依赖 | Fabric API、MineBackup 3.1.0+ |
| Java | Java 25 |
| 运行场景 | 单人世界、LAN 世界房主 |
| 当前版本 | Death Rewind 2.0 |

还需要一个正在运行的 MineBackup 或 FolderRewind + MineRewind 备份链路。实际下载版本以 [Death Rewind Releases](https://github.com/Leafuke/DeathRewind/releases) 为准。

## 安装

1. 安装并配置 FolderRewind 或 MineBackup。
2. 如果使用 FolderRewind，安装 MineRewind 并创建 `Minecraft Saves` 类型的配置。
3. 安装 Fabric Loader、Fabric API 和 MineBackup 3.1.0 或更高版本。
4. 将与 Fabric 26.1 匹配的 Death Rewind JAR 放入同一个 `mods` 目录。
5. 进入单人世界；首次启动会生成 `config/death-rewind.json`。

缺少 MineBackup 或版本低于 3.1.0 时，Fabric Loader 会拒绝加载 Death Rewind。

## 定时检查点

Death Rewind 按服务器实际运行 Tick 计算间隔。以下状态不会推进计时：

- 单人游戏暂停。
- 世界没有运行。
- 已有 Death Rewind 检查点请求正在执行。
- 死亡界面已经打开。

达到间隔后，Death Rewind 会通过 MineBackup API v2 为当前世界请求一次备份，并传递配置中的完整/增量模式和压缩参数。

同一时间最多存在一个 Death Rewind 请求。MineBackup 忙碌、后端失败或请求异常时，本次不会排队或立即重试，而是在下一个完整周期再次尝试。

Death Rewind 的定时器与 MineBackup 的 `/mb auto` 是两套独立计划；两者可以同时启用，但 MineBackup 的世界操作门会阻止并发修改同一世界。

## 死亡界面回溯

死亡界面会在原版按钮下方增加“回溯到若干分钟前”按钮。按钮会等待原版 20 Tick 防误触延迟，并且只在以下条件满足时启用：

- 当前游戏由本机集成服务器承载。
- MineBackup 报告当前世界可操作。
- MineBackup 当前没有其他备份、目录或恢复操作。
- Death Rewind 没有已经提交的恢复请求。

点击后会立即请求 MineBackup 恢复当前世界的**全局最新归档**，不经过 `/mb restore` 的聊天倒计时。这个归档可能由 Death Rewind、JEA、MineBackup 自动备份或管理员手动备份创建，因此不保证一定是 Death Rewind 检查点。

从保存世界、玩家断开、FolderRewind 执行还原到客户端自动重连，整个生命周期都由 MineBackup 负责。请求被拒绝、异常或失败时，Death Rewind 会显示原因并解除 `forceDeathRewind` 对原版按钮的限制。

## 默认配置

首次进入世界生成的 `config/death-rewind.json`：

```json
{
  "schemaVersion": 1,
  "enabled": true,
  "intervalMinutes": 5,
  "showBackupInfo": true,
  "forceDeathRewind": false,
  "backup": {
    "mode": "incremental",
    "compressionMethod": "zstd",
    "compressionLevel": 6
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `enabled` | 是否为新服务器会话启用 Death Rewind |
| `intervalMinutes` | 检查点间隔，范围 1～1440 分钟 |
| `showBackupInfo` | 是否在聊天栏显示检查点结果 |
| `forceDeathRewind` | 回溯可用或已提交时，是否暂时禁用原版死亡按钮 |
| `backup.mode` | `full` 或 `incremental` |
| `backup.compressionMethod` | `LZMA2`、`Deflate`、`BZip2` 或 `zstd` |
| `backup.compressionLevel` | `zstd` 为 1～22，其余算法按实现支持 0～9 |

配置只在服务器会话启动时读取。修改后退出并重新进入世界；无效 JSON、错误字段类型、未知枚举或越界数值会让本次会话禁用 Death Rewind，原文件不会被静默改写。

## 归档保留与实际边界

Death Rewind 检查点、JEA 快照和普通 MineBackup/FolderRewind 备份共用相同的归档保留策略。它没有独立配额、固定槽位或归档保护。

如果第一次定时检查点还没有完成，且 FolderRewind 中没有当前世界的任何归档，死亡回溯会失败。它也不能保证回到“死亡前绝对安全”的时间点，因为最新归档可能已经包含部分伤害或世界变化。

## 相关文档

- [Minecraft 专题总览](/docs/guides/minecraft/overview)
- [MineBackup 联动模组](/docs/guides/minecraft/minebackup-mod)
- [MineBackupPlugin（Spigot/Paper）](/docs/guides/minecraft/minebackup-plugin)
- [Just Enough Accidents（险兆备份）](/docs/guides/minecraft/just-enough-accidents)
- [热还原机制详解](/docs/guides/minecraft/hot-restore)

第一次使用时，请先在测试世界演练一次“创建检查点—死亡—回溯—重新进入”的完整流程。
