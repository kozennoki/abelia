import Link from 'next/link';

interface PaginationLinksProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // "/" for home, "/page" for other pages
}

export default function PaginationLinks({ currentPage, totalPages, basePath }: PaginationLinksProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // 総ページ数が少ない場合は全て表示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 総ページ数が多い場合は省略表示
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // 現在のページ周辺を表示
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const getPageUrl = (pageNum: number) => {
    if (pageNum === 1) {
      return '/';
    }
    return `${basePath}/${pageNum}`;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-8">
      {/* 前へボタン */}
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          <span className="hidden sm:inline">前へ</span>
          <span className="sm:hidden">‹</span>
        </Link>
      ) : (
        <span className="px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
          <span className="hidden sm:inline">前へ</span>
          <span className="sm:hidden">‹</span>
        </span>
      )}

      {/* ページ番号 */}
      {pageNumbers.map((page, index) => (
        <span key={index}>
          {typeof page === 'number' ? (
            <Link
              href={getPageUrl(page)}
              className={`px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors min-w-[32px] sm:min-w-[36px] inline-block text-center ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {page}
            </Link>
          ) : (
            <span className="px-1 sm:px-3 py-2 text-gray-500 text-xs sm:text-sm">
              {page}
            </span>
          )}
        </span>
      ))}

      {/* 次へボタン */}
      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
        >
          <span className="hidden sm:inline">次へ</span>
          <span className="sm:hidden">›</span>
        </Link>
      ) : (
        <span className="px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
          <span className="hidden sm:inline">次へ</span>
          <span className="sm:hidden">›</span>
        </span>
      )}
    </div>
  );
}