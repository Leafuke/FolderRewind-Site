---
sidebar_position: 2
title: "实战教程：GameRewind v3 插件"
description: "FolderRewind 1.9 系列实战教程：GameRewind v3 插件操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 实战教程：GameRewind v3 插件

GameRewind 是可独立构建的 API 3.5 示例：识别用户提供且包含 `save.dat` 的根目录，提出配置草稿、排除缓存，并通过 Host 发起备份或执行无副作用的 ECHO。

## 完整源码

import CodeBlock from '@theme/CodeBlock';
import GameSource from '!!raw-loader!@site/examples/plugins/GameRewind/Plugin.cs';
import GameManifest from '!!raw-loader!@site/examples/plugins/GameRewind/manifest.json?raw';

<CodeBlock language="csharp" title="GameRewind/Plugin.cs">{GameSource}</CodeBlock>
<CodeBlock language="json" title="GameRewind/manifest.json">{GameManifest}</CodeBlock>

## 发现与配置所有权

只检查用户明确给出的根，返回 ConfigDraft 和 FolderDraft，不写 config.json。Host 分配受管来源身份并按用户创建策略提交。不存在、不可读或无标记的目录不会被强行加入。示例没有递归扫描磁盘。

DiscoveryDefinitionCatalog 给出稳定游戏 DefinitionId、别名及外部 ID，以参与游戏发现和定向预设。它不是额外 capability。实际插件应使用稳定、可对账的候选身份；不要把显示名称作为身份。

## 文件策略与命令

FilePolicy 返回必要排除规则；来源范围和 Host 过滤仍然约束保护边界。备份命令需要明确 configId，并通过 Backups 服务执行，绝不自己调用归档引擎。ECHO 声明自己的命令与参数，不接管 Host BACKUP。

## 热备份与还原扩展的边界

示例没有实现游戏一致性或玩家保留。真实热备份需要 IBackupConsistencyCapability 提供有效租约和稳定来源；直接复制游戏写入中的目录不能证明一致性。真实还原由 IRestoreCoordinatorCapability 协调外部环境、由 Host 执行一次性 mutation。

普通 Restore 的额外保留通过 IRestoreStagingPreparationCapability 返回相对文件提案；不能在还原后写 live path。Checkout 和 Merge 不调用玩家保留。配置修改则由 IConfigReconciliationCapability 提交绑定 revision 的提案，过期 revision 必须重新对账。

## 构建和测试

```powershell
node scripts/pack-plugin.mjs GameRewind
```

建立测试目录并放置 save.dat。安装包、检查声明、启用、执行发现并审阅草稿，再备份与还原测试内容。测试失败和取消时检查诊断及资源释放。首次用于真实游戏前停止所有写入者。

参阅[能力与操作契约](/docs/plugins/developing/capabilities)、[API 参考](/docs/plugins/developing/plugin-api)。

<span id="0-项目初始化" />
<span id="创建项目" />
<span id="编写-manifestjson" />
<span id="创建主类骨架" />
<span id="1-定义配置类型与自动发现" />
<span id="注册配置类型" />
<span id="自动发现存档目录" />
<span id="批量创建配置" />
<span id="2-备份钩子快照与过滤" />
<span id="备份前创建快照" />
<span id="备份后清理快照" />
<span id="过滤不需要的文件" />
<span id="3-还原钩子保留用户数据" />
<span id="4-插件设置" />
<span id="5-快捷键" />
<span id="6-knotlink-参数化命令" />
<span id="7-打包与发布" />
<span id="下一步" />
