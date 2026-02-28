import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {FaWindows, FaGithub, FaGamepad, FaArrowRight, FaDesktop, FaMicrochip, FaCode, FaHardDrive} from 'react-icons/fa6';

import styles from './download.module.css';

const STORE_URL = 'https://apps.microsoft.com/detail/9nwsdgxdqws4';
const GITHUB_RELEASE_URL = 'https://github.com/Leafuke/FolderRewind/releases';

export default function Download(): ReactNode {
  return (
    <Layout title={translate({id: 'download.title', message: '下载'})} description={translate({id: 'download.description', message: '下载 FolderRewind — 存档时光机'})}>
      <main className="container margin-vert--xl">
        <Heading as="h1" className="text--center">
          <Translate id="download.heading">下载 FolderRewind</Translate>
        </Heading>
        <p className="text--center text--lg margin-bottom--lg" style={{color: 'var(--ifm-color-emphasis-700)'}}>
          <Translate id="download.subheading">选择最适合你的安装方式</Translate>
        </p>

        <div className="row" style={{justifyContent: 'center'}}>
          {/* Microsoft Store */}
          <div className="col col--5">
            <div className={styles.downloadCard}>
              <div className="download-icon-wrap download-icon-wrap--store">
                <FaWindows />
              </div>
              <Heading as="h2" className={styles.cardTitle}>Microsoft Store</Heading>
              <span className={styles.badge}><Translate id="download.badge.recommended">推荐</Translate></span>
              <p className={styles.cardDesc}><Translate id="download.store.desc">自动更新，安全沙箱运行，一键安装。</Translate></p>
              <Link className="button button--primary button--lg" href={STORE_URL}>
                <FaWindows style={{marginRight: '0.4rem', verticalAlign: '-1px'}} />
                <Translate id="download.store.btn">打开 Microsoft Store</Translate>
              </Link>
            </div>
          </div>

          {/* GitHub Release */}
          <div className="col col--5">
            <div className={styles.downloadCard}>
              <div className="download-icon-wrap download-icon-wrap--github">
                <FaGithub />
              </div>
              <Heading as="h2" className={styles.cardTitle}>GitHub Release</Heading>
              <span className={styles.badgeAlt}><Translate id="download.badge.sideload">侧载</Translate></span>
              <p className={styles.cardDesc}><Translate id="download.github.desc">下载压缩包并使用 PowerShell 脚本安装。</Translate></p>
              <Link
                className="button button--outline button--primary button--lg"
                href={GITHUB_RELEASE_URL}>
                <FaGithub style={{marginRight: '0.4rem', verticalAlign: '-1px'}} />
                <Translate id="download.github.btn">前往 GitHub Releases</Translate>
              </Link>
            </div>
          </div>
        </div>

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
              <div className={styles.sysReqValue}><Translate id="download.sysreq.disk.value">约 180 MB（不含备份数据）</Translate></div>
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
              <Heading as="h3">MineRewind v1.4.0</Heading>
              <p className={styles.cardDesc}><Translate id="download.plugin.minerewind.desc">Minecraft 存档增强插件 —— 自动发现存档、热备份、版本识别。</Translate></p>
              <Link
                className="button button--outline button--primary"
                href={GITHUB_RELEASE_URL}>
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
