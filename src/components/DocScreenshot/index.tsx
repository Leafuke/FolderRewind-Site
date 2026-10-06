import {useEffect, useRef, useState, type ComponentProps, type MouseEvent} from 'react';
import {createPortal} from 'react-dom';
import {translate} from '@docusaurus/Translate';
import MDXComponents from '@theme-original/MDXComponents';
import captureSizes from '@site/static/img/docs/v1-9-6/sizes.json';
import styles from './styles.module.css';

const Image = MDXComponents.img;

export default function DocScreenshot(props: ComponentProps<'img'>) {
  const compiledSource = typeof props.src === 'string' ? props.src : '';
  // Docusaurus rewrites Markdown image URLs into hashed assets at build time.
  // Resolve only known captures back to their public, themed responsive pair.
  const capturePath = Object.keys(captureSizes).sort((a, b) => Number(b.includes('/docs/')) - Number(a.includes('/docs/'))).find(path => {
    const filename = path.split('/').pop()!.replace(/\.webp$/, '');
    return compiledSource.endsWith(`/${filename}.webp`) ||
      new RegExp(`/${filename}-[a-f0-9]+\\.webp$`).test(compiledSource);
  });
  const source = capturePath ? `/${capturePath}` : compiledSource;
  const isCapture = /\/img\/(?:homepage|docs\/v1-9-6)\//.test(source);
  const themed = isCapture && source.includes('-light-');
  const metadata = (captureSizes as Record<string, {width: number; height: number; small: string; smallWidth: number}>)[source.replace(/^\//, '')];
  const width = metadata?.width ?? 1604;
  const height = metadata?.height ?? 1112;
  const variants = themed ? [source, source.replace('-light-', '-dark-')] : [source];
  const [preview, setPreview] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLAnchorElement | null>(null);
  const openLabel = translate({id: 'docScreenshot.open', message: '放大查看截图'});
  const closeLabel = translate({id: 'docScreenshot.close', message: '关闭截图'});

  useEffect(() => {
    if (!preview) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.showModal();
    return () => {
      document.body.style.overflow = previous;
      trigger.current?.focus({preventScroll: true});
    };
  }, [preview]);

  if (!isCapture) return <Image {...props} loading={props.loading ?? 'lazy'} decoding="async" />;

  function open(event: MouseEvent<HTMLAnchorElement>, src: string) {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
    event.preventDefault();
    trigger.current = event.currentTarget;
    setPreview(src);
  }

  return (
    <span className={styles.capture}>
      {variants.map((src, index) => (
        <a key={src} href={src} onClick={event => open(event, src)}
          className={themed ? (index === 0 ? styles.light : styles.dark) : undefined}
          aria-label={`${openLabel} — ${props.alt ?? ''}`}>
          <Image {...props} src={src}
            srcSet={`${src.replace(/-\d+\.webp$/, `-${metadata?.smallWidth ?? 800}.webp`)} ${metadata?.smallWidth ?? 800}w, ${src} ${width}w`}
            sizes="(max-width: 996px) 92vw, 760px"
            width={width} height={height} loading={props.loading ?? 'lazy'} decoding="async" />
          <span className={styles.hint} aria-hidden="true">↗ {openLabel}</span>
        </a>
      ))}
      {preview && createPortal(
        <dialog ref={dialog} className={styles.dialog} aria-label={props.alt}
          onClose={() => setPreview(null)}
          onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
          <div className={styles.toolbar}>
            <span>{props.alt}</span>
            <button type="button" autoFocus onClick={() => dialog.current?.close()}>{closeLabel} ×</button>
          </div>
          <div className={styles.scroll}><img src={preview} alt={props.alt} width={width} height={height} /></div>
        </dialog>, document.body,
      )}
    </span>
  );
}
