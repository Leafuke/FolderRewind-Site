import type {ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {
  FaWindows,
  FaGamepad,
  FaArrowRight,
  FaDesktop,
  FaMicrochip,
  FaCode,
  FaHardDrive,
  FaBoxOpen,
  
} from 'react-icons/fa6';

import styles from './download.module.css';
import SiteSurface from '@site/src/components/SiteSurface';

const STORE_URL = 'https://apps.microsoft.com/detail/9nwsdgxdqws4';
const GITHUB_LATEST_RELEASE_URL = 'https://github.com/Leafuke/FolderRewind/releases/latest';
const MINEREWIND_LATEST_RELEASE_URL =
  'https://github.com/Leafuke/FolderRewind-Plugin-Minecraft/releases/latest';

export default function Download(): ReactNode {
  return (
    <Layout title={translate({id: 'download.title', message: '下载'})} description={translate({id: 'download.description', message: "下载 FolderRewind Windows 版：选择 Microsoft Store 或 x64、ARM64 Setup EXE，了解安装渠道、系统要求和内置 MineRewind 插件。"})}>
      <SiteSurface>
      <main className={styles.page}>
        <header className={styles.hero}>
        <p className={styles.eyebrow}>01 / <Translate id="download.title">下载</Translate></p>
        <Heading as="h1" className={styles.title}>
          <Translate id="download.heading">下载 FolderRewind</Translate>
        </Heading>
        <p className={styles.subtitle}>
          <Translate id="download.subheading">选择适合设备的安装方式，从一次备份开始</Translate>
        </p>
        <div className={styles.versionLine}><span>FolderRewind 1.9.6</span><span>Windows 10 / 11</span><span>x64 / ARM64</span><span><Translate id="homepage.v2.free">免费 · 开源</Translate></span></div>
        </header>

        <section>
          <div className={styles.channelGrid}>
            {/* Microsoft Store */}
            <div className={styles.channelColumn}>
              <div className={styles.downloadCard}>
                <div className="download-icon-wrap download-icon-wrap--store">
                  <FaWindows />
                </div>
                <Heading as="h2" className={styles.cardTitle}>Microsoft Store</Heading>
                <span className={styles.badge}><Translate id="download.badge.recommended">推荐</Translate></span>
                <p className={styles.cardDesc}><Translate id="download.store.desc">自动更新、安装简单，也更适合作为长期安装方式。</Translate></p>
                <Link className={clsx('button button--primary button--lg', styles.cardBtn)} href={STORE_URL}>
                  <FaWindows style={{marginRight: '0.4rem', verticalAlign: '-1px'}} />
                  <Translate id="download.store.btn">打开 Microsoft Store</Translate>
                </Link>
              </div>
            </div>

            {/* Setup EXE */}
            <div className={styles.channelColumn}>
              <div className={styles.downloadCard}>
                <div className="download-icon-wrap download-icon-wrap--github">
                  <FaBoxOpen />
                </div>
                <Heading as="h2" className={styles.cardTitle}>Setup EXE</Heading>
                <span className={styles.badgeWarn}><Translate id="download.badge.msi">GitHub 正式版</Translate></span>
                <p className={styles.cardDesc}><Translate id="download.msi.desc">GitHub 当前正式版为 1.9.6。选择 x64 或 ARM64 Setup EXE，按同名 .sha256 文件校验。</Translate></p>
                <Link
                  className={clsx('button button--outline button--primary button--lg', styles.cardBtn)}
                  href={GITHUB_LATEST_RELEASE_URL}>
                  <FaBoxOpen style={{marginRight: '0.4rem', verticalAlign: '-1px'}} />
                  <Translate id="download.msi.btn">查看 Setup EXE 发布包</Translate>
                </Link>
              </div>
            </div>

          </div>

          <p className={styles.architectureHint}>
            <Translate id="download.archHint">大多数 Intel/AMD 电脑请选择 x64；仅 Windows on ARM 设备选择 ARM64。</Translate>
          </p>
        </section>

        {/* 安装与升级提醒：置于下载渠道之后，避免警示信息抢占首屏主行动区 */}
        <section className={clsx('margin-top--xl', styles.noticeSection)}>
          <div className={styles.noticeBox}>
            <Heading as="h2" className={styles.noticeTitle}>
              <Translate id="download.notice.title">安装与升级提醒</Translate>
            </Heading>
            <p className={styles.noticeText}>
              <Translate id="download.notice.desc">升级前保留配置和归档。切换安装渠道时，先导出配置与历史，再在新安装中导入并检查来源路径。</Translate>
            </p>
            <ul className={styles.noticeList}>
              <li><Translate id="download.notice.point1">建议优先从 Microsoft Store 下载，后续更新更稳定。</Translate></li>
              <li><Translate id="download.notice.point2">请勿同时安装 Store 与 Setup 版本。</Translate></li>
              <li><Translate id="download.notice.point3">切换安装渠道不会自动迁移配置或插件，请先备份数据。</Translate></li>
            </ul>
            <Link className={styles.noticeLink} to="/docs/getting-started/v1-9-upgrade">
              <Translate id="download.notice.upgradeLink">查看 1.9 升级与恢复指南</Translate>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* 系统要求 */}
        <section className="margin-top--xl">
          <p className={styles.eyebrow}>02 / <Translate id="download.sysreq.heading">系统要求</Translate></p>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="download.sysreq.heading">系统要求</Translate>
          </Heading>
          <div className={styles.sysReqGrid}>
            <div className={styles.sysReqCard}>
              <div className={styles.sysReqIcon}><FaDesktop /></div>
              <div className={styles.sysReqLabel}><Translate id="download.sysreq.os">操作系统</Translate></div>
              <div className={styles.sysReqValue}>Windows 10 1809+ / Windows 11</div>
            </div>
            <div className={styles.sysReqCard}>
              <div className={styles.sysReqIcon}><FaMicrochip /></div>
              <div className={styles.sysReqLabel}><Translate id="download.sysreq.arch">架构</Translate></div>
              <div className={styles.sysReqValue}>x64 / ARM64</div>
            </div>
            <div className={styles.sysReqCard}>
              <div className={styles.sysReqIcon}><FaCode /></div>
              <div className={styles.sysReqLabel}><Translate id="download.sysreq.runtime">运行时</Translate></div>
              <div className={styles.sysReqValue}><Translate id="download.sysreq.runtime.value">.NET 10（应用内已包含）</Translate></div>
            </div>
            <div className={styles.sysReqCard}>
              <div className={styles.sysReqIcon}><FaHardDrive /></div>
              <div className={styles.sysReqLabel}><Translate id="download.sysreq.disk">磁盘空间</Translate></div>
              <div className={styles.sysReqValue}><Translate id="download.sysreq.disk.value">以正式安装器显示为准，备份另需空间</Translate></div>
            </div>
          </div>
        </section>

        {/* 插件下载 */}
        <section className="margin-top--xl">
          <p className={styles.eyebrow}>03 / <Translate id="download.plugin.heading">官方插件</Translate></p>
          <Heading as="h2" className={styles.sectionTitle}>
            <Translate id="download.plugin.heading">官方插件</Translate>
          </Heading>
          <div className="text--center">
            <div className={styles.pluginCard}>
              <div className="download-icon-wrap download-icon-wrap--store">
                <FaGamepad />
              </div>
              <Heading as="h3">MineRewind</Heading>
              <p className={styles.cardDesc}><Translate id="download.plugin.minerewind.desc">1.9.6 内置 MineRewind 1.9.8，支持 Java 地图预览、存档发现与区域备份。独立公开包仍为 1.9.5（API 3.6），不含地图预览；宿主支持 API 3.9。</Translate></p>
              <Link
                className="button button--outline button--primary"
                href={MINEREWIND_LATEST_RELEASE_URL}>
                <Translate id="download.plugin.downloadBtn">查看独立插件发布</Translate>
              </Link>
              <span style={{margin: '0 0.5rem'}} />
              <Link
                className="button button--outline button--secondary"
                to="/docs/guides/minecraft/overview">
                <Translate id="download.plugin.docsBtn">查看文档</Translate> <FaArrowRight style={{marginLeft: '0.3rem', fontSize: '0.75em'}} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      </SiteSurface>
    </Layout>
  );
}
