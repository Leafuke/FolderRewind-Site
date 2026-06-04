---
sidebar_position: 6
title: 插件配置定义
description: PluginSettingDefinition 设计规范与字段约定
---

# 插件配置定义

插件通过 `GetSettingsDefinitions()` 声明设置项，Host 负责渲染 UI、保存值，并在调用插件方法时通过 `settingsValues` 传回。

## PluginSettingDefinition 字段

| 字段 | 类型 | 必选 | 说明 |
|------|------|:----:|------|
| `Key` | `string` | ✅ | 设置键名，`settingsValues` 中的 Key |
| `DisplayName` | `string` | ✅ | UI 显示名称 |
| `Description` | `string?` | — | 设置用途说明 |
| `Type` | `PluginSettingType` | — | 类型（默认 `String`） |
| `DefaultValue` | `string?` | — | 默认值（字符串格式） |
| `IsRequired` | `bool` | — | 是否必填（默认 `false`） |

## PluginSettingType 枚举

| 值 | 数值 | 渲染控件 | DefaultValue 格式 | 说明 |
|----|:----:|----------|-------------------|------|
| `String` | 0 | 文本框 | 任意字符串 | 单行文本 |
| `Boolean` | 1 | 开关 | `"true"` / `"false"` | 布尔值 |
| `Integer` | 2 | 数字输入 | 数字字符串，如 `"42"` | 整数 |
| `Path` | 3 | 文件夹选择器 | 路径字符串 | 目录路径 |
| `MultilineString` | 4 | 多行文本框 | 包含换行的字符串 | 多行文本 |

## 每种类型的示例

### String — 单行文本

```csharp
new()
{
    Key = "Prefix",
    DisplayName = "备份文件名前缀",
    Description = "添加到备份文件名前的文本",
    Type = PluginSettingType.String,
    DefaultValue = "backup",
    IsRequired = false
}
```

### Boolean — 布尔开关

```csharp
new()
{
    Key = "EnableHotBackup",
    DisplayName = "启用热备份",
    Description = "在游戏运行时创建快照进行备份",
    Type = PluginSettingType.Boolean,
    DefaultValue = "true",
    IsRequired = false
}
```

### Integer — 整数

```csharp
new()
{
    Key = "MaxBackups",
    DisplayName = "最大备份数",
    Description = "超过此数量的旧备份将被自动清理",
    Type = PluginSettingType.Integer,
    DefaultValue = "10",
    IsRequired = false
}
```

### Path — 目录路径

```csharp
new()
{
    Key = "CustomBackupDir",
    DisplayName = "自定义备份目录",
    Description = "留空使用默认目录",
    Type = PluginSettingType.Path,
    DefaultValue = "",
    IsRequired = false
}
```

### MultilineString — 多行文本

```csharp
new()
{
    Key = "ExcludePatterns",
    DisplayName = "排除规则",
    Description = "每行一个通配符模式",
    Type = PluginSettingType.MultilineString,
    DefaultValue = "",
    IsRequired = false
}
```

## 设置值读取

`settingsValues` 的所有值都是 `string` 类型，需要手动解析：

```csharp
private static bool GetBoolSetting(IReadOnlyDictionary<string, string> settings, string key, bool defaultValue)
{
    if (settings.TryGetValue(key, out var value))
    {
        if (bool.TryParse(value, out var result))
            return result;
        if (value == "1") return true;
        if (value == "0") return false;
    }
    return defaultValue;
}

private static int GetIntSetting(IReadOnlyDictionary<string, string> settings, string key, int defaultValue)
{
    if (settings.TryGetValue(key, out var value) && int.TryParse(value, out var result))
        return result;
    return defaultValue;
}
```

## 设计原则

- **Key 稳定**：发布后尽量不改 Key，否则用户已保存的设置会丢失
- **描述明确**：说明用途、默认值、风险
- **默认值可回退**：解析失败时使用保底值
- **布尔值兼容**：建议同时接受 `"true"/"false"` 和 `"1"/"0"`

## MineRewind 示例

MineRewind 定义了两个布尔设置：

```csharp
public IReadOnlyList<PluginSettingDefinition> GetSettingsDefinitions()
{
    return new List<PluginSettingDefinition>
    {
        new()
        {
            Key = "EnableHotBackup",
            DisplayName = Localize("MineRewind_Setting_EnableHotBackup_Name"),
            Description = Localize("MineRewind_Setting_EnableHotBackup_Desc"),
            Type = PluginSettingType.Boolean,
            DefaultValue = "true",
            IsRequired = false
        },
        new()
        {
            Key = "PreservePlayerData",
            DisplayName = Localize("MineRewind_Setting_PreservePlayerData_Name"),
            Description = Localize("MineRewind_Setting_PreservePlayerData_Desc"),
            Type = PluginSettingType.Boolean,
            DefaultValue = "false",
            IsRequired = false
        }
    };
}
```

注意 MineRewind 使用了 `Localize()` 方法实现设置名称的多语言支持。参见 `MinecraftSavesPlugin.cs:123-146`。

## 相关链接

- [Plugin API 参考](./plugin-api)
- [插件开发快速上手](./quick-start)
