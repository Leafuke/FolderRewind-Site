---
sidebar_position: 6
title: "静态设置模式与类型化读取"
description: "FolderRewind 1.9 系列静态设置模式与类型化读取操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 静态设置模式与类型化读取

API 3.5 的设置是安装包静态数据。manifest 的 settingsSchema 指向 JSON 文件；安装校验无需执行插件。Host 渲染界面、验证候选并事务化重激活，不让无效设置覆盖已知良好配置。

## 模式格式

```json
{"schemaVersion":1,"settings":[{"key":"EnabledFeature","type":"boolean","default":true,"required":false,"displayName":"启用示例功能","localizedDisplayName":{"en-US":"Enable example feature"}}]}
```

schemaVersion 当前只支持1。key 必须合法且唯一；default 必须匹配声明类型；required 是 JSON 布尔值。settings 即使为空也必须是数组。

| type | JSON 值 | 用途 |
|---|---|---|
| `string` | string | 单行文本 |
| `boolean` | true/false | 布尔开关 |
| `integer` | Int64 整数 | 数值 |
| `multiline` | string | 多行文本 |
| `folderPath` | string | 文件夹路径 |
| `filePath` | string | 文件路径 |
| `enum` | string | 必须匹配非空且不重复的 enumValues |

支持 displayName、description、localizedDisplayName、localizedDescription。显示文案可修改，key 应保持稳定。

## 读取

以下为激活方法内的片段，settings 是 context.Settings.Values：

```csharp
bool enabled = settings.TryGetValue("EnabledFeature", out var value)
    && value.GetBoolean();
```

不是字符串字典，不要手动接受 "1" 或 "true" 来绕过布尔校验。未知键以警告保留；缺失项使用合法默认值，required 缺失且无默认值时拒绝。设置与 Provider State 是不同的数据模型。

## 更新验收

保存非法类型应失败并保留原值。激活新设置失败时应保留／恢复已知良好状态，检查诊断与运行状态。取消或停用超时需要遵循 Host 的 RequiresRestart 提示。

<span id="pluginsettingdefinition-字段" />
<span id="pluginsettingtype-枚举" />
<span id="每种类型的示例" />
<span id="string--单行文本" />
<span id="boolean--布尔开关" />
<span id="integer--整数" />
<span id="path--目录路径" />
<span id="multilinestring--多行文本" />
<span id="设置值读取" />
<span id="设计原则" />
<span id="minerewind-示例" />
<span id="相关链接" />
