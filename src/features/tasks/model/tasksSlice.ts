import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from './types';

interface TasksState {
  tasks: TaskType[];
  isLoading: boolean;
  error: string | null;
  newAddedTask: TaskType | undefined | null;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
  newAddedTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
});

export default tasksSlice.reducer;
