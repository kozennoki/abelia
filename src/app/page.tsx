import { getArticles, getZennArticles } from "@/lib/api";
import { ArticleList } from "@/components/article";
import { Button } from "@/components/ui";
import { ParallaxHero, AboutSection } from "@/components/common";
import { HOME_ARTICLES_LIMIT, ZENN_ARTICLES_LIMIT } from "@/lib/constants";
import type { Article } from "@/lib/types";

export default async function HomePage() {
  let articles: Article[] = [];
  let zennArticles: Article[] = [];
  let error: string | null = null;

  try {
    // 記事の取得
    const response = await getArticles({
      page: 1,
      limit: HOME_ARTICLES_LIMIT,
    });
    articles = response.articles;

    // Zenn記事の取得
    try {
      zennArticles = await getZennArticles({ limit: ZENN_ARTICLES_LIMIT });
    } catch (err) {
      console.error("Failed to fetch Zenn articles:", err);
      // Zenn記事の取得失敗は致命的ではないので続行
    }
  } catch (err) {
    console.error("Failed to fetch articles:", err);
    error = "記事の取得に失敗しました。";
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            エラーが発生しました
          </h1>
          <p className="text-lg text-muted-foreground mb-8">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="-mt-16 md:-mt-20">
      {/* パララックスヒーローセクション */}
      <ParallaxHero
        backgroundImage="/top.jpg"
        logoImage="/top_logo.jpg"
      />

      {/* ブログ説明セクション */}
      <AboutSection />

      <div className="container mx-auto px-4 py-16" data-section="latest">
        {/* 最新記事セクション */}
        <div className="mb-2 flex flex-row items-center">
          <h2 className="text-3xl font-bold text-foreground mr-4">Recent</h2>
          <div className="font-light">- 最新記事 -</div>
        </div>

        <div className="border border-secondary mb-8"></div>

        <ArticleList articles={articles} />

        {/* 記事一覧へのリンク */}
        <div className="flex justify-center mt-8">
          <Button href="/articles">View More</Button>
        </div>

        {/* Zenn記事セクション */}
        <div className="mt-16 border-t border-border pt-16">
          <h2 className="text-2xl font-bold text-foreground mb-2">Zenn</h2>
          <div className="border border-secondary mb-8"></div>
          {zennArticles.length > 0 ? (
            <ArticleList articles={zennArticles} />
          ) : (
            <p className="text-muted py-4">Zenn記事がありません。</p>
          )}
        </div>

        {/* Zenn記事一覧へのリンク */}
        <div className="flex justify-center mt-8">
          <Button href="/categories/zenn">View More</Button>
        </div>
      </div>
    </div>
  );
}
