import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, AUTHOR_NAME, AUTHOR_TWITTER } from "./constants";
import type { Article, Category } from "./types";

export interface SEOConfig {
  title: string;
  description: string;
  url?: string;
  image?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  keywords?: string[];
  noIndex?: boolean;
}

/**
 * 基本的なSEOメタデータを生成する
 */
export function generateBasicMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    url,
    image,
    type = "website",
    publishedTime,
    modifiedTime,
    section,
    keywords,
    noIndex = false,
  } = config;

  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  return {
    title,
    description,
    authors: [{ name: AUTHOR_NAME }],
    keywords,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title,
      description,
      type,
      url: fullUrl,
      siteName: SITE_NAME,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(type === "article" && { authors: [AUTHOR_NAME] }),
      ...(image && {
        images: [
          {
            url: image.url,
            alt: image.alt,
            width: image.width || 1200,
            height: image.height || 630,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: AUTHOR_TWITTER,
      ...(image && {
        images: [
          {
            url: image.url,
            alt: image.alt,
          },
        ],
      }),
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

/**
 * 記事用のSEOメタデータを生成する
 */
export function generateArticleMetadata(article: Article): Metadata {
  return generateBasicMetadata({
    title: article.Title,
    description: article.Description,
    url: `/articles/${article.ID}`,
    type: "article",
    publishedTime: article.PublishedAt,
    modifiedTime: article.UpdatedAt,
    section: article.Category.Name,
    keywords: [article.Category.Name, "ブログ", "技術記事"],
    ...(article.Image && {
      image: {
        url: article.Image,
        alt: article.Title,
      },
    }),
  });
}

/**
 * カテゴリページ用のSEOメタデータを生成する
 */
export function generateCategoryMetadata(
  category: Category,
  descriptionTemplate: (categoryName: string) => string
): Metadata {
  const title = `${category.Name}の記事一覧`;
  const description = descriptionTemplate(category.Name);

  return generateBasicMetadata({
    title,
    description,
    url: `/categories/${category.Slug}`,
    type: "website",
  });
}

/**
 * エラーページ用のSEOメタデータを生成する
 */
export function generateErrorMetadata(
  title: string,
  description: string,
  noIndex: boolean = true
): Metadata {
  return generateBasicMetadata({
    title,
    description,
    noIndex,
  });
}