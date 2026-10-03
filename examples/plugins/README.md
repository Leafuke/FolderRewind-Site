# API 3.6 examples / 插件示例

Requires .NET 10, Node 24 and Python 3.10+. Both plugins reference only the public
FolderRewind.Plugin.Abstractions 3.6.0 NuGet package, publicly available on
NuGet.org. Restore using an empty package cache to verify public availability.
Assembly identity remains 3.0.0.0; the Host baseline is FolderRewind 1.9.3.

中文：使用公开 SDK 3.6.0，仅依赖 Abstractions，不引用宿主实现。
GameRewind 仅扫描提供的根目录，不定义已知位置；真实提供器应遵守
DiscoveryRequest.IncludeKnownLocations（默认 false）的范围授权。

```powershell
node scripts/pack-plugin.mjs MinimalPlugin
node scripts/pack-plugin.mjs GameRewind
```

Outputs: artifacts/examples/*.frplugin and matching .sha256. Install, inspect
the declarations, and explicitly Enable in a FolderRewind API 3.6 Host using test
data. GameRewind discovers supplied roots containing save.dat, proposes drafts,
excludes cache/tmp files and offers a Host backup request and EXAMPLE_ECHO.
It does not implement live-game coordination, snapshots, or safe player-data
preservation. Shut down writers before testing a real game's data.

中文：示例展示生命周期、发现草稿、过滤和命令；不会直接保存宿主配置或写还原目标。
热备份一致性和还原暂存扩展请参考网站能力指南，不能将文件复制视作游戏一致性保证。
