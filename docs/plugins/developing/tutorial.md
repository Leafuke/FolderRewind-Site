---
sidebar_position: 2
title: "实战教程：GameRewind 插件"
description: "通过可独立构建的 GameRewind 示例实现发现草稿、文件过滤和命令，理解配置身份、宿主服务以及一致性和还原的扩展方式。"
reviewed_baseline: "1.10-api3.17"
---

# 实战教程：GameRewind 插件

GameRewind 使用公开 API 3.17，识别用户指定且包含 `save.dat` 的目录，提出配置草稿、排除缓存，并通过 Host 发起备份。它也提供一个用于联动测试的 ECHO 命令。

## 完整源码

import CodeBlock from '@theme/CodeBlock';
import GameSource from '!!raw-loader!@site/examples/plugins/GameRewind/Plugin.cs';
import GameManifest from '!!raw-loader!@site/examples/plugins/GameRewind/manifest.json?raw';

<CodeBlock language="csharp" title="GameRewind/Plugin.cs">{GameSource}</CodeBlock>
<CodeBlock language="json" title="manifest.json">{GameManifest}</CodeBlock>

## 从目录得到配置草稿

发现入口检查 `UserRoots`，返回 `ConfigDraft` 和 `FolderDraft`。Host 在用户确认后分配来源身份并保存项目。附加的 `IDiscoveryDefinitionCatalog` 提供稳定 DefinitionId、别名和外部 ID，用于游戏发现和定向预设。

需要加入机器已知位置时，按 `DiscoveryRequest.IncludeKnownLocations` 决定；用户选择目录扫描时保持指定范围。可用稳定的候选身份支持后续对账。

## 文件策略与命令

FilePolicy 返回必要排除规则，Host 在来源范围内组合项目过滤。备份命令读取明确的 configId，通过 Backups 服务发起操作；ECHO 使用自己的命令与参数声明。

配置发生变化时，可通过 `IConfigReconciliationCapability` 返回绑定修订的提案，由 Host 审阅与提交。

## 加入游戏协调

为写入中的游戏增加热备份时，实现 `IBackupConsistencyCapability`，在租约期间协调落盘并提供稳定来源。为还原增加外部协调时，实现 `IRestoreCoordinatorCapability`，准备游戏环境后调用一次 Host continuation。

玩家等当前数据的保留通过 `IRestoreStagingPreparationCapability` 返回相对文件提案，Host 验证后写入暂存区。分支切换与合并使用各自的目标语义。地图和领域合并扩展见[API 参考](/docs/plugins/developing/plugin-api)。

## 构建和练习

```powershell
node scripts/pack-plugin.mjs GameRewind
```

建立包含 `save.dat` 的测试目录，安装并启用插件，执行发现并审阅草稿。创建备份、修改文件并还原，再尝试失败与取消，检查诊断和资源释放。

更多操作约定见[能力设计](/docs/plugins/developing/capabilities)。

<span id="0-项目初始化" />
<span id="1-定义配置类型与自动发现" />
<span id="2-备份钩子快照与过滤" />
<span id="3-还原钩子保留用户数据" />
<span id="4-插件设置" />
<span id="5-快捷键" />
<span id="6-knotlink-参数化命令" />
<span id="7-打包与发布" />
<span id="下一步" />
<span id="创建主类骨架" />
<span id="创建项目" />
<span id="备份前创建快照" />
<span id="备份后清理快照" />

<span id="批量创建配置" />
<span id="注册配置类型" />
<span id="编写-manifestjson" />
<span id="自动发现存档目录" />
<span id="过滤不需要的文件" />

<span id="实战教程gamerewind-v3-插件" />
<span id="发现与配置所有权" />

<span id="热备份与还原扩展的边界" />
<span id="构建和测试" />
<span id="已知位置与手选范围" />
