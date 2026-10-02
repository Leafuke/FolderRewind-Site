---
sidebar_position: 6
title: "Plugin System v3 架构"
description: "FolderRewind 1.9 系列Plugin System v3 架构操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# Plugin System v3 架构

## 静态包与运行会话

SDK3.5.0保持程序集3.0.0.0。manifestVersion3声明API、Kind、服务、能力、设置和Artifact语义。安装器规范路径、限额、PE元数据和声明，无代码执行；版本化安装保存恢复日志。

显式Enable→激活快照／能力注册→Host校验与原子状态提交→Active可调用。每契约一个实现；Enabled Intent、运行状态和RequiresRestart不同。

## 调度与所有权

Kind所有者决定备份运行能力；DiscoveryProviderId不决定运行路由。ConfigReconciliation是修订提案，不写配置。Artifact变换以graph revision为前置条件；还原物化写隔离Workspace。

RestoreCoordinator收到配置范围、操作ID、类型和once-only continuation；普通暂存准备与Checkout／Merge分开。Host保留预检、Safe Restore和Live写入。恢复必需终态禁止自动重进。

## 信任与取消

独立AssemblyLoadContext负责依赖隔离，不是安全沙箱。静态服务声明限制正式Host入口，进程仍拥有用户OS权限。Catalog绑定精确制品哈希和来源，manifest不能自授Official。

Disable先撤销路由／取消生命周期／排空租约，Deactivate有有界宽限期；超时保留物理上下文至重启。中断更新／卸载通过事务日志恢复。Safe Mode不改Enabled Intent。

完整15种能力见[API参考](/docs/plugins/developing/plugin-api)，旧接口映射见[迁移](/docs/plugins/developing/migration-v2-v3)。

<span id="接口地图" />
<span id="生命周期" />
<span id="备份与还原扩展" />
<span id="knotlink-子系统" />
<span id="目录与隔离" />
<span id="相关链接" />
