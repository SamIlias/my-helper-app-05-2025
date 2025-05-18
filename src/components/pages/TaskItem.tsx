import * as React from 'react';
import { TaskType } from './TodoPage/TasksList.tsx';

export const TaskItem: React.FC<IProps> = ({
  task,
  deleteTask,
  onEditTask,
  toggleCompletingOfTask,
}) => {
  return (
    <>
      <div className="space-x-3">
        <span className="text-amber-500 block">{task.category}</span>
        <div className="flex justify-between mb-3">
          <div className="space-x-2">
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
          <div className="flex items-end space-x-2">
            <span className="text-sm text-amber-500 dark:text-gray-300">{task.deadline}</span>
            <div>
              <button
                onClick={() => onEditTask(task)}
                className="px-1 pb-0.5 text-sm text-white bg-amber-800 hover:bg-amber-600 rounded transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="px-1 pb-0.5 text-sm text-white bg-red-900 hover:bg-red-600 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface IProps {
  task: TaskType;
  deleteTask: (id: string) => void;
  onEditTask: (task: TaskType) => void;
  toggleCompletingOfTask: (id: string, isCompleted: boolean) => void;
}
