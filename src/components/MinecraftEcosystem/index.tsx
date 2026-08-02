import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {
  FaCubes,
  FaServer,
  FaSkullCrossbones,
  FaTriangleExclamation,
} from 'react-icons/fa6';

import styles from './styles.module.css';

type EcosystemCard = {
  icon: ReactNode;
  iconClassName: string;
  title: ReactNode;
  description: ReactNode;
  audience: ReactNode;
  link: string;
};

const cards: EcosystemCard[] = [
  {
    icon: <FaCubes aria-hidden="true" />,
    iconClassName: styles.modIcon,
    title: <Translate id="minecraft.ecosystem.minebackupMod.title">MineBackup-Mod</Translate>,
    description: (
      <Translate id="minecraft.ecosystem.minebackupMod.description">
        游戏内联动模组，协调保存、退出、热备份、热还原与自动重进。
      </Translate>
    ),
    audience: (
      <Translate id="minecraft.ecosystem.minebackupMod.audience">
        Fabric / Forge / NeoForge 模组化服务端
      </Translate>
    ),
    link: '/docs/guides/minecraft/minebackup-mod',
  },
  {
    icon: <FaServer aria-hidden="true" />,
    iconClassName: styles.pluginIcon,
    title: <Translate id="minecraft.ecosystem.minebackupPlugin.title">MineBackupPlugin</Translate>,
    description: (
      <Translate id="minecraft.ecosystem.minebackupPlugin.description">
        Spigot/Paper 服务端联动插件，使用 Sidecar 安全交接世界还原。
      </Translate>
    ),
    audience: (
      <Translate id="minecraft.ecosystem.minebackupPlugin.audience">
        Spigot / Paper 专用服务器
      </Translate>
    ),
    link: '/docs/guides/minecraft/minebackup-plugin',
  },
  {
    icon: <FaSkullCrossbones aria-hidden="true" />,
    iconClassName: styles.deathIcon,
    title: <Translate id="minecraft.ecosystem.deathRewind.title">Death Rewind（死亡回溯）</Translate>,
    description: (
      <Translate id="minecraft.ecosystem.deathRewind.description">
        定时创建检查点，在单人死亡界面一键回到最新归档。
      </Translate>
    ),
    audience: (
      <Translate id="minecraft.ecosystem.deathRewind.audience">
        Fabric 单人世界 / LAN 房主
      </Translate>
    ),
    link: '/docs/guides/minecraft/death-rewind',
  },
  {
    icon: <FaTriangleExclamation aria-hidden="true" />,
    iconClassName: styles.accidentIcon,
    title: <Translate id="minecraft.ecosystem.jea.title">Just Enough Accidents（险兆备份）</Translate>,
    description: (
      <Translate id="minecraft.ecosystem.jea.description">
        检测高风险状态，并为事故现场创建可回溯的世界快照。
      </Translate>
    ),
    audience: (
      <Translate id="minecraft.ecosystem.jea.audience">
        Fabric / NeoForge / Forge 单人或 LAN 世界
      </Translate>
    ),
    link: '/docs/guides/minecraft/just-enough-accidents',
  },
];

export default function MinecraftEcosystem(): ReactNode {
  return (
    <section className={styles.section} aria-labelledby="minecraft-ecosystem-heading">
      <h2 id="minecraft-ecosystem-heading" className={styles.heading}>
        <Translate id="minecraft.ecosystem.heading">联动组件生态</Translate>
      </h2>
      <p className={styles.intro}>
        <Translate id="minecraft.ecosystem.intro">
          先按运行场景选择组件，再阅读对应页面中的安装步骤、版本矩阵和风险边界。
        </Translate>
      </p>
      <div className={styles.grid}>
        {cards.map((card) => (
          <Link className={styles.card} to={card.link} key={card.link}>
            <span className={`${styles.icon} ${card.iconClassName}`}>{card.icon}</span>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.description}>{card.description}</p>
            <span className={styles.audience}>{card.audience}</span>
            <span className={styles.readMore}>
              <Translate id="minecraft.ecosystem.readMore">查看组件说明 →</Translate>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
