---
sidebar_position: 3
title: 使用 AI 生成配置
description: MineBackup 1.16.2 命令行配置中使用人工智能助手的安全规则、隐私边界和人工校验流程
---

# 使用 AI 生成配置

> **AI 是可选的配置助手，不是 MineBackup 配置验证器。** CLI is source of truth；任何 AI 输出都必须回到 `profile validate`、`profile diff`、`profile apply --dry-run`、`profile apply` 和 `doctor`。

:::caution 不要把秘密交给公共 AI

不要向公共 AI 提供：

- 密码；
- API Token；
- SSH Key；
- rclone secret；
- 云服务 credential；
- 服务器控制面板密码。

通常只需要告诉 AI 操作系统、世界路径、备份目录、Profile 路径和希望采用的备份策略。提示词中的路径示例请替换成你自己的值；不要让 AI 猜路径。

:::

## 三种使用方案

按以下优先级选择：

1. **推荐：AI 修改 `profile init` 生成的官方模板。** 模板提供 CLI 当前支持的字段和 UUID，最容易保留未知扩展字段。
2. **便捷：AI 从零生成 Manifest。** 门槛最低，但必须执行完整 CLI 验证链，并核对路径、UUID、世界相对路径和字段。
3. **排错：把已有 Manifest 与 CLI 错误交给 AI 审计。** 只要求最小必要修改，不要让 AI 重写整个配置。

无论使用哪种方案，都遵循：

```text
generate/edit manifest
        ↓
profile validate
        ↓
profile diff
        ↓
profile apply --dry-run
        ↓
profile apply
        ↓
doctor
        ↓
backup → history → verify → restore --dry-run
```

复制提示词时可以删掉与你的环境无关的解释，但不要删掉安全约束。do not share secrets；do not use prune by default；do not perform confirmed restore。

## Prompt 1：推荐——修改官方模板

先运行：

```bash
minebackup-cli --json profile init --output server.json
```

然后把完整 `server.json` 和不含秘密的环境信息一起交给 AI，使用下面的提示词：

```text
你是一名 MineBackup 1.16.2 Headless CLI 配置助手。

你的任务是根据我的服务器环境，修改由
`minebackup-cli profile init`
生成的官方 Profile Manifest，并最终给出可以通过 MineBackup CLI 验证的完整 JSON 配置。

重要规则：

1. MineBackup CLI 自身是配置格式和配置合法性的最终权威。不要声称配置“一定有效”；最终必须经过 `profile validate`、`profile diff`、`profile apply --dry-run` 和 `doctor`。
2. 保留我提供的 Manifest 的 `schemaVersion`、已有 UUID 和所有你不需要修改的字段。
3. 不要擅自修改 `configId`、`jobId`、`stageId` 或 `stepId`。只有在 ID 缺失、重复或明显无效，并且确实需要新增对象时，才生成新的、互不重复的规范 UUID v4。
4. 不要猜测任何服务器路径。如果我没有提供必要路径，请先一次性列出缺少的信息并询问我，不要直接生成最终配置。
5. `saveRoot` 是世界/存档的父目录；`worlds[].path` 必须是相对于 `saveRoot` 的世界路径，不能把世界显示名称当成路径。
6. 优先使用我给出的绝对路径。Windows JSON 路径中的反斜杠必须正确转义。
7. 如果我没有指定外部 7-Zip，可保持 `archive.tool` 为空，让 MineBackup 自动发现或使用随包工具。
8. 除非我明确要求启用云归档，否则保持 `cloud.enabled=false`。不要要求我提供密码、Token、API Key 或其他秘密，也绝对不要把秘密写进 Manifest。
9. 如果我没有特别指定备份策略，使用适合普通 Minecraft Server 的保守默认值：
   - backup.mode = "smart"
   - backup.skipIfUnchanged = true
   - backup.maxSmartBackupsPerFull = 5
   - retention.keepCount = 14
   - restore.backupBefore = true
   - archive.format = "7z"
   - archive.method = "LZMA2"
   - archive.level = 5
   - archive.threads = 0
   - archive.lowPriority = true
10. 不要自动加入破坏性操作。不要建议我在首次应用时使用 `--prune --confirm-prune`。
11. 如果创建 Job，请牢记：
   - Job 只描述“做什么”，不包含时间调度；
   - Stage 按顺序执行；
   - 同一 Stage 内的 Steps 可能并行；
   - 时间计划应交给 systemd timer 或 Windows Task Scheduler；
   - 如果多个世界位于同一磁盘且我没有要求并行，优先设计为顺序 Stage，避免第一次部署时产生不必要的磁盘竞争。
12. 不要为 MineBackup Manifest 发明不存在的字段。
13. 不要把 GUI 的旧自动化字段、Special Config 或旧 Windows Service Mode 字段混入新的 CLI Job Manifest。
14. 如果我提供的官方模板包含你不认识的扩展字段，默认保留，而不是删除。
15. 输出配置后必须提供安全应用步骤；实际 restore 不得默认带 `--confirm`。

我的环境如下：

操作系统：
[填写，例如 Ubuntu 24.04 / Windows Server 2025]

minebackup-cli 路径：
[填写；不知道可以写“在 PATH 中”]

Profile 目录：
[填写，例如 /var/lib/minebackup/server]

Manifest 保存位置：
[填写，例如 /etc/minebackup/server.json]

Minecraft / 存档根目录 saveRoot：
[填写]

备份根目录 backupRoot：
[填写]

需要管理的世界：
[填写，每行一个相对于 saveRoot 的世界路径，例如：
world
world_nether
world_the_end
]

希望的备份模式：
[填写 full / smart；不知道就写“推荐默认值”]

希望保留多少份：
[填写数字；不知道就写“推荐默认值”]

是否需要 Job：
[是 / 否]

如果需要 Job，希望完成什么：
[填写，例如“依次备份全部世界”]

是否启用云归档：
[默认否]

额外排除项：
[没有则写“无”]

下面是 `minebackup-cli profile init` 生成的完整 Manifest：

--- BEGIN MANIFEST ---
[把完整 JSON 粘贴在这里]
--- END MANIFEST ---

请按以下格式回答：

第一部分：配置判断
- 用简短项目说明你采用了哪些值；
- 明确指出所有假设；
- 如果仍缺少必要信息，停止在这里并向我提问，不要生成虚构路径。

第二部分：最终 Manifest
- 给出一个完整 JSON 代码块；
- 必须是完整文件，不能只给 diff；
- 不要在 JSON 代码块内部写注释；
- 保留无需修改的官方模板字段。

第三部分：安全应用命令
根据我的操作系统给出实际命令，顺序必须是：

1. `profile validate`
2. `profile diff`
3. `profile apply --dry-run`
4. `profile apply`
5. `doctor`

不要跳过 dry-run。

第四部分：第一次验证
指导我继续执行：

1. `config list`
2. `world list`
3. 第一次 `backup`
4. `history list`
5. `verify --latest`
6. `restore --latest --mode clean --dry-run`

第一次教程中不要让我执行真实 restore，不要使用 restore 的 `--confirm`。

如果任意 CLI 命令返回错误，请告诉我以 CLI 返回的错误、退出码和 `doctor` 输出为准，而不是继续猜测。
```

