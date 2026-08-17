import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'FolderRewind - 存档时光机',
  tagline: '面向重要文件、项目资料与游戏存档的现代备份工具',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://folderrewind.top',
  baseUrl: '/',
  trailingSlash: true,

  organizationName: 'Leafuke',
  projectName: 'FolderRewind-Site',

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
          exclude: ['**/superpowers/**'],
          showLastUpdateTime: true,
          editLocalizedFiles: true,
          editUrl:
            'https://github.com/Leafuke/FolderRewind-Site/edit/main/',
        },
        blog: {
          showReadingTime: true,
          showLastUpdateTime: true,
          editLocalizedFiles: true,
          blogTitle: '更新日志',
          blogDescription: 'FolderRewind 版本更新与项目公告',
          blogSidebarTitle: '所有版本',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/Leafuke/FolderRewind-Site/edit/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        sitemap: {
          ignorePatterns: [
            '/404',
            '/en/404',
            '/search',
            '/en/search',
            '/blog/authors',
            '/blog/authors/',
            '/en/blog/authors',
            '/en/blog/authors/',
            '/blog/archive',
            '/blog/archive/',
            '/en/blog/archive',
            '/en/blog/archive/',
            '/blog/tags/**',
            '/en/blog/tags/**',
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        indexDocs: true,
        indexBlog: true,
        indexPages: false,
        language: ['zh', 'en'],
        hashed: 'filename',
        searchBarPosition: 'right',
        searchBarShortcut: true,
        searchBarShortcutHint: true,
        searchBarShortcutKeymap: 'mod+k',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 80,
      },
    ],
  ],

  themeConfig: {
    image: 'img/ori.webp',
    metadata: [
      {
        name: 'description',
        content:
          'FolderRewind 是一款面向重要文件、项目资料与游戏存档的现代 Windows 备份工具。 A modern Windows backup tool for important files, project data, and game saves.',
      },
      {property: 'og:type', content: 'website'},
      {property: 'og:site_name', content: 'FolderRewind'},
      {property: 'og:title', content: 'FolderRewind - 存档时光机'},
      {
        property: 'og:description',
        content:
          'FolderRewind 是一款面向重要文件、项目资料与游戏存档的现代 Windows 备份工具。 A modern Windows backup tool for important files, project data, and game saves.',
      },
      {property: 'og:image', content: 'https://folderrewind.top/img/ori.webp'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'FolderRewind - 存档时光机'},
      {
        name: 'twitter:description',
        content:
          'FolderRewind 是一款面向重要文件、项目资料与游戏存档的现代 Windows 备份工具。 A modern Windows backup tool for important files, project data, and game saves.',
      },
      {name: 'twitter:image', content: 'https://folderrewind.top/img/ori.webp'},
    ],
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
        {to: '/docs/guides/minecraft/overview', label: 'Minecraft', position: 'left'},
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
    docs: {
      sidebar: {
        hideable: true,
      },
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
              to: '/docs/guides/minecraft/overview',
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
