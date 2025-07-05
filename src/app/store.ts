import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/model/tasksSlice';
import authReducer from '@/features/auth/model/authSlice';
import conversationReducer from '@/features/aiConversation/model/aiConversationSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    aiConversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
