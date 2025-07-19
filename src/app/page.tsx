import Link from 'next/link';
import { getArticles, getZennArticles } from '@/lib/api';
import { ArticleList } from '@/components/article';
import { HOME_ARTICLES_LIMIT, ZENN_ARTICLES_LIMIT } from '@/lib/constants';
import type { Article } from '@/lib/types';

export default async function HomePage() {
  let articles: Article[] = [];
  let zennArticles: Article[] = [];
  let error: string | null = null;

  try {
    // 記事の取得（6件のみ）
    const response = await getArticles({
      page: 1,
      limit: HOME_ARTICLES_LIMIT
    });
    articles = response.articles;

    // Zenn記事の取得（3件）
    try {
      zennArticles = await getZennArticles({ limit: ZENN_ARTICLES_LIMIT });
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
      {/* 最新記事セクション */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">最新記事</h2>
          <Link 
            href="/articles"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            記事一覧を見る →
          </Link>
        </div>
      </div>

      <ArticleList articles={articles} />

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
