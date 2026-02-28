---
sidebar_position: 6
title: 故障排查
description: MineRewind 常见异常现象、原因与处理步骤
---

# 故障排查

本页按“先看链路，再看现象”的顺序给出排查步骤，避免反复试错。

## 先做 60 秒链路体检

按顺序确认：

1. 插件已启用，且 `EnableHotBackup` 设置正确。
2. 当前配置类型是 `Minecraft Saves`。
3. 当前世界目录存在 `level.dat`。
4. KnotLink 与联动模组在线。
5. 至少存在一个可用备份文件（用于还原链路）。

任一步失败，都可能导致热备份/热还原表现为“无动作”或“自动回退”。

## 现象与源码定位表

| 现象 | 优先检查方法/逻辑 |
|---|---|
| 扫描不到存档 | `TryDiscoverManagedFolders(...)` |
| 热备份不协同 | `OnBeforeBackupFolder(...)` 的前置返回条件 |
| 热还原被忽略 | `TriggerHotRestoreAsync(...)` 的状态机防重入 |
| 指定备份失败 | `RESTORE_CURRENT` 参数与文件存在性检查 |
| 玩家数据没保留 | `OnBeforeRestoreFolder` / `OnAfterRestoreFolder` |

## 现象 1：扫描不到存档

可能原因：

- 选择目录不是 `.minecraft`、`saves` 或版本目录
- 世界目录缺失 `level.dat`

处理步骤：

1. 确认选择的是 Minecraft 根目录或 `saves` 目录。
2. 检查目标世界目录是否存在 `level.dat`。
3. 重新执行扫描或改用手动添加目录。

## 现象 2：热备份没有触发协同

可能原因：

- `EnableHotBackup` 已关闭
- KnotLink/联动模组不可用
- 世界文件并未被占用，流程回退为普通备份

补充说明：`OnBeforeBackupFolder(...)` 命中任一前置 `return null` 都会回退。

处理步骤：

1. 在插件设置确认 `EnableHotBackup = true`。
2. 检查联动模组是否在线且 KnotLink 可用。
3. 通过 `BACKUP_CURRENT` 再测试一次强制协同链路。

## 现象 3：热还原中途取消

可能原因：

- 握手超时或版本不兼容
- 世界文件未在超时窗口内释放
- 没有可用备份文件

补充说明：热还原有阶段性超时，常见阈值包括 10s（保存退出）/15s（世界释放）/30s（重进结果）。

处理步骤：

1. 先执行 `LIST_BACKUPS_CURRENT` 确认备份存在。
2. 检查模组与服务状态后重试。
3. 若仍失败，改用常规还原流程。

## 现象 4：指定备份还原失败

可能原因：

- `RESTORE_CURRENT <backup_file>` 中文件名拼写错误
- 备份文件已被移动或删除

补充说明：插件会先拼接目标路径并做文件存在性检查，不存在会直接失败。

处理步骤：

1. 先列出备份文件并复制精确文件名。
2. 再执行指定还原命令。

## 现象 5：还原后玩家状态异常

可能原因：

- 未开启 `PreservePlayerData`
- 当前世界数据结构不满足写回条件

补充说明：只有 `OnBeforeRestoreFolder(...)` 成功返回快照，后续 `OnAfterRestoreFolder(...)` 才能写回。

处理步骤：

1. 在插件设置中开启 `PreservePlayerData`。
2. 先在测试世界验证一次保留流程。

## 命令诊断模板（可直接复用）

```text
1) BACKUP_CURRENT
2) LIST_BACKUPS_CURRENT
3) RESTORE_CURRENT_LATEST
4) RESTORE_CURRENT <from step2>
```

若第 1 步就失败，优先排查“活跃世界识别与联动可用性”；若第 3/4 步失败，优先排查“还原前置条件与备份文件存在性”。

## 仍未解决？

- 导出日志并附上复现步骤（触发方式、时间点、命令、结果）
- 到社区或仓库 Issues 提交问题

## 相关链接

- [Minecraft 专题总览](./overview)
- [KnotLink 与联动模组](./knotlink-mod)
- [插件安装与管理](../../plugins/using-plugins)
