# Plugin API 3.17 examples / 插件示例

MinimalPlugin demonstrates activation and deactivation. GameRewind adds discovery,
file policy and commands. Both reference the public
`FolderRewind.Plugin.Abstractions 3.17.0` NuGet package and target .NET 10.
The Host supplies assembly identity `3.0.0.0` at runtime.

中文：两个示例只引用公开 Abstractions 包。MinimalPlugin 展示生命周期，GameRewind
展示发现、过滤和命令。文档中的代码块直接读取这些源文件。

From the website repository root, with .NET 10, Node.js 24 and Python 3.10+ installed:

```powershell
dotnet restore examples/plugins/MinimalPlugin --source https://api.nuget.org/v3/index.json
dotnet restore examples/plugins/GameRewind --source https://api.nuget.org/v3/index.json
node scripts/pack-plugin.mjs MinimalPlugin
node scripts/pack-plugin.mjs GameRewind
```

Packages and checksums are written to `artifacts/examples/`. Install through plugin
management, review declarations and enable the example in a Host supporting API 3.17.
Use a small directory containing `save.dat` to exercise GameRewind.

The QA harness references Runtime from the exact Host checkout selected in
`audit/baseline.json`; the examples retain their independent package references.
See the bilingual [plugin quick start](https://folderrewind.top/docs/plugins/developing/quick-start).
