import * as React from 'react';
import { TaskType } from './TasksList.tsx';
import { taskCategories } from '../common/BaseTaskForm.tsx';

export const TaskItem: React.FC<IProps> = ({
  task,
  deleteTask,
  onEditTask,
  toggleCompletingOfTask,
}) => {
  const categoryColor = {
    [taskCategories.Work]: 'text-amber-500',
    [taskCategories.Default]: 'text-lime-500',
    [taskCategories.Urgent]: 'text-red-500',
    [taskCategories.Daily]: 'text-cyan-400',
    [taskCategories.Shopping]: 'text-violet-500',
  } as const;
  type Category = keyof typeof categoryColor;

  return (
    <>
      <div className="space-x-3">
        <span className={`${categoryColor[task.category as Category]} block text-shadow-lg/30 `}>
          {task.category}
        </span>
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
            <span className="text-white dark:text-gray-800 font-medium">{task.title}</span>
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
