# 发布验收记录 / Release acceptance

`acceptance.json` is the machine-readable gate. A `pending` result cannot be
promoted to passed because source/unit tests or site compilation succeeded.

## 已观察的候选界面

2026-10-02 使用已有1.9.2.0/API3.5候选可执行文件，独立
`FOLDERREWIND_TEST_DATA_ROOT` 指向网站 artifacts/desktop-candidate。
中文首页、空创建向导、游戏发现Beta、空云连接表单与设置分区已截图。
没有使用生产配置或真实云凭据，没有下载Ludusavi数据库、安装新插件或还原生产来源。
系统文件夹选择器未成为自动化可定位窗口，已取消且未提交草稿。
用户随后用物理Escape停止Computer Use；之后未再发送应用输入。
这5张图明确标注候选版本，不能证明最终发布版全流程。

## 必须填写的八组实机证据

每组填写应用/插件/SDK/游戏组件版本、测试来源、步骤、字节结果、日志、截图、
取消/恢复结果；相关操作只使用隔离数据。

1. Setup新装、旧升级、架构与渠道迁移；校验正式公开EXE/sha256。
2. 两套示例安装默认停用、显式激活、设置、取消、升级、回滚与RequiresRestart。
3. Full/Smart/Rolling新增修改删除、旧归档哈希不变和精确还原。
4. 普通/部分Restore、Quick Restore NoChanges、Checkout保护、文件冲突Merge、
   重启事务恢复和安全恢复点。
5. 指定配置.frhistory导出、重复导入去重、孤立仓库和没有payload时的限制。
6. 两设备云并集、分叉、缺失/损坏副本、依赖准备和只读新目录恢复。
7. 发现账号/根/资源、确认创建、来源范围、再发现保留手工修改和取消。
8. Minecraft负数/小数/512边界/维度/.mcc、全部UUID/显式false/缺失玩家/
   跨26.1拒绝/统计进度、真实游戏加载和重进。

## 自动证据

`tools/ExampleValidation` uses the pinned Host Runtime to statically inspect,
load and activate the independent examples. It tests real candidate declarations,
drafts, ECHO values, Host requests, Disable, incompatible API/capabilities,
wrong settings types, undeclared services and invalid package roots.

The previous local feed established source compatibility only. Current examples
use public SDK 3.6.0. SDK restore, public plugin bytes, Catalog binding and Host
metadata are checked independently by `npm run check:release`.

## 发布与回退

公开发布与实机验收已拆分：正式 tag/日期按实际 Release 记录，公开制品通过
`npm run check:release` 后可生成和提交真实公告。八组场景及最终截图通过独立的
`npm run check:acceptance` 检查；未完成仍为 pending，不由公开发布或构建通过代替。
网站问题回退网站提交，不覆盖已发布产品或移除用户备份。

## 2026-10-03 跟进边界

本轮仅完成文档、公开 SDK 示例与公开制品核验，不恢复 GUI 自动化，不补拍正式版截图，
不操作真实世界或云账户。八组实机场景保持 pending。此前五张候选图作为历史记录保留；
发现页布局已更新，当前教程移除其旧图。
