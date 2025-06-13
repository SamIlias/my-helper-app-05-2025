import { askModel, ConversationItem } from './aiAPI';

export async function translate(text: string, lang: string): Promise<string | null> {
  const systemPrompt: ConversationItem = {
    role: 'system',
    content: `Translate this text in ${lang} without any addition from your side: ${text}`,
  };
  return await askModel([systemPrompt]);
}

export async function translateObjectValues<T>(obj: T, lang: string): Promise<T> {
  const systemPrompt: ConversationItem = {
    role: 'system',
    content: `Translate this JSON into ${lang} and return only JSON object without any addition from your side: ${JSON.stringify(obj)}`,
  };

  const response = await askModel([systemPrompt]);
  if (response) {
    return JSON.parse(response);
  }

  return obj;
}
