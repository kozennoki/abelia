# Abelia

Abelia は [Nerine](https://github.com/kozennoki/nerine) BFF API と連携するブログのフロントエンドアプリケーションです。Next.js 14 の App Router と静的サイト生成（SSG）を使用して構築されています。

Webサイト: https://kozennoki.com

![image](https://github.com/user-attachments/assets/13ddcd59-7414-4d94-a4ab-385f0b55f584)

## 概要

このプロジェクトは、microCMSをコンテンツソースとし、GoベースのBFF(Backend for Frontend)APIとフロントエンドを分離した、ブログシステムのフロントエンド部分です。静的サイト生成により、高速なページロード、優れたSEO、低コストなホスティングを実現しています。

**特徴:**
- **静的サイト生成**: ビルド時に全ページを事前生成し、CDNから配信
- **OpenAPI スキーマ駆動**: バックエンドとの型安全な連携
- **自動デプロイ**: microCMSの更新をWebhookで検知し自動デプロイ

## 主要機能

- **記事管理**
  - 記事一覧・詳細表示
  - Zenn記事連携
  - カテゴリ別記事表示
  - ページネーション対応

- **UX/UI**
  - レスポンシブデザイン
  - ダークモード自動切り替え
  - モバイルメニュー対応

## アーキテクチャ
![Image](https://github.com/user-attachments/assets/9b78f0bb-6e3c-45ee-8cab-9ac028a6345a)

**設計思想:**
- **マイクロサービス**: Nerine BFFを介してコンテンツを取得
- **SSG**: ビルド時に全ページを生成し、CDNから配信
- **スキーマ駆動開発**: OpenAPIスキーマからTypeScript型を自動生成し、型安全性を確保

## 技術スタック

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: AWS (S3 + CloudFront)
- **API**: [Nerine](https://github.com/kozennoki/nerine)

## プロジェクト構造

```
src/
├── app/                # Next.js App Router
├── components/         # Reactコンポーネント
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

## カラーパレット

- **Primary**: #1e646e
- **Secondary**: #7ab6a9
- **BaseColor**: #FFFFFF

## 関連リポジトリ

- [Nerine](https://github.com/kozennoki/nerine) - Go ベースの BFF API
- [Hibiscus](https://github.com/kozennoki/api-schema) - OpenAPI スキーマ定義
