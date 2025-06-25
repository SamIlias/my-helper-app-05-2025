import * as React from 'react';
import { AddTaskForm } from '@/features/tasks/ui/AddTaskForm.tsx';
import { TasksList } from '@/features/tasks/ui/TasksList.tsx';
import { Preloader } from '@/shared/ui/Preloader.tsx';
import { Navigate } from 'react-router-dom';
import preloader from '@/shared/assets/preloaderGear.svg';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useTasks } from '@/features/tasks/model/useTasks.ts';
import { PageHeader } from '../../shared/ui/PageHeader';
// import { mockTasks } from '../../../lib/mockOfTasks.ts';

type Props = {
  user: User | null | undefined;
};

const TodoPage: React.FC<Props> = ({ user }) => {
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

  //JSX ------------------------------------------------------------------------
  if (!user) {
    return <Navigate to="/auth" replace={true} />;
  }

  if (isAddFormActive) {
    return (
      <AddTaskForm closeAddForm={() => setIsAddFormActive(false)} onSubmit={onAddTaskSubmit} />
    );
  }

  return (
    <div className="flex flex-col min-h-0 h-full p-2 gap-2">
      <PageHeader
        title={t('title')}
        children={
          <div className="">
            <button
              onClick={() => setIsAddFormActive(true)}
              className="px-2 py-1 bg-amber-900 text-white rounded-md hover:bg-amber-600 hover:text-black transition"
            >
              {t('addTaskButtonName')}
            </button>
            <button
              aria-pressed={!isCompletedTasksHidden}
              aria-controls="tasks-list"
              onClick={onClickHideShowButton}
              title={
                isCompletedTasksHidden
                  ? t('showHideButton.titleOnHoverHide')
                  : t('showHideButton.titleOnHoverShow')
              }
              className="px-2 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              {isCompletedTasksHidden ? t('showHideButton.showName') : t('showHideButton.hideName')}
            </button>
          </div>
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

export default TodoPage;
