import type {ReactNode} from 'react';
import {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const STORAGE_KEY = 'folderrewind-preferred-locale';

type SiteLocale = 'en' | 'zh-Hans';

function normalizeLocale(value: string | null): SiteLocale | null {
  if (!value) {
    return null;
  }

  const locale = value.toLowerCase();
  if (locale.startsWith('en')) {
    return 'en';
  }
  if (locale.startsWith('zh')) {
    return 'zh-Hans';
  }
  return null;
}

function stripBaseUrl(pathname: string, baseUrl: string): string {
  if (baseUrl === '/' || !pathname.startsWith(baseUrl)) {
    return pathname;
  }

  const strippedPath = pathname.slice(baseUrl.length - 1);
  return strippedPath.startsWith('/') ? strippedPath : `/${strippedPath}`;
}

function addBaseUrl(pathname: string, baseUrl: string): string {
  if (baseUrl === '/') {
    return pathname;
  }

  return `${baseUrl.replace(/\/$/, '')}${pathname}`;
}

function isEnglishPath(pathname: string): boolean {
  return pathname === '/en' || pathname.startsWith('/en/');
}

function toEnglishPath(pathname: string): string {
  if (isEnglishPath(pathname)) {
    return pathname;
  }

  return pathname === '/' ? '/en/' : `/en${pathname}`;
}

function prefersEnglish(languages: readonly string[]): boolean {
  return languages.some((language) => language.toLowerCase().startsWith('en'));
}

export default function Root({children}: {children: ReactNode}): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const localeLink = target.closest('a[lang]');
      if (!(localeLink instanceof HTMLAnchorElement)) {
        return;
      }

      const locale = normalizeLocale(localeLink.getAttribute('lang'));
      if (locale) {
        window.localStorage.setItem(STORAGE_KEY, locale);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const currentPath = stripBaseUrl(window.location.pathname, siteConfig.baseUrl);

    if (isEnglishPath(currentPath)) {
      return;
    }

    const storedLocale = normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
    const browserLanguages = window.navigator.languages?.length
      ? window.navigator.languages
      : [window.navigator.language];
    const preferredLocale = storedLocale ?? (prefersEnglish(browserLanguages) ? 'en' : 'zh-Hans');

    if (preferredLocale !== 'en') {
      return;
    }

    const nextPath = toEnglishPath(currentPath);
    const nextUrl = `${addBaseUrl(nextPath, siteConfig.baseUrl)}${window.location.search}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.location.replace(nextUrl);
    }
  }, [location.pathname, siteConfig.baseUrl]);

  return <>{children}</>;
}