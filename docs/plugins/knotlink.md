---
sidebar_position: 3
title: "KnotLink 协议与联动"
description: "通过 KnotLink 连接外部工具，先查询运行时能力，再发送备份与还原请求，使用关联信号查看任务最终结果。"
reviewed_baseline: "1.10-api3.17"
---

# KnotLink 协议与联动

通过 KnotLink 连接外部工具，理解参数化协议、请求接受与任务完成之间的区别。

FolderRewind 使用 KnotLink Server v3 和参数化协议 v2。运行时能力清单采用 manifestVersion 3.0.0、specVersion 1.0，由核心命令与插件声明共同生成。

## 格式与编码

请求为严格 cmd= 开头的键值字段，使用分号分隔。动态值按 RFC3986 percent-encoding；列表逗号分隔且逐项编码。旧空格指令不支持。长任务需 from 和 request_id。

```text
cmd=BACKUP;config_id=demo;folder=World;comment=Before%20upgrade;from=panel;request_id=backup-001
status=ok;from=panel;request_id=backup-001;message=Queued
```

## 先发现再操作

发送 cmd=PING 检查端点，再用 cmd=GET_CAPABILITIES 获取 percent-encoded JSON func_list。按照返回清单验证字段、插件选择器、信号和参数，不凭插件名称猜测功能。

## 生命周期与语义

查询通过 status=ok 返回结果，长任务通过它确认请求已接受，再用 request_id 关联最终信号。远程 Restore 默认 Clean，部分捕获使用 Overwrite；省略 file 时解析活动分支的快速还原目标。

## 插件联动

API 3.17 integration 声明命令／信号，目标解析器只确定稳定目标并复用 Host 操作。MineRewind 为 7 个 folder 命令提供 current_save 选择器。当前世界需要活动实例且目标无歧义；先核对运行时清单。

阅读[命令参考](/docs/plugins/knotlink-commands)、[开发 API](/docs/plugins/developing/knotlink-api)和[Minecraft 联动](/docs/guides/minecraft/knotlink-mod)。

<span id="两个版本号不要混淆" />
<span id="先发现能力再发送命令" />
<span id="协议格式" />
<span id="安全建议" />
<span id="插件接入" />
<span id="生命周期信号" />
<span id="相关链接" />
