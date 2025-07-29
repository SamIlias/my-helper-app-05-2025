import { useEffect, useRef, useState } from 'react';
import { TaskFormValues, TaskType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { setNewAddedTask } from './tasksSlice';
import { deleteTaskThunk, updateTaskThunk } from './tasksThunks';
import { useIsMobile } from '@/shared/hooks';

function isTaskInList(taskId: string | null | undefined, taskList: TaskType[]): boolean {
  if (!taskId) return false;
  return taskList.some((t) => t.id === taskId);
}

export const useList = (tasks: TaskType[]) => {
  const { newAddedTask } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [activeTaskId, setActiveTaskId] = useState<string | null | undefined>(null);
  const [editTaskMode, setEditTaskMode] = useState<{
    active: boolean;
    editedTask: TaskType | null;
  }>({
    active: false,
    editedTask: null,
  });
  const [isShowDescriptionBlockOnMobile, setIsShowDescriptionBlockOnMobile] =
    useState<boolean>(false);

  const isMobile = useIsMobile();

  const newTaskElementAnchor = useRef<HTMLDivElement>(null);

  const queueTasks = tasks.filter((task) => task.status === 'queue');
  const inProgressTasks = tasks.filter((task) => task.status === 'in-progress');
  const completedTasks = tasks.filter((task) => task.status === 'completed');

  useEffect(() => {
    newTaskElementAnchor.current?.scrollIntoView({ behavior: 'smooth' });
    dispatch(setNewAddedTask(null));
  }, [tasks, dispatch]);

  useEffect(() => {
    setActiveTaskId((prevActiveTaskId) => {
      if (isTaskInList(prevActiveTaskId, tasks)) {
        setActiveTaskId(prevActiveTaskId);
      }
      if (newAddedTask) return newAddedTask.id;
      if (tasks[0]) return tasks[0].id;
    });
  }, [tasks, newAddedTask]);

  const onTaskClick = (id: string): void => {
    const currentTask: TaskType | undefined = tasks.find((task: TaskType) => task.id === id);
    if (currentTask) setActiveTaskId(currentTask.id);
    if (currentTask && isMobile) {
      setIsShowDescriptionBlockOnMobile(true);
    }
  };

  const onEditClick: (task: TaskType) => void = (task) => {
    if (editTaskMode.active) return;
    setEditTaskMode({ active: true, editedTask: task });
  };

  const closeEditForm: () => void = () => {
    setEditTaskMode({ active: false, editedTask: null });
    if (isMobile) {
      setIsShowDescriptionBlockOnMobile(false);
    }
  };

  const closeDescriptionOnMobile: () => void = () => {
    setIsShowDescriptionBlockOnMobile(false);
  };

  const onEditFormSubmit = (data: TaskFormValues) => {
    const taskId = editTaskMode.editedTask!.id;
    dispatch(updateTaskThunk({ taskId, data, userId: user!.uid }));
    setActiveTaskId(taskId);
    closeEditForm();
  };

  const onDeleteTask = (id: string) => {
    dispatch(deleteTaskThunk(id));
  };

  return {
    activeTaskId,
    newAddedTask,
    onTaskClick,
    newTaskElementAnchor,
    onDeleteTask,
    onEditClick,
    editTaskMode,
    closeEditForm,
    onEditFormSubmit,
    isMobile,
    isShowDescriptionBlockOnMobile,
    closeDescriptionOnMobile,
    queueTasks,
    inProgressTasks,
    completedTasks,
    setActiveTaskId,
  };
};
