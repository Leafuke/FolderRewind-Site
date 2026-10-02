---
sidebar_position: 20
title: "v2 到 v3 迁移与故障恢复"
description: "FolderRewind 1.9 系列v2 到 v3 迁移与故障恢复操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# v2 到 v3 迁移与故障恢复

Plugin System v3 是断代接口，不加载旧 v2 插件。一次性用户数据迁移不构成运行时兼容层。先备份配置、插件数据和归档；作者重新实现并编译独立 SDK 插件。

## 职责迁移表

| v2 接口／钩子 | v3 责任 |
|---|---|
| Initialize、GetSettingsDefinitions | ActivateAsync + 静态 typed settings |
| TryDiscoverManagedFolders、ConfigAugmenter | Discovery／ConfigReconciliation 的草稿与修订提案 |
| OnBeforeBackupFolder、BackupPreparationProvider | FilePolicy／BackupScope／BackupConsistency |
| OnAfterBackupFolder 改归档 | ArtifactTransformer 事务；只读观察用 CompletionObserver |
| OnBeforeRestoreFolder、OnAfterRestoreFolder | RestoreCoordinator／RestoreStagingPreparation，Host 写目标 |
| HotkeyProvider | PluginCommandDescriptor |
| ParameterizedKnotLinkCommandHandler、CapabilityProvider | KnotLinkIntegration + 可选 TargetResolver |

IFolderRewindPlugin 名称仍在，但方法契约已改变。移除宿主 DLL／Models 引用、旧字符串设置和路径式状态所有权；声明能力／服务与运行注册一致。

## 用户升级

Host 可利用捆绑 MineRewind v3 做离线旧数据迁移，保留启用意图和类型化状态；旧 flat payload 放进可恢复 legacy quarantine，不执行、不擅自删除。第三方旧插件须由作者提供兼容 v3 包，不能重命名 ZIP 为 frplugin 就迁移。

## 故障处理

配置损坏进入 Recovery Center，先保存诊断和原文件，再选择受控恢复。Safe Mode（--safe-mode）暂时禁用代码执行，不重写 Enabled Intent。操作／卸载／迁移中断让启动恢复日志处理；不要删除整个 config.json、quarantine 或 history。

验证恢复后配置身份、Provider State、插件设置、运行状态和归档可还原性，再恢复自动化。读取失败或 RecoveryRequired 时先修复，不能继续破坏性写入。


