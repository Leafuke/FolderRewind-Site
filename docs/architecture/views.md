---
sidebar_position: 7
title: "视图、引导与导航"
description: "了解页面与引导的职责，区分管理、历史、合并和空间预览的导航流程。"
reviewed_baseline: "1.9-api3.9"
---

# 视图、引导与导航

了解页面与引导的职责，区分管理、历史、合并和空间预览的导航流程。

![FolderRewind 1.9.6 的项目与来源入口。](/img/docs/v1-9-6/home-zh-light-1604.webp)

*FolderRewind 1.9.6 的项目与来源入口。 界面版本：1.9.6。*

## 页面职责

首页创建／模板／批量发现；FolderManager 管理来源；BackupTasks 观察任务；History 以普通／高级、来源／Run 查看原生历史；GameDiscovery 提供 Beta 候选审阅；CloudSetup 配置和验证连接；Log 提供诊断；Settings 组织全局工具、插件、模板与数据迁移。

当前 ViewModels 包括 HomePageViewModel、FolderManagerPageViewModel、HistoryPageViewModel、PluginStorePageViewModel、GameDiscoveryPageViewModel 与 CloudSetupViewModel；类名和状态以当前项目文件为准，不引用旧 HistoryViewModel／PluginStoreViewModel 名称。

## 对话框与次级窗口

配置设置／云配置／模板／合并交互由视图与 AppDialog 服务协作；对话框创建、显示和结果读取在 UI 线程。MiniWindow 是稳定来源绑定的独立窗口；RecoveryCenter 处理配置损坏，恢复模式禁止普通配置写入。

## 设置与主题

设置子控件负责外观、核心行为、诊断、插件／KnotLink、预设／模板、数据与运行环境。OpenList 环境控制与连接诊断提供实际工具状态。语义资源适配浅／深／系统主题和高对比度，状态同时提供文字与自动化标签。

## 验收

导航与业务编排分离；测试窄窗口、高 DPI、双语言、键盘、任务取消、恢复诊断和深层通知跳转。源码构建通过不能代替真实布局或游戏退出／重进验证。


## 合并与地图页面

`MergeWorkspacePage` 承载分支选择、文件冲突比较、结果审阅和会话恢复。`SpatialPreviewPage` 调用 Kind 所有者提供的只读空间预览，管理维度、导航、缩放和位置详情；不承担存档编辑。

<span id="对话框" />
<span id="导航流程" />
<span id="特殊窗口" />
<span id="设置页子控件" />
<span id="页面列表" />
