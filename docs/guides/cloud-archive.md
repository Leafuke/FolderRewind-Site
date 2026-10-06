---
sidebar_position: 4
title: "云存档：连接与副本恢复"
description: "通过 FolderRewind 云配置向导准备 rclone 与 OpenList，建立连接、上传备份、同步历史，并下载完整依赖到新目录验证恢复。"
reviewed_baseline: "1.9-api3.9"
---

# 云存档：连接与副本恢复

云副本让备份多一个存放位置。先验证本地备份与还原，再建立连接、上传一个版本并测试下载恢复。

![云连接表单使用示例地址，密码为空，尚未验证或保存连接。](/img/docs/v1-9-6/cloud-zh-light-1604.webp)

*云连接表单使用示例地址，密码为空，尚未验证或保存连接。 界面版本：1.9.6。*

## 1. 准备依赖工具

从项目的后续设置打开云配置向导。1.9.6 优先复用已验证可用的 rclone、OpenList；需要下载时核对 SHA-256，某个来源失败后会尝试后续来源。按步骤查看依赖状态和失败原因。

工具安装、账号授权和连接测试是三个步骤。OpenList 已安装不等于已登录网盘；准备工具之后仍需配置对应存储。

## 2. 配置连接

按服务选择 WebDAV、OneDrive、S3 或 OpenList 桥接。明确 rclone 可执行文件、工作目录、配置文件、remote 名称和 `RemoteBasePath`。

OneDrive 按 `rclone config` 中的选项名称授权；WebDAV 配置服务器、路径和账号；OpenList 先配置存储，再使用 WebDAV。不同版本的菜单数字可能变化。凭据保存在配置文件中，不应分享截图或完整日志。

运行连接测试，确认目录访问与上传权限。能列出目录并不证明有写入权限。

## 3. 上传与恢复

上传一个已验证的备份，并分别检查归档传输和历史同步结果。恢复前选择版本，准备该版本及全部依赖，校验大小和哈希，再恢复到新的测试目录。

只读云恢复不向远端写入历史或退役副本，也不改当前来源和工作区。当前入口支持的表示格式以界面为准，插件格式还需对应物化能力。

## 历史与文件的区别

历史同步合并不可变数据包，不覆盖共享 `history.json`。两台设备的操作可能产生分叉，需审阅分支；同步本身不会切换本机工作区。列表已有记录，也可能尚未下载实际归档。

```text
<RemoteBasePath>/_folderrewind/history/<编码 ConfigId>/
├─ repository.json
└─ packs/<前两位>/<PackId>.frpack

<RemoteBasePath>/_folderrewind/replicas/<ReplicaId>/
├─ manifest.json
└─ payload
```

副本定位以保存的对象键为准。本机索引和工作区状态不作为共享事实上传；旧归档可能继续使用旧远端定位。

## 自动化与故障处理

确认上传、下载和新目录恢复后，再启用备份后自动上传。区分本地备份成功、传输失败、历史同步失败、分叉和依赖缺失；取消后检查完成阶段，再决定是否重试。

旧云配置不会自动迁入 1.9。保留原远端和 Smart 依赖，重新建立连接。更多连接参数见 [rclone](https://rclone.org/docs/) 与 [OpenList](https://doc.oplist.org.cn/) 文档。

<span id="1-分析阶段做什么" />
<span id="1-图标与状态" />
<span id="1-环境配置区" />
<span id="2-两种同步范围" />
<span id="2-云同步区手动" />
<span id="2-按钮可用条件" />
<span id="3-上传下载的实际行为" />
<span id="3-启用备份后云上传自动" />
<span id="3-常见失败原因" />
<span id="4-仅云端副本如何恢复" />
<span id="4-高级上传配置开启自动上传后可见" />
<span id="一下载-rclone-并添加到-folderrewind-的环境中" />
<span id="七历史记录页里的云功能" />
<span id="三配置-folderrewind-使用某个-rclone-的配置" />
<span id="九故障排查清单" />
<span id="二配置-rclone-连接你的云存储服务" />
<span id="五配置设置页云页逐项说明" />
<span id="八与自动备份联动时的建议" />
<span id="六配置级从云同步此配置对话框" />
<span id="参数模板与变量" />
<span id="同时同步历史记录" />
<span id="四云端数据结构" />
<span id="情况-1历史页云按钮是灰色" />
<span id="情况-2配置同步里可导入数量为-0" />
<span id="情况-3提示-metadata-部分同步" />
<span id="相关链接" />
<span id="超时重试上次状态" />
<span id="预设模板" />
