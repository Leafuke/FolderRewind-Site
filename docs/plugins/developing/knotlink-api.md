---
sidebar_position: 5
title: "KnotLink 集成与目标解析 API"
description: "FolderRewind 1.9 系列KnotLink 集成与目标解析 API操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# KnotLink 集成与目标解析 API

API 3.6 使用 IKnotLinkIntegrationCapability，提供 Commands、Signals 和 ExecuteAsync。KnotLink 参数化协议仍为 v2，Server 为 v3；它们与 Plugin API 3.6、funcList manifestVersion 3.0.0、specVersion 1.0 是不同版本轴。

## 自定义命令

KnotLinkCommandDescriptor 描述 Command、FunctionName、Arguments、Returns 和 RequiredArguments。KnotLinkArgumentDescriptor 提供输入、默认值与可选值；KnotLinkSignalDescriptor 描述信号字段。元数据须与实际处理一致，Host 统一生成运行时能力清单。

GameRewind 的 EXAMPLE_ECHO 返回 PluginCommandResult 的 data 值，Host 负责 v2 响应编码。不要自己重复拆解 RawPayload 或接受旧空格指令。

## 语义选择器

IKnotLinkTargetResolver 是 integration 的附加接口，返回稳定 ConfigId／FolderId 或诊断。它不单独注册 capability。选择器确定目标后，Host 执行同一个核心命令及参数校验；不能再维护第二套备份／还原实现。

MineRewind 用 RequiredArguments 的 current_save=true 匹配6个变体：BACKUP、LIST_BACKUPS、RESTORE、AUTO_BACKUP、STOP_AUTO_BACKUP、MARK_IMPORTANT。发现名称唯一，wire cmd 保持原值，操作参数继承 KnotLinkCoreCommands。

## 服务与安全

发送事件需声明 KnotLink 服务。备份／还原请求各自声明服务；不是有 KnotLink 就获得所有 Host 权限。远程显式玩家保留 false 必须保留，不能折叠为缺省。旧服务不支持新的显式还原选项时返回 Blocked。

首次联调先查询 GET_CAPABILITIES。status=ok 可表示长任务已接受，最终完成由同一 request_id 的信号判断。命令、参数和信号以运行时能力清单为准。

<span id="参数化命令处理器" />
<span id="knotlinkcommandrequest" />
<span id="处理结果" />
<span id="最小处理器示例" />
<span id="声明运行时能力" />
<span id="minerewind-的-v2-扩展方式" />
<span id="设计检查" />
<span id="相关链接" />
