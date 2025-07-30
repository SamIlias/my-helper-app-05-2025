import { useEffect, useState } from 'react';
import { TaskFormValues } from '@/features/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { addTaskThunk, fetchTasksThunk, updateTaskThunk } from '@/features/tasks/model/tasksThunks';
import { TaskStatus } from '@/features/tasks/model/types';

export const useTasks = () => {
  const { tasks, error, isLoading } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const closeAddForm = () => {
    setIsAddFormActive(false);
  };

  const updateTaskStatus = async (id: string, status: TaskStatus): Promise<void> => {
    await dispatch(updateTaskThunk({ taskId: id, data: { status }, userId: user!.uid }));
  };

  const onAddTaskSubmit = async (data: TaskFormValues) => {
    await dispatch(addTaskThunk({ userId: user!.uid, data }));
    closeAddForm();
  };

  useEffect(() => {
    dispatch(fetchTasksThunk(user!.uid));
  }, [dispatch, user]);

  return {
    isAddFormActive,
    isLoading,
    error,
    tasks,
    setIsAddFormActive,
    onAddTaskSubmit,
    updateTaskStatus,
  };
};
