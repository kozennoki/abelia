import { Metadata } from 'next';
import { mockCategories } from '@/lib/mockData';
import { getCategories } from '@/lib/api';
import { env } from '@/lib/env';

interface CategoryLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  if (env.NEXT_PUBLIC_USE_MOCK) {
    return mockCategories.map((category) => ({
      slug: category.Slug,
    }));
  }

  try {
    const categories = await getCategories();
    return categories.map((category) => ({
      slug: category.Slug,
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const category = env.NEXT_PUBLIC_USE_MOCK 
    ? mockCategories.find(c => c.Slug === params.slug)
    : (await getCategories()).find(c => c.Slug === params.slug);

  if (!category) {
    return {
      title: 'カテゴリが見つかりません',
      description: '指定されたカテゴリは存在しません。',
    };
  }

  return {
    title: `${category.Name} | ブログ`,
    description: `${category.Name}に関する記事一覧です。`,
  };
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return <>{children}</>;
}