import axios from 'axios';

const baseUrl = 'https://api.first.org/data/v1/news';
const LIMIT = 100;

export const fetchNews = async (term: string = '', limit: number = LIMIT) => {
  // term - query for search
  const url = `${baseUrl}?q=${term}&limit=${limit}`;
  const response = await axios.get(url).then((response) => response.data);
  if (response.status === 'OK') {
    const news: NewsItemType[] = response.data;
    return news;
  } else {
    throw new Error('Something went wrong. Try again later.');
  }
};

export type NewsItemType = {
  id: number;
  title: string;
  summary: string;
  link: string;
  image: string;
  published: string;
};
