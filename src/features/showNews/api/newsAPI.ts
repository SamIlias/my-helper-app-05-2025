import axios from 'axios';

const baseUrl = 'https://gnews.io/api/v4/search';
//todo secure apikey
const apiKey = import.meta.env.VITE_NEWS_API_KEY;

export const fetchNews = async (term: string = 'news', lang = 'en') => {
  // term - query for search
  const url = `${baseUrl}?q=${term}&lang=${lang}&apikey=${apiKey}`;
  const response = await axios.get(url);

  if (response.status === 200) {
    const news: NewsItemType[] = response.data.articles;
    return news;
  } else {
    throw new Error('Something went wrong. Try again later.');
  }
};

export type NewsItemType = {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
};
