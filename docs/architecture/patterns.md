---
sidebar_position: 2
title: "架构模式与事务边界"
description: "FolderRewind 1.9 系列架构模式与事务边界操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 架构模式与事务边界

## MVVM与交互

ViewModels维护语义状态和可取消异步命令，视图负责XAML控件与主题呈现。交互服务在UI线程创建对话框、串行显示并返回选择；业务结果不依赖画刷颜色。查询取消过期请求，不覆盖最新选择。

## 依赖与生命周期

ConfigService等Host入口仍有静态适配；HistoryRuntime、插件session、索引、传输、操作服务使用实例和构造依赖。避免把装载上下文、配置操作门和取消源当无限期全局状态。

## 原子提交与恢复

配置写入串行化快照；History Commit Pack原子公开一次事务的事实。Index可重建，Workspace与Replica Catalog是设备状态。备份／还原在配置门和最终Guard中验证身份与revision，提交后故障保留已提交语义。

恢复journal、staging／quarantine隔离和幂等补偿处理崩溃；不可把异常catch后继续写当成功。UI传递取消并保留阶段诊断，RecoveryRequired禁止新的破坏性操作。

## 提案与不可变扩展

发现／配置对账只返回草稿／patch；Host保存。插件Artifact事务提交新节点，materializer写隔离工作区。读快照、提案、验证、一次提交替代旧有序钩子和直接改宿主模型。

<span id="mvvm-模式" />
<span id="静态服务架构" />
<span id="shell-导航模式" />
<span id="配置驱动" />
<span id="部分类组织" />
<span id="序列化策略" />
