"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { ArticleDetailProps } from "@/lib/types";
import { formatDate, capitalizeFirst } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

export default function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <Link
            href={`/categories/${article.Category.Slug}`}
            className="inline-block px-3 py-1 text-sm font-medium text-primary bg-secondary/20 rounded hover:bg-secondary/30 transition-colors"
          >
            {capitalizeFirst(article.Category.Slug)}
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          {article.Title}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-muted">配信日:</span>
            <time dateTime={article.PublishedAt}>
              {formatDate(article.PublishedAt)}
            </time>
          </div>
          {article.UpdatedAt !== article.PublishedAt && (
            <div className="flex items-center gap-2 text-primary dark:text-secondary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="font-medium">更新日:</span>
              <time dateTime={article.UpdatedAt}>
                {formatDate(article.UpdatedAt)}
              </time>
            </div>
          )}
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed">
          {article.Description}
        </p>
      </header>

      {/* Article Image */}
      {article.Image && (
        <div className="mb-8 aspect-video overflow-hidden rounded-lg shadow-md">
          <img
            src={article.Image}
            alt={article.Title}
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg prose-slate max-w-none">
        <ReactMarkdown
          rehypePlugins={[
            rehypeRaw,
            rehypeHighlight,
            rehypeSlug,
            [rehypeAutolinkHeadings, {
              behavior: 'wrap',
              properties: {
                className: ['anchor-link'],
                ariaLabel: 'Link to section'
              }
            }]
          ]}
          components={{
            pre: ({ children, ...props }) => {
              return <CodeBlock {...props}>{children}</CodeBlock>;
            }
          }}
        >
          {article.Body}
        </ReactMarkdown>
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">カテゴリ:</span>
            <Link
              href={`/categories/${article.Category.Slug}`}
              className="text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              {capitalizeFirst(article.Category.Slug)}
            </Link>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            記事一覧に戻る
          </Link>
        </div>
      </footer>
    </article>
  );
}
