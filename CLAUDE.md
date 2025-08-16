# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

Abelia は Nerine ブログシステムのフロントエンドアプリケーションで、Next.js 14 で構築され、Nerine BFF (Backend for Frontend) API と連携するように設計されています。このプロジェクトは静的ファーストアプローチと段階的な機能強化を採用しています。

## アーキテクチャ

- **フレームワーク**: Next.js 14 with App Router
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **ビルド戦略**: Static Site Generation (SSG) with Static Export
- **データソース**: Nerine BFF API (Go-based REST API)
- **デプロイメント**: AWS (S3 + CloudFront)

## プロジェクト構造

```
/
├── src/                          # ソースコードディレクトリ
│   ├── app/                      # App Router (Next.js 14)
│   │   ├── page.tsx              # ホームページ（記事一覧）
│   │   ├── articles/
│   │   │   ├── page.tsx          # 記事インデックスページ
│   │   │   ├── [id]/page.tsx     # 記事詳細ページ
│   │   │   └── page/[page]/page.tsx  # 記事ページネーション
│   │   ├── categories/
│   │   │   └── [slug]/           # カテゴリ別記事
│   │   │       ├── page.tsx
│   │   │       ├── layout.tsx
│   │   │       ├── loading.tsx
│   │   │       ├── error.tsx
│   │   │       └── not-found.tsx
│   │   ├── layout.tsx            # ルートレイアウト
│   │   ├── loading.tsx           # ローディングUI
│   │   ├── error.tsx             # エラーUI
│   │   ├── not-found.tsx         # 404ページ
│   │   ├── globals.css           # グローバルスタイル
│   │   ├── sitemap.xml/route.ts  # サイトマップ生成
│   │   ├── robots.txt            # Robots.txt
│   │   ├── manifest.json         # PWAマニフェスト
│   │   ├── opengraph-image.tsx   # OpenGraph画像生成
│   │   └── fonts/                # フォントファイル
│   ├── components/               # 再利用可能なUIコンポーネント
│   │   ├── ui/                   # 基本UIコンポーネント
│   │   │   └── Button.tsx
│   │   ├── layout/               # レイアウトコンポーネント
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── article/              # 記事関連コンポーネント
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleList.tsx
│   │   │   ├── ArticleDetail.tsx
│   │   │   └── CodeBlock.tsx
│   │   ├── category/             # カテゴリ関連コンポーネント
│   │   ├── common/               # 共通コンポーネント
│   │   │   ├── Pagination.tsx
│   │   │   ├── PaginationLinks.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── CookieConsent.tsx
│   │   │   ├── ParallaxHero.tsx
│   │   │   └── StructuredData.tsx
│   │   └── analytics/            # アナリティクスコンポーネント
│   │       └── GoogleAnalytics.tsx
│   ├── lib/                      # ユーティリティ関数と設定
│   │   ├── api.ts                # BFF API クライアント関数
│   │   ├── types.ts              # TypeScript 型定義
│   │   ├── utils.ts              # ユーティリティ関数
│   │   ├── constants.ts          # アプリケーション定数
│   │   ├── env.ts                # 環境変数ハンドリング
│   │   ├── seo.ts                # SEOユーティリティ
│   │   ├── cookies.ts            # Cookieハンドリング
│   │   ├── mockData.ts           # 開発用モックデータ
│   │   └── openapi/              # OpenAPI生成型
│   │       ├── schema.ts         # 生成されたTypeScript型
│   │       └── index.ts          # 型ヘルパー
│   └── types/                    # 追加の型定義
│       └── rehype.d.ts           # Rehype型宣言
├── schema/                       # OpenAPIスキーマ（gitサブモジュール）
│   └── openapi.yaml
├── public/                       # 静的アセット
├── next.config.mjs               # Next.js設定
└── package.json                  # プロジェクト依存関係
```

## 主要技術

- **Next.js 14**: App Router を使用した React フレームワーク
- **TypeScript**: 型安全性と優れた開発体験
- **Tailwind CSS**: ユーティリティファーストな CSS フレームワーク
- **React**: UI ライブラリ (v18+)

