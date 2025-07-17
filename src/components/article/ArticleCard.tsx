"use client";

import Link from "next/link";
import type { ArticleCardProps } from "@/lib/types";
import { formatDate, truncateText, buildArticleUrl, isEmoji, extractEmoji } from "@/lib/utils";
import {
  ARTICLE_DESCRIPTION_MAX_LENGTH,
  ARTICLE_IMAGE_PLACEHOLDER,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
  const isCompact = variant === "compact";
  const isZennArticle = isEmoji(article.Image);
  const emoji = isZennArticle ? extractEmoji(article.Image) : '';

  return (
    <article
      className={cn(
        "bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative group cursor-pointer",
        isCompact ? "flex" : "block"
      )}
    >
      {/* 記事全体のリンク */}
      <Link 
        href={buildArticleUrl(article.ID)}
        className="absolute inset-0 z-10"
        aria-label={`記事「${article.Title}」を読む`}
      >
        <span className="sr-only">記事「{article.Title}」を読む</span>
      </Link>

      {/* 記事画像 - Zenn記事の場合は非表示 */}
      {!isZennArticle && (
        <div
          className={cn(
            "relative",
            isCompact ? "w-32 h-24 flex-shrink-0" : "w-full h-48"
          )}
        >
          <img
            src={article.Image || ARTICLE_IMAGE_PLACEHOLDER}
            alt={article.Title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = ARTICLE_IMAGE_PLACEHOLDER;
            }}
          />
        </div>
      )}

      {/* 記事内容 */}
      <div className={cn("p-4", isCompact ? "flex-1" : "")}>
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/categories/${article.Category.Slug}`}
            className="inline-block px-2 py-1 text-xs font-medium text-primary bg-secondary/20 rounded hover:bg-secondary/30 transition-colors relative z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {article.Category.Name}
          </Link>
          <time className="text-xs text-gray-500">
            {formatDate(article.CreatedAt)}
          </time>
        </div>

        <h2
          className={cn(
            "font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2",
            isCompact ? "text-sm mb-1" : "text-lg mb-2",
            isZennArticle ? "flex items-center gap-2" : ""
          )}
        >
          {isZennArticle && emoji && (
            <span className="text-xl flex-shrink-0" aria-hidden="true">
              {emoji}
            </span>
          )}
          <span className="flex-1">{article.Title}</span>
        </h2>

        {!isCompact && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">
            {truncateText(article.Description, ARTICLE_DESCRIPTION_MAX_LENGTH)}
          </p>
        )}

      </div>
    </article>
  );
}
