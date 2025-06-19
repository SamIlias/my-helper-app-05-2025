import { useEffect, useState } from 'react';
import { AddTaskForm, TaskFormValues } from './addTaskForm/AddTaskForm.tsx';
import { TaskWithoutId, TasksList, TaskType, TaskUpdateData } from './tasksList/TasksList.tsx';
import { Preloader } from '../../common/Preloader.tsx';
import preloader from '../../../assets/preloaderGear.svg';
import * as React from 'react';
import type { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { addTask, deleteTaskById, getTasks, updateTaskById } from '../../../api/firebaseTodoAPI.ts';
import { normalizeError } from '../../../lib/utils/errorHandler.ts';
// import { mockTasks } from '../../../lib/mockOfTasks.ts';
import { myStyles } from '../../../myStyles/myStyles.ts';
import { useTranslation } from 'react-i18next';

function findNewTask(prevTasks: TaskType[], updatedTasks: TaskType[]): TaskType | undefined {
  return updatedTasks.find((task) => !prevTasks.some((t) => t.id === task.id)) || undefined;
}

type Props = {
  user: User | null | undefined;
};

const TodoPage: React.FC<Props> = ({ user }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  // const [tasks, setTasks] = useState<TaskType[]>([...mockTasks]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);
  const [isCompletedTasksHidden, setIsCompletedTasksHidden] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newAddedTask, setNewAddedTask] = useState<TaskType | undefined>(undefined);

  const { t } = useTranslation('todopage');

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

  //JSX ------------------------------------------------------------------------
  if (!user) {
    return <Navigate to="/auth" replace={true} />;
  }

  if (isAddFormActive) {
    return (
      <AddTaskForm closeAddForm={() => setIsAddFormActive(false)} onSubmit={onAddTaskSubmit} />
    );
  }

  return (
    <div className="flex flex-col min-h-0 h-full p-2 gap-2">
      {/* Header */}
      <header className="flex justify-between items-center border-b pb-2">
        <h1 className={`${myStyles.pageTitle} text-2xl md:text-3xl`}>{t('title')}</h1>
        <div className="">
          <button
            onClick={() => setIsAddFormActive(true)}
            className="px-2 py-1 bg-amber-900 text-white rounded-md hover:bg-amber-600 hover:text-black transition"
          >
            {t('addTaskButtonName')}
          </button>
          <button
            aria-pressed={!isCompletedTasksHidden}
            aria-controls="tasks-list"
            onClick={onClickHideShowButton}
            title={
              isCompletedTasksHidden
                ? t('showHideButton.titleOnHoverHide')
                : t('showHideButton.titleOnHoverShow')
            }
            className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            {isCompletedTasksHidden ? t('showHideButton.showName') : t('showHideButton.hideName')}
          </button>
        </div>
      </header>

      {error && (
        <p className="text-red-600" role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      {/* Tasks */}
      {isLoading ? (
        <div className="flex items-center justify-center h-full pb-15">
          <Preloader preloader={preloader} />
        </div>
      ) : (
        <main className="flex-1 rounded-xl shadow-lg overflow-hidden" id="tasks-list" role="list">
          <TasksList
            tasks={handledTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleCompletingOfTask={toggleCompletingOfTask}
            newAddedTask={newAddedTask}
          />
        </main>
      )}
    </div>
  );
};

export default TodoPage;
