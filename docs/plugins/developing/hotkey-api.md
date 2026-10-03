---
sidebar_position: 4
title: "命令与快捷键 API"
description: "FolderRewind 1.9 系列命令与快捷键 API操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# 命令与快捷键 API

API 3.6 使用 IPluginCommandCapability。命令描述 PluginCommandDescriptor 包含 Id、DisplayName、ArgumentSchema，并可设置 DefaultHotkey 与 IsGlobalHotkey。快捷键绑定是 Host 的配置和调度职责。

## 描述与执行

以下为实现内的描述片段；Id 是插件自己的 PluginId：

```csharp
new PluginCommandDescriptor(new PluginCommandId(Id, "backup"), "Backup",
    JsonSerializer.SerializeToElement(new { type = "object" }))
{ DefaultHotkey = "Ctrl+Shift+B", IsGlobalHotkey = true };
```

完整可构建实现见[GameRewind 教程](/docs/plugins/developing/tutorial)。ExecuteAsync 接收命令身份、JsonElement 参数与调用上下文，返回明确 OperationOutcome 和诊断。快捷键不应重复实现备份流程，应使用已声明的 Backups／Restores 服务。

## 全局与应用内

IsGlobalHotkey=true 表示系统全局注册；false 表示应用内调度。用户可修改绑定，默认手势只是建议。与系统或其他程序冲突时查看注册诊断并更换组合，不承诺后加载插件会覆盖原绑定。

## MineRewind 与验收

MineRewind 默认 Alt+Ctrl+S 备份、Alt+Ctrl+Z 快速还原当前活跃世界。活动目标通过 session.lock 识别；快速还原由 Host 按活动分支解析，不能用时间最新归档自行替代。

验证绑定、无活跃世界、多个目标、取消、停用后不再路由和重复调用。不要在回调里同步阻塞 UI，后台工作须尊重操作取消与插件生命周期。

<span id="接口定义" />
<span id="pluginhotkeydefinition-字段" />
<span id="全局热键-vs-应用内快捷键" />
<span id="完整示例" />
<span id="minerewind-示例" />
<span id="设计建议" />
<span id="相关链接" />
