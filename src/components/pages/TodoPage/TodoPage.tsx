import { useEffect, useState } from 'react';
import { AddTaskForm, TaskFormValues } from './addTaskForm/AddTaskForm.tsx';
import { TasksList, TaskType } from './tasksList/TasksList.tsx';
import { getTasks, putTasks } from '../../../api/todoApi.ts';
import { Preloader } from '../../common/Preloader.tsx';
import preloader from '../../../assets/preloaderGear.svg';
import * as React from 'react';
import { uniqueId } from '../../../lib/utils/uniqueId.ts';
import type { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

type Props = {
  user: User | null | undefined;
};

const TodoPage: React.FC<Props> = ({ user }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);
  const [isCompletedTasksHidden, setIsCompletedTasksHidden] = useState(false);

  const closeAddForm = () => {
    setIsAddFormActive(false);
  };

  const updateTasks: (tasks: TaskType[]) => Promise<void> = async (tasks) => {
    const tasksResponse: TaskType[] | undefined = await putTasks(tasks);
    if (tasksResponse) {
      setTasks(tasksResponse);
    }
  };

  const addNewTask = (data: TaskFormValues) => {
    const newTask: TaskType = { ...data, id: uniqueId(tasks), isCompleted: false };
    const updatedTasks: TaskType[] = [...tasks, newTask];
    updateTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks: TaskType[] = tasks.filter((task) => task.id !== id);
    updateTasks(updatedTasks);
  };

  const toggleCompletingOfTask = (id: string, isCompleted: boolean): void => {
    const currentTask: TaskType | undefined = tasks.find((task) => task.id === id);
    if (currentTask) {
      currentTask.isCompleted = isCompleted;
      const updatedTasks = [...tasks];
      updateTasks(updatedTasks);
    }
  };

  const onAddTaskSubmit = (data: TaskFormValues) => {
    addNewTask(data);
    closeAddForm();
  };

  const onClickHideShowButton = () => {
    setIsCompletedTasksHidden(!isCompletedTasksHidden);
  };

  useEffect(() => {
    let ignore: boolean = false;
    const fetchTasks = async () => {
      const tasksResponse: TaskType[] = await getTasks();
      if (!ignore) {
        setTasks(tasksResponse);
      }
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
  if (isAddFormActive) {
    return (
      <AddTaskForm closeAddForm={() => setIsAddFormActive(false)} onSubmit={onAddTaskSubmit} />
    );
  }

  return (
    <>
      {user ? (
        <div className="flex flex-col h-full w-full p-6 dark:bg-gray-900">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Tasks</h1>
            <div className="space-x-4">
              <button
                onClick={() => setIsAddFormActive(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Add New
              </button>
              <button
                onClick={onClickHideShowButton}
                title={isCompletedTasksHidden ? 'Show completed tasks' : 'Hide completed tasks'}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                {isCompletedTasksHidden ? 'Show' : 'Hide'}
              </button>
            </div>
          </div>

          {/* Tasks */}
          {tasks.length ? (
            <div className="flex-1 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <TasksList
                tasks={handledTasks}
                deleteTask={deleteTask}
                updateTasks={updateTasks}
                toggleCompletingOfTask={toggleCompletingOfTask}
              />
            </div>
          ) : (
            <div className="col-span-14 col-start-1 row-span-7 row-start-1 justify-items-center content-center">
              <Preloader preloader={preloader} />
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
