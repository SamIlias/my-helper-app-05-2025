import * as React from 'react';
import { TaskType } from './TasksList.tsx';
import { taskCategories } from '../common/BaseTaskForm.tsx';
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation('todopage');

  return (
    <>
      <div className="flex flex-col space-x-3">
        <span className={`${categoryColor[task.category as Category]} block text-shadow-lg/30 `}>
          {task.category}
        </span>
        <div className="mb-1">
          <div className="space-x-2">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => {
                toggleCompletingOfTask(task.id, !task.isCompleted);
              }}
              className="form-checkbox"
            />
            <span className={`text-white font-medium`}>{task.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-amber-500 dark:text-gray-300">{task.deadline}</span>
            <div>
              <button
                onClick={() => onEditTask(task)}
                className="px-1 mx-1 pb-0.5 text-sm text-white bg-amber-800 hover:bg-amber-600 rounded transition"
              >
                {t('taskItem.editButtonName')}
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                className="px-1 pb-0.5 text-sm text-white bg-red-900 hover:bg-red-600 rounded transition"
              >
                {t('taskItem.deleteButtonName')}
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
