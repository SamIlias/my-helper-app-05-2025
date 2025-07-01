import * as React from 'react';
import { AddTaskForm, TasksList } from '@/features/tasks';
import { Preloader } from '@/shared/ui/Preloader.tsx';
import preloader from '@/shared/assets/preloaderGear.svg';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTasks } from '../model/useTasks';
import { HeaderButtons } from './HeaderButtons';

export const TodoPage: React.FC = () => {
  const { t } = useTranslation('todopage');
  const {
    isAddFormActive,
    isCompletedTasksHidden,
    isLoading,
    error,
    handledTasks,
    setIsAddFormActive,
    onAddTaskSubmit,
    onClickHideShowButton,
    toggleCompletingOfTask,
  } = useTasks();

  const onCloseTaskForm = () => setIsAddFormActive(false);
  const onOpenTaskForm = () => setIsAddFormActive(true);

  if (isAddFormActive) {
    return <AddTaskForm closeAddForm={onCloseTaskForm} onSubmit={onAddTaskSubmit} />;
  }
  return (
    <div className="flex flex-col min-h-0 h-full mx-3 gap-2">
      <PageHeader
        title={t('title')}
        children={
          <HeaderButtons
            onOpenTaskForm={onOpenTaskForm}
            isCompletedTasksHidden={isCompletedTasksHidden}
            onClickHideShowButton={onClickHideShowButton}
          />
        }
      />

      {error && (
        <p className="text-red-600" role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-full pb-15">
          <Preloader preloader={preloader} />
        </div>
      ) : (
        <main className="flex-1 overflow-hidden" id="tasks-list" role="list">
          <TasksList tasks={handledTasks} toggleCompletingOfTask={toggleCompletingOfTask} />
        </main>
      )}
    </div>
  );
};
