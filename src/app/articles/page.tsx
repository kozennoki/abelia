import { getArticles } from "@/lib/api";
import { ArticleList } from "@/components/article";
import { PaginationLinks } from "@/components/common";
import { ARTICLES_PER_PAGE, SITE_NAME, SITE_URL, ARTICLES_LIST_DESCRIPTION, BLOG_DESCRIPTION_SUFFIX } from "@/lib/constants";
import type { Article } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Articles | ${SITE_NAME}`,
  description: ARTICLES_LIST_DESCRIPTION,
  openGraph: {
    title: `Articles | ${SITE_NAME}`,
    description: `${SITE_NAME}${BLOG_DESCRIPTION_SUFFIX}`,
    type: "website",
    url: `${SITE_URL}/articles`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `Articles | ${SITE_NAME}`,
    description: `${SITE_NAME}${BLOG_DESCRIPTION_SUFFIX}`,
  },
  alternates: {
    canonical: `${SITE_URL}/articles`,
  },
};

export default async function ArticlesPage() {
  let articles: Article[] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    const response = await getArticles({
      page: 1,
      limit: ARTICLES_PER_PAGE,
    });
    articles = response.articles;
    totalPages = Math.ceil(
      (response.pagination?.total || 0) / ARTICLES_PER_PAGE
    );
  } catch (err) {
    console.error("Failed to fetch articles:", err);
    error = "記事の取得に失敗しました。";
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:py-20 py-6">
      <div className="mb-2 flex flex-row items-center">
        <h1 className="text-3xl font-bold text-gray-900 pr-4">
          Recent
        </h1>
        <div className="font-light">- 最新記事 -</div>
      </div>

      <div className="border border-secondary mb-8"></div>

      <ArticleList articles={articles} />

      {totalPages > 1 && (
        <PaginationLinks
          currentPage={1}
          totalPages={totalPages}
          baseUrl="/articles"
        />
      )}
    </div>
  );
}
