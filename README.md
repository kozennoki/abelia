# Abelia

Abelia は [Nerine](https://github.com/kozennoki/nerine) BFF API と連携するブログフロントエンドアプリケーションです。Next.js 14 の App Router と静的サイト生成を使用して構築されています。

## 特徴

- **静的サイト生成**: 高速なページロードと SEO 最適化
- **レスポンシブデザイン**: モバイルファーストなデザインアプローチ
- **ダークモード対応**: システム設定に基づく自動切り替え
- **シンタックスハイライト**: コードブロックの美しい表示
- **構造化データ**: リッチスニペット対応
- **PWA 対応**: オフライン機能とアプリライクな体験

## ️ 技術スタック

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: AWS (S3 + CloudFront)
- **API**: [Nerine BFF](https://github.com/kozennoki/nerine) (Go-based)
- **CMS**: [microCMS](https://microcms.io/)

## Getting Started

### 前提条件

- Node.js 22 以上
- npm または yarn
- Nerine API が稼働していること

### セットアップ

1. **リポジトリのクローン**

   ```bash
   git clone https://github.com/kozennoki/abelia.git
   cd abelia
   ```

2. **依存関係のインストール**

   ```bash
   npm install
   ```

3. **環境変数の設定**

   ```bash
   cp .env.local.example .env.local
   ```

   `.env.local` を編集:

   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8080
   NEXT_PUBLIC_API_KEY=your-nerine-api-key
   NEXT_PUBLIC_GA_ID=GA-XXXXXXXXX
   NEXT_PUBLIC_GSC_VERIFICATION_CODE=XXXXXXXXX
   ```

4. **OpenAPI 型定義の生成**

   ```bash
   npm run generate:types
   ```

5. **開発サーバーの起動**

   ```bash
   npm run dev
   ```

   [http://localhost:3000](http://localhost:3000) でアプリケーションにアクセスできます。

## プロジェクト構造

```
src/
├── app/                 # Next.js App Router
├── components/          # Reactコンポーネント
│   ├── article/        # 記事関連
│   ├── layout/         # レイアウト
│   ├── common/         # 共通コンポーネント
│   └── analytics/      # アナリティクス
├── lib/                # ユーティリティ関数
│   ├── api.ts          # API クライアント
│   ├── types.ts        # 型定義
│   └── openapi/        # 生成された型
└── types/              # 追加の型定義
```

## コマンド

| コマンド                 | 説明                         |
| ------------------------ | ---------------------------- |
| `npm run dev`            | 開発サーバーを起動           |
| `npm run build`          | 本番用ビルド                 |
| `npm run build:ci`       | CI 用ビルド                  |
| `npm run start`          | 本番サーバーを起動           |
| `npm run lint`           | ESLint を実行                |
| `npm run generate:types` | OpenAPI スキーマから型を生成 |
| `npm run clean`          | ビルド成果物をクリーンアップ |

## デプロイ

### 自動デプロイ

本番環境へのデプロイは GitHub Actions で自動化されています：

- **手動デプロイ**: GitHub の Actions タブから `Deploy to Production` ワークフローを実行
- **自動デプロイ**: microCMS の webhook により自動実行

### 手動デプロイ

```bash
# ビルド
npm run build

# S3にアップロード (AWS CLI設定済みの場合)
aws s3 sync out/ s3://your-bucket-name/ --delete
```

## カラーパレット

- **Primary**: #1e646e
- **Secondary**: #7ab6a9
- **BaseColor**: #FFFFFF

## 🔗 関連リポジトリ

- [Nerine (BFF API)](https://github.com/kozennoki/nerine) - Go ベースの BFF API
- [OpenAPI Schema](https://github.com/kozennoki/api-schema) - API スキーマ定義
