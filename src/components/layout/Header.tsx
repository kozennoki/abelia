import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { getCategories } from "@/lib/api";
import { mockCategories } from "@/lib/mockData";
import type { Category } from "@/lib/types";
import { MobileMenu } from "./MobileMenu";

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
    <header className="border-b border-gray-200 bg-white relative">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 hover:text-gray-700 py-4"
            >
              {SITE_NAME}
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            <div className="relative group">
              <Link
                href="/"
                className="relative text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center py-5 px-3 group"
              >
                ホーム
              </Link>
              {/* ヘッダー下ラインに合わせたアンダーライン */}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-900 transition-all duration-300 origin-center -translate-x-1/2 group-hover:w-full transform"></span>
            </div>

            {/* カテゴリドロップダウン */}
            <div className="relative group">
              <button className="relative text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center py-5 px-3 group">
                <span className="relative">カテゴリ</span>
              </button>
              {/* ヘッダー下ラインに合わせたアンダーライン */}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-900 transition-all duration-300 origin-center -translate-x-1/2 group-hover:w-full transform"></span>

              {/* ドロップダウンメニュー */}
              <div className="absolute left-0 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                {categories.map((category) => (
                  <Link
                    key={category.Slug}
                    href={`/categories/${category.Slug}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-secondary/20 rounded hover:text-primary transition-all duration-300 relative overflow-hidden group/item"
                  >
                    <span className="relative z-10">{category.Name}</span>
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
