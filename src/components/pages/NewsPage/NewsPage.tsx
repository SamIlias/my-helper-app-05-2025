import { useEffect, useState } from 'react';
import * as React from 'react';
import { fetchNews, NewsItemType } from '../../../api/newsApi.ts';
import { SearchForm } from '../../common/SearchForm.tsx';
import Pagination from '../../common/Pagination.tsx';
import { NewsItemCard } from './NewsItemCard.tsx';

const NEWS_PORTION_SIZE = 10;

const NewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPortionItem = currentPage * NEWS_PORTION_SIZE;
  const firstPortionItem = lastPortionItem - NEWS_PORTION_SIZE;

  const onChangePageNumber = (page: number) => {
    setCurrentPage(page);
  };

  const loadNews = async (term: string | undefined) => {
    const news: NewsItemType[] = await fetchNews(term);
    setNewsData(news);
  };

  useEffect(() => {
    loadNews(undefined);
  }, []);

  const onSubmit = (term: string) => {
    loadNews(term);
  };

  return (
    <div className="grid grid-cols-14 grid-rows-7 text-center content-center h-full">
      <div className="col-span-14 col-start-1 row-span-1 row-start-1 content-center">
        <h1 className="text-shadow-md text-xl text-amber-400 p-1">News</h1>
        <Pagination
          totalItemsCount={newsData.length}
          currentPage={currentPage}
          onChangePageNumber={onChangePageNumber}
          pageSize={NEWS_PORTION_SIZE}
        />
      </div>

      <div className="overflow-auto col-span-14 col-start-1 row-span-5 row-start-2">
        {newsData
          .filter((_, index) => firstPortionItem <= index && index < lastPortionItem)
          .map((n: NewsItemType) => (
            <NewsItemCard key={n.id} {...n} />
          ))}
      </div>
      <div className="col-span-12 col-start-2 row-span-1 row-start-7">
        <SearchForm onSubmit={onSubmit} placeholder={'Search for news...'} />
      </div>
    </div>
  );
};

export default NewsPage;
