import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'FolderRewind - 存档时光机',
  tagline: '再也不怕存档丢失',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://folderrewind.pages.dev',
  baseUrl: '/',

  organizationName: 'Leafuke',
  projectName: 'FolderRewind',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': {
        label: '中文',
        htmlLang: 'zh-Hans',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/Leafuke/FolderRewind-Site/tree/main/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: '更新日志',
          blogDescription: 'FolderRewind 版本更新与项目公告',
          blogSidebarTitle: '所有版本',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/Leafuke/FolderRewind-Site/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og-image.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'FolderRewind',
      logo: {
        alt: 'FolderRewind Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: '文档',
        },
        {to: '/docs/guides/minecraft', label: 'Minecraft', position: 'left'},
        {to: '/docs/plugins/overview', label: '插件', position: 'left'},
        {to: '/download', label: '下载', position: 'left'},
        {to: '/blog', label: '更新日志', position: 'left'},
        {
          href: 'https://github.com/Leafuke/FolderRewind',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: '/docs/intro',
            },
            {
              label: 'Minecraft 专题',
              to: '/docs/guides/minecraft',
            },
            {
              label: '插件开发',
              to: '/docs/plugins/developing/quick-start',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/Leafuke/FolderRewind/discussions',
            },
            {
              label: 'GitHub Issues',
              href: 'https://github.com/Leafuke/FolderRewind/issues',
            },
          ],
        },
        {
          title: '下载',
          items: [
            {
              label: 'Microsoft Store',
              href: 'https://apps.microsoft.com/detail/9nwsdgxdqws4',
            },
            {
              label: 'GitHub Releases',
              href: 'https://github.com/Leafuke/FolderRewind/releases',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Leafuke. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp', 'json', 'powershell'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
