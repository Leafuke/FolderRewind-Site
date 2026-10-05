export type ScreenshotScene = 'home' | 'history' | 'restore';
export type ScreenshotLocale = 'zh' | 'en';
export type ScreenshotTheme = 'light' | 'dark';

export interface ScreenshotAsset {
  scene: ScreenshotScene;
  locale: ScreenshotLocale;
  theme: ScreenshotTheme;
  width: number;
  height: number;
  src: string;
  srcSet: string;
  original: string;
}

export function screenshotAsset(
  scene: ScreenshotScene,
  locale: ScreenshotLocale,
  theme: ScreenshotTheme,
): ScreenshotAsset {
  const base = `/img/homepage/${scene}-${locale}-${theme}`;
  return {
    scene,
    locale,
    theme,
    width: 1604,
    height: 1113,
    src: `${base}-1604.webp`,
    srcSet: `${base}-800.webp 800w, ${base}-1604.webp 1604w`,
    original: `${base}-1604.webp`,
  };
}
