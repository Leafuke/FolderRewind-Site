import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import {
  FaDownload,
  FaArrowRight,
  FaGamepad,
  FaFolderOpen,
  FaPuzzlePiece,
  FaCircleCheck,
  FaWindows,
} from 'react-icons/fa6';

import styles from './index.module.css';

const STORE_URL = 'https://apps.microsoft.com/detail/9nwsdgxdqws4';

/* ── Hero ──────────────────────────────────────────── */
function HomepageHero() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <Heading as="h1" className={clsx('hero__title', styles.heroTitle)}>
              <Translate id="homepage.hero.title">存档时光机</Translate>
            </Heading>
            <p className={styles.heroSubtitle}>
              <Translate id="homepage.hero.subtitle.line1">为 Minecraft 玩家打造的智能备份工具</Translate>
              <br />
              <Translate id="homepage.hero.subtitle.line2">也适用于一切珍贵文件</Translate>
            </p>

            <div className={styles.buttons}>
              <Link className={clsx('button button--lg', styles.btnPrimary)} href={STORE_URL}>
                <FaWindows style={{marginRight: '0.5rem', verticalAlign: '-2px'}} />
                <Translate id="homepage.hero.storeBtn">从 Microsoft Store 获取</Translate>
              </Link>
              <Link
                className={clsx('button button--lg', styles.btnSecondary)}
                to="/docs/intro">
                <Translate id="homepage.hero.quickStartBtn">快速上手</Translate>
                <FaArrowRight style={{marginLeft: '0.5rem', fontSize: '0.85em'}} />
              </Link>
            </div>

            <div className={styles.heroTrust}>
              <span><FaCircleCheck style={{marginRight: '0.35rem', verticalAlign: '-1px'}} /> <Translate id="homepage.hero.trust.openSource">开源免费</Translate></span>
              <span className={styles.trustDot}>·</span>
              <span>Windows 10 / 11</span>
              <span className={styles.trustDot}>·</span>
              <span>WinUI 3</span>
            </div>
          </div>
          <div className={styles.heroImage}>
            <img src="/img/ori.png" alt="FolderRewind Logo" />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ── 用户分层 ──────────────────────────────────────── */
type Segment = {
  icon: ReactNode;
  iconClass: string;
  title: string;
  desc: string;
  bullets: string[];
  link: string;
  linkText: string;
};

function useSegments(): Segment[] {
  return [
    {
      icon: <FaGamepad />,
      iconClass: 'segment-icon-wrap--gamer',
      title: translate({id: 'homepage.segment.gamer.title', message: '游戏玩家'}),
      desc: translate({id: 'homepage.segment.gamer.desc', message: '面向 Minecraft 的热备份与热还原场景'}),
      bullets: [
        translate({id: 'homepage.segment.gamer.bullet1', message: '热备份 / 热还原'}),
        translate({id: 'homepage.segment.gamer.bullet2', message: '存档自动发现'}),
        translate({id: 'homepage.segment.gamer.bullet3', message: 'MineRewind 与 KnotLink'}),
      ],
      link: '/docs/guides/minecraft/overview',
      linkText: translate({id: 'homepage.segment.gamer.link', message: 'MC 专题'}),
    },
    {
      icon: <FaFolderOpen />,
      iconClass: 'segment-icon-wrap--files',
      title: translate({id: 'homepage.segment.files.title', message: '文件管理者'}),
      desc: translate({id: 'homepage.segment.files.desc', message: '重要文件的版本化备份与安全回滚'}),
      bullets: [
        translate({id: 'homepage.segment.files.bullet1', message: '改进的智能增量链'}),
        translate({id: 'homepage.segment.files.bullet2', message: '安全还原与回滚'}),
        translate({id: 'homepage.segment.files.bullet3', message: '云同步与历史管理'}),
      ],
      link: '/docs/intro',
      linkText: translate({id: 'homepage.segment.files.link', message: '了解更多'}),
    },
    {
      icon: <FaPuzzlePiece />,
      iconClass: 'segment-icon-wrap--dev',
      title: translate({id: 'homepage.segment.dev.title', message: '插件开发者'}),
      desc: translate({id: 'homepage.segment.dev.desc', message: '扩展 FolderRewind 的备份与还原能力'}),
      bullets: [
        'Plugin SDK',
        'KnotLink IPC',
        translate({id: 'homepage.segment.dev.bullet3', message: '完整接管还原逻辑'}),
      ],
      link: '/docs/plugins/developing/quick-start',
      linkText: translate({id: 'homepage.segment.dev.link', message: '开发文档'}),
    },
  ];
}

