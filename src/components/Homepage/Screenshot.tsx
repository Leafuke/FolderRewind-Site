import {useRef, useState, useEffect, type MouseEvent} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {screenshotAsset, type ScreenshotScene, type ScreenshotTheme} from './screenshots';
import {useHomepageCopy} from './copy';
import styles from './styles.module.css';

export default function Screenshot({
  scene,
  hero = false,
}: {
  scene: ScreenshotScene;
  hero?: boolean;
}) {
  const {i18n} = useDocusaurusContext();
  const copy = useHomepageCopy();
  const locale = i18n.currentLocale === 'en' ? 'en' : 'zh';
  const [previewTheme, setPreviewTheme] = useState<ScreenshotTheme>('light');
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const asset = screenshotAsset(scene, locale, previewTheme);
  const light = screenshotAsset(scene, locale, 'light');
  const dark = screenshotAsset(scene, locale, 'dark');
  const alt = copy[`${scene}Alt`];
  function preview(event: MouseEvent<HTMLAnchorElement>, theme: ScreenshotTheme) {
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      !dialog.current?.showModal
    )
      return;
    event.preventDefault();
    trigger.current = event.currentTarget;
    setPreviewTheme(theme);
    setOpen(true);
    dialog.current.showModal();
  }
  function closed() {
    setOpen(false);
    trigger.current?.focus({preventScroll: true});
  }
  return (
    <>
      {[light, dark].map((capture) => (
        <a
          key={capture.theme}
          href={capture.original}
          onClick={(event) => preview(event, capture.theme)}
          className={`${styles.screenshotLink} ${capture.theme === 'light' ? styles.lightCapture : styles.darkCapture}`}
          aria-label={`${copy.viewOriginal} — ${alt}`}
        >
          <img
            src={capture.src}
            srcSet={capture.srcSet}
            sizes={hero ? '(max-width: 996px) 92vw, 60vw' : '(max-width: 996px) 92vw, 1200px'}
            width={asset.width}
            height={asset.height}
            alt={alt}
            loading={hero ? 'eager' : 'lazy'}
            fetchPriority={hero ? 'high' : 'auto'}
            decoding="async"
          />
          <span className={styles.expandHint} aria-hidden="true">
            ↗ {copy.viewOriginal}
          </span>
        </a>
      ))}
      <dialog
        ref={dialog}
        className={styles.dialog}
        onClose={closed}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        aria-label={alt}
      >
        <div className={styles.dialogBar}>
          <span>{scene === 'merge' || scene === 'map' ? copy.newImageVersion : copy.imageVersion}</span>
          <button type="button" autoFocus onClick={() => dialog.current?.close()}>
            {copy.close} ×
          </button>
        </div>
        {open && (
          <div className={styles.dialogScroll}>
            <img src={asset.original} width={asset.width} height={asset.height} alt={alt} />
          </div>
        )}
      </dialog>
    </>
  );
}
