import { ConversationItem, initialConversationItem } from '@/shared/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendPrompt } from './aiConversationThunks';

interface ConversationState {
  conversationHistory: ConversationItem[];
  query: string;
  error?: string | null;
}

const initialState: ConversationState = {
  conversationHistory: [initialConversationItem],
  query: '',
  error: null,
};
const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationHistory: (state, action: PayloadAction<ConversationItem[]>) => {
      state.conversationHistory = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPrompt.fulfilled, (state, action) => {
        state.conversationHistory = action.payload;
        state.query = '';
      })
      .addCase(sendPrompt.rejected, (state, action) => {
        state.error = action.payload;
        console.error(action.payload);
      });
  },
});

export const { setConversationHistory, setQuery } = conversationSlice.actions;
export default conversationSlice.reducer;
