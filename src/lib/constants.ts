// Application constants

// Pagination
export const ARTICLES_PER_PAGE = 12; // 記事一覧ページ用
export const HOME_ARTICLES_LIMIT = 6; // ルートページの通常記事件数
export const ZENN_ARTICLES_LIMIT = 3; // ルートページのZenn記事件数
export const POPULAR_ARTICLES_LIMIT = 5;
export const LATEST_ARTICLES_LIMIT = 5;
export const MAX_VISIBLE_PAGES = 5;

// UI
export const ARTICLE_DESCRIPTION_MAX_LENGTH = 150;
export const ARTICLE_TITLE_MAX_LENGTH = 100;

// Images
export const DEFAULT_ARTICLE_IMAGE = '/images/default-article.jpg';
export const ARTICLE_IMAGE_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';

// Site metadata
export const SITE_NAME = '浩然之気';
export const SITE_DESCRIPTION = '然のブログです。';
export const SITE_URL = 'https://kozennoki.com';

// Author information
export const AUTHOR_NAME = '然';
export const AUTHOR_TWITTER = '@kozennoki';

// Common metadata descriptions
export const BLOG_DESCRIPTION_SUFFIX = 'で公開している技術記事やブログ記事をご覧いただけます。';
export const TECH_BLOG_DESCRIPTION = 'プログラミングやテクノロジーに関する最新の情報をお届けします。';
export const CATEGORY_DESCRIPTION_TEMPLATE = (categoryName: string) =>
  `${categoryName}に関する記事の一覧ページです。${SITE_NAME}${BLOG_DESCRIPTION_SUFFIX}`;
export const ARTICLES_LIST_DESCRIPTION = `${SITE_NAME}${BLOG_DESCRIPTION_SUFFIX}${TECH_BLOG_DESCRIPTION}`;

// Error messages
export const ERROR_ARTICLE_NOT_FOUND = 'The requested article could not be found.';
export const ERROR_CATEGORY_NOT_FOUND = '指定されたカテゴリは存在しません。';

// Cache
export const CACHE_REVALIDATE_SECONDS = 3600; // 1 hour

// API
export const API_TIMEOUT_MS = 10000; // 10 seconds
