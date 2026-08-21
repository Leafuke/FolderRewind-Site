---
sidebar_position: 17
title: 旧 Windows 服务清理
description: MineBackup 1.16.2 对旧版 Windows Service Mode 的兼容性清理流程，包含旧服务检查、安全移除边界与 UAC 提权验证说明
---

# 旧 Windows 服务清理

MineBackup 1.16.2 **不能安装或启动 Windows Service Mode**。当前版本只保留一套兼容性清理流程，用来检查并在安全条件满足时移除旧版本留下的 MineBackup Windows 服务。

这不是新的后台运行方式，也不会把普通配置或统一任务转换成服务。

:::note 现代服务器入口

Legacy Windows Service Mode 与新的 CLI `serve` 完全不同。服务器无人值守部署请优先使用 [CLI `serve`](/docs/guides/minebackup-v1/cli/serve)、[Linux systemd](/docs/guides/minebackup-v1/cli/linux-systemd) 或 [Windows Task Scheduler](/docs/guides/minebackup-v1/cli/windows-task-scheduler)。本页的旧 `--service` 清理逻辑仍然保留，但不要把它当作新的服务机制。

:::

## 当前支持什么

Windows 端设置中的“旧服务清理”可以：

- 查询配置中记录的旧服务名称、ImagePath 和运行状态；
- 判断该服务是否确实指向旧版 MineBackup；
- 在用户确认并通过 UAC 提权后停止并移除已验证的服务；
- 在检查失败、用户取消或停止超时时保持服务不变。

非 Windows 平台没有这套清理能力。`--service` 参数在 1.16 中已弃用并禁用；它不会启动服务，通常会直接返回错误。

## 为什么删除前必须验证

清理器不会根据服务名称直接删除任意 Windows 服务。它会重新读取服务配置，并要求 ImagePath 满足全部条件：

1. ImagePath 非空，且包含一个独立的 `--service` 参数；
2. 除 `--service` 外没有其他参数，也不存在重复的 `--service`；
3. 可执行文件路径是绝对路径，文件名是 `MineBackup.exe`；
4. 文件存在，并且包含 MineBackup 资源。

只要路径格式、参数、文件或资源验证失败，界面会显示诊断信息并原样保留服务。这样可以避免把同名但属于其他程序的服务误删。

## 推荐清理流程

1. 先在设置的“旧服务清理”页签执行检查，记录服务名称、ImagePath、状态和诊断信息。
2. 确认服务确实是旧版 MineBackup，并备份需要保留的配置、历史和备份目录。
3. 选择清理并同意 UAC 提示。提权辅助进程只接受清理参数，不能同时带普通启动、配置选择或 `--service` 参数。
4. 清理器会重新验证服务；若服务正在运行，会先请求停止并最多等待 15 秒。
5. 只有服务已经停止且验证仍然通过时才调用 Windows 的删除操作。
6. 回到设置页重新检查；清理只移除服务注册项，不会删除配置档、世界目录或备份包。

也可以由维护者在 Windows 上调用当前 EXE 的专用入口：

```text
MineBackup.exe --cleanup-legacy-service "<service-name>"
```

该参数必须单独使用，并会触发同样的 ImagePath、资源和运行状态验证。不要用 `--service` 代替它，也不要绕过验证直接运行 `sc delete`。

## 清理失败时怎么做

- UAC 被取消：服务没有改变，重新从设置页发起即可。
- ImagePath 不安全、EXE 不存在或资源不匹配：不要手工删除，先确认服务是否属于另一套安装，再决定由系统管理员处理。
- 服务无法在 15 秒内停止：清理器不会删除它；检查占用该服务的旧环境后再重试。
- 找不到服务：说明当前记录的服务名没有安装，不需要通过 MineBackup 创建新服务。

清理完成后仍建议阅读[故障排查](/docs/guides/minebackup-v1/troubleshooting)和[日志与诊断](/docs/guides/minebackup-v1/logging-and-diagnostics)，确认应用已经回到普通 GUI/任务流程。1.16.2 的产品能力边界是“检查并清理旧服务”，不是“继续维护服务模式”。
