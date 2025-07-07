import { Handler } from '@netlify/functions';
export type NewsItemType = {
    title: string;
    description: string;
    content: string;
    url: string;
    image: string;
    publishedAt: string;
    source: {
        name: string;
        url: string;
    };
};
declare const handler: Handler;
export { handler };
