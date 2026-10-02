---
sidebar_position: 2
title: "插件安装与管理"
description: "FolderRewind 1.9 系列插件安装与管理操作说明：依据当前源码核对配置、执行与失败处理，帮助用户验证备份保护范围、可还原性和版本兼容边界。"
reviewed_baseline: "1.9-api3.5"
---

# 插件安装与管理

## 官方目录安装

打开设置中的插件管理与插件商店，检查产品、版本、API、来源、服务影响和制品哈希，再安装。新安装默认停用；明确启用才执行 ActivateAsync。启用意图保存在配置中，实际运行状态另行显示。

## 本地安装

下载可信来源的 `.frplugin` 和校验文件，核对 SHA-256，选择本地安装。根目录必须包含 manifest.json、声明的 settingsSchema 和入口程序集；不接受旧顶层目录 ZIP 或携带 Abstractions DLL 的包。安装只静态检查，不能证明插件安全。

## 设置、启停与故障

Host 按静态模式渲染 typed settings；无效类型拒绝，激活失败检查诊断。停用先撤销路由再排空和清理；超时可能需要重启，不能承诺所有程序集都即时释放。Safe Mode 保留 Enabled Intent，但不执行插件；损坏配置进入恢复中心。

## 更新与回滚

自动更新只采用 Official Catalog 绑定的版本、URL、SHA-256和 manifest，不从插件 Repository 自报地址任意下载。Manual 与 Official 来源记录不同，名字和相同 ID 不构成信任证明。

版本化安装维护 current／previous 已知良好载荷和恢复日志。使用界面提供的升级／回滚入口，先停止受影响操作；不要直接覆盖 DLL 目录。更旧包不一定能读当前 Provider State 或已有制品。

## 卸载

停用能力、排空操作后进行事务化代码／可选私有数据隔离，再提交配置移除。已有用户备份历史不是插件私有数据，不随代码卸载删除；卸载前核对保留内容和所需 materializer。中断后让启动恢复处理，不手工清空事务目录。

## 排查顺序

核对 API major／minor、架构、入口类型、设置模式与能力声明；再看激活诊断、RequiresRestart 和 Kind 提供器状态。下载成功、安装成功、Enabled Intent 和 Active 是不同事实。

<span id="安装方式" />
<span id="1-从插件商店安装" />
<span id="2-本地安装-zip" />
<span id="启用与停用" />
<span id="插件设置" />
<span id="插件日志" />
<span id="升级与回滚" />
<span id="常见问题" />
<span id="安装失败" />
<span id="安装后看不到功能" />
<span id="插件冲突" />
<span id="版本不兼容" />
<span id="相关链接" />