## 環境変数

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_KEY=your-nerine-api-key
NEXT_PUBLIC_GA_ID=GA-XXXXXXXXX
NEXT_PUBLIC_GSC_VERIFICATION_CODE=XXXXXXXXX
```

## BFF API 統合

### 使用する API エンドポイント

- `GET /api/v1/articles?page=1&limit=10` - ページネーション付き記事一覧
- `GET /api/v1/articles/:id` - 記事詳細
- `GET /api/v1/articles/popular?limit=5` - 人気記事
- `GET /api/v1/articles/latest?limit=5` - 最新記事
- `GET /api/v1/categories/:slug/articles?page=1` - カテゴリ別記事
- `GET /api/v1/categories` - カテゴリ一覧

### API クライアント構造

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

### 認証

すべての API 呼び出しには、BFF 設定に一致する API キーを含む `X-API-Key` ヘッダーが必要です。

## Next.js 設定

### 静的エクスポート設定

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = nextConfig;
```

### ビルド戦略

- **開発環境**: 標準的な Next.js 開発サーバー
- **本番環境**: AWS S3 デプロイ用の静的エクスポート
- **データ取得**: `generateStaticParams` と `fetch` によるビルド時静的生成

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# OpenAPIスキーマからTypeScript型を生成
npm run generate:types

# 開発サーバーの起動
npm run dev

# 本番用ビルド（静的エクスポート）
npm run build

# ビルド成果物のクリーンアップ
npm run clean

# 本番サーバーの起動（テスト用）
npm start

# リンティング
npm run lint
```

## スキーマ駆動開発

### OpenAPI 型生成

このプロジェクトは OpenAPI スキーマを使用して TypeScript 型を自動生成します：

```bash
# OpenAPIスキーマから型を生成
npm run generate:types

# 生成された型は src/lib/openapi/ に配置されます
```

### 型の使用方法

```typescript
// OpenAPI生成型をインポート
import type { Article, ArticlesResponse, ErrorResponse } from "@/lib/types";

// すべての型がスキーマ駆動でBFF APIと一貫性があります
```

### スキーマ構造

- **スキーマソース**: `/schema/openapi.yaml` (サブモジュール)
- **生成された型**: `/src/lib/openapi/schema.ts`
- **型ヘルパー**: `/src/lib/openapi/index.ts`
- **アプリケーション型**: `/src/lib/types.ts` (OpenAPI 型の再エクスポート)

## データ取得パターン

### 静的生成（推奨）

```typescript
// src/app/page.tsx - 記事一覧
export default async function HomePage() {
  const response = await getArticles({ page: 1, limit: 10 });
  return <ArticleList articles={response.articles} />;
}

