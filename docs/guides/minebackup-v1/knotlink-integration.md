---
sidebar_position: 12
title: KnotLink 联动机制
description: MineBackup 与联动模组的握手、事件与命令协同
---

# KnotLink 联动机制

MineBackup 通过 KnotLink 与游戏内联动端通信，常用于热备份/热还原场景。

你可以把它理解成“主程序与游戏进程之间的桥接总线”。

## 关键握手

- 主程序发起 `handshake`
- 联动端返回版本信息
- 主程序检查最低兼容版本

如果握手或版本检查失败，后续热链路通常会降级或直接失败。

## 常见协同事件

- `pre_hot_backup`
- `pre_hot_restore`
- `restore_finished` / `restore_success`
- `rejoin_world`

典型热还原闭环：

1. 主程序发 `pre_hot_restore`
2. 联动端保存并退出世界
3. 主程序执行还原
4. 主程序发 `rejoin_world`
5. 联动端返回重进结果

## 使用边界

- 通信超时会中断流程
- 版本不兼容会降级或拒绝关键链路
- 建议先演练“备份 -> 还原 -> 重进”闭环

## 联动排错建议

- 先验证基础备份/还原在非联动模式下可用
- 再验证握手与版本兼容
- 最后验证热链路完整闭环

不要把“基础功能失败”和“联动失败”混在一起排查，会显著拖慢定位效率。

如果你关心 Minecraft 端命令侧细节，继续阅读 [MineBackup 联动模组详解](../minecraft/minebackup-mod)。
