---
sidebar_position: 19
title: 常见问题（MineBackup 1.16.2）
description: MineBackup 1.16.2 的产品边界、备份、还原、迁移与联动问答
---

# 常见问题（MineBackup 1.16.2）

## MineBackup 与 FolderRewind 是什么关系？

MineBackup 是 FolderRewind 生态中的第一代存档时光机，保留了独立的配置档、Smart 链、KnotLink 联动和跨平台运行边界。FolderRewind 的通用文档不等于 MineBackup 的能力说明；本文和[一代时光机总览](/docs/guides/minebackup-v1/overview)以 MineBackup 1.16.2 源码为准。

## 1.16.2 支持哪些平台？

当前发行目标包括 Windows x64、Linux x86_64 和 macOS arm64，桌面托盘、通知、热键和 KnotLink 会根据平台会话能力出现差异。Linux/macOS 不是 Windows 的简单“降级版”；核心备份、还原、配置档和任务模型保持一致，但路径、Shell、桌面门户和权限行为不同。详见[平台支持](/docs/guides/minebackup-v1/platform-support)。

## 我能继续安装或启动 Service Mode 吗？

不能。1.16.2 不能安装或启动 Windows Service Mode；只支持在 Windows 上检查并安全清理已经存在且通过验证的旧 MineBackup 服务。`--service` 已弃用并禁用。新的服务器常驻运行时请看 [`minebackup-cli serve`](/docs/guides/minebackup-v1/cli/serve)；旧桌面无人值守流程仍可参考[自动化任务](/docs/guides/minebackup-v1/automation)或 [Special Config](/docs/guides/minebackup-v1/special-mode)。

## MineBackup 能否完全不启动 GUI？

可以。`minebackup-cli` 是无 GUI 的 headless 入口，能直接执行 profile、doctor、backup、history、verify、restore、Job 和 `serve`；新服务器应从 [CLI 总览](/docs/guides/minebackup-v1/cli/overview) 和[快速上手](/docs/guides/minebackup-v1/cli/quick-start)开始，并按校验链逐步推进。

## CLI 和 GUI 是否共用备份历史？

共用。两者使用同一核心、配置档和 HistoryRepository，因此同一 Profile 下看到的是同一套配置、Job、历史和归档关联。但一个 Profile 同时只能有一个 owner；GUI 正在运行时，CLI 会返回 `profile_busy`，反过来也一样。服务器部署应使用独立 profile，并在迁移前关闭 GUI。

## `serve` 是不是旧 Windows Service Mode？

不是。`serve` 是可选的跨平台 headless 运行时，通过本机 IPC 长期持有一个 Profile，并可承载 KnotLink；它不安装 Windows 服务，也不复活已弃用的 `--service`。旧 Service Mode 只允许检查并安全清理已经存在且通过验证的服务，详见[旧 Windows 服务清理](/docs/guides/minebackup-v1/service-mode)和 [Serve 常驻运行时](/docs/guides/minebackup-v1/cli/serve)。

## 为什么 Job 没有定时设置？

因为 Job 描述“执行什么”（备份目标、步骤和顺序），而 systemd timer 或 Windows Task Scheduler 描述“何时执行”。这样同一 Job 可以被手动运行、一次性调度或按平台策略调度；先看 [CLI Jobs](/docs/guides/minebackup-v1/cli/jobs)、[Linux systemd](/docs/guides/minebackup-v1/cli/linux-systemd) 和 [Windows Task Scheduler](/docs/guides/minebackup-v1/cli/windows-task-scheduler)。

## 能否让 AI 帮我生成 Manifest？

可以，但 AI 只是可选的配置助手，不是 validator，也不是事实来源。不要把密码、Token、rclone secret、私钥或完整内部路径交给模型；生成后必须由 `profile validate`、`profile diff`、`profile apply --dry-run`、`profile apply` 和 `doctor` 逐步确认。安全提示和可复用提示词见 [AI 辅助配置](/docs/guides/minebackup-v1/cli/ai-assisted-config)。

## 第一次备份应该选择哪种模式？

先选择配置界面的 **Full**，确认历史记录、备份包和还原闭环正常后再使用 **Smart**。配置界面的 **Overwrite** 是另一种实际备份模式；它们与 KnotLink 一次性请求中的 `backup_mode=full|incremental` 不是同一套术语。

## Smart 的 Full 基线被删除了怎么办？

