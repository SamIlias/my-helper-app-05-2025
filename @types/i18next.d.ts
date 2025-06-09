// import the original type declarations
import { defaultNS } from '../src/i18n.ts';
import resources from '../src/locales/resources.ts';
import 'i18next';

declare module 'i18next' {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)['en'];
  }
}
