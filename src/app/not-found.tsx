import { Button } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ページが見つかりません
        </h2>

        <p className="text-gray-600 mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>

        <div className="flex justify-center mt-8">
          <Button href="/">ホームに戻る</Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            問題が続く場合は、お手数ですが管理者にお問い合わせください。
          </p>
        </div>
      </div>
    </div>
  );
}