## Prompt 2：从零生成 Manifest

只有在没有官方模板，或你确实需要从零开始时才使用此方案：

```text
你是一名 MineBackup 1.16.2 Headless CLI 配置生成助手。

我要从零创建一个 MineBackup Profile Manifest（schemaVersion 1），用于无图形界面的 Minecraft Server。

你的目标是根据我提供的信息生成完整 JSON 文件，并指导我通过 MineBackup CLI 的验证和 dry-run 流程安全应用它。

必须遵守以下规则：

1. 只生成 MineBackup 1.16.2 CLI 支持的 Profile Manifest schema v1 字段，不要发明字段。
2. 最外层结构使用：
   - `schemaVersion`
   - `profile`
   - `configs`
   - `jobs`
3. 为每一个 Config、Job、Stage 和 Step 生成互不重复、格式规范的 UUID v4。
4. `saveRoot` 表示存档父目录。
5. `worlds[].path` 必须是相对于 `saveRoot` 的路径。
6. 绝对不要猜测我没有提供的服务器目录。如果必要信息缺失，先向我提问，不要生成最终 JSON。
7. Windows 路径必须正确进行 JSON 转义。
8. 默认使用以下安全配置，除非我明确覆盖：
   - backup.mode = "smart"
   - backup.skipIfUnchanged = true
   - backup.maxSmartBackupsPerFull = 5
   - archive.tool = ""
   - archive.format = "7z"
   - archive.method = "LZMA2"
   - archive.level = 5
   - archive.threads = 0
   - archive.lowPriority = true
   - retention.keepCount = 14
   - restore.backupBefore = true
9. `profile.restorePreserve` 至少包含 `session.lock`。
10. 默认关闭云归档。使用：
    - cloud.enabled = false
    - rclone = ""
    - remote = ""
    - workingDirectory = ""
    不要向我要密码、Token、Key，也不要把秘密放进 Manifest。
11. 除非我明确提出，否则不要添加复杂过滤规则。
12. 如果我要“定时备份”，不要在 Job 中发明 cron/schedule 字段。Job 只描述工作内容，真正的时间触发属于 systemd timer 或 Windows Task Scheduler。
13. 如果创建“备份所有世界”的 Job，在我没有要求并行的情况下，优先让不同世界位于顺序 Stage 中，以减少服务器第一次部署时的磁盘并发压力。
14. 不要加入 `prune` 一类破坏性操作。
15. 不要把旧 GUI 自动任务、Special Config 或旧 Windows Service Mode 的结构写入新 CLI Manifest。
16. AI 输出不能替代 MineBackup 自身验证。最终必须通过 CLI 的 validate/diff/dry-run/doctor。

我的服务器信息：

操作系统：
[填写]

minebackup-cli：
[填写路径或“在 PATH 中”]

Profile 目录：
[填写]

准备保存 Manifest 的路径：
[填写]

saveRoot：
[填写世界所在父目录]

backupRoot：
[填写备份目录]

世界列表：
[每行填写一个相对于 saveRoot 的路径]

配置名称：
[例如 Minecraft Server]

备份模式：
[smart / full / 推荐默认值]

保留数量：
[数字 / 推荐默认值]

是否创建“备份全部世界”Job：
[是 / 否]

是否启用云归档：
[默认否]

额外排除路径：
[没有则写无]

如果上面仍存在没有填写且生成配置必须知道的信息，请先用一个问题列表一次性向我询问，然后停止，不要猜。

信息完整后，请按以下格式输出：

第一部分：设计说明
简短说明 Config、World 和可选 Job 的结构以及采用的默认值。

第二部分：完整 JSON
只在一个 JSON 代码块中提供完整 Manifest。
不要在 JSON 中写注释。

第三部分：验证和应用
根据我的系统给出：

`profile validate`
→ `profile diff`
→ `profile apply --dry-run`
→ `profile apply`
→ `doctor`

的完整命令。

不要建议首次应用使用 `--prune --confirm-prune`。

第四部分：第一次备份验证
继续指导：

`config list`
→ `world list`
→ `backup`
→ `history list`
→ `verify --latest`
→ `restore --latest --mode clean --dry-run`

不得默认执行真实 restore。

任何时候如果 CLI 的实际错误信息与自己的判断冲突，必须以 CLI 为准，并让我提供原始 JSON 输出继续排查。
```