// src/app/articles/[id]/page.tsx - 記事詳細
export async function generateStaticParams() {
  const response = await getArticles({ limit: 100 });
  return response.articles.map((article: Article) => ({
    id: article.ID,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticle(params.id);
  return <ArticleDetail article={article} />;
}
```

### エラーハンドリング（OpenAPI スキーマ駆動）

```typescript
// src/lib/api.ts
export async function getArticles(
  params: GetArticlesParams = {}
): Promise<ArticlesResponse> {
  try {
    const response = await apiRequest<ArticlesResponse>(
      `/api/v1/articles${queryString}`
    );
    return response;
  } catch (error) {
    if (error instanceof ApiErrorClass) {
      // エラーはOpenAPI ErrorResponseスキーマに従います
      console.error("API Error:", error.toErrorResponse());
    }
    throw error;
  }
}
```

### API レスポンス構造（OpenAPI スキーマ）

```typescript
// ArticlesResponseはOpenAPIスキーマに従います
{
  articles: Article[];
  pagination?: {
    total?: number;
    page?: number;
    limit?: number;
    totalPages?: number;
  };
}

// ErrorResponseはOpenAPIスキーマに従います
{
  error: string;
  detail?: string;
}
```

## コンポーネントパターン

### 記事コンポーネント

```typescript
// src/components/article/ArticleCard.tsx
interface ArticleCardProps {
  article: Article;
  variant?: "default" | "compact";
}

export function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps) {
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

### レイアウトコンポーネント

```typescript
// src/components/layout/Header.tsx
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

## スタイリングガイドライン

### Tailwind CSS の使用方法

- スタイリングにはユーティリティクラスを使用
- 繰り返しパターンはカスタムコンポーネントを作成
- レスポンシブデザインユーティリティを使用（`sm:`, `md:`, `lg:`, `xl:`）
- 一貫したスペーシングとタイポグラフィスケールを維持

### カラースキーム

```css
- Primary: #1e646e
- Secondary: #7ab6a9
- Accent: #0f4c54

- Success: #10b981
- Warning: #f59e0b
- Error: #ef4444
- Info: #3b82f6

- Foreground: #111827
- Muted Foreground: #4b5563
- Muted: #6b7280
- Border: #e5e7eb
- Background: #ffffff
- Muted Background: #f9fafb

- Dark Background: #0a0a0a
- Dark Foreground: #ededed
- Dark Muted Background: #1a202c
- Dark Border: #2d3748
```

## パフォーマンス最適化

### 画像最適化

```typescript
// 静的エクスポートではNext.jsの画像最適化が無効になるため
// 適切な属性を持つ標準のimgタグを使用
<img
  src={article.Image}
  alt={article.Title}
  className="w-full h-48 object-cover"
  loading="lazy"
/>
```

### バンドル最適化

- 大きなコンポーネントには動的インポートを使用
- クライアントサイド JavaScript を最小化
- SEO のために静的生成を活用

## デプロイメント戦略

### GitHub Actions 自動デプロイ

本番環境へのデプロイは GitHub Actions を使用して自動化されています。

#### デプロイトリガー

- **手動デプロイ**: `workflow_dispatch` で GitHub から手動実行
- **自動デプロイ**: `repository_dispatch` で microCMS の更新時に自動実行

#### デプロイフロー

1. **環境準備**: Node.js 22 セットアップ、AWS 認証設定
2. **Nerine API 起動**: Docker で BFF API を一時的に起動
   ```bash
   docker pull ghcr.io/kozennoki/nerine:latest
   docker run -d --name nerine -p 8080:8080 [環境変数] ghcr.io/kozennoki/nerine:latest
   ```
3. **ビルド実行**: `npm run build:ci` で静的ファイル生成
4. **S3 アップロード**: 最適化されたキャッシュ戦略でファイルをアップロード
   - 静的アセット: 1 年間キャッシュ (`max-age=31536000,immutable`)
   - HTML ファイル: 1 時間キャッシュ (`max-age=3600,must-revalidate`)
   - sitemap.xml/robots.txt: 1 時間キャッシュ
5. **クリーンアップ**: Docker コンテナの停止・削除

#### 必要な環境変数・シークレット

```bash
# AWS設定
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
S3_BUCKET

# API設定
MICROCMS_API_KEY
MICROCMS_SERVICE_ID
NERINE_API_KEY

# Analytics設定
GA_ID
GSC_VERIFICATION_CODE
```

#### キャッシュ戦略

- **静的アセット** (CSS, JS, Images): 長期キャッシュ (1 年)
- **HTML ファイル**: 短期キャッシュ (1 時間) + revalidation
- **メタファイル** (sitemap, robots): 短期キャッシュ (1 時間)

### ローカル開発設定

```bash
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_API_KEY=your-api-key
NEXT_PUBLIC_GA_ID=GA-XXXXXXXXX
```

### 本番環境

- **サイト URL**: https://kozennoki.com
- **AWS リージョン**: ap-northeast-1
- **ビルド出力**: `out/` ディレクトリ（静的エクスポート）
- **CDN**: CloudFront（キャッシュ無効化は 3-5 分）

## SEO 対応

### メタデータ

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: "Blog Title",
  description: "Blog description",
};

// src/app/articles/[id]/page.tsx
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const article = await getArticle(params.id);

  return {
    title: article.Title,
    description: article.Description,
  };
}
```

### 静的生成の利点

- SEO 向上のための事前レンダリング HTML
- より高速な初期ページロード
- より良い Core Web Vitals スコア

## テスト戦略

### ユニットテスト（将来）

- Jest + React Testing Library
- コンポーネントテスト
- ユーティリティ関数テスト

### 統合テスト（将来）

- API 統合テスト
- Playwright を使用した End-to-End テスト

## 開発ワークフロー

### 開発開始

1. リポジトリをクローン
2. 依存関係をインストール: `npm install`
3. `.env.local`で環境変数を設定
4. BFF API がローカルで動作していることを確認
5. 開発サーバーを開始: `npm run dev`

### 新機能の追加

1. 適切なディレクトリにコンポーネントを作成
2. `src/lib/types.ts`に TypeScript 型を追加
3. `src/lib/api.ts`の API クライアント関数を更新
4. BFF API でローカルテスト
5. ビルドして静的エクスポートが動作することを確認

### デプロイ前の確認

1. `npm run generate:types`を実行して型が最新であることを確認
2. `npm run build`を実行して静的エクスポートが動作することを確認
3. 生成された静的ファイルをテスト
4. すべての API エンドポイントが正しく動作することを確認
5. 複数画面サイズでレスポンシブデザインを確認

## 一般的な開発タスク

### 新しいページの追加

1. `src/app/`ディレクトリにページファイルを作成
2. 必要なデータ取得ロジックを追加
3. コンポーネントを作成または再利用
4. 必要に応じてナビゲーションを更新

### 新しいコンポーネントの追加

1. 適切な`src/components/`サブディレクトリにコンポーネントファイルを作成
2. TypeScript インターフェースを定義
3. Tailwind CSS で実装
4. 必要に応じて index ファイルからエクスポート

### API 統合

1. 必要に応じて`/schema/openapi.yaml`の OpenAPI スキーマを更新
2. `npm run generate:types`を実行して TypeScript 型を更新
3. 生成された型を使用して`src/lib/api.ts`に API 関数を追加
4. OpenAPI エラースキーマでローディングとエラー状態を処理
5. 適切なエラーバウンダリを実装

## トラブルシューティング

### よくある問題

- **型生成の失敗**: `/schema/openapi.yaml`の OpenAPI スキーマの有効性を確認
- **静的エクスポートの失敗**: 動的インポートやサーバーサイドコードをチェック
- **API 接続問題**: 環境変数と BFF API の状態を確認
- **ビルドエラー**: `npm run generate:types`を実行して TypeScript 型をチェック
- **型の不一致**: OpenAPI スキーマが BFF API と最新であることを確認
- **スタイリング問題**: Tailwind CSS クラスとレスポンシブデザインを確認

### パフォーマンス問題

- コンポーネント分析に React DevTools を使用
- `npm run build`でバンドルサイズをチェック
- 画像とアセットを最適化
- API レスポンス時間を確認

このガイドは、Nerine ブログフロントエンドの構築におけるプロジェクト構造と開発パターンの理解に役立ちます。

## Git コミットルール

### コミットメッセージ形式

```
<絵文字> <簡潔な要約>

詳細な説明（必要に応じて）

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 絵文字の使用方法

- ✨ `:sparkles:` - 新機能の追加
- 🐛 `:bug:` - バグ修正
- 🎨 `:art:` - UI/UX の改善
- ♻️ `:recycle:` - コードのリファクタリング
- 📚 `:books:` - ドキュメントの追加または更新
- 🚨 `:rotating_light:` - テストの追加

### コミット例

```bash
git commit -m ":sparkles: カテゴリ機能の実装

- カテゴリ別記事一覧ページを追加
- ナビゲーションにドロップダウンメニューを実装
- 静的サイト生成対応

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### ガイドライン

1. **コミットメッセージには日本語を使用** - このプロジェクトではコミット説明に日本語を使用
2. **絵文字は必須** - 変更の種類を明確に示すため
3. **最初の行は 50 文字以内** - GitHub 表示を見やすくするため
4. **Claude Code シグネチャを含める** - AI 生成コードには常に追加
