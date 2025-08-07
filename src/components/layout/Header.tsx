import Link from "next/link";
import { getCategories } from "@/lib/api";
import { mockCategories } from "@/lib/mockData";
import type { Category } from "@/lib/types";
import { MobileMenu } from "./MobileMenu";
import { capitalizeFirst } from "@/lib/utils";

interface HeaderProps {
  categories?: Category[];
}

export default async function Header({
  categories: initialCategories,
}: HeaderProps = {}) {
  let categories: Category[] = initialCategories || [];

  if (!initialCategories) {
    try {
      categories = await getCategories();
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      categories = mockCategories; // フォールバック
    }
  }

  return (
    <header className="border-b border-border bg-background fixed top-0 left-0 right-0 z-50">
      <div className="md:px-16 px-6">
        <nav className="flex items-center justify-between">
          {/* モバイル用: 左側の空スペース */}
          <div className="w-12 md:hidden"></div>

          {/* モバイル: ロゴを中央、PC: 左寄せ */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none flex items-center space-x-8">
            <Link href="/">
              <img src="/logo.jpg" alt="logo image" className="h-16"></img>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <div className="relative group">
              <Link
                href="/"
                className="relative font-josefin-sans text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center py-7 px-4 group"
              >
                Home
              </Link>
              {/* ヘッダー下ラインに合わせたアンダーライン */}
              <span className="absolute -bottom-0.5 left-1/2 w-0 h-1 bg-foreground transition-all duration-300 origin-center -translate-x-1/2 group-hover:w-full transform"></span>
            </div>

            {/* 記事一覧ページ */}
            <div className="relative group">
              <Link
                href="/articles"
                className="relative font-josefin-sans text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center py-7 px-4 group"
              >
                Articles
              </Link>
              {/* ヘッダー下ラインに合わせたアンダーライン */}
              <span className="absolute -bottom-0.5 left-1/2 w-0 h-1 bg-foreground transition-all duration-300 origin-center -translate-x-1/2 group-hover:w-full transform"></span>
            </div>

            {/* カテゴリドロップダウン */}
            <div className="relative group">
              <button className="relative font-josefin-sans text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center py-7 px-4 group">
                <span className="relative">Category</span>
              </button>
              {/* ヘッダー下ラインに合わせたアンダーライン */}
              <span className="absolute -bottom-0.5 left-1/2 w-0 h-1 bg-foreground transition-all duration-300 origin-center -translate-x-1/2 group-hover:w-full transform"></span>

              {/* ドロップダウンメニュー */}
              <div className="absolute left-0 w-48 bg-background rounded-md shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                {categories.map((category) => (
                  <Link
                    key={category.Slug}
                    href={`/categories/${category.Slug}`}
                    className="block px-4 py-2 text-muted-foreground hover:bg-secondary/20 rounded hover:text-primary transition-all duration-300 relative overflow-hidden group/item"
                  >
                    <span className="relative z-10">{capitalizeFirst(category.Slug)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <MobileMenu categories={categories} />
        </nav>
      </div>
    </header>
  );
}
