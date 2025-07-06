'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { getCategories } from '@/lib/api';
import { mockCategories } from '@/lib/mockData';
import { env } from '@/lib/env';
import type { Category } from '@/lib/types';

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryList = env.NEXT_PUBLIC_USE_MOCK 
          ? mockCategories
          : await getCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setCategories(mockCategories); // フォールバック
      }
    }

    fetchCategories();
  }, []);

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
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isMobileMenuOpen ? (
                // Close icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden border-t border-gray-200 bg-white shadow-lg z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ホーム
              </Link>
              
              {/* Mobile category menu */}
              <div className="px-3 py-2">
                <div className="text-gray-600 font-medium mb-2">カテゴリ</div>
                {categories.map((category) => (
                  <Link
                    key={category.Slug}
                    href={`/categories/${category.Slug}`}
                    className="block px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.Name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}