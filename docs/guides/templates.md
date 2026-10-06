---
sidebar_position: 3
title: "模板与 Backup Preset"
description: "将已验证的备份策略保存为模板，结合发现结果创建项目，并检查插件和环境依赖。"
reviewed_baseline: "1.9-api3.9"
---

# 模板与 Backup Preset

将已验证的备份策略保存为模板，结合发现结果创建项目，并检查插件和环境依赖。

Backup Preset 是可复用备份策略，不是安装游戏证据，也不是已保存的配置。1.9 使用 Backup Preset V2，并保留旧版模板导入路径；不要把 1.8 Envelope 限制套到所有新预设。

## 保存与创建

在成熟配置的设置中保存为模板，填写名称、作者、说明并核对压缩、范围、过滤、自动化等策略。导入后检查路径推断与 Kind；通过首页模板创建或游戏发现结合预设生成草稿，由 Host 按确认策略保存。

## 发现定向

V2 可指向 provider 的 DefinitionId，选择相应发现集合。Definition 与 Backup Set 不同；预设只提供策略，不重新决定安装、发现身份或运行所有者。没有 DefinitionCatalog 的旧 API3.0 discovery 仍可发现，但不能参加定向定义流程。

## 插件依赖与维护

缺失／停用／不兼容插件先阅读 Kind／服务诊断，显式确认创建行为；不假定静默回退 Default 仍保留专用保护。预览规则后再批量创建，升级后复核 SourceScope、模式和保留规则。

设置中的模板管理可查看、编辑、复制、删除和预览路径规则。公开分享前删除个人路径、凭据及不可移植状态，见[分享指南](/docs/guides/template-sharing)。


## Minecraft 增强体验预设

1.9.6 的预设先检查并复用兼容 KnotLink Service；需要安装时，在确认后下载、校验并启动安装程序，再检查服务就绪与连接。安装成功、服务就绪和实际游戏联动是不同步骤。保留步骤诊断，修复失败依赖后再继续。

<span id="为稳定配置创建模板基线" />
<span id="从模板创建配置" />
<span id="先模板化再自动化" />
<span id="升级后重新检查模板" />
<span id="如何把当前配置保存为模板" />
<span id="推荐做法" />
<span id="模板与插件的关系" />
<span id="模板适合什么场景" />
<span id="相关链接" />
<span id="管理本地模板" />
<span id="路径规则是怎么发挥作用的" />
