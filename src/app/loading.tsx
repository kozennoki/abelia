import Loading from '@/components/common/Loading';

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loading />
        <p className="mt-4 text-gray-600 text-lg">読み込み中...</p>
      </div>
    </div>
  );
}