'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getArticles } from '@/lib/api';
import { ArticleList } from '@/components/article';
import { Pagination } from '@/components/common';
import { ARTICLES_PER_PAGE } from '@/lib/constants';
import type { Article } from '@/lib/types';

function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams?.get('page') || '1', 10);
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await getArticles({ 
          page: currentPage, 
          limit: ARTICLES_PER_PAGE 
        });
        
        setArticles(response.articles);
        setTotalPages(Math.ceil((response.total || 0) / ARTICLES_PER_PAGE));
        
      } catch (err) {
        console.error('Failed to fetch articles:', err);
        setError('記事の取得に失敗しました。');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : '/';
    router.push(newUrl);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: ARTICLES_PER_PAGE }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            再読み込み
          </button>
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
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
