import axios from 'axios';
import { NewsItemType } from '../../../../netlify/functions/fetchNews';

export const fetchNews = async ({
  term = 'news',
  language = 'en',
  pageParam = 1,
  pageSize = 10,
}: {
  term?: string;
  language?: string;
  pageParam?: number;
  pageSize?: number;
}) => {
  const url = `/.netlify/functions/fetchNews?term=${encodeURIComponent(term)}&language=${language}&page=${pageParam}&pageSize=${pageSize}`;
  const response = await axios.get(url);

  if (response.status === 200) {
    const { articles, totalResults } = response.data;
    return {
      articles,
      nextPage: pageParam + 1,
      hasMore: pageParam * pageSize < totalResults,
    };
  } else {
    throw new Error('Something went wrong. Try again later.');
  }
};

export type { NewsItemType };
