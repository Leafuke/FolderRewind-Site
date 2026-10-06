/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {type ReactNode} from 'react';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@site/src/theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import Heading from '@theme/Heading';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const {metadata, items, sidebar} = props;
  const {i18n} = useDocusaurusContext();
  const dateFormat = new Intl.DateTimeFormat(i18n.currentLocale === 'en' ? 'en' : 'zh-CN', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'});
  return (
    <BlogLayout sidebar={sidebar} hero={
      <header className={styles.hero}>
        <p className={styles.eyebrow}>FolderRewind / <Translate id="changelog.eyebrow">版本记录</Translate></p>
        <Heading as="h1">{metadata.blogTitle}</Heading>
        <p className={styles.description}><Translate id="changelog.description">看看最近的改进，了解每个版本带来了什么。</Translate></p>
        <div className={styles.actions}>
          <Link to="/download"><Translate id="changelog.download">获取最新版本</Translate><span aria-hidden="true">↗</span></Link>
          <Link to="/docs/intro"><Translate id="changelog.guide">阅读使用指南</Translate><span aria-hidden="true">↗</span></Link>
        </div>
      </header>
    }>
      <div className={styles.list}>
        {items.map(({content: Content}) => {
          const post = Content.metadata;
          return <Link className={styles.entry} to={post.permalink} key={post.permalink}>
            <div className={styles.meta}><time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time></div>
            <Heading as="h2">{post.title}</Heading>
            <p>{post.description}</p>
            <span className={styles.read}><Translate id="changelog.read">阅读更新说明</Translate><span aria-hidden="true">↗</span></span>
          </Link>;
        })}
      </div>
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
