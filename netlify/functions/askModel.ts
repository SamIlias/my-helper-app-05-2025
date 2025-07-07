import { Handler } from '@netlify/functions';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import { normalizeError } from '../../src/shared/utils/errorHandler';

type ConversationItem = {
  role: 'system' | 'user' | 'assistant';
  content?: string | null;
  id: string;
};

const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';

interface AskModelRequestBody {
  conversation: ConversationItem[];
  temperature?: number;
  top_p?: number;
  customModel?: string;
}

const handler: Handler = async (event) => {
  console.log('[askModel] Function called!');

  const token = process.env.VITE_GITHUB_TOKEN;
  if (!token) {
    return errorResponse(500, 'GitHub token is not set');
  }

  if (event.httpMethod === 'OPTIONS') {
    return corsResponse(200, '');
  }

  if (event.httpMethod !== 'POST') {
    return errorResponse(405, 'Method not allowed. Use POST.');
  }

  try {
    const body = JSON.parse(event.body || '{}') as AskModelRequestBody;
    const { conversation, temperature = 1.0, top_p = 1.0, customModel = model } = body;

    if (!conversation || !Array.isArray(conversation)) {
      return errorResponse(400, 'Invalid request body. Expected conversation array.');
    }

    const client = ModelClient(endpoint, new AzureKeyCredential(token));
    const response = await client.path('/chat/completions').post({
      body: {
        messages: conversation,
        temperature,
        top_p,
        model: customModel,
      },
    });

    if (isUnexpected(response)) {
      console.error('[askModel] Unexpected response:', response.body.error);
      throw response.body.error;
    }

    if (!response.body.choices || response.body.choices.length === 0) {
      throw new Error('No choices returned from model');
    }

    const content = response.body.choices?.[0]?.message?.content ?? '';

    return corsResponse(200, {
      content,
      model: customModel,
      usage: response.body.usage || null,
    });
  } catch (error) {
    console.error('[askModel] Error:', error);
    return errorResponse(500, 'Failed to get response from model', normalizeError(error));
  }
};

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

function corsHeaders() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };
}

export { handler };
