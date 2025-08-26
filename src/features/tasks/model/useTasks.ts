import { useEffect, useState } from 'react';
import { TaskFormValues, TaskType } from '@/features/tasks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { addTaskThunk, fetchTasksThunk, updateTaskThunk } from '@/features/tasks/model/tasksThunks';

export const useTasks = () => {
  const { tasks, error, isLoading } = useSelector((state: RootState) => state.tasks);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);

  const [editTaskMode, setEditTaskMode] = useState<{
    active: boolean;
    editedTask: TaskType | null;
  }>({
    active: false,
    editedTask: null,
  });

  useEffect(() => {
    dispatch(fetchTasksThunk(user!.uid));
  }, [dispatch, user]);

  const closeAddForm = () => {
    setIsAddFormActive(false);
  };

  const onAddTaskSubmit = async (data: TaskFormValues) => {
    await dispatch(addTaskThunk({ userId: user!.uid, data }));
    closeAddForm();
  };

  const onEditClick: (task: TaskType) => void = (task) => {
    if (editTaskMode.active) return;
    setEditTaskMode({ active: true, editedTask: task });
  };

  const closeEditForm: () => void = () => {
    setEditTaskMode({ active: false, editedTask: null });
  };

  const onEditFormSubmit = (data: TaskFormValues) => {
    const taskId = editTaskMode.editedTask!.id;
    dispatch(updateTaskThunk({ taskId, data, userId: user!.uid }));
    closeEditForm();
  };

  return {
    isAddFormActive,
    isLoading,
    error,
    tasks,
    setIsAddFormActive,
    onAddTaskSubmit,
    editTaskMode,
    onEditClick,
    closeEditForm,
    onEditFormSubmit,
  };
};
