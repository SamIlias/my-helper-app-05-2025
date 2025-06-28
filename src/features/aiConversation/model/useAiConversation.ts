import { askModel, ConversationItem, initialConversationItem } from '@/shared/api/aiGPT/aiAPI';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { truncateArrayKeepFirst } from './truncateArrayKeepFirst';
import * as React from 'react';

const HISTORY_LENGTH = 10;

export function useAiConversation() {
  const [conversationHistory, setConversationHistory] = useState<ConversationItem[]>([
    initialConversationItem,
  ]);
  const [query, setQuery] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const lastConversationItem = useRef<HTMLDivElement>(null);

  const trimmedQuery = query.trim();
  const isSubmitDisabled = isSending || !trimmedQuery;
  const isConversationStarted = conversationHistory.length > 1; // first element is initial system prompt

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
    const trimmedConversation: ConversationItem[] = truncateArrayKeepFirst(
      conversation,
      HISTORY_LENGTH,
    );

    setConversationHistory(trimmedConversation);
    setQuery('');
    setIsSending(false);
  };

  useEffect(() => {
    lastConversationItem.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (trimmedQuery) {
      onSubmit(trimmedQuery);
    }
  };

  const onPromptChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setQuery(e.target.value);
  };

  return {
    conversationHistory,
    query,
    isSending,
    isSubmitDisabled,
    isConversationStarted,
    handleSubmit,
    lastConversationItem,
    onPromptChange,
  };
}
