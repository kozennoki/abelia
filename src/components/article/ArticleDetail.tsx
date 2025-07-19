"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import type { ArticleDetailProps } from "@/lib/types";
import { formatDate } from "@/lib/utils";

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
            {article.Category.Name}
          </Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {article.Title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <time dateTime={article.CreatedAt}>
            {formatDate(article.CreatedAt)}
          </time>
          {article.UpdatedAt !== article.CreatedAt && (
            <span>
              更新: {formatDate(article.UpdatedAt)}
            </span>
          )}
        </div>
        
        <p className="text-lg text-gray-700 leading-relaxed">
          {article.Description}
        </p>
      </header>

      {/* Article Image */}
      {article.Image && (
        <div className="mb-8">
          <img
            src={article.Image}
            alt={article.Title}
            className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            h1: ({ children }) => (
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
            ),
            h2: ({ children }) => (
              <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
            ),
            h3: ({ children }) => (
              <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h4>
            ),
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),
            code: ({ children, ...props }) => (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4">{children}</pre>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 ml-6 list-disc">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 ml-6 list-decimal">{children}</ol>
            ),
            li: ({ children }) => (
              <li className="mb-1">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 py-2 my-4 italic text-gray-700">
                {children}
              </blockquote>
            ),
          }}
        >
          {article.Body}
        </ReactMarkdown>
      </div>

      {/* Article Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">カテゴリ:</span>
            <Link
              href={`/categories/${article.Category.Slug}`}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {article.Category.Name}
            </Link>
          </div>
          
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
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

