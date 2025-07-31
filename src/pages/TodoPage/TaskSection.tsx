import { AddTaskForm, TasksList } from '@/features/tasks';
import { Preloader } from '@/shared/ui';
import preloader from '@/shared/assets/preloaderGear.svg';
import * as React from 'react';
import { useTasks } from '@/features/tasks/model/useTasks';
import { useTranslation } from 'react-i18next';

export const TaskSection: React.FC = () => {
  const { isAddFormActive, isLoading, error, tasks, setIsAddFormActive, onAddTaskSubmit } =
    useTasks();

  const { t } = useTranslation('todopage');

  const onCloseTaskForm = () => setIsAddFormActive(false);
  const onOpenTaskForm = () => setIsAddFormActive(true);

  return (
    <>
      {isAddFormActive ? (
        <AddTaskForm closeAddForm={onCloseTaskForm} onSubmit={onAddTaskSubmit} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-0 h-full gap-2 w-full">
          <div>
            <button
              onClick={onOpenTaskForm}
              className="px-2 bg-yellow-500 text-black rounded-md hover:bg-amber-700 hover:text-white transition"
            >
              {t('addTaskButtonName')}
            </button>
          </div>

          {error && (
            <p className="text-red-600" role="alert" aria-live="assertive">
              {error}
            </p>
          )}

          {isLoading ? (
            <div className=" h-full pb-15">
              <Preloader preloader={preloader} />
            </div>
          ) : (
            <div className="flex-1 w-full " id="tasks-list" role="list">
              {/*<TasksList tasks={handledTasks} />*/}
              <TasksList tasks={tasks} />
            </div>
          )}
        </div>
      )}
    </>
  );
};
