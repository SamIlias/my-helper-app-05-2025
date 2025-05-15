import { useEffect, useState } from 'react';
import { AddTaskForm, AddTaskFormData } from './AddTaskForm.tsx';
import { TasksList, TaskType } from './TasksList.tsx';
import { getTasks, putTasks } from '../../../api/todoApi.ts';
import uniqueId from 'lodash/uniqueId';

const TodoPage = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);

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

  useEffect(() => {
    loadTasks();
  }, []);

  const [isAddFormActive, setIsAddFormActive] = useState(false);

  const closeAddForm = () => {
    setIsAddFormActive(false);
  };

  const createTask = (data: AddTaskFormData) => {
    const newTask: TaskType = { ...data, id: uniqueId(), isCompleted: false };
    const updatedTasks: TaskType[] = [...tasks, newTask];
    updateTasks(updatedTasks);
    closeAddForm();
  };

  if (isAddFormActive) {
    return <AddTaskForm closeAddForm={() => setIsAddFormActive(false)} onSubmit={createTask} />;
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
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
            Hide/Show
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="flex-1 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <TasksList tasks={tasks} />
      </div>
    </div>
  );
};

export default TodoPage;
