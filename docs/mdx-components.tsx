import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    img: props => <ImageZoom className="rounded-md" {...(props as any)} />,
    ...components,
  };
}
