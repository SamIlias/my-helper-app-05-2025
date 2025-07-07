import { Handler } from '@netlify/functions';
export type ConversationItem = {
    role: 'system' | 'user' | 'assistant';
    content?: string | null;
    id: string;
};
export declare const initialConversationItem: ConversationItem;
declare const handler: Handler;
export { handler };
