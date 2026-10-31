---
title: 开发、构建与验证
description: 了解源码布局、Windows 构建与核心测试入口，准备隔离故障恢复和安装载荷检查，并使用固定样本比较性能。
reviewed_baseline: "1.10-api3.17"
---

# 开发、构建与验证

使用 Windows 与 WinUI 开发工具链；SDK 由 global.json 选择，依赖版本由集中包配置及项目覆盖声明。生产项目放在 src，测试放在 tests。普通 Host 构建不需要网站、MineRewind 或 Catalog 源码。

## 构建与测试

```powershell
$sevenZip = ./scripts/build/Stage-SevenZip.ps1 -Platform x64 | Select-Object -Last 1
dotnet restore FolderRewind.slnx -p:Platform=x64
dotnet build FolderRewind.slnx -c Debug -p:Platform=x64 -p:GenerateAppxPackageOnBuild=false "-p:SevenZipExecutable=$sevenZip" --no-restore
./scripts/test/Test-RepositoryLayout.ps1
./scripts/test/Invoke-SetupCoreTests.ps1
dotnet test tests/FolderRewind.Core.Recovery.Tests/FolderRewind.Core.Recovery.Tests.csproj -c Release -p:FolderRewindFaultInjection=true
```

首次准备需要 PATH 中已有 `7z.exe`（用于解压）。准备对应架构的 7za.exe，可运行 `scripts/build/Stage-SevenZip.ps1` 并通过 `SevenZipExecutable` 指定。核心测试入口准备固定哈希的 rclone/OpenList 工具；测试只使用隔离目录与本地后端。直接调用测试工程时，先运行测试环境准备脚本。故障恢复验收和探针具有独立输出，正式 Core 不包含故障钩子。

PowerShell 工具从自身位置查找根解决方案；相对的路径参数按仓库根解析，并恢复调用者的工作目录。跨仓库集成脚本提供显式仓库路径参数。不要以共享目录中的其他源码作为普通 Host 或插件的隐式编译输入。

<span id="packaging" />

## 安装载荷

`scripts/build` 负责构建、压缩工具准备及安装包载荷；`scripts/test` 负责资源、生产身份和隔离安装检查；`scripts/release` 负责元数据与发布编排。MSI 通道使用 `FolderRewindDistributionChannel=Msi`，同时自包含 .NET 和 Windows App SDK。验证 x64 与 ARM64 各自的压缩器、Core DLL、资源和许可证，不把测试程序集或故障探针打包。

Release Setup 会核对清单与项目版本，读取 `.github/release-notes/v<版本>.md`，然后校验本次运行的测试与产物哈希。公开产物为 Setup EXE 与校验文件；内部 MSI 不作为公开下载。执行发布工作流会发布，普通构建与测试不会。安装体验未执行时必须保持未执行状态。

<span id="performance" />

## 性能比较

使用 `tools/BackupPerformanceHost` 和 `benchmarks/performance`，为基线与候选冻结完整输出。双方保持相同输入、压缩器、测量代码、参数和测量边界，使用不重叠且尚不存在的隔离输出目录，交替运行以减小缓存和顺序影响。固定合成输入包括 Full/Smart、许多小文件、历史增长及单字节变化；按任务风险选择相关矩阵。

同时核对结果正确性、归档内容和完整样本，再分析耗时、CPU、内存与 I/O。二进制哈希和原始记录保存到 artifacts。服务性能、UI、真实云端与游戏加载分别设置验证场景，资源释放结合持续采样判断。

## 文档与贡献

维护者的跨仓库发布顺序、版本矩阵、NuGet 与插件冻结、Setup 发布及重试规则见[插件、SDK 与主程序发布流程](/docs/architecture/releasing)。

Host docs 仅保留术语、有效架构决策及长期协议/安全约束。教程与架构导览在本网站维护中英文。计划、进度、截图、评审和验收报告不长期入库；旧记录通过 Git 历史找回。提交说明应描述改动原因、实际验证和仍未验证的部分。
