import Head from '@docusaurus/Head';
import {useRef} from 'react';
import useScrollReveal from '../components/Homepage/useScrollReveal';
import Layout from '@theme/Layout';
import {translate} from '@docusaurus/Translate';
import {Hero, Start, Ecosystem, Download, STORE_URL} from '../components/Homepage';
import Preview from '../components/Homepage/Preview';
import HomepageFeatures from '../components/HomepageFeatures';
import {useHomepageCopy} from '../components/Homepage/copy';
import styles from '../components/Homepage/styles.module.css';
export default function Home() {
  const main = useRef<HTMLElement>(null);
  useScrollReveal(main);
  const copy = useHomepageCopy();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FolderRewind',
    alternateName: '存档时光机',
    applicationCategory: 'BackupApplication',
    operatingSystem: 'Windows 10, Windows 11',
    description: copy.seo,
    url: 'https://folderrewind.top/',
    image: 'https://folderrewind.top/img/ori.webp',
    downloadUrl: STORE_URL,
    sameAs: ['https://github.com/Leafuke/FolderRewind'],
  };
  return (
    <Layout
      wrapperClassName={styles.homepage}
      title={translate({id: 'homepage.layout.title', message: '首页'})}
      description={copy.seo}
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>
      <main ref={main} className={styles.home}>
        <Hero />
        <Start />
        <Preview />
        <HomepageFeatures />
        <Ecosystem />
        <Download />
      </main>
    </Layout>
  );
}
