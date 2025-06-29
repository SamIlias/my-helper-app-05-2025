import { useEffect, useRef, useState } from 'react';
import { TaskFormValues, TaskType } from './types';
import { TaskListProps } from '../ui/TasksList';

type Params = Omit<TaskListProps, 'toggleCompletingOfTask'>;

export const useList = (params: Params) => {
  const { tasks, deleteTask, updateTask, newAddedTask, setNewAddedTask } = params;
  const [activeTask, setActiveTask] = useState<TaskType | null | undefined>(
    newAddedTask || tasks[0],
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
    setNewAddedTask(null);
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
    updateTask(taskId, { ...data });
    setActiveTask(editTaskMode.editedTask);
    closeEditForm();
  };

  const onDeleteTask = (id: string) => {
    deleteTask(id);
  };

  return {
    activeTask,
    onTaskClick,
    newTaskElementAnchor,
    onDeleteTask,
    onEditClick,
    editTaskMode,
    closeEditForm,
    onEditFormSubmit,
  };
};
