---
sidebar_position: 20
title: "1.9 升级、迁移与恢复"
description: "FolderRewind 1.9 系列1.9 升级、迁移与恢复操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 1.9 升级、迁移与恢复

本页适用于1.8.x到1.9系列。升级涉及配置模式、原生历史和 Plugin System v3；先用独立副本验证，不对正式数据进行试错。

## 升级前

完全退出应用和自动任务，确认安装渠道。备份整个应用数据目录、每个备份目标及所需云副本；记录当前程序／插件版本、加密密码和重要路径。仅复制 config.json 不包含归档，也不移植当前用户 DPAPI 密码材料。

## 配置与插件

Host 升级配置身份、Provider State、typed settings 和 Enabled Intent。旧 flat v2 代码隔离到 legacy quarantine；捆绑 MineRewind v3 可离线迁移对应数据，但其他 v2 代码不执行。重命名 ZIP 无法兼容。检查 Kind 提供器、运行状态和诊断后启用插件。

## 历史一次性迁移

未绑定原生历史的旧配置会读取旧 history.json 和已有归档证据，构建按配置的不可变仓库并绑定格式。迁移不再把旧文件当长期写入权威；新历史使用 packs、索引和本机状态。缺失／不可靠数据可能限制可恢复性，不猜测完整目录状态。

新 Rolling 保留旧包并创建不可变新包。旧 Smart／Overwrite 数值由迁移解释，不手工替换配置枚举。迁移失败先保留原始资料并使用恢复中心，不删除 history、config.json 或 quarantine。

## 验收与回退

逐项检查配置身份／来源范围、插件设置、版本历史、Full／Smart／Rolling、测试还原、自动化及云同步。验证部分捕获只能 Overwrite、Quick Restore 使用活动分支和恢复点可用。完成后再恢复正式任务。

1.9写入的数据不能直接交回1.8；回退使用升级前的独立配置／历史／归档副本，避免旧客户端继续修改新版库。跨渠道或新电脑迁移另见[数据迁移](/docs/guides/data-migration)。1.8语言启动问题仍见[旧版指南](/docs/getting-started/v1-8-upgrade)。


