import { useState } from 'react';
import * as React from 'react';
import { TaskItem } from '../TaskItem.tsx';

export const TasksList: React.FC<PropsType> = ({ tasks, deleteTask, toggleCompletingOfTask }) => {
  const [description, setDescription] = useState(tasks[0]?.description);

  const onTaskClick = (id: string): void => {
    const currentTask: TaskType | undefined = tasks.find((task) => task.id === id);
    if (currentTask) {
      setDescription(currentTask.description);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 h-full w-full p-4">
      {/* Task List */}
      <div className="col-span-6  dark:bg-gray-800 rounded-xl shadow-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
          List of Tasks
        </h2>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border border-gray-300 dark:border-gray-700 rounded-md p-3 hover:bg-gray-700/50 dark:hover:bg-gray-700 cursor-pointer transition"
              onClick={() => onTaskClick(task.id)}
            >
              <TaskItem
                task={task}
                deleteTask={deleteTask}
                toggleCompletingOfTask={toggleCompletingOfTask}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="col-span-6 dark:bg-gray-800 rounded-xl shadow-lg p-4">
        <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
          Description
        </h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {description || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

type PropsType = {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  toggleCompletingOfTask: (id: string, isCompleted: boolean) => void;
};

export type TaskType = {
  id: string;
  deadline?: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  category: string;
};
