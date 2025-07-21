import { Pagination, Preloader, SearchForm } from '@/shared/ui';
import preloader from '@/shared/assets/preloaderNews.svg';
import { NewsItemType } from '../api/newsAPI';
import { NewsItem } from './NewsItem';
import * as React from 'react';
import { useNews } from '../model/useNews';
import { useTranslation } from 'react-i18next';

export const NewsList: React.FC = () => {
  const {
    newsItems,
    totalItemsCount,
    isFetching,
    errorMessage,
    currentPage,
    onChangePageNumber,
    NEWS_ON_ONE_PAGE_COUNT,
    onSearchFormSubmit,
  } = useNews();

  const { t } = useTranslation('newspage');

  return (
    <>
      <main className="relative grid h-full min-h-0">
        {errorMessage && (
          <strong className="absolute top-0 text-red-700 mt-2">{errorMessage}</strong>
        )}

        {isFetching ? (
          <div className="flex items-center justify-center h-full pb-15">
            <Preloader preloader={preloader} />
          </div>
        ) : (
          <div className="flex flex-col gap-1 h-full min-h-0">
            {/*<div className="self-center">*/}
            {/*  <Pagination*/}
            {/*    totalItemsCount={totalItemsCount}*/}
            {/*    currentPage={currentPage}*/}
            {/*    onChangePageNumber={onChangePageNumber}*/}
            {/*    itemsOnOnePageCount={NEWS_ON_ONE_PAGE_COUNT}*/}
            {/*  />*/}
            {/*</div>*/}

            <div className="overflow-auto">
              {newsItems.map((n: NewsItemType) => (
                <NewsItem key={n.content} {...n} />
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="w-full border-t py-2">
        <SearchForm onSubmit={onSearchFormSubmit} placeholder={t('searchForm.placeholder')} />
      </footer>
    </>
  );
};
