---
sidebar_position: 4
title: 云存档功能介绍
description: 基于源码行为的云存档实战指南（设置页、配置页、历史页）
---

# 云存档功能介绍

FolderRewind 的云存档功能是基于 rclone 这一成熟的命令行云同步工具实现的。它不是简单地把备份文件上传到云盘，而是提供了一套完整的云存档工作流，支持自动上传、按需同步、历史记录联动等能力。
Rclone 支持多种云存储服务，包括 OneDrive、Google Drive、Dropbox 等，但如果你希望使用百度网盘、阿里云盘等国内服务，可以配合 OpenList 等工具来实现。

- [BiliBili视频讲解](https://www.bilibili.com/video/BV1o2dWBeE3y)

## 一、下载 Rclone 并添加到 FolderRewind 的环境中

在 [Rclone 官网](https://rclone.org/downloads/) 下载适合你系统的版本（Windows 用户通常选择 amd64 版本）。下载后将 `rclone.exe` 解压放到一个固定的目录下，例如 `C:\Tools\rclone\`，并建议将该目录加入系统 PATH 以便在命令行中直接使用 `rclone` 命令。

完成安装后，你需要在 FolderRewind 的设置页中配置 rclone 的路径:

- 设置页 -> 工具与依赖 -> 运行环境 -> rclone 路径 ，你可以在此处设置 **全局** rclone 路径，这样在配置页里就可以直接使用云功能而不需要每次都指定 rclone 的位置。
- 配置管理页 ->  配置设置 -> 云  -> 程序路径，如果你想为某个特定配置使用不同版本的 rclone，可以在这里覆盖全局设置。

## 二、配置 rclone 连接你的云存储服务

虽然FR会帮你完成大部分工作，但是第一步的初始配置还是要你自己来的。Rclone是命令行工具。以下列举几种常见云服务的配置方式：

打开你解压到的那个文件夹如下，在文件夹地址栏输入 cmd 然后回车。

![在文件夹地址栏输入 cmd 打开命令行](/img/docs/guides/cloud-archive-rclone-folder-cmd.png)

然后输入 rclone config 回车。输入 n 回车。输入一个英文名称如下图。回车。

![rclone config 新建远端配置](/img/docs/guides/cloud-archive-rclone-config-new-remote.png)

选择一个数字，回车。这里有67种选择，包含了 OneDrive、DropBox等网盘。

1. OneDrive (个人)

选择 OneDrive 选项（在我这个版本中是41）回车。然后继续回车（`client_id`使用默认值）继续回车（`client_secret`使用默认值）。输入1然后回车。继续回车（默认值）。输入n回车。输入y回车——

![OneDrive 配置过程中的关键选项](/img/docs/guides/cloud-archive-onedrive-config-steps.png)

最后这一个回车会打开你的浏览器，让你登录微软账号。

咋们继续。。1回车、2回车、y回车、y回车。好了，结束了。

![OneDrive 远端配置完成确认界面](/img/docs/guides/cloud-archive-onedrive-finish.png)

2. 百度网盘

Rclone 官方不直接支持百度网盘，但你可以使用 OpenList 这样的工具来桥接。首先在 OpenList 中配置好你的百度网盘账号，然后在 rclone 中选择 WebDAV 选项，填写 OpenList 提供的 WebDAV URL、用户名和密码即可连接到你的百度网盘。以下是具体步骤：
- [OpenList官方文档](https://doc.oplist.org.cn/)

- 下载并安装 OpenList：
  - GitHub：https://github.com/OpenListTeam/OpenList/releases
  - 选择适合你系统的版本（Windows用户一般选择`openlist-windows-amd64.zip`
）下载并安装。

- 在 OpenList 中配置好你的百度网盘账号

打开你解压到的那个文件夹，在文件夹地址栏输入 cmd 然后回车。
输入 openlist server 回车。会显示 WebDAV 的访问地址、用户名和密码。

![OpenList 启动后显示 WebDAV 地址与账号信息](/img/docs/guides/cloud-archive-openlist-server-webdav.png)

打开浏览器，在地址栏输入 `localhost:5244` 回车，输入你在刚才看到的用户名admin和密码登录。
点击管理 -> 添加存储 -> 选择百度网盘 -> 挂载路径填写 `/baidu` -> 打开[OpenList Token 获取工具](https://api.oplist.org/) -> 选择百度网盘验证登录 -> 勾选使用 OpenList 提供的参数 -> 点击获取token -> 复制获取到的刷新令牌 -> 粘贴到 OpenList 的配置页（刷新令牌） -> 点击保存。

![OpenList 中添加百度网盘存储配置](/img/docs/guides/cloud-archive-openlist-baidu-storage-config.png)
![OpenList Token 获取结果示例](/img/docs/guides/cloud-archive-openlist-token-result.png)

- 在 rclone 中配置 WebDAV 连接 OpenList

在 rclon 中继续配置。承接上文，选择 `WebDAV` 选项（在我这个版本中是 `62`）回车。
输入 `http://localhost:5244/dav`）回车，输入 OpenList 提供的用户名（例如 `admin`）回车，输入y回车，输入 OpenList 提供的密码回车。直接回车默认。输入 `n` 回车，输入 `y` 回车。


## 三、配置 FolderRewind 使用某个 rclone 的配置

回到 FolderRewind 的设置页，配置默认远端基路径或者配置页的独立设置。远端基路径。

默认值为 `remote:FolderRewind`，其中 `remote` 是你在 rclone config 中设置的远程名称（例如 `fr_onedrive`）。你可以根据需要修改这个路径，例如 `fr_onedrive:FolderRewind`。这样，当你在 FolderRewind 中使用云功能时，它会将备份文件上传到 `fr_onedrive` 这个远程的 `FolderRewind` 目录下。  
如果是利用 OpenList 的网盘，远端基路径中间需要额外多一项挂载路径，如本例中可以写 `fr_baidu:/baidu/FolderRewind`，这样 FolderRewind 就会把备份文件上传到 OpenList 挂载的百度网盘目录下的 `FolderRewind` 文件夹中。


## 四、云端数据结构

默认建议远端基路径形态：

```text
remote:FolderRewind
```

以某配置和某文件夹为例，实际远端结构是：

```text
{RemoteBasePath}/{ConfigName}/{FolderName}/
├─ [Full][...].7z / [Smart][...].7z / ...
└─ _metadata/
	 ├─ state.json
	 └─ records/
			└─ {ArchiveFileName}.json

{RemoteBasePath}/history.json
```

说明：

- 归档包和 metadata 会分别同步
- `history.json` 在远端基路径根下，用于跨设备历史分析与导入
- metadata 不完整时，程序仍优先处理归档包，并给出“metadata 未完整同步”的警告
- 这个结构和 FR 本地备份库的结构是一致的，便于理解和排查

## 五、配置设置页（云页）逐项说明

路径：目标配置 -> 配置设置 -> 云

### 1) 环境配置区

- **程序路径**：配置级可覆盖；若留默认，会回退到全局 rclone 路径
- **工作目录（可选）**：留空走默认工作目录
- **远端基路径**：例如 `fr_onedrive:FolderRewind`

### 2) 云同步区（手动）

- `从云同步此配置`：打开配置级同步对话框（下节详解）
- 该能力要求当前配置处于 **rclone 模式**

### 3) 启用备份后云上传（自动）

开关：`启用备份后云上传`

它只控制“每次备份完成后是否自动排队上传”。

注意：

- 这个开关**不等于**禁用手动同步
- 手动同步/历史页手动上传下载是否可用，主要取决于是否 rclone 模式

### 4) 高级上传配置（开启自动上传后可见)

#### 预设模板

- **上传当前归档文件（推荐）**：最符合 FR 历史与还原模型
- **补传当前备份目录**：按目录补传，适合修复型场景
- **自定义**：高级用户手工写参数

#### 参数模板与变量

可用变量：

```text
{ArchiveFilePath}
{ArchiveFileName}
{BackupSubDir}
{MetadataDir}
{ConfigName}
{ConfigId}
{FolderName}
{SourcePath}
{DestinationPath}
{BackupMode}
{Comment}
{Timestamp}
{RemoteBasePath}
```

#### 同时同步历史记录

开关：`同时同步历史记录`

开启后，每次自动上传成功，会额外上传最新 `history.json` 到远端基路径根下，便于其他设备后续做配置级历史同步。

#### 超时/重试/上次状态

- 超时（秒）
- 失败重试次数
- 上次执行时间、退出码、错误摘要

这些状态字段可用于排查云命令失败。

## 六、配置级“从云同步此配置”对话框

入口：配置设置 -> 云 -> 从云同步此配置

对话框流程是“先分析，再同步”。

### 1) 分析阶段做什么

会先下载远端的 `history.json`，再做匹配和映射：

1. 先按 `ConfigId` 精确匹配
2. 若远端历史缺少可用 ConfigId，则退化为按远端路径前缀匹配（`{RemoteBasePath}/{ConfigName}`）
3. 映射到本地文件夹时：
	 - 先按 `FolderPath` 精确匹配
	 - 再按 `FolderName` 唯一匹配
	 - 若同名命中多个本地文件夹，判定为歧义并跳过

分析结果会展示：

- 匹配到的远端历史
- 可导入数量
- 未映射数量
- 歧义数量

### 2) 两种同步范围

- **仅同步此配置历史记录**：只导入可安全映射的历史项（合并导入，自动跳过重复）
- **同步历史记录和所有备份到本地**：先导入历史，再按当前配置文件夹逐个拉取归档+metadata，并执行本地历史恢复

第二种模式适合新设备冷启动恢复。

### 3) 常见失败原因

- 当前配置没有可用源文件夹
- rclone 路径或工作目录无效
- 远端路径写错
- 历史可导入，但后续拉取备份失败（会提示“历史已导入，但拉取备份失败”）

## 七、历史记录页里的云功能

路径：历史记录页

每条历史项右侧有两个云操作按钮：

- 上传到云端
- 从云端下载到本地备份库

### 1) 图标与状态

- 有云图标：代表该记录具备云副本信息
- 状态可能是：
	- 已在云端保留副本
	- 当前仅保留云端副本

时间轴中“仅云端副本”会以专门状态色显示。

### 2) 按钮可用条件

- 上传按钮可用：当前记录有本地文件
- 下载按钮可用：当前记录有云端副本路径信息
- 若配置处于旧版自定义命令模式：历史页上传/下载会禁用（仅 rclone 模式支持）

### 3) 上传/下载的实际行为

上传单条历史时：

1. 先上传归档文件
2. 再尝试上传 metadata 的 state/record 文件
3. metadata 若部分失败，会警告但归档已优先成功

下载单条历史时：

1. 先下载归档文件到本地备份库
2. 再尝试下载 metadata
3. metadata 若部分失败，同样会给出部分同步警告

### 4) “仅云端副本”如何恢复

推荐顺序：

1. 在历史页先点“从云端下载”
2. 下载成功后再点“还原”

不要直接对“本地文件缺失”的历史项执行还原。

## 八、与自动备份联动时的建议

- 自动备份 + 云上传建议优先用“上传当前归档文件（推荐）”模板
- 多设备场景建议开启“同时同步历史记录”
- 首次上线先做一次完整演练：
	- 本地备份
	- 自动云上传
	- 历史页手动下载
	- 本地还原验证

## 九、故障排查清单

### 情况 1：历史页云按钮是灰色

排查：

1. 是否处于旧版自定义命令模式
2. 上传按钮灰色：本地归档是否存在
3. 下载按钮灰色：该历史项是否有云端副本路径

### 情况 2：配置同步里“可导入数量为 0”

排查：

1. 远端 history.json 是否来自同一套配置
2. 本地文件夹映射是否失配（路径变更/同名歧义）
3. 远端基路径是否填错

### 情况 3：提示 metadata 部分同步

含义：

- 归档包已经处理成功
- metadata 的 state/record 有部分未完成

建议后续补一次同步，确保增量链信息更完整。

## 相关链接

- [常见问题](../faq)
- [自动化任务](./automation)
- [历史时间轴](./history-timeline)
- [备份文件规范](./backup-file-spec)
- [数据迁移](./data-migration)
- [FolderRewind v1.7.0 发布](/blog/v1.7.0-release)
