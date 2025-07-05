'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams, useRouter, notFound } from 'next/navigation';
import { getCategoryArticles, getCategories } from '@/lib/api';
import { ArticleList } from '@/components/article';
import { Pagination } from '@/components/common';
import { mockCategories } from '@/lib/mockData';
import { env } from '@/lib/env';
import { ARTICLES_PER_PAGE } from '@/lib/constants';
import type { Article, Category } from '@/lib/types';

function CategoryPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const currentPage = parseInt(searchParams?.get('page') || '1', 10);
  
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);

        // カテゴリの存在確認
        const categories = env.NEXT_PUBLIC_USE_MOCK 
          ? mockCategories
          : await getCategories();
        
        const foundCategory = categories.find(c => c.Slug === slug);
        
        if (!foundCategory) {
          notFound();
          return;
        }

        setCategory(foundCategory);

        // カテゴリの記事を取得
        const response = await getCategoryArticles({ 
          slug, 
          page: currentPage, 
          limit: ARTICLES_PER_PAGE 
        });
        setArticles(response.articles);
        setTotalPages(Math.ceil((response.total || 0) / ARTICLES_PER_PAGE));
      } catch (err) {
        console.error('Error fetching category articles:', err);
        setError('記事の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug, currentPage]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    const queryString = params.toString();
    const newUrl = queryString ? `/categories/${slug}?${queryString}` : `/categories/${slug}`;
    router.push(newUrl);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* カテゴリヘッダー スケルトン */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>

        {/* 記事一覧 スケルトン */}
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

  if (!category) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* カテゴリヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {category.Name}
        </h1>
        <p className="text-gray-600">
          {category.Name}に関する記事一覧
        </p>
      </div>

      {/* 記事一覧 */}
      {articles.length > 0 ? (
        <>
          <ArticleList articles={articles} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            このカテゴリにはまだ記事がありません。
          </p>
        </div>
      )}
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
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
      <CategoryPageContent />
    </Suspense>
  );
}