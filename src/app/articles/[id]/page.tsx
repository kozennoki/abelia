import { notFound } from "next/navigation";
import { getArticle, getArticles } from "@/lib/api";
import { ArticleDetail } from "@/components/article";
import { ArticleSchema, BreadcrumbSchema } from "@/components/common";
import { SITE_NAME, SITE_URL, ERROR_ARTICLE_NOT_FOUND } from "@/lib/constants";
import { generateArticleMetadata, generateErrorMetadata } from "@/lib/seo";
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
    return generateArticleMetadata(article);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return generateErrorMetadata(
      `Article Not Found | ${SITE_NAME}`,
      ERROR_ARTICLE_NOT_FOUND
    );
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
