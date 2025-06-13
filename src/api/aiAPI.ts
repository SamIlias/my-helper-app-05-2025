import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

const token: string = import.meta.env.VITE_GITHUB_TOKEN;
const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';

export type ConversationItem = {
  role: 'system' | 'user' | 'assistant';
  content?: string | null;
};

export async function askModel(conversation: ConversationItem[]): Promise<string | null> {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));
  const response = await client.path('/chat/completions').post({
    body: {
      messages: conversation,
      temperature: 1.0,
      top_p: 1.0,
      model: model,
    },
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  return response.body.choices[0].message.content;
}

export const initialConversationItem: ConversationItem = {
  role: 'system',
  content:
    'You are a helpful assistant. Always respond in Markdown format. Use proper headings, lists, code blocks, and tables when appropriate.',
};

// export const generateQuote = async () => {
//   const quotePrompt = 'give me one random inspirational quote without any additions on your part.';
//   const answer: string | null = await askModel([{ role: 'user', content: quotePrompt }]);
//
//   return answer ? answer : 'Something went wrong, please try to refresh quote...';
// };

// askModel().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });
