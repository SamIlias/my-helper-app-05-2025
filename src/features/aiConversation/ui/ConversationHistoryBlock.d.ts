import { ConversationItem } from '@/shared/api';
import * as React from 'react';
import { Ref } from 'react';
type Props = {
    userName: string;
    isConversationStarted: boolean;
    lastConversationItem: Ref<HTMLDivElement> | undefined;
    conversationHistory: ConversationItem[];
};
export declare const ConversationHistoryBlock: React.FC<Props>;
export {};
