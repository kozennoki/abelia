# Next.js 学習記録 - Abelia プロジェクト

## 学習概要

このドキュメントは、Next.js 初心者向けに Nerine ブログシステムのフロントエンド（Abelia）の実装を通じて学習した内容をまとめています。

---

## 1. Next.js 14 App Router

### 基本概念

**従来のPages Router vs 新しいApp Router**

```bash
# Pages Router (従来)
pages/
├── index.js          # / (ホーム)
├── about.js           # /about
├── posts/
│   ├── index.js       # /posts
│   └── [id].js        # /posts/123
└── _app.js            # 全ページ共通レイアウト

# App Router (新しい)
app/
├── page.tsx           # / (ホーム)
├── layout.tsx         # 全ページ共通レイアウト
├── about/
│   └── page.tsx       # /about
└── posts/
    ├── page.tsx       # /posts
    └── [id]/
        └── page.tsx   # /posts/123
```

### App Router の改善点

**① レイアウトの柔軟性**
- 各階層に `layout.tsx` を配置可能
- ネストしたレイアウトが簡単に実現

**② Server Components（サーバーコンポーネント）**
- データをサーバー側で直接取得
- ページ表示前にデータが準備済み

**③ 特殊ファイルの役割分担**
```bash
app/
├── layout.tsx     # レイアウト（Header/Footer）
├── page.tsx       # ページ内容
├── loading.tsx    # ローディング表示
├── error.tsx      # エラー表示
└── not-found.tsx  # 404ページ
```

### 実装例

```tsx
// layout.tsx - 全ページ共通
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />           {/* 全ページにHeader */}
        <main className="flex-1">
          {children}         {/* ここに各ページの内容が入る */}
        </main>
        <Footer />           {/* 全ページにFooter */}
      </body>
    </html>
  );
}
```

---

## 2. Server Components

### 従来の方法との比較

**従来のReact（Client Side）**
```tsx
function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>読み込み中...</div>;
  return <ArticleList articles={articles} />;
}
```

**Server Components（今回の実装）**
```tsx
export default async function HomePage() {
  // サーバー側で実行される
  const articles = await getArticles({ page: 1, limit: 10 });
  
  // データが既に取得済みでHTMLが送信される
  return <ArticleList articles={articles} />;
}
```

### ユーザー体験の違い

**従来の方法:**
```
1. ページアクセス
2. 「読み込み中...」表示
3. API呼び出し実行
4. 1〜3秒後、記事一覧表示
```

**Server Components:**
```
1. ページアクセス
2. 即座に記事一覧表示（待ち時間なし）
```

### useState と useEffect の役割

**useState:** 
- 「変化する値」を管理
- `[現在の値, 値を更新する関数] = useState(初期値)`

**useEffect:**
- 「副作用」（APIの呼び出し、タイマー設定など）を実行
- コンポーネントが表示された後に実行される

**Server Componentsでは状態管理が不要:**
- データが最初から存在するため
- 「取得中」「取得完了」の状態管理が不要

---

## 3. 静的サイト生成（Static Site Generation）

### 仕組み

**静的サイト生成の場合（今回の実装）**
```
ビルド時（npm run build）
  ↓
サーバーでAPI呼び出し実行
  ↓  
HTMLファイルに記事データを埋め込んで生成
  ↓
ユーザーアクセス時は「既に完成したHTML」を返す
```

### メリット

- **高速表示:** 事前に生成されたHTMLを返すだけ
- **SEO効果:** 検索エンジンがコンテンツを読み取れる
- **サーバー不要:** CDN等での配信が可能
- **低速回線でも快適:** APIの速度に影響されない

---

## 4. next.config.mjs の設定

### 静的エクスポート設定

```javascript
const nextConfig = {
  output: 'export',              // 静的ファイルとして出力
  trailingSlash: true,           // URL末尾にスラッシュ追加
  images: {
    unoptimized: true,           // 画像最適化を無効化
  },
  env: {                         // 環境変数の設定
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },
};
```

### 各設定の意味

**`output: 'export'`**
- 通常のNext.js = サーバーが必要
- 静的エクスポート = HTMLファイルだけでOK

**`images.unoptimized: true`**
- 静的エクスポートでは画像最適化が使えない
- サーバーがないため最適化処理ができない

**`env` 設定**
- 環境変数をアプリで使用可能にする
- `NEXT_PUBLIC_` = ブラウザでも使える環境変数

---

## 5. フレームワーク選択の検討

### 他の選択肢

**静的サイト生成に特化したフレームワーク:**

- **Astro:** 超高速、複数フレームワーク対応
- **Gatsby:** React + GraphQL
- **Hugo:** Go製、設定ファイルベース

### なぜNext.jsを選んだのか

