---
sidebar_position: 6
title: "Plugin System v3 架构"
description: "追踪插件从静态包校验到激活、能力调度和停用的完整生命周期。"
reviewed_baseline: "1.9-api3.9"
---

# Plugin System v3 架构

追踪插件从静态包校验到激活、能力调度和停用的完整生命周期。

## 静态包与运行会话

SDK3.6.0 保持程序集 3.0.0.0。manifestVersion3 声明 API、Kind、服务、能力、设置和 Artifact 语义。安装器规范路径、限额、PE 元数据和声明，无代码执行；版本化安装保存恢复日志。

显式 Enable→激活快照／能力注册→Host 校验与原子状态提交→Active 可调用。每契约一个实现；Enabled Intent、运行状态和 RequiresRestart 不同。

## 调度与所有权

Kind 所有者决定备份运行能力；DiscoveryProviderId 不决定运行路由。ConfigReconciliation 是修订提案，不写配置。Artifact 变换以 graph revision 为前置条件；还原物化写隔离 Workspace。

RestoreCoordinator 收到配置范围、操作 ID、类型和 once-only continuation；普通暂存准备与 Checkout／Merge 分开。Host 保留预检、Safe Restore 和 Live 写入。恢复必需终态禁止自动重进。

## 信任与取消

独立 AssemblyLoadContext 负责依赖隔离，不是安全沙箱。静态服务声明限制正式 Host 入口，进程仍拥有用户 OS 权限。Catalog 绑定精确制品哈希和来源，manifest 不能自授 Official。

Disable 先撤销路由／取消生命周期／排空租约，Deactivate 有有界宽限期；超时保留物理上下文至重启。中断更新／卸载通过事务日志恢复。Safe Mode 不改 Enabled Intent。

完整 16 种能力见[API 参考](/docs/plugins/developing/plugin-api)，旧接口映射见[迁移](/docs/plugins/developing/migration-v2-v3)。

<span id="knotlink-子系统" />
<span id="备份与还原扩展" />
<span id="接口地图" />
<span id="生命周期" />
<span id="目录与隔离" />
<span id="相关链接" />
