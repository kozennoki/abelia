// Core data types for Nerine blog system - OpenAPI schema driven
import type {
  Article as OpenAPIArticle,
  Category as OpenAPICategory,
  Pagination as OpenAPIPagination,
  ArticlesResponse as OpenAPIArticlesResponse,
  CategoriesResponse as OpenAPICategoriesResponse,
  ErrorResponse as OpenAPIErrorResponse,
  HealthResponse as OpenAPIHealthResponse
} from './openapi';

// Re-export OpenAPI types as core types
export type Category = OpenAPICategory;
export type Article = OpenAPIArticle;
export type Pagination = OpenAPIPagination;

// API Response types (OpenAPI schema driven)
export type ArticleListResponse = OpenAPIArticlesResponse;
export type CategoryListResponse = OpenAPICategoriesResponse;
export type ErrorResponse = OpenAPIErrorResponse;
export type HealthResponse = OpenAPIHealthResponse;

// API Request parameter types (OpenAPI schema driven)
import type {
  GetArticlesParams as OpenAPIGetArticlesParams,
  GetPopularArticlesParams as OpenAPIGetPopularArticlesParams,
  GetLatestArticlesParams as OpenAPIGetLatestArticlesParams,
  GetArticlesByCategoryParams as OpenAPIGetArticlesByCategoryParams,
  GetZennArticlesParams as OpenAPIGetZennArticlesParams
} from './openapi';

export type GetArticlesParams = OpenAPIGetArticlesParams;
export type GetPopularArticlesParams = OpenAPIGetPopularArticlesParams;
export type GetLatestArticlesParams = OpenAPIGetLatestArticlesParams;
export type GetZennArticlesParams = OpenAPIGetZennArticlesParams;

// Custom type for category articles params (combines path and query params)
export type GetCategoryArticlesParams = {
  slug: string;
} & OpenAPIGetArticlesByCategoryParams['query'];

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

// ApiError is now based on OpenAPI ErrorResponse
export type ApiError = ErrorResponse;