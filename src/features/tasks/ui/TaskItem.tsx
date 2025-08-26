import * as React from 'react';
import { useContext, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { categoryColor, TaskCategoryValue, TaskType } from '../model/types';
import { textColors } from '@/shared/myStyles/myStyles';
import { useTask } from '@/features/tasks/model/useTask';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { TaskDescription } from './TaskDescription';
import { EditContext } from '@/pages/TodoPage/TaskSection';

export const TaskItem: React.FC<{ task: TaskType }> = React.memo(({ task }) => {
  const { t } = useTranslation('todopage');
  const { onDeleteTask } = useTask();

  const [showDescription, setShowDescription] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { taskInDrag } = useSelector((state: RootState) => state.tasks);
  const onEditClick = useContext(EditContext);

  const isDragging = taskInDrag?.id === task.id;

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      let top = rect.top + window.scrollY;
      let left = rect.right + window.scrollX;

      const tooltipWidth = 250;
      if (left + tooltipWidth > window.innerWidth) {
        left = rect.left - tooltipWidth;
      }

      const tooltipHeight = 170;
      if (top + tooltipHeight > window.innerHeight) {
        top = window.innerHeight - tooltipHeight - 10;
      }

      setPosition({ top, left });
    }
    setShowDescription(true);
  };

  const handleMouseLeave = () => {
    setShowDescription(false);
  };

  return (
    <>
      <div
        className="flex flex-col space-y-1 bg-stone-500/40 cursor-grab w-full hover:bg-amber-300/40 rounded-md p-2 transition shadow-lg duration-400 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        <span className={`${categoryColor[task.category as TaskCategoryValue]} block`}>
          {task.category}
        </span>
        <div>
          <span className={`${textColors.main} font-bold pl-2`}>{task.title}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`text-sm ${textColors.secondary} dark:text-gray-300`}>
            {task.deadline}
          </span>
          <div>
            <button
              onClick={() => onEditClick(task)}
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

      {showDescription && !isDragging && (
        <TaskDescription position={position} description={task.description} />
      )}
    </>
  );
});

export interface TaskItemProps {
  task: TaskType;
  deleteTask: (id: string) => void;
  onEditTask: (task: TaskType) => void;
}
