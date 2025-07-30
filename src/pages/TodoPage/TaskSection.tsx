import { AddTaskForm, TasksList, TaskType } from '@/features/tasks';
import { HeaderButtons } from '@/features/tasks/ui/HeaderButtons';
import { Preloader } from '@/shared/ui';
import preloader from '@/shared/assets/preloaderGear.svg';
import * as React from 'react';
import { useTasks } from '@/features/tasks/model/useTasks';
import { useTranslation } from 'react-i18next';

const tasksExample: TaskType[] = [
  {
    id: '1',
    title: 'Task 1',
    status: 'queue',
    description: '1',
    category: 'Default',
    deadline: '',
    isCompleted: false,
    userId: '1',
  },
  {
    id: '2',
    title: 'Task 2',
    status: 'queue',
    description: '2',
    category: 'Default',
    deadline: '',
    isCompleted: false,
    userId: '1',
  },
  {
    id: '3',
    title: 'Task 3',
    status: 'queue',
    description: '3',
    category: 'Default',
    deadline: '',
    isCompleted: false,
    userId: '1',
  },
  {
    id: '4',
    title: 'Task 4',
    status: 'queue',
    description: '4',
    category: 'Default',
    deadline: '',
    isCompleted: false,
    userId: '1',
  },
  {
    id: '5',
    title: 'Task 5',
    status: 'queue',
    description: '5',
    category: 'Default',
    deadline: '',
    isCompleted: false,
    userId: '1',
  },
  {
    id: '6',
    title: 'Task 6',
    status: 'queue',
    description: '6',
    category: 'Default',
    deadline: '',
    isCompleted: false,
    userId: '1',
  },
  {
    id: '7',
    title: 'Task 7',
    status: 'queue',
    description: '7',
    category: 'Default',
    deadline: '',
    isCompleted: false,
    userId: '1',
  },
];

export const TaskSection: React.FC = () => {
  const {
    isAddFormActive,
    isCompletedTasksHidden,
    isLoading,
    error,
    tasks,
    setIsAddFormActive,
    onAddTaskSubmit,
    onClickHideShowButton,
  } = useTasks();

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
            <HeaderButtons
              onOpenTaskForm={onOpenTaskForm}
              isCompletedTasksHidden={isCompletedTasksHidden}
              onClickHideShowButton={onClickHideShowButton}
            />
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
