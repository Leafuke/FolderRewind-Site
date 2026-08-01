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

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
};

function useFeatureList(): FeatureItem[] {
  return [
    {
      icon: <FaBolt />,
      title: translate({id: 'features.7zip.title', message: '7-Zip 压缩引擎'}),
      description: translate({id: 'features.7zip.desc', message: '基于 7z 格式的高效压缩，节省磁盘空间，备份速度更快。'}),
      link: '/docs/guides/backup-modes',
      linkText: translate({id: 'features.7zip.link', message: '查看备份模式'}),
    },
    {
      icon: <FaArrowsRotate />,
      title: translate({id: 'features.modes.title', message: '全量、增量与覆写'}),
      description: translate({id: 'features.modes.desc', message: '按场景选择全量、智能增量、轻量或覆写策略，并控制增量链长度。'}),
      link: '/docs/guides/backup-modes',
      linkText: translate({id: 'features.modes.link', message: '了解备份模式'}),
    },
    {
      icon: <FaClock />,
      title: translate({id: 'features.automation.title', message: '自动化与远程命令'}),
      description: translate({id: 'features.automation.desc', message: '支持间隔、定时、条件任务，并通过 KnotLink 参数化协议触发远程操作。'}),
      link: '/docs/guides/automation',
      linkText: translate({id: 'features.automation.link', message: '查看自动化指南'}),
    },
    {
      icon: <FaLock />,
      title: translate({id: 'features.encryption.title', message: '加密备份'}),
      description: translate({id: 'features.encryption.desc', message: '使用 AES-256 加密备份文件，确保敏感数据安全。'}),
      link: '/docs/guides/encryption',
      linkText: translate({id: 'features.encryption.link', message: '查看加密指南'}),
    },
    {
      icon: <FaShieldHalved />,
      title: translate({id: 'features.i18n.title', message: '安全还原'}),
      description: translate({id: 'features.i18n.desc', message: 'Clean 模式创建安全快照；部分备份还原强制使用 Overwrite，绝不清空未备份文件。'}),
      link: '/docs/getting-started/first-restore',
      linkText: translate({id: 'features.i18n.link', message: '查看还原指南'}),
    },
    {
      icon: <FaTimeline />,
      title: translate({id: 'features.timeline.title', message: '历史时间轴与安全删除'}),
      description: translate({id: 'features.timeline.desc', message: '查看、标记、重建与删除历史；在增量模式下尽量避免链断裂。'}),
      link: '/docs/guides/history-timeline',
      linkText: translate({id: 'features.timeline.link', message: '查看历史指南'}),
    },
    {
      icon: <FaPuzzlePiece />,
      title: translate({id: 'features.plugins.title', message: '插件系统'}),
      description: translate({id: 'features.plugins.desc', message: '插件可扩展备份范围、KnotLink 命令、还原拦截和配置字段。'}),
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
  ];
}

function Feature({icon, title, description, link, linkText}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="feature-icon-wrap">{icon}</div>
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
  const FeatureList = useFeatureList();
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionHeading)}>
          <Translate id="features.heading">核心功能</Translate>
        </Heading>
        <p className={clsx('text--center', styles.sectionSub)}>
          <Translate id="features.subheading">FolderRewind 覆盖从备份、同步到安全回滚的完整链路</Translate>
        </p>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
