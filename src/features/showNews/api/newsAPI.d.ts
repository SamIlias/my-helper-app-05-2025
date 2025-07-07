import { NewsItemType } from '../../../../netlify/functions/fetchNews';
export declare const fetchNews: (term?: string, lang?: string) => Promise<NewsItemType[]>;
export type { NewsItemType };
