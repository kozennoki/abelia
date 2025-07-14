import { env } from './env';
import {
  mockArticles,
  generateMockArticleListResponse,
  generateMockCategoryListResponse,
  getMockArticlesByCategory,
  getMockPopularArticles,
  getMockLatestArticles,
  getMockArticleById,
  delay,
} from './mockData';
import type {
  Article,
  Category,
  ArticleListResponse,
  CategoryListResponse,
  ErrorResponse,
  HealthResponse,
  GetArticlesParams,
  GetCategoryArticlesParams,
  GetPopularArticlesParams,
  GetLatestArticlesParams,
  GetZennArticlesParams,
} from './types';

// HTTP Client configuration
const API_BASE_URL = env.NEXT_PUBLIC_API_URL;
const API_KEY = env.NEXT_PUBLIC_API_KEY;

// Custom error class for API errors (OpenAPI schema driven)
export class ApiErrorClass extends Error {
  error: string;
  detail?: string;
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string, detail?: string) {
    super(message);
    this.name = 'ApiError';
    this.error = message;
    this.detail = detail;
    this.status = status;
    this.code = code;
  }

  // Convert to OpenAPI ErrorResponse format
  toErrorResponse(): ErrorResponse {
    return {
      error: this.error,
      detail: this.detail,
    };
  }
}

// HTTP client wrapper with automatic X-API-Key header
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new ApiErrorClass(
        `API request failed: ${response.statusText}`,
        response.status,
        `HTTP_${response.status}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    if (error instanceof ApiErrorClass) {
      throw error;
    }
    
    // Network or other errors
    console.error('API request error:', error);
    throw new ApiErrorClass(
      'Network error or API is not available',
      0,
      'NETWORK_ERROR'
    );
  }
}

// Build query string from parameters
function buildQueryString(params: Record<string, unknown>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

// Article API functions
export async function getArticles(params: GetArticlesParams = {}): Promise<ArticleListResponse> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const { page = 1, limit = 10 } = params;
    return generateMockArticleListResponse(mockArticles, page, limit);
  }

  const queryString = buildQueryString(params as Record<string, unknown>);
  return await apiRequest<ArticleListResponse>(`/api/v1/articles${queryString}`);
}

export async function getArticle(id: string): Promise<Article> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const article = getMockArticleById(id);
    if (!article) {
      throw new ApiErrorClass(`Article with ID ${id} not found`, 404, 'NOT_FOUND', `Article with ID '${id}' does not exist`);
    }
    return article;
  }

  const response = await apiRequest<{ article: Article }>(`/api/v1/articles/${id}`);
  return response.article;
}

export async function getPopularArticles(params: GetPopularArticlesParams = {}): Promise<Article[]> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const { limit = 5 } = params;
    return getMockPopularArticles(limit);
  }

  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiRequest<ArticleListResponse>(`/api/v1/articles/popular${queryString}`);
  return response.articles;
}

export async function getLatestArticles(params: GetLatestArticlesParams = {}): Promise<Article[]> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const { limit = 5 } = params;
    return getMockLatestArticles(limit);
  }

  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiRequest<ArticleListResponse>(`/api/v1/articles/latest${queryString}`);
  return response.articles;
}

// Category API functions
export async function getCategories(): Promise<Category[]> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const response = generateMockCategoryListResponse();
    return response.categories;
  }

  const response = await apiRequest<CategoryListResponse>('/api/v1/categories');
  return response.categories;
}

export async function getCategoryArticles(params: GetCategoryArticlesParams): Promise<ArticleListResponse> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const { slug, page = 1, limit = 10 } = params;
    const categoryArticles = getMockArticlesByCategory(slug);
    return generateMockArticleListResponse(categoryArticles, page, limit);
  }

  const { slug, ...queryParams } = params;
  const queryString = buildQueryString(queryParams as Record<string, unknown>);
  return await apiRequest<ArticleListResponse>(`/api/v1/categories/${slug}/articles${queryString}`);
}

// Health check function (OpenAPI schema driven)
export async function healthCheck(): Promise<HealthResponse> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay(200);
    return { status: 'ok' };
  }

  return await apiRequest<HealthResponse>('/health');
}

// Convenience function for backward compatibility
export async function healthCheckBoolean(): Promise<boolean> {
  try {
    const response = await healthCheck();
    return response.status === 'ok';
  } catch {
    return false;
  }
}

// Zenn articles API function (new from OpenAPI schema)
export async function getZennArticles(params: GetZennArticlesParams = {}): Promise<Article[]> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    // Return empty array for mock since we don't have mock Zenn data
    return [];
  }

  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiRequest<ArticleListResponse>(`/api/v1/zenn/articles${queryString}`);
  return response.articles;
}