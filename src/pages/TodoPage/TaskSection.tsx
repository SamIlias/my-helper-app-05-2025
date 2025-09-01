import { AddTaskForm, TasksList, TaskType } from '@/features/tasks';
import { Preloader } from '@/shared/ui';
import preloader from '@/shared/assets/preloaderGear.svg';
import * as React from 'react';
import { createContext } from 'react';
import { useTasks } from '@/features/tasks/model/useTasks';
import { useTranslation } from 'react-i18next';
import { buttonStyles, mainLayoutColors } from '@/shared/myStyles/myStyles';
import { EditTaskForm } from '@/features/tasks/ui/EditTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { setAddForm, sortTasks } from '@/features/tasks/model/tasksSlice';
import {
  compareByCategory,
  compareByDeadline,
} from '@/features/tasks/model/taskSortCompareFunctions';

export const EditContext = createContext<(task: TaskType) => void>(() => {});

export const TaskSection: React.FC = () => {
  const { onAddTaskSubmit, onEditFormSubmit, closeEditForm, onEditClick, editTaskMode } =
    useTasks();

  const { t } = useTranslation('todoPage');
  const dispatch = useDispatch<AppDispatch>();
  const { addForm, tasks, error, isLoading } = useSelector((state: RootState) => state.tasks);

  const onCloseAddTaskForm = () => dispatch(setAddForm({ active: false, date: null }));
  const onAddClick = () => dispatch(setAddForm({ active: true, date: null }));
  const onSortByDateClick = () => dispatch(sortTasks(compareByDeadline));
  const onSortByCategoryClick = () => dispatch(sortTasks(compareByCategory));

  if (addForm.active) {
    return (
      <div className="flex items-center justify-center h-full pb-15 w-full">
        <AddTaskForm
          closeAddForm={onCloseAddTaskForm}
          onSubmit={onAddTaskSubmit}
          date={addForm.date}
        />
      </div>
    );
  }

  if (editTaskMode.active && editTaskMode.editedTask) {
    return (
      <div className="flex items-center justify-center h-full pb-15 w-full">
        <EditTaskForm
          onSubmit={onEditFormSubmit}
          closeForm={closeEditForm}
          editedTask={editTaskMode.editedTask}
        />
      </div>
    );
  }

  return (
    <EditContext value={onEditClick}>
      <div
        className={`h-full flex items-center justify-center gap-2 w-full overflow-hidden ${mainLayoutColors.tilesBackground}`}
      >
        {isLoading ? (
          <div className="h-1/6 flex items-center">
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

            <div className="flex items-center gap-2">
              <button onClick={onAddClick} className={`${buttonStyles.addTask}`}>
                {t('addTaskButtonName')}
              </button>

              <button onClick={onSortByDateClick} className={`${buttonStyles.addTask}`}>
                {'Sort by date'}
              </button>

              <button onClick={onSortByCategoryClick} className={`${buttonStyles.addTask}`}>
                {'Sort by category'}
              </button>
            </div>
          </div>
        )}
      </div>
    </EditContext>
  );
};
