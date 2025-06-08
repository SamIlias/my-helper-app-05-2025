import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import homePageEn from './locales/en/homePage.json';

import homePageRu from './locales/ru/homePage.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        homepage: homePageEn,
      },
      ru: {
        homepage: homePageRu,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'homepage',
    ns: ['homepage'],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
