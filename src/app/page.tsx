import { getArticles, getZennArticles } from '@/lib/api';
import { ArticleList } from '@/components/article';
import { PaginationLinks } from '@/components/common';
import { ARTICLES_PER_PAGE } from '@/lib/constants';
import type { Article } from '@/lib/types';

export default async function HomePage() {
  let articles: Article[] = [];
  let zennArticles: Article[] = [];
  let totalPages = 1;
  let error: string | null = null;

  try {
    // 記事の取得
    const response = await getArticles({
      page: 1,
      limit: ARTICLES_PER_PAGE
    });
    articles = response.articles;
    totalPages = Math.ceil((response.pagination?.total || 0) / ARTICLES_PER_PAGE);

    // Zenn記事の取得
    try {
      zennArticles = await getZennArticles({ limit: 5 });
    } catch (err) {
      console.error('Failed to fetch Zenn articles:', err);
      // Zenn記事の取得失敗は致命的ではないので続行
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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">最新記事</h1>
        <p className="text-gray-600">Nerine ブログの最新記事をお楽しみください</p>
      </div>

      <ArticleList articles={articles} />

      {totalPages > 1 && (
        <PaginationLinks
          currentPage={1}
          totalPages={totalPages}
        />
      )}

      {/* Zenn記事セクション */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Zenn記事</h2>
        {zennArticles.length > 0 ? (
          <ArticleList articles={zennArticles} />
        ) : (
          <p className="text-gray-500 py-4">Zenn記事がありません。</p>
        )}
      </div>
    </div>
  );
}
