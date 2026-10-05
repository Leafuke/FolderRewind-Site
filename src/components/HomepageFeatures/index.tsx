import Link from '@docusaurus/Link';
import {useHomepageCopy} from '../Homepage/copy';
import styles from '../Homepage/styles.module.css';
export default function HomepageFeatures() {
  const c = useHomepageCopy();
  const features = [
    {
      title: c.featureBackup,
      description: c.featureBackupCopy,
      href: '/docs/guides/backup-modes',
      label: c.modesLink,
    },
    {
      title: c.featureHistory,
      description: c.featureHistoryCopy,
      href: '/docs/guides/history-timeline',
      label: c.historyLink,
    },
    {
      title: c.featureAuto,
      description: c.featureAutoCopy,
      href: '/docs/guides/automation',
      label: c.autoLink,
    },
  ];
  return (
    <section id="features" className={styles.featuresSection} aria-labelledby="features-heading">
      <div className={`${styles.container} ${styles.featureGrid}`}>
        <div>
          <p className={styles.eyebrow}>03 / {c.featuresLabel}</p>
          <h2 id="features-heading">{c.featuresTitle}</h2>
          <p className={styles.featureIntro}>{c.featuresCopy}</p>
        </div>
        <div>
          {features.map((feature, i) => (
            <article className={styles.featureRow} key={feature.href}>
              <span className={styles.stepNumber}>0{i + 1}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.href}>
                  {feature.label} <span aria-hidden="true">↗</span>
                </Link>
                {i === 2 && (
                  <Link className={styles.cloudLink} to="/docs/guides/cloud-archive">
                    {c.cloudLink} <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
