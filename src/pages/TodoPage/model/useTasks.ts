import type { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { TaskFormValues, TaskType, TaskUpdateData, TaskWithoutId } from '@/features/tasks';
import { addTask, deleteTaskById, getTasks, updateTaskById } from '../api/firebaseTodoAPI';
import { normalizeError } from '@/shared/utils/errorHandler';

function findNewTask(prevTasks: TaskType[], updatedTasks: TaskType[]): TaskType | undefined {
  return updatedTasks.find((task) => !prevTasks.some((t) => t.id === task.id)) || undefined;
}

export const useTasks = (user: User | null | undefined) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);
  const [isCompletedTasksHidden, setIsCompletedTasksHidden] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newAddedTask, setNewAddedTask] = useState<TaskType | undefined | null>(undefined);

  const closeAddForm = () => {
    setIsAddFormActive(false);
  };

  const addNewTask = async (inputData: TaskFormValues) => {
    if (!user) return;

    const newTask: TaskWithoutId = { ...inputData, isCompleted: false, userId: user!.uid };
    try {
      await addTask(newTask);
      const updatedTasks: TaskType[] = await getTasks(user.uid);
      setNewAddedTask(findNewTask(tasks, updatedTasks));
      setTasks(updatedTasks);
    } catch (error) {
      setError(normalizeError(error));
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskById(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      setError(normalizeError(error));
    }
  };

  const updateTask = async (id: string, updatedData: TaskUpdateData) => {
    try {
      await updateTaskById(id, updatedData);
      setTasks((prevTasks) =>
        prevTasks.map((t) => {
          if (t.id === id) {
            return { ...t, ...updatedData };
          }
          return t;
        }),
      );
    } catch (error) {
      setError(normalizeError(error));
    }
  };

  const toggleCompletingOfTask = async (id: string, isCompleted: boolean): Promise<void> => {
    await updateTask(id, { isCompleted });
  };

  const onAddTaskSubmit = async (data: TaskFormValues) => {
    await addNewTask(data);
    closeAddForm();
  };

  const onClickHideShowButton = () => {
    setIsCompletedTasksHidden(!isCompletedTasksHidden);
  };

  useEffect(() => {
    if (!user) return;

    let ignore: boolean = false;
    setIsLoading(true);

    const fetchTasks = async () => {
      const tasksResponse: TaskType[] = await getTasks(user.uid);
      if (!ignore) {
        setTasks(tasksResponse);
      }
      setIsLoading(false);
    };

    fetchTasks();

    return () => {
      ignore = true;
    };
  }, []);

  const handledTasks: TaskType[] = isCompletedTasksHidden
    ? tasks.filter((t) => !t.isCompleted)
    : [...tasks];

  return {
    isAddFormActive,
    isCompletedTasksHidden,
    isLoading,
    error,
    handledTasks,
    newAddedTask,
    setNewAddedTask,
    setIsAddFormActive,
    onAddTaskSubmit,
    onClickHideShowButton,
    deleteTask,
    updateTask,
    toggleCompletingOfTask,
  };
};
