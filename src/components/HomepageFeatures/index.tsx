import type {ReactNode} from 'react';
import clsx from 'clsx';
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
  FaLink,
  FaGlobe,
} from 'react-icons/fa6';
import styles from './styles.module.css';

type FeatureItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

function useFeatureList(): FeatureItem[] {
  return [
    {
      icon: <FaBolt />,
      title: translate({id: 'features.7zip.title', message: '7-Zip 压缩引擎'}),
      description: translate({id: 'features.7zip.desc', message: '基于 7z 格式的高效压缩，节省磁盘空间，备份速度更快。'}),
    },
    {
      icon: <FaArrowsRotate />,
      title: translate({id: 'features.modes.title', message: '三种备份模式'}),
      description: translate({id: 'features.modes.desc', message: '完整备份、增量备份与差异备份，灵活应对不同场景。'}),
    },
    {
      icon: <FaClock />,
      title: translate({id: 'features.automation.title', message: '自动化调度'}),
      description: translate({id: 'features.automation.desc', message: '间隔备份、定时备份、启动时备份——设置一次，永久运行。'}),
    },
    {
      icon: <FaLock />,
      title: translate({id: 'features.encryption.title', message: '加密备份'}),
      description: translate({id: 'features.encryption.desc', message: '使用 AES-256 加密备份文件，确保敏感数据安全。'}),
    },
    {
      icon: <FaTimeline />,
      title: translate({id: 'features.timeline.title', message: '历史时间轴'}),
      description: translate({id: 'features.timeline.desc', message: '直观浏览备份历史，一键将文件夹回溯到任意时间点。'}),
    },
    {
      icon: <FaPuzzlePiece />,
      title: translate({id: 'features.plugins.title', message: '插件系统'}),
      description: translate({id: 'features.plugins.desc', message: '通过插件扩展功能——MineRewind 为 Minecraft 深度优化。'}),
    },
    {
      icon: <FaWindowRestore />,
      title: translate({id: 'features.miniwindow.title', message: 'Mini 悬浮窗'}),
      description: translate({id: 'features.miniwindow.desc', message: '在游戏或工作中通过迷你窗口随时监控与即时备份。'}),
    },
    {
      icon: <FaLink />,
      title: translate({id: 'features.knotlink.title', message: 'KnotLink IPC'}),
      description: translate({id: 'features.knotlink.desc', message: '进程间通信协议，让第三方工具与 FolderRewind 联动。'}),
    },
    {
      icon: <FaGlobe />,
      title: translate({id: 'features.i18n.title', message: '中英双语'}),
      description: translate({id: 'features.i18n.desc', message: '内置中英文界面，跟随系统语言自动切换。'}),
    },
  ];
}

function Feature({icon, title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="feature-icon-wrap">{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDesc}>{description}</p>
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
          <Translate id="features.subheading">FolderRewind 为你的文件提供全方位保护</Translate>
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
