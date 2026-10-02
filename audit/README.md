# 1.9 文档核验 / Documentation acceptance

源基线与旧锚点见 baseline.json；全部页面、双语言镜像、图片和状态见 pages.json。

- `source-checked`：已按源码修正；不代表实机验收通过。
- `preserve-product-baseline`：MineBackup 独立产品教程，保留原内容并检查跨产品链接。
- `pending`：尚未完成。
- 所有产品操作的实机验收、正式截图、公开 SDK/插件/主程序发布和部署均独立记录，不以网站构建代替。

2026-10-02 公开源：NuGet 仅列出 SDK 3.0.0；主程序与插件 latest 均为 v1.8.2。不合入 main、不部署、不虚构正式发布公告。安装器工作区中原有修改不属于本任务。

Release gates: public SDK restore, immutable plugin + catalog verification, official Host assets, isolated desktop/game acceptance, bilingual site validation.

最终准备阶段检查结果见 [FINAL_VERIFICATION.md](./FINAL_VERIFICATION.md)。自动检查通过与正式发布/实机验收分别记录，不将 pending 提升为 passed。
