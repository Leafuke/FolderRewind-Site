---
sidebar_position: 2
title: 1.8 升级与启动故障恢复
description: 从旧版本升级到 1.8，并安全处理 1.8.0 的语言配置启动故障
---

# 1.8 升级与启动故障恢复

本页适用于从旧版本升级到 FolderRewind 1.8，以及遇到 1.8.0 无法创建窗口的问题。

:::tip 优先升级到 1.8.1
1.8.1 会自动把旧的 `zh_CN` / `en_US` 迁移为 `zh-CN` / `en-US`。未知语言值会回退到系统语言；即使 Windows 拒绝语言覆盖，程序也会继续使用系统语言启动。
:::

## 升级前检查

1. 完全退出 FolderRewind，包括托盘中的后台进程。
2. 确认当前安装渠道：Store/MSIX 或 MSI。
3. 备份当前数据目录中的 `config.json`、`history.json` 和 `plugins`。
4. 使用测试目录完成一轮现有版本的备份与还原，确认升级前基线正常。
5. 记录加密配置的恢复信息；仅复制 `config.json` 不等于迁移本机加密密码存储。

数据目录：

```text
Store / MSIX:
%LOCALAPPDATA%\Packages\<PackageFamilyName>\LocalState\FolderRewind

MSI:
%LOCALAPPDATA%\FolderRewind
```

## 支持的升级路线

- **v1.7.4 → v1.8.x**：可以直接升级。
- **早于 v1.7.4**：先运行 v1.7.4 完成旧配置迁移，再升级到最新 1.8.x。
- 旧备份与历史元数据仍可用于还原，但升级后必须用测试数据重新验证备份链和还原结果。

升级不会把 MSI 数据自动迁移到 Store/MSIX，反向切换也一样。切换渠道应按 [安装指南](/docs/getting-started/installation#数据目录与切换渠道) 先备份并卸载旧渠道。

## 1.8.0 无法启动时

1. 确认 FolderRewind 已完全退出。
2. 找到当前渠道的 `config.json`。
3. 复制一份备份，例如 `config.before-language-fix.json`。
4. 用文本编辑器打开原文件，找到 `GlobalSettings` 下的 `Language`。
5. 只把值改为以下之一：

   ```json
   "Language": "system"
   ```

   也可以使用 `"zh-CN"` 或 `"en-US"`。

6. 保存文件并保持 JSON 结构有效。
7. 安装或升级到 1.8.1，再启动 FolderRewind。

:::danger 不要删除整个配置
删除 `config.json` 会丢失应用设置、备份配置和插件启用状态。恢复启动只需要备份文件并修正 `GlobalSettings.Language`。
:::

如果文件中没有 `Language`、文件无法解析，或修改后仍不能启动，请恢复备份并到 [GitHub Issues](https://github.com/Leafuke/FolderRewind/issues) 提交日志和已脱敏的配置片段。

## 1.8 的兼容性变化

### 模板

模板导入只接受带有 `FolderRewindTemplate` 标识的 1.0 Envelope。升级前导出的非标准模板应先在测试环境重新导出和验证。

### KnotLink

FolderRewind 1.8 使用严格键值对的 **KnotLink 参数化协议 v2**，并要求 **KnotLink Server v3**。这是两个不同的版本号：

- Server v3：外部 KnotLink 服务端版本。
- 参数化协议 v2：FolderRewind 与插件处理的请求格式。

使用旧命令接口的插件需要升级；使用 1.8 新接口的插件应声明 `MinHostVersion` 为 `1.8.0` 或更高。

### 部分备份

区域备份等插件范围只包含部分文件。FolderRewind 会强制使用 Overwrite 还原，避免 Clean 模式删除未包含在归档中的文件。

## 升级后验收

1. 确认语言、主题、配置和插件状态正确。
2. 在测试目录分别执行全量与智能增量备份。
3. 验证一条最新备份能够成功还原。
4. 检查自动化目标、过滤规则和云同步路径。
5. KnotLink 用户运行一次连接测试并确认 Server 版本满足要求。

确认所有项目后，再恢复正式自动化任务。

## 相关链接

- [安装指南](/docs/getting-started/installation)
- [数据迁移](/docs/guides/data-migration)
- [备份模式详解](/docs/guides/backup-modes)
- [KnotLink 协议与联动](/docs/plugins/knotlink)
