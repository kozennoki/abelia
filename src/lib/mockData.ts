import type { Article, Category, ArticleListResponse, CategoryListResponse } from './types';

// Mock categories
export const mockCategories: Category[] = [
  { Slug: 'tech', Name: 'テクノロジー' },
  { Slug: 'lifestyle', Name: 'ライフスタイル' },
  { Slug: 'business', Name: 'ビジネス' },
  { Slug: 'design', Name: 'デザイン' },
  { Slug: 'tutorial', Name: 'チュートリアル' },
  { Slug: 'zenn', Name: 'Zenn' },
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
  {
    ID: '7',
    Title: 'Docker ComposeでローカルDOOLS環境構築',
    Image: 'https://picsum.photos/800/400?random=7',
    Category: mockCategories[0],
    Description: 'Docker Composeを使ってローカル開発環境を効率的に構築する方法を詳しく解説します。',
    Body: `# Docker ComposeでローカルDOOLS環境構築

Docker Composeを活用したローカル開発環境の設計と実装について説明します。

## Docker Composeの利点

- サービス間の依存関係管理
- 一貫した開発環境
- 簡単なスケーリング

## 実装例

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
\`\`\``,
    CreatedAt: '2024-01-09T08:45:00Z',
    UpdatedAt: '2024-01-09T08:45:00Z',
  },
  {
    ID: '8',
    Title: 'GraphQLとRESTの使い分け指針',
    Image: 'https://picsum.photos/800/400?random=8',
    Category: mockCategories[0],
    Description: 'GraphQLとREST APIのそれぞれの特徴を理解し、プロジェクトに最適な選択をするためのガイドラインを提供します。',
    Body: `# GraphQLとRESTの使い分け指針

GraphQLとREST APIの特徴を比較し、適切な選択方法を解説します。

## GraphQLの特徴

- 単一エンドポイント
- クエリによるデータ取得制御
- 強力な型システム

## RESTの特徴

- シンプルなHTTPメソッド
- キャッシュ性能
- 幅広いツールサポート

## 選択の指針

プロジェクトの要件や チーム のスキルセットに応じて最適な選択を行いましょう。`,
    CreatedAt: '2024-01-08T15:20:00Z',
    UpdatedAt: '2024-01-08T15:20:00Z',
  },
  {
    ID: '9',
    Title: 'AWS CloudFormationでインフラをコード化',
    Image: 'https://picsum.photos/800/400?random=9',
    Category: mockCategories[0],
    Description: 'AWS CloudFormationを使ったインフラストラクチャ as Code（IaC）の実践方法を具体例と共に紹介します。',
    Body: `# AWS CloudFormationでインフラをコード化

CloudFormationを使ったインフラ管理の自動化について解説します。

## IaCの利点

- 環境の一貫性
- 変更履歴の管理
- 再現可能なデプロイ

## テンプレート例

\`\`\`yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
\`\`\``,
    CreatedAt: '2024-01-07T12:10:00Z',
    UpdatedAt: '2024-01-07T12:10:00Z',
  },
  {
    ID: '10',
    Title: 'デザインシステムの設計と運用',
    Image: 'https://picsum.photos/800/400?random=10',
    Category: mockCategories[3],
    Description: 'スケーラブルなデザインシステムの構築から運用まで、実践的なアプローチを詳しく解説します。',
    Body: `# デザインシステムの設計と運用

効果的なデザインシステムの構築方法について説明します。

## 構成要素

- デザイントークン
- コンポーネントライブラリ
- ガイドライン

## 運用のポイント

- チーム間の連携
- バージョン管理
- 継続的な改善`,
    CreatedAt: '2024-01-06T09:30:00Z',
    UpdatedAt: '2024-01-06T09:30:00Z',
  },
  {
    ID: '11',
    Title: 'アジャイル開発でのユーザーストーリー作成',
    Image: 'https://picsum.photos/800/400?random=11',
    Category: mockCategories[2],
    Description: 'アジャイル開発における効果的なユーザーストーリーの作成方法と、チーム内での活用法を解説します。',
    Body: `# アジャイル開発でのユーザーストーリー作成

効果的なユーザーストーリーの書き方について解説します。

## ユーザーストーリーの構造

- 役割（Who）
- 機能（What）
- 理由（Why）

## 良いストーリーの条件

- Independent（独立性）
- Negotiable（交渉可能）
- Valuable（価値がある）
- Estimable（見積もり可能）
- Small（小さい）
- Testable（テスト可能）`,
    CreatedAt: '2024-01-05T14:15:00Z',
    UpdatedAt: '2024-01-05T14:15:00Z',
  },
  {
    ID: '12',
    Title: 'フリーランスとして成功するためのスキルセット',
    Image: 'https://picsum.photos/800/400?random=12',
    Category: mockCategories[1],
    Description: 'フリーランスエンジニアとして独立し、持続可能なキャリアを築くために必要なスキルと戦略を紹介します。',
    Body: `# フリーランスとして成功するためのスキルセット

フリーランスエンジニアに必要なスキルについて説明します。

## 技術スキル

- 複数言語・フレームワークの習得
- クラウドサービスの理解
- セキュリティ知識

## ビジネススキル

- コミュニケーション能力
- プロジェクト管理
- 価格設定・交渉力`,
    CreatedAt: '2024-01-04T11:45:00Z',
    UpdatedAt: '2024-01-04T11:45:00Z',
  },
  {
    ID: '13',
    Title: 'レスポンシブデザインの実装テクニック',
    Image: 'https://picsum.photos/800/400?random=13',
    Category: mockCategories[3],
    Description: 'モバイルファーストなレスポンシブデザインの実装方法と、様々なデバイスに対応するためのベストプラクティスを解説します。',
    Body: `# レスポンシブデザインの実装テクニック

効果的なレスポンシブデザインの実装方法を解説します。

## モバイルファーストアプローチ

- 小さい画面から設計
- プログレッシブエンハンスメント
- パフォーマンス重視

## 実装のポイント

- フレキシブルグリッドシステム
- 柔軟な画像・メディア
- CSS メディアクエリの活用

\`\`\`css
@media (min-width: 768px) {
  .container {
    max-width: 750px;
  }
}
\`\`\``,
    CreatedAt: '2024-01-03T16:20:00Z',
    UpdatedAt: '2024-01-03T16:20:00Z',
  },
  {
    ID: '14',
    Title: 'Node.jsでのAPIセキュリティ強化',
    Image: 'https://picsum.photos/800/400?random=14',
    Category: mockCategories[0],
    Description: 'Node.js APIアプリケーションのセキュリティを強化するための実践的な手法と、セキュリティベストプラクティスを紹介します。',
    Body: `# Node.jsでのAPIセキュリティ強化

Node.js APIのセキュリティ対策について詳しく解説します。

## 主なセキュリティ脅威

- SQLインジェクション
- XSS攻撃
- CSRF攻撃
- 認証・認可の脆弱性

## 対策手法

- バリデーション・サニタイゼーション
- HTTPSの使用
- レート制限の実装
- セキュリティヘッダーの設定

\`\`\`javascript
const helmet = require('helmet');
app.use(helmet());
\`\`\``,
    CreatedAt: '2024-01-02T13:55:00Z',
    UpdatedAt: '2024-01-02T13:55:00Z',
  },
  {
    ID: '15',
    Title: 'Webパフォーマンス最適化の実践ガイド',
    Image: 'https://picsum.photos/800/400?random=15',
    Category: mockCategories[0],
    Description: 'Webサイトのパフォーマンスを大幅に改善するための具体的な手法と測定方法を、実例を交えて詳しく解説します。',
    Body: `# Webパフォーマンス最適化の実践ガイド

Webパフォーマンス向上のための実践的な手法を紹介します。

## パフォーマンス指標

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)

## 最適化手法

- 画像最適化
- コード分割
- キャッシュ戦略
- CDNの活用

## 測定ツール

- Lighthouse
- WebPageTest
- Chrome DevTools`,
    CreatedAt: '2024-01-01T10:30:00Z',
    UpdatedAt: '2024-01-01T10:30:00Z',
  },
  {
    ID: '16',
    Title: 'マイクロサービスアーキテクチャの設計原則',
    Image: 'https://picsum.photos/800/400?random=16',
    Category: mockCategories[0],
    Description: 'マイクロサービスアーキテクチャの基本概念から設計原則まで、実装時の考慮点を含めて総合的に解説します。',
    Body: `# マイクロサービスアーキテクチャの設計原則

マイクロサービスの効果的な設計方法について説明します。

## 設計原則

- 単一責任の原則
- 疎結合・高凝集
- 分散データ管理
- 自律性の確保

## 実装の考慮点

- サービス境界の定義
- データ一貫性の管理
- 監視・ログ戦略
- デプロイメント戦略`,
    CreatedAt: '2023-12-31T15:40:00Z',
    UpdatedAt: '2023-12-31T15:40:00Z',
  },
  {
    ID: '17',
    Title: 'DevOpsとCI/CDパイプライン構築',
    Image: 'https://picsum.photos/800/400?random=17',
    Category: mockCategories[0],
    Description: 'DevOps文化の醸成からCI/CDパイプラインの構築まで、開発・運用プロセスの改善方法を実践的に解説します。',
    Body: `# DevOpsとCI/CDパイプライン構築

効率的なDevOps環境の構築方法について解説します。

## DevOpsの原則

- 開発と運用の協業
- 継続的改善
- 自動化の推進
- 迅速なフィードバックループ

## CI/CDパイプライン

- コード品質チェック
- 自動テスト実行
- 自動デプロイ
- 監視・アラート

## ツールチェーン

- Git + GitHub Actions
- Docker + Kubernetes
- Terraform + Ansible`,
    CreatedAt: '2023-12-30T09:25:00Z',
    UpdatedAt: '2023-12-30T09:25:00Z',
  },
  {
    ID: '18',
    Title: 'Vue.js 3 Composition APIの活用法',
    Image: 'https://picsum.photos/800/400?random=18',
    Category: mockCategories[4],
    Description: 'Vue.js 3で導入されたComposition APIの使い方から、実際のプロジェクトでの活用方法まで詳しく解説します。',
    Body: `# Vue.js 3 Composition APIの活用法

Vue.js 3のComposition APIを効果的に活用する方法を紹介します。

## Composition APIの利点

- ロジックの再利用性向上
- TypeScriptとの親和性
- テストの容易さ

## 基本的な使い方

\`\`\`javascript
import { ref, computed, watch } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    watch(count, (newValue) => {
      console.log(\`Count changed to \${newValue}\`)
    })

    return { count, doubleCount }
  }
}
\`\`\``,
    CreatedAt: '2023-12-29T14:50:00Z',
    UpdatedAt: '2023-12-29T14:50:00Z',
  },
];

