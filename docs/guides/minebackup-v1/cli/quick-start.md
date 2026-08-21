---
sidebar_position: 2
title: 5 分钟快速开始：从零完成第一次服务器备份
description: 使用 MineBackup 1.16.2 CLI 按照 Manifest、备份、历史、校验到还原演练完成服务器首次配置
---

# 5 分钟快速开始：从零完成第一次服务器备份

本页只追求一个结果：在不启动 GUI 的情况下完成
**Profile → doctor → Backup → History → Verify → Restore dry-run**。Job、IPC、rclone 和 KnotLink 请等基础闭环成功后再配置。

## Step 1：安装 CLI

从 [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases) 获取与你的平台匹配的资产。Windows 使用 `MineBackup-CLI-<version>-windows-x64.zip`；Linux 使用 portable `.tar.gz` 或 `minebackup-cli_<version>_amd64.deb`。macOS 当前只有 CLI-only 构建验证，没有正式 CLI release asset。

把下面两个值替换成你的实际路径：

```bash
CLI=/opt/minebackup-cli/bin/minebackup-cli
PROFILE=/var/lib/minebackup/server
```

Windows PowerShell 可以写成：

```powershell
$CLI = 'C:\Program Files\MineBackup CLI\minebackup-cli.exe'
$PROFILE = 'D:\MineBackup\server-profile'
```

## Step 2：选择 Profile

`Profile ≠ Minecraft 世界目录`。Profile 是 MineBackup 自己保存配置、历史、日志和运行时状态的根目录，典型结构是：

```text
config/
data/
logs/
runtime/
tools/
```

`--data-dir` 必须指向完整 Profile 根，而不是 `config/` 子目录。它也不应直接指向 `saveRoot` 或 Minecraft 世界目录。

## Step 3：生成 Manifest

先让 CLI 生成官方模板，再编辑存档根、备份根和世界：

```bash
minebackup-cli --json profile init --output server.json
```

接下来有两种方式：

- **方式 A：手动编辑**，保留模板字段和 UUID，只修改实际路径与策略。
- **方式 B：让 AI 帮你填写**，复制[使用 AI 生成配置](/docs/guides/minebackup-v1/cli/ai-assisted-config)中的提示词；AI 只是可选助手，不能代替 CLI 验证。

## Step 4：按顺序验证并应用

先验证 Manifest 本身：

```bash
minebackup-cli --json profile validate --file server.json
```

再把它与 Profile 当前状态比较：

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file server.json
```

先做不会写入配置的 dry-run：

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file server.json --dry-run
```

确认差异符合预期后再应用：

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file server.json
```

不要把 `--prune --confirm-prune` 加入首次部署；它是显式删除未声明 Config/Job 的操作。

## Step 5：运行 doctor

```bash
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

`profile apply` 成功不意味着世界、权限或工具一定已经可用；`doctor` 才负责检查存档路径、备份根写入、7-Zip 能力、世界占用和冷还原状态。

## Step 6：查 Config 和 World，再执行第一次 Backup

不要猜 Config ID 或世界显示名称。先查实际 ID 与规范相对路径：

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
```

然后执行一次备份：

```bash
minebackup-cli --data-dir "$PROFILE" --json backup \
  --config <ConfigId> --world <relative-world-path>
```

`<relative-world-path>` 是 Manifest 中相对于 `saveRoot` 的路径，例如 `world`，不是世界的显示名称，也不是绝对路径。

## Step 7：确认 History

```bash
minebackup-cli --data-dir "$PROFILE" --json history list \
  --config <ConfigId> --world <relative-world-path>
```

确认本地 History 已经写入，并且记录对应的归档文件确实存在。

## Step 8：Verify

```bash
minebackup-cli --data-dir "$PROFILE" --json verify \
  --config <ConfigId> --world <relative-world-path> --latest
```

`--latest` 选择的是本地 History 中归档实际存在的最新记录。Verify 成功是第一次配置闭环的重要条件，不要只看到 Backup 返回成功就跳过它。

## Step 9：Restore dry-run

只做恢复规划、metadata 检查和归档测试，不写入世界：

```bash
minebackup-cli --data-dir "$PROFILE" --json restore \
  --config <ConfigId> --world <relative-world-path> \
  --latest --mode clean --dry-run
```

首次教程不要执行真实 restore，也不要使用 `--confirm`。`clean` 会在真实恢复时清理目标中不属于归档链的内容，因此真实操作必须另行阅读[备份、历史、校验与还原](/docs/guides/minebackup-v1/cli/backup-restore)并确认世界已停止。

## 完成标志

```text
✅ Profile 已应用
✅ doctor 通过
✅ Backup 成功
✅ History 可见
✅ Verify 成功
✅ Restore dry-run 成功
```

如果任意命令返回错误，以 CLI 返回的 JSON、退出码和 `doctor` 输出为准；保留原始输出，不要先凭猜测修改路径或删除 Profile。
