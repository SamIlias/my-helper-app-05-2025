import * as React from 'react';
import { ChangeEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { sendPrompt } from './aiConversationThunks';
import { setQuery } from './aiConversationSlice';
import { ConversationItem } from '@/shared/api';

export function useAiConversation() {
  const conversationHistory: ConversationItem[] = useSelector(
    (state: RootState) => state.aiConversation.conversationHistory,
  );
  const query = useSelector((state: RootState) => state.aiConversation.query);
  const dispatch = useDispatch<AppDispatch>();

  const [isSending, setIsSending] = useState<boolean>(false);

  const lastConversationItem = useRef<HTMLDivElement>(null);
  const trimmedQuery = useMemo(() => query.trim(), [query]);
  const isSubmitDisabled = useMemo(() => isSending || !trimmedQuery, [isSending, trimmedQuery]);
  const isConversationStarted = conversationHistory.length > 1; // first element is initial system prompt

  useEffect(() => {
    lastConversationItem.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (trimmedQuery) {
      setIsSending(true);
      await dispatch(sendPrompt(trimmedQuery));
      setIsSending(false);
    }
  };

  const onPromptChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    dispatch(setQuery(e.target.value));
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
