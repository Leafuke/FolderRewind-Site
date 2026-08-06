---
sidebar_position: 18
title: 故障排查
description: 按配置档、备份链、还原、自动化、联动与云归档定位 MineBackup 1.16.1 问题
---

# 故障排查

先确定问题发生在哪一层，再一次只改变一个变量。排查过程中优先保留配置档、备份包和日志，不要为了“重置”直接删除正在使用的目录。

## 最短排查路径

1. 打开 [日志与诊断](./logging-and-diagnostics)，确认版本、平台、当前 profile root 和错误时间点。
2. 检查配置的世界路径、`backupPath`、`snapshotPath`、权限和磁盘空间。
3. 用一个世界执行普通 Full 备份，再在测试副本上执行还原。
4. 最后才叠加 Smart、过滤、自动任务、KnotLink 或云归档。

如果最小配置能完成“Full 备份 → 历史可见 → 还原”闭环，问题通常在原配置的路径、链、过滤或外部联动；如果最小配置也失败，再重点检查平台、工具和权限。

## 1. 启动到了错误的配置档

1.16.1 的配置和历史不一定在 EXE 旁边。先确认：

- 是否带有 `--data-dir <absolute path>`；
- Windows/AppImage 旁是否存在 `portable.flag`；
- 运行日志显示的 profile root 是否是期望目录；
- 是否有另一个 MineBackup 实例持有同一配置档的锁。

需要隔离实验时，使用一个新的绝对路径启动 `--data-dir`，不要先删除现有 profile。目录布局和默认位置见[配置档与迁移](./data-and-migration)。

## 2. 找不到 7-Zip 或备份立即失败

检查安装页中的压缩工具探测结果：内置工具、系统 PATH 中的 `7z`/`7z.exe` 和手动选择路径都可能成为来源。确认选中的文件存在、当前用户可执行，并且备份目录可写。

先用默认压缩格式完成 Full 备份，再单独改变 LZMA2、Deflate、BZip2、zstd 或压缩级别。移动程序或配置档后，重新检查外部工具路径；配置档位置变化不会自动搬迁你手动指定的工具。

## 3. 游戏运行中备份失败

普通备份面对文件占用或世界仍在写入时可能失败。先验证退出游戏后的普通 Full 备份：

- 如果普通备份也失败，检查世界路径、权限、磁盘、压缩工具和过滤规则。
- 如果普通备份成功，再检查 KnotLink v2、MineBackup-Mod 版本、快照目录和游戏保存/退出流程。
- 热备份是尽力而为的联动流程；握手失败、版本不兼容或超时可能回退普通备份，不应把它当作无条件的一致性保证。

热还原必须在测试世界完整演练。保存、退出、等待文件释放、还原和重新进入任一步骤中断，都可能留下需要人工确认的状态。

## 4. Smart 无法创建或提示链异常

Smart 依赖 `_metadata/<world>/state.json`、`records/*.json`、Full 基线和当前归档仍然存在。检查：

- 最近的 Full 和其 Smart 归档是否真的在 `backupPath`；
- 元数据中的 `BasedOnFullBackup` / `PreviousBackupFileName` 是否仍能指向归档；
- 是否手动移动、重命名或只删除了部分归档；
- 是否刚完成 1.15 迁移、迁移状态为 `Degraded`/`Failed`，或达到了 Smart 链长度上限。

元数据缺失、基线丢失、迁移降级或链不完整时，MineBackup 会安全地建立新的 Full，不要手工拼接旧记录。确认新 Full 成功后，再启用 Smart；`keepCount` 和 `maxSmartBackupsPerFull` 的作用见[备份模式](./backup-modes)。

## 5. 还原后状态不符合预期

先确认选择的归档、世界和还原方式：

- **Clean** 会清理目标后恢复，适合要求目标精确匹配归档的场景。
- **Overwrite** 只覆盖归档中提供的文件，目标中的额外文件可能保留。
- **Reverse** 用于撤销指定归档带来的变化，依赖链关系和归档仍然存在。
- **Custom** 只应用选定文件，不能自动保证世界整体一致。

