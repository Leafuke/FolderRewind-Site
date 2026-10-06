import {translate} from '@docusaurus/Translate';

export function useHomepageCopy() {
  return {
    tagline: translate({id: 'homepage.v2.tagline', message: '存档时光机'}),
    heroCopy: translate({
      id: 'homepage.v2.heroCopy',
      message: '为重要文件保留历史，让误改与误删有机会回到过去。',
    }),
    store: translate({id: 'homepage.v2.store', message: '从 Microsoft Store 获取'}),
    quick: translate({id: 'homepage.v2.quick', message: '快速上手'}),
    other: translate({id: 'homepage.v2.other', message: '其他下载方式'}),
    free: translate({id: 'homepage.v2.free', message: '免费 · 开源'}),
    startLabel: translate({id: 'homepage.v2.startLabel', message: '开始使用'}),
    startTitle: translate({id: 'homepage.v2.startTitle', message: '从一个文件夹开始。'}),
    startCopy: translate({
      id: 'homepage.v2.startCopy',
      message: '先完成一次备份与还原验证，再放心地把日常备份交给自动化。',
    }),
    install: translate({id: 'homepage.v2.install', message: '安装应用'}),
    installCopy: translate({
      id: 'homepage.v2.installCopy',
      message: '选择适合你的安装方式，准备好独立的备份位置。',
    }),
    backup: translate({id: 'homepage.v2.backup', message: '创建首次备份'}),
    backupCopy: translate({
      id: 'homepage.v2.backupCopy',
      message: '添加工作文档、设计项目或个人资料，保留一个起点。',
    }),
    verify: translate({id: 'homepage.v2.verify', message: '验证首次还原'}),
    verifyCopy: translate({
      id: 'homepage.v2.verifyCopy',
      message: '在测试副本上确认还原结果，然后开启自动备份。',
    }),
    previewLabel: translate({id: 'homepage.v2.previewLabel', message: '界面一览'}),
    previewTitle: translate({id: 'homepage.v2.previewTitle', message: '每一次改变，都有迹可循。'}),
    previewCopy: translate({
      id: 'homepage.v2.previewCopy',
      message: '从整理备份项目，到查看历史与确认还原，在熟悉的 Windows 界面中完成。',
    }),
    homeTab: translate({id: 'homepage.v2.homeTab', message: '管理文件夹'}),
    historyTab: translate({id: 'homepage.v2.historyTab', message: '查看历史'}),
    restoreTab: translate({id: 'homepage.v2.restoreTab', message: '确认还原'}),
    homeCaption: translate({
      id: 'homepage.v2.homeCaption',
      message: '按项目整理文件夹，把日常资料与游戏存档放在同一个工作台。',
    }),
    historyCaption: translate({
      id: 'homepage.v2.historyCaption',
      message: '查看版本、备注与可还原状态，为需要找回的文件选择一个起点。',
    }),
    restoreCaption: translate({
      id: 'homepage.v2.restoreCaption',
      message: '执行前核对版本、目标目录与还原方式，并检查是否启用了还原前备份。',
    }),
    homeAlt: translate({
      id: 'homepage.v2.homeAlt',
      message: 'FolderRewind 首页，展示工作文档、设计项目、个人资料与游戏备份项目',
    }),
    historyAlt: translate({
      id: 'homepage.v2.historyAlt',
      message: 'FolderRewind 高级历史视图，展示多个版本、备注、分支与可还原状态',
    }),
    restoreAlt: translate({
      id: 'homepage.v2.restoreAlt',
      message: 'FolderRewind 还原确认窗口，展示目标、范围和未启用还原前备份的提示',
    }),
    mergeTab: translate({id: 'homepage.v2.mergeTab', message: "合并方案"}),
    mapTab: translate({id: 'homepage.v2.mapTab', message: "浏览地图"}),
    mergeCaption: translate({id: 'homepage.v2.mergeCaption', message: "双栏比较文本、处理文件冲突，应用前审阅合并结果。"}),
    mapCaption: translate({id: 'homepage.v2.mapCaption', message: "只读浏览 Java 世界地形，切换维度、定位坐标并查看区块详情。"}),
    mergeAlt: translate({id: 'homepage.v2.mergeAlt', message: "FolderRewind 1.9.6 合并工作页，展示文本差异、文件冲突与结果审阅"}),
    mapAlt: translate({id: 'homepage.v2.mapAlt', message: "FolderRewind 1.9.6 的 Minecraft Java 世界只读地形地图"}),
    newImageVersion: translate({id: 'homepage.v2.newImageVersion', message: '界面截图：1.9.6'}),
    viewOriginal: translate({id: 'homepage.v2.viewOriginal', message: '查看原图'}),
    close: translate({id: 'homepage.v2.close', message: '关闭预览'}),
    imageVersion: translate({id: 'homepage.v2.imageVersion', message: '界面截图：1.9.4'}),
    readGuide: translate({id: 'homepage.v2.readGuide', message: '阅读使用指南'}),
    featuresLabel: translate({id: 'homepage.v2.featuresLabel', message: '核心能力'}),
    featuresTitle: translate({
      id: 'homepage.v2.featuresTitle',
      message: '备份有计划，恢复有依据。',
    }),
    featuresCopy: translate({
      id: 'homepage.v2.featuresCopy',
      message: '从日常保存到找回旧版本，让文件保护成为工作习惯。',
    }),
    featureBackup: translate({id: 'homepage.v2.featureBackup', message: '按需备份'}),
    featureBackupCopy: translate({
      id: 'homepage.v2.featureBackupCopy',
      message:
        '完整保存，或捕获变化。按资料特点选择 Full、Smart 与 Rolling，并设置合适的保留策略。',
    }),
    featureHistory: translate({id: 'homepage.v2.featureHistory', message: '历史与恢复'}),
    featureHistoryCopy: translate({
      id: 'homepage.v2.featureHistoryCopy',
      message: '通过版本、分支与恢复点整理历史。还原前核对目标和保护选项，让每一步都有依据。',
    }),
    featureAuto: translate({id: 'homepage.v2.featureAuto', message: '自动化与云副本'}),
    featureAutoCopy: translate({
      id: 'homepage.v2.featureAutoCopy',
      message: '安排定时或条件备份，通过 rclone 等外部工具保存云副本，把重复工作交给既定流程。',
    }),
    modesLink: translate({id: 'homepage.v2.modesLink', message: '了解备份模式'}),
    historyLink: translate({id: 'homepage.v2.historyLink', message: '了解历史与恢复'}),
    autoLink: translate({id: 'homepage.v2.autoLink', message: '配置自动备份'}),
    cloudLink: translate({id: 'homepage.v2.cloudLink', message: '了解云存档'}),
    ecoLabel: translate({id: 'homepage.v2.ecoLabel', message: '更多使用场景'}),
    ecoTitle: translate({id: 'homepage.v2.ecoTitle', message: '从日常资料，到你的整个工作流。'}),
    game: translate({id: 'homepage.v2.game', message: '游戏存档保护'}),
    gameCopy: translate({
      id: 'homepage.v2.gameCopy',
      message: '为游戏世界保留历史。Minecraft 热备份、热还原需搭配对应的插件或模组使用。',
    }),
    gameLink: translate({id: 'homepage.v2.gameLink', message: '探索 Minecraft 专题'}),
    plugins: translate({id: 'homepage.v2.plugins', message: '插件与自动化扩展'}),
    pluginsCopy: translate({
      id: 'homepage.v2.pluginsCopy',
      message: '通过独立插件 SDK 与 KnotLink 接入应用、游戏和自动化，让备份融入自己的工作流。',
    }),
    pluginsLink: translate({id: 'homepage.v2.pluginsLink', message: '阅读开发文档'}),
    downloadLabel: translate({id: 'homepage.v2.downloadLabel', message: '下载与开始'}),
    downloadTitle: translate({
      id: 'homepage.v2.downloadTitle',
      message: '给重要文件，留一条回去的路。',
    }),
    downloadCopy: translate({id: 'homepage.v2.downloadCopy', message: '从今天的第一个备份开始。'}),
    installation: translate({id: 'homepage.v2.installation', message: '安装指南'}),
    system: translate({id: 'homepage.v2.system', message: 'Windows 10 1809+ / Windows 11'}),
    architecture: translate({id: 'homepage.v2.architecture', message: '支持 x64 / ARM64'}),
    pause: translate({id: 'homepage.v2.pause', message: '暂停粒子动效'}),
    play: translate({id: 'homepage.v2.play', message: '播放粒子动效'}),
    motion: translate({id: 'homepage.v2.motion', message: '粒子动效'}),
    navPreview: translate({id: 'homepage.v2.navPreview', message: '浏览界面'}),
    seo: translate({
      id: 'homepage.v2.seo',
      message:
        'FolderRewind 是面向 Windows 的开源备份工具，为重要文件、项目资料与游戏存档保留历史，提供自动备份、版本管理、恢复点与云副本，帮助你建立可验证的备份和还原流程。',
    }),
  };
}
