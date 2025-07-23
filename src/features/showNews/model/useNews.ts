import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNews, NewsItemType } from '../api/newsAPI';

type NewsPage = {
  articles: NewsItemType[];
  nextPage: number;
  hasMore: boolean;
};

export const useNews = (term: string, language: string, pageSize: number = 10) => {
  return useInfiniteQuery<NewsPage, Error>({
    queryKey: ['news', term, language],
    queryFn: ({ pageParam = 1 }) =>
      fetchNews({ term, language, pageParam: pageParam as number, pageSize }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
    initialPageParam: 1,
  });
};
