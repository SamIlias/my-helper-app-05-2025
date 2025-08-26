import * as React from 'react';
import { BaseTaskForm } from './BaseTaskForm';
import { useTranslation } from 'react-i18next';
import { borderColors } from '@/shared/myStyles/myStyles';
import { TaskFormValues, TaskType } from '../model/types';

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
    <div
      className={`h-fit grid w-1/3 grid-cols-2 grid-rows-7 gap-4 p-6 bg-stone-500/30 rounded-lg shadow-lg `}
    >
      <BaseTaskForm
        title={t('editTaskForm.title')}
        closeAddForm={closeForm}
        onSubmit={onSubmit}
        submitButtonText={t('editTaskForm.submitButtonName')}
        defaultValues={defaultValues}
      />
    </div>
  );
};
