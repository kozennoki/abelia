// Application constants

// Pagination
export const ARTICLES_PER_PAGE = 10;
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
export const SITE_NAME = 'Nerine Blog';
export const SITE_DESCRIPTION = 'A modern blog powered by Nerine';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Cache
export const CACHE_REVALIDATE_SECONDS = 3600; // 1 hour

// API
export const API_TIMEOUT_MS = 10000; // 10 seconds