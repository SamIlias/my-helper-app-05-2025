import { Handler } from '@netlify/functions';
import axios from 'axios';
import { normalizeError } from '../../src/shared/utils/errorHandler';

const baseUrl = 'https://gnews.io/api/v4/search';

const handler: Handler = async (event, context) => {
  const { term = 'news', lang = 'en' } = event.queryStringParameters || {};
  const apiKey = process.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'API key is not set' }),
    };
  }

  // handle CORS preflight queries
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const url = `${baseUrl}?q=${encodeURIComponent(term)}&lang=${lang}&apikey=${apiKey}`;
    const response = await axios.get(url);
    // console.log('[fetchNews] Query received:', event.queryStringParameters);
    // console.log('[fetchNews] is API key set?', Boolean(apiKey));
    // console.log(
    //   '[fetchNews] The answer received, the number of articles is:',
    //   response.data.articles?.length || 0,
    // );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        articles: response.data.articles || [],
        totalArticles: response.data.totalArticles || 0,
      }),
    };
  } catch (error) {
    console.error('[fetchNews] Error:', error);

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        error: 'Failed to fetch news',
        message: normalizeError(error),
      }),
    };
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

export { handler };
