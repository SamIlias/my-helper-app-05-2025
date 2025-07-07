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
      className={`md:h-full grid  px-6 pt-3 border rounded ${borderColors.primary} shadow-md overflow-y-scroll`}
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
