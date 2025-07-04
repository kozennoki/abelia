// Core data types for Nerine blog system

export interface Category {
  Slug: string;
  Name: string;
}

export interface Article {
  ID: string;
  Title: string;
  Image: string;
  Category: Category;
  Description: string;
  Body: string;
  CreatedAt: string;
  UpdatedAt: string;
}

// API Response types
export interface ArticleListResponse {
  articles: Article[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface CategoryListResponse {
  categories: Category[];
}

// API Request parameter types
export interface GetArticlesParams {
  page?: number;
  limit?: number;
}

export interface GetCategoryArticlesParams {
  slug: string;
  page?: number;
  limit?: number;
}

export interface GetPopularArticlesParams {
  limit?: number;
}

export interface GetLatestArticlesParams {
  limit?: number;
}

// UI Component props types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact';
}

export interface ArticleListProps {
  articles: Article[];
  loading?: boolean;
}

export interface ArticleDetailProps {
  article: Article;
}

// Utility types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}