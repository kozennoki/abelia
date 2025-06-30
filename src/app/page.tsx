import { getArticles } from '@/lib/api';
import { ArticleList } from '@/components/article';
import { ARTICLES_PER_PAGE } from '@/lib/constants';
import type { Article } from '@/lib/types';

export default async function HomePage() {
  let articles: Article[] = [];
  let error: string | null = null;

  try {
    articles = await getArticles({ 
      page: 1, 
      limit: ARTICLES_PER_PAGE 
    });
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    error = err instanceof Error ? err.message : 'Failed to load articles';
    articles = [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">最新記事</h1>
        <p className="text-gray-600">Nerine ブログの最新記事をお楽しみください</p>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="flex flex-col items-center">
            <svg className="h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <h3 className="text-lg font-medium text-red-900 mb-2">記事の読み込みに失敗しました</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <p className="text-sm text-red-600">
              API サーバーが起動していることを確認してください。
              <br />
              環境変数とAPI設定を確認してから再度お試しください。
            </p>
          </div>
        </div>
      ) : (
        <ArticleList articles={articles} />
      )}
    </div>
  );
}
