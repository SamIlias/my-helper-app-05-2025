import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskFormValues, TaskType, TaskUpdateData, TaskWithoutId } from './types';
import {
  addTask,
  deleteTaskById,
  getTasks,
  updateTaskById,
} from '@/features/tasks/api/firebaseTodoAPI';
import { normalizeError } from '../../../shared/utils/errorHandler';
import { RootState } from '../../../app/store';

export const fetchTasksThunk = createAsyncThunk<TaskType[], string, { rejectValue: string }>(
  'tasks/fetchTasks',
  async (userId, { rejectWithValue }) => {
    try {
      return await getTasks(userId);
    } catch (e) {
      return rejectWithValue(normalizeError(e));
    }
  },
);

export const addTaskThunk = createAsyncThunk<
  TaskType,
  { userId: string; data: TaskFormValues },
  { rejectValue: string; state: RootState }
>('tasks/add', async ({ userId, data }, { getState, rejectWithValue }) => {
  try {
    const taskWithoutId: TaskWithoutId = {
      ...data,
      userId,
      isCompleted: false,
      status: 'queue',
    };
    await addTask(taskWithoutId);
    const prevTasks: TaskType[] = getState().tasks.tasks;
    const updatedTasks = await getTasks(userId);
    const newTask = findNewTask(prevTasks, updatedTasks);
    return newTask!;
  } catch (e) {
    return rejectWithValue(normalizeError(e));
  }
});

export const deleteTaskThunk = createAsyncThunk<string, string, { rejectValue: string }>(
  'tasks/delete',
  async (taskId, { rejectWithValue }) => {
    try {
      await deleteTaskById(taskId);
      return taskId;
    } catch (e) {
      return rejectWithValue(normalizeError(e));
    }
  },
);

export const updateTaskThunk = createAsyncThunk<
  TaskType,
  { taskId: string; data: TaskUpdateData; userId: string },
  { rejectValue: string }
>('tasks/update', async ({ taskId, data, userId }, { rejectWithValue }) => {
  try {
    await updateTaskById(taskId, data);
    const tasks = await getTasks(userId);
    const updated = tasks.find((task) => task.id === taskId);
    return updated!;
  } catch (e) {
    return rejectWithValue(normalizeError(e));
  }
});

function findNewTask(prevTasks: TaskType[], updatedTasks: TaskType[]): TaskType | undefined {
  return updatedTasks.find((task) => !prevTasks.some((t) => t.id === task.id)) || undefined;
}
