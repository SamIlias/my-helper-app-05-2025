import * as React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: LoginFormData) => void;
}

export interface LoginFormData {
  userName: string;
  password: string;
}

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ mode: 'onChange' });

  const fields = {
    userName: 'userName',
    password: 'password',
  } as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 content-start">
      {/* User name */}
      <div className="col-span-2">
        <label
          htmlFor={fields.userName}
          className="block text-sm font-medium dark:text-gray-700 text-gray-200"
        >
          User Name<span className="text-red-500">*</span>
        </label>
        <input
          id={fields.userName}
          {...register(fields.userName, {
            required: 'name is required',
            maxLength: {
              value: 30,
              message: 'Name must be at most 30 characters long',
            },
          })}
          placeholder="Enter your name"
          className="border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm mt-1">{errors.userName.message as string}</p>
        )}
      </div>

      {/* Password */}
      <div className="col-span-2">
        <label
          htmlFor={fields.password}
          className="block text-sm font-medium darK:text-gray-700 text-gray-200"
        >
          Password<span className="text-red-500">*</span>
        </label>
        <input
          id={fields.password}
          {...register(fields.password, {
            required: 'password is required',
            maxLength: {
              value: 30,
              message: 'Password must be at most 30 characters long',
            },
          })}
          placeholder="Enter your password"
          className="border mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      {/* Buttons */}
      <input
        type="submit"
        value={'Login'}
        className="px-4 py-2 bg-blue-300 text-white font-medium rounded-md hover:bg-blue-800 cursor-pointer"
      />
    </form>
  );
};
