import { useEffect, useState } from 'react';
import { fetchNews, NewsItemType } from '../api/newsAPI';
import { normalizeError } from '@/shared/utils/errorHandler';
import { useTranslation } from 'react-i18next';
import * as React from 'react';

const NEWS_ON_ONE_PAGE_COUNT = 2;
const INITIAL_PAGE = 1;

export const useNews = () => {
  const [newsData, setNewsData] = useState<NewsItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { i18n } = useTranslation('newspage');

  const totalItemsCount = newsData.length;

  const loadNews = async (term: string | undefined, lang: string) => {
    try {
      setErrorMessage(null);
      setIsFetching(true);
      const news: NewsItemType[] = await fetchNews(term, lang);
      setNewsData(news);
      setIsFetching(false);
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  const onChangePageNumber = (page: number) => {
    setCurrentPage(page);
  };

  const onSearchFormSubmit = (term: string) => {
    loadNews(term, i18n.language);
  };

  const hasLoaded = React.useRef(false);
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    loadNews(undefined, i18n.language);
  }, []);

  useEffect(() => {
    setCurrentPage(INITIAL_PAGE);
  }, [newsData]);

  // on current page
  const lastNewsItemNumber = currentPage * NEWS_ON_ONE_PAGE_COUNT;
  const firstNewsItemNumber = lastNewsItemNumber - NEWS_ON_ONE_PAGE_COUNT;
  const newsOnCurrentPage = newsData.filter(
    (_, index) => firstNewsItemNumber <= index && index < lastNewsItemNumber,
  );

  return {
    newsItems: newsOnCurrentPage,
    totalItemsCount,
    isFetching,
    errorMessage,
    currentPage,
    onChangePageNumber,
    NEWS_ON_ONE_PAGE_COUNT,
    onSearchFormSubmit,
  };
};
