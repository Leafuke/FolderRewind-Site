---
sidebar_position: 2
title: "首次备份"
description: "添加测试文件夹，创建 FolderRewind 备份项目并选择独立备份位置，保存第一个完整版本，再从历史与任务结果中检查。"
reviewed_baseline: "1.10-api3.17"
---

# 首次备份

先用几个测试文件走完流程。第一次备份完成后，你会得到一个可以从历史中找回的完整版本。

## 1. 准备文件夹与备份位置

创建测试文件夹，例如 `D:\Demo\Documents`，放入两三个文档。另选 `D:\Demo\Backups` 作为备份位置，让来源与备份分别存放，并留出归档和临时文件的空间。

## 2. 创建项目

从“新建备份项目”进入，填写名称，选择普通文件夹类型，添加来源和备份位置。Minecraft 项目可从[自动发现存档](/docs/guides/minecraft/quick-start)进入。

![创建前检查项目名称、来源与备份位置。](/img/docs/v1-9-6/creation-review-zh-light-1604.webp)

也可以结合模板或游戏发现创建项目。逐项核对实际目录与包含范围，再确认摘要。一个项目可以包含多个来源，每个来源分别保留版本。

## 3. 保存第一个版本

在备份策略中选择 **Full**，检查过滤、压缩和加密选项后保存。首次练习可以采用完整来源范围。

执行备份并填写“初始版本”等备注。等待任务结束，从任务页或[通知中心](/docs/guides/notifications)查看每个来源的结果。

## 4. 找到历史并练习还原

打开历史，选择项目和来源，找到“初始版本”，查看时间、范围与可还原状态。然后修改一个文件、添加一个文件，按[首次还原](/docs/getting-started/first-restore)找回原来的内容。

任务失败时，打开日志检查来源路径、备份位置、压缩工具和密码。完成练习后，再选择[日常备份模式](/docs/guides/backup-modes)，设置[自动化](/docs/guides/automation)或[云副本](/docs/guides/cloud-archive)。

<span id="1-新建配置" />
<span id="2-添加要备份的文件夹" />
<span id="3-执行备份" />
<span id="下一步" />
<span id="开始前" />
<span id="方案-a查看历史记录" />
<span id="方案-b运行核心功能自动校验" />
<span id="模板相关的下一步" />
<span id="路线一手动创建配置" />
<span id="路线二从模板创建配置" />
<span id="验证备份结果" />

<span id="1-准备文件夹和备份位置" />
<span id="2-创建备份项目" />

<span id="4-检查结果" />
