'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Category } from '@/lib/types';
import { capitalizeFirst } from '../../lib';

interface MobileMenuProps {
  categories: Category[];
}

export function MobileMenu({ categories }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center h-16">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="text-muted-foreground focus:outline-none focus:text-foreground relative p-2"
      >
        <div className="relative w-6 h-6">
          {/* Hamburger lines */}
          <span
            className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? 'top-2.5 rotate-45 opacity-100'
                : 'top-1 rotate-0 opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 top-2.5 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? 'top-2.5 -rotate-45 opacity-100'
                : 'top-4 rotate-0 opacity-100'
            }`}
          />
        </div>
      </button>

      {/* Mobile menu panel */}
      <div
        className={`absolute top-full left-0 right-0 md:hidden border-t border-border bg-background shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100 translate-y-0'
            : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 font-medium text-muted-foreground active:text-foreground active:bg-muted-background rounded-md transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              animation: isMobileMenuOpen
                ? 'slideInFromLeft 0.3s ease-out forwards'
                : 'none',
              animationDelay: '0ms'
            }}
          >
            Home
          </Link>

          <Link
            href="/articles"
            className="block px-3 py-2 font-medium text-muted-foreground active:text-foreground active:bg-muted-background rounded-md transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              animation: isMobileMenuOpen
                ? 'slideInFromLeft 0.3s ease-out forwards'
                : 'none',
              animationDelay: '50ms'
            }}
          >
            Articles
          </Link>

          {/* Mobile category menu */}
          <div className="px-3 py-2">
            <div 
              className="font-medium text-muted-foreground mb-2"
              style={{
                animation: isMobileMenuOpen
                  ? 'slideInFromLeft 0.3s ease-out forwards'
                  : 'none',
                animationDelay: '150ms'
              }}
            >
              Category
            </div>
            <div className="space-y-1">
              {categories.map((category, index) => (
                <Link
                  key={category.Slug}
                  href={`/categories/${category.Slug}`}
                  className="block px-3 py-1 text-muted-foreground active:text-foreground active:bg-muted-background rounded transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    animation: isMobileMenuOpen
                      ? 'slideInFromLeft 0.3s ease-out forwards'
                      : 'none',
                    animationDelay: isMobileMenuOpen ? `${(index + 3) * 50 + 150}ms` : '0ms',
                    opacity: 0,
                  }}
                >
                  {capitalizeFirst(category.Slug)}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
