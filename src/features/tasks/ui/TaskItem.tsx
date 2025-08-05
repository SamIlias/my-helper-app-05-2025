import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { categoryColor, TaskCategoryValue, TaskType } from '../model/types';
import { textColors } from '@/shared/myStyles/myStyles';
import { useTask } from '@/features/tasks/model/useTask';

export const TaskItem: React.FC<{ task: TaskType }> = React.memo(({ task }) => {
  const { t } = useTranslation('todopage');
  const { onDeleteTask } = useTask();

  return (
    <div className="flex flex-col space-y-1">
      <span className={`${categoryColor[task.category as TaskCategoryValue]} block`}>
        {task.category}
      </span>
      <div>
        <span className={`${textColors.main} font-bold`}>{task.title}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className={`text-sm ${textColors.secondary} dark:text-gray-300`}>
          {task.deadline}
        </span>
        <div>
          <button
            // onClick={() => onEditTask(task)}
            className="px-1 mx-1 pb-0.5 text-sm text-white bg-amber-800 hover:bg-amber-600 rounded transition"
          >
            {t('taskItem.editButtonName')}
          </button>
          <button
            data-no-dnd
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(task.id);
            }}
            className="px-1 pb-0.5 text-sm text-white bg-red-900 hover:bg-red-600 rounded transition"
          >
            {t('taskItem.deleteButtonName')}
          </button>
        </div>
      </div>
    </div>
  );
});

export interface TaskItemProps {
  task: TaskType;
  deleteTask: (id: string) => void;
  onEditTask: (task: TaskType) => void;
}
