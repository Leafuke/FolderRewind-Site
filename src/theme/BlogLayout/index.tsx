import type {ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import type {Props} from '@theme/BlogLayout';
import SiteSurface from '@site/src/components/SiteSurface';
import styles from './styles.module.css';

export default function BlogLayout({sidebar, toc, children, hero, ...layoutProps}: Props & {hero?: ReactNode}) {
  const hasSidebar = !!sidebar?.items.length;
  return (
    <Layout {...layoutProps}>
      <SiteSurface>
        <div className={styles.layout}>
          {hero}
          <div className={clsx('row', styles.grid)}>
            <BlogSidebar sidebar={sidebar} />
            <main className={clsx('col', styles.main, hasSidebar ? (toc ? 'col--7' : 'col--9') : 'col--9 col--offset-1')}>
              {children}
            </main>
            {toc && <div className={clsx('col col--2', styles.toc)}>{toc}</div>}
          </div>
        </div>
      </SiteSurface>
    </Layout>
  );
}