function HomepageSegments() {
  const segments = useSegments();
  return (
    <section className={styles.segmentSection}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          <Translate id="homepage.segments.heading">为谁而建？</Translate>
        </Heading>
        <p className={clsx('text--center', styles.sectionDesc)}>
          <Translate id="homepage.segments.subheading">无论你是游戏爱好者、日常备份用户还是开发者——FolderRewind 都为你准备好了</Translate>
        </p>
        <div className="row">
          {segments.map((s, i) => (
            <div className="col col--4" key={i} style={{marginBottom: '1.5rem'}}>
              <div className="segment-card">
                <div className={clsx('segment-icon-wrap', s.iconClass)}>
                  {s.icon}
                </div>
                <Heading as="h3">{s.title}</Heading>
                <p className={styles.segmentDesc}>{s.desc}</p>
                <ul className={styles.segmentList}>
                  {s.bullets.map((b, j) => (
                    <li key={j}>
                      <FaCircleCheck className={styles.checkIcon} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link className="button button--outline button--primary button--sm" to={s.link}>
                  {s.linkText} <FaArrowRight style={{marginLeft: '0.3rem', fontSize: '0.75em'}} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3 步快速上手 ──────────────────────────────────── */
function HomepageQuickDemo() {
  const steps = [
    {num: 1, title: translate({id: 'homepage.steps.1.title', message: '安装'}), desc: translate({id: 'homepage.steps.1.desc', message: '优先使用 Microsoft Store，避免双版本混装'})},
    {num: 2, title: translate({id: 'homepage.steps.2.title', message: '添加文件夹'}), desc: translate({id: 'homepage.steps.2.desc', message: '创建配置，添加需要保护的文件夹'})},
    {num: 3, title: translate({id: 'homepage.steps.3.title', message: '验证'}), desc: translate({id: 'homepage.steps.3.desc', message: '先跑一轮测试备份与还原，再开启自动化'})},
  ];
  return (
    <section className={styles.quickDemo}>
      <div className="container">
        <Heading as="h2" className={clsx('text--center', styles.sectionTitle)}>
          <Translate id="homepage.quickdemo.heading">3 步开始使用</Translate>
        </Heading>
        <p className={clsx('text--center', styles.sectionDesc)}>
          <Translate id="homepage.quickdemo.subheading">从安装到第一次备份完成，只需几分钟</Translate>
        </p>
        <div className={styles.stepsRow}>
          {steps.map((s, idx) => (
            <div className={styles.stepCard} key={s.num}>
              <span className="step-number">{s.num}</span>
              <Heading as="h3" className={styles.stepTitle}>{s.title}</Heading>
              <p className={styles.stepDesc}>{s.desc}</p>
              {idx < steps.length - 1 && (
                <div className={styles.stepArrow}>
                  <FaArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text--center margin-top--lg">
          <Link className="button button--primary button--lg" to="/docs/intro">
            <Translate id="homepage.quickdemo.tutorialBtn">5 分钟上手教程</Translate> <FaArrowRight style={{marginLeft: '0.4rem', fontSize: '0.85em'}} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── CTA 横幅 ──────────────────────────────────────── */
function CtaBanner() {
  return (
    <section className={styles.ctaBanner}>
      <div className="container text--center">
        <Heading as="h2" className={styles.ctaTitle}>
          <Translate id="homepage.cta.title">准备好保护你的文件了吗？</Translate>
        </Heading>
        <p className={styles.ctaDesc}>
          <Translate id="homepage.cta.desc">免费下载，即刻开始使用存档时光机</Translate>
        </p>
        <div className={styles.ctaButtons}>
          <Link className={clsx('button button--lg', styles.btnPrimary)} href={STORE_URL}>
            <FaDownload style={{marginRight: '0.5rem', verticalAlign: '-1px'}} />
            <Translate id="homepage.cta.downloadBtn">立即下载</Translate>
          </Link>
          <Link
            className={clsx('button button--lg', styles.btnSecondary)}
            to="/download">
            <Translate id="homepage.cta.allDownloadsBtn">查看所有下载方式</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 首页组合 ──────────────────────────────────────── */
export default function Home(): ReactNode {
  return (
    <Layout
      title={translate({id: 'homepage.layout.title', message: '首页'})}
      description={translate({id: 'homepage.layout.description', message: 'FolderRewind — 面向重要文件、项目资料与游戏存档的现代备份工具'})}>
      <HomepageHero />
      <main>
        <HomepageSegments />
        <HomepageFeatures />
        <HomepageQuickDemo />
        <CtaBanner />
      </main>
    </Layout>
  );
}