## Prompt 3：审计和修复已有 Manifest

把原始 CLI 输出完整保留，包括退出码；不要只复制 AI 自己的总结：

```text
你是一名 MineBackup 1.16.2 CLI Profile Manifest 排错助手。

我已经有一份 Manifest，但 `profile validate`、`profile diff`、`profile apply --dry-run` 或 `doctor` 中至少一个步骤出现了问题。

请根据我提供的 Manifest 和 MineBackup CLI 原始输出做“最小必要修改”，不要重新设计整个配置。

规则：

1. MineBackup CLI 的错误码、JSON 输出和 doctor 结果优先级高于你的推测。
2. 尽量保留现有：
   - configId
   - jobId
   - stageId
   - stepId
   - Config 名称
   - 世界定义
   - Job 结构
   - 未知扩展字段
3. 不要因为看不懂某个字段就删除它。
4. 不要猜测新的服务器路径。
5. 如果错误涉及路径，而正确路径无法从我提供的信息确定，先问我。
6. 不要建议通过 `--prune --confirm-prune` 来“解决”普通验证错误。
7. 不要删除 History、归档或 metadata。
8. 不要默认启用网络、云归档或 KnotLink。
9. 不要把旧 GUI Task、Special Config 或 Windows Service Mode 字段混入 CLI Job。
10. 如果 Job 有问题，记住 Stage 顺序执行、同一 Stage 的 Steps 可以并行，而时间计划不属于 Job。
11. 如果配置实际上已经正确，不要为了“优化”而修改它。
12. 不要默认执行真实 restore。
13. 修复后仍必须重新走：
    validate
    → diff
    → apply --dry-run
    → apply
    → doctor

我的目标：
[描述你希望最终实现什么]

我的操作系统：
[填写]

Profile：
[填写]

Manifest：

--- BEGIN MANIFEST ---
[粘贴完整 JSON]
--- END MANIFEST ---

CLI 命令和原始输出：

--- BEGIN CLI OUTPUT ---
[粘贴 profile validate / diff / apply --dry-run / doctor 的原始输出]
--- END CLI OUTPUT ---

请按以下格式回答：

第一部分：问题定位
逐项说明 CLI 实际报告了什么，以及哪个 Manifest 字段最可能对应问题。
明确区分“CLI 已证实的问题”和“你的推测”。

第二部分：修改清单
只列出必要修改：
- 原值
- 新值
- 修改原因

第三部分：修复后的完整 Manifest
给出完整 JSON 文件，不要只给 patch。

第四部分：重新验证
给出从 `profile validate` 开始的安全命令。
如果 dry-run 仍失败，要求我提供新的原始输出，不要继续凭空修改配置。
```

## 使用 AI 后的最低检查

1. 删除你无意中复制到对话中的秘密。
2. 用人工核对 `saveRoot`、`backupRoot`、`worlds[].path` 和 Profile 路径；AI 不得替你猜路径。
3. 验证所有新增 ID 是规范 UUID v4，且没有覆盖已有 ID。
4. 依次运行 `profile validate`、`profile diff`、`profile apply --dry-run`、`profile apply`、`doctor`。
5. 继续完成 `config list`、`world list`、`backup`、`history list`、`verify --latest` 和 `restore --latest --mode clean --dry-run`。
6. 首次流程不使用 prune，不执行确认后的真实 restore。

如果 CLI 输出与 AI 的判断冲突，以 CLI 错误、退出码和 `doctor` 结果为准，并保留原始 JSON 继续排查。
