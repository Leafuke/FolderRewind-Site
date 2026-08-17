---
sidebar_position: 6
title: 插件体系
description: FolderRewind 1.8 插件接口、生命周期与 KnotLink 参数化协议
---

# 插件体系

FolderRewind 1.8 的插件系统由核心生命周期接口和按能力选择的扩展接口组成。插件与 Host 在同一进程运行，由独立的可卸载 `AssemblyLoadContext` 加载；插件仍需自行处理异常和线程。

## 接口地图

| 接口 | 责任 |
|------|------|
| `IFolderRewindPlugin` | manifest、设置、初始化、备份/还原钩子、配置发现和可选完整接管 |
| `IFolderRewindBackupFilterProvider` | 为一次备份追加过滤规则 |
| `IFolderRewindBackupScopeProvider` | 声明和解析配置级备份范围 |
| `IFolderRewindBackupPreparationProvider` | 读取触发来源及一致性偏好 |
| `IFolderRewindFolderDetailsProvider` | 为文件夹详情页提供只读键值分区 |
| `IFolderRewindRestoreInterceptor` | 在还原任务产生前继续、处理或阻止请求 |
| `IFolderRewindConfigAugmenter` | 建议为已有配置追加发现的文件夹 |
| `IFolderRewindParameterizedKnotLinkCommandHandler` | 处理严格键值对 KnotLink v2 请求 |
| `IFolderRewindKnotLinkCapabilityProvider` | 发布可发现的 KnotLink 命令/信号 |
| `IFolderRewindHotkeyProvider` | 注册全局或应用内快捷键 |

## 生命周期

扫描插件目录 → 读取 manifest 并检查 MinHostVersion → 独立 AssemblyLoadContext 加载 → Initialize → SetHostContext → 注册扩展 → 按任务调用备份/还原接口 → 禁用、卸载或更新。

新 1.8 接口的示例插件应声明 `MinHostVersion: "1.8.0"`。当前 MineRewind 使用 `1.8.1`，因为它依赖该版本修复。

## 备份与还原扩展

- 过滤器和范围解析返回按次有效配置；Host 不会修改用户保存的原始配置。
- 指定区域等范围可以用 PluginBackupRuleMergeMode.Replace 替换普通白名单，并在非法参数时返回 Invalid。
- IFolderRewindBackupPreparationProvider 可读取 BackupInvocationOptions；未实现时仍走核心 OnBeforeBackupFolder。
- 详情提供器只返回数据，Host 统一渲染。
- 还原拦截器返回 Continue、Handled 或 Blocked，可在副作用发生前阻止危险操作。
- 配置补全器只返回建议，Host 负责去重、冲突处理和保存。

## KnotLink 子系统

KnotLinkService 通过 Server v3 提供传输，FolderRewind 使用严格的参数化协议 v2：

- KnotLinkCommandParser：检查 cmd= 并解析字段。
- KnotLinkCommandRequest：提供字符串、布尔值和列表访问器。
- KnotLinkKeyValueCodec：执行键校验和 RFC 3986 percent-encoding。
- IFolderRewindParameterizedKnotLinkCommandHandler：在内置命令前尝试插件处理器。
- IFolderRewindKnotLinkCapabilityProvider：把插件命令和信号合并到 GET_CAPABILITIES。

旧的空格命令和旧处理器不再与新接口并存。详见 [KnotLink 命令参考](/docs/plugins/knotlink-commands)。

## 目录与隔离

- 接口位于 FolderRewind/Services/Plugins/，实现由 PluginService 发现和调度。
- KnotLink 协议辅助类型位于 FolderRewind/Services/KnotLink/。
- 插件可携带自己的依赖 DLL；PluginLoadContext 优先从插件目录解析。
- 插件根目录必须包含 manifest.json 和入口程序集，安装包使用 ZIP。

## 相关链接

- [Plugin API 参考](/docs/plugins/developing/plugin-api)
- [KnotLink Command API](/docs/plugins/developing/knotlink-api)
- [插件开发快速上手](/docs/plugins/developing/quick-start)
