import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { getCategories } from '@/lib/api';
import { mockCategories } from '@/lib/mockData';
import type { Category } from '@/lib/types';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  categories?: Category[];
}

export default async function Header({ categories: initialCategories }: HeaderProps = {}) {
  let categories: Category[] = initialCategories || [];

  if (!initialCategories) {
    try {
      categories = await getCategories();
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      categories = mockCategories; // フォールバック
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white relative">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
              {SITE_NAME}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ホーム
            </Link>

            {/* カテゴリドロップダウン */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                カテゴリ
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* ドロップダウンメニュー */}
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {categories.map((category) => (
                    <Link
                      key={category.Slug}
                      href={`/categories/${category.Slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {category.Name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <MobileMenu categories={categories} />
        </nav>
      </div>
    </header>
  );
}
