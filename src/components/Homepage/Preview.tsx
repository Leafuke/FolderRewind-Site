import {useState, useRef, type KeyboardEvent} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Screenshot from './Screenshot';
import {useHomepageCopy} from './copy';
import type {ScreenshotScene} from './screenshots';
import styles from './styles.module.css';

const scenes: ScreenshotScene[] = ['home', 'history', 'restore'];
const guides = {
  home: '/docs/guides/folder-management',
  history: '/docs/guides/history-timeline',
  restore: '/docs/getting-started/first-restore',
};
export default function Preview() {
  const copy = useHomepageCopy();
  const {i18n} = useDocusaurusContext();
  const [active, setActive] = useState<ScreenshotScene>('history');
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? 2
          : event.key === 'ArrowRight'
            ? (index + 1) % 3
            : event.key === 'ArrowLeft'
              ? (index + 2) % 3
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setActive(scenes[next]);
    tabs.current[next]?.focus();
  }
  return (
    <section id="preview" className={styles.previewSection} aria-labelledby="preview-heading">
      <div className={styles.container}>
        <p className={styles.eyebrow}>02 / {copy.previewLabel}</p>
        <div className={styles.sectionIntro}>
          <h2 id="preview-heading">{copy.previewTitle}</h2>
          <p>{copy.previewCopy}</p>
        </div>
        <div className={styles.tabs} role="tablist" aria-label={copy.previewLabel}>
          {scenes.map((scene, index) => (
            <button
              type="button"
              role="tab"
              id={`tab-${scene}`}
              aria-controls={`panel-${scene}`}
              aria-selected={active === scene}
              tabIndex={active === scene ? 0 : -1}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              onKeyDown={(event) => keyboard(event, index)}
              onClick={() => setActive(scene)}
              key={scene}
            >
              {copy[`${scene}Tab`]}
            </button>
          ))}
        </div>
        {scenes.map((scene) => (
          <div
            key={scene}
            id={`panel-${scene}`}
            role="tabpanel"
            aria-labelledby={`tab-${scene}`}
            hidden={active !== scene}
            tabIndex={0}
          >
            {active === scene && (
              <>
                <div className={styles.previewFrame}>
                  <Screenshot scene={scene} />
                </div>
                <div className={styles.caption}>
                  <p>{copy[`${scene}Caption`]}</p>
                  <Link to={guides[scene]}>
                    {copy.readGuide} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        ))}
        <p className={styles.version}>{copy.imageVersion}</p>
        <noscript>
          <p>
            {scenes.map((scene) => (
              <a
                key={scene}
                href={`/img/homepage/${scene}-${i18n.currentLocale === 'en' ? 'en' : 'zh'}-light-1604.webp`}
              >
                {copy[`${scene}Tab`]} ↗　
              </a>
            ))}
          </p>
        </noscript>
      </div>
    </section>
  );
}