不要手工修改 `state.json` 或 `records`。MineBackup 会在检测到基线、归档或元数据不安全时强制建立新的安全 Full；确认新的 Full 成功后，再继续 Smart。若问题发生在 1.15 迁移后，先查看迁移状态和[配置档与迁移](/docs/guides/minebackup-v1/data-and-migration)。

## 还原方式怎么选？

**Clean** 先清理目标，**Overwrite** 只覆盖归档提供的文件，**Reverse** 撤销选定归档的变化，**Custom** 只还原选定文件。第一次还原建议在测试世界演练，必要时启用 `backupBefore`；运行中的世界要先保存、退出并等待文件释放。完整决策见[首次还原](/docs/guides/minebackup-v1/first-restore)。

## 热备份/热还原可靠吗？

它们是尽力而为的联动流程，不是无条件的一致性保证。握手失败、版本不兼容或超时可能回退普通备份；热还原则必须完整演练保存、退出、文件释放、还原和重新进入流程。使用 MineBackup-Mod 至少 `3.0.0`，并先用测试世界验证。

## 配置和历史记录在哪里？

1.16.2 使用独立 profile：当前配置在 `<profile>/config/config.ini`，历史在 `<profile>/data/history.json`，日志在 `<profile>/logs` 或平台对应的日志目录。实际备份包仍由配置的 `backupPath` 决定，不一定和 profile 在同一处。详见[配置档与迁移](/docs/guides/minebackup-v1/data-and-migration)。

## 如何安全地重新开始？

不要只删除某个旧配置文件来重置，也不要在运行中删除当前 profile。先关闭 MineBackup，复制需要保留的 profile、历史和备份清单；若只是想做隔离实验，使用新的绝对路径启动 `--data-dir`，验证无误后再决定是否清理旧 profile。重置 profile 不会自动删除 `backupPath` 中的备份包，但会让历史与外部备份失去关联，因此必须先做好备份。

## 为什么从云端导入后还不能立即备份？

云端 `portable-config.json` 只包含明确允许同步的配置字段，不包含本机世界路径、备份路径、工具路径、凭据、命令、脚本或自动化。导入后配置会处于待绑定状态；重新绑定本机 `saveRoot`、世界列表、`backupPath` 和可选 `snapshotPath` 后才能安全运行。见[云归档](/docs/guides/minebackup-v1/cloud-archive)。

## rclone 会随程序一起安装吗？凭据会同步吗？

rclone 不随 MineBackup 程序包分发。受管理安装会在用户确认后从官方来源获取经过版本和 SHA-256 校验的版本。MineBackup 不会复制、解析或上传用户的 rclone 凭据文件；云同步的远端权限仍由用户自己负责。

## KnotLink 需要哪些版本？

MineBackup-Mod 至少为 `3.0.0`，KnotLinkService 推荐至少为 `3.2.0.0`。KnotLink v2 使用严格的 `key=value;key2=value2` 格式；状态变更请求需要 `from` 和 `request_id`。Windows 默认回环端口是 6370 和 6378。旧位置参数、旧别名和自由文本命令不属于当前接口。详见[KnotLink v2 联动](/docs/guides/minebackup-v1/knotlink-integration)。

## 迁移失败会删除我的旧数据吗？

不会。1.15 到 1.16 的迁移会保留源文件，不会重命名、移动或重新压缩原有备份；迁移报告和恢复快照位于当前 profile。`Pending`、`Degraded` 或 `Failed` 状态会限制相关写入或让下一次世界备份建立安全 Full。请先看[配置档与迁移](/docs/guides/minebackup-v1/data-and-migration)和[日志与诊断](/docs/guides/minebackup-v1/logging-and-diagnostics)，不要直接删除旧数据。

## 为什么找不到旧的 `auto_log.txt` 之类文件？

当前版本使用 `minebackup.log`、Log 面板和 **Export Diagnostics**。旧版日志文件不再写入，也不会自动迁移或删除。诊断导出会脱敏已知路径和 URL 敏感信息，但分享前仍要人工检查；详见[日志与诊断](/docs/guides/minebackup-v1/logging-and-diagnostics)。

## 什么时候应该新建配置？

当世界路径或备份目录已改变、Smart 链无法安全恢复、过滤规则叠加到难以解释，或者需要测试另一套压缩/云端设置时，可以新建配置。新配置拥有独立的 `ConfigId` 和历史关联；不要为了绕过迁移或权限错误而盲目新建，先保留原 profile 和诊断信息。

## 英文文档在哪里？

本栏目已同步提供英文镜像。页面之间的链接和版本边界应保持一致；如果英文页面与中文页面出现事实差异，请以 1.16.2 源码行为为准并提交反馈。
