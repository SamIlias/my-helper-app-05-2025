import * as React from 'react';
import { TaskFormValues } from './AddTaskForm.tsx';
import { TaskType } from './TasksList.tsx';
import { BaseTaskForm } from './BaseTaskForm.tsx';
import { useTranslation } from 'react-i18next';

type PropsType = {
  closeForm: () => void;
  onSubmit: (data: TaskFormValues) => void;
  editedTask: TaskType;
};

export const EditTaskForm: React.FC<PropsType> = ({ closeForm, onSubmit, editedTask }) => {
  const defaultValues: TaskFormValues = {
    title: editedTask.title,
    deadline: editedTask.deadline,
    category: editedTask.category,
    description: editedTask.description,
  };

  const { t } = useTranslation('todopage');

  return (
    <div className="h-fit grid grid-cols-2 grid-rows-7 gap-4 p-6 border rounded-lg shadow-md">
      <h1 className="col-span-2 text-2xl font-bold row-start-1">{t('editTaskForm.title')}</h1>
      <BaseTaskForm
        closeAddForm={closeForm}
        onSubmit={onSubmit}
        submitButtonText={t('editTaskForm.submitButtonName')}
        defaultValues={defaultValues}
      />
    </div>
  );
};
