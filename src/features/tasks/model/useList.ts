import { useEffect, useRef, useState } from 'react';
import { TaskFormValues, TaskType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { setNewAddedTask } from './tasksSlice';
import { deleteTaskThunk, updateTaskThunk } from './tasksThunks';

function isTaskInList(task: TaskType | undefined | null, taskList: TaskType[]): boolean {
  if (!task) return false;
  return taskList.some((t) => t.id === task.id);
}

export const useList = (tasks: TaskType[]) => {
  const { newAddedTask } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [activeTask, setActiveTask] = useState<TaskType | null | undefined>(
    newAddedTask ? newAddedTask : tasks[0],
  );
  const [editTaskMode, setEditTaskMode] = useState<{
    active: boolean;
    editedTask: TaskType | null;
  }>({
    active: false,
    editedTask: null,
  });

  const newTaskElementAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    newTaskElementAnchor.current?.scrollIntoView({ behavior: 'smooth' });
    dispatch(setNewAddedTask(null));
  }, [tasks]);

  useEffect(() => {
    setActiveTask((prevActiveTask) => {
      if (isTaskInList(prevActiveTask, tasks)) return prevActiveTask;
      return newAddedTask ? newAddedTask : tasks[0];
    });
  }, [tasks]);

  const onTaskClick = (id: string): void => {
    const currentTask: TaskType | undefined = tasks.find((task: TaskType) => task.id === id);
    if (currentTask) {
      setActiveTask(currentTask);
    }
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
    setActiveTask(editTaskMode.editedTask);
    closeEditForm();
  };

  const onDeleteTask = (id: string) => {
    dispatch(deleteTaskThunk(id));
  };

  return {
    activeTask,
    newAddedTask,
    onTaskClick,
    newTaskElementAnchor,
    onDeleteTask,
    onEditClick,
    editTaskMode,
    closeEditForm,
    onEditFormSubmit,
  };
};
