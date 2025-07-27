import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/api";
import { ArticleDetail } from "@/components/article";
import { ArticleSchema, BreadcrumbSchema } from "@/components/common";
import { SITE_NAME, SITE_URL, AUTHOR_NAME, AUTHOR_TWITTER, ERROR_ARTICLE_NOT_FOUND } from "@/lib/constants";
import type { Article } from "@/lib/types";
import type { Metadata } from "next";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const response = await getArticles({ limit: 100 });
    return response.articles.map((article: Article) => ({
      id: article.ID,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  try {
    const article = await getArticle(params.id);

    return {
      title: article.Title,
      description: article.Description,
      authors: [{ name: AUTHOR_NAME }],
      keywords: [article.Category.Name, "ブログ", "技術記事"],
      openGraph: {
        title: article.Title,
        description: article.Description,
        type: "article",
        publishedTime: article.CreatedAt,
        modifiedTime: article.UpdatedAt,
        images: article.Image ? [{ url: article.Image, alt: article.Title }] : [],
        section: article.Category.Name,
        url: `${SITE_URL}/articles/${params.id}`,
        siteName: SITE_NAME,
        authors: [AUTHOR_NAME],
      },
      twitter: {
        card: "summary_large_image",
        title: article.Title,
        description: article.Description,
        images: article.Image ? [{ url: article.Image, alt: article.Title }] : [],
        creator: AUTHOR_TWITTER,
      },
      alternates: {
        canonical: `${SITE_URL}/articles/${params.id}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `Article Not Found | ${SITE_NAME}`,
      description: ERROR_ARTICLE_NOT_FOUND,
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  let article: Article;

  try {
    article = await getArticle(params.id);
  } catch (error) {
    console.error("Error fetching article:", error);
    notFound();
  }

  const breadcrumbItems = [
    { name: SITE_NAME, url: SITE_URL },
    { name: "Articles", url: `${SITE_URL}/articles` },
    { name: article.Title, url: `${SITE_URL}/articles/${article.ID}` },
  ];

  return (
    <>
      <ArticleSchema article={article} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="container mx-auto px-4 py-8">
        <ArticleDetail article={article} />
      </div>
    </>
  );
}
