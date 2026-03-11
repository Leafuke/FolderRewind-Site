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
  FaCloudArrowUp,
  FaShieldHalved,
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
      title: translate({id: 'features.modes.title', message: '改进的智能增量'}),
      description: translate({id: 'features.modes.desc', message: 'v1.5.0 重构增量链逻辑，并支持链长截断，减少旧链问题。'}),
    },
    {
      icon: <FaClock />,
      title: translate({id: 'features.automation.title', message: '自动化与远程命令'}),
      description: translate({id: 'features.automation.desc', message: '支持间隔、定时、启动时任务，也能通过远程命令触发强制完整备份。'}),
    },
    {
      icon: <FaLock />,
      title: translate({id: 'features.encryption.title', message: '加密备份'}),
      description: translate({id: 'features.encryption.desc', message: '使用 AES-256 加密备份文件，确保敏感数据安全。'}),
    },
    {
      icon: <FaShieldHalved />,
      title: translate({id: 'features.i18n.title', message: '安全还原'}),
      description: translate({id: 'features.i18n.desc', message: 'Clean 模式下先创建安全快照，若还原异常可自动回滚到初始状态。'}),
    },
    {
      icon: <FaTimeline />,
      title: translate({id: 'features.timeline.title', message: '历史时间轴与安全删除'}),
      description: translate({id: 'features.timeline.desc', message: '查看、标记、重建与删除历史；在增量模式下尽量避免链断裂。'}),
    },
    {
      icon: <FaPuzzlePiece />,
      title: translate({id: 'features.plugins.title', message: '插件系统'}),
      description: translate({id: 'features.plugins.desc', message: '插件可深度介入备份与还原，特定场景下还可完全接管还原逻辑。'}),
    },
    {
      icon: <FaWindowRestore />,
      title: translate({id: 'features.miniwindow.title', message: 'Mini 悬浮窗'}),
      description: translate({id: 'features.miniwindow.desc', message: '在游戏或工作中通过迷你窗口随时监控与即时备份。'}),
    },
    {
      icon: <FaCloudArrowUp />,
      title: translate({id: 'features.knotlink.title', message: '云同步与外部工具'}),
      description: translate({id: 'features.knotlink.desc', message: '支持调用 rclone 等第三方工具，将备份同步到云端或其他存储。'}),
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
