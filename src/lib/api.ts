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
  GetArticlesParams,
  GetCategoryArticlesParams,
  GetPopularArticlesParams,
  GetLatestArticlesParams,
} from './types';

// HTTP Client configuration
const API_BASE_URL = env.NEXT_PUBLIC_API_URL;
const API_KEY = env.NEXT_PUBLIC_API_KEY;

// Custom error class for API errors
export class ApiErrorClass extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
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
  return await apiRequest<ArticleListResponse>(`/articles${queryString}`);
}

export async function getArticle(id: string): Promise<Article> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const article = getMockArticleById(id);
    if (!article) {
      throw new ApiErrorClass(`Article with ID ${id} not found`, 404, 'NOT_FOUND');
    }
    return article;
  }

  return await apiRequest<Article>(`/articles/${id}`);
}

export async function getPopularArticles(params: GetPopularArticlesParams = {}): Promise<Article[]> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const { limit = 5 } = params;
    return getMockPopularArticles(limit);
  }

  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiRequest<ArticleListResponse>(`/articles/popular${queryString}`);
  return response.articles;
}

export async function getLatestArticles(params: GetLatestArticlesParams = {}): Promise<Article[]> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const { limit = 5 } = params;
    return getMockLatestArticles(limit);
  }

  const queryString = buildQueryString(params as Record<string, unknown>);
  const response = await apiRequest<ArticleListResponse>(`/articles/latest${queryString}`);
  return response.articles;
}

// Category API functions
export async function getCategories(): Promise<Category[]> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay();
    const response = generateMockCategoryListResponse();
    return response.categories;
  }

  const response = await apiRequest<CategoryListResponse>('/categories');
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
  return await apiRequest<ArticleListResponse>(`/categories/${slug}/articles${queryString}`);
}

// Health check function
export async function healthCheck(): Promise<boolean> {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    await delay(200);
    return true;
  }

  try {
    await apiRequest('/health');
    return true;
  } catch {
    return false;
  }
}