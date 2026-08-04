import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './404.module.css';

export default function NotFound(): ReactNode {
  return (
    <Layout
      title={translate({
        id: 'notFound.title',
        message: '页面未找到',
      })}
      description={translate({
        id: 'notFound.description',
        message: '你访问的页面不存在或已经移动。',
      })}>
      <main className={styles.container}>
        <div className={styles.content}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <Heading as="h1">
            <Translate id="notFound.heading">页面未找到</Translate>
          </Heading>
          <p className={styles.message}>
            <Translate id="notFound.message">
              你访问的页面不存在或已经移动。试试下面的入口吧。
            </Translate>
          </p>

          <div className={styles.actions}>
            <Link className="button button--primary" to="/docs/intro">
              <Translate id="notFound.quickStart">返回快速开始</Translate>
            </Link>
            <Link className="button button--outline button--primary" to="/download">
              <Translate id="notFound.download">前往下载页</Translate>
            </Link>
          </div>

          <nav
            className={styles.links}
            aria-label={translate({
              id: 'notFound.moreDestinations',
              message: '更多入口',
            })}>
            <Link to="/blog">
              <Translate id="notFound.blog">查看更新日志</Translate>
            </Link>
            <Link href="https://github.com/Leafuke/FolderRewind/issues">
              <Translate id="notFound.issues">访问 GitHub Issues</Translate>
            </Link>
            <Link href="https://github.com/Leafuke/FolderRewind/discussions">
              <Translate id="notFound.discussions">参与 GitHub Discussions</Translate>
            </Link>
          </nav>
        </div>
      </main>
    </Layout>
  );
}
