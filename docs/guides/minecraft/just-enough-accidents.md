---
title: Just Enough Accidents（险兆备份）
description: 检测 Minecraft 高风险状态，并通过 MineBackup 创建事故现场快照
---

# Just Enough Accidents（险兆备份）

Just Enough Accidents（JEA）是 MineBackup 的事故检测扩展。它在单人世界或 LAN 世界中发现高风险状态后，请求 MineBackup 与 FolderRewind 创建一次事故现场快照。

:::warning 快照不是绝对安全点
JEA 记录的是检测触发时的事故现场，不保证是事故发生前的安全点。低生命值和不死图腾检测尤其可能已经包含伤害或图腾消耗。
:::

## 支持范围与前置

| 加载器 | Minecraft | 额外要求 |
| --- | --- | --- |
| Fabric | 26.1～26.2 | Loader 0.18.4+/0.19.3+、Fabric API、Java 25 |
| NeoForge | 1.21～1.21.8 | NeoForge 21.0.167+、Java 21 |
| Forge | 1.20～1.20.4 | Forge 46+、Java 17 |

所有场景还需要：

- MineBackup 3.1.0+。
- FolderRewind 1.8.0+。
- MineRewind 1.8.0+。
- 单人世界或 LAN 世界房主权限。

JEA 0.2.0 不支持专用服务器。专用服务器加载时只记录一次禁用日志，不扫描玩家，也不发起备份。实际下载版本以 [Just Enough Accidents Releases](https://github.com/Leafuke/JustEnoughAccidents/releases) 为准。

## 首发检测器

默认启用的检测器包括：

1. 预测致命摔落。
2. 氧气即将耗尽。
3. 进入岩浆且没有抗火效果。
4. 滑翔中的鞘翅剩余耐久过低。
5. 有效生命值（生命值加伤害吸收）过低。
6. 不死图腾成功触发。
7. 玩家附近有正在膨胀的苦力怕。
8. 附近 TNT 即将爆炸；默认排除水下 TNT。
9. 玩家的宠物生命值过低。
10. 数据包或命令方块发出的计分板请求。

检测结果会交给 MineBackup API v2 创建当前世界备份。归档成功后，世界所有者会收到可点击的还原文本，该文本调用 MineBackup 现有的 `/mb restore` 确认流程。

## 冷却、合并与归档保留

- 同一 Tick 内的多个险兆会合并为一份世界快照。
- MineBackup 接受请求后进入默认 60 秒全局冷却；立即拒绝不会占用冷却。
- 正在执行的请求、冷却期间的请求和后端拒绝不会排队重试。
- JEA 快照与普通 FolderRewind 备份共用同一个 `KeepCount`。
- 频繁触发可能使较旧归档按正常策略清理；JEA 不提供独立配额、固定槽位或保护槽位。

## 计分板触发

JEA 不会自动创建计分板目标。数据包或管理员可以先执行：

```mcfunction
scoreboard objectives add jea_request dummy
scoreboard players add #global jea_request 1
```

JEA 会把所有大于等于 1 的值合并为一次请求，并在提交前将 `#global` 分数设为 0。即使请求因为冷却或后端忙碌而没有执行，分数也不会恢复或排队。

## 默认配置

首次进入世界生成的 `config/just-enough-accidents.json`：

```json
{
  "schemaVersion": 1,
  "enabled": true,
  "cooldownSeconds": 60,
  "backup": {
    "mode": "incremental",
    "compressionMethod": "zstd",
    "compressionLevel": 6
  },
  "detectors": {
    "fatalFall": { "enabled": true },
    "lowAir": {
      "enabled": true,
      "triggerAir": 60,
      "rearmAir": 200
    },
    "lava": { "enabled": true },
    "elytra": {
      "enabled": true,
      "remainingDurability": 10
    },
    "lowHealth": {
      "enabled": true,
      "effectiveHealth": 2.0
    },
    "totem": { "enabled": true },
    "creeper": {
      "enabled": true,
      "normalRadius": 6.0,
      "chargedRadius": 12.0
    },
    "tnt": {
      "enabled": true,
      "radius": 12.0,
      "maxFuseTicks": 40,
      "excludeUnderwater": true
    },
    "petDanger": {
      "enabled": true,
      "radius": 32.0,
      "healthThreshold": 0.25
    }
  },
  "scoreboard": { "enabled": true }
}
```

配置只在服务器会话启动时读取；修改后退出并重新进入世界。无效 JSON、错误枚举或越界数值会保留原文件，并禁用当前会话的 JEA。

## 当前不包含

JEA 0.2.0 当前不包含：

- 定时安全检查点。
- 固定的最近安全点。
- 致命伤害事件检测。
- 普通燃烧检测。
- 末地水晶、床或重生锚等额外爆炸检测（当前 TNT 检测器已包含）。
- 宠物死亡检测。
- 自动还原。
- 专用服务器支持。

## 相关文档

- [Minecraft 专题总览](/docs/guides/minecraft/overview)
- [MineBackup 联动模组](/docs/guides/minecraft/minebackup-mod)
- [MineBackupPlugin（Spigot/Paper）](/docs/guides/minecraft/minebackup-plugin)
- [Death Rewind（死亡回溯）](/docs/guides/minecraft/death-rewind)
- [FolderRewind 过滤器与备份策略](/docs/guides/filters)

启用前请先在测试世界观察一次触发、归档和手动还原流程，确认检测阈值符合你的整合包玩法。
