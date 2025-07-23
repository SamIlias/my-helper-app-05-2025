import { Handler } from '@netlify/functions';
import axios from 'axios';
import { normalizeError } from '@/shared/utils/errorHandler';

const baseUrl = 'https://newsapi.org/v2/everything';

export type NewsItemType = {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export interface NewsApiResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: NewsItemType[];
}

const handler: Handler = async (event) => {
  const {
    term = 'news',
    page = '1',
    pageSize = '10',
    language = 'en', // ✅ Добавлено
  } = event.queryStringParameters || {};

  const apiKey = process.env.VITE_NEWS_API_KEY;

  if (!apiKey) {
    return errorResponse(500, 'API key is not set');
  }

  if (event.httpMethod === 'OPTIONS') {
    return corsResponse(200, '');
  }

  try {
    const url = `${baseUrl}?q=${encodeURIComponent(term)}&page=${page}&pageSize=${pageSize}&language=${language}&apiKey=${apiKey}`;

    const response = await axios.get<NewsApiResponse>(url);

    if (response.data.status !== 'ok') {
      return errorResponse(500, 'NewsAPI returned error', response.data);
    }

    return corsResponse(200, {
      articles: response.data.articles ?? [],
      totalResults: response.data.totalResults ?? 0,
    });
  } catch (error) {
    console.error('[fetchNews] Error:', error);
    return errorResponse(500, 'Failed to fetch news', normalizeError(error));
  }
};

// Вспомогательные функции
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
