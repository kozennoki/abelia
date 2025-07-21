import { notFound } from 'next/navigation';
import { getArticles } from '@/lib/api';
import { ArticleList } from '@/components/article';
import { PaginationLinks } from '@/components/common';
import { ARTICLES_PER_PAGE, SITE_NAME } from '@/lib/constants';
import type { Article } from '@/lib/types';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    page: string;
  };
}

// Generate static params for all pages
export async function generateStaticParams() {
  try {
    const response = await getArticles({ limit: 1 });
    const totalPages = Math.ceil((response.pagination?.total || 0) / ARTICLES_PER_PAGE);

    return Array.from({ length: totalPages }, (_, i) => ({
      page: (i + 2).toString(), // Start from page 2 since page 1 is handled by /articles
    }));
  } catch {
    console.log('API not available, using minimal pages for build');
    return [
      { page: '2' },
      { page: '3' },
    ];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageNumber = parseInt(params.page, 10);

  return {
    title: `Recent - page.${pageNumber} | ${SITE_NAME}`,
    description: `${SITE_NAME} ブログの記事一覧 ${pageNumber}ページ目`,
  };
}

export default async function ArticlesPagedPage({ params }: PageProps) {
  const pageNumber = parseInt(params.page, 10);

  // Invalid page number
  if (isNaN(pageNumber) || pageNumber < 2) {
    notFound();
  }

  let articles: Article[] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    const response = await getArticles({
      page: pageNumber,
      limit: ARTICLES_PER_PAGE
    });

    articles = response.articles;
    totalPages = Math.ceil((response.pagination?.total || 0) / ARTICLES_PER_PAGE);

    // Page number exceeds total pages
    if (pageNumber > totalPages && totalPages > 0) {
      notFound();
    }
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    error = '記事の取得に失敗しました。';
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {error}
          </p>
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
        <div className="font-light">- 最新記事 Page.{pageNumber} -</div>
      </div>

      <div className="border border-secondary mb-8"></div>

      <ArticleList articles={articles} />

      <PaginationLinks
        currentPage={pageNumber}
        totalPages={totalPages}
        baseUrl="/articles"
      />
    </div>
  );
}
