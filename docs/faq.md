---
sidebar_position: 99
title: "常见问题"
description: "解答 FolderRewind 1.9.6 的安装、保留数量、快速还原、增量删除、迁移、插件和地图预览问题，并提供对应操作指南。"
reviewed_baseline: "1.9-api3.9"
---

# 常见问题

## 当前文档适用哪个版本？

当前产品指南按 FolderRewind 1.9.6 核对：内置 MineRewind 1.9.8，宿主 API 3.9。独立公开插件是 1.9.5，公开开发示例使用 SDK 3.6.0。MineBackup 教程和旧发布文章保留自己的版本背景。

## 应该下载哪个安装包？

优先使用 Microsoft Store；GitHub 提供 Setup EXE 和校验文件。Intel/AMD 电脑选择 x64，Windows on ARM 选择 ARM64。当前 GitHub 不再独立提供 MSI、MSIX 或侧载压缩包，详见[安装指南](/docs/getting-started/installation)。

## 为什么没有覆写备份？

旧 Overwrite 备份已迁移为 Rolling，创建新归档并保留旧版本。还原页面的 Overwrite 仍表示覆盖还原，见[模式说明](/docs/guides/backup-modes)。

## 保留数量设为 N，为什么还有更多版本？

数量按每个来源最近 N 个可恢复版本计算，受保护版本额外保留；0 表示无限。自动清理需要能净释放空间，增量重建也可能需要临时空间。查看手动清理报告判断原因。

## 快速还原为什么没回到上一条？

它优先恢复活动分支的唯一尖端；没有活动分支时可选最近可恢复旧备份。要找回更早状态，请在历史中明确选择版本。

## 删除旧版本会影响后续 Smart 备份吗？

应用内删除提供影响预览，并可重建依赖以保留后续恢复能力。直接删除压缩包可能断链；通过[历史页](/docs/guides/history-timeline)操作并检查结果。

## 导出历史为什么没有归档？

`.frhistory` 包含历史事实，不携带实际备份文件或本机工作区。换电脑还需迁移配置、归档或可信云副本，以及加密恢复材料，见[数据迁移](/docs/guides/data-migration)。

## 插件已启用，为什么功能不可用？

启用意图与实际运行状态不同。检查 API、架构、设置和诊断；Safe Mode 会暂时停用执行，`RequiresRestart` 需按提示重启。旧 v2 插件不能直接加载。

## 为什么找不到地图预览？

需要 FolderRewind 1.9.6 的内置 MineRewind 1.9.8，以及有效 Java 存档来源。Bedrock、普通目录和独立公开插件 1.9.5 不提供该能力，见[地图预览](/docs/guides/minecraft/world-preview)。

## 云端有历史记录，为什么不能还原？

记录和归档分别同步。先准备选中版本及全部依赖，检查传输与校验结果；不要因本地文件缺失就清除记录。

## 区域备份和玩家保留有什么限制？

区域备份按方块坐标选择，使用 Overwrite 还原，未捕获区域不会回到同一时间。普通还原可保留全部 UUID 的选定玩家 NBT 字段，统计与进度仍可能回档；Checkout 和 Merge 不应用玩家保留，跨 26.1 布局保留会拒绝。

## 提示必须恢复时怎么办？

保存诊断和原始文件，使用应用的受控恢复流程。`CommittedRecoveryRequired` 表示提交已经发生，不要重复执行破坏性操作或删除配置、历史包及事务目录。

<span id="folderrewind-支持哪些操作系统" />
<span id="microsoft-storemsi-和-msix-有什么区别" />
<span id="minerewind-插件是免费的吗" />
<span id="为什么删除历史记录时会比较慢" />
<span id="为什么历史里有记录但查看找不到备份文件" />
<span id="为什么点击恢复后提示输入密码" />
<span id="为什么自动备份突然停止了" />
<span id="从旧版本升级要注意什么" />
<span id="加密配置跨设备迁移要注意什么" />
<span id="反馈与社区" />
<span id="可以只还原部分文件吗" />
<span id="备份会占用太多磁盘空间吗" />
<span id="备份文件存放在哪里" />
<span id="备份相关" />
<span id="备份过程中可以继续使用电脑吗" />
<span id="如何安装插件" />
<span id="如何开发自己的插件" />
<span id="如何报告-bug-或提交功能建议" />
<span id="安装后无法启动怎么办" />
<span id="安装相关" />
<span id="导入历史时合并和替换有什么区别" />
<span id="插件相关" />
<span id="支持备份正在运行的游戏存档吗" />
<span id="支持把备份同步到云端吗" />
<span id="数据迁移相关" />
<span id="有中文社区吗" />
<span id="还原操作会覆盖当前文件吗" />
<span id="还原相关" />
<span id="配置和历史可以迁移到新电脑吗" />
