import { Button } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-muted-background">
      <div className="max-w-md w-full bg-background rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-muted"
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

        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>

        <h2 className="text-2xl font-semibold text-muted-foreground mb-4">
          ページが見つかりません
        </h2>

        <p className="text-muted-foreground mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>

        <div className="flex justify-center mt-8">
          <Button href="/">ホームに戻る</Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted">
            問題が続く場合は、お手数ですが管理者にお問い合わせください。
          </p>
        </div>
      </div>
    </div>
  );
}
