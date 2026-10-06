import type {ReactNode} from 'react';
import styles from './styles.module.css';

/** Public pages share the homepage's paper, typography and teal accents. */
export default function SiteSurface({children}: {children: ReactNode}) {
  return <div className={styles.surface}>{children}</div>;
}
