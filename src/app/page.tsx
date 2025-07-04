import { getArticles } from '@/lib/api';
import { ArticleList } from '@/components/article';
import { ARTICLES_PER_PAGE } from '@/lib/constants';
import type { Article } from '@/lib/types';

export default async function HomePage() {
  let articles: Article[] = [];

  try {
    articles = await getArticles({ 
      page: 1, 
      limit: ARTICLES_PER_PAGE 
    });
  } catch (err) {
    console.error('Failed to fetch articles:', err);
    articles = [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">最新記事</h1>
        <p className="text-gray-600">Nerine ブログの最新記事をお楽しみください</p>
      </div>

      <ArticleList articles={articles} />
    </div>
  );
}
