import * as React from 'react';
import { TaskType } from './TodoPage/TasksList.tsx';

export const TaskItem: React.FC<IProps> = ({ task, deleteTask, toggleCompletingOfTask }) => {
  return (
    <>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => {
            toggleCompletingOfTask(task.id, !task.isCompleted);
          }}
          className="form-checkbox text-blue-600"
        />
        <span className="text-gray-800 dark:text-white font-medium">{task.title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-amber-500 dark:text-gray-300">{task.deadline}</span>
        <button
          onClick={() => {
            deleteTask(task.id);
          }}
          className="text-black hover:text-red-500"
        >
          Delete
        </button>
      </div>
    </>
  );
};

interface IProps {
  task: TaskType;
  deleteTask: (id: string) => void;
  toggleCompletingOfTask: (id: string, isCompleted: boolean) => void;
}
