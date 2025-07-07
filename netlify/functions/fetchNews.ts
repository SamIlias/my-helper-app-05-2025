import { Handler } from '@netlify/functions';
import axios from 'axios';
import { normalizeError } from '../../src/shared/utils/errorHandler';

const baseUrl = 'https://gnews.io/api/v4/search';

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

interface GNewsResponse {
  articles: NewsItemType[];
  totalArticles: number;
}

const handler: Handler = async (event) => {
  const { term = 'news', lang = 'en' } = event.queryStringParameters || {};
  const apiKey = process.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    return errorResponse(500, 'API key is not set');
  }

  if (event.httpMethod === 'OPTIONS') {
    return corsResponse(200, '');
  }

  try {
    const url = `${baseUrl}?q=${encodeURIComponent(term)}&lang=${lang}&apikey=${apiKey}`;
    const response = await axios.get<GNewsResponse>(url);

    return corsResponse(200, {
      articles: response.data.articles ?? [],
      totalArticles: response.data.totalArticles ?? 0,
    });
  } catch (error) {
    console.error('[fetchNews] Error:', error);

    return errorResponse(500, 'Failed to fetch news', normalizeError(error));
  }
};

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

function corsResponse(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: typeof body === 'string' ? body : JSON.stringify(body),
  };
}

function errorResponse(statusCode: number, error: string, message?: unknown) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: JSON.stringify({ error, message }),
  };
}

export { handler };
