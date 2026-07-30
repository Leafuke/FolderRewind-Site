import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {
  FaWindows,
  FaGithub,
  FaGamepad,
  FaArrowRight,
  FaDesktop,
  FaMicrochip,
  FaCode,
  FaHardDrive,
  FaBoxOpen,
  FaTerminal,
} from 'react-icons/fa6';

import styles from './download.module.css';

const STORE_URL = 'https://apps.microsoft.com/detail/9nwsdgxdqws4';
const GITHUB_LATEST_RELEASE_URL = 'https://github.com/Leafuke/FolderRewind/releases/latest';
const MINEREWIND_LATEST_RELEASE_URL =
  'https://github.com/Leafuke/FolderRewind-Plugin-Minecraft/releases/latest';

export default function Download(): ReactNode {
  return (
    <Layout title={translate({id: 'download.title', message: '下载'})} description={translate({id: 'download.description', message: '下载 FolderRewind — 存档时光机'})}>
      <main className="container margin-vert--xl">
        <Heading as="h1" className="text--center">
          <Translate id="download.heading">下载 FolderRewind</Translate>
        </Heading>
        <p className="text--center text--lg margin-bottom--lg" style={{color: 'var(--ifm-color-emphasis-700)'}}>
          <Translate id="download.subheading">优先使用商店版；升级后先做测试再上生产</Translate>
        </p>

        <section className={styles.noticeSection}>
          <div className={styles.noticeBox}>
            <Heading as="h2" className={styles.noticeTitle}>
              <Translate id="download.notice.title">安装与升级提醒</Translate>
            </Heading>
            <p className={styles.noticeText}>
              <Translate id="download.notice.desc">版本升级可能会调整备份与还原的细节行为。对于旧版本升级场景，请先在测试目录、测试项目或测试存档中验证结果，再投入生产使用。</Translate>
            </p>
            <ul className={styles.noticeList}>
              <li><Translate id="download.notice.point1">建议优先从 Microsoft Store 下载，后续更新更稳定。</Translate></li>
              <li><Translate id="download.notice.point2">请勿同时安装 Store、MSI 与 MSIX 版本。</Translate></li>
              <li><Translate id="download.notice.point3">切换安装渠道不会自动迁移配置或插件，请先备份数据。</Translate></li>
            </ul>
            <Link className={styles.noticeLink} to="/docs/getting-started/v1-8-upgrade">
              <Translate id="download.notice.upgradeLink">查看 1.8 升级与启动故障恢复指南</Translate>
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>

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
              <Link className="button button--primary button--lg" href={STORE_URL}>
                <FaWindows style={{marginRight: '0.4rem', verticalAlign: '-1px'}} />
                <Translate id="download.store.btn">打开 Microsoft Store</Translate>
              </Link>
            </div>
          </div>

          {/* MSI */}
          <div className={styles.channelColumn}>
            <div className={styles.downloadCard}>
              <div className="download-icon-wrap download-icon-wrap--github">
                <FaBoxOpen />
              </div>
              <Heading as="h2" className={styles.cardTitle}>MSI</Heading>
              <span className={styles.badgeAlt}><Translate id="download.badge.msi">普通侧载</Translate></span>
              <p className={styles.cardDesc}><Translate id="download.msi.desc">双击安装，无需开发人员模式；该分发格式仍在测试中，请核对同名 .sha256 文件。</Translate></p>
              <Link
                className="button button--outline button--primary button--lg"
                href={GITHUB_LATEST_RELEASE_URL}>
                <FaBoxOpen style={{marginRight: '0.4rem', verticalAlign: '-1px'}} />
                <Translate id="download.msi.btn">获取最新 MSI</Translate>
              </Link>
            </div>
          </div>

          {/* MSIX */}
          <div className={styles.channelColumn}>
            <div className={styles.downloadCard}>
              <div className="download-icon-wrap download-icon-wrap--github">
                <FaTerminal />
              </div>
              <Heading as="h2" className={styles.cardTitle}>MSIX (.7z)</Heading>
              <span className={styles.badgeAlt}><Translate id="download.badge.msix">高级侧载</Translate></span>
              <p className={styles.cardDesc}><Translate id="download.msix.desc">体验最接近 Store 版；需解压 .7z、启用开发人员模式并运行 install.ps1。</Translate></p>
              <Link
                className="button button--outline button--primary button--lg"
                href={GITHUB_LATEST_RELEASE_URL}>
                <FaTerminal style={{marginRight: '0.4rem', verticalAlign: '-1px'}} />
                <Translate id="download.msix.btn">获取最新 MSIX 包</Translate>
              </Link>
            </div>
          </div>
        </div>

        <p className={styles.architectureHint}>
          <Translate id="download.archHint">大多数 Intel/AMD 电脑请选择 x64；仅 Windows on ARM 设备选择 ARM64。</Translate>
        </p>

        {/* 系统要求 */}
        <section className="margin-top--xl">
          <Heading as="h2" className="text--center">
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
              <div className={styles.sysReqValue}><Translate id="download.sysreq.disk.value">约 80 MB（不含备份数据）</Translate></div>
            </div>
          </div>
        </section>

        {/* 插件下载 */}
        <section className="margin-top--xl">
          <Heading as="h2" className="text--center">
            <Translate id="download.plugin.heading">官方插件</Translate>
          </Heading>
          <div className="text--center">
            <div className={styles.pluginCard}>
              <div className="download-icon-wrap download-icon-wrap--store" style={{background: 'rgba(46,204,113,0.1)', color: '#27ae60'}}>
                <FaGamepad />
              </div>
              <Heading as="h3">MineRewind</Heading>
              <p className={styles.cardDesc}><Translate id="download.plugin.minerewind.desc">Minecraft 存档增强插件 —— 自动发现存档、热备份、版本识别。</Translate></p>
              <Link
                className="button button--outline button--primary"
                href={MINEREWIND_LATEST_RELEASE_URL}>
                <Translate id="download.plugin.downloadBtn">前往下载</Translate>
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
    </Layout>
  );
}
