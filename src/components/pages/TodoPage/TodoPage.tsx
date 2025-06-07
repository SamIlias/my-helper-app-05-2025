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
import { mockTasks } from '../../../lib/mockOfTasks.ts';
import { myStyles } from '../../../myStyles/myStyles.ts';

type Props = {
  user: User | null | undefined;
};

const TodoPage: React.FC<Props> = ({ user }) => {
  // const [tasks, setTasks] = useState<TaskType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([...mockTasks]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);
  const [isCompletedTasksHidden, setIsCompletedTasksHidden] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const closeAddForm = () => {
    setIsAddFormActive(false);
  };

  const addNewTask = async (inputData: TaskFormValues) => {
    const newTask: TaskWithoutId = { ...inputData, isCompleted: false, userId: user!.uid };
    try {
      await addTask(newTask);
      const updatedTasks: TaskType[] = await getTasks(user!.uid);
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
    // try {
    //   await updateTaskById(id, updatedData);
    //   setTasks((prevTasks) =>
    //     prevTasks.map((t) => {
    //       if (t.id === id) {
    //         return { ...t, ...updatedData };
    //       }
    //       return t;
    //     }),
    //   );
    // } catch (error) {
    //   setError(normalizeError(error));
    // }
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

  // useEffect(() => {
  //   let ignore: boolean = false;
  //   setIsLoading(true);
  //
  //   const fetchTasks = async () => {
  //     const tasksResponse: TaskType[] = await getTasks(user!.uid);
  //     if (!ignore) {
  //       setTasks(tasksResponse);
  //     }
  //     setIsLoading(false);
  //   };
  //
  //   fetchTasks();
  //
  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

  const handledTasks: TaskType[] = isCompletedTasksHidden
    ? tasks.filter((t) => !t.isCompleted)
    : [...tasks];

  //JSX ------------------------------------------------------------------------
  if (isAddFormActive) {
    return (
      <AddTaskForm closeAddForm={() => setIsAddFormActive(false)} onSubmit={onAddTaskSubmit} />
    );
  }

  return (
    <>
      {user ? (
        <div className="flex flex-col min-h-0 h-full p-2 gap-2">
          {/* Header */}
          <header className="flex justify-between items-center border-b pb-2">
            <h1 className={`${myStyles.pageTitle} text-2xl md:text-3xl`}>My tasks</h1>
            <div className="space-x-4">
              <button
                onClick={() => setIsAddFormActive(true)}
                className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Add New
              </button>
              <button
                onClick={onClickHideShowButton}
                title={isCompletedTasksHidden ? 'Show completed tasks' : 'Hide completed tasks'}
                className="px-4 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                {isCompletedTasksHidden ? 'Show' : 'Hide'}
              </button>
            </div>
          </header>

          {error && <p className="text-red-600">{error}</p>}

          {/* Tasks */}
          {isLoading ? (
            <div className="col-span-14 col-start-1 row-span-7 row-start-1 justify-items-center content-center">
              <Preloader preloader={preloader} />
            </div>
          ) : (
            <div className="flex-1 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <TasksList
                tasks={handledTasks}
                deleteTask={deleteTask}
                updateTask={updateTask}
                toggleCompletingOfTask={toggleCompletingOfTask}
              />
            </div>
          )}
        </div>
      ) : (
        <Navigate to="/auth" replace={true} />
      )}
    </>
  );
};

export default TodoPage;
