import React, {type ComponentProps} from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import type {MDXComponentsObject} from '@theme/MDXComponents';

const MDXImage = MDXComponents.img;

export default {
  ...MDXComponents,
  img: (props: ComponentProps<'img'>) => (
    <MDXImage
      {...props}
      loading={props.loading ?? 'lazy'}
      decoding={props.decoding ?? 'async'}
    />
  ),
} satisfies MDXComponentsObject;
