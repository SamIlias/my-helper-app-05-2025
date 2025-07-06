import { Handler } from '@netlify/functions';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import { normalizeError } from '../../src/shared/utils/errorHandler';

const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';

const handler: Handler = async (event, context) => {
  console.log('[askModel] Function called!');

  const token = process.env.VITE_GITHUB_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'GitHub token is not set' }),
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

  // check that query is POST:
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { conversation, temperature = 1.0, top_p = 1.0, customModel = model } = body;

    if (!conversation || !Array.isArray(conversation)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
        body: JSON.stringify({
          error: 'Invalid request body. Expected conversation array.',
        }),
      };
    }

    const client = ModelClient(endpoint, new AzureKeyCredential(token));
    const response = await client.path('/chat/completions').post({
      body: {
        messages: conversation,
        temperature: temperature,
        top_p: top_p,
        model: customModel,
      },
    });

    if (isUnexpected(response)) {
      console.error('[askModel] Unexpected response:', response.body.error);
      throw response.body.error;
    }

    const content = response.body.choices[0].message.content;
    console.log('[askModel] Response received successfully');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
      body: JSON.stringify({
        content: content,
        model: customModel,
        usage: response.body.usage || null,
      }),
    };
  } catch (error) {
    console.error('[askModel] Error:', error);

    const errorMessage = 'Failed to get response from model';
    const statusCode = 500;

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

export type ConversationItem = {
  role: 'system' | 'user' | 'assistant';
  content?: string | null;
  id: string;
};

export const initialConversationItem: ConversationItem = {
  role: 'system',
  content:
    'You are a helpful assistant. Always respond in Markdown format. Use proper headings, lists, code blocks, and tables when appropriate.',
  id: 'initial',
};
