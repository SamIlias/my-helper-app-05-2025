import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from './types';
import { addTaskThunk, deleteTaskThunk, fetchTasksThunk, updateTaskThunk } from './tasksThunks';

export interface TasksState {
  tasks: TaskType[];
  isLoading: boolean;
  error: string | null;
  newAddedTask: TaskType | undefined | null;
  taskInDrag: TaskType | null;
  addForm: {
    active: boolean;
    date?: Date | null;
  };
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
  newAddedTask: null,
  taskInDrag: null,
  addForm: {
    active: false,
    date: null,
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setNewAddedTask: (state, action: PayloadAction<TaskType | null>) => {
      state.newAddedTask = action.payload;
    },
    setTaskInDrag: (state, action: PayloadAction<TaskType | null>) => {
      state.taskInDrag = action.payload;
    },
    setAddForm: (state, action: PayloadAction<{ active: boolean; date: Date | null }>) => {
      state.addForm = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTasksThunk.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })

      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.newAddedTask = action.payload;
      })
      .addCase(addTaskThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        );
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { setNewAddedTask, setTaskInDrag, setAddForm } = tasksSlice.actions;
export default tasksSlice.reducer;
