# 文档维护数据

当前内容基准：FolderRewind 1.10.0、内置与独立 MineRewind 1.10.0、Plugin API 3.17、公开 SDK 3.17.0。正式 Host 提交与精确发布标签见 `baseline.json`。

- `baseline.json`：发布版本、独立与内置包哈希、原路由与锚点。
- `pages.json`：中英文页面及事实、截图、验证状态索引。
- `acceptance.json`：公开发布信息与实际桌面场景状态。
- `../static/img/docs/v1-10-0/manifest.json`：本次正式版五组截图及原图哈希。

旧首页和旧截图清单继续记录各自采集时的版本。本轮原始 PNG、脚本与验证日志存入忽略的 `artifacts/refresh-110/`，新增发布文案模板位于 `scripts/templates/`。

`npm run check:all` 验证网站内容，`npm run check:release` 核对公开资产。桌面与真实游戏场景按实际结果维护。
