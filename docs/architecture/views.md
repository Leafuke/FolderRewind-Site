---
sidebar_position: 7
title: "视图、引导与导航"
description: "FolderRewind 1.9 系列视图、引导与导航操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.6"
---

# 视图、引导与导航

![设置分区，1.9.2.0／API3.5 中文候选版；完整发布验收待完成](/img/docs/v1-9/settings-candidate.png)

*设置分区，1.9.2.0／API3.5 中文候选版；完整发布验收待完成.*


## 页面职责

首页创建／模板／批量发现；FolderManager管理来源；BackupTasks观察任务；History以普通／高级、来源／Run查看原生历史；GameDiscovery提供Beta候选审阅；CloudSetup配置和验证连接；Log提供诊断；Settings组织全局工具、插件、模板与数据迁移。

当前ViewModels包括HomePageViewModel、FolderManagerPageViewModel、HistoryPageViewModel、PluginStorePageViewModel、GameDiscoveryPageViewModel与CloudSetupViewModel；类名和状态以当前项目文件为准，不引用旧HistoryViewModel／PluginStoreViewModel名称。

## 对话框与次级窗口

配置设置／云配置／模板／合并交互由视图与AppDialog服务协作；对话框创建、显示和结果读取在UI线程。MiniWindow是稳定来源绑定的独立窗口；RecoveryCenter处理配置损坏，恢复模式禁止普通配置写入。

## 设置与主题

设置子控件负责外观、核心行为、诊断、插件／KnotLink、预设／模板、数据与运行环境。OpenList环境控制与连接诊断提供实际工具状态。语义资源适配浅／深／系统主题和高对比度，状态同时提供文字与自动化标签。

## 验收

导航与业务编排分离；测试窄窗口、高DPI、双语言、键盘、任务取消、恢复诊断和深层通知跳转。源码构建通过不能代替真实布局或游戏退出／重进验证。

<span id="页面列表" />
<span id="对话框" />
<span id="设置页子控件" />
<span id="导航流程" />
<span id="特殊窗口" />
