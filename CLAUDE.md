# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Abelia is the frontend application for the Nerine blog system, built with Next.js 14 and designed to work with the Nerine BFF (Backend for Frontend) API. The project follows a static-first approach with gradual enhancement capabilities.

## Architecture

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Strategy**: Static Site Generation (SSG) with Static Export
- **Data Source**: Nerine BFF API (Go-based REST API)
- **Deployment**: AWS (S3 + CloudFront + Lambda)

## Project Structure

```
/
├── app/                          # App Router (Next.js 14)
│   ├── page.tsx                  # Home page (article list)
│   ├── articles/
│   │   └── [id]/page.tsx         # Article detail page
│   ├── categories/
│   │   └── [slug]/page.tsx       # Category-specific articles
│   ├── layout.tsx                # Root layout
│   ├── loading.tsx               # Loading UI
│   ├── error.tsx                 # Error UI
│   └── not-found.tsx             # 404 page
├── components/                   # Reusable UI components
│   ├── ui/                       # Basic UI components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── article/                  # Article-related components
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   └── ArticleDetail.tsx
│   ├── category/                 # Category-related components
│   │   └── CategoryList.tsx
│   └── common/                   # Common components
│       ├── Pagination.tsx
│       └── Loading.tsx
├── lib/                          # Utility functions and configurations
│   ├── api.ts                    # BFF API client functions
│   ├── types.ts                  # TypeScript type definitions
│   ├── utils.ts                  # Utility functions
│   └── constants.ts              # Application constants
├── public/                       # Static assets
├── styles/                       # Global styles
│   └── globals.css
└── next.config.js                # Next.js configuration
```

## Key Technologies

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI library (v18+)

## Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# .env.production (production)
NEXT_PUBLIC_API_URL=https://your-lambda-url/api/v1
# or CloudFront URL after deployment
```

## BFF API Integration

### API Endpoints Used
- `GET /api/v1/articles?page=1&limit=10` - Article list with pagination
- `GET /api/v1/articles/:id` - Article detail
- `GET /api/v1/articles/popular?limit=5` - Popular articles
- `GET /api/v1/articles/latest?limit=5` - Latest articles
- `GET /api/v1/categories/:slug/articles?page=1` - Category articles
- `GET /api/v1/categories` - Category list

### API Client Structure
```typescript
// lib/api.ts
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

export interface Category {
  Slug: string;
  Name: string;
}

export interface ArticleListResponse {
  articles: Article[];
  total?: number;
  page?: number;
  limit?: number;
}
```

### Authentication
All API calls require `X-API-Key` header with the API key matching the BFF configuration.

## Next.js Configuration

### Static Export Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
```

### Build Strategy
- **Development**: Standard Next.js dev server
- **Production**: Static export for AWS S3 deployment
- **Data Fetching**: Build-time static generation via `generateStaticParams` and `fetch`

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (static export)
npm run build

# Start production server (for testing)
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## Data Fetching Patterns

### Static Generation (Recommended)
```typescript
// app/page.tsx - Article list
export default async function HomePage() {
  const articles = await getArticles({ page: 1, limit: 10 });

  return <ArticleList articles={articles} />;
}

// app/articles/[id]/page.tsx - Article detail
export async function generateStaticParams() {
  const articles = await getArticles({ limit: 100 });
  return articles.map((article) => ({
    id: article.ID,
  }));
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);
  return <ArticleDetail article={article} />;
}
```

### Error Handling
```typescript
// lib/api.ts
export async function getArticles(params: GetArticlesParams): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/articles?${new URLSearchParams(params)}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }

    const data: ArticleListResponse = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
}
```

## Component Patterns

### Article Components
```typescript
// components/article/ArticleCard.tsx
interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact';
}

export function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  return (
    <article className="border rounded-lg p-4">
      <h2 className="text-xl font-bold">{article.Title}</h2>
      <p className="text-gray-600">{article.Description}</p>
      <div className="mt-2">
        <span className="text-sm text-blue-600">{article.Category.Name}</span>
      </div>
    </article>
  );
}
```

### Layout Components
```typescript
// components/layout/Header.tsx
export function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-6">
        <Link href="/" className="text-2xl font-bold">
          Blog Title
        </Link>
      </nav>
    </header>
  );
}
```

## Styling Guidelines

