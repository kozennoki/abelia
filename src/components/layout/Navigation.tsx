import Link from 'next/link';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = '' }: NavigationProps) {
  return (
    <nav className={className}>
      <ul className="flex space-x-6">
        <li>
          <Link 
            href="/" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ホーム
          </Link>
        </li>
        <li>
          <Link 
            href="/categories" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            カテゴリ
          </Link>
        </li>
      </ul>
    </nav>
  );
}