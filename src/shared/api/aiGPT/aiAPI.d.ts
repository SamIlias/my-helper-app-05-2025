import { ConversationItem, initialConversationItem } from '../../../../netlify/functions/askModel';
export { initialConversationItem };
export type { ConversationItem };
export declare const askModel: (conversation: ConversationItem[]) => Promise<any>;
