import { Handler } from '@netlify/functions';
import axios from 'axios';
import { normalizeError } from '../../src/shared/utils/errorHandler';

const quotesApiUrl = 'https://api.api-ninjas.com/v1/quotes';

export type QuoteType = {
  quote: string;
  author: string;
  category: string;
};

const handler: Handler = async (event, context) => {
  console.log('[fetchQuote] Function called!');
  console.log('[fetchQuote] Event:', JSON.stringify(event, null, 2));

  //Premium subscription
  // const { category, limit = '1' } = event.queryStringParameters || {};

  const apiKey = process.env.VITE_QUOTES_API_KEY;

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
    const url = new URL(quotesApiUrl);
    // if (category) {
    //   url.searchParams.append('category', category);
    // }
    // url.searchParams.append('limit', limit);
    //
    console.log('[fetchQuote] Query to API:', url.toString());
    // console.log('[fetchQuote] Parameters:', { category, limit });

    const response = await axios.get<QuoteType[]>(url.toString(), {
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    });

    console.log(
      '[fetchQuote] The response is received, the number of quotes is:',
      response.data.length,
    );
    console.log('[fetchQuote] First quote:', response.data[0]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        quotes: response.data,
        count: response.data.length,
      }),
    };
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

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        error: errorMessage,
        message: normalizeError(error),
      }),
    };
  }
};

export { handler };
