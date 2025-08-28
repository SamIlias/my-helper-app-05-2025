import { categoryColor } from '@/shared/myStyles/myStyles';

type TaskStatus = 'queue' | 'inProgress' | 'completed';

type TaskType = {
  id: string;
  userId: string;
  deadline?: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  category: TaskCategoryKey;
  status: TaskStatus;
};

type TaskWithoutId = Omit<TaskType, 'id'>;
type TaskUpdateData = Partial<Omit<TaskType, 'id' | 'userId'>>;

type TaskFormValues = Partial<Pick<TaskType, 'title' | 'deadline' | 'category' | 'description'>>;

const taskCategories = {
  Default: 'default',
  Work: 'work',
  Daily: 'daily',
  Urgent: 'urgent',
  Shopping: 'shopping',
} as const;

type TaskCategoryKey = keyof typeof taskCategories;
type TaskCategoryValue = keyof typeof categoryColor;

export type {
  TaskType,
  TaskWithoutId,
  TaskUpdateData,
  TaskFormValues,
  TaskCategoryKey,
  TaskCategoryValue,
  TaskStatus,
};
export { taskCategories };
