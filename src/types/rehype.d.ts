declare module 'rehype-slug' {
  import { Plugin } from 'unified';
  const rehypeSlug: Plugin;
  export default rehypeSlug;
}

declare module 'rehype-autolink-headings' {
  import { Plugin } from 'unified';
  
  interface AutolinkOptions {
    behavior?: 'wrap' | 'before' | 'after' | 'prepend' | 'append';
    properties?: {
      className?: string[];
      ariaLabel?: string;
      [key: string]: unknown;
    };
    content?: unknown;
    group?: unknown;
  }
  
  const rehypeAutolinkHeadings: Plugin<[AutolinkOptions?]>;
  export default rehypeAutolinkHeadings;
}