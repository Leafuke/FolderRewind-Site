---
sidebar_position: 99
title: "常见问题"
description: "FolderRewind 1.9 系列常见问题操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 常见问题

## 当前文档适用哪个版本？

适用 FolderRewind 1.9.3、内置 MineRewind 1.9.5 与 Plugin API 3.6／SDK 3.6.0。程序集身份保持 3.0.0.0。MineBackup 独立教程适用其自身基线。

## 应下载 MSI 或 MSIX 吗？

1.9 GitHub公开Setup EXE与校验文件，支持x64／ARM64；Store由商店管理。旧历史包中的MSI／7z仅适用对应旧版本。

## 为什么没有覆写备份？

旧Overwrite备份已迁移为Rolling，创建不可变新包，原归档不被更新。Overwrite还原仍是覆盖文件的模式，与备份模式不同。

## 快速还原为什么没回到上一条？

Quick Restore恢复活动分支唯一尖端的来源状态；已匹配时NoChanges，不按时间回退。要更早版本，明确在历史选择目标；分叉先处理。

## 导出历史为什么没有存档？

.frhistory仅包含按配置的Commit Pack事实，不带载荷／本机Workspace。移动设备还需配置、归档或可信云副本，以及加密恢复材料。

## 插件已经启用为何不能使用？

Enabled Intent不是Active；检查API、架构、设置、声明与运行诊断。v2插件不加载。Safe Mode暂不执行插件但保留意图；RequiresRestart按提示处理。

## 云记录存在但不能还原？

还原需可用表示、全部依赖和有效副本；历史同步与载荷下载不同。先准备闭包并校验哈希，不盲目清理缺失逻辑版本。

## 区域备份可以清空世界吗？

部分捕获强制Overwrite，包外内容不回到同一时间；区域输入是方块坐标，所选维度全部相关.mcc可能纳入。

## 玩家保留覆盖哪些人？

普通Restore覆盖全部UUID的选定NBT字段；缺失玩家保留当前完整NBT，统计／进度仍回档。显式false覆盖本地默认，Checkout／Merge不保留，跨26.1布局保留拒绝。

## 出现恢复必需状态怎么办？

保留日志和原始资料，使用恢复中心／受控恢复；CommittedRecoveryRequired说明提交已经发生，不重复破坏性操作。不要删除config.json、packs或事务目录。

<span id="安装相关" />
<span id="folderrewind-支持哪些操作系统" />
<span id="microsoft-storemsi-和-msix-有什么区别" />
<span id="从旧版本升级要注意什么" />
<span id="安装后无法启动怎么办" />
<span id="备份相关" />
<span id="备份文件存放在哪里" />
<span id="备份会占用太多磁盘空间吗" />
<span id="支持备份正在运行的游戏存档吗" />
<span id="备份过程中可以继续使用电脑吗" />
<span id="支持把备份同步到云端吗" />
<span id="为什么自动备份突然停止了" />
<span id="还原相关" />
<span id="还原操作会覆盖当前文件吗" />
<span id="可以只还原部分文件吗" />
<span id="为什么点击恢复后提示输入密码" />
<span id="为什么历史里有记录但查看找不到备份文件" />
<span id="为什么删除历史记录时会比较慢" />
<span id="数据迁移相关" />
<span id="配置和历史可以迁移到新电脑吗" />
<span id="导入历史时合并和替换有什么区别" />
<span id="加密配置跨设备迁移要注意什么" />
<span id="插件相关" />
<span id="如何安装插件" />
<span id="minerewind-插件是免费的吗" />
<span id="如何开发自己的插件" />
<span id="反馈与社区" />
<span id="如何报告-bug-或提交功能建议" />
<span id="有中文社区吗" />
