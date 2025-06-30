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

  return (
    <article
      className={cn(
        "bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow",
        isCompact ? "flex" : "block"
      )}
    >
      <Link href={buildArticleUrl(article.ID)}>
        <div
          className={cn(
            "relative",
            isCompact ? "w-32 h-24 flex-shrink-0" : "w-full h-48"
          )}
        >
          <img
            src={article.Image || ARTICLE_IMAGE_PLACEHOLDER}
            alt={article.Title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = ARTICLE_IMAGE_PLACEHOLDER;
            }}
          />
        </div>
      </Link>

      <div className={cn("p-4", isCompact ? "flex-1" : "")}>
        <div className="flex items-center gap-2 mb-2">
          <Link
            href={`/categories/${article.Category.Slug}`}
            className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded"
          >
            {article.Category.Name}
          </Link>
          <time className="text-xs text-gray-500">
            {formatDate(article.CreatedAt)}
          </time>
        </div>

        <Link href={buildArticleUrl(article.ID)}>
          <h2
            className={cn(
              "font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2",
              isCompact ? "text-sm mb-1" : "text-lg mb-2"
            )}
          >
            {article.Title}
          </h2>
        </Link>

        {!isCompact && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-2">
            {truncateText(article.Description, ARTICLE_DESCRIPTION_MAX_LENGTH)}
          </p>
        )}

        <Link
          href={buildArticleUrl(article.ID)}
          className={cn(
            "inline-flex items-center font-medium text-blue-600 hover:text-blue-500",
            isCompact ? "text-xs" : "text-sm"
          )}
        >
          続きを読む
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
