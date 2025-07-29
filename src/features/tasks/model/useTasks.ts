import { useEffect, useState } from 'react';
import { TaskFormValues, TaskType } from '@/features/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { updateTaskThunk } from '@/features/tasks/model/tasksThunks';
import { AppDispatch } from '@/app/store';
import { addTaskThunk, fetchTasksThunk } from '@/features/tasks/model/tasksThunks';
import { TaskStatus } from '@/features/tasks/model/types';

export const useTasks = () => {
  const { tasks, error, isLoading } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();

  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);
  const [isCompletedTasksHidden, setIsCompletedTasksHidden] = useState(false);
  const [handledTasks, setHandledTasks] = useState<TaskType[]>(tasks);
  const user = useSelector((state: RootState) => state.auth.user);

  const closeAddForm = () => {
    setIsAddFormActive(false);
  };

  // const toggleCompletingOfTask = async (id: string, isCompleted: boolean): Promise<void> => {
  //   await dispatch(updateTaskThunk({ taskId: id, data: { isCompleted }, userId: user!.uid }));
  // };

  const updateTaskStatus = async (id: string, status: TaskStatus): Promise<void> => {
    await dispatch(updateTaskThunk({ taskId: id, data: { status }, userId: user!.uid }));
  };

  const onAddTaskSubmit = async (data: TaskFormValues) => {
    await dispatch(addTaskThunk({ userId: user!.uid, data }));
    closeAddForm();
  };

  const onClickHideShowButton = () => {
    setIsCompletedTasksHidden(!isCompletedTasksHidden);
  };

  useEffect(() => {
    dispatch(fetchTasksThunk(user!.uid));
  }, [dispatch, user]);

  useEffect(() => {
    const handled = isCompletedTasksHidden ? tasks.filter((t) => !t.isCompleted) : [...tasks];
    setHandledTasks(handled);
  }, [tasks, isCompletedTasksHidden]);

  return {
    isAddFormActive,
    isCompletedTasksHidden,
    isLoading,
    error,
    handledTasks,
    setIsAddFormActive,
    onAddTaskSubmit,
    onClickHideShowButton,
    // toggleCompletingOfTask,
    updateTaskStatus,
  };
};
