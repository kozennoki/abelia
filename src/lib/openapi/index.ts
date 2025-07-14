// Re-export OpenAPI generated types for easier import
export * from './schema';
export type { paths, components, operations } from './schema';

// Import the types from the generated schema
import type { components, operations } from './schema';

// Type helpers for specific API responses
export type ArticleResponse = components['schemas']['ArticleResponse'];
export type ArticlesResponse = components['schemas']['ArticlesResponse'];
export type CategoriesResponse = components['schemas']['CategoriesResponse'];
export type ErrorResponse = components['schemas']['ErrorResponse'];
export type HealthResponse = components['schemas']['HealthResponse'];

// Type helpers for specific schemas
export type Article = components['schemas']['Article'];
export type Category = components['schemas']['Category'];
export type Pagination = components['schemas']['Pagination'];

// Operation parameter types
export type GetArticlesParams = operations['getArticles']['parameters']['query'];
export type GetArticleByIdParams = operations['getArticleById']['parameters']['path'];
export type GetPopularArticlesParams = operations['getPopularArticles']['parameters']['query'];
export type GetLatestArticlesParams = operations['getLatestArticles']['parameters']['query'];
export type GetArticlesByCategoryParams = operations['getArticlesByCategory']['parameters'];
export type GetZennArticlesParams = operations['getZennArticles']['parameters']['query'];