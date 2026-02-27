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
        'guides/minecraft',
      ],
    },
    {
      type: 'category',
      label: '插件生态',
      items: [
        'plugins/overview',
        {
          type: 'category',
          label: '插件开发',
          items: [
            'plugins/developing/quick-start',
          ],
        },
      ],
    },
    'faq',
  ],
};

export default sidebars;
