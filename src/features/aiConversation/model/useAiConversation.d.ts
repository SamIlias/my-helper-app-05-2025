import * as React from 'react';
import { ConversationItem } from '@/shared/api';
export declare function useAiConversation(): {
    conversationHistory: ConversationItem[];
    query: string;
    isSending: boolean;
    isSubmitDisabled: boolean;
    isConversationStarted: boolean;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
    lastConversationItem: React.RefObject<HTMLDivElement | null>;
    onPromptChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};
