import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: '开始使用',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/first-backup',
        'getting-started/first-restore',
      ],
    },
    {
      type: 'category',
      label: '使用指南',
      items: [
        'guides/backup-modes',
        'guides/automation',
        'guides/encryption',
        'guides/filters',
        'guides/history-timeline',
        'guides/mini-window',
        'guides/data-migration',
        {
          type: 'category',
          label: 'Minecraft 专题',
          items: [
            'guides/minecraft/overview',
            'guides/minecraft/quick-start',
            'guides/minecraft/hot-backup',
            'guides/minecraft/hot-restore',
            'guides/minecraft/knotlink-mod',
            'guides/minecraft/troubleshooting',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '插件生态',
      items: [
        'plugins/overview',
        'plugins/using-plugins',
        'plugins/knotlink',
        {
          type: 'category',
          label: '插件开发',
          items: [
            'plugins/developing/quick-start',
            'plugins/developing/plugin-api',
            'plugins/developing/hotkey-api',
            'plugins/developing/knotlink-api',
            'plugins/developing/settings-schema',
            'plugins/developing/packaging',
            'plugins/developing/auto-update',
          ],
        },
      ],
    },
    'faq',
  ],
};

export default sidebars;
