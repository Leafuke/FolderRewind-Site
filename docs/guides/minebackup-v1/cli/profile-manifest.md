---
sidebar_position: 4
title: Profile 与 Manifest
description: 理解 MineBackup 1.16.2 CLI 的 Profile、Config、World、Job 和 Manifest 生命周期
---

# Profile 与 Manifest

如果你只记住一个区别，请记住：

> **Config = 备份什么、怎么备份；Job = 一次运行执行什么。**

Manifest 是可以审查、复制和版本控制的声明式输入；Profile 是 MineBackup 在服务器上实际保存配置、历史和运行时状态的目录。

## 先建立对象模型

```text
Profile
├── Config
│   └── World
└── Job
    └── Stage
        └── Step
```

- **Profile**：由 `--data-dir` 指定的完整 MineBackup 数据根，包含 `config/`、`data/`、`logs/`、`runtime/` 和 `tools/` 等目录。
- **Config**：描述一个备份配置，包括 `saveRoot`、`backupRoot`、世界相对路径、备份模式、归档、保留、还原和云归档设置。
- **World**：Config 管理的一个目录；`worlds[].path` 是相对于 `saveRoot` 的规范相对路径。
- **Job**：一次要执行的工作流，通过 ConfigId 和 World path 指向目标；它不包含时间调度。
- **Stage**：Job 中按数组顺序执行的阶段。
- **Step**：Stage 中的具体 Backup 或 Process 工作；同一 Stage 的 Steps 可能并行。

Job 只描述“做什么”，系统调度器决定“什么时候做”。定时属于 systemd timer 或 Windows Task Scheduler，不要向 Manifest 添加 cron、schedule、Once、Interval 或 Scheduled 字段。

## 路径模型：不要把四种路径混在一起

| 名称 | 含义 | 常见错误 |
| --- | --- | --- |
| `--data-dir` | Profile 根目录，保存 MineBackup 自己的配置、历史、日志和 runtime | 指向 `config/`、`saveRoot` 或世界目录 |
| `saveRoot` | 世界/存档的父目录 | 把某个世界目录本身当成父目录 |
| `backupRoot` | 归档和 MineBackup metadata 的备份根目录 | 与 Profile 根混用，或只给一个归档文件名 |
| `worlds[].path` | 相对于 `saveRoot` 的世界路径 | 写显示名称、数字索引或绝对路径 |
| Manifest path | 供 `profile init/validate/diff/apply` 读取的 JSON 文件位置 | 复制客户端绝对路径后不改服务器路径 |

例如：

```text
saveRoot = /srv/minecraft
worlds[].path = world_nether
实际世界目录 = /srv/minecraft/world_nether
```

Manifest 中的本地相对路径以 Manifest 文件所在目录为基准解析；应用后会写入绝对路径。服务器部署应使用绝对路径，Windows JSON 中的反斜杠必须写成 `\\` 或使用正斜杠。

`--data-dir` 不是 `config/`：

```bash
minebackup-cli --data-dir /var/lib/minebackup/server --json doctor
```

不要写成：

```bash
minebackup-cli --data-dir /var/lib/minebackup/server/config --json doctor
```

## Manifest 的最小结构

官方 `profile init` 会生成带规范 UUID 的模板。顶层结构是：

```json
{
  "schemaVersion": 1,
  "profile": {
    "restorePreserve": ["session.lock"]
  },
  "configs": [],
  "jobs": []
}
```

完整的服务器示例以 MineBackup 仓库的 `packaging/cli/server-manifest.example.json` 为准。不要从旧 GUI automation、Special Config 或旧 Windows Service Mode 文件拼出新的 CLI Job；CLI 只接受当前 schema v1 支持的字段。

## Manifest 生命周期

### 1. 生成模板

```bash
minebackup-cli --json profile init --output server.json
```

这一步只生成可编辑的官方起点。它不会替你知道 `saveRoot`、`backupRoot` 或实际世界路径。

