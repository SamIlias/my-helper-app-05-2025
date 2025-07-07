import { ConversationItem } from '../../../../netlify/functions/askModel';
export interface ConversationState {
    conversationHistory: ConversationItem[];
    query: string;
    error?: string | null;
}
export declare const setConversationHistory: import("@reduxjs/toolkit").ActionCreatorWithPayload<ConversationItem[], "conversation/setConversationHistory">, setQuery: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "conversation/setQuery">;
declare const _default: import("redux").Reducer<ConversationState>;
export default _default;
