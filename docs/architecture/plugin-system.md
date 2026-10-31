---
sidebar_position: 6
title: "Plugin System v3 架构"
description: "追踪插件从静态校验、激活和能力提交到调用、排空与恢复的生命周期，理解地图、合并、制品服务及 Host 的职责。"
reviewed_baseline: "1.10-api3.17"
---

# Plugin System v3 架构

## 安装与激活

公开 SDK 使用 BCL-only Abstractions，API 3.x 共享程序集身份 `3.0.0.0`。manifest 声明 Kind、API、能力、服务、设置、Artifact 和合并策略。

安装阶段检查路径、限额、设置和 PE 元数据。启用后读取激活快照、注册能力，Host 验证并原子提交状态，再将会话设为 Active。

## 路由与所有权

Kind 所有者提供运行领域能力。Discovery 返回草稿，Reconciliation 返回修订提案。Host 管理配置提交、历史、保留、云、加密、完整性和目标修改。

Artifact 转换提交新图节点；物化器写隔离工作区。SpatialPreview、SpatialComparison 和 SpatialScopeSelection 处理只读输入与范围参数。MergeProvider 提供分析和构建，Host 保存计划、决策并执行结果。

## 生命周期与恢复

每次调用持有能力租约并观察操作取消与插件生命周期。停用时先撤销路由、取消并排空，再执行有界 Deactivate。需要重启时保留物理资源并显示 RequiresRestart。

版本化安装保留已知良好载荷和事务日志，用于中断后的恢复。Safe Mode 保留启用选择，暂时停止执行。

插件在当前用户进程权限内运行，AssemblyLoadContext 提供依赖隔离。官方来源由 Catalog 绑定精确制品和声明，正式服务由 manifest 请求与 Host 门控。

全部 19 种能力见[API 参考](/docs/plugins/developing/plugin-api)，包格式与发布见[打包说明](/docs/plugins/developing/packaging)。

<span id="knotlink-子系统" />
<span id="备份与还原扩展" />
<span id="接口地图" />
<span id="生命周期" />
<span id="目录与隔离" />
<span id="相关链接" />

<span id="静态包与运行会话" />
<span id="调度与所有权" />
<span id="信任与取消" />
