type TaskStatus = 'queue' | 'in-progress' | 'completed';

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

type TaskFormValues = Pick<TaskType, 'title' | 'deadline' | 'category' | 'description'>;

const taskCategories = {
  Default: 'default',
  Work: 'work',
  Daily: 'daily',
  Urgent: 'urgent',
  Shopping: 'shopping',
} as const;

type TaskCategoryKey = keyof typeof taskCategories;

const categoryColor = {
  [taskCategories.Work]: 'text-amber-800 dark:text-amber-300',
  [taskCategories.Default]: 'text-lime-700 dark:text-lime-300',
  [taskCategories.Urgent]: 'text-red-500 dark:text-red-400',
  [taskCategories.Daily]: 'text-cyan-600',
  [taskCategories.Shopping]: 'text-violet-500',
} as const;

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
export { categoryColor, taskCategories };
