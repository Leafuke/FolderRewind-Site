---
sidebar_position: 8
title: Linux 与 systemd
description: 使用 MineBackup 1.16.2 CLI 和官方 systemd 模板配置 Linux 服务器、常驻服务与定时任务
---

# Linux 与 systemd

本页把已经验证过的 CLI Profile 放进 Linux 生产运行链：

```text
安装 .deb
↓
准备 Profile
↓
准备 Manifest
↓
doctor
↓
手动 job run
↓
配置 env
↓
启用 serve
↓
启用 timer
↓
检查 status
↓
检查 journal
```

先完成[5 分钟快速开始](/docs/guides/minebackup-v1/cli/quick-start)，确认 Backup、History、Verify 和 Restore dry-run 成功，再把任务交给 systemd。

## 1. 安装 CLI

从 [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases) 下载 `minebackup-cli_<version>_amd64.deb` 或 portable `MineBackup-CLI-<version>-linux-x64.tar.gz`。`.deb` 示例：

```bash
sudo apt install ./minebackup-cli_<version>_amd64.deb
minebackup-cli --version
```

如果使用 portable 包，把其目录放到固定位置，并在 systemd 模板中使用实际 CLI 路径。不要把用户的临时 shell PATH 当作服务环境。

## 2. 准备 Profile、存档和备份根

示例变量：

```bash
PROFILE=/var/lib/minebackup/server
SAVE_ROOT=/srv/minecraft
BACKUP_ROOT=/var/backups/minecraft
JOB_ID=22222222-2222-4222-8222-222222222222
```

运行 MineBackup 的 Unix 用户（官方模板默认 `minecraft`）必须：

- 可读 `saveRoot`；
- 可写 `backupRoot`；
- 可读写 Profile；
- 与 `serve` 和 one-shot CLI 使用同一账户。

不要让 GUI 以另一个用户同时打开同一个 Profile。Profile、世界和备份目录的权限问题通常会先表现为 `doctor` 或 `target_not_found`，不要用 root 运行一次后把所有权弄乱。

## 3. 准备并验证 Manifest

按[Profile 与 Manifest](/docs/guides/minebackup-v1/cli/profile-manifest)生成或编辑 `server.json`，确保 `saveRoot` 是世界父目录，`backupRoot` 是备份根，`worlds[].path` 是相对路径。然后按完整顺序执行：

```bash
minebackup-cli --json profile validate --file /etc/minebackup/server.json
minebackup-cli --data-dir "$PROFILE" --json \
  profile diff --file /etc/minebackup/server.json
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file /etc/minebackup/server.json --dry-run
minebackup-cli --data-dir "$PROFILE" --json \
  profile apply --file /etc/minebackup/server.json
minebackup-cli --data-dir "$PROFILE" --json --no-network doctor
```

接着确认 Config、World 和 Job：

```bash
minebackup-cli --data-dir "$PROFILE" --json config list
minebackup-cli --data-dir "$PROFILE" --json world list --config <ConfigId>
minebackup-cli --data-dir "$PROFILE" --json job list
```

## 4. 先手动运行一次 Job

不要直接启用 timer。先手动运行仓库模板会调用的同一命令：

```bash
minebackup-cli --data-dir "$PROFILE" --json \
  job run --job "$JOB_ID"
```

确认退出码、Job/Stage/Step envelope、History 和 Verify。手动 job run 失败时先修复 CLI/Profile，不要让 timer 重复制造同一错误。

## 5. 配置官方 `.env`

`.env` 只保存实例路径和 Job ID；它不替代 Manifest，也不应保存密码。使用包中实际提供的 `example.env`，安装包通常位于：

```text
/usr/share/doc/minebackup-cli/examples/systemd.env
```

复制为实例配置并编辑：

```bash
sudo install -d -m 0750 /etc/minebackup
sudo cp /usr/share/doc/minebackup-cli/examples/systemd.env \
  /etc/minebackup/server.env
sudoedit /etc/minebackup/server.env
```

至少确认这些变量：

```dotenv
MINEBACKUP_DATA_DIR=/var/lib/minebackup/server
MINEBACKUP_SAVE_ROOT=/srv/minecraft
MINEBACKUP_BACKUP_ROOT=/var/backups/minecraft
MINEBACKUP_JOB_ID=22222222-2222-4222-8222-222222222222
```

## 6. 使用仓库提供的 unit 文件

不要重新发明 unit 文件。正式包提供并安装以下模板：

```text
minebackup-serve@.service
minebackup-backup@.service
minebackup-backup@.timer
```

职责分别是：

- `.service`：以长期进程运行 `minebackup-cli ... serve`，持有 Profile runtime；
- `minebackup-backup@.service`：一次性执行 `job run --job ...`；
- `.timer`：决定何时触发对应的 backup service，`Persistent=true` 可处理错过的计划。

模板默认使用 `minecraft` 用户和组、严格的 umask 与受限系统权限。若服务器账户不同，按发行包的运维规范调整 unit 的 User/Group，但必须让 Serve 与 Job 使用同一账户，并复核它对四个路径的权限。

## 7. 启用 Serve，再启用 timer

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now minebackup-serve@server.service
sudo systemctl enable --now minebackup-backup@server.timer
```

先确认常驻 runtime：

```bash
systemctl status minebackup-serve@server.service
minebackup-cli --data-dir "$PROFILE" --json serve status
```

再确认 timer 和最近一次 Job：

```bash
systemctl list-timers 'minebackup-backup@*'
systemctl status minebackup-backup@server.service
journalctl -u minebackup-backup@server.service
```

timer 触发的普通 `job run` 会自动通过本机 IPC 转发给 Serve；不需要改成另一套命令，也不要让 timer 直接打开 GUI。

## 没有备份时按层定位

依次检查：

```text
scheduler
→ systemctl status / list-timers
→ journalctl
→ CLI envelope / exit code
→ Job / Config / World
→ archive 与 backupRoot
```

常见边界：

- `serve` 没启动：检查 `serve status` 和 `minebackup-serve@server.service`；
- Job 失败：手动运行同一个 `job run`，再看 Job/Stage/Step diagnostics；
- 世界找不到：运行 `config list`、`world list`、`doctor`，不要猜路径；
- 7-Zip 不可用：以 `doctor` 的 `tool_unavailable` 诊断为准；
- 权限不足：确认运行 unit 的 Unix 用户，而不是只确认当前 SSH 用户。

完成后继续阅读[命令、JSON 与退出码](/docs/guides/minebackup-v1/cli/reference)和[CLI 故障排查](/docs/guides/minebackup-v1/cli/troubleshooting)。
