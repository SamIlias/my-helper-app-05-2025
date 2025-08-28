import { Preloader, SearchForm } from '@/shared/ui';
import preloader from '@/shared/assets/preloaderNews.svg';
import { NewsItem } from './NewsItem';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNews } from '@/features/showNews/model/useNews';

export const NewsList: React.FC = () => {
  const { i18n, t } = useTranslation('assistantPage');
  const [searchTerm, setSearchTerm] = React.useState('news');
  const language = i18n.language;

  const handleSearchSubmit = (value: string) => {
    setSearchTerm(value);
  };

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, status } =
    useNews(searchTerm, language);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.3 },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'error') {
    return <strong className="text-red-700 mt-2">{(error as Error).message}</strong>;
  }

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  return (
    <div className="h-full flex flex-col">
      <main className="relative flex justify-center items-center flex-1 min-h-0">
        {isLoading ? (
          <div className="">
            <Preloader preloader={preloader} />
          </div>
        ) : (
          <div className="flex overflow-y-auto custom-scrollbar flex-col gap-1 h-full">
            <div className="grid grid-cols-2 gap-2 m-1">
              {articles.map((n) => (
                <NewsItem key={n.url} {...n} />
              ))}
            </div>

            {isFetchingNextPage && <div className="text-center h-fit py-4">loading...</div>}

            {/* Observer anchor */}
            <div ref={observerRef} className="h-12 w-full py-3" />
          </div>
        )}
      </main>

      <footer className="w-7/8 mx-auto my-2">
        <SearchForm onSubmit={handleSearchSubmit} placeholder={t('news.searchFormPlaceholder')} />
      </footer>
    </div>
  );
};
