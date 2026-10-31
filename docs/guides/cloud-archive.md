---
sidebar_position: 4
title: "云存档：连接、上传与同步"
description: "使用 WebDAV、OneDrive、S3 或 OpenList 建立云连接，验证目录权限，上传备份版本并同步历史，为异地恢复准备副本。"
reviewed_baseline: "1.10-api3.17"
---

# 云存档：连接、上传与同步

把备份放到另一块磁盘之外，还可以再保留一份云副本。先完成本地备份，再连接云存储、上传一个版本，并试着[恢复到新目录](/docs/guides/cloud-recovery)。

## 1. 准备 rclone 与连接

在项目的云设置中打开“连接云存储 / 完成云副本”，或从设置的云连接管理进入。准备 rclone 的程序路径、配置文件和工作目录，然后选择服务：

| 服务 | 需要准备 |
| --- | --- |
| WebDAV | 服务 URL、用户名、密码和目标目录 |
| OneDrive | 按向导完成账号授权，再选择目录 |
| S3 | 服务端点、区域、桶及访问凭据 |
| 已有 rclone remote | 选择已有配置文件，读取并选择其中的 remote |
| OpenList | 先在 OpenList 中挂载网盘，再按 WebDAV 建立连接 |

云连接可以由多个项目共享，也可以限定给某个项目使用。共享凭据更新后，使用该凭据的项目都会受到影响；重新授权前可先查看关联项目。

## 2. 选择目录并验证

选择 remote 后，浏览或输入云端目录。先读取目录；准备用于上传时，再勾选写入验证。应用会上传约 8 KiB 的专用测试对象，读回核对并清理该对象。

确认账号、目录和访问结果后保存连接，再选择要上传的本地版本。连接保存与首次上传分步完成，便于逐项检查。

## 3. 上传一个版本

选择已有的可恢复版本，确认上传范围。应用上传归档及其必要依赖，并同步对应历史。完成后查看任务结果，再从另一目录测试下载恢复。

版本和归档分别管理：历史记录帮助你找到要恢复的状态，归档及完整依赖提供实际文件。打开[通知中心](/docs/guides/notifications)可以分别检查本地备份、上传和历史同步结果。

## 使用 OpenList

已有本机、NAS 或远程 OpenList 时，直接在其管理网页配置存储，并使用该服务的 WebDAV 地址。连接时填写实际挂载目录，例如网盘在 OpenList 中的子目录。

需要由 FolderRewind 启动本机实例时，在运行环境中指定 OpenList 程序、数据目录和服务地址，并授权在云任务需要时启动。运行前检查端口与实例路径；管理网页负责登录和挂载网盘，FolderRewind 使用 WebDAV 访问数据。

启动后的本机服务会持续运行。需要结束时，在设置中使用“停止本实例”。

## 自动上传与恢复

测试过上传和恢复后，可以启用备份后自动上传。自动任务正常完成或没有变化时保持安静，结果可随时在通知中心查看。

本地归档丢失或换电脑时，使用[从云端恢复](/docs/guides/cloud-recovery)。日常历史页也可按选中版本准备云副本；上传或下载失败时，查看具体阶段和诊断再重试。

## 云端目录结构

```text
<RemoteBasePath>/_folderrewind/history/<编码 ConfigId>/
├─ repository.json
└─ packs/<前两位>/<PackId>.frpack

<RemoteBasePath>/_folderrewind/replicas/<ReplicaId>/
├─ manifest.json
└─ payload
```

历史同步通过合并不可变数据包汇集多个设备的记录。本机活动分支和工作区继续由本机管理；需要采用其他设备的状态时，在历史中选择版本或分支。

更多服务参数见 [rclone 文档](https://rclone.org/docs/)与 [OpenList 文档](https://doc.oplist.org.cn/)。

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

<span id="云存档连接与副本恢复" />
<span id="1-准备依赖工具" />
<span id="2-配置连接" />
<span id="3-上传与恢复" />
<span id="历史与文件的区别" />
<span id="自动化与故障处理" />
