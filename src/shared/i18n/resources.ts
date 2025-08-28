import assistantPageEn from './locales/en/assistantPage.json';
import authPageEn from './locales/en/authPage.json';
import commonEn from './locales/en/common.json';
import todoPageEn from './locales/en/todoPage.json';

import assistantPageRu from './locales/ru/assistantPage.json';
import authPageRu from './locales/ru/authPage.json';
import commonRu from './locales/ru/common.json';
import todoPageRu from './locales/ru/todoPage.json';

const resources = {
  en: {
    assistantPage: assistantPageEn,
    authPage: authPageEn,
    common: commonEn,
    todoPage: todoPageEn,
  },
  ru: {
    assistantPage: assistantPageRu,
    authPage: authPageRu,
    common: commonRu,
    todoPage: todoPageRu,
  },
} as const;

export type Namespaces = keyof (typeof resources)['en'];

export const namespaces: Namespaces[] = Object.keys(resources.en) as Namespaces[];

export default resources;
