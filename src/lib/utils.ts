import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(dateString: string): string {
  // Parse the ISO date string manually to avoid timezone issues
  const date = new Date(dateString);
  
  // Use UTC methods to ensure consistent behavior across server and client
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  
  return `${year}年${month}月${day}日`;
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  
  // Use UTC methods to ensure consistent behavior across server and client
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  
  return `${year}/${month}/${day}`;
}

// Time ago utility - only use on client side to avoid hydration mismatch
export function timeAgo(dateString: string): string {
  // This function should only be used in client components or useEffect
  // to avoid hydration mismatches due to server/client time differences
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'たった今';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分前`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}日前`;
  }

  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}週間前`;
  }

  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months}ヶ月前`;
  }

  const years = Math.floor(diffInDays / 365);
  return `${years}年前`;
}

// String utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// URL utilities
export function buildArticleUrl(id: string, imageField?: string): string {
  // Zenn記事の場合は外部URLに遷移
  if (imageField && isEmoji(imageField)) {
    return `https://zenn.dev/kozennoki/articles/${id}`;
  }
  return `/articles/${id}`;
}

export function buildCategoryUrl(slug: string): string {
  return `/categories/${slug}`;
}

// Pagination utilities
export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export function generatePageNumbers(currentPage: number, totalPages: number, maxVisible: number = 5): number[] {
  const pages: number[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
}

// Emoji detection utilities for Zenn articles
export function isEmoji(text: string): boolean {
  if (!text || text.length === 0) return false;
  
  // Check if it's a URL (starts with http/https) - if so, it's not an emoji
  if (text.startsWith('http://') || text.startsWith('https://')) {
    return false;
  }
  
  // Simple check: if it's short text (not a URL) and contains non-ASCII characters
  // This is a pragmatic approach for Zenn articles where emoji are used instead of URLs
  const hasNonAscii = /[^\x00-\x7F]/.test(text);
  const isShort = text.length <= 10;
  
  return hasNonAscii && isShort;
}

export function extractEmoji(imageField: string): string {
  if (!imageField || !isEmoji(imageField)) {
    return '';
  }
  
  // Return the emoji as is since it's already a text emoji
  return imageField.trim();
}