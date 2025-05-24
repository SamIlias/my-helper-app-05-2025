import * as React from 'react';
import { TaskType } from '../tasksList/TasksList.tsx';
import { BaseTaskForm } from '../common/BaseTaskForm.tsx';

export const AddTaskForm: React.FC<PropsType> = React.memo(({ closeAddForm, onSubmit }) => {
  return (
    <div className="h-full grid grid-cols-2 grid-rows-7 gap-4 p-6 border rounded-lg shadow-md">
      <h1 className="col-span-2 text-2xl font-bold row-start-1">Create Task</h1>
      <BaseTaskForm closeAddForm={closeAddForm} onSubmit={onSubmit} submitButtonText="Add Task" />
    </div>
  );
});

export type TaskFormValues = Pick<TaskType, 'title' | 'deadline' | 'category' | 'description'>;

type PropsType = {
  closeAddForm: () => void;
  onSubmit: (data: TaskFormValues) => void;
};
