# Nerine ブログシステム フロントエンド開発タスク

## プロジェクト概要
Nerine BFF APIと連携するブログシステムのフロントエンドアプリケーション

**技術スタック:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- 静的サイト生成 (Static Export)

---

## 進捗管理

### 現在の状況（2025年6月30日更新）

#### ✅ 完了済み（フェーズ1: 基盤構築）
- [x] **1.1 プロジェクト設定更新** - 完了
  - [x] `next.config.mjs`を静的エクスポート対応に更新
  - [x] `.env.local`作成（API URL, API Key設定）
  - [x] 環境変数の型定義追加
  - [x] **モック機能追加** - 開発時にバックエンド不要

- [x] **1.2 ディレクトリ構造構築** - 完了
  - [x] `lib/`フォルダ作成
  - [x] `components/`フォルダ作成（layout, article, common）
  - [x] 必要なページファイル作成（App Router構造）

- [x] **1.3 TypeScript型定義** - 完了
  - [x] `lib/types.ts`でAPI レスポンス型を定義
  - [x] Article, Category, ArticleListResponse等の型
  - [x] 共通ユーティリティ型の定義

- [x] **1.4 API Client基盤** - 完了
  - [x] `lib/api.ts`でHTTP client実装（X-API-Keyヘッダー自動付与）
  - [x] エラーハンドリング機能
  - [x] 基本的なAPI関数（getArticles, getArticle等）
  - [x] **モック機能統合** - 環境変数で切り替え可能

#### ✅ 完了済み（フェーズ2: コア機能実装 - 一部）
- [x] **2.1 基本レイアウト** - 完了
  - [x] `components/layout/Header.tsx`（シンプルなナビゲーション）
  - [x] `components/layout/Footer.tsx`（最小限の情報）
  - [x] `app/layout.tsx`の更新（メタデータ、レイアウト適用）

- [x] **2.2 ホームページ（記事一覧）** - 完了
  - [x] `app/page.tsx`の実装（記事一覧表示）
  - [x] `components/article/ArticleCard.tsx`（記事カード）
  - [x] `components/article/ArticleList.tsx`（記事リスト）
  - [x] 静的生成設定
  - [x] **Hydrationエラー修正** - SSR/クライアント一貫性確保

#### 🔄 現在の実装状況
- **開発サーバー**: 動作確認済み（モックデータ使用）
- **記事一覧ページ**: ✅ 完全動作（6つのサンプル記事表示）
- **記事詳細ページ**: ❌ 未実装（404エラー）
- **カテゴリページ**: ❌ 未実装
- **モック機能**: ✅ 完全動作（`NEXT_PUBLIC_USE_MOCK=true`）

#### ⏳ 次の優先タスク
1. **2.3 記事詳細ページ** - 高優先度
   - [ ] `app/articles/[id]/page.tsx`の実装
   - [ ] `components/article/ArticleDetail.tsx`
   - [ ] `generateStaticParams`の実装
   - [ ] SEO用メタデータ生成

2. **2.4 エラー・ローディング状態** - 中優先度（一部完了）
   - [x] `components/common/Loading.tsx`
   - [ ] `app/error.tsx`（エラーページ）
   - [ ] `app/loading.tsx`（ローディング）
   - [ ] `app/not-found.tsx`（404ページ）

## 残りのタスク

### 🔥 優先度: 高
1. **記事詳細ページ実装**
   - [ ] `app/articles/[id]/page.tsx`
   - [ ] `components/article/ArticleDetail.tsx`
   - [ ] `generateStaticParams`実装

2. **エラー・404ページ**
   - [ ] `app/error.tsx`
   - [ ] `app/not-found.tsx`
   - [ ] `app/loading.tsx`

### 📋 優先度: 中
3. **カテゴリ機能**
   - [ ] `app/categories/[slug]/page.tsx`
   - [ ] カテゴリナビゲーション

4. **ページネーション**
   - [ ] `components/common/Pagination.tsx`

### 📝 優先度: 低
5. **レスポンシブ最適化**
6. **パフォーマンス最適化**

---

## 開発環境

### 環境変数
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_API_KEY=your-api-key-here
NEXT_PUBLIC_USE_MOCK=true  # モック機能ON/OFF
```

### 開発コマンド
```bash
npm run dev          # 開発サーバー起動
npm run build        # 本番ビルド（静的エクスポート）
npm run lint         # ESLint実行
```

### 技術的な成果
- ✅ **モック開発環境**: バックエンド API不要で開発可能
- ✅ **型安全性**: 完全なTypeScript対応
- ✅ **レスポンシブデザイン**: Tailwind CSS実装
- ✅ **静的サイト生成**: Next.js 14 App Router対応
- ✅ **Hydrationエラー解決**: サーバー・クライアント一貫性確保
