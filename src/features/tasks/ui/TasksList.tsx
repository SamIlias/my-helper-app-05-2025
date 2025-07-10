import * as React from 'react';
import { TaskItem } from './TaskItem';
import { EditTaskForm } from './EditTaskForm';
import { useTranslation } from 'react-i18next';
import { TaskType } from '../model/types';
import { useList } from '../model/useList';
import { borderColors, textColors } from '@/shared/myStyles/myStyles';
import { Description } from './Description';

export type TaskListProps = {
  tasks: TaskType[];
  toggleCompletingOfTask: (id: string, isCompleted: boolean) => void;
};

export const TasksList: React.FC<TaskListProps> = ({ tasks, toggleCompletingOfTask }) => {
  const {
    activeTaskId,
    newAddedTask,
    onTaskClick,
    newTaskElementAnchor,
    onDeleteTask,
    onEditClick,
    editTaskMode,
    closeEditForm,
    onEditFormSubmit,
    isMobile,
    isShowDescriptionBlockOnMobile,
    closeDescriptionOnMobile,
  } = useList(tasks);

  const activeTask: TaskType | undefined = tasks.find((task) => task.id === activeTaskId);

  const { t } = useTranslation('todopage');

  return (
    <div className="relative grid md:grid-cols-2 gap-2 pb-1 h-full w-full md:p-1">
      <div
        className={`border ${borderColors.primary} h-full rounded p-2 overflow-y-auto shadow-md`}
      >
        <h2 className={`${textColors.main} text-xl font-semibold text-center mb-4`}>
          {t('tasksList.listTitle')}
        </h2>

        {tasks.length === 0 && (
          <h3 className={`${textColors.highlight} text-center`}>
            {t('tasksList.emptyListMessage')}
          </h3>
        )}

        <div className="space-y-2">
          {tasks.map((task) => {
            const isActive = task.id === activeTaskId;
            const isNew = task.id === newAddedTask?.id;

            return (
              <div
                key={task.id}
                className={`${isActive ? 'bg-amber-500/80 dark:bg-orange-500/50' : 'hover:bg-stone-900/10 dark:hover:bg-stone-500/90 cursor-pointer'} border ${borderColors.primary}  rounded px-3`}
                onClick={() => onTaskClick(task.id)}
                ref={isNew ? newTaskElementAnchor : null}
              >
                <TaskItem
                  task={task}
                  deleteTask={onDeleteTask}
                  onEditTask={onEditClick}
                  toggleCompletingOfTask={toggleCompletingOfTask}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* DescriptionAndEditFormBlock */}
      <div
        className={`
          ${
            isShowDescriptionBlockOnMobile
              ? 'absolute inset-0 z-10 bg-stone-100/95 dark:bg-stone-600/95'
              : isMobile
                ? 'hidden'
                : 'block'
          }
           rounded pb-1
        `}
      >
        {editTaskMode.active ? (
          <EditTaskForm
            closeForm={closeEditForm}
            onSubmit={onEditFormSubmit}
            editedTask={editTaskMode.editedTask as TaskType}
          />
        ) : (
          <Description
            description={activeTask?.description}
            isMobile={isMobile}
            onCloseDescription={closeDescriptionOnMobile}
          />
        )}
      </div>
    </div>
  );
};
