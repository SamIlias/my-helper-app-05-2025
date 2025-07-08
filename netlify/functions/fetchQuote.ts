import { Handler } from '@netlify/functions';
import axios from 'axios';
import { normalizeError } from '@/shared/utils/errorHandler';

const quotesApiUrl = 'https://api.api-ninjas.com/v1/quotes';

export type QuoteType = {
  quote: string;
  author: string;
  category: string;
};

const handler: Handler = async (event) => {
  console.log('[fetchQuote] Function called!');
  console.log('[fetchQuote] Event:', JSON.stringify(event, null, 2));

  // const { category, limit = '1' } = event.queryStringParameters || {};

  const apiKey = process.env.VITE_QUOTES_API_KEY;

  if (!apiKey) {
    return errorResponse(500, 'API key is not set');
  }

  if (event.httpMethod === 'OPTIONS') {
    return corsResponse(200, '');
  }

  try {
    const url = new URL(quotesApiUrl);
    // if (category) url.searchParams.append('category', category);
    // url.searchParams.append('limit', limit);

    console.log('[fetchQuote] Query to API:', url.toString());

    const response = await axios.get<QuoteType[]>(url.toString(), {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    console.log('[fetchQuote] Quotes received:', response.data.length);
    console.log('[fetchQuote] First quote:', response.data[0]);

    return corsResponse(200, {
      quotes: response.data,
      count: response.data.length,
    });
  } catch (error) {
    console.error('[fetchQuote] Error:', error);

    let errorMessage = 'Failed to fetch quotes';
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      statusCode = error.response?.status || 500;
      errorMessage = error.response?.data?.message || error.message;
      console.error('[fetchQuote] Axios error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }

    return errorResponse(statusCode, errorMessage, normalizeError(error));
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
