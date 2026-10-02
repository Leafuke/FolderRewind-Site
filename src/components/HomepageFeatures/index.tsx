import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import {
  FaBolt,
  FaArrowsRotate,
  FaClock,
  FaLock,
  FaTimeline,
  FaPuzzlePiece,
  FaWindowRestore,
  FaCloudArrowUp,
  FaShieldHalved,
} from 'react-icons/fa6';
import styles from './styles.module.css';

type FeatureTone = 'indigo' | 'teal' | 'amber';

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
};

type FeatureGroup = {
  key: string;
  tone: FeatureTone;
  heading: string;
  features: FeatureItem[];
};

function useFeatureGroups(): FeatureGroup[] {
  return [
    {
      key: 'core',
      tone: 'indigo',
      heading: translate({id: 'features.group.core', message: '备份核心'}),
      features: [
        {
          icon: <FaBolt />,
          title: translate({id: 'features.7zip.title', message: '7-Zip 压缩引擎'}),
          description: translate({id: 'features.7zip.desc', message: '基于 7z 格式的高效压缩，节省磁盘空间，备份速度更快。'}),
          link: '/docs/guides/backup-modes',
          linkText: translate({id: 'features.7zip.link', message: '查看备份模式'}),
        },
        {
          icon: <FaArrowsRotate />,
          title: translate({id: 'features.modes.title', message: 'Full、Smart 与 Rolling'}),
          description: translate({id: 'features.modes.desc', message: '按场景选择完整捕获、变更捕获或不可变 Rolling 归档，并核对保留策略。'}),
          link: '/docs/guides/backup-modes',
          linkText: translate({id: 'features.modes.link', message: '了解备份模式'}),
        },
        {
          icon: <FaLock />,
          title: translate({id: 'features.encryption.title', message: '加密备份'}),
          description: translate({id: 'features.encryption.desc', message: '使用 AES-256 加密备份文件，确保敏感数据安全。'}),
          link: '/docs/guides/encryption',
          linkText: translate({id: 'features.encryption.link', message: '查看加密指南'}),
        },
      ],
    },
    {
      key: 'safety',
      tone: 'teal',
      heading: translate({id: 'features.group.safety', message: '自动化与安全'}),
      features: [
        {
          icon: <FaClock />,
          title: translate({id: 'features.automation.title', message: '自动化与远程命令'}),
          description: translate({id: 'features.automation.desc', message: '支持间隔、定时、条件任务，并通过 KnotLink 参数化协议触发远程操作。'}),
          link: '/docs/guides/automation',
          linkText: translate({id: 'features.automation.link', message: '查看自动化指南'}),
        },
        {
          icon: <FaShieldHalved />,
          title: translate({id: 'features.i18n.title', message: '安全还原'}),
          description: translate({id: 'features.i18n.desc', message: '核对目标、受管范围与保护选项；部分捕获强制 Overwrite，普通还原与分支切换职责不同。'}),
          link: '/docs/getting-started/first-restore',
          linkText: translate({id: 'features.i18n.link', message: '查看还原指南'}),
        },
        {
          icon: <FaTimeline />,
          title: translate({id: 'features.timeline.title', message: '历史版本、分支与恢复点'}),
          description: translate({id: 'features.timeline.desc', message: '检查版本、运行与云副本，管理分支和恢复点，按可还原依赖保留数据。'}),
          link: '/docs/guides/history-timeline',
          linkText: translate({id: 'features.timeline.link', message: '查看历史指南'}),
        },
      ],
    },
    {
      key: 'eco',
      tone: 'amber',
      heading: translate({id: 'features.group.eco', message: '生态扩展'}),
      features: [
        {
          icon: <FaPuzzlePiece />,
          title: translate({id: 'features.plugins.title', message: '插件系统'}),
          description: translate({id: 'features.plugins.desc', message: '通过独立 SDK 注册发现、范围、一致性、命令和受控还原能力。'}),
          link: '/docs/plugins/overview',
          linkText: translate({id: 'features.plugins.link', message: '查看插件文档'}),
        },
        {
          icon: <FaWindowRestore />,
          title: translate({id: 'features.miniwindow.title', message: 'Mini 悬浮窗'}),
          description: translate({id: 'features.miniwindow.desc', message: '在游戏或工作中通过迷你窗口随时监控与即时备份。'}),
          link: '/docs/guides/mini-window',
          linkText: translate({id: 'features.miniwindow.link', message: '查看悬浮窗指南'}),
        },
        {
          icon: <FaCloudArrowUp />,
          title: translate({id: 'features.knotlink.title', message: '云同步与外部工具'}),
          description: translate({id: 'features.knotlink.desc', message: '支持调用 rclone 等第三方工具，将备份同步到云端或其他存储。'}),
          link: '/docs/guides/cloud-archive',
          linkText: translate({id: 'features.knotlink.link', message: '查看云存档指南'}),
        },
      ],
    },
  ];
}

function Feature({icon, tone, title, description, link, linkText}: FeatureItem & {tone: FeatureTone}) {
  return (
    <div className="col col--4">
      <div className={styles.featureCard}>
        <div className={`feature-icon-wrap feature-icon-wrap--${tone}`}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
        <Link className={styles.featureLink} to={link}>
          {linkText} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  const groups = useFeatureGroups();
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionHeading)}>
          <Translate id="features.heading">核心功能</Translate>
        </Heading>
        <p className={clsx('text--center', styles.sectionSub)}>
          <Translate id="features.subheading">FolderRewind 覆盖从备份、同步到安全回滚的完整链路</Translate>
        </p>
        {groups.map((group) => (
          <div className={styles.group} key={group.key}>
            <Heading as="h3" className={styles.groupHeading}>
              <span aria-hidden="true" className={styles.groupDot} data-tone={group.tone} />
              {group.heading}
            </Heading>
            <div className="row">
              {group.features.map((props, idx) => (
                <Feature key={idx} tone={group.tone} {...props} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
