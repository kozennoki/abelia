import type { Article, Category, ArticleListResponse, CategoryListResponse } from './types';

// Mock categories
export const mockCategories: Category[] = [
  { Slug: 'tech', Name: 'テクノロジー' },
  { Slug: 'lifestyle', Name: 'ライフスタイル' },
  { Slug: 'business', Name: 'ビジネス' },
  { Slug: 'design', Name: 'デザイン' },
  { Slug: 'tutorial', Name: 'チュートリアル' },
];

// Mock articles
export const mockArticles: Article[] = [
  {
    ID: '1',
    Title: 'Next.js 14とApp Routerの基礎知識',
    Image: 'https://picsum.photos/800/400?random=1',
    Category: mockCategories[0],
    Description: 'Next.js 14の新機能であるApp Routerについて詳しく解説します。従来のPages Routerとの違いや移行方法についても説明します。',
    Body: `# Next.js 14とApp Routerの基礎知識

Next.js 14では、App Routerが安定版となり、多くの新機能が追加されました。

## 主な特徴

- Server Components
- ストリーミング
- 並列レンダリング
- ネストしたレイアウト

## 従来のPages Routerとの違い

App Routerでは、ファイルベースのルーティングがより柔軟になり、レイアウトの共有が簡単になりました。`,
    CreatedAt: '2024-01-15T10:00:00Z',
    UpdatedAt: '2024-01-15T10:00:00Z',
  },
  {
    ID: '2',
    Title: 'TypeScriptで型安全なWebアプリケーション開発',
    Image: 'https://picsum.photos/800/400?random=2',
    Category: mockCategories[0],
    Description: 'TypeScriptを使った型安全なWebアプリケーション開発のベストプラクティスを紹介します。',
    Body: `# TypeScriptで型安全なWebアプリケーション開発

TypeScriptを活用して、保守性の高いWebアプリケーションを開発する方法を解説します。

## 型定義のベストプラクティス

- インターフェースの適切な設計
- ジェネリクスの活用
- Union typesの使い方

## 実践的な例

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\``,
    CreatedAt: '2024-01-14T14:30:00Z',
    UpdatedAt: '2024-01-14T14:30:00Z',
  },
  {
    ID: '3',
    Title: 'Tailwind CSSでモダンなUI/UX設計',
    Image: 'https://picsum.photos/800/400?random=3',
    Category: mockCategories[3],
    Description: 'Tailwind CSSを使ったモダンなUI/UX設計の手法とデザインシステムの構築について解説します。',
    Body: `# Tailwind CSSでモダンなUI/UX設計

Tailwind CSSを使って効率的にスタイリングを行う方法を説明します。

## Tailwind CSSの特徴

- ユーティリティファースト
- レスポンシブデザイン
- カスタマイズ性

## 実装例

\`\`\`html
<div class="bg-white shadow-lg rounded-lg p-6">
  <h2 class="text-2xl font-bold mb-4">タイトル</h2>
  <p class="text-gray-600">説明文</p>
</div>
\`\`\``,
    CreatedAt: '2024-01-13T09:15:00Z',
    UpdatedAt: '2024-01-13T09:15:00Z',
  },
  {
    ID: '4',
    Title: 'リモートワークで生産性を向上させる方法',
    Image: 'https://picsum.photos/800/400?random=4',
    Category: mockCategories[1],
    Description: 'リモートワーク環境で効率的に作業するためのツールや手法について紹介します。',
    Body: `# リモートワークで生産性を向上させる方法

リモートワークを成功させるための実践的なアドバイスをお伝えします。

## 環境整備

- 作業スペースの確保
- 適切な機材の選択
- 通信環境の最適化

## 時間管理

- ポモドーロテクニック
- タスクの優先順位付け
- 定期的な休憩`,
    CreatedAt: '2024-01-12T16:45:00Z',
    UpdatedAt: '2024-01-12T16:45:00Z',
  },
  {
    ID: '5',
    Title: 'スタートアップ成功の秘訣',
    Image: 'https://picsum.photos/800/400?random=5',
    Category: mockCategories[2],
    Description: 'スタートアップを成功に導くための戦略と実践方法について、実例を交えて解説します。',
    Body: `# スタートアップ成功の秘訣

スタートアップを成功させるための重要なポイントを説明します。

## 市場分析

- ターゲット市場の特定
- 競合分析
- 市場規模の調査

## プロダクト開発

- MVP（最小実行可能製品）の構築
- ユーザーフィードバックの収集
- 継続的な改善`,
    CreatedAt: '2024-01-11T11:20:00Z',
    UpdatedAt: '2024-01-11T11:20:00Z',
  },
  {
    ID: '6',
    Title: 'React Hooksの実践的な使い方',
    Image: 'https://picsum.photos/800/400?random=6',
    Category: mockCategories[4],
    Description: 'React Hooksを使った効率的なコンポーネント開発の方法を、具体的なサンプルコードと共に解説します。',
    Body: `# React Hooksの実践的な使い方

React Hooksを効果的に活用するためのテクニックを紹介します。

## 基本的なHooks

- useState
- useEffect
- useContext

## カスタムHooksの作成

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return { count, increment, decrement };
}
\`\`\``,
    CreatedAt: '2024-01-10T13:30:00Z',
    UpdatedAt: '2024-01-10T13:30:00Z',
  },
];

// Mock API response generators
export function generateMockArticleListResponse(
  articles: Article[],
  page: number = 1,
  limit: number = 10
): ArticleListResponse {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = articles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    pagination: {
      total: articles.length,
      page,
      limit,
      totalPages: Math.ceil(articles.length / limit),
    },
  };
}

export function generateMockCategoryListResponse(): CategoryListResponse {
  return {
    categories: mockCategories,
  };
}

// Utility functions for filtering mock data
export function getMockArticlesByCategory(categorySlug: string): Article[] {
  return mockArticles.filter(article => article.Category.Slug === categorySlug);
}

export function getMockPopularArticles(limit: number = 5): Article[] {
  // Sort by created date descending and take the most recent ones as "popular"
  return mockArticles
    .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
    .slice(0, limit);
}

export function getMockLatestArticles(limit: number = 5): Article[] {
  return mockArticles
    .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
    .slice(0, limit);
}

export function getMockArticleById(id: string): Article | undefined {
  return mockArticles.find(article => article.ID === id);
}

// Simulate API delay for more realistic behavior
export function delay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}