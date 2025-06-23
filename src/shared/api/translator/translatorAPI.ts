import { getCachedTranslation, setCachedTranslation } from './translationCache';

export const defaultLang = 'en';

// translation using AI model
import { askModel, ConversationItem } from '../aiGPT/aiAPI';

async function translate(text: string, lang: string): Promise<string | undefined | null> {
  if (!text) return null;

  const cached = getCachedTranslation<string>(text, lang);
  if (cached) {
    return cached;
  }

  const systemPrompt: ConversationItem = {
    id: 'initialPrompt',
    role: 'system',
    content: `Translate the following text into ${lang}. Return only the translation, no extra output: "${text}"`,
  };
  const response = await askModel([systemPrompt]);
  if (response) {
    setCachedTranslation(text, lang, response);
    return response;
  }

  return null;
}

async function translateObjectValues<T extends object>(obj: T, lang: string): Promise<T> {
  const cached = getCachedTranslation<T>(obj, lang);
  if (cached) return cached;

  const systemPrompt: ConversationItem = {
    id: 'initialPrompt',
    role: 'system',
    content: `Translate all string values in this JSON object into ${lang}. Return only the translated JSON without any explanation or formatting: ${JSON.stringify(obj)}`,
  };

  const response = await askModel([systemPrompt]);
  if (response) {
    try {
      const parsed = JSON.parse(response);
      setCachedTranslation(obj, lang, response);
      return parsed;
    } catch (err) {
      console.error('Failed to parse model response as JSON:', response, err);
    }
  }

  return obj;
}

export function getTranslation(source: string, currentLanguage: string): Promise<string>;
export function getTranslation<T>(source: T, currentLanguage: string): Promise<T>;

export async function getTranslation<T extends object>(
  source: string | T,
  currentLanguage: string,
): Promise<string | T | undefined | null> {
  if (currentLanguage === defaultLang) {
    return source;
  }

  if (typeof source === 'string') {
    return await translate(source, currentLanguage);
  }

  if (typeof source === 'object') {
    return await translateObjectValues<T>(source, currentLanguage);
  }

  return null;
}

// LibreTranslate - not free --------------------

// import axios from 'axios';
// interface LibreTranslateResponse {
//   translatedText: string;
// }
// const getTranslation = async (
//   text: string,
//   targetLang: string,
//   sourceLang = defaultLang,
// ): Promise<string | null> => {
//   try {
//     const res = await axios.post<LibreTranslateResponse>(
//       'https://libretranslate.com/translate',
//       {
//         q: text,
//         source: sourceLang,
//         target: targetLang,
//         format: 'text',
//       },
//       { headers: { 'Content-Type': 'application/json' } },
//     );
//
//     if (res.data?.translatedText) {
//       return res.data.translatedText;
//     }
//
//     console.warn('LibreTranslate response failed');
//     return null;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };
//
// export async function translate(text: string, targetLang: string): Promise<string | null> {
//   return await getTranslation(text, targetLang);
// }
//
// export async function translateObjectValues<T extends { [key: string]: string }>(
//   obj: T,
//   targetLang: string,
// ): Promise<T> {
//   const entries = Object.entries(obj);
//   try {
//     const translatedEntries = await Promise.all(
//       entries.map(async ([key, value]) => {
//         const translatedValue = await translate(value, targetLang);
//         return [key, translatedValue];
//       }),
//     );
//     return Object.fromEntries(translatedEntries) as T;
//   } catch (err) {
//     console.error(err);
//     return obj;
//   }
// }
