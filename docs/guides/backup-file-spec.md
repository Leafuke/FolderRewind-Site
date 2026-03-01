---
sidebar_position: 3
title: 备份文件规范
description: 重建历史记录所需的命名规则与备份目录结构说明
---

# 备份文件规范

本文用于说明 FolderRewind 在备份文件命名、存储结构上的规范，以及这些规范与 **“重建历史记录”** 功能的关系。

## 命名格式规范

源码中备份文件名由 `GenerateFileName(...)` 统一生成，格式为：

`[Full/Smart/Overwrite][时间戳]文件夹名称 [注释].扩展名`

示例：

- `[Full][2026-03-01_09-30-15]WorldA.7z`
- `[Smart][2026-03-01_10-00-10]WorldA [Auto].7z`
- `[Overwrite][2026-03-01_11-22-08]WorldA [Manual].zip`

### 字段说明

- **备份类型前缀**：`[Full]`、`[Smart]`、`[Overwrite]`
- **时间戳**：`yyyy-MM-dd_HH-mm-ss`
- **文件夹名称**：当前被备份文件夹的显示名
- **注释**：可选，存在时前置一个空格，格式为 ` [注释]`
- **扩展名**：由压缩格式决定，常见为 `7z` 或 `zip`

### 命名注意事项

- 注释会经过文件名清洗，非法字符会被移除。
- 为避免影响解析，注释中的 `[` 与 `]` 会被移除。
- 如果你希望未来可稳定重建历史，建议不要手动改名已生成的备份文件。

## 备份文件存储结构

单个配置（Config）的目标路径为 `DestinationPath`，其下按“被管理文件夹名”分目录存储。

```text
DestinationPath/
├─ <FolderDisplayName>/
│  ├─ [Full][...].7z
│  ├─ [Smart][...].7z
│  └─ [Overwrite][...].zip
└─ _metadata/
   └─ <FolderDisplayName>/
      └─ metadata.json
```

说明：

- `DestinationPath/<FolderDisplayName>/`：实际备份压缩包目录。
- `DestinationPath/_metadata/<FolderDisplayName>/metadata.json`：智能增量链元数据。

## 默认目标路径规则

如果你没有手动设置目标路径，默认推荐根目录为：

`文档/FolderRewind-Backup`

单个配置默认目标目录通常为：

`文档/FolderRewind-Backup/<配置名称>`

## 与“重建历史记录”的关系

“重建历史记录”会依赖现有备份文件进行重建。为了得到更准确的重建结果，建议：

1. 保持上述命名格式（尤其是类型前缀与时间戳）。
2. 保持按 `DestinationPath/<FolderDisplayName>/` 的目录组织。
3. 不要随意删除或改名增量链中的关键文件（特别是 Full 基线）。

## 重要标记与自动清理

- 历史条目可被标记为“重要（Important）”。
- 自动清理旧备份时，会跳过被标记为重要的文件。

这意味着：为长期保留的关键版本打星标，可以避免其被保留策略自动删除。

## 远程命令（KnotLink）补充

v1.4.2 新增 `MARK_IMPORTANT` 远程命令，用于标记/取消标记重要备份：

`MARK_IMPORTANT <config_id> <folder_index|folder_name> <backup_file> [true|false]`

- 省略最后参数时，默认标记为 `true`。
- `backup_file` 建议传入完整备份文件名（包含前缀与扩展名）。

## 相关链接

- [历史时间轴](./history-timeline)
- [备份模式详解](./backup-modes)
- [数据迁移](./data-migration)
