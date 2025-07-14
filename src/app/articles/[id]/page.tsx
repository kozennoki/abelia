import { notFound } from 'next/navigation';
import { getArticle, getArticles } from '@/lib/api';
import { ArticleDetail } from '@/components/article';
import type { Article } from '@/lib/types';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: {
    id: string;
  };
}

// Generate static params for all articles
export async function generateStaticParams() {
  try {
    const response = await getArticles({ limit: 100 });
    return response.articles.map((article: Article) => ({
      id: article.ID,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  try {
    const article = await getArticle(params.id);
    
    return {
      title: `${article.Title} | Nerine Blog`,
      description: article.Description,
      openGraph: {
        title: article.Title,
        description: article.Description,
        type: 'article',
        publishedTime: article.CreatedAt,
        modifiedTime: article.UpdatedAt,
        images: article.Image ? [{ url: article.Image }] : [],
        section: article.Category.Name,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.Title,
        description: article.Description,
        images: article.Image ? [article.Image] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Article Not Found | Nerine Blog',
      description: 'The requested article could not be found.',
    };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  let article: Article;

  try {
    article = await getArticle(params.id);
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleDetail article={article} />
    </div>
  );
}