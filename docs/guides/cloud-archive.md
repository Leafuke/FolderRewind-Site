---
sidebar_position: 4
title: "云存档：连接、历史与副本恢复"
description: "FolderRewind 1.9 系列云存档：连接、历史与副本恢复操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 云存档：连接、历史与副本恢复

![只读云恢复连接向导，1.9.2.0／API3.5 中文候选版，凭据字段为空](/img/docs/v1-9/cloud-candidate.png)

*只读云恢复连接向导，1.9.2.0／API3.5 中文候选版，凭据字段为空.*


## 建立连接

打开云设置流程，按服务选择 WebDAV、OneDrive、S3 或通过 OpenList 桥接的网盘。准备 rclone，显式选择 rclone 配置文件、命名 remote 和 RemoteBasePath；配置文件中的凭据不应分享。OpenList 工具准备不等于已登录网盘或测试连接成功。

OneDrive 在 rclone config 按选项名称进行授权；WebDAV 填服务器／路径／账号；OpenList 先配置存储再用其 WebDAV。不要依赖旧截图中的固定菜单数字。FolderRewind 的工具准备、浏览器授权、连接验证是分开的步骤。

全局连接卡片和配置连接负责选定 executable、working directory、显式 config 路径与 remote。运行连接测试后检查诊断；OpenList 环境控制在设置扩展器中。配置、历史、载荷权限各需满足，能列目录不代表可上传。

## 数据布局

```text
<RemoteBasePath>/_folderrewind/history/<编码 ConfigId>/
├─ repository.json
└─ packs/<前两位>/<PackId>.frpack

<RemoteBasePath>/_folderrewind/replicas/<ReplicaId>/
├─ manifest.json
└─ payload
```

实际副本定位依照 Host 保存的对象键和传输入口，旧迁移载荷可以保留旧远端定位。名称不是同步身份，local-state／index 不作为共享事实上传；不要沿用 ConfigName/FolderName/history.json 的旧结构猜测新版数据。

## 历史同步与载荷

原生历史同步按不可变 Commit Pack 集合并集进行；不覆盖一个共享 history.json，不按时间选最后写入者。相同身份内容冲突、仓库不匹配或非法包会拒绝。并集可产生分支多个尖端，需用户确认合并；同步不会直接切换本机 Workspace。

历史事实同步与备份载荷同步分开。看到版本记录不保证所需字节已下载。上传／下载副本要验证大小／哈希并保留生命周期事实；还原／合并前准备选中 Representation 的完整依赖闭包。

## 云端恢复到新目录

选定版本并预览所需副本、大小和可恢复性，下载可信闭包，选择新的隔离目录。只读恢复不向云写历史／退役副本，不改当前来源或 Workspace；当前入口使用核心支持的表示，插件格式需核对物化支持。

## 自动化与故障

先完成本地备份／还原、连接测试、上传、下载与新目录恢复，再启用备份后自动上传。区分本地成功、云排队、传输失败、历史同步失败、分叉和字节缺失。令牌／密码不要贴入日志；失败后确认阶段再重试，不手工清空云仓库。

连接材料见 [rclone 文档](https://rclone.org/docs/) 与 [OpenList 文档](https://doc.oplist.org.cn/)。产品恢复语义见[历史指南](/docs/guides/history-timeline)。

<span id="一下载-rclone-并添加到-folderrewind-的环境中" />
<span id="二配置-rclone-连接你的云存储服务" />
<span id="三配置-folderrewind-使用某个-rclone-的配置" />
<span id="四云端数据结构" />
<span id="五配置设置页云页逐项说明" />
<span id="1-环境配置区" />
<span id="2-云同步区手动" />
<span id="3-启用备份后云上传自动" />
<span id="4-高级上传配置开启自动上传后可见" />
<span id="预设模板" />
<span id="参数模板与变量" />
<span id="同时同步历史记录" />
<span id="超时重试上次状态" />
<span id="六配置级从云同步此配置对话框" />
<span id="1-分析阶段做什么" />
<span id="2-两种同步范围" />
<span id="3-常见失败原因" />
<span id="七历史记录页里的云功能" />
<span id="1-图标与状态" />
<span id="2-按钮可用条件" />
<span id="3-上传下载的实际行为" />
<span id="4-仅云端副本如何恢复" />
<span id="八与自动备份联动时的建议" />
<span id="九故障排查清单" />
<span id="情况-1历史页云按钮是灰色" />
<span id="情况-2配置同步里可导入数量为-0" />
<span id="情况-3提示-metadata-部分同步" />
<span id="相关链接" />
