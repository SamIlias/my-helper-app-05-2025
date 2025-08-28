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
import { setAddForm } from '@/features/tasks/model/tasksSlice';

export const EditContext = createContext<(task: TaskType) => void>(() => {});

export const TaskSection: React.FC = () => {
  const {
    isLoading,
    error,
    tasks,
    onAddTaskSubmit,
    onEditFormSubmit,
    closeEditForm,
    onEditClick,
    editTaskMode,
  } = useTasks();

  const { t } = useTranslation('todoPage');
  const dispatch = useDispatch<AppDispatch>();
  const { addForm } = useSelector((state: RootState) => state.tasks);

  const onCloseAddTaskForm = () => dispatch(setAddForm({ active: false, date: null }));
  const onAddClick = () => dispatch(setAddForm({ active: true, date: null }));

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

            <div>
              <button onClick={onAddClick} className={`${buttonStyles.addTask}`}>
                {t('addTaskButtonName')}
              </button>
            </div>
          </div>
        )}
      </div>
    </EditContext>
  );
};
