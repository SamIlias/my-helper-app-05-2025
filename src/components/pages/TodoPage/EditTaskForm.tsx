import { useForm } from 'react-hook-form';
import * as React from 'react';
import { TaskFormValues } from './AddTaskForm.tsx';
import { TaskType } from './TasksList.tsx';

export const EditTaskForm: React.FC<PropsType> = ({ closeForm, onSubmit, editedTask }) => {
  const defaultValues: TaskFormValues = {
    title: editedTask.title,
    deadline: editedTask.deadline,
    category: editedTask.category,
    description: editedTask.description,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({ mode: 'onChange', defaultValues });

  return (
    <div className="h-fit grid grid-cols-2 grid-rows-7 gap-4 p-6 border rounded-lg shadow-md">
      <h1 className="col-span-2 text-2xl font-bold row-start-1">Edit task</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="col-span-2 row-span-6 grid grid-cols-2 gap-4 content-start"
      >
        {/* Title */}
        <div className="col-span-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Title<span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            {...register('title', {
              required: 'Title is required',
              maxLength: {
                value: 30,
                message: 'Title must be at most 30 characters long',
              },
            })}
            placeholder="Enter title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message as string}</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Deadline
          </label>
          <input
            id="deadline"
            {...register('deadline')}
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Type */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Task category
          </label>
          <select
            id="category"
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option className="bg-lime-700/80" value="default">
              Default
            </option>
            <option className="bg-lime-700/80" value="work">
              Work
            </option>
            <option className="bg-lime-700/80" value="shopping">
              Shopping
            </option>
          </select>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register('description')}
            placeholder="Enter description"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-around mt-4">
          <button
            type="button"
            onClick={closeForm}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <input
            type="submit"
            value="Save changes"
            className="px-4 py-2 bg-blue-300 text-white font-medium rounded-md hover:bg-blue-800 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

type PropsType = {
  closeForm: () => void;
  onSubmit: (data: TaskFormValues) => void;
  editedTask: TaskType;
};
