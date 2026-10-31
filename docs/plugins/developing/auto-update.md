---
sidebar_position: 8
title: "官方目录与插件更新"
description: "发布绑定版本、下载 URL、API 与哈希的官方目录条目，验证固定插件制品，并维护启用选择、升级事务与回滚载荷。"
reviewed_baseline: "1.10-api3.17"
---

# 官方目录与插件更新

发布绑定版本、URL 与哈希的官方目录条目，理解可信更新、兼容检查和回滚职责。

## 更新事实源

插件官方更新由独立 Catalog 提供固定版本与制品声明，GitHub Releases 托管对应附件。repository 字段用于项目导航。

Host 按 PluginId 匹配插件，以 SemVer 2.0 比较版本优先级。下载与安装时核对精确 URL、SHA-256、API、架构及实际声明；作者发布步骤见下文。

## 作者发布步骤

更新 manifest 产品版本，构建不可变 .frplugin 和校验文件，上传固定 tag 下的附件。验证公开下载字节后提交目录 source 项；目录 CI 校验包并生成 public/catalog.v1.json。改动 API 要求时单独说明，不用应用版本推导 API。

## 更新事务

升级尊重用户 Enabled Intent 和当前操作排空，保存 current／previous 已知良好载荷及恢复日志。候选不兼容／静态验证失败则拒绝，不先运行代码试错。RequiresRestart 时按提示重启。

## 手动分发

手动包同样接受静态校验，来源仍记录为 Manual；不因为同 ID／名称就被赋予 Official。向用户说明维护方式和兼容性，使用管理页的本地安装入口，不直接覆盖程序集。

<span id="1-设置-repository-字段" />
<span id="2-创建-github-release" />
<span id="3-上传-zip-资产" />
<span id="minhostversion" />
<span id="工作原理" />
<span id="相关链接" />
<span id="破坏性变更处理" />
<span id="配置步骤" />
