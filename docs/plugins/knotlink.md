---
sidebar_position: 3
title: "KnotLink 协议与联动"
description: "FolderRewind 1.9 系列KnotLink 协议与联动操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# KnotLink 协议与联动

FolderRewind 1.9 系列继续使用 KnotLink Server v3 和参数化协议 v2。当前能力清单 manifestVersion=3.0.0、specVersion=1.0；Plugin API 为3.6。更新能力清单不改变 wire 协议版本。

## 格式与编码

请求为严格 cmd= 开头的键值字段，使用分号分隔。动态值按 RFC3986 percent-encoding；列表逗号分隔且逐项编码。旧空格指令不支持。长任务需 from 和 request_id。

```text
cmd=BACKUP;config_id=demo;folder=World;comment=Before%20upgrade;from=panel;request_id=backup-001
status=ok;from=panel;request_id=backup-001;message=Queued
```

## 先发现再操作

发送 cmd=PING 检查端点，再用 cmd=GET_CAPABILITIES 获取 percent-encoded JSON func_list。按照返回清单验证字段、插件选择器、信号和参数，不凭插件名称猜测功能。

## 生命周期与语义

status=ok 表示查询完成或请求已接受，不一定是备份已经完成。用 request_id 关联后续执行信号，避免重复触发破坏性恢复。远程 Restore 默认 Clean；部分捕获强制 Overwrite。file 省略时为活动分支 Quick Restore，不是上一时间点。

## 插件联动

API 3.6 integration 声明命令／信号，目标解析器只确定稳定目标并复用 Host 操作。MineRewind 为6个 folder 命令提供 current_save 选择器。当前世界需要活动实例且目标无歧义；先核对运行时清单。

阅读[命令参考](/docs/plugins/knotlink-commands)、[开发 API](/docs/plugins/developing/knotlink-api)和[Minecraft 联动](/docs/guides/minecraft/knotlink-mod)。

<span id="两个版本号不要混淆" />
<span id="协议格式" />
<span id="先发现能力再发送命令" />
<span id="生命周期信号" />
<span id="插件接入" />
<span id="安全建议" />
<span id="相关链接" />
