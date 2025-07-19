'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Category } from '@/lib/types';

interface MobileMenuProps {
  categories: Category[];
}

export function MobileMenu({ categories }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden border-t border-gray-200 bg-white shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ホーム
            </Link>

            {/* Mobile category menu */}
            <div className="px-3 py-2">
              <div className="font-medium text-gray-600 mb-2">カテゴリ</div>
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
  );
}