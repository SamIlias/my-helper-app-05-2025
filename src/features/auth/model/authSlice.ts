import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializableUser } from '../../../pages/AuthPage/model/useAuthData';

export interface AuthState {
  user: SerializableUser | null | undefined;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SerializableUser | null | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
