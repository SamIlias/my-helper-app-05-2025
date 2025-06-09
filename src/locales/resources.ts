import homePageEn from './en/homePage.ts';
import authPageEn from './en/authPage.json';
import commonEn from './en/common.json';
import newsPageEn from './en/newsPage.json';
import todoPageEn from './en/todoPage.json';
import weatherPageEn from './en/weatherPage.json';

import homePageRu from './ru/homePage.json';
import authPageRu from './ru/authPage.json';
import commonRu from './ru/common.json';
import newsPageRu from './ru/newsPage.json';
import todoPageRu from './ru/todoPage.json';
import weatherPageRu from './ru/weatherPage.json';

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
};

export type Namespaces = keyof (typeof resources)['en'];

export const namespaces: Namespaces[] = Object.keys(resources.en) as Namespaces[];

export default resources;
