---
sidebar_position: 15
title: 配置档与迁移
description: MineBackup 1.16.2 的配置档布局、便携模式与 1.15 到 1.16 迁移
---

# 配置档与迁移

MineBackup 1.16.2 使用“配置档（profile）”管理应用数据，不再把当前工作目录或 EXE 同级目录当作固定数据目录。配置档保存设置、历史、迁移状态、日志和受管理工具；实际备份包仍然写入每个配置的 `backupPath`，不要把两者混为一谈。

## 选择配置档

### 显式目录：`--data-dir`

启动时可以指定完整配置档根目录：

```text
MineBackup.exe --data-dir "D:\MineBackupProfiles\main"
```

`--data-dir` 必须是绝对路径。显式目录优先级最高，会在该目录下建立 `config`、`data`、`state`、`cache`、`runtime`、`tools` 和 `logs` 子目录；路径无效、不可写或不满足安全检查时，程序会报错，不会静默切换到另一个目录。

该参数只决定 MineBackup 的应用配置档位置，不会自动搬迁配置里已经填写的世界目录、备份目录或快照目录。迁移这些外部目录前，先完成一次可验证的备份和还原演练。

### 便携模式

Windows 和 AppImage 支持在可执行文件或 AppImage 旁放置一个名为 `portable.flag` 的普通文件。下次启动时，MineBackup 会使用旁边的 `MineBackupData` 作为配置档根目录：

```text
MineBackup.exe
portable.flag
MineBackupData/
  config/
  data/
  state/
  cache/
  runtime/
  tools/
  logs/
```

显式 `--data-dir` 会覆盖这个标记。macOS 应用不会把数据写入 `.app` 包，也不提供通过 `portable.flag` 把配置档放进应用包的方式。

## 默认目录

未使用 `--data-dir` 或便携标记时，1.16.2 按平台使用以下位置：

| 平台 | 配置档布局 |
| --- | --- |
| Windows | `%LOCALAPPDATA%\MineBackup\{config,data,state,cache,runtime,tools,logs}` |
| Linux | `XDG_CONFIG_HOME/MineBackup`、`XDG_DATA_HOME/MineBackup`、`XDG_STATE_HOME/MineBackup`、`XDG_CACHE_HOME/MineBackup`；缺省分别回退到 `~/.config`、`~/.local/share`、`~/.local/state`、`~/.cache`。工具位于数据目录下的 `tools`，日志位于状态目录下的 `logs`。 |
| macOS | `~/Library/Application Support/MineBackup/{config,data,state,tools}`；`~/Library/Caches/MineBackup/{cache,runtime}`；日志位于 `~/Library/Logs/MineBackup`。 |

Linux 的 `XDG_RUNTIME_DIR` 只有在属于当前用户且权限安全时才用于运行时目录；否则会在状态目录下使用权限收紧的私有目录。若要确认实际路径，以当前配置档的 **Log** 面板和 [日志诊断](/docs/guides/minebackup-v1/logging-and-diagnostics) 页面为准。

## 1.16.2 的存储模型

| 内容 | 位置 | 说明 |
| --- | --- | --- |
| 当前配置 | `<profile>/config/config.ini` | 配置列表、稳定 `ConfigId`、界面选项和 Special Config。它不是“EXE 同级配置”。 |
| 历史记录 | `<profile>/data/history.json` | 配置与世界关联的历史、注释、状态和云端副本信息。 |
| 迁移报告 | `<profile>/state/migration/1.15-to-1.16.json` | 记录迁移单元、状态、消息和恢复快照路径。 |
| 迁移快照 | `<profile>/data/migration-snapshots/1.15/<transaction-id>/` | 迁移前或迁移过程中保存的恢复材料；源文件仍然保留。 |
| 世界元数据 | `<backupPath>/_metadata/<world>/state.json` | 当前备份游标、Full 基线和文件状态。 |
| 备份记录 | `<backupPath>/_metadata/<world>/records/*.json` | 每个归档的类型、链关系和变更记录。 |

备份包本身仍由配置里的 `backupPath` 决定，压缩工具由 `tools` 或配置中经过验证的路径提供。配置档迁移成功并不代表外部世界目录或备份目录已经被复制。

## 从 1.15 启动迁移

1.16.2 的启动顺序会先解析启动参数和 AppPaths，再获取配置档的单实例锁，然后发现旧位置并请求确认，之后执行 1.15 到 1.16 的事务迁移，最后加载 1.16 数据并启动桌面、任务和网络服务。发现旧位置时，拒绝确认不会删除旧文件，也不会偷偷导入另一份数据。

