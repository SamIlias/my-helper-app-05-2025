import { TaskCategoryType } from '../ui/BaseTaskForm';

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
