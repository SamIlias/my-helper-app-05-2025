import * as React from 'react';
import { BaseTaskForm } from './BaseTaskForm';
import { useTranslation } from 'react-i18next';
import { TaskFormValues } from '../model/types';

export const AddTaskForm: React.FC<PropsType> = ({ closeAddForm, onSubmit }) => {
  const { t } = useTranslation('todopage');

  return (
    <div className="h-fit grid w-1/3 grid-cols-2 grid-rows-7 gap-4 p-6 bg-stone-500/30 rounded-lg shadow-lg ">
      <BaseTaskForm
        title={t('addTaskForm.title')}
        closeAddForm={closeAddForm}
        onSubmit={onSubmit}
        submitButtonText={t('addTaskForm.submitButtonName')}
      />
    </div>
  );
};

type PropsType = {
  closeAddForm: () => void;
  onSubmit: (data: TaskFormValues) => void;
};
