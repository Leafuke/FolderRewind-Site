---
sidebar_position: 8
title: "官方目录与插件更新"
description: "FolderRewind 1.9 系列官方目录与插件更新操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 官方目录与插件更新

## 更新事实源

FolderRewind 1.9 的更新以独立 Official Catalog 为准。GitHub Releases 托管制品，插件的 repository 字段只提供项目信息，不决定可安装的版本或安全来源。

Host 匹配 PluginId，并使用 SemVer2.0 比较优先级；下载前核对目录项、精确 Release URL、SHA-256、声明/API和实际包。发布者签名和任意自定义目录不是 v3 首发功能。

## 作者发布步骤

更新 manifest 产品版本，构建不可变 .frplugin 和校验文件，上传固定 tag 下的附件。验证公开下载字节后提交目录 source 项；目录 CI 校验包并生成 public/catalog.v1.json。改动 API 要求时单独说明，不用应用版本推导 API。

## 更新事务

升级尊重用户 Enabled Intent 和当前操作排空，保存 current／previous 已知良好载荷及恢复日志。候选不兼容／静态验证失败则拒绝，不先运行代码试错。RequiresRestart 时按提示重启。

## 手动分发

手动包同样接受静态校验，来源仍记录为 Manual；不因为同 ID／名称就被赋予 Official。向用户说明维护方式和兼容性，使用管理页的本地安装入口，不直接覆盖程序集。

<span id="工作原理" />
<span id="配置步骤" />
<span id="1-设置-repository-字段" />
<span id="2-创建-github-release" />
<span id="3-上传-zip-资产" />
<span id="minhostversion" />
<span id="破坏性变更处理" />
<span id="相关链接" />