迁移遵循以下边界：

- 配置和 Special Config 会补齐稳定的 `ConfigId` / `SpecialConfigId`，随后以原子方式写回当前配置档。
- 旧配置、历史和世界元数据会先读取并验证，再转换为 `config.ini`、`history.json`、`state.json` 与 `records/*.json` 所需的模型。
- 原始文件不会被删除、移动、重命名或重新压缩；备份包内容本身不因迁移而重压缩。
- 迁移报告和恢复快照会保留在当前配置档，设置页可以显示单元状态、消息、快照位置，并对失败或降级单元提供重试入口。

## 状态与写门禁

迁移报告可能包含下列状态：

| 状态 | 含义与处理 |
| --- | --- |
| `NotNeeded` | 没有对应旧数据，或现有 1.16 状态已经是权威状态。 |
| `Succeeded` | 读取、转换、原子提交和回读验证均完成。 |
| `Pending` | 依赖的配置事务尚未完成；相关历史、世界或云端写入会等待。 |
| `Degraded` | 可识别的数据已迁移，但有未映射项目、缺失时间戳、缺失归档或无法完整重建链。 |
| `Failed` | 读取、快照、写入或验证失败，原始数据不会被当作已迁移。 |

配置事务失败时，配置持久化会被阻断；依赖它的历史、世界和云迁移会显示 `Pending`，避免在身份尚未稳定时继续写入。历史迁移失败也会阻断历史文件的持久化，直到重试或恢复问题。

世界元数据出现 `Degraded` 或 `Failed` 时，MineBackup 会故意不提交不完整的 `state.json`，下一次该世界备份会建立新的安全 Full 链。此时不要手动把旧 `records` 拼回去；先确认备份目录可读、归档包仍在，再执行一次普通 Full 备份并检查历史记录。

## 升级前后的安全流程

1. 关闭正在写入世界或备份目录的其他程序，并复制当前配置档和重要备份目录的清单。
2. 启动 1.16.2，确认导入旧位置的提示内容和目标配置档路径。
3. 等待迁移摘要完成；若出现 `Pending`、`Degraded` 或 `Failed`，先打开 [日志诊断](/docs/guides/minebackup-v1/logging-and-diagnostics) 和迁移报告，不要删除旧文件。
4. 对一个测试世界执行 Full 备份，再执行一次 Clean 或 Custom 还原演练。
5. 确认 `history.json` 中的历史和配置页中的世界绑定正确后，再启用 Smart、自动任务或云归档。

从云端导入 `portable-config.json` 只会恢复白名单字段，新的配置会保持待绑定状态；请先在本机重新绑定 `saveRoot`、世界列表、`backupPath` 和可选的 `snapshotPath`，再开始备份。详见[云归档](/docs/guides/minebackup-v1/cloud-archive)。

## 已有 GUI 配置迁移到 Headless CLI

服务器迁移不要直接复制桌面路径。使用 CLI 导出，再修改服务器路径并重新应用：

```text
GUI Profile
  ↓
profile export
  ↓
修改服务器 saveRoot / backupRoot / 世界路径
  ↓
validate
  ↓
diff
  ↓
profile apply --dry-run
  ↓
profile apply
  ↓
doctor
```

示例：

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile export --output server.json
```

导出后把 GUI 的 `backupPath` 等桌面字段转换为 CLI Manifest 的 `backupRoot` 和 `worlds[].path`，保留现有 UUID 与不需要修改的字段。不要把密码、Token、rclone secret 或云凭据放进文件；同一 Profile 迁移时关闭 GUI，最后用 `config list`、`world list` 和 `doctor` 确认服务器实际接受的对象。

## 不要用旧版重置方法判断当前版本

删除 EXE 旁的 `config.ini` 或某个旧历史文件，并不能完整重置 1.16.2 配置档，也可能让外部备份与历史脱钩。需要重新开始时，先在设置和日志中确认实际 profile root，导出或复制仍需保留的数据，再在 MineBackup 退出后按配置档范围进行备份后处理；不要在运行中直接删除正在使用的目录。

相关页面：[安装](/docs/guides/minebackup-v1/installation)、[首次配置](/docs/guides/minebackup-v1/first-config)、[CLI Profile 与 Manifest](/docs/guides/minebackup-v1/cli/profile-manifest)、[云归档](/docs/guides/minebackup-v1/cloud-archive)、[旧 Windows 服务清理](/docs/guides/minebackup-v1/service-mode)。
