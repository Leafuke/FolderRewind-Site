import React from 'react';
import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {TitleFormatterProvider} from '@docusaurus/theme-common/internal';

// 站点标题后缀按语言区分：英文页使用纯品牌名，避免中文副标题混入英文 SERP
const siteTitleByLocale: Record<string, string> = {
  en: 'FolderRewind',
};

type TitleFormatterParams = {
  title: string;
  siteTitle: string;
  titleDelimiter: string;
  defaultFormatter: (params: {
    title: string;
    siteTitle: string;
    titleDelimiter: string;
  }) => string;
};

export default function ThemeProviderTitleFormatter({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const {siteConfig, i18n} = useDocusaurusContext();
  const siteTitle = siteTitleByLocale[i18n.currentLocale] ?? siteConfig.title;
  const formatter = ({defaultFormatter, ...params}: TitleFormatterParams) =>
    defaultFormatter({...params, siteTitle});
  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  );
}