还原前启用 `backupBefore` 并不能替代测试世界。世界正在运行时先退出并等待文件释放；还原外部归档或部分归档前，先把目标目录和还原前备份点记录清楚。

## 6. 自动任务或 Special Config 没有执行

按以下顺序检查：

- 普通配置的 `backupOnGameStart` 针对检测到的游戏会话开始，不是应用启动；退出时停止自动备份是全局行为。
- 统一任务是否启用、目标配置/世界索引是否有效、触发方式是 Once、Interval 还是 Scheduled。
- Sequential 与 Parallel 是否造成相同世界、备份目录、磁盘或外部命令竞争。
- Special Config 是否使用稳定 `SpecialConfigId`，以及 `autoExecute`、`runOnStartup`、`exitAfterExecution` 是否组合成了预期流程。
- Command 任务在 Windows 使用 `cmd.exe`，在 Linux/macOS 使用 `/bin/sh`；不要把批处理语法、路径格式或 PowerShell 命令直接当作跨平台脚本。
- `Script` 仍未实现，不要把它当作已启用的脚本任务。

先关闭并行任务，用一次 Once 任务复现，结合 Debug 日志查看触发、进程退出码和任务目标。

## 7. KnotLink 联动失败

确认 MineBackup-Mod 至少为 `3.0.0`，KnotLinkService 至少为 `3.2.0.0`，并按平台确认端点：Windows 默认回环端口为 6370（主服务）和 6378（相关服务）。请求必须使用严格的 `key=value;key2=value2` 格式；会改变状态的请求需要 `from` 和 `request_id`。

不要继续尝试旧位置参数、旧别名或自由文本命令。先用“检查端点/版本”确认能力，再观察 `request_id` 对应的事件；协议开发细节请看[插件文档](../../plugins/knotlink-commands)，MineBackup 使用示例见 [KnotLink v2 联动](./knotlink-integration)。

## 8. 云归档或 rclone 失败

- rclone 不随 MineBackup 程序包分发；使用设置页的受管理安装时，确认用户已授权、版本和 SHA-256 校验通过。
- 检查远端名称、远端路径和本机 `backupPath`，但不要分享凭据文件或命令中的秘密。
- 区分“仅历史记录”和“历史记录 + 备份包”两种云模式；历史记录上传成功不等于备份包已经上传。
- 云端导入的新配置会保持待绑定，必须重新绑定本机世界和备份路径。
- 若单条历史显示云端副本不完整，先恢复元数据或重新上传对应备份包，再尝试从云端恢复。

详细步骤见[云归档](./cloud-archive)。

## 9. 1.15 迁移显示 Pending、Degraded 或 Failed

不要删除旧配置或历史来“跳过”迁移。打开迁移摘要和[配置档与迁移](./data-and-migration)：

- `Pending` 通常表示配置身份事务尚未完成，依赖的历史、世界或云写入被门禁保护。
- `Degraded` 表示可识别数据已迁移但无法完整重建；相关世界下一次备份会建立安全 Full。
- `Failed` 表示读取、快照、提交或验证失败，源文件应仍然保留。

先检查日志中给出的快照路径和错误，再重试迁移单元。迁移完成后对测试世界做 Full 和还原闭环。

## 10. 旧 Windows 服务问题

1.16.1 不能安装或启动 Service Mode。只使用[旧 Windows 服务清理](./service-mode)页签检查并清理通过验证的旧服务；非 Windows 没有该清理能力。不要用 `--service` 或绕过验证的服务管理命令来修复当前版本。

## 提交诊断信息前

临时启用 Debug，复现一次，导出 **Export Diagnostics**，打开文件确认已脱敏，然后提供：MineBackup 版本、平台、profile mode、相关配置/世界、操作时间、最短复现步骤和 `request_id`。不要上传本地轮转日志中的凭据、远端认证信息或未经检查的路径。
