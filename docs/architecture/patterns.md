---
sidebar_position: 2
title: "架构模式与事务边界"
description: "了解 MVVM、显式依赖与事务边界，维护可取消操作和可靠的状态提交。"
reviewed_baseline: "1.9-api3.9"
---

# 架构模式与事务边界

了解 MVVM、显式依赖与事务边界，维护可取消操作和可靠的状态提交。

## MVVM 与交互

ViewModels 维护语义状态和可取消异步命令，视图负责 XAML 控件与主题呈现。交互服务在 UI 线程创建对话框、串行显示并返回选择；业务结果不依赖画刷颜色。查询取消过期请求，不覆盖最新选择。

## 依赖与生命周期

ConfigService 等 Host 入口仍有静态适配；HistoryRuntime、插件 session、索引、传输、操作服务使用实例和构造依赖。避免把装载上下文、配置操作门和取消源当无限期全局状态。

## 原子提交与恢复

配置写入串行化快照；History Commit Pack 原子公开一次事务的事实。Index 可重建，Workspace 与 Replica Catalog 是设备状态。备份／还原在配置门和最终 Guard 中验证身份与 revision，提交后故障保留已提交语义。

恢复 journal、staging／quarantine 隔离和幂等补偿处理崩溃；不可把异常 catch 后继续写当成功。UI 传递取消并保留阶段诊断，RecoveryRequired 禁止新的破坏性操作。

## 提案与不可变扩展

发现／配置对账只返回草稿／patch；Host 保存。插件 Artifact 事务提交新节点，materializer 写隔离工作区。读快照、提案、验证、一次提交替代旧有序钩子和直接改宿主模型。

<span id="mvvm-模式" />
<span id="shell-导航模式" />
<span id="序列化策略" />
<span id="部分类组织" />
<span id="配置驱动" />
<span id="静态服务架构" />
