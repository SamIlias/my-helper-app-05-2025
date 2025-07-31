import { useEffect, useState } from 'react';
import { TaskFormValues } from '@/features/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { addTaskThunk, fetchTasksThunk } from '@/features/tasks/model/tasksThunks';

export const useTasks = () => {
  const { tasks, error, isLoading } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const closeAddForm = () => {
    setIsAddFormActive(false);
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
  };
};