1. **将来の拡張性** - 後で認証機能やダッシュボードを追加しやすい
2. **React生態系** - コンポーネントライブラリが豊富
3. **学習価値** - 実務でよく使われる
4. **TypeScript対応** - 型安全性

---

## 6. 環境変数とセキュリティ

### 環境変数の使い分け

**公開しても良い情報（NEXT_PUBLIC_）**
```bash
NEXT_PUBLIC_API_URL=https://api.example.com/v1  # 公開OK
NEXT_PUBLIC_SITE_NAME=My Blog                   # 公開OK
```

**公開してはいけない情報（NEXT_PUBLIC_なし）**
```bash
DATABASE_PASSWORD=secret123                     # 非公開
STRIPE_SECRET_KEY=sk_live_xxx                   # 非公開
```

### セキュリティ課題

**現在の問題:**
```bash
NEXT_PUBLIC_API_KEY=your-api-key-here  # ブラウザで見える = 危険
```

**解決策の選択肢:**

1. **APIルートでプロキシ**
2. **IP制限（サーバー設定）**
3. **ネットワークレベル制限**
4. **CDN/Edgeでのプロキシ**

---

## 7. プロジェクト構造

### 実装したディレクトリ構造

```
src/
├── app/                      # App Router
│   ├── layout.tsx            # 全ページ共通レイアウト
│   ├── page.tsx             # ホームページ
│   └── globals.css          # グローバルスタイル
├── components/              # コンポーネント
│   ├── layout/              # レイアウト関連
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── article/             # 記事関連
│   │   ├── ArticleCard.tsx
│   │   └── ArticleList.tsx
│   └── common/              # 共通コンポーネント
│       └── Loading.tsx
└── lib/                     # ユーティリティ
    ├── api.ts               # API client
    ├── types.ts             # 型定義
    ├── utils.ts             # ユーティリティ関数
    ├── constants.ts         # 定数
    └── env.ts               # 環境変数設定
```

---

## 8. 実装済み機能

### ✅ 完了したタスク

**フェーズ1: 基盤構築**
- [x] Next.js静的エクスポート設定 
- [x] 環境変数設定（.env.local）
- [x] TypeScript型定義（types.ts）
- [x] API Client基盤（api.ts）
- [x] ディレクトリ構造構築

**フェーズ2: コア機能実装**
- [x] Header/Footerレイアウト
- [x] ArticleCard/ArticleListコンポーネント
- [x] ホームページ（記事一覧）
- [x] エラーハンドリング

### 🚀 現在の状況

1. **ビルド成功:** 静的サイト生成が正常に動作
2. **型安全性:** TypeScript完全対応
3. **エラーハンドリング:** API未接続時も適切なUI表示
4. **レスポンシブ:** Tailwind CSSで基本対応済み

---

## 9. 今後の学習予定

### 次に学ぶ内容

1. **TypeScript型定義の詳細**
   - interface vs type
   - 型の合成と拡張
   - ユーティリティ型

2. **API設計とセキュリティ**
   - セキュリティ課題の解決
   - APIルートの実装
   - 認証とアクセス制御

3. **コンポーネント設計**
   - propsの設計
   - 再利用可能なコンポーネント
   - Tailwind CSSのベストプラクティス

4. **記事詳細ページの実装**
   - 動的ルーティング
   - generateStaticParams
   - SEOメタデータ

5. **カテゴリ機能の実装**
   - ネストしたルーティング
   - データフェッチングの最適化

### 未実装の機能

- [ ] 記事詳細ページ（`app/articles/[id]/page.tsx`）
- [ ] カテゴリページ（`app/categories/[slug]/page.tsx`）
- [ ] ページネーション機能
- [ ] エラーページ（`error.tsx`, `not-found.tsx`）
- [ ] ローディングページ（`loading.tsx`）

---

## 10. 重要な学習ポイント

### 理解できた概念

1. **App Router vs Pages Router**
   - ファイル構造の違い
   - レイアウトの柔軟性向上

2. **Server Components**
   - サーバー側でのデータ取得
   - 状態管理が不要になる理由
   - ユーザー体験の向上

3. **静的サイト生成**
   - ビルド時データ取得の仕組み
   - パフォーマンスとSEOの利点

4. **セキュリティ設計**
   - 環境変数の適切な使い分け
   - API Keyの保護方法

### 今後深めたい分野

1. **TypeScript:** より高度な型定義
2. **セキュリティ:** APIアクセス制御の実装
3. **パフォーマンス:** 最適化技術
4. **テスト:** コンポーネントテスト
5. **デプロイ:** 本番環境での運用

---

## 次回セッション開始時の確認事項

1. セキュリティ課題への対応方針の決定
2. TypeScript型定義の詳細説明から再開
3. 記事詳細ページの実装準備

**最新の進捗状況:** フェーズ1・2完了、フェーズ3（追加機能）の準備段階