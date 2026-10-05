import Link from '@docusaurus/Link';
import {FaWindows, FaArrowRight, FaGamepad, FaPuzzlePiece} from 'react-icons/fa6';
import Screenshot from './Screenshot';
import Particles from './Particles';
import {useHomepageCopy} from './copy';
import styles from './styles.module.css';

export const STORE_URL = 'https://apps.microsoft.com/detail/9nwsdgxdqws4';
export function Hero() {
  const c = useHomepageCopy();
  return (
    <header className={styles.hero}>
      <Particles />
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <img className={styles.logo} src="/img/logo.png" alt="" width="80" height="80" />
          <h1>FolderRewind</h1>
          <p className={styles.tagline}>{c.tagline}</p>
          <p className={styles.heroDescription}>{c.heroCopy}</p>
          <div className={styles.actions}>
            <Link href={STORE_URL} className={styles.primary}>
              <FaWindows aria-hidden="true" />
              {c.store}
            </Link>
            <Link to="/docs/intro" className={styles.secondary}>
              {c.quick}
              <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
          <Link className={styles.subtleLink} to="/download">
            {c.other} <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className={styles.heroImage}>
          <Screenshot scene="home" hero />
        </div>
      </div>
      <div className={`${styles.container} ${styles.specs}`}>
        <span>{c.free}</span>
        <span>Windows 10 / 11</span>
        <span>WinUI 3</span>
        <a href="#preview">
          {c.navPreview}
          <span aria-hidden="true"> ↓</span>
        </a>
      </div>
    </header>
  );
}
export function Start() {
  const c = useHomepageCopy();
  const steps = [
    {title: c.install, description: c.installCopy, href: '/docs/getting-started/installation'},
    {title: c.backup, description: c.backupCopy, href: '/docs/getting-started/first-backup'},
    {title: c.verify, description: c.verifyCopy, href: '/docs/getting-started/first-restore'},
  ];
  return (
    <section className={styles.section} id="start" aria-labelledby="start-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>01 / {c.startLabel}</p>
        <div className={styles.sectionIntro}>
          <h2 id="start-heading">{c.startTitle}</h2>
          <p>{c.startCopy}</p>
        </div>
        <div className={styles.startGrid}>
          {steps.map((step, i) => (
            <Link to={step.href} className={styles.startCard} key={step.href}>
              <span className={styles.stepNumber}>0{i + 1}</span>
              <h3>
                {step.title}
                <span aria-hidden="true">↗</span>
              </h3>
              <p>{step.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Ecosystem() {
  const c = useHomepageCopy();
  return (
    <section id="ecosystem" className={styles.section} aria-labelledby="ecosystem-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>04 / {c.ecoLabel}</p>
        <h2 id="ecosystem-heading">{c.ecoTitle}</h2>
        <div className={styles.ecoGrid}>
          <article className={styles.ecoCard}>
            <FaGamepad className={styles.ecoIcon} aria-hidden="true" />
            <h3>{c.game}</h3>
            <p>{c.gameCopy}</p>
            <Link to="/docs/guides/minecraft/overview">
              {c.gameLink} <span aria-hidden="true">↗</span>
            </Link>
          </article>
          <article className={styles.ecoCard}>
            <FaPuzzlePiece className={styles.ecoIcon} aria-hidden="true" />
            <h3>{c.plugins}</h3>
            <p>{c.pluginsCopy}</p>
            <Link to="/docs/plugins/developing/quick-start">
              {c.pluginsLink} <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
export function Download() {
  const c = useHomepageCopy();
  return (
    <section id="download" className={styles.downloadSection} aria-labelledby="download-heading">
      <div className={`${styles.container} ${styles.downloadGrid}`}>
        <div>
          <p className={styles.eyebrow}>05 / {c.downloadLabel}</p>
          <h2 id="download-heading">{c.downloadTitle}</h2>
          <p className={styles.downloadCopy}>{c.downloadCopy}</p>
        </div>
        <div className={styles.downloadPanel}>
          <FaWindows className={styles.downloadIcon} aria-hidden="true" />
          <p>
            {c.system}
            <br />
            <span>{c.architecture}</span>
          </p>
          <Link href={STORE_URL} className={styles.primary}>
            {c.store}
            <span aria-hidden="true">↗</span>
          </Link>
          <div className={styles.downloadLinks}>
            <Link to="/download">{c.other}</Link>
            <Link to="/docs/getting-started/installation">{c.installation} ↗</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
