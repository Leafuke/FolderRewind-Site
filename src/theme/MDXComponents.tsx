import MDXComponents from '@theme-original/MDXComponents';
import type {MDXComponentsObject} from '@theme/MDXComponents';
import DocScreenshot from '@site/src/components/DocScreenshot';

export default {
  ...MDXComponents,
  img: DocScreenshot,
} satisfies MDXComponentsObject;
