# 1.9 教程更新交付核验（2026-10-02）

网站分支：`codex/docs-1.9-refresh`。本文记录准备阶段的实际结果，不表示正式发布验收完成。

## 已完成内容与检查

- 中英文各 86 篇正式文档、13 篇历史发布文章；独立 MineBackup 原始文件哈希保持一致。
- 覆盖 API 3.5 的 15 种能力、两套独立 SDK 示例、历史/分支/云/发现/迁移/Minecraft 与架构更新。
- `npm ci` 成功；随后 `npm run check:all` 全部通过：双语言完整性、TypeScript、源码契约、图片、SEO、双语言构建、产物 SEO、原路由及锚点。
- 构建产物核验 206 个页面；保留 158 个原有双语言文档路由及其记录的锚点。
- `.github/workflows/ci.yml` 使用 `js-yaml` 解析通过；发布检查与公告脚本通过 `node --check`。
- 两套示例使用隔离缓存中的本地 SDK 3.5.0 构建、打包并通过 Runtime 验证。8 组结果见本地 `artifacts/examples/validation-results.json`；包结构、设置类型、声明匹配、启停、发现及 Host 请求均有真实验证。
- 宿主仓库 SDK README 已单独提交 `3d3897c`；安装器工作区原有修改未纳入本任务。

## 相关源码测试

TRX 位于宿主本地 `artifacts/docs-refresh/verification/`，全部失败数为 0。

| 测试范围 | 通过数 | 证据 |
|---|---:|---|
| Plugin API | 15 | `api.trx` |
| Plugin Runtime（包、静态验证、纵向流程、服务、运行管理） | 54 | `runtime.trx` |
| Host（Rolling、白名单、模式、历史传输、Quick Restore、云备份） | 18 | `host.trx` |
| Minecraft（区域范围与玩家保留） | 26 | `minecraft.trx` |
| 合计 | 113 | 不替代实机/游戏加载验收 |

## 发布检查与尚未完成的内容

`npm run check:release` 与 `npm run prepare:release` 均按预期返回非零：

- NuGet.org 未列出 SDK 3.5.0；尚不能证明从公开源的无缓存恢复。
- 正式 Host tag/发布时间尚未冻结，MineRewind v1.9.3 尚未公开。
- 官方 Catalog 不可用，正式制品绑定验收尚未完成；本地 proposal 不能替代公开目录。
- 八组隔离实机验收均为 pending，详见 `MANUAL_ACCEPTANCE.md`。
- 仅有明确标注 1.9.2.0 候选版的 5 张中文界面截图，最终版完整截图仍待补齐。

用户用物理 Escape 停止 Computer Use 后，本轮只进行了文件和命令行工作，未恢复 GUI 自动化。没有合入 main、部署网站、发布 SDK/插件/目录或生成虚构的正式 1.9 公告。

发布门禁还会核对正式 Host 发布时间、四个规定附件、版本匹配，并下载 x64/ARM64 EXE 与校验文件验证 SHA-256。公开附件尚未出现，因此该真实下载路径尚未完成验收；当前门禁拒绝结果不能充当附件验证成功的证据。

完成公开发布、最终截图和八组实机证据后，填写 `acceptance.json`，重新执行公开源恢复、示例验证与 `npm run check:all`。再运行 `npm run prepare:release` 从实际 GitHub 元数据生成双语言公告，检查并提交后方可合入和上线。

## 1.9 正式版跟进核验（2026-10-03）

本节更新当前状态；上文保留 2026-10-02 准备阶段的历史事实。本轮按用户要求直接在
网站 main 分块本地提交，不推送、不部署，不恢复 GUI 自动化。

- 当前源码基线：Host `50291a46b0b4b52217cf9d6ddc533177808ce11e`，应用 1.9.3.0，
  MineRewind 1.9.5，API 3.6／SDK 3.6.0，程序集身份 3.0.0.0。
- 公开 Host tag 为 v1.9.3，published_at 为 2026-10-03T09:19:17Z（北京时间 17:19:17）；
  双语言公告日期据此为 2026-10-03。Store 发布与 GitHub 不保证同步。
- `npm run check:all` 全部通过：16 项门禁测试、双语言完整性、TypeScript、源码契约、
  图片、SEO、双语言构建、产物 SEO、原路由及锚点。各语言 86 篇文档和 14 篇公告，
  208 个构建页面，158 条原有双语言文档路由及记录的锚点保留。
- 两套独立示例使用新缓存从公开 NuGet.org 恢复 SDK 3.6.0，构建均为 0 警告、0 错误，
  打包及固定源码 Runtime 的 8 组验证通过。证据在 artifacts/examples/validation-results.json。
- `npm run check:release` 通过真实下载核验：SDK 空缓存恢复、正式 Host tag/日期、
  四个 Setup／校验附件、两架构 EXE 哈希、公开插件字节及 stable Catalog 绑定。
  固定源码插件包清单与 Catalog 的身份、API、架构、服务及制品声明逐项一致，
  不携带 Abstractions DLL。
- `.github/workflows/ci.yml` 解析和公告准备脚本语法检查通过。CI 示例改用公开 SDK，
  Runtime QA 继续读取固定 Host ref；没有执行远程 CI。

| 公开制品 | SHA-256 |
|---|---|
| Setup x64 | e4ba61f81157d098c61bdb2aa2423576d5de5a6e51f72480e4f200823996585f |
| Setup ARM64 | 93b92026d101a6e47340c0f9198aac5908ca270aff86f3d27f4be17d707258e9 |
| MineRewind 1.9.5 | 3b571fd7f09d1b88375832a4c072e979d911a1f59400c144144dc924c7a5e1d9 |

公开发布检查和实机检查已拆分。`npm run check:acceptance` 按预期返回非零：八组实机
场景保持 pending，最终截图未验证。公开制品通过、示例 Runtime 通过及网站构建通过
均不替代真实桌面／游戏加载验收。剩余候选图保留 1.9.2.0/API3.5 标注；旧发现页图
已从当前教程移除，但历史图片和截图记录保留。

原 baseline 与 publicationBlockers 已留存为 previousPreparation 字段，原自动核验结果
继续保留。本轮没有修改主程序、插件或 Catalog 仓库，也没有清理其工作区变更。
