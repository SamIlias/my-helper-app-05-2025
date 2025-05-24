import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

const token: string = import.meta.env.VITE_GITHUB_TOKEN;
const endpoint = 'https://models.github.ai/inference';
const model = 'openai/gpt-4.1';

export async function askModel(prompt: string | undefined): Promise<string | null> {
  if (!prompt) {
    return null;
  }

  const client = ModelClient(endpoint, new AzureKeyCredential(token));

  const response = await client.path('/chat/completions').post({
    body: {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
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

// askModel().catch((err) => {
//   console.error("The sample encountered an error:", err);
// });
