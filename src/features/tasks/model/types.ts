export type TaskType = {
  id: string;
  userId: string;
  deadline?: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  category: TaskCategoryType;
};

export type TaskWithoutId = Omit<TaskType, 'id'>;
export type TaskUpdateData = Partial<Omit<TaskType, 'id' | 'userId'>>;

export const taskCategories = {
  Default: 'default',
  Work: 'work',
  Daily: 'daily',
  Urgent: 'urgent',
  Shopping: 'shopping',
} as const;
export type TaskCategoryType = keyof typeof taskCategories;

export type TaskFormValues = Pick<TaskType, 'title' | 'deadline' | 'category' | 'description'>;
