import { useForm } from 'react-hook-form';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { myStyles } from '../../../shared/myStyles/myStyles';
import { TaskType } from '../model/types';

export const taskCategories = {
  Default: 'default',
  Work: 'work',
  Daily: 'daily',
  Urgent: 'urgent',
  Shopping: 'shopping',
} as const;
export type TaskCategoryType = keyof typeof taskCategories;

export type TaskFormValues = Pick<TaskType, 'title' | 'deadline' | 'category' | 'description'>;
type PropsType = {
  closeAddForm: () => void;
  onSubmit: (data: TaskFormValues) => void;
  submitButtonText: string;
  defaultValues?: TaskFormValues;
};

export const BaseTaskForm: React.FC<PropsType> = ({
  closeAddForm,
  onSubmit,
  submitButtonText,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({ mode: 'onChange', defaultValues });

  const { t } = useTranslation('todopage');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-span-2 row-span-6 grid grid-cols-2 gap-4 content-start"
    >
      {/* Title */}
      <div className="col-span-2">
        <label
          htmlFor="title"
          className={`block text-sm font-medium ${myStyles.textColor.formLabel}`}
        >
          {t('baseTaskForm.titleLabel')}
          <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'title-error' : undefined}
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 30,
              message: 'Title must be at most 30 characters long',
            },
          })}
          placeholder={t('baseTaskForm.titlePlaceholder')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 "
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1" id="title-error" role="alert">
            {errors.title.message as string}
          </p>
        )}
      </div>

      {/* Deadline */}
      <div>
        <label
          htmlFor="deadline"
          className={`block text-sm font-medium ${myStyles.textColor.formLabel}`}
        >
          {t('baseTaskForm.deadlineLabel')}
        </label>
        <input
          id="deadline"
          {...register('deadline')}
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Type */}
      <div>
        <label
          htmlFor="category"
          className={`block text-sm font-medium ${myStyles.textColor.formLabel}`}
        >
          {t('baseTaskForm.categoryLabel')}
        </label>
        <select
          id="category"
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 "
        >
          {(Object.keys(taskCategories) as TaskCategoryType[]).map((key) => (
            <option className="bg-gray-700/80" value={taskCategories[key]}>
              {key}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="col-span-2">
        <label
          htmlFor="description"
          className={`block text-sm font-medium ${myStyles.textColor.formLabel}`}
        >
          {t('baseTaskForm.descriptionLabel')}
        </label>
        <textarea
          id="description"
          {...register('description')}
          placeholder={t('baseTaskForm.descriptionPlaceholder')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-start mt-4">
        <button
          type="button"
          onClick={closeAddForm}
          aria-label="Cancel form and close"
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          {t('baseTaskForm.cancelButtonName')}
        </button>
        <input
          type="submit"
          value={submitButtonText}
          className="px-4 py-2 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-800 cursor-pointer"
        />
      </div>
    </form>
  );
};
