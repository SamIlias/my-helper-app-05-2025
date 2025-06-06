import { useEffect, useState } from 'react';
import * as React from 'react';
import { fetchNews, initialNewsForPaginationTest, NewsItemType } from '../../../api/newsApi.ts';
import { SearchForm } from '../../common/SearchForm.tsx';
import Pagination from '../../common/Pagination.tsx';
import { NewsItemCard } from './NewsItemCard.tsx';
import { Preloader } from '../../common/Preloader.tsx';
import preloader from '../../../assets/preloaderNews.svg';
import { myStyles } from '../../../myStyles/myStyles.ts';

const NEWS_PORTION_SIZE = 2;
const lang = 'ru';

const NewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItemType[]>([]);
  // const [newsData, setNewsData] = useState<NewsItemType[]>(initialNewsForPaginationTest);
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
    <div className="flex flex-col h-full p-4 gap-2">
      <header className="border-b pb-2 w-full">
        <h1 className={`${myStyles.pageTitle}`}>News</h1>
      </header>
      <main className="grid h-full min-h-0">
        {!newsData.length ? (
          <div className="flex items-center justify-center h-64">
            <Preloader preloader={preloader} />
          </div>
        ) : (
          <div className="flex flex-col gap-1 h-full min-h-0">
            <div className="border-b border-b-green-800 self-center">
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
                  <NewsItemCard key={n.content.length} {...n} />
                ))}
            </div>
          </div>
        )}
      </main>
      <footer className="w-full border-t pt-4">
        <SearchForm onSubmit={onSubmit} placeholder={'Find news...'} />
      </footer>
    </div>
  );
};

export default NewsPage;
