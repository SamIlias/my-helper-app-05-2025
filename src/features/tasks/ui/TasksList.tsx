import * as React from 'react';
import { TaskItem } from './TaskItem.tsx';
import { EditTaskForm } from './EditTaskForm.tsx';
import { useTranslation } from 'react-i18next';
import { TaskType, TaskUpdateData } from '../model/types';
import { useList } from '../model/useList.ts';

export type TaskListProps = {
  tasks: TaskType[];
  deleteTask: (id: string) => void;
  updateTask: (id: string, updatedData: TaskUpdateData) => void;
  toggleCompletingOfTask: (id: string, isCompleted: boolean) => void;
  newAddedTask?: TaskType;
};

export const TasksList: React.FC<TaskListProps> = React.memo(
  ({ tasks, deleteTask, updateTask, toggleCompletingOfTask, newAddedTask }) => {
    const {
      activeTask,
      onTaskClick,
      newTaskElementAnchor,
      onDeleteTask,
      onEditClick,
      editTaskMode,
      closeEditForm,
      onEditFormSubmit,
    } = useList({ tasks, deleteTask, updateTask, newAddedTask });

    const { t } = useTranslation('todopage');
    return (
      <div className="grid grid-rows-[2fr_1fr] md:grid-rows-none md:grid-cols-2 gap-2 h-full w-full p-1">
        {/* Task List */}
        <div className="border h-full rounded-xl shadow-lg p-2 overflow-y-auto">
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
            {t('tasksList.listTitle')}
          </h2>
          {tasks.length === 0 && (
            <h3 className="text-amber-500 text-center">{t('tasksList.emptyListMessage')}</h3>
          )}
          <div className="space-y-2">
            {tasks.map((task) => {
              const isActive = task.id === activeTask?.id;
              const isNew = task.id === newAddedTask?.id;

              return (
                <div
                  key={task.id}
                  className={`${isActive ? 'bg-amber-700/80' : 'hover:bg-gray-700/50 dark:hover:bg-gray-700 cursor-pointer'} border border-gray-300 dark:border-gray-700 rounded-md px-3 `}
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

        {/* Description or edit form */}
        {editTaskMode.active ? (
          <div className="rounded-xl shadow-lg p-2 overflow-y-scroll">
            <EditTaskForm
              closeForm={closeEditForm}
              onSubmit={onEditFormSubmit}
              editedTask={editTaskMode.editedTask as TaskType}
            />
          </div>
        ) : (
          <div className="border h-full rounded-xl shadow-lg p-2 overflow-y-scroll">
            <h2 className="text-xl font-semibold text-center dark:text-white mb-4">
              {t('tasksList.descriptionTitle')}
            </h2>
            <p
              className={`${activeTask?.description ? 'text-white dark:text-gray-200 text-shadow-lg/40 whitespace-pre-wrap text-balance' : 'text-amber-700 text-shadow-lg/40 italic'}`}
            >
              {activeTask?.description || t('tasksList.descriptionPlaceholder')}
            </p>
          </div>
        )}
      </div>
    );
  },
);
