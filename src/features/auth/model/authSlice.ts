import { User } from 'firebase/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  user: User | null | undefined;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
