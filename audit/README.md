# 文档与截图核验 / Documentation acceptance

当前基线（2026-10-06）：FolderRewind **1.9.6**、内置 MineRewind **1.9.8**、宿主 API **3.9**。独立公开 MineRewind **1.9.5 / API 3.6**；公开 NuGet SDK 与可恢复示例 **3.6.0**。MineBackup 历史教程保留独立产品 **1.16.2** 基线。

正式宿主提交：`23c194710527d56f4d9d88e708df4b0d0cfe2ba6`。各版本分别核验。

- [本轮报告](./site-refresh-1.9.6.md)：改进、验证、证据与未完成项。
- [baseline.json](./baseline.json)：版本组合与原路由、锚点。
- [pages.json](./pages.json)：87 对双语文档的事实、语言、截图和验收状态。
- [acceptance.json](./acceptance.json)：当前和历史证据分别保存。
- [首页清单](../static/img/homepage/manifest.json)、[文档清单](../static/img/docs/v1-9-6/manifest.json)：版本、语言、主题、尺寸、原始来源与 SHA-256。

`source-checked` 表示按源码核对，`preserve-product-baseline` 表示保留历史产品基线；均不表示全部实机操作通过。`pending` 保留真实状态。旧 FINAL_VERIFICATION.md 与 previous 字段为历史记录，应结合日期阅读。

公开发布检查、网站检查、浏览器检查与实机验收分别记录。网站构建不能替代游戏加载、两设备云恢复、安装渠道迁移或增量清理。本轮未推送、未部署，未创建自动化。
