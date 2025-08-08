"use client";

import Link from "next/link";
import type { ArticleCardProps } from "@/lib/types";
import { formatDate, truncateText, buildArticleUrl } from "@/lib/utils";
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
  const isZennArticle = article.Category.Slug === 'zenn';

  return (
    <article
      className={cn(
        "bg-background rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow relative group cursor-pointer",
        isCompact ? "flex" : "block"
      )}
    >
      {/* 記事全体のリンク */}
      <Link
        href={buildArticleUrl(article.ID, article.Category.Slug)}
        className="absolute inset-0 z-10"
        aria-label={`記事「${article.Title}」を読む`}
        target={article.Category.Slug === 'zenn' ? "_blank" : undefined}
        rel={article.Category.Slug === 'zenn' ? "noopener noreferrer" : undefined}
      >
        <span className="sr-only">記事「{article.Title}」を読む</span>
      </Link>

      {/* 記事画像 - Zenn記事の場合は非表示 */}
      {!isZennArticle && (
        <div
          className={cn(
            "relative overflow-hidden",
            isCompact ? "w-32 h-18 flex-shrink-0" : "w-full aspect-video"
          )}
        >
          <img
            src={article.Image || ARTICLE_IMAGE_PLACEHOLDER}
            alt={article.Title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
          <time className="text-xs text-muted">
            {formatDate(article.CreatedAt)}
          </time>
        </div>

        <h2
          className={cn(
            "font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2",
            isCompact ? "text-sm mb-1" : "text-lg mb-2"
          )}
        >
          {article.Title}
        </h2>

        {!isCompact && !isZennArticle && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
            {truncateText(article.Description, ARTICLE_DESCRIPTION_MAX_LENGTH)}
          </p>
        )}

      </div>
    </article>
  );
}
