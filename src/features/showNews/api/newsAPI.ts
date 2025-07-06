import axios from 'axios';
import { NewsItemType } from '../../../../netlify/functions/fetchNews';

export const fetchNews = async (term: string = 'news', lang = 'en') => {
  const url = `/.netlify/functions/fetchNews?term=${term}&lang=${lang}`;
  const response = await axios.get(url);

  if (response.status === 200) {
    const news: NewsItemType[] = response.data.articles;
    return news;
  } else {
    throw new Error('Something went wrong. Try again later.');
  }
};

export type { NewsItemType };