### 2. 验证格式和引用

```bash
minebackup-cli --json profile validate --file server.json
```

这一步验证 JSON、schema、UUID、Config/Job/Stage/Step 结构和跨引用。AI 或编辑器的“看起来正确”不等于 CLI 合法。

### 3. 查看差异

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file server.json
```

`diff` 让你在写入 Profile 前看到新增、更新和可能的删除。默认 apply 按 ConfigId 和 JobId 合并；Manifest 未涉及的配置、Job、GUI 字段和未知扩展字段会保留。

### 4. 先 dry-run，再应用

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file server.json --dry-run

minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file server.json
```

dry-run 是事务应用前的最后一次无写入检查。应用成功后，配置文件和 Job 文件才会以事务方式提交；跨引用验证失败会回滚旧快照。

### 5. 导出和迁移

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile export --output exported.json
```

`profile export` 适合审计、迁移和交给 AI 做无秘密审查。导出后不要直接把客户端绝对路径带到服务器；修改 `saveRoot`、`backupRoot`、工具路径和云工作目录后，重新执行 validate → diff → dry-run → apply → doctor。

## Merge 与 prune：何时会发生删除？

普通 `profile apply` 是按稳定 ID 合并：

- 同一个 `configId` 更新对应 Config；
- 同一个 `jobId` 更新对应 Job；
- 未在 Manifest 中声明的其他配置、Job 和未知字段默认保留；
- History、归档和 metadata 不会因为普通 apply 被删除。

`--prune --confirm-prune` 是显式删除行为：它才会移除未声明的 Config/Job。初次部署、普通验证错误或路径排错都不应使用它。

如果确实要整理废弃对象，先运行：

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file server.json --prune
```

阅读受影响的 ConfigId/JobId 和历史影响，再在已经备份 Profile、归档和 metadata 后明确使用 apply 的 `--prune --confirm-prune`。它不是“让配置通过验证”的通用修复按钮。

## 已有 GUI 配置迁移到服务器

迁移目标是复用配置意图和稳定 ID，不是把桌面路径原样复制到服务器：

```text
GUI Profile
  ↓
profile export
  ↓
修改服务器路径
  ↓
validate
  ↓
diff
  ↓
dry-run
  ↓
apply
  ↓
doctor
```

示例：

```powershell
minebackup-cli.exe --data-dir "D:\MineBackupProfile" --json `
  profile export --output "D:\transfer\server.json"
```

把 `server.json` 上传到服务器后：

1. 确认服务器的 `saveRoot`、`backupRoot` 和每个 `worlds[].path`；
2. 移除或保持关闭云归档，不要把凭据写进 Manifest；
3. 确认 Profile 目录由运行 CLI/serve 的同一 Unix 或 Windows 账户读写；
4. 重新执行完整验证链；
5. 用 `config list` 和 `world list` 确认 CLI 实际接受的 ID/路径，再做第一份 Backup。

GUI 与 `serve` 对同一 Profile 严格互斥。迁移期间关闭 GUI，不要让两个入口同时写入同一个 Profile。

## 修改 Manifest 的安全规则

- 保留 `schemaVersion`、现有 UUID 和不需要修改的字段；
- 新增 Config、Job、Stage、Step 时使用互不重复的规范 UUID v4；
- `profile.restorePreserve` 至少保留 `session.lock`；
- `archive.tool` 可以留空，让 MineBackup 自动发现随包工具；
- 默认保持 `cloud.enabled=false`，不把密码、Token、Key 或 rclone secret 写入文件；
- 多世界首次部署在没有明确并行要求时，优先放进顺序 Stage，避免同一磁盘竞争；
- 任何字段“不认识”时先以官方模板、CLI validate 和当前工程文档为准，不要擅自删除。

完成 Manifest 后回到[5 分钟快速开始](/docs/guides/minebackup-v1/cli/quick-start)，继续 doctor、Backup、History、Verify 和 Restore dry-run。
