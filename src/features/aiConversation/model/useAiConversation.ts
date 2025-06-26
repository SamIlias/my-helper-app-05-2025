import { askModel, ConversationItem, initialConversationItem } from '@/shared/api/aiGPT/aiAPI';
import { useState } from 'react';
import { truncateArrayKeepFirst } from './truncateArrayKeepFirst';

export function useAiConversation() {
  const [conversationHistory, setConversationHistory] = useState<ConversationItem[]>([
    initialConversationItem,
  ]);
  const [query, setQuery] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const onSubmit = async (prompt: string | undefined): Promise<void> => {
    setIsSending(true);

    const currentUserPrompt: ConversationItem = {
      role: 'user',
      content: prompt,
      id: `${conversationHistory.length}${prompt}`,
    };
    const conversation: ConversationItem[] = [...conversationHistory, currentUserPrompt];
    const answer: string | null = await askModel(conversation);
    conversation.push({ role: 'assistant', content: answer, id: `${currentUserPrompt}-${answer}` });
    const trimmedConversation: ConversationItem[] = truncateArrayKeepFirst(conversation, 10);

    setConversationHistory(trimmedConversation);
    setQuery('');
    setIsSending(false);
  };

  return {
    conversationHistory,
    query,
    setQuery,
    isSending,
    onSubmit,
  };
}
