import Link from 'next/link';

export default function CategoryNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - カテゴリが見つかりません
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          指定されたカテゴリは存在しません。
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mr-4"
          >
            ホームに戻る
          </Link>
          
          <Link
            href="/categories"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            カテゴリ一覧
          </Link>
        </div>
      </div>
    </div>
  );
}