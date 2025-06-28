import { useState } from 'react';
import { fetchNews, NewsItemType } from '../api/newsAPI';
import { normalizeError } from '@/shared/utils/errorHandler';

const NEWS_ON_ONE_PAGE_COUNT = 2;

export const useNews = () => {
  const [newsData, setNewsData] = useState<NewsItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const lastPortionItem = currentPage * NEWS_ON_ONE_PAGE_COUNT;
  const firstPortionItem = lastPortionItem - NEWS_ON_ONE_PAGE_COUNT;

  const onChangePageNumber = (page: number) => {
    setCurrentPage(page);
  };

  const loadNews = async (term: string | undefined, lang: string) => {
    try {
      setErrorMessage(null);
      const news: NewsItemType[] = await fetchNews(term, lang);
      setNewsData(news);
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  return {
    loadNews,
    newsData,
    errorMessage,
    currentPage,
    onChangePageNumber,
    firstPortionItem,
    lastPortionItem,
    NEWS_ON_ONE_PAGE_COUNT,
  };
};
