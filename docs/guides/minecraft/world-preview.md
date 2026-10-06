---
sidebar_position: 15
title: "只读世界地图预览"
description: "使用 FolderRewind 1.9.6 内置 MineRewind 的只读地图预览，浏览 Java 世界地形、切换维度、定位坐标和查看区块详情。"
reviewed_baseline: "1.9-api3.9"
---

# 只读世界地图预览

FolderRewind 1.9.6 内置的 MineRewind 1.9.8 可以预览 Minecraft Java 世界地形。无需启动游戏，就能查看已生成区块、维度和位置详情。

![FolderRewind 读取真实 Java 世界“26_1极限生存”，显示已生成的地形。](/img/homepage/map-zh-light-1604.webp)

*FolderRewind 读取真实 Java 世界“26_1极限生存”，显示已生成的地形。 界面版本：1.9.6。*

## 打开地图

启用内置 MineRewind，并添加有效的 Minecraft Java 存档来源。在管理页打开该来源的操作菜单，选择地图预览。Bedrock 和普通文件夹不提供这一 Java 地图能力；独立发布的 MineRewind 1.9.5 不含此功能。

## 浏览与定位

- 从工具栏选择维度，拖动地图并缩放，查看不同范围的彩色地形。
- 使用导航目标或坐标定位；坐标输入受当前维度的合法范围约束。
- 打开显示设置调整网格、视图高度或适应范围。
- 选择地图位置，查看提供器返回的区块和世界详情；刷新可重新读取变化后的数据。

预览按可见范围逐步细化，缩小到远景时不保证每块地形都已详细解码。未知或未生成区域不应被当作空白世界数据。

## 与备份和区域选择的关系

地图是当前来源的只读展示，不会生成区块、修改存档，也不替代备份或还原验证。地图里看见的范围不自动成为备份范围；区域保护仍按[选区备份](/docs/guides/minecraft/selected-region-backup)配置。

## 无法显示时

先检查来源是否为 Java 存档、内置插件是否运行，以及存档文件是否可读。维度无已生成数据时可切换其他维度。文件占用、损坏或格式限制请按诊断处理；不要修改 NBT 或删除 region 文件来让预览加载。

插件开发者可阅读 [API 3.9 空间预览契约](/docs/plugins/developing/plugin-api#spatial-preview)。
