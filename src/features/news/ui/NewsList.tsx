import { Preloader } from '../../../shared/ui/Preloader';
import preloader from '../../../shared/assets/preloaderNews.svg';
import Pagination from '../../../shared/ui/Pagination';
import { NewsItemType } from '../api/newsAPI';
import { NewsItemCard } from './NewsItemCard';
import * as React from 'react';
import { useNews } from '../model/useNews';
import { useEffect } from 'react';
import { SearchForm } from '../../../shared/ui/SearchForm';
import { useTranslation } from 'react-i18next';

export const NewsList: React.FC = () => {
  const {
    loadNews,
    newsData,
    errorMessage,
    currentPage,
    onChangePageNumber,
    firstPortionItem,
    lastPortionItem,
    NEWS_PORTION_SIZE,
  } = useNews();

  const { t, i18n } = useTranslation('newspage');
  const onSubmit = (term: string) => {
    loadNews(term, i18n.language);
  };

  const hasLoaded = React.useRef(false);
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    loadNews(undefined, i18n.language);
  }, []);

  return (
    <>
      <main className="relative grid h-full min-h-0">
        {errorMessage && (
          <strong className="absolute top-0 text-red-700 mt-2">{errorMessage}</strong>
        )}
        {!newsData.length ? (
          <div className="flex items-center justify-center h-full pb-15">
            <Preloader preloader={preloader} />
          </div>
        ) : (
          <div className="flex flex-col gap-1 h-full min-h-0">
            <div className="self-center">
              <Pagination
                totalItemsCount={newsData.length}
                currentPage={currentPage}
                onChangePageNumber={onChangePageNumber}
                pageSize={NEWS_PORTION_SIZE}
              />
            </div>

            <div className="overflow-auto">
              {newsData
                .filter((_, index) => firstPortionItem <= index && index < lastPortionItem)
                .map((n: NewsItemType) => (
                  <NewsItemCard key={n.description} {...n} />
                ))}
            </div>
          </div>
        )}
      </main>

      <footer className="w-full border-t pt-4">
        <SearchForm onSubmit={onSubmit} placeholder={t('searchForm.placeholder')} />
      </footer>
    </>
  );
};
