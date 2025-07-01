import { useForm } from 'react-hook-form';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { taskCategories, TaskCategoryKey, TaskFormValues } from '../model/types';
import { borderColors, textColors } from '@/shared/myStyles/myStyles';

type PropsType = {
  title: string;
  closeAddForm: () => void;
  onSubmit: (data: TaskFormValues) => void;
  submitButtonText: string;
  defaultValues?: TaskFormValues;
};

export const BaseTaskForm: React.FC<PropsType> = ({
  title,
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
    <>
      <header>
        <h1 className={`${textColors.main} text-lg md:text-2xl font-bold`}>{title}</h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 col-span-2 row-span-6 grid grid-cols-2 gap-2 md:gap-4 content-start"
      >
        {/* Title */}
        <div className="col-span-2">
          <label htmlFor="title" className={`block text-sm font-medium ${textColors.formLabel}`}>
            {t('baseTaskForm.titleLabel')}
            <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            autoFocus={true}
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
            className={`${textColors.placeholder} ${borderColors.formInput} px-1 mt-1 block w-full`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1" id="title-error" role="alert">
              {errors.title.message as string}
            </p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className={`block text-sm font-medium ${textColors.formLabel}`}>
            {t('baseTaskForm.deadlineLabel')}
          </label>
          <input
            id="deadline"
            {...register('deadline')}
            type="date"
            className={`${textColors.placeholder} ${borderColors.formInput} px-1 mt-1 block w-full`}
          />
        </div>

        {/* Type */}
        <div>
          <label htmlFor="category" className={`block text-sm font-medium ${textColors.formLabel}`}>
            {t('baseTaskForm.categoryLabel')}
          </label>
          <select
            id="category"
            {...register('category')}
            className={`${textColors.placeholder} ${borderColors.formInput} px-1 mt-1 block w-full`}
          >
            {(Object.keys(taskCategories) as TaskCategoryKey[]).map((key) => (
              <option className={` bg-stone-700/20`} value={taskCategories[key]}>
                {key}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label
            htmlFor="description"
            className={`block text-sm font-medium ${textColors.formLabel}`}
          >
            {t('baseTaskForm.descriptionLabel')}
          </label>
          <textarea
            id="description"
            {...register('description')}
            placeholder={t('baseTaskForm.descriptionPlaceholder')}
            rows={4}
            className={`${textColors.placeholder} ${borderColors.formInput} px-1 mt-1 block w-full`}
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex gap-1 justify-start mt-4">
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
    </>
  );
};
