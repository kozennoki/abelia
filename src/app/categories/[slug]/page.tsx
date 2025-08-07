import { getCategoryArticles, getCategories, getZennArticles } from "@/lib/api";
import { ArticleList } from "@/components/article";
import { mockCategories } from "@/lib/mockData";
import { env } from "@/lib/env";
import type { Article, Category } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { capitalizeFirst } from "@/lib/utils";
import { SITE_NAME, SITE_URL, CATEGORY_DESCRIPTION_TEMPLATE, ERROR_CATEGORY_NOT_FOUND } from "@/lib/constants";

// 静的エクスポート用設定
export const dynamic = "force-static";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// generateStaticParams関数を追加（静的エクスポート用）
export async function generateStaticParams() {
  try {
    const categories = env.NEXT_PUBLIC_USE_MOCK
      ? mockCategories
      : await getCategories();

    return categories.map((category) => ({
      slug: category.Slug,
    }));
  } catch (error) {
    console.error("Error generating static params for categories:", error);
    throw error; // ビルド時のエラーは適切に処理する
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const categories = env.NEXT_PUBLIC_USE_MOCK
      ? mockCategories
      : await getCategories();

    const category = categories.find((c) => c.Slug === slug);

    if (!category) {
      return {
        title: `カテゴリが見つかりません`,
        description: ERROR_CATEGORY_NOT_FOUND,
      };
    }

    const title = `${category.Name}の記事一覧`;
    const description = CATEGORY_DESCRIPTION_TEMPLATE(category.Name);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        url: `${SITE_URL}/categories/${slug}`,
        siteName: SITE_NAME,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      alternates: {
        canonical: `${SITE_URL}/categories/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for category:", error);
    return {
      title: `カテゴリ | ${SITE_NAME}`,
      description: "カテゴリページです。",
    };
  }
}

// サーバーサイドで実行される関数
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;

  let category: Category | null = null;
  let articles: Article[] = [];
  let error: string | null = null;

  try {
    // カテゴリの存在確認
    const categories = env.NEXT_PUBLIC_USE_MOCK
      ? mockCategories
      : await getCategories();

    const foundCategory = categories.find((c) => c.Slug === slug);

    if (!foundCategory) {
      notFound();
      return;
    }

    category = foundCategory;

    // カテゴリの記事を全件取得
    if (slug === "zenn") {
      // Zennカテゴリの場合はgetZennArticlesを使用
      articles = await getZennArticles({ limit: 100 });
    } else {
      // 通常カテゴリの場合はgetCategoryArticlesを使用
      const response = await getCategoryArticles({
        slug,
        page: 1,
        limit: 100, // 全記事取得用の大きな値
      });
      articles = response.articles;
    }
  } catch (err) {
    console.error("Error fetching category articles:", err);
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

  if (!category) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:py-20 py-6">
      {/* カテゴリヘッダー */}
      <div className="mb-2 flex flex-row items-center">
        <h1 className="text-3xl font-bold text-foreground pr-4">
          {capitalizeFirst(category.Slug)}
        </h1>
        <div className="font-light">- {category.Name} -</div>
      </div>

      <div className="border border-secondary mb-8"></div>

      {/* 記事一覧 */}
      {articles.length > 0 ? (
        <ArticleList articles={articles} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted text-lg">
            このカテゴリにはまだ記事がありません。
          </p>
        </div>
      )}
    </div>
  );
}
