import { useEffect, useState } from 'react';
import * as React from 'react';
import { fetchNews, NewsItemType } from '../../../api/newsApi.ts';
import { SearchForm } from '../../common/SearchForm.tsx';
import Pagination from '../../common/Pagination.tsx';
import { NewsItemCard } from './NewsItemCard.tsx';
import { Preloader } from '../../common/Preloader.tsx';
import preloader from '../../../assets/preloaderNews.svg';

const NEWS_PORTION_SIZE = 2;
const lang = 'ru';

const NewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPortionItem = currentPage * NEWS_PORTION_SIZE;
  const firstPortionItem = lastPortionItem - NEWS_PORTION_SIZE;

  const onChangePageNumber = (page: number) => {
    setCurrentPage(page);
  };

  const loadNews = async (term: string | undefined) => {
    const news: NewsItemType[] = await fetchNews(term, lang);
    setNewsData(news);
  };

  useEffect(() => {
    loadNews(undefined);
  }, []);

  const onSubmit = (term: string) => {
    loadNews(term);
  };

  return (
    <div className="grid gap-1 grid-cols-14 text-center content-center h-full">
      {!newsData.length ? (
        <div className="col-span-14 col-start-1 row-span-7 row-start-1 justify-items-center content-center">
          <Preloader preloader={preloader} />
        </div>
      ) : (
        <>
          <div className="border-b border-b-green-800  pb-3 col-span-14 col-start-1 row-start-1 content-center">
            <h1 className="text-shadow-md text-[1.5vw] text-amber-400 p-1">News</h1>
            <Pagination
              totalItemsCount={newsData.length}
              currentPage={currentPage}
              onChangePageNumber={onChangePageNumber}
              pageSize={NEWS_PORTION_SIZE}
            />
          </div>

          <div className="overflow-auto col-span-14 col-start-1 row-span-5">
            {newsData
              .filter((_, index) => firstPortionItem <= index && index < lastPortionItem)
              .map((n: NewsItemType) => (
                <NewsItemCard key={n.content.length} {...n} />
              ))}
          </div>
          <div className="col-span-12 col-start-2 row-span-1 row-start-7">
            <SearchForm onSubmit={onSubmit} placeholder={'Find news...'} />
          </div>
        </>
      )}
    </div>
  );
};

export default NewsPage;
