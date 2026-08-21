---
sidebar_position: 2
title: 平台支持与安装边界
description: MineBackup 1.16.2 的 Windows、Linux、macOS 桌面与 CLI 支持范围、分发形式和安装边界
---

# 平台支持与安装边界

MineBackup 1.16.2 的备份、还原、历史记录和核心数据契约跨平台一致；桌面集成与 headless CLI 是两种分发/运行边界，应分别判断。

## 支持矩阵

| 平台 | Desktop | CLI |
| --- | --- | --- |
| Windows x64 | 正式支持；Windows 10 22H2、Windows 11 | 正式 CLI ZIP：`MineBackup-CLI-<version>-windows-x64.zip` |
| Linux x86_64 | 正式支持；Ubuntu 24.04/glibc 2.39 基线 | portable `.tar.gz` 与 `.deb` |
| macOS arm64 | 正式支持；macOS 15 及更高版本 | CLI-only 构建验证；当前不提供正式 CLI release asset |

Linux 正式构建以 Ubuntu 24.04 工具链和 glibc 2.39 为基线；Ubuntu 22.04 和 Debian 12 不在当前支持范围内。桌面资产和 CLI 资产的具体版本、校验值以 [MineBackup Releases](https://github.com/Leafuke/MineBackup/releases) 为准。

macOS 的 CLI-only 构建会继续参与构建与回归验证，但不要把自行构建结果误认为官方服务器下载包。

## 核心能力与桌面能力是两回事

Linux 桌面服务会报告 `Available`、`Unavailable`、`PermissionRequired` 或 `Failed` 等状态，并给出原因。缺少托盘宿主、门户或快捷键权限时：

- 备份、还原和历史记录仍应保持可用。
- 主窗口不应因为桌面集成失败而无法打开。
- 需要依赖桌面服务的功能应显示明确诊断，而不是静默假装成功。

因此，第一次运行时请先验证普通备份和还原，再处理托盘、自动启动或全局热键。

## macOS 首次启动

当前 DMG 为 arm64、ad-hoc 签名且未进行 Apple 公证。首次打开如果被系统拦截，请在 **系统设置 → 隐私与安全性** 中选择“仍要打开”。

不要关闭 Gatekeeper，也不要使用 `xattr` 删除隔离标记来绕过系统安全检查。

## KnotLink 的平台差异

KnotLink 联动的核心协议跨平台一致，但服务发现和安装方式不同：

- Windows 检查 App Paths 和 32/64 位卸载注册表视图，并要求 KnotLinkService 3.2.0.0 或更高版本。
- Linux 通过 dpkg 信息发现服务，服务由 systemd 管理。
- macOS 通过 Installer receipt 发现服务，服务由 launchd 管理。

MineBackup 可以在向导或设置页下载并校验官方服务包，然后交给系统安装器；剩余安装步骤仍由用户完成。联动模组最低版本和热流程见 [KnotLink v2 联动](/docs/guides/minebackup-v1/knotlink-integration)。

## Windows Service Mode 与 CLI 的边界

1.16.2 不再安装或启动旧 Windows Service Mode。Windows 设置页只保留旧服务检查和安全清理入口；服务器请使用 [CLI `serve`](/docs/guides/minebackup-v1/cli/serve)、systemd 或 Task Scheduler。Linux 与 macOS 不提供旧服务清理能力。详见[旧 Windows 服务清理](/docs/guides/minebackup-v1/service-mode)。

## 安装后的最小验证

1. 启动程序并确认配置档位置可写。
2. 创建一个只含一个世界的普通配置。
3. 确认内置或手动指定的 7-Zip 可执行文件可以运行。
4. 完成一次 Full 备份。
5. 在测试目录或测试世界执行一次还原。
6. 最后再启用热键、托盘、云同步或联动服务。