### Tailwind CSS Usage
- Use utility classes for styling
- Create custom components for repeated patterns
- Use responsive design utilities (`sm:`, `md:`, `lg:`, `xl:`)
- Maintain consistent spacing and typography scale

### Color Scheme
```css
/* Basic color palette */
- Primary: blue-600
- Secondary: gray-600
- Success: green-600
- Error: red-600
- Background: white, gray-50
- Text: gray-900, gray-600
```

## Performance Optimization

### Image Optimization
```typescript
// Since static export disables Next.js Image optimization
// Use standard img tags with proper attributes
<img
  src={article.Image}
  alt={article.Title}
  className="w-full h-48 object-cover"
  loading="lazy"
/>
```

### Bundle Optimization
- Use dynamic imports for large components
- Minimize client-side JavaScript
- Leverage static generation for SEO

## Deployment Strategy

### AWS Deployment
1. **Build**: `npm run build` generates static files in `out/` directory
2. **S3**: Upload static files to S3 bucket
3. **CloudFront**: Configure CDN with S3 as origin
4. **Lambda**: BFF API deployed separately

### Environment Configuration
```bash
# Development
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1

# Production (CloudFront default domain)
NEXT_PUBLIC_API_URL=https://abcd1234.cloudfront.net/api/v1

# Production (custom domain - future)
NEXT_PUBLIC_API_URL=https://myblog.com/api/v1
```

## SEO Considerations

### Metadata
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Blog Title',
  description: 'Blog description',
}

// app/articles/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await getArticle(params.id);

  return {
    title: article.Title,
    description: article.Description,
  };
}
```

### Static Generation Benefits
- Pre-rendered HTML for better SEO
- Faster initial page loads
- Better Core Web Vitals scores

## Testing Strategy

### Unit Testing (Future)
- Jest + React Testing Library
- Component testing
- Utility function testing

### Integration Testing (Future)
- API integration tests
- End-to-end testing with Playwright

## Development Workflow

### Starting Development
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Ensure BFF API is running locally
5. Start development server: `npm run dev`

### Adding New Features
1. Create components in appropriate directories
2. Add TypeScript types in `lib/types.ts`
3. Update API client functions in `lib/api.ts`
4. Test locally with BFF API
5. Build and verify static export works

### Before Deployment
1. Run `npm run build` to ensure static export works
2. Test the generated static files
3. Verify all API endpoints work correctly
4. Check responsive design on multiple screen sizes

## Common Development Tasks

### Adding a New Page
1. Create page file in `app/` directory
2. Add necessary data fetching logic
3. Create or reuse components
4. Update navigation if needed

### Adding a New Component
1. Create component file in appropriate `components/` subdirectory
2. Define TypeScript interfaces
3. Implement with Tailwind CSS
4. Export from index file if needed

### API Integration
1. Add API function to `lib/api.ts`
2. Define TypeScript types in `lib/types.ts`
3. Handle loading and error states
4. Implement proper error boundaries

## Troubleshooting

### Common Issues
- **Static export failures**: Check for dynamic imports or server-side code
- **API connection issues**: Verify environment variables and BFF API status
- **Build errors**: Check TypeScript types and import paths
- **Styling issues**: Verify Tailwind CSS classes and responsive design

### Performance Issues
- Use React DevTools for component analysis
- Check bundle size with `npm run build`
- Optimize images and assets
- Review API response times

This guide should help you understand the project structure and development patterns for building the Nerine blog frontend.

## Git Commit Rules

### Commit Message Format

```
<emoji> <concise summary>

Detailed description (if needed)

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Emoji Usage

- ✨ `:sparkles:` - Add new feature
- 🐛 `:bug:` - Fix bug
- 🎨 `:art:` - Improve UI/UX
- ♻️ `:recycle:` - Refactor code
- 📚 `:books:` - Add or update documentation
- 🚨 `:rotating_light:` - Critical hotfix

### Commit Example

```bash
git commit -m ":sparkles: カテゴリ機能の実装

- カテゴリ別記事一覧ページを追加
- ナビゲーションにドロップダウンメニューを実装
- 静的サイト生成対応

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Guidelines

1. **Use Japanese for commit messages** - This project uses Japanese for commit descriptions
2. **Emoji is required** - To clearly indicate the type of change
3. **Keep first line under 50 characters** - For better GitHub display
4. **Include Claude Code signature** - Always add for AI-generated code
