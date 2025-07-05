import { createAsyncThunk } from '@reduxjs/toolkit';
import { askModel, ConversationItem } from '../../../shared/api';
import { v4 as uuidv4 } from 'uuid';
import { truncateArrayKeepFirst } from './truncateArrayKeepFirst';
import { normalizeError } from '../../../shared/utils/errorHandler';
import { RootState } from '../../../app/store';

export const HISTORY_LENGTH = 10;

export const sendPrompt = createAsyncThunk<
  ConversationItem[],
  string,
  { state: RootState; rejectValue: string }
>('aiConversationThunks/sendPrompt', async (prompt, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const conversationHistory = state.aiConversation.conversationHistory;

    const currentUserPrompt: ConversationItem = {
      role: 'user',
      content: prompt,
      id: uuidv4(),
    };

    const conversation: ConversationItem[] = [...conversationHistory, currentUserPrompt];
    const answer: string | null = await askModel(conversation);
    conversation.push({ role: 'assistant', content: answer, id: uuidv4() });
    const trimmedConversation: ConversationItem[] = truncateArrayKeepFirst(
      conversation,
      HISTORY_LENGTH,
    );

    return trimmedConversation;
  } catch (e) {
    return rejectWithValue(normalizeError(e));
  }
});
