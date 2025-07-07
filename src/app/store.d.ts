export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    tasks: import("@/features/tasks/model/tasksSlice").TasksState;
    auth: import("@/features/auth/model/authSlice").AuthState;
    aiConversation: import("@/features/aiConversation/model/aiConversationSlice").ConversationState;
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        tasks: import("@/features/tasks/model/tasksSlice").TasksState;
        auth: import("@/features/auth/model/authSlice").AuthState;
        aiConversation: import("@/features/aiConversation/model/aiConversationSlice").ConversationState;
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
