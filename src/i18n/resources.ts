import homePageEn from './locales/en/homepage.json';
import authPageEn from './locales/en/authpage.json';
import commonEn from './locales/en/common.json';
import newsPageEn from './locales/en/newspage.json';
import todoPageEn from './locales/en/todopage.json';
import weatherPageEn from './locales/en/weatherpage.json';

import homePageRu from './locales/ru/homepage.json';
import authPageRu from './locales/ru/authpage.json';
import commonRu from './locales/ru/common.json';
import newsPageRu from './locales/ru/newspage.json';
import todoPageRu from './locales/ru/todopage.json';
import weatherPageRu from './locales/ru/weatherpage.json';

const resources = {
  en: {
    homepage: homePageEn,
    authpage: authPageEn,
    common: commonEn,
    newspage: newsPageEn,
    todopage: todoPageEn,
    weatherpage: weatherPageEn,
  },
  ru: {
    homepage: homePageRu,
    authpage: authPageRu,
    common: commonRu,
    newspage: newsPageRu,
    todopage: todoPageRu,
    weatherpage: weatherPageRu,
  },
} as const;

export type Namespaces = keyof (typeof resources)['en'];

export const namespaces: Namespaces[] = Object.keys(resources.en) as Namespaces[];

export default resources;
