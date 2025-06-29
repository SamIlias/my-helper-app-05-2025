import * as React from 'react';
import { AddTaskForm, TasksList } from '@/features/tasks';
import { Preloader } from '@/shared/ui/Preloader.tsx';
import { Navigate } from 'react-router-dom';
import preloader from '@/shared/assets/preloaderGear.svg';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/shared/ui/PageHeader';
import { useTasks } from '../model/useTasks';
import { HeaderButtons } from './HeaderButtons';

type Props = {
  user: User | null | undefined;
};

export const TodoPage: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation('todopage');
  const {
    isAddFormActive,
    isCompletedTasksHidden,
    isLoading,
    error,
    handledTasks,
    newAddedTask,
    setIsAddFormActive,
    onAddTaskSubmit,
    onClickHideShowButton,
    deleteTask,
    updateTask,
    toggleCompletingOfTask,
  } = useTasks(user);

  const onCloseTaskForm = () => setIsAddFormActive(false);
  const onOpenTaskForm = () => setIsAddFormActive(true);

  if (!user) {
    return <Navigate to="/auth" replace={true} />;
  }

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
          <TasksList
            tasks={handledTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
            toggleCompletingOfTask={toggleCompletingOfTask}
            newAddedTask={newAddedTask}
          />
        </main>
      )}
    </div>
  );
};
