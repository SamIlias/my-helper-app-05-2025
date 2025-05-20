import { useEffect, useState } from 'react';
import { AddTaskForm, TaskFormValues } from './AddTaskForm.tsx';
import { TasksList, TaskType } from './TasksList.tsx';
import { getTasks, putTasks } from '../../../api/todoApi.ts';
import { Preloader } from '../../common/Preloader.tsx';
import preloader from '../../../assets/preloaderGear.svg';
import * as React from 'react';
import { toString } from 'lodash';

const uniqueId = (seed: Array<TaskType>) => {
  return toString(seed.length + Math.random());
};

const TodoPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isAddFormActive, setIsAddFormActive] = useState<boolean>(false);
  const [isCompletedTasksHidden, setIsCompletedTasksHidden] = useState(false);

  const loadTasks = async () => {
    const tasksResponse = await getTasks();
    setTasks(tasksResponse);
  };
  const updateTasks: (tasks: TaskType[]) => Promise<void> = async (tasks) => {
    const tasksResponse: TaskType[] | undefined = await putTasks(tasks);
    if (tasksResponse) {
      setTasks(tasksResponse);
    }
  };
  const closeAddForm = () => {
    setIsAddFormActive(false);
  };
  const addNewTask = (data: TaskFormValues) => {
    const newTask: TaskType = { ...data, id: uniqueId(tasks), isCompleted: false };
    const updatedTasks: TaskType[] = [...tasks, newTask];
    updateTasks(updatedTasks);
  };
  const onSubmit = (data: TaskFormValues) => {
    addNewTask(data);
    closeAddForm();
  };
  const deleteTask = (id: string) => {
    const updatedTasks: TaskType[] = tasks.filter((task) => task.id !== id);
    updateTasks(updatedTasks);
  };
  const toggleCompletingOfTask = (id: string, isCompleted: boolean): void => {
    const currentTask: TaskType | undefined = tasks.find((task) => task.id === id);
    if (currentTask) {
      // const updatedTask: TaskType = { ...currentTask, isCompleted };
      // const filtered = tasks.filter((task) => task.id !== id);
      // const updatedTasks: TaskType[] = [...filtered, updatedTask];
      // updateTasks(updatedTasks);
      currentTask.isCompleted = isCompleted;
      const updatedTasks = [...tasks];
      updateTasks(updatedTasks);
    }
  };
  const onHideShow = () => {
    setIsCompletedTasksHidden(!isCompletedTasksHidden);
  };

  const handledTasks: TaskType[] = isCompletedTasksHidden
    ? tasks.filter((t) => !t.isCompleted)
    : [...tasks];

  useEffect(() => {
    loadTasks();
  }, []);

  if (isAddFormActive) {
    return <AddTaskForm closeAddForm={() => setIsAddFormActive(false)} onSubmit={onSubmit} />;
  }

  return (
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
            onClick={onHideShow}
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
  );
};

export default TodoPage;
