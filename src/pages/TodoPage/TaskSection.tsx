import { AddTaskForm, TasksList } from '@/features/tasks';
import { Preloader } from '@/shared/ui';
import preloader from '@/shared/assets/preloaderGear.svg';
import * as React from 'react';
import { useTasks } from '@/features/tasks/model/useTasks';
import { useTranslation } from 'react-i18next';
import { mainLayoutColors } from '@/shared/myStyles/myStyles';

export const TaskSection: React.FC = () => {
  const { isAddFormActive, isLoading, error, tasks, setIsAddFormActive, onAddTaskSubmit } =
    useTasks();

  const { t } = useTranslation('todopage');

  const onCloseTaskForm = () => setIsAddFormActive(false);
  const onOpenTaskForm = () => setIsAddFormActive(true);

  if (isAddFormActive) {
    return (
      <div className="flex items-center justify-center h-full pb-15 w-full">
        <AddTaskForm closeAddForm={onCloseTaskForm} onSubmit={onAddTaskSubmit} />
      </div>
    );
  }

  return (
    <div className={`h-full gap-2 w-full overflow-hidden ${mainLayoutColors.tilesBackground}`}>
      {isLoading ? (
        <div className="h-1/3 flex items-center pb-15 ">
          <Preloader preloader={preloader} />
        </div>
      ) : (
        <div
          className="flex p-2 gap-2 flex-col w-full h-full overflow-auto "
          id="tasks-list"
          role="list"
        >
          {error && (
            <p className="text-red-600" role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          <TasksList tasks={tasks} />

          <div>
            <button
              onClick={onOpenTaskForm}
              className="px-2  bg-yellow-500 text-black rounded-md hover:bg-amber-700 hover:text-white transition"
            >
              {t('addTaskButtonName')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