// Mock Zenn articles
export const mockZennArticles: Article[] = [
  {
    ID: 'zenn-1',
    Title: 'Reactの新機能React Server Componentsを理解する',
    Image: '⚛️',
    Category: mockCategories[5],
    Description: 'React Server Componentsの仕組みと従来のクライアントコンポーネントとの違い、実際の使い方について詳しく解説します。',
    Body: `# React Server Componentsを理解する

React Server Componentsの新しいパラダイムについて解説します。

## Server Componentsの特徴

- サーバーサイドでレンダリング
- バンドルサイズの削減
- データフェッチの最適化

## 実装例

\`\`\`jsx
// Server Component
async function ArticleList() {
  const articles = await fetchArticles();
  return (
    <div>
      {articles.map(article => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
\`\`\``,
    CreatedAt: '2024-01-20T09:00:00Z',
    UpdatedAt: '2024-01-20T09:00:00Z',
  },
  {
    ID: 'zenn-2',
    Title: 'TypeScript 5.0の新機能まとめ',
    Image: '🔷',
    Category: mockCategories[5],
    Description: 'TypeScript 5.0で追加された新機能と改善点について、具体的な使用例とともに紹介します。',
    Body: `# TypeScript 5.0の新機能まとめ

TypeScript 5.0の注目すべき新機能を紹介します。

## 主な新機能

- Decorator
- const type parameters
- satisfies operator
- 新しいtype modifiers

## 実装例

\`\`\`typescript
// const type parameters
function freeze<const T>(obj: T): T {
  return Object.freeze(obj);
}

const frozenArray = freeze([1, 2, 3] as const);
// type: readonly [1, 2, 3]
\`\`\``,
    CreatedAt: '2024-01-19T14:30:00Z',
    UpdatedAt: '2024-01-19T14:30:00Z',
  },
  {
    ID: 'zenn-3',
    Title: 'Viteで始める高速なフロントエンド開発',
    Image: '⚡',
    Category: mockCategories[5],
    Description: 'Viteを使った高速な開発環境の構築方法と、Webpackとの違いについて実践的に解説します。',
    Body: `# Viteで始める高速なフロントエンド開発

Viteを使った効率的な開発環境の構築方法を紹介します。

## Viteの特徴

- 高速なHMR
- ESモジュールベース
- プラグインエコシステム

## セットアップ

\`\`\`bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

## 設定例

\`\`\`javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
})
\`\`\``,
    CreatedAt: '2024-01-18T11:15:00Z',
    UpdatedAt: '2024-01-18T11:15:00Z',
  },
  {
    ID: 'zenn-4',
    Title: 'Prismaを使ったタイプセーフなDB操作',
    Image: '🗄️',
    Category: mockCategories[5],
    Description: 'Prismaを使ったタイプセーフなデータベース操作の実装方法と、パフォーマンス最適化のテクニックを紹介します。',
    Body: `# Prismaを使ったタイプセーフなDB操作

Prismaを活用したモダンなデータベース操作について解説します。

## Prismaの利点

- 型安全なクエリ
- マイグレーション管理
- 優れた開発体験

## スキーマ定義

\`\`\`prisma
model User {
  id       Int      @id @default(autoincrement())
  email    String   @unique
  name     String?
  posts    Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
\`\`\`

## 使用例

\`\`\`typescript
const user = await prisma.user.create({
  data: {
    name: 'Alice',
    email: 'alice@example.com',
    posts: {
      create: [
        { title: 'Hello World' },
        { title: 'My second post' }
      ]
    }
  }
})
\`\`\``,
    CreatedAt: '2024-01-17T16:45:00Z',
    UpdatedAt: '2024-01-17T16:45:00Z',
  },
  {
    ID: 'zenn-5',
    Title: 'SvelteKitでフルスタックアプリ開発',
    Image: '🧡',
    Category: mockCategories[5],
    Description: 'SvelteKitを使ったフルスタックアプリケーションの開発手法と、Next.jsとの違いについて詳しく解説します。',
    Body: `# SvelteKitでフルスタックアプリ開発

SvelteKitを使った効率的なフルスタック開発について説明します。

## SvelteKitの特徴

- コンパイル時最適化
- 小さなバンドルサイズ
- シンプルな学習コスト

## ルーティング

\`\`\`
src/routes/
├── +layout.svelte
├── +page.svelte
├── about/
│   └── +page.svelte
└── api/
    └── posts/
        └── +server.js
\`\`\`

## API Routes

\`\`\`javascript
// src/routes/api/posts/+server.js
import { json } from '@sveltejs/kit';

export async function GET() {
  const posts = await getPosts();
  return json(posts);
}
\`\`\``,
    CreatedAt: '2024-01-16T13:20:00Z',
    UpdatedAt: '2024-01-16T13:20:00Z',
  },
  {
    ID: 'zenn-6',
    Title: 'TurboとMonorepoでの開発効率化',
    Image: '🚀',
    Category: mockCategories[5],
    Description: 'TurboとNx を使ったMonorepo構成での開発効率化と、大規模プロジェクトでのベストプラクティスを紹介します。',
    Body: `# TurboとMonorepoでの開発効率化

Monorepo構成での効率的な開発手法について解説します。

## Turboの利点

- インクリメンタルビルド
- 並列処理の最適化
- キャッシュ機能

## プロジェクト構成

\`\`\`
monorepo/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── ui/
│   └── shared/
└── turbo.json
\`\`\`

## turbo.json設定

\`\`\`json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    }
  }
}
\`\`\``,
    CreatedAt: '2024-01-15T10:55:00Z',
    UpdatedAt: '2024-01-15T10:55:00Z',
  },
  {
    ID: 'zenn-7',
    Title: 'WebAssemblyとRustでWebパフォーマンス向上',
    Image: '🦀',
    Category: mockCategories[5],
    Description: 'WebAssemblyとRustを組み合わせて、Webアプリケーションのパフォーマンスを大幅に向上させる方法を実例とともに解説します。',
    Body: `# WebAssemblyとRustでWebパフォーマンス向上

WebAssemblyを活用したパフォーマンス最適化について説明します。

## WebAssemblyの利点

- ネイティブ並みの性能
- 言語非依存
- セキュアな実行環境

## Rustでの実装

\`\`\`rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}
\`\`\`

## JavaScript側での使用

\`\`\`javascript
import init, { fibonacci } from './pkg/my_wasm.js';

async function run() {
  await init();
  const result = fibonacci(40);
  console.log(result);
}
\`\`\``,
    CreatedAt: '2024-01-14T08:30:00Z',
    UpdatedAt: '2024-01-14T08:30:00Z',
  },
  {
    ID: 'zenn-8',
    Title: 'Deno 2.0の新機能と実践的な使い方',
    Image: '🦕',
    Category: mockCategories[5],
    Description: 'Deno 2.0で追加された新機能の紹介と、Node.jsからの移行時の注意点について実践的に解説します。',
    Body: `# Deno 2.0の新機能と実践的な使い方

Deno 2.0の新機能と実用的な活用方法について説明します。

## Deno 2.0の新機能

- npm パッケージサポート向上
- パフォーマンス改善
- Web標準APIの拡充

## HTTPサーバーの実装

\`\`\`typescript
// server.ts
import { serve } from "https://deno.land/std@0.200.0/http/server.ts";

const handler = (req: Request): Response => {
  return new Response("Hello, Deno!");
};

serve(handler, { port: 8000 });
\`\`\`

## 実行方法

\`\`\`bash
deno run --allow-net server.ts
\`\`\``,
    CreatedAt: '2024-01-13T15:10:00Z',
    UpdatedAt: '2024-01-13T15:10:00Z',
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

// Zenn articles utility functions
export function getMockZennArticles(limit: number = 5): Article[] {
  return mockZennArticles.slice(0, limit);
}

export function generateMockZennArticleListResponse(
  page: number = 1,
  limit: number = 10
): ArticleListResponse {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArticles = mockZennArticles.slice(startIndex, endIndex);

  return {
    articles: paginatedArticles,
    pagination: {
      total: mockZennArticles.length,
      page,
      limit,
      totalPages: Math.ceil(mockZennArticles.length / limit),
    },
  };
}

export function getMockZennArticleById(id: string): Article | undefined {
  return mockZennArticles.find(article => article.ID === id);
}

export function getMockZennArticlesByCategory(categorySlug: string): Article[] {
  return mockZennArticles.filter(article => article.Category.Slug === categorySlug);
}

export function getMockPopularZennArticles(limit: number = 5): Article[] {
  return mockZennArticles
    .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
    .slice(0, limit);
}

export function getMockLatestZennArticles(limit: number = 5): Article[] {
  return mockZennArticles
    .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime())
    .slice(0, limit);
}

// Simulate API delay for more realistic behavior
export function delay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
