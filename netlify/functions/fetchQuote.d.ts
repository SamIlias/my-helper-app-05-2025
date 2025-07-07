import { Handler } from '@netlify/functions';
export type QuoteType = {
    quote: string;
    author: string;
    category: string;
};
declare const handler: Handler;
export { handler };
